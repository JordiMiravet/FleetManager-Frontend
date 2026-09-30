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

    it('should expose the controls label', () => {
      expect(service.graphicsView.controlsLabel).toBe('Vehicle metrics controls');
    });

    it('should expose the title', () => {
      expect(service.graphicsView.title).toBe('Metrics:');
    });

    it('should expose the period filter label', () => {
      expect(service.graphicsView.periodFilterLabel).toBe('Time period filter');
    });

    it('should expose the charts label', () => {
      expect(service.graphicsView.chartsLabel).toBe('Vehicle metrics charts');
    });

    it('should expose the month period label', () => {
      expect(service.graphicsView.periods.month).toBe('This Month');
    });

    it('should expose the year period label', () => {
      expect(service.graphicsView.periods.year).toBe('This Year');
    });

    it('should expose the all time period label', () => {
      expect(service.graphicsView.periods.allTime).toBe('All Time');
    });

  });

  describe('hoursByWeekday', () => {

    it('should expose the accessible title', () => {
      expect(service.hoursByWeekday.title).toBe('Vehicle usage by day of week chart');
    });

    it('should describe the current month', () => {
      expect(service.hoursByWeekday.description(TimePeriod.Month)).toContain('current month');
    });

    it('should describe the current year', () => {
      expect(service.hoursByWeekday.description(TimePeriod.Year)).toContain('current year');
    });

    it('should describe all time', () => {
      expect(service.hoursByWeekday.description(TimePeriod.AllTime)).toContain('all time');
    });

  });

  describe('mostUsedVehicle', () => {

    it('should expose the accessible title', () => {
      expect(service.mostUsedVehicle.title).toBe('Top 3 most used vehicles chart');
    });

    it('should describe the current month', () => {
      expect(service.mostUsedVehicle.description(TimePeriod.Month)).toContain('current month');
    });

    it('should describe the current year', () => {
      expect(service.mostUsedVehicle.description(TimePeriod.Year)).toContain('current year');
    });

    it('should describe all time', () => {
      expect(service.mostUsedVehicle.description(TimePeriod.AllTime)).toContain('all time');
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
