import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { VehicleEmptyStateComponent } from './vehicle-empty-state';

describe('VehicleEmptyStateComponent', () => {
  let component: VehicleEmptyStateComponent;
  let fixture: ComponentFixture<VehicleEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VehicleEmptyStateComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('initial state', () => {
    it('should have createVehicle as an output', () => {
      expect(component.createVehicle).toBeDefined();
      expect(typeof component.createVehicle.emit).toBe('function');
    });
  });

  describe('template rendering', () => {
    it('should render the container', () => {
      const container = fixture.nativeElement.querySelector('.vehicle-empty__container');
      expect(container).toBeTruthy();
    });

    it('should render the empty state message', () => {

    });

    it('should render the create button', () => {

    });

    it('should set aria-label on container', () => {

    });

    it('should pass create text to create button', () => {

    });
  });

  describe('methods', () => {
    it('should call onClick method', () => {
      spyOn(component, 'onClick');

      const button = fixture.debugElement.query(By.css('app-create-button'));
      button.triggerEventHandler('click', null);

      expect(component.onClick).toHaveBeenCalled();
    });

    it('should emit createVehicle event when onClick is called', () => {
      spyOn(component.createVehicle, 'emit');
      component.onClick();

      expect(component.createVehicle.emit).toHaveBeenCalled();
    });
  });

  describe('events', () => {

    it('should emit createVehicle when button is clicked', () => {

    });
  });

});
