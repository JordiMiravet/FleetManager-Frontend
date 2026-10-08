import { TestBed } from '@angular/core/testing';

import { VehicleMessagesService } from './vehicle-messages-service';

describe('VehicleMessagesService', () => {
  let service: VehicleMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('header', () => {
    it('should expose the expected messages', () => {
      expect(service.header).toEqual({
        title: 'My Garage',
        actions: {
          create: 'Add Vehicle',
        },
      });
    });
  });

  describe('actions', () => {
    it('should expose the expected vehicle action messages', () => {
      expect(service.actions).toEqual({
        vehicle: {
          add: 'Add vehicle',
        },
      });
    });
  });

  describe('form', () => {
    it('should expose the expected messages', () => {
      expect(service.form.title).toEqual({
        create: 'Create Vehicle',
        edit: 'Edit Vehicle',
      });

      expect(service.form.fields).toEqual({
        name: {
          label: 'Name *',
          placeholder: 'Vehicle Name',
        },
        model: {
          label: 'Model *',
          placeholder: 'Vehicle Model',
        },
        plate: {
          label: 'Plate *',
          placeholder: 'Vehicle Plate',
        },
        imageUrl: {
          label: 'Image URL',
          placeholder: 'https://example.com/car.jpg',
        },
      });

      expect(service.form.buttons).toEqual({
        create: 'Create',
        update: 'Update',
        cancel: 'Cancel',
      });

      expect(service.form.note).toBe(
        'Fields marked with * are required',
      );
    });

    describe('errors', () => {
      it('should expose the expected error messages', () => {
        expect(service.form.errors.required('Name')).toBe(
          'Name is required',
        );

        expect(service.form.errors.minLength('Name', 3)).toBe(
          'Name must be at least 3 characters',
        );

        expect(service.form.errors.maxLength('Name', 50)).toBe(
          'Name cannot exceed 50 characters',
        );

        expect(service.form.errors.invalidUrl).toBe(
          'Please enter a valid URL',
        );
      });
    });

    describe('aria', () => {
      it('should expose the expected accessibility messages', () => {
        expect(service.form.aria).toEqual({
          nameInput: 'Vehicle Name input field',
          modelInput: 'Vehicle Model input field',
          plateInput: 'Vehicle Plate input field',
          imageUrlInput: 'Vehicle Image URL input field',
          createButton: 'Create vehicle',
          updateButton: 'Update vehicle',
          cancelButton: 'Cancel and close modal',
        });
      });
    });
  });

});
