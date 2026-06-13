import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';

import { GraphicsViewComponent } from './graphics-view';

import { VehicleService } from '../../../vehicle/data-access/vehicle-service';
import { EventService } from '../../../calendar/data-access/event-service';
import { VehicleInterface } from '../../../vehicle/interfaces/vehicle/vehicle';
import { TimePeriod } from '../../enums/time-period.enum';

export const authMock = {
  currentUser: {
    uid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
};

const vehicleServiceMock = {
  vehicles: signal<VehicleInterface[]>([]),
  loadVehicles: jasmine.createSpy('loadVehicles'),
  addVehicles: jasmine.createSpy('addVehicles'),
  updateVehicle: jasmine.createSpy('updateVehicle'),
  deleteVehicle: jasmine.createSpy('deleteVehicle')
};

const eventServiceMock = {
  loadEvents: jasmine.createSpy('loadEvents'),
  _allEvents: jasmine.createSpy('_allEvents').and.returnValue([])
};

describe('GraphicsViewComponent', () => {
  let component: GraphicsViewComponent;
  let fixture: ComponentFixture<GraphicsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicsViewComponent],
      providers: [
        provideHttpClient(),
        { provide: Auth, useValue: authMock },
        { provide: VehicleService, useValue: vehicleServiceMock },
        { provide: EventService, useValue: eventServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GraphicsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state', () => {

    it('should initialize selectedPeriod with Month', () => {
      expect(component.selectedPeriod()).toBe(TimePeriod.Month);
    });

  });

  describe('lifecycle', () => {

    it('should call loadVehicles on ngAfterViewInit', () => {
      component.ngAfterViewInit();
      expect(vehicleServiceMock.loadVehicles).toHaveBeenCalled();
    });

    it('should call loadEvents on ngAfterViewInit', () => {
      component.ngAfterViewInit();
      expect(eventServiceMock.loadEvents).toHaveBeenCalled();
    });

  });

  describe('period changes', () => {

    it('should change selectedPeriod to Year', () => {
      component.changePeriod(TimePeriod.Year);
      expect(component.selectedPeriod()).toBe(TimePeriod.Year);
    });

    it('should change selectedPeriod to AllTime', () => {
      component.changePeriod(TimePeriod.AllTime);
      expect(component.selectedPeriod()).toBe(TimePeriod.AllTime);
    });

  });

  describe('rendering', () => {

    it('should render VehicleUsageHoursChartComponent', () => {
      const chart = fixture.nativeElement.querySelector('app-vehicle-usage-hours-chart');
      expect(chart).toBeTruthy();
    });

    it('should render MostUsedVehicleChartComponent', () => {
      const chart = fixture.nativeElement.querySelector('app-most-used-vehicle-chart');
      expect(chart).toBeTruthy();
    });

    it('should render HoursByWeekdayVehicleChartComponent', () => {
      const chart = fixture.nativeElement.querySelector('app-hours-by-weekday-vehicle-chart');
      expect(chart).toBeTruthy();
    });

  });

  describe('user interactions', () => {

    it('should update selectedPeriod when clicking This Year button', () => {
      const buttons = fixture.nativeElement.querySelectorAll('.vehicle-metrics-toolbar__period-button');

      buttons[1].click();
      fixture.detectChanges();

      expect(component.selectedPeriod()).toBe(TimePeriod.Year);
    });

    it('should update selectedPeriod when clicking All Time button', () => {
      const buttons = fixture.nativeElement.querySelectorAll('.vehicle-metrics-toolbar__period-button');

      buttons[2].click();
      fixture.detectChanges();

      expect(component.selectedPeriod()).toBe(TimePeriod.AllTime);
    });

  });

});
