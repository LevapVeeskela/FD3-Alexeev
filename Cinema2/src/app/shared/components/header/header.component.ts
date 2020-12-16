import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/shared/services/tickets.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private ticketsService: TicketsService) {
  }

  ngOnInit(): void {
  }

  getCountFreeSeats(): number {
    return this.ticketsService.getCountFreeSeats();
  }

  getCountNotFreeSeats(): number {
    return this.ticketsService.getCountNotFreeSeats();;
  }
}
