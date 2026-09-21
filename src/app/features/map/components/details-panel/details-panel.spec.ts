import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPanelComponent } from './details-panel';

import { VehicleInterface } from '../../../vehicle/models/vehicle';
import { MapMessagesService } from '../../i18n/map-messages';

const MockDetailsPanel = {
  mapView: {
    aria: {
      mapRegion: '',
      mapDescription: ''
    },
    confirmModal: {
      title: '',
      message: ''
    }
  },
  detailsPanel: {
    button: 'Center on Me',
    aria: {
      region: 'Selected vehicle details',
      button: 'Center map on current location',
      buttonTitle: "Click to center the map on the vehicle's location"
    }
  }
};

const MockVehicle :VehicleInterface = {
  _id: '1',
  name: 'Ferrari',
  model: 'F8',
  plate: 'F123',
  location: { lat: 41, lng: 2 }
};

describe('DetailsPanelComponent', () => {
  let component: DetailsPanelComponent;
  let fixture: ComponentFixture<DetailsPanelComponent>;

  const getMapCard = (): HTMLElement => fixture.nativeElement.querySelector('.map-card');

  const getButton = (): HTMLButtonElement => fixture.nativeElement.querySelector('.map-card__button');
  const getIcon = (): HTMLElement => fixture.nativeElement.querySelector('.map-card__icon');

  const getName = (): HTMLElement => fixture.nativeElement.querySelector('#map-card-title');
  const getPlate = (): HTMLElement => fixture.nativeElement.querySelector('#vehicle-plate');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPanelComponent],
      providers: [
        {
          provide: MapMessagesService,
          useValue: MockDetailsPanel
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Button functionality', () => {

    it('should emit locationRequest event when button is clicked', () => {
      spyOn(component.locationRequest, 'emit');

      const button = getButton();
      button.click();

      expect(component.locationRequest.emit).toHaveBeenCalledTimes(1);
    });

    it('should not be disabled by default', () => {
      const button = getButton();
      expect(button.disabled).toBeFalse();
    });

  });

  describe('Vehicle rendering', () => {

    it('should have null vehicle by default', () => {
      expect(component.vehicle()).toBeNull();
    });

    it('should render vehicle data when provided', () => {
      fixture.componentRef.setInput('vehicle', MockVehicle);
      fixture.detectChanges();

      const name = getName();
      const plate = getPlate();

      expect(name.textContent).toContain('Ferrari');
      expect(plate.textContent).toContain('F123');
    });

    it('should render empty values when vehicle is null', () => {
      fixture.componentRef.setInput('vehicle', null);
      fixture.detectChanges();

      const name = getName();
      const plate = getPlate();

      expect(name.textContent.trim()).toBe('');
      expect(plate.textContent.trim()).toBe('');
    });

  });

  describe('Accessibility and template', () => {

    it('should render a button element', () => {
      const button = getButton();
      expect(button).not.toBeNull();
    });

    it('should have correct aria-label', () => {
      const button = getButton();
      expect(button.getAttribute('aria-label')).toBe(MockDetailsPanel.detailsPanel.aria.button);
    });

    it('should set title attribute from messages service', () => {
      const button = getButton();
      expect(button.getAttribute('title')).toBe(MockDetailsPanel.detailsPanel.aria.buttonTitle);
    });

    it('should set aria-label on article using region message', () => {
      const article = getMapCard();
      expect(article.getAttribute('aria-label')).toBe(MockDetailsPanel.detailsPanel.aria.region);
    });

    it('should render the icon element', () => {
      const icon = getIcon();
      expect(icon).toBeTruthy();
    });

    it('should have correct css classes', () => {
      const button = getButton();
      const icon = getIcon();

      expect(button.classList.contains('map-card__button')).toBeTrue();
      expect(icon.classList.contains('pi')).toBeTrue();
      expect(icon.classList.contains('pi-compass')).toBeTrue();
    });

    it('should have aria-hidden true on icon', () => {
      const icon = getIcon();
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });

    it('should render button text from messages service', () => {
      const button = getButton();
      expect(button.textContent).toContain(MockDetailsPanel.detailsPanel.button);
    });

  });

});
