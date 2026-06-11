import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

import { DayEventsModalComponent } from './day-events-modal';

import { EventInterface } from '../../interfaces/event';
import { VehicleService } from '../../../vehicle/data-access/vehicle-service';

describe('DayEventsModalComponent', () => {
  let component: DayEventsModalComponent;
  let fixture: ComponentFixture<DayEventsModalComponent>;

  const mockAuth = {
    currentUser: { uid: 'JordiTheBest' }
  };

  const mockVehicleService = {
    vehicles: jasmine.createSpy('vehicles').and.returnValue([
      {
        _id: '123',
        name: 'Ferrari Roma'
      }
    ])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayEventsModalComponent],
      providers: [
        provideHttpClient(),
        { provide: Auth, useValue: mockAuth },
        { provide: VehicleService, useValue: mockVehicleService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DayEventsModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('inputs', () => {

    const eventMock: EventInterface = {
      _id: '1',
      title: 'Cambio de aceite',
      date: '2026-02-13',
      hourStart: '09:00',
      hourEnd: '10:00',
      comment: 'Revisión general y cambio de filtro',
      vehicleId: '123'
    };

    it('should assign date input correctly', () => {
      fixture.componentRef.setInput('date', '2026-02-13');
      fixture.detectChanges();

      expect(component.date()).toBe('2026-02-13');
    });

    it('should assign events input correctly', () => {
      fixture.componentRef.setInput('events', [eventMock]);
      fixture.detectChanges();

      expect(component.events()).toEqual([eventMock]);
    });

    it('should return the first event title correctly', () => {
      fixture.componentRef.setInput('events', [eventMock]);
      fixture.detectChanges();

      expect(component.events()[0].title).toBe('Cambio de aceite');
    });

    it('should return the first event time correctly', () => {
      fixture.componentRef.setInput('events', [eventMock]);
      fixture.detectChanges();

      expect(component.events()[0].hourStart + ' - ' + component.events()[0].hourEnd).toBe('09:00 - 10:00');
    });

    it('should return the first event comment correctly', () => {
      fixture.componentRef.setInput('events', [eventMock]);
      fixture.detectChanges();

      expect(component.events()[0].comment).toBe('Revisión general y cambio de filtro');
    });

  });

  describe('getVehicleName', () => {

    it('should return vehicle name when vehicle exists', () => {
      const vehicle = component.getVehicleName('123');

      expect(vehicle).toBe('Ferrari Roma');
    });

    it('should return fallback when vehicle does not exist', () => {
      const result = component.getVehicleName('8888');

      expect(result).toBe(component.dayEventsMsg.vehicleFallback);
    });

  });

  describe('template rendering with events', () => {

    const eventsMock: EventInterface[] = [
      {
        _id: '1',
        title: 'Cambio de aceite',
        date: '2026-02-13',
        hourStart: '09:00',
        hourEnd: '10:00',
        comment: 'Revisión general y cambio de filtro',
        vehicleId: '123'
      },
      {
        _id: '2',
        title: 'Inspección técnica',
        date: '2026-02-13',
        hourStart: '11:00',
        hourEnd: '12:00',
        comment: '',
        vehicleId: '456'
      }
    ];

    it('should render the events list when events exist', () => {
      fixture.componentRef.setInput('events', eventsMock);
      fixture.detectChanges();

      expect(component.events().length).toBe(eventsMock.length);
    });

    it('should render one <li> per event', () => {
      fixture.componentRef.setInput('events', eventsMock);
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('li');
      expect(items.length).toBe(eventsMock.length);
    });

    it('should render event title correctly', () => {
      fixture.componentRef.setInput('events', eventsMock);
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelectorAll('.event-card__title');
      expect(title.length).toBe(eventsMock.length);
      expect(title[0].textContent).toContain(eventsMock[0].title);
    });

    it('should render event time correctly', () => {
      fixture.componentRef.setInput('events', eventsMock);
      fixture.detectChanges();

      const time = fixture.nativeElement.querySelectorAll('.event-card__time-value');
      expect(time.length).toBe(eventsMock.length);
      expect(time[0].textContent).toContain(`${eventsMock[0].hourStart} - ${eventsMock[0].hourEnd}`);
    });

    it('should render comment when comment exists', () => {
      fixture.componentRef.setInput('events', eventsMock);
      fixture.detectChanges();

      const comment = fixture.nativeElement.querySelectorAll('.event-card__comment');
      expect(comment.length).toBeGreaterThan(0);
      expect(comment[0].textContent).toContain('Revisión general y cambio de filtro');
    });

    it('should not render comment when comment is empty', () => {
      fixture.componentRef.setInput('events', eventsMock);
      fixture.detectChanges();

      const comments = fixture.nativeElement.querySelectorAll('.event-card__comment');
      expect(comments.length).toBe(1);
      expect(comments[0].textContent).toContain(eventsMock[0].comment);
    });

    it('should render vehicle name correctly', () => {
      const eventsMock: EventInterface[] = [
        {
          _id: '1',
          title: 'Cambio de aceite',
          date: '2026-02-13',
          hourStart: '09:00',
          hourEnd: '10:00',
          comment: 'Revisión general y cambio de filtro',
          vehicleId: '123'
        }
      ];

      fixture.componentRef.setInput('events', eventsMock);
      fixture.detectChanges();

      const vehicle = fixture.nativeElement.querySelector('.event-card__vehicle');

      expect(vehicle.textContent).toContain('Ferrari Roma');
    });

    it('should render modal title with selected date', () => {
      fixture.componentRef.setInput('date', '2026-03-26');
      fixture.componentRef.setInput('events', []);
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('.modal__title');

      expect(title.textContent).toContain('2026-03-26');
    });

  });

  describe('template rendering without events', () => {

    const eventsMock: EventInterface[] = [];

    it('should render empty state message', () => {
      fixture.componentRef.setInput('events', eventsMock);
      fixture.detectChanges();

      const message = fixture.nativeElement.querySelector('.modal__empty');
      expect(message).toBeTruthy();
    });

    it('should not render events list when no events exist', () => {
      fixture.componentRef.setInput('events', eventsMock);
      fixture.detectChanges();

      const list = fixture.nativeElement.querySelector('.events-list');
      expect(list).toBeFalsy();
    });

    it('should not render any event card when events array is empty', () => {
      // comprobar que no existen elementos .event-card
    });

  });

  describe('output events', () => {

    it('should emit createEvent when onCreate is called', () => {
      const create = spyOn(component.createEvent, 'emit');
      component.onCreate();

      expect(create).toHaveBeenCalled();
    });

    it('should emit editEvent with id when onEdit is called', () => {
      const editElement = spyOn(component.editEvent, 'emit');
      component.onEdit('123456');

      expect(editElement).toHaveBeenCalledWith('123456');
    });

    it('should emit deleteEvent with id when onDelete is called', () => {
      const deleteElement = spyOn(component.deleteEvent, 'emit');
      component.onDelete('123456');

      expect(deleteElement).toHaveBeenCalledWith('123456');
    });

    it('should emit closeModal when handleClose is called', () => {
      const spy = spyOn(component.closeModal, 'emit');
      component.handleClose();

      expect(spy).toHaveBeenCalled();
    });
    
  });

  describe('template interactions', () => {

    it('should emit closeModal when backdrop is clicked', () => {
      // hacer click sobre .backdrop y comprobar emisión
    });

    it('should call openDetails when summary is clicked', () => {
      // spyOn(component, 'openDetails') y click sobre summary
    });

    it('should emit createEvent when create button is clicked', () => {
      fixture.componentRef.setInput('events', []);
      fixture.detectChanges();

      const createEvent = spyOn(component.createEvent, 'emit');
      const button = fixture.nativeElement.querySelector('.modal__header app-create-button');
      button.click();
      fixture.detectChanges();

      expect(createEvent).toHaveBeenCalled();
    });

    it('should emit editEvent when edit button is clicked', () => {
      const editEvent = spyOn(component.editEvent, 'emit');

      const eventsMock: EventInterface[] = [
        {
          _id: '001',
          title: 'Cambio de aceite',
          date: '2026-02-13',
          hourStart: '09:00',
          hourEnd: '10:00',
          comment: 'Revisión general y cambio de filtro',
          vehicleId: '123'
        }
      ];
      fixture.componentRef.setInput('events', eventsMock);
      fixture.detectChanges();

      component.onEdit('001');
      expect(editEvent).toHaveBeenCalledWith('001');
    });

    it('should emit deleteEvent when delete button is clicked', () => {
      const deleteEvent = spyOn(component.deleteEvent, 'emit');

      const eventsMock: EventInterface[] = [
        {
          _id: '001',
          title: 'Cambio de aceite',
          date: '2026-02-13',
          hourStart: '09:00',
          hourEnd: '10:00',
          comment: 'Revisión general y cambio de filtro',
          vehicleId: '123'
        }
      ];

      fixture.componentRef.setInput('events', eventsMock);
      fixture.detectChanges();

      component.onDelete('001');
      expect(deleteEvent).toHaveBeenCalledWith('001');
    });

    it('should emit closeModal when clicking on overlay', () => {
      fixture.componentRef.setInput('events', []);
      fixture.detectChanges();

      const closeModal = spyOn(component.closeModal, 'emit');
      component.handleClose();

      expect(closeModal).toHaveBeenCalled();
    });

    it('should not close modal when clicking inside modal content', () => {
      fixture.componentRef.setInput('events', []);
      fixture.detectChanges();

      const closeModal = spyOn(component.closeModal, 'emit');
      const section = fixture.nativeElement.querySelector('.modal');
      section.click();
      fixture.detectChanges();

      expect(closeModal).not.toHaveBeenCalled();
    });

  });

  describe('openDetails', () => {

    const eventsMock: EventInterface[] = [
      {
        _id: '001',
        title: 'Cambio de aceite',
        date: '2026-02-13',
        hourStart: '09:00',
        hourEnd: '10:00',
        comment: 'Revisión general y cambio de filtro',
        vehicleId: '123'
      },
      {
        _id: '002',
        title: 'Inspección técnica',
        date: '2026-02-13',
        hourStart: '11:00',
        hourEnd: '12:00',
        comment: '',
        vehicleId: '456'
      }
    ];

    it('should close other details when one is opened', () => {
      fixture.componentRef.setInput('events', eventsMock);
      fixture.detectChanges();

      const details = fixture.nativeElement.querySelectorAll('.event-card');
      details[0].open = true;
      details[1].open = true;

      component.openDetails(1);
      fixture.detectChanges();

      expect(details[0].open).toBe(false);
      expect(details[1].open).toBe(true);
    });

    it('should not close the selected detail', () => {
      fixture.componentRef.setInput('events', eventsMock);
      fixture.detectChanges();

      const details = fixture.nativeElement.querySelectorAll('.event-card');
      details[1].open = true;
      component.openDetails(1);
      fixture.detectChanges();

      expect(details[1].open).toBe(true);
    });

  });

  describe('accessibility attributes', () => {

    it('should have role="dialog" in overlay', () => {
      fixture.componentRef.setInput('events', []);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.backdrop');
      expect(container.getAttribute('role')).toBe('dialog');
    });

    it('should bind aria-labelledby correctly', () => {
      fixture.componentRef.setInput('events', []);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.backdrop');
      const title = fixture.nativeElement.querySelector('#dayEventsTitle');
      expect(container.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'));
    });

    it('should generate aria-labels dynamically', () => {
      fixture.componentRef.setInput('date', '2026-02-13');
      fixture.componentRef.setInput('events', []);
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('.modal__title');
      expect(title.getAttribute('aria-label')).toContain(component.date());
    });

    it('should bind aria-describedby correctly', () => {
      // comprobar atributo aria-describedby del dialog
    });

    it('should generate aria-controls correctly for details', () => {
      // renderizar eventos y comprobar aria-controls de los summary
    });

    it('should render actions container with role group', () => {
      // renderizar eventos y comprobar role="group"
    });

    it('should render empty state with status role', () => {
      // renderizar sin eventos y comprobar role="status"
    });

    it('should render empty state with aria-live polite', () => {
      // renderizar sin eventos y comprobar aria-live="polite"
    });

  });

});
