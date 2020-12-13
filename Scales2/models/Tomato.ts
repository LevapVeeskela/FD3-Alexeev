import IScalable from "../interfaces/IScalable";

export default class Tomato implements IScalable {
    constructor(private kind: string = 'Tomato',private scale: number) {}

    getScale(): number {
        return this.scale;
    }
    
    getName(): string {
        return this.kind;
    }
}