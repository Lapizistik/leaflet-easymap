// let's have some anonymous function (as a scope)
(function() {
		if(!("L" in window)) {
				throw new ReferenceError("You must load Leaflet to use easymap!");
		}
		// Default config
		const osm_attr = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
		L.easymap = {
				config: {
						provider: {
								osm_org: {
										url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
										options: {
												attribution: osm_attr
										}
								},
								opencycle: {
										url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
										options: {
												attribution: '&copy; OpenCycleMap, Map data '+osm_attr
										}
								}
						},
						default_provider: "osm_org",
						origin: [51.48, 0],
						zoom:14
				}
		};

		// Monkey-patching leaflet-providers
		if(L.tileLayer.provider && !L.tileLayer.provider.known) {
				L.tileLayer.provider.known = function(name) {
						return !!L.TileLayer.Provider.providers[name.split('.')[0]];
				}
		}
		
		function data(elem, attr) {
				return elem.getAttribute("data-" + attr);
		}

		function booldata(elem, attr) {
				return ((data(elem, attr)||"").toUpperCase() == "TRUE");
		}
		
		
		/* 
		 * determine the origin from data attributes
		 */
		function getOrigin(elem, mpos) {
				const d = data(elem, "origin");
				const o = (d && d.split(",")) ||             // origin given as attribute
									(mpos && mpos.slice(0)) ||         // or as marker position
									L.easymap.config.origin.slice(0);  // or the default
				const lat = data(elem, "lat");               // directly given lat and lon
				const lon = data(elem, "lon");               // have highest priority
				if(lat) { o[0] = lat; }
				if(lon) { o[1] = lon; }
				return o;
		}

		function providerOptions(elem, defaults) {
				const attrs = elem.attributes;
				const options = {};
				if(defaults) {
						const keys = Object.keys(defaults);
						for(var i = 0; i < keys.length; i++) {
								const k = keys[i];
								options[k] = defaults[k];
						}
				}
				// we allow a shortcut name for the attribution
				const attribution = data(elem, "attribution");
				if(attribution) { options.attribution = attribution; }
				for(var i = 0; i < attrs.length; i++) {
						const name = attrs[i].name;
						const pars = name.match(/^data-provider-(.*)$/);
						if (pars && pars[1]) {
								options[pars[1]] = attrs[i].value;
						}
				}
				console.log(options);
				return options;
		}
		
		function tileLayer(name, elem) {
				// is the leaflet-providers plugin loaded?
				if (L.tileLayer.provider && L.tileLayer.provider.known(name)) {
						return  L.tileLayer.provider(name, providerOptions(elem));
				} else {
						const provider = L.easymap.config.provider[name];
						if(!provider) {
								throw 'No such provider (' + name + ')';
						}
						return L.tileLayer(provider.url,
															 providerOptions(elem, provider.options));
				}
		}
		
		/* 
		 * create the map on elem
		 */
		function mappify(elem) {
				// read the data attributes
				const markertxt = data(elem, "marker");
				const popuptxt = data(elem, "popup");
				const mpos = markertxt && markertxt.split(",");
				const locate = booldata(elem, "locate");
				const origin = getOrigin(elem, mpos );
				
				const map = L.map(elem); // create the map
				map.setView(origin, // set the view
										data(elem, "zoom") || L.easymap.config.zoom);

				if(locate) {
						map.locate({ setView: true });
				}

				// Todo: improve baselayer selection (more baselayers)
				tileLayer(data(elem, "provider") ||
									L.easymap.config.default_provider, elem).addTo(map);
				const marker = mpos && L.marker(mpos).addTo(map);

				// a popup
				const popup = popuptxt &&
							        L.popup({closeOnClick: false}).setContent(popuptxt);
				if(popup) {
						if (marker) {
								marker.bindPopup(popup).openPopup();
						} else {
								popup.setLatLng(origin).openOn(map);
						}
				}
				
		}


		/* The startup sequence */
		function mappify_em(cls) {
				const maps = document.getElementsByClassName(cls || "easymap"); 
				for(var i=0; i<maps.length; i++) {
						mappify(maps[i]);
				}
		}
		// we create something like $(document).ready on our own
		//to avoid JQuery dependency (and we don't support IE before 9).
		var done = false; // only call this once!
		function init_once() {
				if(!done) {
						mappify_em();
						done = true;
				}
		}
		document.addEventListener("DOMContentLoaded", init_once); // register
		if(document.readyState !== "loading") { // we may be late
				init_once();                        // so call it
		}
})();
