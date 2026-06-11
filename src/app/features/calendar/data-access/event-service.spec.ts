import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

import { EventService } from './event-service';
import { EventInterface } from '../interfaces/event';

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
    // Verificar que no quedan peticiones HTTP pendientes
    httpMock.verify();
  });

  describe('Creación del servicio', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('loadEvents', () => {

    const mockEvents: EventInterface[] = [
      { _id: '1', title: 'Event 1', date: '2026-02-13', hourStart: '09:00', hourEnd: '10:00', vehicleId: 'veh-1', comment: '' },
      { _id: '2', title: 'Event 2', date: '2026-02-14', hourStart: '11:00', hourEnd: '12:00', vehicleId: 'veh-2', comment: 'Comentario' },
    ];

    it('should call GET /events', () => {
      service.loadEvents();

      const req = httpMock.expectOne('http://localhost:3000/events');
      expect(req.request.method).toBe('GET');

      req.flush(mockEvents);
    });

    it('should update _allEvents signal with received events', () => {
      service.loadEvents();

      const req = httpMock.expectOne('http://localhost:3000/events');
      req.flush(mockEvents);

      expect(service.calendarEvents()).toEqual(mockEvents);
    });

  });

  describe('getEventById', () => {

    const mockEvent: EventInterface = {
      _id: '1', title: 'Event 1', date: '2026-02-13', hourStart: '09:00', hourEnd: '10:00', vehicleId: 'veh-1', comment: ''
    };

    it('should call GET /events/:id', () => {
      service.getEventById('1').subscribe();

      const req = httpMock.expectOne('http://localhost:3000/events/1');
      expect(req.request.method).toBe('GET');

      req.flush(mockEvent);
    });

    it('should return the requested event', () => {
      let result: EventInterface | undefined;

      service.getEventById('1').subscribe(event => result = event);

      const req = httpMock.expectOne('http://localhost:3000/events/1');
      req.flush(mockEvent);

      expect(result).toEqual(mockEvent);
    });

  });

  describe('selectedVehicleId', () => {

    it('should be null by default', () => {
      expect(service.selectedVehicleId()).toBeNull();
    });

    it('should allow updating the selected vehicle id', () => {
      service.selectedVehicleId.set('veh-1');

      expect(service.selectedVehicleId()).toBe('veh-1');
    });

  });

  describe('calendarEvents', () => {

    const mockEvents: EventInterface[] = [
      { _id: '1', title: 'Event 1', date: '2026-02-13', hourStart: '09:00', hourEnd: '10:00', vehicleId: 'veh-1', comment: '' },
      { _id: '2', title: 'Event 2', date: '2026-02-14', hourStart: '11:00', hourEnd: '12:00', vehicleId: 'veh-2', comment: '' },
    ];

    beforeEach(() => {
      service.loadEvents();
      const req = httpMock.expectOne('http://localhost:3000/events');
      req.flush(mockEvents);
    });

    it('should return all events when no vehicle is selected', () => {
      expect(service.calendarEvents()).toEqual(mockEvents);
    });

    it('should return only events matching selected vehicle', () => {
      service.selectedVehicleId.set('veh-1');

      expect(service.calendarEvents()).toEqual([mockEvents[0]]);
    });

    it('should return empty array when selected vehicle has no events', () => {
      service.selectedVehicleId.set('veh-999');

      expect(service.calendarEvents()).toEqual([]);
    });

  });

  describe('getEventsByDate', () => {

    const mockEvents: EventInterface[] = [
      { _id: '1', title: 'Event 1', date: '2026-02-13', hourStart: '09:00', hourEnd: '10:00', vehicleId: 'veh-1', comment: '' },
      { _id: '2', title: 'Event 2', date: '2026-02-13', hourStart: '11:00', hourEnd: '12:00', vehicleId: 'veh-2', comment: '' },
      { _id: '3', title: 'Event 3', date: '2026-02-14', hourStart: '08:00', hourEnd: '09:00', vehicleId: 'veh-1', comment: '' },
    ];

    beforeEach(() => {
      service.loadEvents();
      const req = httpMock.expectOne('http://localhost:3000/events');
      req.flush(mockEvents);
    });

    it('should return events matching the provided date', () => {
      expect(service.getEventsByDate('2026-02-13')).toEqual([mockEvents[0], mockEvents[1]]);
    });

    it('should return empty array when no events exist for the date', () => {
      expect(service.getEventsByDate('2099-01-01')).toEqual([]);
    });

    it('should apply vehicle filter before date filter', () => {
      service.selectedVehicleId.set('veh-1');

      expect(service.getEventsByDate('2026-02-13')).toEqual([mockEvents[0]]);
    });

  });

  describe('addEvent', () => {

    const newEvent: Omit<EventInterface, '_id'> = {
      title: 'New Event', date: '2026-02-15', hourStart: '10:00', hourEnd: '11:00', vehicleId: 'veh-1', comment: ''
    };

    const createdEvent: EventInterface = { _id: '99', ...newEvent };

    it('should call POST /events', () => {
      service.addEvent(newEvent);

      const req = httpMock.expectOne('http://localhost:3000/events');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newEvent);

      req.flush(createdEvent);
    });

    it('should add returned event to _allEvents', () => {
      service.addEvent(newEvent);

      const req = httpMock.expectOne('http://localhost:3000/events');
      req.flush(createdEvent);

      expect(service.calendarEvents()).toContain(createdEvent);
    });

    it('should append event without removing existing ones', () => {
      const existingEvent: EventInterface = { _id: '1', title: 'Existing', date: '2026-02-10', hourStart: '08:00', hourEnd: '09:00', vehicleId: 'veh-1', comment: '' };

      service.loadEvents();
      httpMock.expectOne('http://localhost:3000/events').flush([existingEvent]);

      service.addEvent(newEvent);
      httpMock.expectOne('http://localhost:3000/events').flush(createdEvent);

      expect(service.calendarEvents()).toEqual([existingEvent, createdEvent]);
    });

  });

  describe('updateEvent', () => {
    it('should call PUT /events/:id', () => {
      // Verificar URL
      // Verificar método PUT
    });

    it('should send only expected properties in payload', () => {
      // Inspeccionar body enviado
      // Verificar estructura eventData
    });

    it('should replace updated event in _allEvents', () => {
      // Simular actualización
      // Verificar sustitución del evento correcto
    });

    it('should not modify other events', () => {
      // Tener varios eventos
      // Actualizar uno
      // Verificar que el resto permanecen iguales
    });

    it('should send empty string when comment is undefined', () => {
      // Crear evento sin comment
      // Verificar payload enviado
    });
  });

  describe('deleteEvent', () => {
    it('should call DELETE /events/:id', () => {
      // Verificar URL
      // Verificar método DELETE
    });

    it('should remove deleted event from _allEvents', () => {
      // Simular eliminación
      // Verificar que ya no existe
    });

    it('should not remove other events', () => {
      // Tener varios eventos
      // Eliminar uno
      // Verificar que los demás siguen presentes
    });
  });
});