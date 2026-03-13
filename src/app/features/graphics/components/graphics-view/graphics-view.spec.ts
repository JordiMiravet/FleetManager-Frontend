import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Auth } from '@angular/fire/auth';

import { GraphicsViewComponent } from './graphics-view';

import { VehicleService } from '../../../vehicle/services/vehicle-service/vehicle-service';
import { VehicleInterface } from '../../../vehicle/interfaces/vehicle';

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
        HttpClientTestingModule
      ], 
      providers: [
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
