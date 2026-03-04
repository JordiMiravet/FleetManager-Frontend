import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVehicleUsersModalComponent } from './manage-vehicle-users-modal';

describe('ManageVehicleUsersModalComponent', () => {
  let component: ManageVehicleUsersModalComponent;
  let fixture: ComponentFixture<ManageVehicleUsersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageVehicleUsersModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVehicleUsersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
