export default class Product{
    constructor(private _name: string = '', private _scale: number = 0) {
    }

    set scale(value: number) {
        if (value > 0)
            this._scale = value;
        else  this.generateError('scale');
    }

    set name(value:string) { 
        if (value)
            this._name = value;
        else  this.generateError('name');
    }

    get scale(): number {
        return this._scale;
    }

    get name(): string {
        return this._name;
    }

    private generateError(key: string){
        throw new Error(`The ${key} is invalid`);
    }
}
