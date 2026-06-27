import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { signal } from '@angular/core';

import { VehicleTablePaginationComponent } from './vehicle-table-pagination';
import { VehicleService } from '../../data-access/vehicle-service';
import { VehicleInterface } from '../../interfaces/vehicle/vehicle';

const authMock = {
  currentUser: {
    uid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
};

const vehicleServiceMock = {
  vehicles: signal<VehicleInterface[]>([])
};

describe('VehicleTablePaginationComponent', () => {
  let component: VehicleTablePaginationComponent;
  let fixture: ComponentFixture<VehicleTablePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTablePaginationComponent],
      providers: [
        { provide: Auth, useValue: authMock },
        { provide: VehicleService, useValue: vehicleServiceMock },
        provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleTablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state', () => {

    it('should expose vehicles from VehicleService', () => {
      expect(component.vehicles).toBe(vehicleServiceMock.vehicles);
    });

  });

  describe('template rendering', () => {

    it('should render the nav with correct role and aria-label');

    it('should render vehicle count from vehicles signal');

    it('should render previous page button');

    it('should render next page button');

  });

  describe('accessibility', () => {

    it('should have aria-label on previous page button');

    it('should have aria-label on next page button');

    it('should have aria-live on vehicle count spans');

    it('should have aria-hidden on pagination icons');

  });

});
