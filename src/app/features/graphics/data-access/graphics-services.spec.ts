import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

import { GraphicsServices } from './graphics-services';
import { EventService } from '../../calendar/data-access/event-service';
import { VehicleService } from '../../vehicle/data-access/vehicle-service';
import { TimePeriod } from '../enums/time-period.enum';

export const authMock = {
  currentUser: {
    uid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
};

describe('GraphicsServices', () => {
  let service: GraphicsServices;
  let eventService: EventService;
  let vehicleService: VehicleService;

  const currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentYear = currentDate.getFullYear();
  const thisMonth = `${currentYear}-${currentMonth}-15`;
  const lastYear = `${currentYear - 1}-${currentMonth}-15`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Auth, useValue: authMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(GraphicsServices);
    eventService = TestBed.inject(EventService);
    vehicleService = TestBed.inject(VehicleService);
  });

  function mockVehicles(vehicles = [
    { _id: 'ferrari-1', name: 'Ferrari Roma' },
    { _id: 'pagani-1', name: 'Pagani Huayra' }
  ]) {
    spyOn(vehicleService, 'vehicles').and.returnValue(vehicles as any);
  }

  function mockEvents(events: any[]) {
    service['eventService']['_allEvents'].set(events);
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getVehicleUsageHours', () => {

    beforeEach(() => mockVehicles());

    it('should return vehicle usage hours for current month', () => {
      mockEvents([
        { _id: '1', vehicleId: 'ferrari-1', date: thisMonth, hourStart: '09:00', hourEnd: '11:00' }
      ]);

      const result = service.getVehicleUsageHours(TimePeriod.Month);

      expect(result.length).toBe(1);
      expect(result[0].vehicleId).toBe('ferrari-1');
      expect(result[0].totalHours).toBe(2);
    });

    it('should return vehicle usage hours for current year', () => {
      mockEvents([
        { _id: '1', vehicleId: 'ferrari-1', date: thisMonth, hourStart: '09:00', hourEnd: '11:00' }
      ]);

      const result = service.getVehicleUsageHours(TimePeriod.Year);

      expect(result.length).toBe(1);
      expect(result[0].totalHours).toBe(2);
    });

    it('should return vehicle usage hours for all time', () => {
      mockEvents([
        { _id: '1', vehicleId: 'ferrari-1', date: lastYear, hourStart: '10:00', hourEnd: '12:00' }
      ]);

      const result = service.getVehicleUsageHours(TimePeriod.AllTime);

      expect(result.length).toBe(1);
      expect(result[0].totalHours).toBe(2);
    });

    it('should ignore events without valid hours', () => {
      mockEvents([
        { _id: '1', vehicleId: 'ferrari-1', date: thisMonth, hourStart: null, hourEnd: null }
      ]);

      const result = service.getVehicleUsageHours(TimePeriod.Month);

      expect(result.length).toBe(0);
    });

    it('should ignore events from other vehicles', () => {
      mockEvents([
        { _id: '1', vehicleId: 'ghost-vehicle', date: thisMonth, hourStart: '09:00', hourEnd: '11:00' }
      ]);

      const result = service.getVehicleUsageHours(TimePeriod.Month);

      expect(result.length).toBe(0);
    });

    it('should return empty array when no vehicle has usage', () => {
      mockEvents([]);

      const result = service.getVehicleUsageHours(TimePeriod.Month);

      expect(result).toEqual([]);
    });

    it('should accumulate hours from multiple events of same vehicle', () => {
      mockEvents([
        { _id: '1', vehicleId: 'ferrari-1', date: thisMonth, hourStart: '09:00', hourEnd: '11:00' },
        { _id: '2', vehicleId: 'ferrari-1', date: thisMonth, hourStart: '14:00', hourEnd: '16:00' }
      ]);

      const result = service.getVehicleUsageHours(TimePeriod.Month);

      expect(result[0].totalHours).toBe(4);
    });

  });

  describe('getMostUsedVehicle', () => {

    it('should return empty array when there are no vehicles with usage');

    it('should return the most used vehicles sorted by total hours');

    it('should return only top three vehicles');

  });

  describe('getHoursByWeekdayPerVehicle', () => {

    it('should return weekday names');

    it('should initialize all vehicles with empty hours');

    it('should accumulate hours on correct weekday');

    it('should ignore events outside selected period');

    it('should ignore events with missing required data');

    it('should return empty hours when there are no events');

  });

  describe('isInPeriod', () => {

    it('should return true for all time period');

    it('should return true when event belongs to current year');

    it('should return false when event does not belong to current year');

    it('should return true when event belongs to current month and year');

    it('should return false when event belongs to different month');

    it('should return false when event belongs to different year');

  });

  describe('calculateEventHours', () => {

    it('should calculate whole hours correctly');

    it('should calculate decimal hours correctly');

    it('should return zero when start and end hours are equal');

    it('should return negative value when end time is before start time');

  });

});