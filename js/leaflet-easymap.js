// let's have some anonymous function (as a scope)
(function() {
		if(!("L" in window)) {
				throw new ReferenceError("You must load Leaflet to use easymap!");
		}
		// Default config
		L.easymap = {
				config: {
						basemaps: {
								osm_org: {
										url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
										attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								}
						},
						default_basemap: "osm_org",
						origin: [51.48, 0],
						zoom:14
				}
		};

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
		
		/* 
		 * create the map on elem
		 */
		function mappify(elem) {
				// read the data attributes
				const basemap = L.easymap.config.basemaps.osm_org;
				const markertxt = data(elem, "marker");
				const popuptxt = data(elem, "popup");
				const mpos = markertxt && markertxt.split(",");
				const locate = booldata(elem, "locate");
				const origin = getOrigin(elem, mpos);
				
				const map = L.map(elem); // create the map
				map.setView(origin, // set the view
										data(elem, "zoom") || L.easymap.config.zoom);

				if(locate) {
						map.locate({ setView: true });
				}

				// Todo: improve baselayer selection (more baselayers)
				L.tileLayer(basemap.url,
										{attribution: basemap.attribution}).addTo(map);


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
