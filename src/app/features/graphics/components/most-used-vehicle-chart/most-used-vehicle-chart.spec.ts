import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

import { MostUsedVehicleChartComponent } from './most-used-vehicle-chart';

import { GraphicsServices } from '../../data-access/graphics-services';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MostUsedVehicleChartComponent,
      ],
      providers: [
        provideHttpClient(),
        { provide: Auth, useValue: authMock },
        GraphicsServices,
        VehicleService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostUsedVehicleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});