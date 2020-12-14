
export default interface IStorageEngine<T> {
    addItem(item:T): void;
    getItem(index:number | string): T; 
    getCount(): number;
}