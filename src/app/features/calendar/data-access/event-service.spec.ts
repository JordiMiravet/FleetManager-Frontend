import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { EventService } from './event-service';
import { EventInterface } from '../interfaces/event';

const API_URL = 'http://localhost:3000/events';

const mockEvents: EventInterface[] = [
  { _id: '1', title: 'Date', date: '2026-03-26', hourStart: '09:00', hourEnd: '10:00', vehicleId: 'Ferrari-1', comment: '' },
  { _id: '2', title: 'Route', date: '2026-03-26', hourStart: '11:00', hourEnd: '12:00', vehicleId: 'Pagani-1', comment: '' },
  { _id: '3', title: 'Work', date: '2026-04-23', hourStart: '08:00', hourEnd: '09:00', vehicleId: 'Ferrari-1', comment: 'Coment' },
];

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function loadMockEvents(events: EventInterface[] = mockEvents): void {
    service.loadEvents();
    httpMock.expectOne(API_URL).flush(events);
  }

  describe('Service creation', () => {

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

  });

  describe('loadEvents', () => {

    it('should call GET /events', () => {
      service.loadEvents();

      const req = httpMock.expectOne(API_URL);
      expect(req.request.method).toBe('GET');

      req.flush(mockEvents);
    });

    it('should update _allEvents signal with received events', () => {
      loadMockEvents();

      expect(service.calendarEvents()).toEqual(mockEvents);
    });

    it('should set empty events when API returns empty array', () => {
      service.loadEvents();

      httpMock.expectOne(API_URL).flush([]);

      expect(service.calendarEvents()).toEqual([]);
    });

  });

  describe('getEventById', () => {

    const mockEvent = mockEvents[0];

    it('should call GET /events/:id', () => {
      service.getEventById('1').subscribe();

      const req = httpMock.expectOne(`${API_URL}/1`);
      expect(req.request.method).toBe('GET');

      req.flush(mockEvent);
    });

    it('should return the requested event', () => {
      let result: EventInterface | undefined;

      service.getEventById('1').subscribe(event => result = event);

      const req = httpMock.expectOne(`${API_URL}/1`);
      req.flush(mockEvent);

      expect(result).toEqual(mockEvent);
    });

    it('should propagate request errors', () => {
      let errorResponse: unknown;

      service.getEventById('999').subscribe({
        error: error => errorResponse = error
      });

      const req = httpMock.expectOne(`${API_URL}/999`);
      req.flush('Not found', {
        status: 404,
        statusText: 'Not Found'
      });

      expect(errorResponse).toBeTruthy();
    });

  });

  describe('selectedVehicleId', () => {

    it('should be null by default', () => {
      expect(service.selectedVehicleId()).toBeNull();
    });

    it('should allow updating the selected vehicle id', () => {
      service.selectedVehicleId.set('Ferrari-1');

      expect(service.selectedVehicleId()).toBe('Ferrari-1');
    });

  });

  describe('calendarEvents', () => {

    beforeEach(() => loadMockEvents());

    it('should return all events when no vehicle is selected', () => {
      expect(service.calendarEvents()).toEqual(mockEvents);
    });

    it('should return only events matching selected vehicle', () => {
      service.selectedVehicleId.set('Ferrari-1');

      expect(service.calendarEvents()).toEqual([mockEvents[0], mockEvents[2]]);
    });

    it('should return empty array when selected vehicle has no events', () => {
      service.selectedVehicleId.set('veh-999');

      expect(service.calendarEvents()).toEqual([]);
    });

  });

  describe('getEventsByDate', () => {

    beforeEach(() => loadMockEvents());

    it('should return events matching the provided date', () => {
      expect(service.getEventsByDate('2026-03-26')).toEqual([mockEvents[0], mockEvents[1]]);
    });

    it('should return empty array when no events exist for the date', () => {
      expect(service.getEventsByDate('2099-01-01')).toEqual([]);
    });

    it('should apply vehicle filter before date filter', () => {
      service.selectedVehicleId.set('Ferrari-1');

      expect(service.getEventsByDate('2026-03-26')).toEqual([mockEvents[0]]);
    });

  });

  describe('addEvent', () => {

    const newEvent: Omit<EventInterface, '_id'> = {
      title: 'New Event', 
      date: '2026-03-28', 
      hourStart: '10:00', 
      hourEnd: '11:00', 
      vehicleId: 'Ferrari-1', 
      comment: ''
    };

    const createdEvent: EventInterface = { _id: '99', ...newEvent };

    it('should call POST /events', () => {
      service.addEvent(newEvent);

      const req = httpMock.expectOne(API_URL);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newEvent);

      req.flush(createdEvent);
    });

    it('should add returned event to _allEvents', () => {
      service.addEvent(newEvent);

      httpMock.expectOne(API_URL).flush(createdEvent);

      expect(service.calendarEvents()).toContain(createdEvent);
    });

    it('should append event without removing existing ones', () => {
      loadMockEvents();

      service.addEvent(newEvent);
      httpMock.expectOne(API_URL).flush(createdEvent);

      expect(service.calendarEvents()).toEqual([...mockEvents, createdEvent]);
    });

  });

  describe('updateEvent', () => {

    beforeEach(() => loadMockEvents());

    it('should call PUT /events/:id', () => {
      const updatedEvent: EventInterface = { ...mockEvents[0], title: 'Updated Event' };

      service.updateEvent(updatedEvent);

      const req = httpMock.expectOne(`${API_URL}/1`);
      expect(req.request.method).toBe('PUT');

      req.flush(updatedEvent);
    });

    it('should send only expected properties in payload', () => {
      const updatedEvent: EventInterface = { ...mockEvents[0], title: 'Updated Event', comment: 'New comment' };

      service.updateEvent(updatedEvent);

      const req = httpMock.expectOne(`${API_URL}/1`);

      expect(req.request.body).toEqual({
        title: 'Updated Event',
        date: updatedEvent.date,
        hourStart: updatedEvent.hourStart,
        hourEnd: updatedEvent.hourEnd,
        vehicleId: updatedEvent.vehicleId,
        comment: 'New comment'
      });

      req.flush(updatedEvent);
    });

    it('should replace updated event in _allEvents', () => {
      const updatedEvent: EventInterface = { ...mockEvents[0], title: 'Updated Event' };

      service.updateEvent(updatedEvent);

      httpMock.expectOne(`${API_URL}/1`).flush(updatedEvent);

      expect(service.calendarEvents()).toContain(updatedEvent);
    });

    it('should not modify other events', () => {
      const updatedEvent: EventInterface = { ...mockEvents[0], title: 'Updated Event' };

      service.updateEvent(updatedEvent);

      httpMock.expectOne(`${API_URL}/1`).flush(updatedEvent);

      expect(service.calendarEvents()).toContain(mockEvents[1]);
      expect(service.calendarEvents()).toContain(mockEvents[2]);
    });

    it('should send empty string when comment is undefined', () => {
      const updatedEvent: EventInterface = { ...mockEvents[1], comment: undefined as any };

      service.updateEvent(updatedEvent);

      const req = httpMock.expectOne(`${API_URL}/2`);
      expect(req.request.body.comment).toBe('');

      req.flush(updatedEvent);
    });

  });

  describe('deleteEvent', () => {

    beforeEach(() => loadMockEvents());

    it('should call DELETE /events/:id', () => {
      service.deleteEvent('1');

      const req = httpMock.expectOne(`${API_URL}/1`);
      expect(req.request.method).toBe('DELETE');

      req.flush(null);
    });

    it('should remove deleted event from _allEvents', () => {
      service.deleteEvent('1');

      httpMock.expectOne(`${API_URL}/1`).flush(null);

      expect(service.calendarEvents()).not.toContain(mockEvents[0]);
    });

    it('should not remove other events', () => {
      service.deleteEvent('1');

      httpMock.expectOne(`${API_URL}/1`).flush(null);

      expect(service.calendarEvents()).toContain(mockEvents[1]);
      expect(service.calendarEvents()).toContain(mockEvents[2]);
    });

  });

});