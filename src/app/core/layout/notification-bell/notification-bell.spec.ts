import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBellComponent } from './notification-bell';
import { InvitationService } from '../../../features/invitations/data-access/invitation-service';
import { InvitationStatus } from '../../../features/invitations/enums/invitation-status.enum';
import { VehicleInvitation } from '../../../features/invitations/models/invitation';

describe('NotificationBellComponent', () => {
  let component: NotificationBellComponent;
  let fixture: ComponentFixture<NotificationBellComponent>;
  let invitationService: InvitationService;

  const buildInvitation = (status: InvitationStatus): VehicleInvitation => ({
    _id: crypto.randomUUID(),
    vehicleId: '1',
    vehicleName: 'Ferrari LaFerrari',
    ownerId: 'owner-1',
    ownerEmail: 'owner1@fleetmanager.dev',
    invitedEmail: 'you@fleetmanager.dev',
    status,
    invitedAt: '2026-08-10',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationBellComponent]
    })
    .compileComponents();

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

    it('should not render when there are no pending invitations', () => {

    });

    it('should render the pending count when there are pending invitations', () => {

    });

    it('should update reactively when an invitation is accepted', () => {

    });

  });

});
