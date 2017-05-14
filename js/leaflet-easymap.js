// let's have some anonymous function (as a scope)
(function() {
		if(!("L" in window)) {
				throw new ReferenceError("You must load Leaflet to use easymap!");
		}
		L.easymap = {
				config: {
						basemaps: {
								osm_org: {
										url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
										attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								}
						},
						origin: [51.48, 0],
						zoom:14
				}
		};

		/* create the map */
		function mappify(elem) {
				const map = L.map(elem);
				const basemap = L.easymap.config.basemaps.osm_org;

				map.setView(L.easymap.config.origin,L.easymap.config.zoom);
				L.tileLayer(basemap.url,
										{attribution: basemap.attribution}).addTo(map);
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
