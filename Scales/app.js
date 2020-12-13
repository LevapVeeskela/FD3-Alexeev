"use strict";
exports.__esModule = true;
var Apple_1 = require("./models/Apple");
var Tomato_1 = require("./models/Tomato");
var Scale_1 = require("./Scale");
var prodcts = [
    new Apple_1["default"]('Gala', 100),
    new Apple_1["default"]('Fuji', 303),
    new Apple_1["default"]('McIntosh', 201),
    new Tomato_1["default"]('Полудетерминантные', 155),
    new Tomato_1["default"]('Среднеранние ', 400)
];
var scale = new Scale_1["default"]();
scale.addRange(prodcts);
scale.add(new Tomato_1["default"]('Штамбовые ', 210));
scale.add(new Apple_1["default"]('Red Delicious ', 137));
scale.add(new Apple_1["default"]('McIntosh', 130));
scale.add(new Apple_1["default"]('McIntosh', 325));
console.log("List names: " + scale.getNameList() + ";");
console.log("Total scales: " + scale.getSumScale() + ";");
console.log("McIntosh scales: " + scale.getSumScale('McIntosh') + ";");
