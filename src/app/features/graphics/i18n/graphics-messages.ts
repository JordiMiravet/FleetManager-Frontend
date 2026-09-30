import { Injectable } from '@angular/core';

import { TimePeriod } from '../enums/time-period.enum';

@Injectable({
  providedIn: 'root',
})
export class GraphicsMessagesService {

    /* graphics-view */

  readonly graphicsView = {
    controlsLabel: 'Vehicle metrics controls',
    title: 'Metrics:',
    periodFilterLabel: 'Time period filter',
    chartsLabel: 'Vehicle metrics charts',
    periods: {
      month: 'This Month',
      year: 'This Year',
      allTime: 'All Time',
    },
  };
  
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

  /* most-used-vehicle-chart */

  readonly mostUsedVehicle = {
    title: 'Top 3 most used vehicles chart',
    description: (period: TimePeriod): string =>
      `A bar chart showing the top three vehicles by total hours of usage during ${this.periodDescription(period)}. Visual representation only.`,
    datasetLabel: (period: TimePeriod): string =>
      `Top 3 Most Used (${this.periodDescription(period)})`
  };

  /* vehicle-usage-hours-chart */

  readonly vehicleUsageHours = {
    title: 'Vehicle usage hours distribution chart',
    description: (period: TimePeriod): string =>
      `A doughnut chart showing the distribution of vehicle usage hours for the ${this.periodDescription(period)}. Visual representation only. Hover over chart segments to see individual vehicle data.`,
    datasetLabel: (period: TimePeriod): string =>
      `Hours of Use (${this.periodDescription(period)})`
  };

}
