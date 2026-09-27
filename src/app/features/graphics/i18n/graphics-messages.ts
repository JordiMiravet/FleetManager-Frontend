import { Injectable } from '@angular/core';

import { TimePeriod } from '../enums/time-period.enum';

@Injectable({
  providedIn: 'root',
})
export class GraphicsMessagesService {

  private readonly periodDescription = (period: TimePeriod): string => {
    switch (period) {
      case TimePeriod.Month:
        return 'current month';
      case TimePeriod.Year:
        return 'current year';
      case TimePeriod.AllTime:
        return 'all time';
      default:
        return 'selected period';
    }
  };

  /* hours-by-weekday-vehicle-chart */

  readonly hoursByWeekday = {
    title: 'Vehicle usage by day of week chart',
    description: (period: TimePeriod): string =>
      `A line chart showing the number of hours each vehicle was used on each day of the week for the ${this.periodDescription(period)}. Visual representation only.`
  };

}
