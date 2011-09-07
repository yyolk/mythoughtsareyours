
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.
/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}
	
	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break; 

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};
	
	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};
	
})(jQuery);

//jQuery Text-Shadow
//

/*!
 * Text shadow animation jQuery-plugin
 * http://alexpeattie.com/projects/text-shadow-animation
 * Copyright 2011 Alex Peattie <alexpeattie@gmail.com>
 * Contributor: Edwin Martin <edwin@bitstorm.org>
 * Released under the MIT and GPL licenses.
 */

jQuery(function($) {
	/**
	 * Check whether the browser supports RGBA color mode.
	 *
	 * Author Mehdi Kabab <http://pioupioum.fr>
	 * @return {boolean} True if the browser support RGBA. False otherwise.
	 */
	function isRGBACapable() {
		var $script = $('script:first'),
				color = $script.css('color'),
				result = false;
		if (/^rgba/.test(color)) {
			result = true;
		} else {
			try {
				result = ( color != $script.css('color', 'rgba(0, 0, 0, 0.5)').css('color') );
				$script.css('color', color);
			} catch (e) {
			}
		}

		return result;
	}

	$.extend(true, $, {
		support: {
			'rgba': isRGBACapable()
		}
	});

	/*************************************/

	// Extend the animate-function
	$.fx.step['textShadow'] = function(fx) {
		if (!fx.init) {
			//We have to pass the font size to the parseShadow method, to allow the use of em units
			var fontSize = $(fx.elem).get(0).style['fontSize'] || $(fx.elem).css('fontSize')
			var beginShadow = $(fx.elem).get(0).style['textShadow'] || $(fx.elem).css('textShadow')

			//In cases where text-shadow is none, or is not returned by browser (e.g. current versions of Opera)
			//then set the beginning and ending shadow to be equal, so no animation
			if(beginShadow == ('' || 'none')) { beginShadow = fx.end }

			fx.begin = parseShadow(beginShadow, fontSize);
			fx.end = $.extend({}, fx.begin, parseShadow(fx.end, fontSize));
			fx.init = true;
		}
		fx.elem.style.textShadow = calculateShadow(fx.begin, fx.end, fx.pos);
	}


	// Calculate an in-between shadow.
	function calculateShadow(begin, end, pos) {
		var parts = [];

		if (typeof end.right != 'undefined') {
			parts.push(parseInt(begin.right + pos * (end.right - begin.right)) + 'px '
					+ parseInt(begin.bottom + pos * (end.bottom - begin.bottom)) + 'px');
		}
		if (typeof end.blur != 'undefined') {
			parts.push(parseInt(begin.blur + pos * (end.blur - begin.blur)) + 'px');
		}

		if (typeof end.color != 'undefined') {
			var color = 'rgb' + ($.support.rgba ? 'a' : '') + '('
					+ parseInt((begin.color[0] + pos * (end.color[0] - begin.color[0]))) + ','
					+ parseInt((begin.color[1] + pos * (end.color[1] - begin.color[1]))) + ','
					+ parseInt((begin.color[2] + pos * (end.color[2] - begin.color[2])));
			if ($.support.rgba) {
				color += ',' + parseFloat(begin.color[3] + pos * (end.color[3] - begin.color[3]));
			}
			color += ')';
			parts.push(color);
		}
		var value = parts.join(' ');
		return value;
	}

	// Parse the shadow value and extract the values.
	function parseShadow(shadow, fontSize) {
		var match, color, lengths, valpx, parsedShadow = {};

		// Parse an CSS-syntax color. Outputs an array [r, g, b]
		// Match #aabbcc
		if (match = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(shadow)) {
			color = [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16), 1];

			// Match #abc
		} else if (match = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(shadow)) {
			color = [parseInt(match[1], 16) * 17, parseInt(match[2], 16) * 17, parseInt(match[3], 16) * 17, 1];

			// Match rgb(n, n, n)
		} else if (match = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(shadow)) {
			color = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), 1];

			// Match rgba(n, n, n, n)
		} else if (match = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(shadow)) {
			color = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]),parseFloat(match[4])];

			// No browser returns rgb(n%, n%, n%), so little reason to support this format.
		}

		// Remove the color value from the string for the next round of parsing
		lengths = shadow.replace(match[0], '');

		// Parse offset and blur            
		if (match = /(-*[0-9.]+(?:px|em|pt)?)\s+(-*[0-9.]+(?:px|em|pt)?)\s+(-*[0-9.]+(?:px|em|pt)?)/.exec(lengths)) {

			// Rough and ready em/pt > px conversion
			valpx = match.slice(1).map(function(v) {
				var unit = v.match(/em|pt/);
				if(unit == "em") return parseFloat(v) * parseInt(fontSize);
				if(unit == "pt") return parseInt(v)/72*96;
				return parseInt(v);
			});
			parsedShadow = {right: valpx[0], bottom: valpx[1], blur: valpx[2]};
		}

		parsedShadow.color = color;
		return parsedShadow;
	}
});
