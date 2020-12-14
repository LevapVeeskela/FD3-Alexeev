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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Product = /** @class */ (function () {
    function Product(_name, _scale) {
        if (_name === void 0) { _name = ''; }
        if (_scale === void 0) { _scale = 0; }
        this._name = _name;
        this._scale = _scale;
    }
    Object.defineProperty(Product.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        set: function (value) {
            if (value > 0)
                this._scale = value;
            else
                this.generateError('scale');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            if (value)
                this._name = value;
            else
                this.generateError('name');
        },
        enumerable: true,
        configurable: true
    });
    Product.prototype.generateError = function (key) {
        throw new Error("The " + key + " is invalid");
    };
    return Product;
}());
exports.default = Product;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Product_1 = __webpack_require__(0);
var Scale_1 = __webpack_require__(2);
var ScalesStorageEngineArray_1 = __webpack_require__(3);
var ScalesStorageEngineLocalStorage_1 = __webpack_require__(4);
var factory_1 = __webpack_require__(5);
var prodcts = [
    new Product_1.default('Gala', 100),
    new Product_1.default('Fuji', 303),
    new Product_1.default('McIntosh', 201),
    new Product_1.default('Полудетерминантные', 155),
    new Product_1.default('Среднеранние', 400)
];
var firstScale = new Scale_1.default(factory_1.default(ScalesStorageEngineArray_1.default));
var secondScale = new Scale_1.default(factory_1.default(ScalesStorageEngineLocalStorage_1.default));
firstScale.add(prodcts);
firstScale.add(new Product_1.default('Штамбовые', 210));
firstScale.add(new Product_1.default('Red Delicious', 137));
firstScale.add(new Product_1.default('McIntosh', 130));
firstScale.add(new Product_1.default('McIntosh', 325));
secondScale.add(prodcts);
secondScale.add(new Product_1.default('Red Delicious', 333));
console.log("List names first store: " + firstScale.getNameList() + ";");
console.log("Total scales: " + firstScale.getSumScale() + ";");
console.log("List names second store: " + secondScale.getNameList() + ";");
console.log("Total scales: " + secondScale.getSumScale() + ";");


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Product_1 = __webpack_require__(0);
var Scale = /** @class */ (function () {
    function Scale(store) {
        this.store = store;
    }
    Scale.prototype.add = function (prod) {
        var _this = this;
        if (Array.isArray(prod)) {
            prod.forEach(function (p) { return _this.store.addItem(p); });
            return;
        }
        this.store.addItem(prod);
    };
    Scale.prototype.getSumScale = function () {
        var sum = 0;
        for (var i = 0; i < this.store.getCount(); i++) {
            sum += this.convertToProduct(this.store.getItem(i)).scale;
        }
        return sum;
    };
    Scale.prototype.getNameList = function () {
        var listNames = [];
        for (var i = 0; i < this.store.getCount(); i++) {
            listNames.push(this.convertToProduct(this.store.getItem(i)).name);
        }
        return listNames;
    };
    Scale.prototype.convertToProduct = function (value) {
        var prod = new Product_1.default();
        Object.assign(prod, value);
        return prod;
    };
    return Scale;
}());
exports.default = Scale;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ScalesStorageEngineArray = /** @class */ (function () {
    function ScalesStorageEngineArray(store) {
        if (store === void 0) { store = []; }
        this.store = store;
    }
    ScalesStorageEngineArray.prototype.addItem = function (item) {
        this.store.push(item);
    };
    ScalesStorageEngineArray.prototype.getItem = function (index) {
        return this.store[index];
    };
    ScalesStorageEngineArray.prototype.getCount = function () {
        return this.store.length;
    };
    return ScalesStorageEngineArray;
}());
exports.default = ScalesStorageEngineArray;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import Factory from '../factory';
var ScalesStorageEngineArray = /** @class */ (function () {
    function ScalesStorageEngineArray(store) {
        if (store === void 0) { store = localStorage; }
        this.store = store;
        store.clear();
    }
    ScalesStorageEngineArray.prototype.addItem = function (item) {
        this.store.setItem(this.store.length.toString(), JSON.stringify(item));
    };
    ScalesStorageEngineArray.prototype.getItem = function (key) {
        if (typeof (key) === 'number') {
            return this.convertToTin(this.store.getItem(this.store.key(key)));
        }
        return this.convertToTin(this.store.getItem(key));
    };
    ScalesStorageEngineArray.prototype.getCount = function () {
        return this.store.length;
    };
    ScalesStorageEngineArray.prototype.convertToTin = function (value) {
        return JSON.parse(value);
    };
    return ScalesStorageEngineArray;
}());
exports.default = ScalesStorageEngineArray;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function uniFactory(classRef) {
    return new classRef();
}
exports.default = uniFactory;


/***/ })
/******/ ]);