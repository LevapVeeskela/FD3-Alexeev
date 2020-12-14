import Product from './models/Product';
import IStorageEngine from './interfaces/IStorageEngine';
import IScalable from './interfaces/IScalable';

export default class Scale<StorageEngine extends IStorageEngine<IScalable>> {
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
            sum += this.convertToProduct(this.store.getItem(i)).scale;
        }
        return sum;
    }

    getNameList(): string[] {
        let listNames: string[] = [];
        for (let i = 0; i < this.store.getCount(); i++) {
            listNames.push(this.convertToProduct(this.store.getItem(i)).name);
        }
        return listNames;
    }

    private convertToProduct(value: IScalable): IScalable {
        let prod = new Product();
        Object.assign(prod, value);
        return prod;
    }
}