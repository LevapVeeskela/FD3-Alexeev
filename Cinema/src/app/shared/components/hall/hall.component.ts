import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/tickets.service';
import { SeatModel } from '../../models/Seat.model';

@Component({
  selector: 'app-hall',
  templateUrl: 'hall.component.html',
  styleUrls: ['hall.component.scss']
})
export class HallComponent implements OnInit {
  title = 'Veeskela Cinema Project';
  seats: any[] = [];
  
  constructor(private ticketsService: TicketsService) { }

  ngOnInit(): void {
    this.seats = this.ticketsService.getAllSeats().reverse();
  }

  sellTicket(seat: SeatModel){
    if(confirm(`Do you will sell it seat : row-${seat.row} number-${seat.numberSeat}?`)){
      this.ticketsService.sellTicket(seat);
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

  getTitle(row: number, numberSeat: number): string{
    return `Row ${row + 1}\nSeat ${numberSeat + 1}`
  }
}
