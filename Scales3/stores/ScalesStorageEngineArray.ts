import IStorageEngine from '../interfaces/IStorageEngine';
import Product from '../models/Product';

export default class ScalesStorageEngineArray<Tin extends Product> implements IStorageEngine<Tin> {
    
    constructor(private store: Tin[] = []){}
    
    addItem(item: Tin): void {
        this.store.push(item)
    }
    
    getItem(index: number): Tin {
        return this.store[index];
    }

    getCount(): number {
       return this.store.length;
    }
}
