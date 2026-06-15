import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

import { VehicleUsageHoursChartComponent } from './vehicle-usage-hours-chart';

import { GraphicsServices } from '../../data-access/graphics-services';
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
  let graphicsService: GraphicsServices;
  let vehicleService: VehicleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleUsageHoursChartComponent],
      providers: [
        provideHttpClient(),
        { provide: Auth, useValue: authMock },
        GraphicsServices,
        VehicleService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleUsageHoursChartComponent);
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

      expect(component['chart']).toBeFalsy();
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