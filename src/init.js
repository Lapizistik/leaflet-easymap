"use strict";

import {mappify} from "./mappify.js";


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
let done = false; // only call this once!
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

