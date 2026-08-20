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

});
