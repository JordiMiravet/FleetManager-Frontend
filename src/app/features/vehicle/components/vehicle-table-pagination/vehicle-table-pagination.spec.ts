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

    it('should render the nav with correct role and aria-label', () => {
      const nav = fixture.nativeElement.querySelector('nav');

      expect(nav).toBeTruthy();
      expect(nav.getAttribute('role')).toBe('navigation');
      expect(nav.getAttribute('aria-label')).toBe(component.paginationMsg.aria.navigation);
    });

    it('should render vehicle count from vehicles signal', () => {
      vehicleServiceMock.vehicles.set([
        { _id: '1', name: 'Ferrari', model: 'F8', plate: '123XC' },
        { _id: '2', name: 'Pagani', model: 'Huayra', plate: '456YZ' }
      ]);
      fixture.detectChanges();

      const values = fixture.nativeElement.querySelectorAll('.vehicle-pagination__value');
      expect(values[0].textContent.trim()).toBe('2');
      expect(values[1].textContent.trim()).toBe('2');
    });

    it('should render previous page button', () => {
      const button = fixture.nativeElement.querySelector('.vehicle-pagination__button:first-of-type');
      expect(button).toBeTruthy();
    });

    it('should render next page button', () => {
      const buttons = fixture.nativeElement.querySelectorAll('.vehicle-pagination__button');
      expect(buttons.length).toBe(2);
    });

  });

  describe('accessibility', () => {

    it('should have aria-label on previous page button');

    it('should have aria-label on next page button');

    it('should have aria-live on vehicle count spans');

    it('should have aria-hidden on pagination icons');

  });

});
