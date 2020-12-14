import IScalable from '../interfaces/IScalable';
import IStorageEngine from '../interfaces/IStorageEngine';

export default class ScalesStorageEngineArray<Tin extends IScalable> implements IStorageEngine<Tin> {
    
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
