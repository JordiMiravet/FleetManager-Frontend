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
      fixture.detectChanges();

      const empty = fixture.nativeElement.querySelector('.notification-dropdown__empty');
      expect(empty).not.toBeNull();
      expect(empty.textContent.trim()).toBe('Nothing to show here');
    });

    it('should show a custom empty message when provided', () => {
      fixture.componentRef.setInput('emptyMessage', 'No pending invitations');
      fixture.detectChanges();

      const empty = fixture.nativeElement.querySelector('.notification-dropdown__empty');
      expect(empty.textContent.trim()).toBe('No pending invitations');
    });

    it('should not render the empty message when isEmpty is false', () => {
      fixture.componentRef.setInput('isEmpty', false);
      fixture.detectChanges();

      const empty = fixture.nativeElement.querySelector('.notification-dropdown__empty');
      expect(empty).toBeNull();
    });

  });
});