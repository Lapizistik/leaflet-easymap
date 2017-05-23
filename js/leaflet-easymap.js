// ToDo
// The code could use some cleanup and better documentation.
// Currently I put everything in one file, but I should switch to some
// builder/precompiler.
// I also don't use “let” to stay compatible with more browsers
// (but I try to avoid “var” by using “const” whereever possible)

// let's have some anonymous function (as a scope)
(function(window, document) {
		if(!("L" in window)) {
				throw new ReferenceError("You must load Leaflet to use Leasymap!");
		}
		// Default config
		const osm_attr = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

		// ToDo: do not overwrite config set before
		L.easymap = {
				attribution: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | <a href="https://lapizistik.github.io/leaflet-easymap" title="Include maps in HTML without programming">Easymap</a>',
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
						zoom:14,
						iconsizes: {
								small: 18,
								medium: 26,
								large: 34
						},
						class: 'leasymap'
				},
				geojson: {
						style: geojsonStyle,
						pointToLayer: geojsonMarker,
						onEachFeature: geojsonFeature
				},
				makiurl: "https://lapizistik.github.io/maki/icons/{maki}-15.svg"
		};
		
		function monkeyPatchPlugins() {
				// Monkey-patching leaflet-providers
				if(L.tileLayer.provider && !L.tileLayer.provider.known) {
						L.tileLayer.provider.known = function(name) {
								return !!L.TileLayer.Provider.providers[name.split('.')[0]];
						};
				}
		}

		// have data accessor similar to jQuery
		function data(elem, attr) {
				// should we return an array if attr is "[…]" ?
				return elem.getAttribute("data-" + attr);
		}
		function booldata(elem, attr) {
				return ((data(elem, attr)||"").toUpperCase() == "TRUE");
		}		

		const svgTemplate = '<svg style="width:{width};" viewBox="-10.5 -30.5 21 31.4" clippath="m 0,0 c 0,0 -10,-15 -10,-20 0,-5 5,-10 10,-10 5,0 10,5 10,10 C 10,-15 0,0 0,0 Z"><path d="m 0,0 c 0,0 -10,-15 -10,-20 0,-5 5,-10 10,-10 5,0 10,5 10,10 C 10,-15 0,0 0,0 Z" style="fill:{fill};fill-opacity:1;stroke:{stroke};stroke-width:{strokewidth};" />{inner}</svg>';
		
		const svgTextTemplate = '<text x="0" y="-15" text-anchor="middle">{text}</text>';

		const svgImgTemplate = '<svg viewBox="0 0 15 15" x="-7" y="-25" width="14" height="14" style="fill:{symbolfill};"></svg>';

		const svgcircletemplate = '<circle r="4.2" cy="-20" cx="0" style="fill:{symbolfill};stroke:{stroke};stroke-width:{strokewidth};" />';
		
		const SVGIcon = L.DivIcon.extend({
				options: {
						className: 'svg-icon',
						iconSize: 'medium'
				},
				initialize: function(options) {
						options = L.Util.setOptions(this, options);

						options.iconSize = L.easymap.config.iconsizes[options.iconSize] ||
								options.iconSize;
						if (!isNaN(options.iconSize)) {
								const size = options.iconSize;
								options.iconSize = [size, size*1.48];
						}
						options.iconAnchor = [options.iconSize[0]/2, options.iconSize[1]];
						options.popupAnchor = [0, -0.8*options.iconSize[1]];
						options.tooltipAnchor = [0, -0.6*options.iconSize[1]];
				},
				createIcon: function(oldIcon) {
						const options = this.options;

						function makiimg(symbol) {
								return L.Util.template(L.easymap.makiurl, {maki: symbol});
						}

						function addMakiSVG(div, symbol, params) {
								const request = new XMLHttpRequest();
								request.onreadystatechange = function() {
										if ((request.readyState === XMLHttpRequest.DONE) &&
												(request.status === 200)) {
												const xml = request.responseXML;
												const rsvg = xml.getElementsByTagName('svg')[0];
												const isvg = div.firstElementChild.getElementsByTagName('svg')[0];

												for(var i=0; i<rsvg.children.length; i++) {
														isvg.appendChild(rsvg.children[i]);
												}
										}
								};
								request.open('GET', L.Util.template(makiimg(symbol)));
								request.send();
						}

						
						function setSVG(div, options) {
								
								const params = {
										width: options.iconSize[0],
										fill: '#2981ca',
										symbolfill: '#ffff00',
										stroke: '#000000',
										strokewidth: 0.3
								};
								
								function inner(symbol) {
										if (/^[a-zA-Z0-9]$/.test(symbol)) {
												params.text = symbol;
												return L.Util.template(svgTextTemplate, params);
										}
										if (symbol) {
												addMakiSVG(div, symbol, params);
												return L.Util.template(svgImgTemplate, params);
										}
										return L.Util.template(svgcircletemplate, params);
								}

								params.inner = inner(options.symbol);
								
								const svg = L.Util.template(svgTemplate, params);

								div.innerHTML = svg;
								return div;
						}

						const div = 	setSVG(document.createElement('div'), options);
						this._setIconStyles(div, 'icon');
						return div;
				}
		});
		function svgIcon(options) {
				return new SVGIcon(options);
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
		 * parse options for provider
		 */
		function providerOptions(elem, defaults) {
				const attrs = elem.attributes;
				const options = (defaults && L.extend({}, defaults)) || {};
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
		 * process geoJSON files
		 */
		function geojsonMarker(feature, latlng) {
				// ToDo: add support for advanced markers/icons
				const p = feature.properties;
				return L.marker(latlng,
												{icon: svgIcon({symbol: p['marker-symbol']})});
		}
		function geojsonStyle(feature) {
				return (feature.properties && feature.properties.pathoptions) || {};
		}
		function geojsonFeature(feature, layer) {
				geojsonPopup(feature, layer);
				const tooltip = feature.properties.tooltip || feature.properties.title;
				if (tooltip) {
						layer.bindTooltip(tooltip);
				}
				const style = feature.properties.style || feature.properties.css ||
									feature.style; // we also support geojsonCSS-like styling
				if (layer.setStyle) {
						layer.setStyle(style);
				}
		}
		function popuphtml(feature) {
				// we support geojsonCSS-like popupTemplate
				const template = feature.properties.popupTemplate || feature.popupTemplate;
				if(template) { return template; }
				var html = "";
				const title = feature.properties.title;
				const desc = feature.properties.description;
				if (title) {
						html = html + "<h2>" + title + "</h2>";
				}
				if (desc) {
						html = html + "<p>" + desc + "</p>";
				}
				if (html) {
						return '<div class="feature">' + html + '</div>';
				}
				return null;
		}
		function geojsonPopup(feature, layer) {
				const content = popuphtml(feature);
				if (!content) { return; }
				const popupoptions = { autoClose: feature.properties.autoclose };
				const popup = layer.bindPopup(content, popupoptions);
				if (feature.properties.openpopup) {
						// hm, does not work, see Leaflet bug
						// https://github.com/Leaflet/Leaflet/issues/971
						// ToDo: fix this
						layer.openPopup();
				}
		}
		function addGeoJSON(lg, url, tooltiptext) {
				const request = new XMLHttpRequest();
				request.overrideMimeType("application/json");
				request.onreadystatechange = function() {
						if ((request.readyState === XMLHttpRequest.DONE) &&
								(request.status === 200)) {
								const json = JSON.parse(request.responseText);
								const layer = L.geoJSON(json, L.easymap.geojson).addTo(lg);
								if (tooltiptext) { layer.bindTooltip(tooltiptext); }
						}
				};
				request.open('GET', url);
				request.send();
		}

		function attributeEasymap(map) {
				// the attributioncontrol property is not part of the official
				// leaflet api, so we test for it
				if (map.attributionControl) {
						map.attributionControl.setPrefix(L.easymap.attribution);
				}
		}
		
		/* 
		 * create the map on elem
		 */
		function mappify(elem) {
				// read the data attributes
				const markertxt = data(elem, "marker");
				const tooltiptext = data(elem, "tooltip");
				const popuptxt = data(elem, "popup");
				const mpos = markertxt && markertxt.split(",");
				const locate = booldata(elem, "locate");
				const origin = getOrigin(elem, mpos );
				const url = data(elem, "geojson");
				
				const map = L.map(elem); // create the map
				map.setView(origin, // set the view
										data(elem, "zoom") || L.easymap.config.zoom);

				attributeEasymap(map);
				
				if(locate) {
						map.locate({ setView: true });
				}

				// Todo: improve baselayer selection (more baselayers)
				const base = tileLayer((data(elem, "provider") ||
																L.easymap.config.default_provider),
															 elem).addTo(map);
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

				if (url) {
						// only deliver tooltip to geojson-callback if there is no marker
						addGeoJSON(map, url, !marker && tooltiptext);
				}

				// add a tooltip
				// if there is an object (marker or geojson) the tooltip is added
				// to the object, otherwise to the tilelayer
				if (tooltiptext) {
						if(marker) {
								marker.bindTooltip(tooltiptext).openTooltip();
						} else if (!url) { // ok, the tooltip has no geojson
								base.bindTooltip(tooltiptext).openTooltip(origin);
						}
				}
		}


		/* The startup sequence */
		function mappify_em(cls) {
				const maps = document.getElementsByClassName(cls ||
																										 L.easymap.config.class); 
				for(var i=0; i<maps.length; i++) {
						mappify(maps[i]);
				}
		}
		// we create something like $(document).ready on our own
		//to avoid JQuery dependency (and we don't support IE before 9).
		var done = false; // only call this once!
		function init_once() {
				if(!done) {
						monkeyPatchPlugins();
						mappify_em();
						done = true;
				}
		}
		document.addEventListener("DOMContentLoaded", init_once); // register
		if(document.readyState !== "loading") { // we may be late
				init_once();                        // so call it
		}
})(window, document);
