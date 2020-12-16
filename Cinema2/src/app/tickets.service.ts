import { Injectable } from '@angular/core';
import { ILowSeat } from './shared/interfaces/ILowSeat';
import { SeatModel } from './shared/models/Seat.model';
import { TicketConstants } from './shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private seats: any[][];

  constructor() {
    this.seats = this.generateSpectatorSeats(TicketConstants.COUNT_ROW, TicketConstants.COUNT_SEATS_IN_ROW);
  }

  private generateSpectatorSeats(countRow: number, countSeatsInRow: number): any[][] {
    let seats = [];
    for (let i: number = 0; i < countRow; i++) {
      const row: SeatModel[] = seats[i] = [];
      for (let j: number = 0; j < countSeatsInRow; j++) {
        row.push(new SeatModel(i, j, true))
      }
    }
    return seats;
  }

  sellTicket(seat?: SeatModel, countTickets?: number): ILowSeat | ILowSeat[] | undefined {
    if (seat && seat.isFree) {
      seat.isFree = false;
      return seat;
    }
    if (countTickets) {
      let tickets: ILowSeat[] = [];
      let allFreeSeats = this.seats.flat().filter((v: SeatModel) => v.isFree);

      for (let i: number = 0; i < allFreeSeats.length; i++) {
        allFreeSeats[i].isFree = false;
        tickets.push(allFreeSeats[i]);
        if(countTickets === i+1){
          break;
        }
      }
      return tickets;
    }
    return undefined;
  }

  getCountFreeSeats(): number {
    return this.seats.flat().filter((v: SeatModel) => v.isFree).length;
  }

  getCountNotFreeSeats(): number {
    return this.seats.flat().filter((v: SeatModel) => !v.isFree).length;
  }

  getAllSeats(): any[]{
    return this.seats;
  }
}
