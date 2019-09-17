"use strict";


import {addGeoJSON} from "./geojson.js";
import {data, booldata} from "./util.js";

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
		if(name === "none") { return false; }
		// is the leaflet-providers plugin loaded?
		if (L.tileLayer.provider && !!L.TileLayer.Provider.providers[name.split('.')[0]]) {
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
export function mappify(elem) {
		// read the data attributes
		const markertxt = data(elem, "marker");
		const tooltiptext = data(elem, "tooltip");
		const popuptxt = data(elem, "popup");
		const mpos = markertxt && markertxt.split(",");
		const locate = booldata(elem, "locate");
		const origin = getOrigin(elem, mpos );
		const zoom =	data(elem, "zoom") || L.easymap.config.zoom;
		const url = data(elem, "geojson");
		
		const map = L.map(elem, {worldCopyJump: true}); // create the map
		if(origin != 'geojson') {
				map.setView(origin, zoom); // set the view
		}
		
		attributeEasymap(map);
		
		if(locate) {
				map.locate({ setView: true });
		}
		
		// Todo: improve baselayer selection (more baselayers)
		const base = tileLayer((data(elem, "provider") ||
														L.easymap.config.default_provider),
													 elem);
		if (base) {
				base.addTo(map);
		}
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
				addGeoJSON(map, url, origin=="geojson", !marker && tooltiptext);
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

