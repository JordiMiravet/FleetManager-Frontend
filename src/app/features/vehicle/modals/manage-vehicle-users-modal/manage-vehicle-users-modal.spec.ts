import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVehicleUsersModal } from './manage-vehicle-users-modal';

describe('ManageVehicleUsersModal', () => {
  let component: ManageVehicleUsersModal;
  let fixture: ComponentFixture<ManageVehicleUsersModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageVehicleUsersModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVehicleUsersModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
