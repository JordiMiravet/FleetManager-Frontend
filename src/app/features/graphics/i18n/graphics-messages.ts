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

}
