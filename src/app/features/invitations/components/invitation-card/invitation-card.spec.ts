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

  const getButton = (): HTMLElement | null => fixture.nativeElement.querySelector('.invitation-card__button--decline');

  const getName = (): HTMLElement | null =>  fixture.nativeElement.querySelector('.invitation-card__vehicle-name');
  const getOwner = (): HTMLElement | null => fixture.nativeElement.querySelector('.invitation-card__owner span');
  const getDate = (): HTMLElement | null => fixture.nativeElement.querySelector('.invitation-card__date');

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

  describe('rendering', () => {

    it('should display the vehicle name', () => {
      const name = fixture.nativeElement.querySelector('.invitation-card__vehicle-name');
      expect(name.textContent.trim()).toBe('Ferrari LaFerrari');
    });

    it('should display the owner email', () => {
      const owner = fixture.nativeElement.querySelector('.invitation-card__owner span');
      expect(owner.textContent.trim()).toBe('owner1@fleetmanager.dev');
    });

    it('should display the invitation date', () => {
      const date = fixture.nativeElement.querySelector('.invitation-card__date');
      expect(date.getAttribute('datetime')).toBe('2026-08-10');
      expect(date.textContent.trim().length).toBeGreaterThan(0);
    });

    it('should render an Accept button', () => {
      const button = fixture.nativeElement.querySelector('.invitation-card__button--accept');
      expect(button).not.toBeNull();
      expect(button.textContent).toContain('Accept');
    });

    it('should render a Decline button', () => {
      const button = fixture.nativeElement.querySelector('.invitation-card__button--decline');
      expect(button).not.toBeNull();
      expect(button.textContent).toContain('Decline');
    });

  });

  describe('actions', () => {

    it('should emit accept with the invitation id when Accept is clicked', () => {
      spyOn(component.accept, 'emit');

      const button = fixture.nativeElement.querySelector('.invitation-card__button--accept');
      button.click();

      expect(component.accept.emit).toHaveBeenCalledWith('inv-1');
    });

    it('should emit decline with the invitation id when Decline is clicked', () => {
      spyOn(component.decline, 'emit');

      const button = fixture.nativeElement.querySelector('.invitation-card__button--decline');
      button.click();

      expect(component.decline.emit).toHaveBeenCalledWith('inv-1');
    });

    it('should not emit decline when Accept is clicked', () => {
      spyOn(component.decline, 'emit');

      const button = fixture.nativeElement.querySelector('.invitation-card__button--accept');
      button.click();

      expect(component.decline.emit).not.toHaveBeenCalled();
    });

  });

  describe('accessibility', () => {

    it('should have an aria-label on Accept mentioning the vehicle name', () => {
      const button = fixture.nativeElement.querySelector('.invitation-card__button--accept');
      expect(button.getAttribute('aria-label')).toContain('Ferrari LaFerrari');
    });

    it('should have an aria-label on Decline mentioning the vehicle name', () => {
      const button = fixture.nativeElement.querySelector('.invitation-card__button--decline');
      expect(button.getAttribute('aria-label')).toContain('Ferrari LaFerrari');
    });

  });

});