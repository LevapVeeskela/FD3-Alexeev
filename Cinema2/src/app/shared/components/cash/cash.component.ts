import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TicketsService } from 'src/app/shared/services/tickets.service';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-cash',
  templateUrl: 'cash.component.html',
  styleUrls: ['cash.component.scss']
})
export class CashComponent implements OnInit {
  @Input()
  title: string = '';
  count: number = 0;
  isAlertClosed: boolean = false;
  textTooltip: string = '';
  seatsSubject: Subject<any[][]>;
  constructor(private ticketsService: TicketsService) {
    this.seatsSubject = ticketsService.getSeatsSubject();
  }

  ngOnInit(): void {
    this.seatsSubject.pipe(debounceTime(2000)).subscribe({
      next: (seats: any[][]) => {
        this.count = this.getCountFreeSeats() > 0 ? this.count : 0;
      }
    });
  }

  buyTickets() {
    let currentTickets = this.ticketsService.getCountFreeSeats();
    let isConfirm = true;
    if (this.count > currentTickets) {
      isConfirm = confirm(`We have ${currentTickets} tickets only, do u buy its?`);
    }
    if (isConfirm) {
      let result = this.ticketsService.sellTicket(undefined, this.count);
      if (result) {
        this.isAlertClosed = true;
        this.textTooltip = `You bought in ${this.title}: ${Array.isArray(result) ? `${result.length} tickets` : `seat${result.numberSeat} in ${result.row} row`}`
      }
    }
    this.seatsSubject.next(this.ticketsService.getAllSeats());
    this.count = 0;
  }

  getIsDisabledBuy(): boolean {
    return this.ticketsService.getCountFreeSeats() === 0 || this.count === 0;
  }

  getCountFreeSeats(): number {
    return this.ticketsService.getCountFreeSeats();
  } 
  
  getPattern(): string {
    return `[1-${this.ticketsService.getCountFreeSeats()}]`;
  }
}
