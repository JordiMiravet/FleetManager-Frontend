import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationCardComponent } from './invitation-card';
import { VehicleInvitation } from '../../models/invitation';
import { InvitationStatus } from '../../enums/invitation-status.enum';

describe('InvitationCardComponent', () => {
  let component: InvitationCardComponent;
  let fixture: ComponentFixture<InvitationCardComponent>;

  const mockInvitation: VehicleInvitation = {
    _id: 'inv-1',
    vehicleId: '1',
    vehicleName: 'Ferrari LaFerrari',
    ownerId: 'owner-1',
    ownerEmail: 'owner1@fleetmanager.dev',
    invitedEmail: 'you@fleetmanager.dev',
    status: InvitationStatus.Pending,
    invitedAt: '2026-08-10',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvitationCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('invitation', mockInvitation);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
