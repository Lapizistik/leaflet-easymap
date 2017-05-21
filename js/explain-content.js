// let's have some anonymous function (as a scope)
(function() {

		function style(str) {
				const fstr = str.replace(/\t/g, "  ");
				const ind = /^ +/m.exec(fstr);
				if(!ind) { return str; }
				
				const ii = ind[0].length - 2;
				const re = new RegExp("^ {" + ii + "}", "mg");
				return fstr.replace(re, "");
		}
		
		function explain(elem) {
				var fc = elem.getElementsByTagName("figcaption")[0];
				if(!fc) {
						fc = document.createElement("figcaption");
						elem.appendChild(fc);
				}
				const inner = elem.querySelector(".leasymap");
				
				const code =  document.createElement("code");
				code.setAttribute("class", "lang-html");
				code.textContent = style(inner.outerHTML);
				fc.appendChild(code);
		}

		
		/* The startup sequence */
		function explain_em(cls) {
				const elems = document.getElementsByClassName(cls || "explain-content"); 
				for(var i=0; i<elems.length; i++) {
						explain(elems[i]);
				}
		}
		// we create something like $(document).ready on our own
		//to avoid JQuery dependency (and we don't support IE before 9).
		var done = false; // only call this once!
		function init_once() {
				if(!done) {
						explain_em();
						done = true;
				}
		}
		document.addEventListener("DOMContentLoaded", init_once); // register
		if(document.readyState !== "loading") { // we may be late
				init_once();                        // so call it
		}
})();
