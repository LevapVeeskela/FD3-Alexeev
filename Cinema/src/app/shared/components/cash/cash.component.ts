import { Component, Input, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/tickets.service';

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
  constructor(private ticketsService: TicketsService) { }

  ngOnInit(): void {
  }

  buyTickets() {
    let result = this.ticketsService.sellTicket(undefined, this.count);
    if (result) {
      this.isAlertClosed = true;
      this.textTooltip = `You bought in ${this.title}: ${Array.isArray(result) ? `${result.length} tickets` : `seat${result.numberSeat} in ${result.row} row`}`
    }
  }

}
