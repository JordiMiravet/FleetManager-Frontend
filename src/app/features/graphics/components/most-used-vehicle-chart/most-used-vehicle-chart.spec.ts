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
  let vehicleService: VehicleService;

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
    vehicleService = TestBed.inject(VehicleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('period input', () => {

    it('should default to TimePeriod.Month');

    it('should accept a different period value');

  });

  describe('chart creation', () => {

    it('should call getMostUsedVehicle when canvas is available');

    it('should not create chart if data is empty');

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