"use strict";
exports.__esModule = true;
var Scale = /** @class */ (function () {
    function Scale(products) {
        if (products === void 0) { products = []; }
        this.products = products;
    }
    Scale.prototype.add = function (prod) {
        this.products.push(prod);
    };
    Scale.prototype.addRange = function (prods) {
        this.products = this.products.concat(prods);
    };
    Scale.prototype.getSumScale = function (nameProduct) {
        if (typeof nameProduct != 'undefined' && nameProduct) {
            return this.reduceScaleProducts(this.products.filter(function (p) { return p.getName() === nameProduct; }));
        }
        return this.reduceScaleProducts(this.products);
    };
    Scale.prototype.getNameList = function () {
        return this.products.map(function (p) { return p.getName(); }).join(', ');
    };
    Scale.prototype.reduceScaleProducts = function (prods) {
        if (prods.length === 0) {
            return 0;
        }
        return prods.map(function (p) { return p.getScale(); }).reduce(function (accumulator, currentValue) { return accumulator + currentValue; });
    };
    return Scale;
}());
exports["default"] = Scale;
