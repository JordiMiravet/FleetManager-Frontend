import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

import { MapPageComponent } from './map-page';

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
        HttpClientModule
      ],
      providers: [
        { provide: Auth, useValue: authMock },
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

});
