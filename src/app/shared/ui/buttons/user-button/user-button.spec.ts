import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserButtonComponent } from './user-button';

describe('UserButtonComponent', () => {
  let component: UserButtonComponent;
  let fixture: ComponentFixture<UserButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template rendering', () => {

    it('should render button with correct attributes');

    it('should render user icon with correct classes');

  });

  describe('Output: user', () => {

    it('should emit user when onClick is called');

    it('should emit user when button is clicked');

  });

});