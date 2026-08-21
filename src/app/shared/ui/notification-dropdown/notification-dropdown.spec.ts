import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDropdownComponent } from './notification-dropdown';

describe('NotificationDropdownComponent', () => {
  let component: NotificationDropdownComponent;
  let fixture: ComponentFixture<NotificationDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationDropdownComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('empty state', () => {

    it('should show the empty message by default', () => {

    });

    it('should show a custom empty message when provided', () => {

    });

    it('should not render the empty message when isEmpty is false', () => {

    });

  });
});