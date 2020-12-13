import Product from "./Product";

export default class Apple extends Product {
    constructor(kind: string = 'Apple', scale: number) {
        super(kind, scale);
    }
}