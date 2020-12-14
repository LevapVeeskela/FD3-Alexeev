import IScalable from '../interfaces/IScalable';
import IStorageEngine from '../interfaces/IStorageEngine';
import Product from '../models/Product';
// import Factory from '../factory';

export default class ScalesStorageEngineArray<Tin extends IScalable> implements IStorageEngine<Tin> {

    constructor(private store = localStorage) {
        store.clear();
    }

    addItem(item: IScalable): void {
        this.store.setItem(this.store.length.toString(), JSON.stringify(item))
    }

    getItem(key: number | string): Tin {
        if (typeof (key) === 'number') {
            return this.convertToTin(this.store.getItem(this.store.key(key)));
        }
        return this.convertToTin(this.store.getItem(key));
    }

    getCount(): number {
        return this.store.length;
    }

    private convertToTin(value: string): Tin {
        return <Tin>JSON.parse(value);
    }
}
