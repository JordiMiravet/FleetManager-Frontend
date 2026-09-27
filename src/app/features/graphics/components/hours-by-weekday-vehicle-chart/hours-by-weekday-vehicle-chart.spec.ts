import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

import { HoursByWeekdayVehicleChartComponent } from './hours-by-weekday-vehicle-chart';

import { TimePeriod } from '../../enums/time-period.enum';
import { GraphicsService } from '../../data-access/graphics-service';
import { GraphicsMessagesService } from '../../i18n/graphics-messages';
import { VehicleService } from '../../../vehicle/data-access/vehicle-service';

export const authMock = {
  currentUser: {
    userUid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
};

const mockChartData = {
  weekdayNames: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'],
  vehicles: [{ 
    id: 'ferrari-1', 
    name: 'Ferrari Roma', 
    hours: [1,0,2,0,0,0,0] 
  }]
};

describe('HoursByWeekdayVehicleChartComponent', () => {
  let component: HoursByWeekdayVehicleChartComponent;
  let fixture: ComponentFixture<HoursByWeekdayVehicleChartComponent>;
  let graphicsService: GraphicsService;
  let graphicsMessagesService: GraphicsMessagesService;

  const getCanvas = (): HTMLCanvasElement => fixture.nativeElement.querySelector('canvas');
  const getFigure = (): HTMLElement => fixture.nativeElement.querySelector('figure');
  const getTitle = (): HTMLElement => fixture.nativeElement.querySelector('#hours-by-weekday-title');
  const getDescription = (): HTMLElement => fixture.nativeElement.querySelector('#hours-by-weekday-desc');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HoursByWeekdayVehicleChartComponent ],
      providers: [
        provideHttpClient(),
        { provide: Auth, useValue: authMock },
        GraphicsService,
        VehicleService,
        GraphicsMessagesService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HoursByWeekdayVehicleChartComponent);
    component = fixture.componentInstance;
    graphicsService = TestBed.inject(GraphicsService);
    graphicsMessagesService = TestBed.inject(GraphicsMessagesService);

    spyOn(graphicsService, 'getHoursByWeekdayPerVehicle').and.returnValue(mockChartData);

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

    it('should call getHoursByWeekdayPerVehicle when canvas is available', () => {
      component['hoursByWeekday'] = { nativeElement: document.createElement('canvas') } as any;
      component['createHoursByWeekdayByVehicle']();

      expect(graphicsService.getHoursByWeekdayPerVehicle).toHaveBeenCalledWith(TimePeriod.Month);
    });

    it('should destroy previous chart before creating a new one', () => {
      const destroySpy = jasmine.createSpy('destroy');

      component['chart'] = { destroy: destroySpy } as any;
      component['hoursByWeekday'] = { nativeElement: document.createElement('canvas') } as any;
      component['createHoursByWeekdayByVehicle']();

      expect(destroySpy).toHaveBeenCalled();
    });

    it('should not call getHoursByWeekdayPerVehicle if canvas is not available', () => {
      component['hoursByWeekday'] = null as any;
      component['createHoursByWeekdayByVehicle']();

      expect(graphicsService.getHoursByWeekdayPerVehicle).not.toHaveBeenCalled();
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

    it('should render the accessible chart title from graphics messages', () => {
      expect(getTitle().textContent).toContain(component.messages.hoursByWeekday.title);
    });

    it('should render the current month description by default', () => {
      expect(getDescription().textContent).toContain(component.messages.hoursByWeekday.description(TimePeriod.Month));
    });

    it('should update the description when the period changes', () => {
      fixture.componentRef.setInput('period', TimePeriod.Year);
      fixture.detectChanges();

      expect(getDescription().textContent).toContain(component.messages.hoursByWeekday.description(TimePeriod.Year));
    });

    it('should render the all time description', () => {
      fixture.componentRef.setInput('period', TimePeriod.AllTime);
      fixture.detectChanges();

      expect(getDescription().textContent).toContain(component.messages.hoursByWeekday.description(TimePeriod.AllTime));
    });

  });

});
