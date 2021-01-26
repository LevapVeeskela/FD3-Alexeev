import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TicketsService } from 'src/app/shared/services/tickets.service';
import { SeatModel } from '../../models/Seat.model';

@Component({
  selector: 'app-hall',
  templateUrl: 'hall.component.html',
  styleUrls: ['hall.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallComponent implements OnInit {
  title = 'Veeskela Cinema Project';
  seats: Observable<any[][]>;

  constructor(private ticketsService: TicketsService) {
    this.seats = this.ticketsService.getSeatsObservable().pipe(map((data: any[][]) => {
      return data.reverse();
    }))
  }

  ngOnInit(): void {

  }

  sellTicket(seat: SeatModel) {
    if (confirm(`Do you will sell it seat : row-${seat.row + 1} number-${seat.numberSeat + 1}?`)) {
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

  getTitle(row: number, numberSeat: number): string {
    return `Row ${row + 1}\nSeat ${numberSeat + 1}`
  }

  isShow(v: any) {
    return (Array.isArray(v) && v.length > 0) || !!v;
  }
}
