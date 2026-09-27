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

    });

    it('should describe the current month', () => {

    });

    it('should describe the current year', () => {

    });

    it('should describe all time', () => {

    });

    it('should build the dataset label for the current month', () => {

    });

    it('should build the dataset label for the current year', () => {

    });

    it('should build the dataset label for all time', () => {

    });

  });


});