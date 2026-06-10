import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

import { VehiclePageComponent } from './vehicle-page';

describe('VehiclePageComponent', () => {
  let component: VehiclePageComponent;
  let fixture: ComponentFixture<VehiclePageComponent>;

  const authMock = {
    currentUser: {
      uid: 'JordiTheBest',
      getIdToken: () => Promise.resolve('MyToken')
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclePageComponent, HttpClientModule],
      providers: [
        { provide: Auth, useValue: authMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Template rendering', () => {
    it('should render vehicle view component', () => {
      const vehicleViewComponent = fixture.nativeElement.querySelector('app-vehicle-view');
      expect(vehicleViewComponent).toBeTruthy();
    });
  });

});
