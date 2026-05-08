import { Component } from '@angular/core';
import { CalendarViewComponent } from '../../components/calendar-view/calendar-view';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ CalendarViewComponent ],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.css',
})
export class CalendarComponent {}
