export default class Product{
    constructor(private name: string, private scale: number) {
    }

    getScale(): number {
        return this.scale;
    }

    getName(): string {
        return this.name;
    }
}
