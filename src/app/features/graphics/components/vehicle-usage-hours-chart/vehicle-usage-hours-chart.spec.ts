import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

import { VehicleUsageHoursChartComponent } from './vehicle-usage-hours-chart';

import { GraphicsService } from '../../data-access/graphics-service';
import { VehicleService } from '../../../vehicle/data-access/vehicle-service';
import { TimePeriod } from '../../enums/time-period.enum';

export const authMock = {
  currentUser: {
    uid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
};

describe('VehicleUsageHoursChartComponent', () => {
  let component: VehicleUsageHoursChartComponent;
  let fixture: ComponentFixture<VehicleUsageHoursChartComponent>;
  let graphicsService: GraphicsService;

  const getCanvas = (): HTMLCanvasElement => fixture.nativeElement.querySelector('canvas');
  const getFigure = (): HTMLElement => fixture.nativeElement.querySelector('figure');
  const getTitle = (): HTMLElement => fixture.nativeElement.querySelector('#vehicle-usage-hours-title');
  const getDescription = (): HTMLElement => fixture.nativeElement.querySelector('#vehicle-usage-hours-desc');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleUsageHoursChartComponent],
      providers: [
        provideHttpClient(),
        { provide: Auth, useValue: authMock },
        GraphicsService,
        VehicleService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleUsageHoursChartComponent);
    component = fixture.componentInstance;
    graphicsService = TestBed.inject(GraphicsService);
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

  describe('period description', () => {

    it('should return current month for TimePeriod.Month', () => {
      expect(component.getPeriodDescription()).toBe('current month');
    });

    it('should return current year for TimePeriod.Year', () => {
      fixture.componentRef.setInput('period', TimePeriod.Year);
      fixture.detectChanges();

      expect(component.getPeriodDescription()).toBe('current year');
    });

    it('should return all time for TimePeriod.AllTime', () => {
      fixture.componentRef.setInput('period', TimePeriod.AllTime);
      fixture.detectChanges();

      expect(component.getPeriodDescription()).toBe('all time');
    });

    it('should return selected period for an unknown period', () => {
      fixture.componentRef.setInput('period', 'unknown' as TimePeriod);
      fixture.detectChanges();

      expect(component.getPeriodDescription()).toBe('selected period');
    });

  });

  describe('chart creation', () => {

    it('should call getVehicleUsageHours when canvas is available', () => {
      spyOn(graphicsService, 'getVehicleUsageHours').and.returnValue([
        { 
          vehicleId: 'ferrari-1', 
          vehicleName: 'Ferrari Roma', 
          totalHours: 4 
        }
      ]);

      component['vehicleUsageHours'] = { nativeElement: document.createElement('canvas') } as any;
      component['createVehicleUsageHours']();

      expect(graphicsService.getVehicleUsageHours).toHaveBeenCalledWith(TimePeriod.Month);
    });

    it('should not create chart if data is empty', () => {
      spyOn(graphicsService, 'getVehicleUsageHours').and.returnValue([]);

      component['vehicleUsageHours'] = { nativeElement: document.createElement('canvas') } as any;
      component['createVehicleUsageHours']();

      expect(component['chart']).toBeUndefined();
    });

    it('should destroy previous chart before creating a new one', () => {
      spyOn(graphicsService, 'getVehicleUsageHours').and.returnValue([
        { 
          vehicleId: 'ferrari-1', 
          vehicleName: 'Ferrari Roma', 
          totalHours: 4 
        }
      ]);

      const destroySpy = jasmine.createSpy('destroy');

      component['chart'] = { destroy: destroySpy } as any;
      component['vehicleUsageHours'] = { nativeElement: document.createElement('canvas') } as any;
      component['createVehicleUsageHours']();

      expect(destroySpy).toHaveBeenCalled();
    });

    it('should not create chart if canvas is not available', () => {
      const spy = spyOn(graphicsService, 'getVehicleUsageHours');

      component['vehicleUsageHours'] = null as any;
      component['createVehicleUsageHours']();

      expect(spy).not.toHaveBeenCalled();
    });

  });

  describe('ngOnDestroy', () => {

    it('should destroy the chart on component destroy', () => {
      const destroySpy = jasmine.createSpy('destroy');
      component['chart'] = { destroy: destroySpy } as any;
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
      const canvas = getCanvas();

      expect(canvas).not.toBeNull();
    });

    it('should have role="img" on the figure', () => {
      const figure = getFigure();

      expect(figure.getAttribute('role')).toBe('img');
    });

    it('should have aria-labelledby pointing to the title', () => {
      const figure = getFigure();
      const title = getTitle();

      expect(figure.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'));
    });

    it('should have aria-describedby pointing to the description', () => {
      const figure = getFigure();
      const description = getDescription();

      expect(figure.getAttribute('aria-describedby')).toBe(description.getAttribute('id'));
    });

    it('should render the accessible description for the current month', () => {
      const description = getDescription();

      expect(description.textContent).toContain(
        'A doughnut chart showing the distribution of vehicle usage hours for the current month.'
      );
    });

    it('should update the accessible description when the period changes', () => {
      fixture.componentRef.setInput('period', TimePeriod.Year);
      fixture.detectChanges();

      const description = getDescription();

      expect(description.textContent).toContain(
        'A doughnut chart showing the distribution of vehicle usage hours for the current year.'
      );
    });

    it('should have aria-hidden="true" on the canvas', () => {
      const canvas = getCanvas();

      expect(canvas.getAttribute('aria-hidden')).toBe('true');
    });

  });

});