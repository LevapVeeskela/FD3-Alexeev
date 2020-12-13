import Product from './models/Product';

export default class Scale {
    constructor(private products: Product[] = []) { }

    add(prod: Product): void {
        this.products.push(prod);
    }

    addRange(prods: Product[]): void {
        this.products = this.products.concat(prods);
    }

    getSumScale(nameProduct?: string): number {
        if (typeof nameProduct != 'undefined' && nameProduct) {
            return this.reduceScaleProducts(this.products.filter((p: Product) => p.getName() === nameProduct))
        }
        return this.reduceScaleProducts(this.products);
    }

    getNameList(): string[] {
        return this.products.map((p: Product) => p.getName());
    }

    private reduceScaleProducts(prods: Product[]): number {
        if (prods.length === 0) {
            return 0;
        }
        return prods.map((p: Product) => p.getScale()).reduce((accumulator: number, currentValue: number) => accumulator + currentValue)
    }
}