import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';

import { VehicleTableComponent } from './vehicle-table';

import { AuthorizationService } from '../../../../core/services/authorization/authorization-service';
import { VehicleInterface } from '../../interfaces/vehicle/vehicle';

const authMock = {
  currentUser: {
    uid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
};

const permissionServiceMock = {
  isOwner: jasmine.createSpy('isOwner').and.returnValue(true)
};

const mockVehicles: VehicleInterface[] = [
  { _id: '1', name: 'Ferrari', model: 'F8', plate: 'F123', location: { lat: 41, lng: 2 }, userId: 'JordiTheBest' },
  { _id: '2', name: 'Lamborghini', model: 'Huracan', plate: 'L456', location: { lat: 42, lng: 3 }, userId: 'JordiTheBest' }
];

const mockVehicleModal = {
  openEdit: jasmine.createSpy('openEdit')
};

describe('VehicleTableComponent', () => {
  let component: VehicleTableComponent;
  let fixture: ComponentFixture<VehicleTableComponent>;

  beforeEach(async () => {
    permissionServiceMock.isOwner.calls.reset();
    mockVehicleModal.openEdit.calls.reset();

    await TestBed.configureTestingModule({
      imports: [VehicleTableComponent],
      providers: [
        { provide: Auth, useValue: authMock },
        { provide: AuthorizationService, useValue: permissionServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('inputs', () => {

    it('should accept vehicles input', () => {
      fixture.componentRef.setInput('vehicles', mockVehicles);
      fixture.detectChanges();

      expect(component.vehicles()).toEqual(mockVehicles);
    });

    it('should accept vehicleModal input', () => {
      fixture.componentRef.setInput('vehicleModal', mockVehicleModal);
      fixture.detectChanges();

      expect(component.vehicleModal()).toBe(mockVehicleModal);
    });
  });

  describe('template rendering', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('vehicles', mockVehicles);
      fixture.componentRef.setInput('vehicleModal', mockVehicleModal);
      fixture.detectChanges();
    });

    it('should render the table element', () => {
      const table = fixture.nativeElement.querySelector('table');
      expect(table).toBeTruthy();
    });

    it('should render the table header', () => {
      const thead = fixture.nativeElement.querySelector('thead');
      expect(thead).toBeTruthy();
    });

    it('should render the table body', () => {
      const tbody = fixture.nativeElement.querySelector('tbody');
      expect(tbody).toBeTruthy();
    });

    it('should render one table row per vehicle', () => {
      const rows = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(rows.length).toBe(mockVehicles.length);
    });

    it('should render vehicle name, model and plate in each row', () => {
      const textContent = fixture.nativeElement.textContent;

      expect(textContent).toContain(mockVehicles[0].name);
      expect(textContent).toContain(mockVehicles[0].model);
      expect(textContent).toContain(mockVehicles[0].plate);

      expect(textContent).toContain(mockVehicles[1].name);
      expect(textContent).toContain(mockVehicles[1].model);
      expect(textContent).toContain(mockVehicles[1].plate);
    });

    it('should render edit and delete buttons for owner vehicles', () => {
      const editButtons = fixture.nativeElement.querySelectorAll('app-edit-button');
      const deleteButtons = fixture.nativeElement.querySelectorAll('app-delete-button');

      expect(editButtons.length).toBe(mockVehicles.length);
      expect(deleteButtons.length).toBe(mockVehicles.length);
    });
  });

  describe('actions', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('vehicles', mockVehicles);
      fixture.componentRef.setInput('vehicleModal', mockVehicleModal);
      fixture.detectChanges();
    });

    it('should call vehicleModal.openEdit when edit button emits edit', () => {
      component.vehicleModal().openEdit(mockVehicles[0]);

      expect(mockVehicleModal.openEdit).toHaveBeenCalledWith(mockVehicles[0]);
    });

    it('should emit deleteVehicle when delete button emits delete', () => {
      spyOn(component.deleteVehicle, 'emit');

      component.deleteVehicle.emit(mockVehicles[0]);

      expect(component.deleteVehicle.emit).toHaveBeenCalledWith(mockVehicles[0]);
    });
  });

  describe('@for tracking', () => {
    it('should track rows by vehicle plate', () => {
      fixture.componentRef.setInput('vehicles', mockVehicles);
      fixture.detectChanges();

      const rowsBefore = fixture.nativeElement.querySelectorAll('tbody tr');

      fixture.componentRef.setInput('vehicles', [mockVehicles[1], mockVehicles[0]]);
      fixture.detectChanges();

      const rowsAfter = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(rowsAfter.length).toBe(rowsBefore.length);
    });
  });

});
