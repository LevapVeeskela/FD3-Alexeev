import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TicketsService } from 'src/app/shared/services/tickets.service';
import { SeatModel } from '../../models/Seat.model';

@Component({
  selector: 'app-hall',
  templateUrl: 'hall.component.html',
  styleUrls: ['hall.component.scss']
})
export class HallComponent implements OnInit {
  title = 'Veeskela Cinema Project';
  seats: any[] = [];
  seatsSubject: Subject<any[][]>;
  constructor(private ticketsService: TicketsService) { 
    this.seatsSubject = ticketsService.getSeatsSubject();
  }

  ngOnInit(): void {
    this.ticketsService.getSeatsObservable().subscribe({
      next: (seats: any[][]) => {
        console.log(seats)
        this.seats = seats.reverse();
        console.log('HallComponent this.ticketsService.getSeatsObservable next')
      },
      error: error => console.error(error),
      complete: () => console.log('HallComponent this.ticketsService.getSeatsObservable() completed.')
    });
  }

  sellTicket(seat: SeatModel) {
    if (confirm(`Do you will sell it seat : row-${seat.row} number-${seat.numberSeat}?`)) {
      this.ticketsService.sellTicket(seat);
      this.seatsSubject.next(this.ticketsService.getAllSeats());
    }
  }

  getSeatStyle(seat: SeatModel): object {
    const url = seat.isFree ? '/assets/free.png' : '/assets/not-free.png';
    return {
      'display': 'block',
      'background-repeat': 'no-repeat',
      'background-image': `url(${url})`,
      'width': `130px`,
      'height': `130px`,
    }
  }

  getTitle(row: number, numberSeat: number): string {
    return `Row ${row + 1}\nSeat ${numberSeat + 1}`
  }

  isShow(v: any) {
    return (Array.isArray(v) && v.length > 0) || !!v;
  }
}
