import { Injectable } from '@angular/core';
import { ILowSeat } from '../interfaces/ILowSeat';
import { SeatModel } from '../models/Seat.model';
import { TicketConstants } from '../constants/constants';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private seatsObservable$: Observable<any[][]>;
  private allSeats: any[][] = [];

  constructor() {
    this.allSeats = this.generateSpectatorSeats(TicketConstants.COUNT_ROW, TicketConstants.COUNT_SEATS_IN_ROW);
    this.seatsObservable$ = new Observable(observer => {
      observer.next(this.allSeats);
    }); // it is same that of(this.allSeats) 

    // this.seatsObservable$.subscribe({
    //   next: value => console.log(value),
    //   error: error => console.error(error),
    //   complete: () => console.log('Complete. Cookie time.')
    // });  // this new syntaxes
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
      let allFreeSeats = this.allSeats.flat().filter((v: SeatModel) => v.isFree);
      for (let i: number = 0; i < allFreeSeats.length; i++) {
        allFreeSeats[i].isFree = false;
        tickets.push(allFreeSeats[i]);
        if (countTickets === i + 1) {
          break;
        }
      }

      return tickets;
    }
    return undefined;
  }

  getCountFreeSeats(): number {
    return this.allSeats.flat().filter((v: SeatModel) => v.isFree).length;
  }

  getCountNotFreeSeats(): number {
    return this.allSeats.flat().filter((v: SeatModel) => !v.isFree).length;
  }

  getAllSeats(): any[] {
    return this.allSeats;
  }

  getSeatsObservable(): Observable<any[][]> {
    return this.seatsObservable$;
  }
}
