import { ILowSeat } from "../interfaces/ILowSeat";

export class SeatModel implements ILowSeat{
    row: number;
    numberSeat: number;
    isFree: boolean;

    constructor(row: number, numberSeat: number, isFree: boolean) {
        this.row = row;
        this.numberSeat = numberSeat;
        this.isFree = isFree;
    }
} 