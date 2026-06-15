import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

import { MostUsedVehicleChartComponent } from './most-used-vehicle-chart';

import { GraphicsServices } from '../../data-access/graphics-services';
import { VehicleService } from '../../../vehicle/data-access/vehicle-service';
import { TimePeriod } from '../../enums/time-period.enum';

export const authMock = {
  currentUser: {
    uid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('Mytoken')
  }
};

describe('MostUsedVehicleChartComponent', () => {
  let component: MostUsedVehicleChartComponent;
  let fixture: ComponentFixture<MostUsedVehicleChartComponent>;
  let graphicsService: GraphicsServices;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostUsedVehicleChartComponent],
      providers: [
        provideHttpClient(),
        { provide: Auth, useValue: authMock },
        GraphicsServices,
        VehicleService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MostUsedVehicleChartComponent);
    component = fixture.componentInstance;
    graphicsService = TestBed.inject(GraphicsServices);
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

    it('should call getMostUsedVehicle when canvas is available', () => {
      spyOn(graphicsService, 'getMostUsedVehicle').and.returnValue([
        { 
          vehicleId: 'ferrari-1', 
          vehicleName: 'Ferrari Roma', 
          totalHours: 4 
        }
      ]);

      component['mostUsedVehicle'] = { nativeElement: document.createElement('canvas') } as any;
      component['createMostUsedVehicleChart']();

      expect(graphicsService.getMostUsedVehicle).toHaveBeenCalledWith(TimePeriod.Month);
    });

    it('should not create chart if data is empty', () => {
      spyOn(graphicsService, 'getMostUsedVehicle').and.returnValue([]);

      component['mostUsedVehicle'] = { nativeElement: document.createElement('canvas') } as any;
      component['createMostUsedVehicleChart']();

      expect(component['chart']).toBeFalsy();
    });

    it('should destroy previous chart before creating a new one', () => {
      spyOn(graphicsService, 'getMostUsedVehicle').and.returnValue([
        { 
          vehicleId: 'ferrari-1', 
          vehicleName: 'Ferrari Roma', 
          totalHours: 4 
        }
      ]);

      const destroySpy = jasmine.createSpy('destroy');
      component['chart'] = { destroy: destroySpy } as any;
      component['mostUsedVehicle'] = { nativeElement: document.createElement('canvas') } as any;
      component['createMostUsedVehicleChart']();

      expect(destroySpy).toHaveBeenCalled();
    });

    it('should not create chart if canvas is not available', () => {
      const spy = spyOn(graphicsService, 'getMostUsedVehicle');

      component['mostUsedVehicle'] = null as any;
      component['createMostUsedVehicleChart']();

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
      const canvas = fixture.nativeElement.querySelector('canvas');

      expect(canvas).toBeTruthy();
    });

    it('should have role="img" on the figure', () => {
      const figure = fixture.nativeElement.querySelector('figure');

      expect(figure.getAttribute('role')).toBe('img');
    });

    it('should have aria-labelledby pointing to the title', () => {
      const figure = fixture.nativeElement.querySelector('figure');
      const title = fixture.nativeElement.querySelector('#most-used-vehicle-title');

      expect(figure.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'));
    });

    it('should have aria-describedby pointing to the description', () => {
      const figure = fixture.nativeElement.querySelector('figure');
      const desc = fixture.nativeElement.querySelector('#most-used-vehicle-desc');

      expect(figure.getAttribute('aria-describedby')).toBe(desc.getAttribute('id'));
    });

  });

});