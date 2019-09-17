"use strict";

// have data accessor similar to jQuery
export function data(elem, attr) {
		// should we return an array if attr is "[…]" ?
		return elem.getAttribute("data-" + attr);
}

// same for boolean values
export function booldata(elem, attr) {
		return ((data(elem, attr)||"").toUpperCase() == "TRUE");
}		
