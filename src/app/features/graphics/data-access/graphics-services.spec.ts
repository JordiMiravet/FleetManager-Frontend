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

    beforeEach(() => {
      mockVehicles([
        { _id: 'ferrari-1', name: 'Ferrari Roma' },
        { _id: 'pagani-1', name: 'Pagani Huayra' },
        { _id: 'lambo-1', name: 'Lamborghini Huracan' },
        { _id: 'mclaren-1', name: 'McLaren 720s' }
      ]);
    });

    it('should return empty array when there are no vehicles with usage', () => {
      mockEvents([]);

      const result = service.getMostUsedVehicle(TimePeriod.Month);

      expect(result).toEqual([]);
    });

    it('should return the most used vehicles sorted by total hours', () => {
      mockEvents([
        { _id: '1', vehicleId: 'ferrari-1', date: thisMonth, hourStart: '09:00', hourEnd: '11:00' },
        { _id: '2', vehicleId: 'pagani-1', date: thisMonth, hourStart: '09:00', hourEnd: '15:00' }
      ]);

      const result = service.getMostUsedVehicle(TimePeriod.Month);

      expect(result[0].vehicleId).toBe('pagani-1');
      expect(result[1].vehicleId).toBe('ferrari-1');
    });

    it('should return only top three vehicles', () => {
      mockEvents([
        { _id: '1', vehicleId: 'ferrari-1', date: thisMonth, hourStart: '09:00', hourEnd: '11:00' },
        { _id: '2', vehicleId: 'pagani-1', date: thisMonth, hourStart: '09:00', hourEnd: '15:00' },
        { _id: '3', vehicleId: 'lambo-1', date: thisMonth, hourStart: '09:00', hourEnd: '13:00' },
        { _id: '4', vehicleId: 'mclaren-1', date: thisMonth, hourStart: '09:00', hourEnd: '12:00' }
      ]);

      const result = service.getMostUsedVehicle(TimePeriod.Month);

      expect(result.length).toBe(3);
    });

  });

  describe('getHoursByWeekdayPerVehicle', () => {

    const getThisTuesday = (): string => {
      const d = new Date(currentYear, currentDate.getMonth(), 1);
      while (d.getDay() !== 2) d.setDate(d.getDate() + 1);
      return `${currentYear}-${currentMonth}-${String(d.getDate()).padStart(2, '0')}`;
    };

    beforeEach(() => mockVehicles([{ _id: 'ferrari-1', name: 'Ferrari Roma' }]));

    it('should return weekday names', () => {
      mockEvents([]);

      const { weekdayNames } = service.getHoursByWeekdayPerVehicle(TimePeriod.Month);

      expect(weekdayNames).toEqual(['monday','tuesday','wednesday','thursday','friday','saturday','sunday']);
    });

    it('should initialize all vehicles with empty hours', () => {
      mockEvents([]);

      const { vehicles } = service.getHoursByWeekdayPerVehicle(TimePeriod.Month);

      expect(vehicles[0].hours).toEqual([0,0,0,0,0,0,0]);
    });

    it('should accumulate hours on correct weekday', () => {
      const tuesday = getThisTuesday();
      mockEvents([
        { _id: '1', vehicleId: 'ferrari-1', date: tuesday, hourStart: '09:00', hourEnd: '11:00' }
      ]);

      const { vehicles } = service.getHoursByWeekdayPerVehicle(TimePeriod.Month);

      expect(vehicles[0].hours[1]).toBe(2);
    });

    it('should ignore events outside selected period', () => {
      mockEvents([
        { _id: '1', vehicleId: 'ferrari-1', date: lastYear, hourStart: '09:00', hourEnd: '11:00' }
      ]);

      const { vehicles } = service.getHoursByWeekdayPerVehicle(TimePeriod.Month);

      expect(vehicles[0].hours.every((h: number) => h === 0)).toBeTrue();
    });

    it('should ignore events with missing required data', () => {
      mockEvents([
        { _id: '1', vehicleId: 'ferrari-1', date: thisMonth, hourStart: null, hourEnd: null }
      ]);

      const { vehicles } = service.getHoursByWeekdayPerVehicle(TimePeriod.Month);

      expect(vehicles[0].hours.every((h: number) => h === 0)).toBeTrue();
    });

    it('should return empty hours when there are no events', () => {
      mockEvents([]);

      const { vehicles } = service.getHoursByWeekdayPerVehicle(TimePeriod.Month);

      expect(vehicles[0].hours).toEqual([0,0,0,0,0,0,0]);
    });

  });

  describe('isInPeriod', () => {

    const thisYearOtherMonth = currentDate.getMonth() === 0
      ? `${currentYear}-02-15`
      : `${currentYear}-01-15`;

    it('should return true for all time period', () => {
      expect(service['isInPeriod'](lastYear, TimePeriod.AllTime)).toBeTrue();
    });

    it('should return true when event belongs to current year', () => {
      expect(service['isInPeriod'](thisMonth, TimePeriod.Year)).toBeTrue();
    });

    it('should return false when event does not belong to current year', () => {
      expect(service['isInPeriod'](lastYear, TimePeriod.Year)).toBeFalse();
    });

    it('should return true when event belongs to current month and year', () => {
      expect(service['isInPeriod'](thisMonth, TimePeriod.Month)).toBeTrue();
    });

    it('should return false when event belongs to different month', () => {
      expect(service['isInPeriod'](thisYearOtherMonth, TimePeriod.Month)).toBeFalse();
    });

    it('should return false when event belongs to different year', () => {
      expect(service['isInPeriod'](lastYear, TimePeriod.Month)).toBeFalse();
    });

  });

  describe('calculateEventHours', () => {

    it('should calculate whole hours correctly', () => {
      expect(service['calculateEventHours']('09:00', '11:00')).toBe(2);
    });

    it('should calculate decimal hours correctly', () => {
      expect(service['calculateEventHours']('09:00', '10:30')).toBe(1.5);
    });

    it('should return zero when start and end hours are equal', () => {
      expect(service['calculateEventHours']('10:00', '10:00')).toBe(0);
    });

    it('should return negative value when end time is before start time', () => {
      expect(service['calculateEventHours']('12:00', '10:00')).toBe(-2);
    });

  });

});