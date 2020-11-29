export const ProductModel = function (id, name, price, photo, count, colors) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.photo = photo;
    this.count = count;
    this.colors = colors;
}

ProductModel.prototype.defaultValues = function () {
    return new ProductModel(0, '', 0, '', 0, []);
}