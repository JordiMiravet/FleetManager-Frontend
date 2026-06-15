import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

import { HoursByWeekdayVehicleChartComponent } from './hours-by-weekday-vehicle-chart';

import { GraphicsServices } from '../../data-access/graphics-services';
import { VehicleService } from '../../../vehicle/data-access/vehicle-service';
import { TimePeriod } from '../../enums/time-period.enum';

export const authMock = {
  currentUser: {
    userUid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
};

describe('HoursByWeekdayVehicleChartComponent', () => {
  let component: HoursByWeekdayVehicleChartComponent;
  let fixture: ComponentFixture<HoursByWeekdayVehicleChartComponent>;
  let graphicsService: GraphicsServices;
  let vehicleService: VehicleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoursByWeekdayVehicleChartComponent],
      providers: [
        provideHttpClient(),
        { provide: Auth, useValue: authMock },
        GraphicsServices,
        VehicleService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HoursByWeekdayVehicleChartComponent);
    component = fixture.componentInstance;
    graphicsService = TestBed.inject(GraphicsServices);
    vehicleService = TestBed.inject(VehicleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('period input', () => {

    it('should default to TimePeriod.Month', () => {
      expect(component.period()).toBe(TimePeriod.Month);
    });

    it('should accept a different period value', () => {
      fixture.componentRef.setInput('period', TimePeriod.Year);
      fixture.detectChanges();

      expect(component.period()).toBe(TimePeriod.Year);
    });

  });

  describe('chart creation', () => {

    it('should call getHoursByWeekdayPerVehicle on init');

    it('should destroy previous chart before creating a new one');

    it('should not create chart if canvas is not available');

  });

  describe('ngOnDestroy', () => {

    it('should destroy the chart on component destroy');

    it('should not throw if chart was never created');

  });

  describe('template', () => {

    it('should render the canvas element');

    it('should have role="img" on the figure');

    it('should have aria-labelledby pointing to the title');

    it('should have aria-describedby pointing to the description');

  });

});