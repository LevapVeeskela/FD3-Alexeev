import Product from './models/Product';
import IStorageEngine from './interfaces/IStorageEngine';

export default class Scale<StorageEngine extends IStorageEngine<Product>> {
    constructor(private store: StorageEngine) { }

    add(prod: Product | Product[]): void {
        if (Array.isArray(prod)) {
            prod.forEach(p => this.store.addItem(p));
            return;
        }
        this.store.addItem(prod);
    }

    getSumScale(): number {
        let sum = 0;
        for (let i = 0; i < this.store.getCount(); i++) {
            sum += this.store.getItem(i).scale;
        }
        return sum;
    }

    getNameList(): string[] {
        let listNames: string[] = [];
        for (let i = 0; i < this.store.getCount(); i++) {
            listNames.push(this.store.getItem(i).name);
        }
        return listNames;
    }
}