import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMarkerComponent } from './vehicle-marker';
import { VehicleInterface } from '../../../vehicle/models/vehicle';

const mockVehicle: VehicleInterface = {
  name: 'Ferrari',
  model: 'LaFerrari',
  plate: '1234ABC',
  imageUrl: 'test-image.jpg',
};

describe('VehicleMarkerComponent', () => {
  let component: VehicleMarkerComponent;
  let fixture: ComponentFixture<VehicleMarkerComponent>;

  const getVehicleImage = (): HTMLImageElement => fixture.nativeElement.querySelector('img');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VehicleMarkerComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleMarkerComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('vehicle', mockVehicle);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('image rendering', () => {

    it('should render the vehicle image when imageUrl is available', () => {
      const vehicleImage = getVehicleImage();

      expect(vehicleImage.src).toContain('test-image.jpg');
    });

    it('should render the fallback image when imageUrl is missing', () => {
      fixture.componentRef.setInput('vehicle', {
        ...mockVehicle,
        imageUrl: '',
      });
      fixture.detectChanges();

      const vehicleImage = getVehicleImage();
      expect(vehicleImage.src).toContain(component.fallbackImage);
    });

  });

  describe('alt attribute', () => {

    it('should use the vehicle name as image alt text', () => {
      const vehicleImage = getVehicleImage();

      expect(vehicleImage.alt).toBe(component.vehicle().name);
    });

  });

});
