"use strict";

import "./config.js";
import {svgIcon} from "./svgicon.js";

L.easymap.geojson = {
		style: geojsonStyle,
		pointToLayer: geojsonMarker,
		onEachFeature: geojsonFeature
};

function geojsonMarker(feature, latlng) {
		// ToDo: add support for advanced markers/icons
		return L.marker(latlng,
										{icon: svgIcon(feature.properties)});
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
export function addGeoJSON(map, url, pan2, tooltiptext) {
		const request = new XMLHttpRequest();
		request.overrideMimeType("application/json");
		request.onreadystatechange = function() {
				if ((request.readyState === XMLHttpRequest.DONE) &&
						(request.status === 200)) {
						const json = parseGeoJSON(request.responseText);
						const layer = L.geoJSON(json, L.easymap.geojson).addTo(map);
						if(pan2) {
								map.fitBounds(layer.getBounds());
						}
						if (tooltiptext) { layer.bindTooltip(tooltiptext); }
				}
		};
		request.open('GET', url);
		request.send();
}

// color props from symplestyle-spec (we added the key "color"
const PROPKEYS = /^(?:(?:marker-(?:symbol)?)?colou?r|stroke|fill)$/;
// the following regexp matches short and long RGB and RGBA strings,
// e.g. "007", "4711", "affe", "c010ff", "bbaadd08c0"
// Fortunately, none of the 140 color names supported by CSS matches
// this regexp, so they are preserved :-)
const PROPCOLORS = /^(?:[0-9a-fA-F]{3,4}){1,2}$/;

function parseGeoJSON(jsontxt) {
		// The simplestyle-spec allows for hex colors to omit the `#'.
		// We assume it is save to add it for a selected set of properties.
		return JSON.parse(jsontxt,
											function(key, value) {
													if (PROPKEYS.test(key) &&
															PROPCOLORS.test(value)) {
															return '#' + value;
													} else {
															return value;
													}
											});
}
