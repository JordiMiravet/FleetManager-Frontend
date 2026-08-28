import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Auth } from '@angular/fire/auth';

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
        { provide: Auth, useValue: mockAuth}
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

    });

    it('should render the app content container', () => {

    });

    it('should render the router outlet inside the app content container', () => {

    });
  });
});
