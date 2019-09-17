
/*
 * SVG-based markers for geojson
 * including support for maki-markers
 */
const svgTemplate = '<svg style="width:{iconwidth};" viewBox="-10.5 -30.5 21 31.4" xmlns="http://www.w3.org/2000/svg"><path d="m 0,0 c 0,0 -10,-15 -10,-20 0,-5 5,-10 10,-10 5,0 10,5 10,10 C 10,-15 0,0 0,0 Z" style="fill:{marker-color};stroke:{stroke};stroke-width:{stroke-width};" />{inner}</svg>';

const svgTextTemplate = '<text x="0" y="-15" text-anchor="middle" style="stroke:none;fill:{marker-symbolcolor}">{text}</text>';

const svgImgTemplate = '<svg x="-7" y="-25" width="14" height="14" style="fill:{marker-symbolcolor};"></svg>';

const svgcircletemplate = '<circle r="4.2" cy="-20" cx="0" style="fill:{marker-symbolcolor};stroke:{stroke};stroke-width:{stroke-width};" />';

const svgShadowTemplate = '<svg style="width:{iconwidth};" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><defs><filter id="f" height="1.7" y="-0.2" width="1.4" x="-0.2"><feGaussianBlur stdDeviation="1.5491099" /></filter></defs><path d="m 2,18 c 1.4,-2 1,-3.5 3,-6.5 1.5,-3 6.8,-7 10,-8 3,-1 5,-0.8 7,0 1.6,0.9 3.5,1.8 3,3 -0.4,1 0,3 -2,5 -2,1.8 -5.7,3 -9,4 -3.4,1 -8.8,2 -11,3 z" style="opacity:0.1;fill:#000;stroke:none;filter:url(#f);" /></svg>';

		
const SVGIcon = L.DivIcon.extend({
		options: {
				className: 'svg-icon',
				iconSize : L.easymap.config.iconsizes['medium'],
				'marker-color': '#7e7e7e',
				'marker-symbolcolor': '#ffffff',
				stroke: '#555555',
				'stroke-width': 0.3,
				'stroke-opacity': 1
				
		},
		initialize: function(options) {
				options = L.Util.setOptions(this, options);
				
				options.iconSize =
						L.easymap.config.iconsizes[options['marker-size']] ||
						options.iconSize;
				if (!isNaN(options.iconSize)) {
						const size = options.iconSize;
						options.iconSize = [size, size*1.48];
				}
				options.iconAnchor = [options.iconSize[0]/2, options.iconSize[1]];
				options.popupAnchor = [0, -0.8*options.iconSize[1]];
				options.tooltipAnchor = [0, -0.6*options.iconSize[1]];
				
				// and the shadow
				options.shadowSize = options.shadowSize || 0.8*options.iconSize[1];
				if (!isNaN(options.shadowSize)) {
						const size = options.shadowSize;
						options.shadowSize = [size, size*0.5];
				}
				options.shadowAnchor = [0.1*options.shadowSize[0],
																1.2*options.shadowSize[1]];
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
										const isvg = div.firstElementChild.
													getElementsByTagName('svg')[0];
										const iattrs = isvg.attributes;
										
										for(var i=0; i<iattrs.length; i++) {
												rsvg.setAttributeNode(iattrs[i].cloneNode());
										}
										
										/*												for(var i=0; i<rsvg.children.length; i++) {
																							isvg.appendChild(rsvg.children[i]);
																							}
										*/
										isvg.parentNode.replaceChild(rsvg, isvg);
										
								}
						};
						request.open('GET', L.Util.template(makiimg(symbol)));
						request.send();
				}
				
				
				function setSVG(div, options) {
						
						const params = L.extend({
								iconwidth: options.iconSize[0]
						}, options);
						
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
						
						params.inner = inner(options["marker-symbol"] ||
																 options.symbol);
						
						const svg = L.Util.template(svgTemplate, params);
						
						div.innerHTML = svg;
						return div;
				}
				
				const div = 	setSVG(document.createElement('div'), options);
				this._setIconStyles(div, 'icon');
				return div;
		},
		createShadow: function(oldIcon) {
				const div = document.createElement('div');
				const svg = L.Util.template(svgShadowTemplate,
																		{iconwidth: this.options.iconSize[0]*10});
				div.innerHTML = svg;
				this._setIconStyles(div, 'shadow');
				return div;
		}
});
export function svgIcon(options) {
		return new SVGIcon(options);
}
