import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

import { HoursByWeekdayVehicleChartComponent } from './hours-by-weekday-vehicle-chart';

import { GraphicsServices } from '../../data-access/graphics-services';
import { VehicleService } from '../../../vehicle/data-access/vehicle-service';

export const authMock = {
  currentUser : {
    userUid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
}

describe('HoursByWeekdayVehicleChartComponent', () => {
  let component: HoursByWeekdayVehicleChartComponent;
  let fixture: ComponentFixture<HoursByWeekdayVehicleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HoursByWeekdayVehicleChartComponent,
      ],
      providers: [
        provideHttpClient(),
        { provide: Auth, useValue: authMock },
        GraphicsServices,
        VehicleService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoursByWeekdayVehicleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
