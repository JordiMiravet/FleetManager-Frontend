import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { VehicleSelectorComponent } from './vehicle-selector';
import { VehicleInterface } from '../../interfaces/vehicle/vehicle';

describe('VehicleSelectorComponent', () => {
  let component: VehicleSelectorComponent;
  let fixture: ComponentFixture<VehicleSelectorComponent>;

  const mockVehicles: VehicleInterface[] = [
    { name: 'Ferrari', model: 'F8 Tributo', plate: 'F123', location: { lat: 41, lng: 2 } },
    { name: 'Pagani', model: 'Huayra', plate: 'P456', location: { lat: 42, lng: 3 } },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VehicleSelectorComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('component creation', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

  });

  describe('inputs', () => {

    it('should accept vehicles input', () => {
      const mockSignal = () => mockVehicles;
      (component.vehicles as any) = mockSignal;

      expect(component.vehicles()).toBe(mockVehicles);
    });

    it('should accept selectedPlate input', () => {
      const mockPlateSignal = () => 'F123';
      (component.selectedPlate as any) = mockPlateSignal;

      expect(component.selectedPlate()).toBe('F123');
    });

  });

  describe('template rendering', () => {

    it('should render the select element', () => {
      const select = fixture.nativeElement.querySelector('#vehicle-select');
      expect(select).toBeTruthy();
    });

    it('should render an option for each vehicle plus default option', () => {
      (component.vehicles as any) = () => mockVehicles;
      fixture.detectChanges();

      const allOptions = fixture.nativeElement.querySelectorAll('option');
      expect(allOptions).toHaveSize(mockVehicles.length + 1)
    });

    it('should render the option matching selectedPlate', () => {
      fixture.componentRef.setInput('vehicles', mockVehicles);
      fixture.componentRef.setInput('selectedPlate', 'F123');

      fixture.detectChanges();

      const options = Array.from(
        fixture.nativeElement.querySelectorAll('option')
      ) as HTMLOptionElement[];

      const selectedOption = options.find(
        option => option.value === 'F123'
      );

      expect(selectedOption).toBeTruthy();
    });

    it('should update selected vehicle in select when selectedPlate changes', () => {
      fixture.componentRef.setInput('vehicles', mockVehicles);
      fixture.componentRef.setInput('selectedPlate', 'P456');

      fixture.detectChanges();

      const options = Array.from(
        fixture.nativeElement.querySelectorAll('option')
      ) as HTMLOptionElement[];

      const selectedOption = options.find(
        option => option.value === 'P456'
      );

      expect(selectedOption).toBeTruthy();
    });

    it('should render only the default option when there are no vehicles', () => {
      (component.vehicles as any) = () => [];
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('option');

      expect(options).toHaveSize(1);
    });

    it('should render vehicle names', () => {
      (component.vehicles as any) = () => mockVehicles;
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('option');

      expect(options[1].textContent.trim()).toBe('Ferrari');
      expect(options[2].textContent.trim()).toBe('Pagani');
    });

    it('should render the accessibility label', () => {
      const label = fixture.nativeElement.querySelector('label');

      expect(label).toBeTruthy();
      expect(label.getAttribute('for')).toBe('vehicle-select');
    });

    it('should not select any vehicle when selectedPlate is null', () => {
      (component.vehicles as any) = signal(mockVehicles);
      (component.selectedPlate as any) = signal(null);

      fixture.detectChanges();

      const select: HTMLSelectElement = fixture.nativeElement.querySelector('select');

      expect(select.value).toBe('');
    });

  });

  describe('events', () => {

    it('should emit vehicleSelected when a vehicle is selected', () => {
      (component.vehicles as any) = () => mockVehicles;
      fixture.detectChanges();
      spyOn(component.vehicleSelected, 'emit');

      const select: HTMLSelectElement = fixture.nativeElement.querySelector('#vehicle-select');
      select.value = 'P456';
      select.dispatchEvent(new Event('change'));

      expect(component.vehicleSelected.emit).toHaveBeenCalledWith(mockVehicles[1]);
    });

    it('should emit null when default option is selected', () => {
      (component.vehicles as any) = () => mockVehicles;
      fixture.detectChanges();
      spyOn(component.vehicleSelected, 'emit');

      const select: HTMLSelectElement = fixture.nativeElement.querySelector('#vehicle-select');
      select.value = '';
      select.dispatchEvent(new Event('change'));

      expect(component.vehicleSelected.emit).toHaveBeenCalledWith(null as any);
    });

    it('should not emit if selected plate does not match any vehicle', () => {
      (component.vehicles as any) = () => mockVehicles;
      fixture.detectChanges();

      spyOn(component.vehicleSelected, 'emit');

      component.onVehicleChange({
        target: { value: 'X999' }
      } as any);

      expect(component.vehicleSelected.emit).not.toHaveBeenCalled();
    });

    it('should not emit when selecting an unknown plate from DOM', () => {
      (component.vehicles as any) = () => mockVehicles;
      fixture.detectChanges();

      spyOn(component.vehicleSelected, 'emit');

      component.onVehicleChange({
        target: { value: 'UNKNOWN' }
      } as any);

      expect(component.vehicleSelected.emit).not.toHaveBeenCalled();
    });

  });

});
