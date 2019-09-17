"use strict";

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
		makiurl: "maki/icons/{maki}-15.svg"
};


