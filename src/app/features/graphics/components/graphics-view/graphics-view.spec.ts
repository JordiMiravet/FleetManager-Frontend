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

    });

    it('should call loadEvents on ngAfterViewInit', () => {

    });
  });

  describe('period changes', () => {
    it('should change selectedPeriod to Year', () => {

    });

    it('should change selectedPeriod to AllTime', () => {

    });
  });

  describe('rendering', () => {
    it('should render VehicleUsageHoursChartComponent', () => {

    });

    it('should render MostUsedVehicleChartComponent', () => {

    });

    it('should render HoursByWeekdayVehicleChartComponent', () => {

    });
  });

  describe('user interactions', () => {
    it('should update selectedPeriod when clicking This Year button', () => {

    });

    it('should update selectedPeriod when clicking All Time button', () => {

    });
  });
});