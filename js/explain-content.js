/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/explain-content.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/explain-content.js":
/*!********************************!*\
  !*** ./src/explain-content.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// let's have some anonymous function (as a scope)\n(function () {\n  function style(str) {\n    var fstr = str.replace(/\\t/g, \"  \");\n    var ind = /^ +/m.exec(fstr);\n\n    if (!ind) {\n      return str;\n    }\n\n    var ii = ind[0].length - 2;\n    var re = new RegExp(\"^ {\" + ii + \"}\", \"mg\");\n    return fstr.replace(re, \"\");\n  }\n\n  function explain(elem) {\n    var fc = elem.getElementsByTagName(\"figcaption\")[0];\n\n    if (!fc) {\n      fc = document.createElement(\"figcaption\");\n      elem.appendChild(fc);\n    }\n\n    var inner = elem.querySelector(\".leasymap\");\n    var code = document.createElement(\"code\");\n    code.setAttribute(\"class\", \"lang-html\");\n    code.textContent = style(inner.outerHTML);\n    fc.appendChild(code);\n  }\n  /* The startup sequence */\n\n\n  function explain_em(cls) {\n    var elems = document.getElementsByClassName(cls || \"explain-content\");\n\n    for (var i = 0; i < elems.length; i++) {\n      explain(elems[i]);\n    }\n  } // we create something like $(document).ready on our own\n  //to avoid JQuery dependency (and we don't support IE before 9).\n\n\n  var done = false; // only call this once!\n\n  function init_once() {\n    if (!done) {\n      explain_em();\n      done = true;\n    }\n  }\n\n  document.addEventListener(\"DOMContentLoaded\", init_once); // register\n\n  if (document.readyState !== \"loading\") {\n    // we may be late\n    init_once(); // so call it\n  }\n})();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZXhwbGFpbi1jb250ZW50LmpzPzE5M2IiXSwibmFtZXMiOlsic3R5bGUiLCJzdHIiLCJmc3RyIiwicmVwbGFjZSIsImluZCIsImV4ZWMiLCJpaSIsImxlbmd0aCIsInJlIiwiUmVnRXhwIiwiZXhwbGFpbiIsImVsZW0iLCJmYyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJpbm5lciIsInF1ZXJ5U2VsZWN0b3IiLCJjb2RlIiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJvdXRlckhUTUwiLCJleHBsYWluX2VtIiwiY2xzIiwiZWxlbXMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiaSIsImRvbmUiLCJpbml0X29uY2UiLCJhZGRFdmVudExpc3RlbmVyIiwicmVhZHlTdGF0ZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxDQUFDLFlBQVc7QUFFVixXQUFTQSxLQUFULENBQWVDLEdBQWYsRUFBb0I7QUFDbEIsUUFBTUMsSUFBSSxHQUFHRCxHQUFHLENBQUNFLE9BQUosQ0FBWSxLQUFaLEVBQW1CLElBQW5CLENBQWI7QUFDQSxRQUFNQyxHQUFHLEdBQUcsT0FBT0MsSUFBUCxDQUFZSCxJQUFaLENBQVo7O0FBQ0EsUUFBRyxDQUFDRSxHQUFKLEVBQVM7QUFBRSxhQUFPSCxHQUFQO0FBQWE7O0FBRXhCLFFBQU1LLEVBQUUsR0FBR0YsR0FBRyxDQUFDLENBQUQsQ0FBSCxDQUFPRyxNQUFQLEdBQWdCLENBQTNCO0FBQ0EsUUFBTUMsRUFBRSxHQUFHLElBQUlDLE1BQUosQ0FBVyxRQUFRSCxFQUFSLEdBQWEsR0FBeEIsRUFBNkIsSUFBN0IsQ0FBWDtBQUNBLFdBQU9KLElBQUksQ0FBQ0MsT0FBTCxDQUFhSyxFQUFiLEVBQWlCLEVBQWpCLENBQVA7QUFDRDs7QUFFRCxXQUFTRSxPQUFULENBQWlCQyxJQUFqQixFQUF1QjtBQUNyQixRQUFJQyxFQUFFLEdBQUdELElBQUksQ0FBQ0Usb0JBQUwsQ0FBMEIsWUFBMUIsRUFBd0MsQ0FBeEMsQ0FBVDs7QUFDQSxRQUFHLENBQUNELEVBQUosRUFBUTtBQUNOQSxRQUFFLEdBQUdFLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixZQUF2QixDQUFMO0FBQ0FKLFVBQUksQ0FBQ0ssV0FBTCxDQUFpQkosRUFBakI7QUFDRDs7QUFDRCxRQUFNSyxLQUFLLEdBQUdOLElBQUksQ0FBQ08sYUFBTCxDQUFtQixXQUFuQixDQUFkO0FBRUEsUUFBTUMsSUFBSSxHQUFJTCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBZDtBQUNBSSxRQUFJLENBQUNDLFlBQUwsQ0FBa0IsT0FBbEIsRUFBMkIsV0FBM0I7QUFDQUQsUUFBSSxDQUFDRSxXQUFMLEdBQW1CckIsS0FBSyxDQUFDaUIsS0FBSyxDQUFDSyxTQUFQLENBQXhCO0FBQ0FWLE1BQUUsQ0FBQ0ksV0FBSCxDQUFlRyxJQUFmO0FBQ0Q7QUFHRDs7O0FBQ0EsV0FBU0ksVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUI7QUFDdkIsUUFBTUMsS0FBSyxHQUFHWCxRQUFRLENBQUNZLHNCQUFULENBQWdDRixHQUFHLElBQUksaUJBQXZDLENBQWQ7O0FBQ0EsU0FBSSxJQUFJRyxDQUFDLEdBQUMsQ0FBVixFQUFhQSxDQUFDLEdBQUNGLEtBQUssQ0FBQ2xCLE1BQXJCLEVBQTZCb0IsQ0FBQyxFQUE5QixFQUFrQztBQUNoQ2pCLGFBQU8sQ0FBQ2UsS0FBSyxDQUFDRSxDQUFELENBQU4sQ0FBUDtBQUNEO0FBQ0YsR0FqQ1MsQ0FrQ1Y7QUFDQTs7O0FBQ0EsTUFBSUMsSUFBSSxHQUFHLEtBQVgsQ0FwQ1UsQ0FvQ1E7O0FBQ2xCLFdBQVNDLFNBQVQsR0FBcUI7QUFDbkIsUUFBRyxDQUFDRCxJQUFKLEVBQVU7QUFDUkwsZ0JBQVU7QUFDVkssVUFBSSxHQUFHLElBQVA7QUFDRDtBQUNGOztBQUNEZCxVQUFRLENBQUNnQixnQkFBVCxDQUEwQixrQkFBMUIsRUFBOENELFNBQTlDLEVBM0NVLENBMkNnRDs7QUFDMUQsTUFBR2YsUUFBUSxDQUFDaUIsVUFBVCxLQUF3QixTQUEzQixFQUFzQztBQUFFO0FBQ3RDRixhQUFTLEdBRDJCLENBQ0E7QUFDckM7QUFDRixDQS9DRCIsImZpbGUiOiIuL3NyYy9leHBsYWluLWNvbnRlbnQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBsZXQncyBoYXZlIHNvbWUgYW5vbnltb3VzIGZ1bmN0aW9uIChhcyBhIHNjb3BlKVxuKGZ1bmN0aW9uKCkge1xuXG5cdFx0ZnVuY3Rpb24gc3R5bGUoc3RyKSB7XG5cdFx0XHRcdGNvbnN0IGZzdHIgPSBzdHIucmVwbGFjZSgvXFx0L2csIFwiICBcIik7XG5cdFx0XHRcdGNvbnN0IGluZCA9IC9eICsvbS5leGVjKGZzdHIpO1xuXHRcdFx0XHRpZighaW5kKSB7IHJldHVybiBzdHI7IH1cblx0XHRcdFx0XG5cdFx0XHRcdGNvbnN0IGlpID0gaW5kWzBdLmxlbmd0aCAtIDI7XG5cdFx0XHRcdGNvbnN0IHJlID0gbmV3IFJlZ0V4cChcIl4ge1wiICsgaWkgKyBcIn1cIiwgXCJtZ1wiKTtcblx0XHRcdFx0cmV0dXJuIGZzdHIucmVwbGFjZShyZSwgXCJcIik7XG5cdFx0fVxuXHRcdFxuXHRcdGZ1bmN0aW9uIGV4cGxhaW4oZWxlbSkge1xuXHRcdFx0XHR2YXIgZmMgPSBlbGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZmlnY2FwdGlvblwiKVswXTtcblx0XHRcdFx0aWYoIWZjKSB7XG5cdFx0XHRcdFx0XHRmYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWdjYXB0aW9uXCIpO1xuXHRcdFx0XHRcdFx0ZWxlbS5hcHBlbmRDaGlsZChmYyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgaW5uZXIgPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoXCIubGVhc3ltYXBcIik7XG5cdFx0XHRcdFxuXHRcdFx0XHRjb25zdCBjb2RlID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIpO1xuXHRcdFx0XHRjb2RlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGFuZy1odG1sXCIpO1xuXHRcdFx0XHRjb2RlLnRleHRDb250ZW50ID0gc3R5bGUoaW5uZXIub3V0ZXJIVE1MKTtcblx0XHRcdFx0ZmMuYXBwZW5kQ2hpbGQoY29kZSk7XG5cdFx0fVxuXG5cdFx0XG5cdFx0LyogVGhlIHN0YXJ0dXAgc2VxdWVuY2UgKi9cblx0XHRmdW5jdGlvbiBleHBsYWluX2VtKGNscykge1xuXHRcdFx0XHRjb25zdCBlbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xzIHx8IFwiZXhwbGFpbi1jb250ZW50XCIpOyBcblx0XHRcdFx0Zm9yKHZhciBpPTA7IGk8ZWxlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGV4cGxhaW4oZWxlbXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHRcdC8vIHdlIGNyZWF0ZSBzb21ldGhpbmcgbGlrZSAkKGRvY3VtZW50KS5yZWFkeSBvbiBvdXIgb3duXG5cdFx0Ly90byBhdm9pZCBKUXVlcnkgZGVwZW5kZW5jeSAoYW5kIHdlIGRvbid0IHN1cHBvcnQgSUUgYmVmb3JlIDkpLlxuXHRcdHZhciBkb25lID0gZmFsc2U7IC8vIG9ubHkgY2FsbCB0aGlzIG9uY2UhXG5cdFx0ZnVuY3Rpb24gaW5pdF9vbmNlKCkge1xuXHRcdFx0XHRpZighZG9uZSkge1xuXHRcdFx0XHRcdFx0ZXhwbGFpbl9lbSgpO1xuXHRcdFx0XHRcdFx0ZG9uZSA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHR9XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdF9vbmNlKTsgLy8gcmVnaXN0ZXJcblx0XHRpZihkb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImxvYWRpbmdcIikgeyAvLyB3ZSBtYXkgYmUgbGF0ZVxuXHRcdFx0XHRpbml0X29uY2UoKTsgICAgICAgICAgICAgICAgICAgICAgICAvLyBzbyBjYWxsIGl0XG5cdFx0fVxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/explain-content.js\n");

/***/ })

/******/ });