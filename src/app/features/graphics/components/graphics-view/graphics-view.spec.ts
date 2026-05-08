import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';

import { GraphicsViewComponent } from './graphics-view';

import { VehicleService } from '../../../vehicle/data-access/vehicle-service';
import { VehicleInterface } from '../../../vehicle/interfaces/vehicle/vehicle';

export const authMock = {
  currentUser: {
    uid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
};

const vehicleServiceMock = {
  vehicles: signal<VehicleInterface[]>([]),
  loadVehicles: jasmine.createSpy('loadVehicles'),
  addVehicles: jasmine.createSpy('addVehicles'),
  updateVehicle: jasmine.createSpy('updateVehicle'),
  deleteVehicle: jasmine.createSpy('deleteVehicle')
};

describe('GraphicsView', () => {
  let component: GraphicsViewComponent;
  let fixture: ComponentFixture<GraphicsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GraphicsViewComponent,
      ], 
      providers: [
        provideHttpClient(),
        { provide: Auth, useValue: authMock },
        { provide: VehicleService, useValue: vehicleServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
