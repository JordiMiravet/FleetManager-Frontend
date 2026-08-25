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

  const getAcceptButton = (): HTMLElement | null => fixture.nativeElement.querySelector('.invitation-card__button--accept');

  const getButton = (): HTMLButtonElement => fixture.nativeElement.querySelector('button.notification-bell');
  const getBadge = (): HTMLElement | null => fixture.nativeElement.querySelector('.notification-bell__badge');
  const getDropdown = (): HTMLElement | null => fixture.nativeElement.querySelector('app-notification-dropdown');
  const getCards = (): NodeListOf<Element> => fixture.nativeElement.querySelectorAll('app-invitation-card');
  const getEmptyMessage = (): HTMLElement | null => fixture.nativeElement.querySelector('.notification-dropdown__empty');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationBellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationBellComponent);
    component = fixture.componentInstance;
    invitationService = TestBed.inject(InvitationService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a bell icon', () => {
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
      expect(getDropdown()).toBeNull();
    });

    it('should render the dropdown after clicking the bell', () => {
      getButton().click();
      fixture.detectChanges();

      expect(getDropdown()).not.toBeNull();
    });

    it('should close the dropdown when clicking the bell again', () => {
      getButton().click();
      fixture.detectChanges();
      getButton().click();
      fixture.detectChanges();

      expect(getDropdown()).toBeNull();
    });

    it('should close the dropdown when it emits close', () => {
      component.isPanelOpen.set(true);
      fixture.detectChanges();

      component.closePanel();
      fixture.detectChanges();

      expect(getDropdown()).toBeNull();
    });

    it('should set aria-expanded based on panel state', () => {
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

      expect(getCards()).toHaveSize(2);
    });

    it('should not render accepted or declined invitations', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Accepted),
        buildInvitation(InvitationStatus.Declined),
      ]);
      fixture.detectChanges();

      getButton().click();
      fixture.detectChanges();

      expect(getCards()).toHaveSize(0);
    });

    it('should show the dropdown empty state when there are no pending invitations', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Accepted),
      ]);
      fixture.detectChanges();

      getButton().click();
      fixture.detectChanges();

      expect(getEmptyMessage()?.textContent?.trim()).toBe('No pending invitations');
    });

  });

  describe('accepting an invitation', () => {

    it('should call acceptInvitation on the service when a card emits accept', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Pending),
      ]);
      fixture.detectChanges();

      getButton().click();
      fixture.detectChanges();

      spyOn(invitationService, 'acceptInvitation').and.callThrough();

      const [pending] = invitationService.pendingInvitations();
      getAcceptButton()?.click();

      expect(invitationService.acceptInvitation).toHaveBeenCalledWith(pending._id);
    });

    it('should remove the invitation from the rendered list after accepting', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Pending),
      ]);
      fixture.detectChanges();

      getButton().click();
      fixture.detectChanges();

      getAcceptButton()?.click();
      fixture.detectChanges();

      expect(getCards().length).toHaveSize(0);
    });

    it('should update the badge count after accepting', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Pending),
      ]);
      fixture.detectChanges();

      getButton().click();
      fixture.detectChanges();

      getAcceptButton()?.click();
      fixture.detectChanges();

      expect(getBadge()).toBeNull();
    });

  });

  describe('declining an invitation', () => {

    it('should call declineInvitation on the service when a card emits decline', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Pending),
      ]);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.notification-bell');
      button.click();
      fixture.detectChanges();

      spyOn(invitationService, 'declineInvitation').and.callThrough();

      const card = fixture.nativeElement.querySelector('app-invitation-card');
      const declineButton = card.querySelector('.invitation-card__button--decline');
      declineButton.click();

      const [pending] = invitationService.pendingInvitations();
      expect(invitationService.declineInvitation).toHaveBeenCalledWith(pending._id);
    });

    it('should remove the invitation from the rendered list after declining', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Pending),
      ]);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.notification-bell');
      button.click();
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('app-invitation-card');
      const declineButton = card.querySelector('.invitation-card__button--decline');
      declineButton.click();
      fixture.detectChanges();

      const cards = fixture.nativeElement.querySelectorAll('app-invitation-card');
      expect(cards.length).toBe(0);
    });

    it('should update the badge count after declining', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Pending),
      ]);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.notification-bell');
      button.click();
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('app-invitation-card');
      const declineButton = card.querySelector('.invitation-card__button--decline');
      declineButton.click();
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.notification-bell__badge');
      expect(badge).toBeNull();
    });

    it('should not have changed the invitation status to accepted', () => {
      (invitationService as any)._invitations.set([
        buildInvitation(InvitationStatus.Pending),
      ]);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.notification-bell');
      button.click();
      fixture.detectChanges();

      const [pending] = invitationService.pendingInvitations();
      const card = fixture.nativeElement.querySelector('app-invitation-card');
      const declineButton = card.querySelector('.invitation-card__button--decline');
      declineButton.click();

      expect(invitationService.acceptedInvitations().some(i => i._id === pending._id)).toBeFalse();
    });

  });

});
