import { TestBed } from '@angular/core/testing';

import { GraphicsMessagesService } from './graphics-messages';

import { TimePeriod } from '../enums/time-period.enum';

describe('GraphicsMessagesService', () => {
  let service: GraphicsMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphicsMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('graphicsView', () => {

    it('should expose the view messages', () => {
      expect(service.graphicsView).toEqual({
        controlsLabel: 'Vehicle metrics controls',
        title: 'Metrics:',
        periodFilterLabel: 'Time period filter',
        chartsLabel: 'Vehicle metrics charts',
        periods: {
          month: 'This Month',
          year: 'This Year',
          allTime: 'All Time',
        },
      });
    });

  });

  describe('hoursByWeekday', () => {

    it('should expose the title', () => {
      expect(service.hoursByWeekday.title).toBe('Vehicle usage by day of week chart');
    });

    it('should describe the current month', () => {
      expect(service.hoursByWeekday.description(TimePeriod.Month)).toBe(
        'A line chart showing the number of hours each vehicle was used on each day of the week for the current month. Visual representation only.'
      );
    });

    it('should describe the current year', () => {
      expect(service.hoursByWeekday.description(TimePeriod.Year)).toBe(
        'A line chart showing the number of hours each vehicle was used on each day of the week for the current year. Visual representation only.'
      );
    });

    it('should describe all time', () => {
      expect(service.hoursByWeekday.description(TimePeriod.AllTime)).toBe(
        'A line chart showing the number of hours each vehicle was used on each day of the week for the all time. Visual representation only.'
      );
    });

    it('should describe the selected period for an unsupported period', () => {
      expect(service.hoursByWeekday.description('unknown' as TimePeriod)).toBe(
        'A line chart showing the number of hours each vehicle was used on each day of the week for the selected period. Visual representation only.'
      );
    });

  });

  describe('mostUsedVehicle', () => {

    it('should expose the title', () => {
      expect(service.mostUsedVehicle.title).toBe('Top 3 most used vehicles chart');
    });

    it('should describe the current month', () => {
      expect(service.mostUsedVehicle.description(TimePeriod.Month)).toBe(
        'A bar chart showing the top three vehicles by total hours of usage during current month. Visual representation only.'
      );
    });

    it('should describe the current year', () => {
      expect(service.mostUsedVehicle.description(TimePeriod.Year)).toBe(
        'A bar chart showing the top three vehicles by total hours of usage during current year. Visual representation only.'
      );
    });

    it('should describe all time', () => {
      expect(service.mostUsedVehicle.description(TimePeriod.AllTime)).toBe(
        'A bar chart showing the top three vehicles by total hours of usage during all time. Visual representation only.'
      );
    });

    it('should build the dataset label for the current month', () => {
      expect(service.mostUsedVehicle.datasetLabel(TimePeriod.Month)).toBe('Top 3 Most Used (current month)');
    });

    it('should build the dataset label for the current year', () => {
      expect(service.mostUsedVehicle.datasetLabel(TimePeriod.Year)).toBe('Top 3 Most Used (current year)');
    });

    it('should build the dataset label for all time', () => {
      expect(service.mostUsedVehicle.datasetLabel(TimePeriod.AllTime)).toBe('Top 3 Most Used (all time)');
    });

  });

  describe('vehicleUsageHours', () => {

    it('should expose the accessible title', () => {
      expect(service.vehicleUsageHours.title).toBe('Vehicle usage hours distribution chart');
    });

    it('should describe the current month', () => {
      expect(service.vehicleUsageHours.description(TimePeriod.Month)).toContain('current month');
    });

    it('should describe the current year', () => {
      expect(service.vehicleUsageHours.description(TimePeriod.Year)).toContain('current year');
    });

    it('should describe all time', () => {
      expect(service.vehicleUsageHours.description(TimePeriod.AllTime)).toContain('all time');
    });

    it('should build the dataset label for the current month', () => {
      expect(service.vehicleUsageHours.datasetLabel(TimePeriod.Month)).toBe('Hours of Use (current month)');
    });

    it('should build the dataset label for the current year', () => {
      expect(service.vehicleUsageHours.datasetLabel(TimePeriod.Year)).toBe('Hours of Use (current year)');
    });

    it('should build the dataset label for all time', () => {
      expect(service.vehicleUsageHours.datasetLabel(TimePeriod.AllTime)).toBe('Hours of Use (all time)');
    });

  });

});
