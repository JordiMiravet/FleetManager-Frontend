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

  describe('hoursByWeekday', () => {

    it('should expose the accessible title', () => {
      expect(service.hoursByWeekday.title).toBe('Vehicle usage by day of week chart');
    });

    it('should describe the current month', () => {
      expect(service.hoursByWeekday.description(TimePeriod.Month))
        .toContain('current month');
    });

    it('should describe the current year', () => {
      expect(service.hoursByWeekday.description(TimePeriod.Year))
        .toContain('current year');
    });

    it('should describe all time', () => {
      expect(service.hoursByWeekday.description(TimePeriod.AllTime))
        .toContain('all time');
    });

  });

  describe('mostUsedVehicle', () => {

    it('should expose the accessible title', () => {
      expect(service.mostUsedVehicle.title).toBe('Top 3 most used vehicles chart');
    });

    it('should describe the current month', () => {
      expect(service.mostUsedVehicle.description(TimePeriod.Month))
        .toContain('current month');
    });

    it('should describe the current year', () => {
      expect(service.mostUsedVehicle.description(TimePeriod.Year))
        .toContain('current year');
    });

    it('should describe all time', () => {
      expect(service.mostUsedVehicle.description(TimePeriod.AllTime))
        .toContain('all time');
    });

    it('should build the dataset label for the current month', () => {
      expect(service.mostUsedVehicle.datasetLabel(TimePeriod.Month))
        .toBe('Top 3 Most Used (current month)');
    });

    it('should build the dataset label for the current year', () => {
      expect(service.mostUsedVehicle.datasetLabel(TimePeriod.Year))
        .toBe('Top 3 Most Used (current year)');
    });

    it('should build the dataset label for all time', () => {
      expect(service.mostUsedVehicle.datasetLabel(TimePeriod.AllTime))
        .toBe('Top 3 Most Used (all time)');
    });

  });


});