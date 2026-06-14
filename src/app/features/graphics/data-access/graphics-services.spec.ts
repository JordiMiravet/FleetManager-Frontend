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

    it('should return vehicle usage hours for current month');

    it('should return vehicle usage hours for current year');

    it('should return vehicle usage hours for all time');

    it('should ignore events without valid hours');

    it('should ignore events from other vehicles');

    it('should return empty array when no vehicle has usage');

    it('should accumulate hours from multiple events of same vehicle');

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