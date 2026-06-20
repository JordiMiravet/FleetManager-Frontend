import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Auth } from '@angular/fire/auth';
import { By } from '@angular/platform-browser';

import { MapPageComponent } from './map-page';
import { MapContainerComponent } from '../../components/map-container/map-container';

export const authMock = {
  currentUser: {
    uid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
}

describe('MapPageComponent', () => {
  let component: MapPageComponent;
  let fixture: ComponentFixture<MapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MapPageComponent, 
      ],
      providers: [
        { provide: Auth, useValue: authMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component creation', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

  });

  describe('child components rendering', () => {

    it('should render graphics-view component', () => {
      const graphicsComponent = fixture.nativeElement.querySelector('app-map-container');
      expect(graphicsComponent).toBeTruthy();
    });

    it('should render GraphicsViewComponent', () => {
      const child = fixture.debugElement.query(
        By.directive(MapContainerComponent)
      );

      expect(child).toBeTruthy();
    });

  });

});
