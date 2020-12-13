"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Product_1 = require("./Product");
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato(kind, scale) {
        if (kind === void 0) { kind = 'Tomato'; }
        return _super.call(this, kind, scale) || this;
    }
    return Tomato;
}(Product_1["default"]));
exports["default"] = Tomato;
