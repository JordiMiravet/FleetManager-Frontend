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
    it('should call GET /events', () => {
      // Verificar que se realiza la petición GET
      // Comprobar URL y método HTTP
    });

    it('should update _allEvents signal with received events', () => {
      // Simular respuesta del backend
      // Verificar que calendarEvents contiene los eventos cargados
    });
  });

  describe('getEventById', () => {
    it('should call GET /events/:id', () => {
      // Verificar URL construida correctamente
      // Comprobar método GET
    });

    it('should return the requested event', () => {
      // Simular respuesta y comprobar valor emitido
    });
  });

  describe('selectedVehicleId', () => {
    it('should be null by default', () => {
      // Comprobar valor inicial del signal
    });

    it('should allow updating the selected vehicle id', () => {
      // Modificar el signal
      // Verificar nuevo valor
    });
  });

  describe('calendarEvents', () => {
    it('should return all events when no vehicle is selected', () => {
      // Cargar eventos
      // Mantener selectedVehicleId a null
      // Verificar que devuelve todos
    });

    it('should return only events matching selected vehicle', () => {
      // Cargar eventos de distintos vehículos
      // Seleccionar uno
      // Verificar filtrado
    });

    it('should return empty array when selected vehicle has no events', () => {
      // Seleccionar vehículo inexistente
      // Verificar resultado vacío
    });
  });

  describe('getEventsByDate', () => {
    it('should return events matching the provided date', () => {
      // Preparar eventos con distintas fechas
      // Verificar filtrado por fecha
    });

    it('should return empty array when no events exist for the date', () => {
      // Buscar fecha inexistente
      // Verificar array vacío
    });

    it('should apply vehicle filter before date filter', () => {
      // Configurar selectedVehicleId
      // Añadir eventos de varios vehículos misma fecha
      // Verificar comportamiento esperado
    });
  });

  describe('addEvent', () => {
    it('should call POST /events', () => {
      // Verificar petición POST
      // Comprobar payload enviado
    });

    it('should add returned event to _allEvents', () => {
      // Simular respuesta del backend
      // Verificar que el evento aparece en calendarEvents
    });

    it('should append event without removing existing ones', () => {
      // Cargar eventos previos
      // Añadir uno nuevo
      // Verificar que se conservan todos
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