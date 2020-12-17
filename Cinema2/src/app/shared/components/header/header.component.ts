import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TicketsService } from 'src/app/shared/services/tickets.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  seatsSubject: Subject<any[][]>;
  constructor(private ticketsService: TicketsService) { 
    this.seatsSubject = ticketsService.getSeatsSubject();
  }

  ngOnInit(): void {
    this.seatsSubject.pipe(
      debounceTime(2000),
    ).subscribe({ next: (seats:any[][]) => {
      let count = this.getCountFreeSeats();
      alert(count > 0 ? `Dear visitors ${this.getCountFreeSeats()} tickets left!` : 'All tickets are sold out!');
    }});
  }

  getCountFreeSeats(): number {
    return this.ticketsService.getCountFreeSeats();
  }

  getCountNotFreeSeats(): number {
    return this.ticketsService.getCountNotFreeSeats();;
  }
}
