import IStorageEngine from '../interfaces/IStorageEngine';
import Product from '../models/Product';

export default class ScalesStorageEngineArray implements IStorageEngine<Product> {

    constructor(private store = localStorage) {
        store.clear();
    }

    addItem(item: Product): void {
        this.store.setItem(this.store.length.toString(), JSON.stringify(item))
    }

    getItem(key: number | string): Product {
        if (typeof (key) === 'number') {
            return this.convertToProduct(this.store.getItem(this.store.key(key)));
        }
        return this.convertToProduct(this.store.getItem(key));
    }

    getCount(): number {
        return this.store.length;
    }

    private convertToProduct(value: string): Product {
        const {_name, _scale} = JSON.parse(value);
        return new Product(_name, _scale);
    }
}
