import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VehicleEmptyStateComponent } from './vehicle-empty-state';

describe('VehicleEmptyStateComponent', () => {
  let component: VehicleEmptyStateComponent;
  let fixture: ComponentFixture<VehicleEmptyStateComponent>;

  const getContainer = (): HTMLElement => fixture.nativeElement.querySelector('.vehicle-empty__container');
  const getMessage = (): HTMLElement => fixture.nativeElement.querySelector('.vehicle-empty__text');
  const getCreateButton = (): DebugElement => fixture.debugElement.query(By.css('app-create-button'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VehicleEmptyStateComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state', () => {

    it('should have createVehicle as an output', () => {
      expect(component.createVehicle).toBeDefined();
      expect(typeof component.createVehicle.emit).toBe('function');
    });

  });

  describe('template rendering', () => {

    it('should render the container', () => {
      const container = getContainer();

      expect(container).toBeTruthy();
    });

    it('should render the empty state message', () => {
      const message = getMessage();

      expect(message.textContent?.trim().length).toBeGreaterThan(0);
    });

    it('should render the create button', () => {
      const button = getCreateButton();
      
      expect(button).toBeTruthy();
    });

    it('should set aria-label on container', () => {
      const container = getContainer();

      expect(container.getAttribute('aria-label')).toBeTruthy();
    });

    it('should pass create text to create button', () => {
      const button = getCreateButton();

      expect(button.componentInstance.createText()).toBe(component.emptyStateMsg.button);
    });

  });

  describe('methods', () => {

    it('should call onClick method', () => {
      spyOn(component, 'onClick');

      const button = getCreateButton();
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
      spyOn(component.createVehicle, 'emit');

      const button = getCreateButton();
      button.triggerEventHandler('click', null);

      expect(component.createVehicle.emit).toHaveBeenCalled();
    });

  });

});
