import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Auth } from '@angular/fire/auth';

import { CalendarPageComponent } from './calendar-page';

export const authMock = {
  currentUser: {
    userUid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
}

describe('CalendarPageComponent', () => {
  let component: CalendarPageComponent;
  let fixture: ComponentFixture<CalendarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CalendarPageComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Auth, useValue: authMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarPageComponent);
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
