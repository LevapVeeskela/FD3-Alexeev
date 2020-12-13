import IScalable from "./interfaces/IScalable";

export default class Scale {
    constructor(private products: IScalable[] = []) { }

    // add(prod: IScalable): void; // старая запись перегрузки в метода TS
    // add(prods: IScalable[]) : void;
    // add(arg: any): void 
    // {
    //     if (Array.isArray(arg)){
    //         this.products = this.products.concat(arg);
    //         return;
    //     }
    //     this.products.push(arg);
    // }

    add(prod: IScalable | IScalable[]): void { // c TS 1.4 появились union типы
        if(Array.isArray(prod)){
            this.products = this.products.concat(prod); // автотипизация c помощью types guards
            return;
        }
        this.products.push(prod);
    }

    getSumScale(nameProduct?: string): number {
        if (typeof nameProduct != 'undefined' && nameProduct) {
            return this.reduceScaleProducts(this.products.filter((p: IScalable) => p.getName() === nameProduct))
        }
        return this.reduceScaleProducts(this.products);
    }

    getNameList(): string[] {
        return this.products.map((p: IScalable) => p.getName());
    }

    private reduceScaleProducts(prods: IScalable[]): number {
        if (prods.length === 0) {
            return 0;
        }
        return prods.map((p: IScalable) => p.getScale()).reduce((accumulator: number, currentValue: number) => accumulator + currentValue)
    }
}