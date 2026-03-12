import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';

import { ManageVehicleUsersModalComponent } from './manage-vehicle-users-modal';

describe('ManageVehicleUsersModalComponent', () => {
  let component: ManageVehicleUsersModalComponent;
  let fixture: ComponentFixture<ManageVehicleUsersModalComponent>;

  const authMock = {
    currentUser: {
      uid: 'UserUid',
      getIdToken: () => Promise.resolve('Mytoken')
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageVehicleUsersModalComponent],
      providers: [
        { provide: Auth, useValue: authMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageVehicleUsersModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('vehicle', null);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});