import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  interpolation: ['[',']']
})
export class AppComponent {
  count: number = 0;
  title = 'Numword';
}
