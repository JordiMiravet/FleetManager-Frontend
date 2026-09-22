import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { By } from '@angular/platform-browser';

import { VehicleTableComponent } from './vehicle-table';

import { AuthorizationService } from '../../../../core/services/authorization/authorization-service';
import { VehicleInterface } from '../../models/vehicle';
import { UserButtonComponent } from '../../../../shared/ui/buttons/user-button/user-button';
import { DeleteButtonComponent } from '../../../../shared/ui/buttons/delete-button/delete-button';

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

  const getTable = (): HTMLTableElement => fixture.nativeElement.querySelector('table');
  const getTableHead = (): HTMLTableSectionElement => fixture.nativeElement.querySelector('thead');
  const getTableBody = (): HTMLTableSectionElement => fixture.nativeElement.querySelector('tbody');

  const getHeaders = (): NodeListOf<HTMLTableCellElement> => fixture.nativeElement.querySelectorAll('thead th');
  const getRows = (): NodeListOf<HTMLTableRowElement> => fixture.nativeElement.querySelectorAll('tbody tr');

  const getEditButtons = (): NodeListOf<HTMLElement> => fixture.nativeElement.querySelectorAll('app-edit-button');
  const getDeleteButtons = (): NodeListOf<HTMLElement> => fixture.nativeElement.querySelectorAll('app-delete-button');
  const getUserButtons = (): NodeListOf<HTMLElement> => fixture.nativeElement.querySelectorAll('app-user-button');

  const getImages = (): NodeListOf<HTMLImageElement> => fixture.nativeElement.querySelectorAll('.vehicle-table__image');
  const getNameCells = (): NodeListOf<HTMLElement> => fixture.nativeElement.querySelectorAll('.vehicle-table__cell--name');
  const getPlate = (cell: HTMLElement): HTMLElement | null => cell.querySelector('.vehicle-table__plate');

  const getCaption = (): HTMLTableCaptionElement => fixture.nativeElement.querySelector('caption');

  beforeEach(async () => {
    permissionServiceMock.isOwner.calls.reset();
    mockVehicleModal.openEdit.calls.reset();

    await TestBed.configureTestingModule({
      imports: [ VehicleTableComponent ],
      providers: [
        { provide: Auth, useValue: authMock },
        { provide: AuthorizationService, useValue: permissionServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
      permissionServiceMock.isOwner.and.returnValue(true);
      fixture.componentRef.setInput('vehicles', mockVehicles);
      fixture.componentRef.setInput('vehicleModal', mockVehicleModal);
      fixture.detectChanges();
    });

    it('should render the table element', () => {
      const table = getTable();

      expect(table).toBeTruthy();
    });

    it('should render the table header', () => {
      const thead = getTableHead();

      expect(thead).toBeTruthy();
    });

    it('should render the table body', () => {
      const tbody = getTableBody();

      expect(tbody).toBeTruthy();
    });

    it('should render one table row per vehicle', () => {
      const rows = getRows();

      expect(rows).toHaveSize(mockVehicles.length);
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
      const editButtons = getEditButtons();
      const deleteButtons = getDeleteButtons();

      expect(editButtons).toHaveSize(mockVehicles.length);
      expect(deleteButtons).toHaveSize(mockVehicles.length);
    });

    it('should render user buttons for each vehicle', () => {
      const userButtons = getUserButtons();

      expect(userButtons).toHaveSize(mockVehicles.length);
    });

  });

  describe('actions', () => {

    beforeEach(() => {
      fixture.componentRef.setInput('vehicles', mockVehicles);
      fixture.componentRef.setInput('vehicleModal', mockVehicleModal);
      fixture.detectChanges();
    });

    it('should call vehicleModal.openEdit when edit button emits edit', () => {
      const editButton = fixture.debugElement.query(
        By.css('app-edit-button')
      );

      editButton.triggerEventHandler('edit', mockVehicles[0]);

      expect(mockVehicleModal.openEdit).toHaveBeenCalledWith(mockVehicles[0]);
    });

    it('should emit deleteVehicle when delete button emits delete', () => {
      spyOn(component.deleteVehicle, 'emit');

      const deleteButton = fixture.debugElement.query(
        By.directive(DeleteButtonComponent)
      );

      deleteButton.triggerEventHandler('delete', mockVehicles[0]);

      expect(component.deleteVehicle.emit).toHaveBeenCalledWith(mockVehicles[0]);
    });

    it('should emit addUserToVehicle when user button emits user', () => {
      spyOn(component.addUserToVehicle, 'emit');

      const userButton = fixture.debugElement.query(
        By.directive(UserButtonComponent)
      );

      userButton.triggerEventHandler('user', mockVehicles[0]);

      expect(component.addUserToVehicle.emit).toHaveBeenCalledWith(mockVehicles[0]);
    });

  });

  describe('@for tracking', () => {

    it('should track rows by vehicle plate', () => {
      fixture.componentRef.setInput('vehicles', mockVehicles);
      fixture.detectChanges();

      const rowsBefore = getRows();

      fixture.componentRef.setInput('vehicles', [mockVehicles[1], mockVehicles[0]]);
      fixture.detectChanges();

      const rowsAfter = getRows();

      expect(rowsAfter[0]).toBe(rowsBefore[1]);
      expect(rowsAfter[1]).toBe(rowsBefore[0]);
    });

  });

  describe('isOwner', () => {

    it('should return true when permission service returns true', () => {
      permissionServiceMock.isOwner.and.returnValue(true);

      expect(component.isOwner(mockVehicles[0])).toBeTrue();
      expect(permissionServiceMock.isOwner).toHaveBeenCalledWith(mockVehicles[0]);
    });

    it('should return false when permission service returns false', () => {
      permissionServiceMock.isOwner.and.returnValue(false);

      expect(component.isOwner(mockVehicles[0])).toBeFalse();
    });

    it('should not render edit and delete buttons when user is not owner', () => {
      permissionServiceMock.isOwner.and.returnValue(false);

      fixture.componentRef.setInput('vehicles', mockVehicles);
      fixture.componentRef.setInput('vehicleModal', mockVehicleModal);
      fixture.detectChanges();

      const editButtons = getEditButtons();
      const deleteButtons = getDeleteButtons();

      expect(editButtons).toHaveSize(0);
      expect(deleteButtons).toHaveSize(0);
    });

    it('should render user buttons when user is not owner', () => {
      permissionServiceMock.isOwner.and.returnValue(false);

      fixture.componentRef.setInput('vehicles', mockVehicles);
      fixture.componentRef.setInput('vehicleModal', mockVehicleModal);
      fixture.detectChanges();

      const userButtons = getUserButtons();

      expect(userButtons).toHaveSize(mockVehicles.length);
    });

  });

  describe('addUserToVehicle output', () => {

    it('should emit addUserToVehicle when user button emits user', () => {
      fixture.componentRef.setInput('vehicles', mockVehicles);
      fixture.componentRef.setInput('vehicleModal', mockVehicleModal);
      fixture.detectChanges();

      const emitSpy = spyOn(component.addUserToVehicle, 'emit');

      component.addUserToVehicle.emit(mockVehicles[0]);

      expect(emitSpy).toHaveBeenCalledWith(mockVehicles[0]);
    });

  });

  describe('template: image', () => {

    beforeEach(() => {
      fixture.componentRef.setInput('vehicles', mockVehicles);
      fixture.componentRef.setInput('vehicleModal', mockVehicleModal);
      fixture.detectChanges();
    });

    it('should render vehicle image with correct alt text', () => {
      const images = getImages();

      expect(images[0].getAttribute('alt')).toBe(`Image of ${mockVehicles[0].name}`);
      expect(images[1].getAttribute('alt')).toBe(`Image of ${mockVehicles[1].name}`);
    });

    it('should use fallback image when vehicle has no imageUrl', () => {
      const images = getImages();

      expect(images).toHaveSize(mockVehicles.length);
      expect(images[0].src).toContain(component.vehicleImage);
    });

  });

  describe('accessibility', () => {

    beforeEach(() => {
      fixture.componentRef.setInput('vehicles', mockVehicles);
      fixture.componentRef.setInput('vehicleModal', mockVehicleModal);
      fixture.detectChanges();
    });

    it('should have a caption for the table', () => {
      const caption = getCaption();

      expect(caption).toBeTruthy();
      expect(caption.textContent).toContain(component.tableMsg.captionText);
    });

    it('should have scope col on header cells', () => {
      const headers = getHeaders();

      headers.forEach((th: HTMLElement) => {
        expect(th.getAttribute('scope')).toBe('col');
      });
    });

    it('should have scope row on name cell', () => {
      const nameHeaders = getNameCells();

      nameHeaders.forEach((th: HTMLElement) => {
        expect(th.getAttribute('scope')).toBe('row');
      });
    });

    it('should have aria-hidden on plate span inside name cell', () => {
      const nameCells = getNameCells();

      nameCells.forEach((cell: HTMLElement) => {
        const plateSpan = getPlate(cell);

        expect(plateSpan?.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should render the correct aria-label for each user button', () => {
      const userButtons = getUserButtons();

      expect(userButtons[0].getAttribute('aria-label')).toBe(`Assign driver to ${mockVehicles[0].name}`);
      expect(userButtons[1].getAttribute('aria-label')).toBe(`Assign driver to ${mockVehicles[1].name}`);
    });

    it('should render the correct aria-label for each edit button', () => {
      const editButtons = getEditButtons();

      expect(editButtons[0].getAttribute('aria-label')).toBe(`Edit ${mockVehicles[0].name}`);
      expect(editButtons[1].getAttribute('aria-label')).toBe(`Edit ${mockVehicles[1].name}`);
    });

    it('should render the correct aria-label for each delete button', () => {
      const deleteButtons = getDeleteButtons();

      expect(deleteButtons[0].getAttribute('aria-label')).toBe(`Delete ${mockVehicles[0].name}`);
      expect(deleteButtons[1].getAttribute('aria-label')).toBe(`Delete ${mockVehicles[1].name}`);
    });

  });

});
