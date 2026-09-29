import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

import { MostUsedVehicleChartComponent } from './most-used-vehicle-chart';

import { TimePeriod } from '../../enums/time-period.enum';
import { GraphicsService } from '../../data-access/graphics-service';
import { GraphicsMessagesService } from '../../i18n/graphics-messages';
import { VehicleService } from '../../../vehicle/data-access/vehicle-service';

export const authMock = {
  currentUser: {
    uid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('Mytoken')
  }
};

describe('MostUsedVehicleChartComponent', () => {
  let component: MostUsedVehicleChartComponent;
  let fixture: ComponentFixture<MostUsedVehicleChartComponent>;
  let graphicsService: GraphicsService;
  let graphicsMessagesService: GraphicsMessagesService;

  const createChart = (): void => {
    spyOn(graphicsService, 'getMostUsedVehicle').and.returnValue([
      {
        vehicleId: 'ferrari-1',
        vehicleName: 'Ferrari Roma',
        totalHours: 4
      }
    ]);

    component['mostUsedVehicle'] = {
      nativeElement: document.createElement('canvas')
    } as any;

    component['createMostUsedVehicleChart']();
  };

  const getCanvas = (): HTMLCanvasElement => fixture.nativeElement.querySelector('canvas');
  const getFigure = (): HTMLElement => fixture.nativeElement.querySelector('figure');
  const getTitle = (): HTMLElement => fixture.nativeElement.querySelector('#most-used-vehicle-title');
  const getDescription = (): HTMLElement => fixture.nativeElement.querySelector('#most-used-vehicle-desc');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MostUsedVehicleChartComponent ],
      providers: [
        provideHttpClient(),
        { provide: Auth, useValue: authMock },
        GraphicsService,
        VehicleService,
        GraphicsMessagesService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MostUsedVehicleChartComponent);
    component = fixture.componentInstance;
    graphicsService = TestBed.inject(GraphicsService);
    graphicsMessagesService = TestBed.inject(GraphicsMessagesService);

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

  describe('chart label', () => {

    it('should use current month by default', () => {
      createChart();

      expect(component['chart'].data.datasets[0].label).toBe(graphicsMessagesService.mostUsedVehicle.datasetLabel(TimePeriod.Month));
    });

    it('should use current year when the period is Year', () => {
      fixture.componentRef.setInput('period', TimePeriod.Year);
      fixture.detectChanges();

      createChart();

      expect(component['chart'].data.datasets[0].label).toBe(graphicsMessagesService.mostUsedVehicle.datasetLabel(TimePeriod.Year));
    });

    it('should use all time when the period is AllTime', () => {
      fixture.componentRef.setInput('period', TimePeriod.AllTime);
      fixture.detectChanges();

      createChart();

      expect(component['chart'].data.datasets[0].label).toBe(graphicsMessagesService.mostUsedVehicle.datasetLabel(TimePeriod.AllTime));
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

      expect(component['chart']).toBeUndefined();
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
      const canvas = getCanvas();

      expect(canvas).not.toBeNull();
    });

    it('should have aria-hidden="true" on the canvas', () => {
      const canvas = getCanvas();

      expect(canvas.getAttribute('aria-hidden')).toBe('true');
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

    it('should have aria-live="polite" on the description', () => {
      const description = getDescription();

      expect(description.getAttribute('aria-live')).toBe('polite');
    });

    it('should render the accessible chart title from graphics messages', () => {
      const title = getTitle();

      expect(title.textContent).toContain(graphicsMessagesService.mostUsedVehicle.title);
    });

    it('should render the current month description by default', () => {
      const description = getDescription();

      expect(description.textContent).toContain(graphicsMessagesService.mostUsedVehicle.description(TimePeriod.Month));
    });

    it('should update the description when the period changes', () => {
      fixture.componentRef.setInput('period', TimePeriod.Year);
      fixture.detectChanges();

      const description = getDescription();

      expect(description.textContent).toContain(graphicsMessagesService.mostUsedVehicle.description(TimePeriod.Year));
    });

    it('should render the all time description', () => {
      fixture.componentRef.setInput('period', TimePeriod.AllTime);
      fixture.detectChanges();

      const description = getDescription();

      expect(description.textContent).toContain(graphicsMessagesService.mostUsedVehicle.description(TimePeriod.AllTime));
    });

  });

});
