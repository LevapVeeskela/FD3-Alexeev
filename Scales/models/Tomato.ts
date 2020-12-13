import Product from "./Product";

export default class Tomato extends Product {
    constructor(kind: string = 'Tomato', scale: number) {
        super(kind, scale);
    }
}