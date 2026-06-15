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

    it('should call getHoursByWeekdayPerVehicle on init', () => {
      const spy = spyOn(graphicsService, 'getHoursByWeekdayPerVehicle').and.returnValue({
        weekdayNames: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'],
        vehicles: []
      });

      fixture.componentRef.setInput('period', TimePeriod.Month);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(TimePeriod.Month);
    });

    it('should destroy previous chart before creating a new one', () => {
      spyOn(graphicsService, 'getHoursByWeekdayPerVehicle').and.returnValue({
        weekdayNames: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'],
        vehicles: [{ id: 'ferrari-1', name: 'Ferrari Roma', hours: [0,0,0,0,0,0,0] }]
      });

      fixture.detectChanges();

      const destroySpy = spyOn(component['chart'], 'destroy');

      fixture.componentRef.setInput('period', TimePeriod.Year);
      fixture.detectChanges();

      expect(destroySpy).toHaveBeenCalled();
    });

    it('should not create chart if canvas is not available', () => {
      const spy = spyOn(graphicsService, 'getHoursByWeekdayPerVehicle');

      component['hoursByWeekday'] = null as any;
      fixture.componentRef.setInput('period', TimePeriod.Year);
      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });

  });

  describe('ngOnDestroy', () => {

    it('should destroy the chart on component destroy', () => {
      spyOn(graphicsService, 'getHoursByWeekdayPerVehicle').and.returnValue({
        weekdayNames: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'],
        vehicles: [{ id: 'ferrari-1', name: 'Ferrari Roma', hours: [1,0,2,0,0,0,0] }]
      });
      fixture.detectChanges();

      const destroySpy = spyOn(component['chart'], 'destroy');
      component.ngOnDestroy();

      expect(destroySpy).toHaveBeenCalled();
    });

    it('should not throw if chart was never created', () => {
      component['chart'] = undefined as any;

      expect(() => component.ngOnDestroy()).not.toThrow();
    });

  });

  describe('template', () => {

    it('should render the canvas element', () => {
      const canvas = fixture.nativeElement.querySelector('canvas');

      expect(canvas).toBeTruthy();
    });

    it('should have role="img" on the figure', () => {
      const figure = fixture.nativeElement.querySelector('figure');

      expect(figure.getAttribute('role')).toBe('img');
    });

    it('should have aria-labelledby pointing to the title', () => {
      const figure = fixture.nativeElement.querySelector('figure');
      const title = fixture.nativeElement.querySelector('#hours-by-weekday-title');

      expect(figure.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'));
    });

    it('should have aria-describedby pointing to the description', () => {
      const figure = fixture.nativeElement.querySelector('figure');
      const desc = fixture.nativeElement.querySelector('#hours-by-weekday-desc');

      expect(figure.getAttribute('aria-describedby')).toBe(desc.getAttribute('id'));
    });

  });

});