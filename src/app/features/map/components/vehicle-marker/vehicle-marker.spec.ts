import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleMarkerComponent } from './vehicle-marker';

describe('VehicleMarkerComponent', () => {
  let component: VehicleMarkerComponent;
  let fixture: ComponentFixture<VehicleMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleMarkerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleMarkerComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('vehicle', {
      name: 'Ferrari',
      model: 'LaFerrari',
      plate: '1234ABC',
      imageUrl: 'test-image.jpg'
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('image rendering', () => {

    it('should render the vehicle image when imageUrl is available', () => {

    });

    it('should render the fallback image when imageUrl is missing', () => {

    });

  });

  describe('alt attribute', () => {

    it('should use the vehicle name as image alt text', () => {

    });

  });

});
