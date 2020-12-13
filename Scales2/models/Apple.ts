import IScalable from "../interfaces/IScalable";

export default class Apple implements IScalable {
    constructor(private kind: string = 'Apple', private scale: number) {}

    getScale(): number {
        return this.scale;
    }

    getName(): string {
        return this.kind;
    }
}