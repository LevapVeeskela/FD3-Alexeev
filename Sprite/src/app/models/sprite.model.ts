export class SpriteModel {
    url: string;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    constructor(
        url: string,
        offsetX: number,
        offsetY: number,
        width: number,
        height: number
    ) {
        this.url = url;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.width = width;
        this.height = height;
    }
}