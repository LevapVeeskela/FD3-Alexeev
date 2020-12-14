import Product from './models/Product';
import IStorageEngine from './interfaces/IStorageEngine';

export default class Scale<StorageEngine extends IStorageEngine<Product>> {
    constructor(private store: StorageEngine) { }

    add(prod: Product | Product[]): void {
        if (Array.isArray(prod)) {
            prod.forEach((p:Product) => this.store.addItem(p));
            return;
        }
        this.store.addItem(prod);
    }

    getSumScale(): number {
        let sum:number = 0;
        for (let i:number = 0; i < this.store.getCount(); i++) {
            sum += this.store.getItem(i).scale;
        }
        return sum;
    }

    getNameList(): string[] {
        let listNames: string[] = [];
        for (let i:number = 0; i < this.store.getCount(); i++) {
            listNames.push(this.store.getItem(i).name);
        }
        return listNames;
    }
}