import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPanelComponent } from './details-panel';
import { MapMessagesService } from '../../i18n/map-messages';

describe('DetailsPanelComponent', () => {
  let component: DetailsPanelComponent;
  let fixture: ComponentFixture<DetailsPanelComponent>;

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

  describe('Component creation', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

  });

  describe('Button functionality', () => {

    it('should emit click event when button is clicked', () => {
      spyOn(component.click, 'emit');
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

      button.click();
      expect(component.click.emit).toHaveBeenCalled();
    });

    it('should emit click event only once per click', () => {
      spyOn(component.click, 'emit');
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

      button.click();
      expect(component.click.emit).toHaveBeenCalledTimes(1);
    });

    it('should not be disabled by default', () => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBeFalse();
    });

  });

  describe('Vehicle rendering', () => {

    it('should render vehicle name when vehicle is provided', () => {

    });

    it('should render vehicle plate when vehicle is provided', () => {

    });

    it('should render empty values when vehicle is null', () => {

    });

  });

  describe('Accessibility and template', () => {

    it('should render a button element', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button).not.toBeNull();
    });

    it('should have correct aria-label', () => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      expect(button.getAttribute('aria-label')).toBe(MockDetailsPanel.detailsPanel.aria.button);
    });

    it('should set title attribute from messages service', () => {

    });

    it('should set aria-label on article using region message', () => {

    });

    it('should render the icon element', () => {
      const icon: HTMLElement = fixture.nativeElement.querySelector('i');
      expect(icon).toBeTruthy();
    });

    it('should have correct css classes', () => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      const icon: HTMLElement = fixture.nativeElement.querySelector('i');

      expect(button.classList.contains('map-card__button')).toBeTrue();
      expect(icon.classList.contains('pi')).toBeTrue();
      expect(icon.classList.contains('pi-compass')).toBeTrue();
    });

    it('should have aria-hidden true on icon', () => {
      const icon: HTMLElement = fixture.nativeElement.querySelector('i');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });

    it('should render button text from messages service', () => {
      
    });

  });

});
