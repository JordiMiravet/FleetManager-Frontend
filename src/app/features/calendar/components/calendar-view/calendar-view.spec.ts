import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

import { CalendarViewComponent } from './calendar-view';

import { EventService } from '../../data-access/event-service';
import { VehicleService } from '../../../vehicle/data-access/vehicle-service';
import { EventInterface } from '../../interfaces/event';
import { VehicleInterface } from '../../../vehicle/interfaces/vehicle/vehicle';
import { CalendarModalState } from '../../enums/calendar-modal-state.enum';

describe('CalendarViewComponent', () => {
  let component: CalendarViewComponent;
  let fixture: ComponentFixture<CalendarViewComponent>;

  const mockEventService = {
    calendarEvents: jasmine.createSpy('calendarEvents').and.returnValue([]),
    getEventsByDate: jasmine.createSpy('getEventsByDate').and.returnValue([]),
    getEventById: jasmine.createSpy('getEventById'),
    deleteEvent: jasmine.createSpy('deleteEvent'),
    loadEvents: jasmine.createSpy('loadEvents'),
    selectedVehicleId: signal<string | null>(null)
  };

  const mockVehicleService = {
    vehicles: () => [],
    loadVehicles: jasmine.createSpy('loadVehicles')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CalendarViewComponent, 
      ],
      providers: [
        provideHttpClient(),
        { provide: EventService, useValue: mockEventService },
        { provide: VehicleService, useValue: mockVehicleService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarViewComponent);
    component = fixture.componentInstance;

    component.calendarComponent = {
      getApi: () => ({
        removeAllEvents: jasmine.createSpy('removeAllEvents'),
        addEventSource: jasmine.createSpy('addEventSource')
      })
    } as any;

    mockEventService.deleteEvent.calls.reset();
    mockEventService.selectedVehicleId.set(null);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {

    it('should call loadVehicles on construction', () => {
      expect(mockVehicleService.loadVehicles).toHaveBeenCalled();
    });

    it('should call loadEvents on ngAfterViewInit', () => {
      component.ngAfterViewInit();
      expect(mockEventService.loadEvents).toHaveBeenCalled();
    });

    it('should have correct confirm modal message', () => {
      const msg = component.confirmMsg;

      expect(msg.deleteEvent.title).toBe('Delete this event');
      expect(msg.deleteEvent.message).toBe('Are you sure you want to delete this event? This action cannot be undone');
    });

    it('should initialize activeModal as Closed', () => {
      expect(component.activeModal()).toBe(CalendarModalState.Closed);
    });

    it('should initialize formMode as "create"', () => {
      expect(component.formMode()).toBe('create');
    });

    it('should initialize selectedDate as empty string', () => {
      expect(component.selectedDate()).toBe('');
    });

  });

  describe('date click', () => {

    it('should set selectedDate and open DayEvents modal when date is clicked', () => {
      const mockArg = { dateStr: '2026-02-13' } as any;
      component.onDateClick(mockArg);

      expect(component.selectedDate()).toBe('2026-02-13');
      expect(component.activeModal()).toBe(CalendarModalState.DayEvents);
    });

  });

  describe('event click', () => {

    it('should open DayEvents modal and set selectedDate from event', () => {
      const mockArg = { event: { startStr: '2026-02-13T00:15:00' } } as any;
      component.onEventClick(mockArg);

      expect(component.selectedDate()).toBe('2026-02-13');
      expect(component.activeModal()).toBe(CalendarModalState.DayEvents);
    });

  });

  describe('create event flow', () => {

    it('should reset selectedEvent to null', () => {
      component.selectedEvent.set({ _id: '1' } as any);
      component.handleCreateEvent();

      expect(component.selectedEvent()).toBeNull();
    });

    it('should set formMode to "create" when creating event', () => {
      component.handleCreateEvent();
      expect(component.formMode()).toBe('create');
    });

    it('should open EventForm modal', () => {
      component.activeModal.set(CalendarModalState.DayEvents);
      component.handleCreateEvent();

      expect(component.activeModal()).toBe(CalendarModalState.EventForm);
    });

    it('should set today as selectedDate', () => {
      component.selectedDate.set('');
      component.handleCreateEvent();

      expect(component.selectedDate()).toBeTruthy();
    });

    it('handleCreateEventFromDay: should not override selectedDate already set', () => {
      component.selectedDate.set('2026-02-10');
      component.handleCreateEventFromDay();

      expect(component.selectedDate()).toBe('2026-02-10');
    });

    it('handleCreateEventFromDay: should set formMode to "create"', () => {
      component.formMode.set('edit');
      component.handleCreateEventFromDay();

      expect(component.formMode()).toBe('create');
    });

    it('handleCreateEventFromDay: should reset selectedEvent to null', () => {
      component.selectedEvent.set({ _id: '99' } as any);
      component.handleCreateEventFromDay();

      expect(component.selectedEvent()).toBeNull();
    });

    it('handleCreateEventFromDay: should open EventForm modal', () => {
      component.handleCreateEventFromDay();

      expect(component.activeModal()).toBe(CalendarModalState.EventForm);
    });

    it('should render EventForm modal in template when opened', () => {
      component.handleCreateEvent();
      fixture.detectChanges();

      const formModal = fixture.nativeElement.querySelector('app-event-form-modal');
      expect(formModal).toBeTruthy();
    });

  });

  describe('edit event flow', () => {

    const mockEvent = {
      _id: '1',
      title: 'Test event',
      date: '2026-02-13'
    } as EventInterface;

    it('should call getEventById with provided id', () => {
      mockEventService.getEventById.and.returnValue(of(mockEvent));
      component.handleEditEvent('1');

      expect(mockEventService.getEventById).toHaveBeenCalledWith('1');
    });

    it('should set selectedEvent when event is found', () => {
      mockEventService.getEventById.and.returnValue(of(mockEvent));
      component.handleEditEvent('1');

      expect(component.selectedEvent()).toEqual(mockEvent);
    });

    it('should set formMode to "edit" when editing event', () => {
      mockEventService.getEventById.and.returnValue(of(mockEvent));
      component.handleEditEvent('1');

      expect(component.formMode()).toBe('edit');
    });

    it('should open EventForm modal when event is found', () => {
      mockEventService.getEventById.and.returnValue(of(mockEvent));
      component.handleEditEvent('1');

      expect(component.activeModal()).toBe(CalendarModalState.EventForm);
    });

  });

  describe('delete event flow', () => {

    it('should open Confirm modal when delete is triggered', () => {
      component.handleDeleteEvent('123');

      expect(component.activeModal()).toBe(CalendarModalState.Confirm);
    });

    it('should set selectedEventId when deleting', () => {
      component.handleDeleteEvent('123');
      expect(component['selectedEventId']()).toBe('123');
    });

    it('should render Confirm modal in template when opened', () => {
      component.handleDeleteEvent('123');
      fixture.detectChanges();

      const confirmModal = fixture.nativeElement.querySelector('app-confirm-modal');
      expect(confirmModal).toBeTruthy();
    });

    it('should delete event and go back to DayEvents modal on confirm', () => {
      component.handleDeleteEvent('123');
      component.confirmDeleteEvent();

      expect(mockEventService.deleteEvent).toHaveBeenCalledWith('123');
      expect(component.activeModal()).toBe(CalendarModalState.DayEvents);
    });

    it('should clear selectedEventId after confirming delete', () => {
      component.handleDeleteEvent('123');
      component.confirmDeleteEvent();

      expect(component['selectedEventId']()).toBeNull();
    });

    it('should do nothing if confirmDeleteEvent is called with no prior delete', () => {
      component.confirmDeleteEvent();

      expect(mockEventService.deleteEvent).not.toHaveBeenCalled();
    });

    it('should cancel delete and restore DayEvents modal', () => {
      component.handleDeleteEvent('123');
      component.cancelDeleteEvent();

      expect(mockEventService.deleteEvent).not.toHaveBeenCalled();
      expect(component.activeModal()).toBe(CalendarModalState.DayEvents);
    });

    it('should clear selectedEventId when canceling delete', () => {
      component.handleDeleteEvent('123');
      component.cancelDeleteEvent();

      expect(component['selectedEventId']()).toBeNull();
    });

  });

  describe('vehicle selection', () => {

    const mockVehicle: VehicleInterface = {
      _id: 'veh-123',
      name: 'Ferrari',
      model: 'F8 Tributo',
      plate: '123ACB'
    };

    it('should set selectedVehicleId when vehicle is selected', () => {
      component.handleVehicleSelected(mockVehicle);

      expect(mockEventService.selectedVehicleId()).toBe('veh-123');
    });

    it('should reset selectedVehicleId when null vehicle is selected', () => {
      component.handleVehicleSelected(null as unknown as VehicleInterface);
      expect(mockEventService.selectedVehicleId()).toBeNull();
    });

  });

  describe('computed values', () => {

    it('should compute selectedDayEvents based on selectedDate', () => {
      const mockEvents = [{ _id: '1', title: 'Wololo', date: '2026-02-13' }];
      mockEventService.getEventsByDate.and.returnValue(mockEvents);

      component.selectedDate.set('2026-02-13');

      expect(component.selectedDayEvents()).toEqual(mockEvents);
      expect(mockEventService.getEventsByDate).toHaveBeenCalledWith('2026-02-13');
    });

    it('should return empty array if no events on selected date', () => {
      mockEventService.getEventsByDate.and.returnValue([]);
      component.selectedDate.set('2099-01-01');

      expect(component.selectedDayEvents()).toEqual([]);
    });

  });

  describe('calendar refresh', () => {

    const mockEvent = {
      _id: '1',
      title: 'Test Event',
      date: '2026-02-13',
      hourStart: '09:00',
      hourEnd: '10:00',
      comment: 'Comentario'
    };

    it('should call refreshCalendar on ngAfterViewInit', () => {
      const spy = spyOn(component, 'refreshCalendar');
      component.ngAfterViewInit();

      expect(spy).toHaveBeenCalled();
    });

    it('should map events correctly in getCalendarEvents', () => {
      mockEventService.calendarEvents.and.returnValue([mockEvent]);

      const events = (component as any).getCalendarEvents();

      expect(events).toHaveSize(1);
      expect(events[0].id).toBe('1');
      expect(events[0].title).toBe('Test Event');
      expect(events[0].date).toBe('2026-02-13');
      expect(events[0].extendedProps.hourStart).toBe('09:00');
      expect(events[0].extendedProps.hourEnd).toBe('10:00');
      expect(events[0].extendedProps.comment).toBe('Comentario');
    });

    it('should return empty array in getCalendarEvents when no events', () => {
      mockEventService.calendarEvents.and.returnValue([]);

      const events = (component as any).getCalendarEvents();

      expect(events).toEqual([]);
    });

    it('should call removeAllEvents and addEventSource on refreshCalendar', () => {
      const api = component.calendarComponent.getApi();
      const removeSpy = spyOn(api, 'removeAllEvents');
      const addSpy = spyOn(api, 'addEventSource');

      component.refreshCalendar();

      expect(removeSpy).toHaveBeenCalled();
      expect(addSpy).toHaveBeenCalled();
    });

  });

  describe('template: DayEvents modal', () => {

    it('should render DayEvents modal when state is DayEvents', () => {
      component.activeModal.set(CalendarModalState.DayEvents);
      fixture.detectChanges();

      const modal = fixture.nativeElement.querySelector('app-day-events-modal');
      expect(modal).toBeTruthy();
    });

    it('should NOT render DayEvents modal when state is Closed', () => {
      component.activeModal.set(CalendarModalState.Closed);
      fixture.detectChanges();

      const modal = fixture.nativeElement.querySelector('app-day-events-modal');
      expect(modal).toBeNull();
    });

  });

});