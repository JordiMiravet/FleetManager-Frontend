import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Auth } from '@angular/fire/auth';

import { CalendarComponent } from './calendar-page';

export const authMock = {
  currentUser: {
    userUid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
}

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CalendarComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Auth, useValue: authMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-calendar-view', () => {
    const calendarView = fixture.nativeElement.querySelector('app-calendar-view');
    expect(calendarView).toBeTruthy();
  });

  it('should contain only the calendar view component', () => {
    const element = fixture.nativeElement;

    expect(element.children.length).toBe(1);
    expect(element.children[0].tagName.toLowerCase()).toBe('app-calendar-view');
  });

});
