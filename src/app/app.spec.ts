import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';

import { App } from './app';

const mockAuth = {
  onAuthStateChanged: (callback: any) => callback(null)
} as unknown as Auth;

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  const getHeader = (): HTMLElement | null => fixture.nativeElement.querySelector('app-header');
  const getAppContent = (): HTMLElement | null => fixture.nativeElement.querySelector('main.app-content');
  const getRouterOutlet = (): HTMLElement | null => getAppContent()?.querySelector('router-outlet') ?? null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ App ],
      providers: [
        { provide: Auth, useValue: mockAuth},
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('Template rendering', () => {

    it('should render the header', () => {
      expect(getHeader()).toBeTruthy();
    });

    it('should render the app content container', () => {
      expect(getAppContent()).toBeTruthy();
    });

    it('should render the router outlet inside the app content container', () => {
      expect(getRouterOutlet()).toBeTruthy();
    });

  });

});
