import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBellComponent } from './notification-bell';

import { InvitationService } from '../../../features/invitations/data-access/invitation-service';
import { InvitationStatus } from '../../../features/invitations/enums/invitation-status.enum';
import { VehicleInvitation } from '../../../features/invitations/models/invitation';

describe('NotificationBellComponent', () => {
  let component: NotificationBellComponent;
  let fixture: ComponentFixture<NotificationBellComponent>;
  let invitationService: InvitationService;

  const buildInvitation = (
    status: InvitationStatus
  ): VehicleInvitation => ({
    _id: crypto.randomUUID(),
    vehicleId: '1',
    vehicleName: 'Ferrari LaFerrari',
    ownerId: 'owner-1',
    ownerEmail: 'owner1@fleetmanager.dev',
    invitedEmail: 'you@fleetmanager.dev',
    status,
    invitedAt: '2026-08-10',
  });

  const getButton = (): HTMLButtonElement => fixture.nativeElement.querySelector('button.notification-bell');
  const getBadge = (): HTMLElement | null => fixture.nativeElement.querySelector('.notification-bell__badge');
  const getDropdown = (): HTMLElement | null => fixture.nativeElement.querySelector('app-notification-dropdown');
  const getCards = (): HTMLElement | null => fixture.nativeElement.querySelectorAll('app-invitation-card');
  const getEmptyMessage = (): HTMLElement | null => fixture.nativeElement.querySelector('.notification-dropdown__empty');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationBellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationBellComponent);
    component = fixture.componentInstance;
    invitationService = TestBed.inject(InvitationService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render a bell icon', () => {
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('i.pi-bell');

    expect(icon).not.toBeNull();
  });

  describe('badge', () => {

    it('should not render when all invitations are non-pending', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Accepted),
        buildInvitation(InvitationStatus.Declined),
      ]);
      fixture.detectChanges();

      expect(getBadge()).toBeNull();
    });

    it('should render the pending count when there are pending invitations', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Pending),
        buildInvitation(InvitationStatus.Pending),
      ]);
      fixture.detectChanges();

      expect(getBadge()?.textContent?.trim()).toBe('2');
    });

    it('should update reactively when an invitation is accepted', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Pending),
      ]);
      fixture.detectChanges();

      expect(getBadge()?.textContent?.trim()).toBe('1');

      const [pending] = invitationService.pendingInvitations();
      invitationService.acceptInvitation(pending._id);
      fixture.detectChanges();

      expect(getBadge()).toBeNull();
    });

  });

  describe('aria-label', () => {

    it('should mention pending count when there are pending invitations', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Pending),
      ]);
      fixture.detectChanges();

      expect(getButton().getAttribute('aria-label')).toContain('1 pending');
    });

    it('should not mention pending count when there are no pending invitations', () => {
      (invitationService as any)._invitations.set([]);
      fixture.detectChanges();

      expect(getButton().getAttribute('aria-label')).not.toContain('pending');
    });

  });

  describe('panel toggle', () => {

    it('should not render the dropdown by default', () => {
      fixture.detectChanges();

      expect(getDropdown()).toBeNull();
    });

    it('should render the dropdown after clicking the bell', () => {
      fixture.detectChanges();

      getButton().click();
      fixture.detectChanges();

      expect(getDropdown()).not.toBeNull();
    });

    it('should close the dropdown when clicking the bell again', () => {
      fixture.detectChanges();

      getButton().click();
      fixture.detectChanges();
      getButton().click();
      fixture.detectChanges();

      expect(getDropdown()).toBeNull();
    });

    it('should close the dropdown when it emits close', () => {
      fixture.detectChanges();
      component.isPanelOpen.set(true);
      fixture.detectChanges();

      component.closePanel();
      fixture.detectChanges();

      expect(getDropdown()).toBeNull();
    });

    it('should set aria-expanded based on panel state', () => {
      fixture.detectChanges();

      expect(getButton().getAttribute('aria-expanded')).toBe('false');

      getButton().click();
      fixture.detectChanges();

      expect(getButton().getAttribute('aria-expanded')).toBe('true');
    });

  });

  describe('invitation list rendering', () => {

    it('should render one card per pending invitation', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Pending),
        buildInvitation(InvitationStatus.Pending),
        buildInvitation(InvitationStatus.Accepted),
      ]);
      fixture.detectChanges();

      getButton().click();
      fixture.detectChanges();

      const cards = fixture.nativeElement.querySelectorAll('app-invitation-card');
      expect(cards.length).toHaveSize(2);
    });

    it('should not render accepted or declined invitations', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Accepted),
        buildInvitation(InvitationStatus.Declined),
      ]);
      fixture.detectChanges();

      getButton().click();
      fixture.detectChanges();

      const cards = fixture.nativeElement.querySelectorAll('app-invitation-card');
      expect(cards.length).toHaveSize(0);
    });

    it('should show the dropdown empty state when there are no pending invitations', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Accepted),
      ]);
      fixture.detectChanges();

      getButton().click();
      fixture.detectChanges();

      const emptyMessage = fixture.nativeElement.querySelector('.notification-dropdown__empty');
      expect(emptyMessage.textContent.trim()).toBe('No pending invitations');
    });

  });

});
