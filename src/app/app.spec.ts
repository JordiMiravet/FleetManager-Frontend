import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Auth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';

const mockAuth = {
  onAuthStateChanged: (callback: any) => callback(null)
} as unknown as Auth;

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App, 
      ],
      providers: [
        { provide: Auth, useValue: mockAuth},
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('Template rendering', () => {
    it('should render the header', () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();

      const header = fixture.nativeElement.querySelector('app-header');

      expect(header).toBeTruthy();
    });

    it('should render the app content container', () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();

      const appContent = fixture.nativeElement.querySelector('main.app-content');

      expect(appContent).toBeTruthy();
    });

    it('should render the router outlet inside the app content container', () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();

      const appContent = fixture.nativeElement.querySelector('main.app-content');
      const routerOutlet = appContent?.querySelector('router-outlet');

      expect(routerOutlet).toBeTruthy();
    });
  });
});
