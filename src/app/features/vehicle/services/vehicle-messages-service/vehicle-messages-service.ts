import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VehicleMessagesService {
  
  readonly header = {
    title: 'My Garage',
    actions: {
      create: 'Add Vehicle'
    }
  }

  readonly actions = {
    vehicle: {
      add: 'Add vehicle',
    }
  };

  readonly form = {
    title: {
      create: 'Create Vehicle',
      edit: 'Edit Vehicle'
    },
    fields: {
      name: { label: 'Name *', placeholder: 'Vehicle Name' },
      model: { label: 'Model *', placeholder: 'Vehicle Model' },
      plate: { label: 'Plate *', placeholder: 'Vehicle Plate' },
      imageUrl: { label: 'Image URL', placeholder: 'https://example.com/car.jpg' }
    },
    buttons: {
      create: 'Create',
      update: 'Update',
      cancel: 'Cancel'
    },
    note: 'Fields marked with * are required',
    errors: {
      required: (field: string) => `${field} is required`,
      minLength: (field: string, length: number) => `${field} must be at least ${length} characters`,
      maxLength: (field: string, length: number) => `${field} cannot exceed ${length} characters`,
      invalidUrl: 'Please enter a valid URL'
    },
    aria: {
      nameInput: 'Vehicle Name input field',
      modelInput: 'Vehicle Model input field',
      plateInput: 'Vehicle Plate input field',
      imageUrlInput: 'Vehicle Image URL input field',
      createButton: 'Create vehicle',
      updateButton: 'Update vehicle',
      cancelButton: 'Cancel and close modal'
    }
  };

  readonly users = {
    title: 'Manage Vehicle Users',
    description: 'Manage users assigned to this vehicle. You can remove existing users or add a new one by email.',
    fields: {
      addUser: { label: 'Add User *', placeholder: 'user@example.com' }
    },
    buttons: {
      addUser: 'Add User',
      adding: 'Adding...',
      cancel: 'Cancel'
    },
    status: {
      noUsers: 'No users assigned',
      currentUsers: 'Current Users'
    },
    note: 'Fields marked with * are required',
    errors: {
      emailRequired: 'Email is required',
      invalidEmail: 'Please enter a valid email'
    },
    aria: {
      addUserButton: 'Add user to vehicle',
      removeUser: (email: string) => `Remove user ${email}`,
      cancelButton: 'Cancel and close modal'
    }
  };

  readonly table = {
    captionText: 'Vehicles list',
    headerText: {
      imgText: 'Img',
      nameText: 'Vehicle Name',
      plateText: 'License Plate',
      actionsText: 'Actions'
    }
  };

  readonly selectors = {
    vehicle: {
      label: 'Select Vehicle',
      allVehiclesOption: '-- All Vehicles --'
    }
  };

  readonly confirm = {
    deleteVehicle: {
      title: 'Delete vehicle?',
      message: 'Are you sure you want to delete this vehicle? This action cannot be undone.'
    }
  };

  readonly emptyState = {
    text: 'There are no registered vehicles',
    button: 'Add Your First Vehicle',
    aria: {
      section: 'No vehicles registered'
    }
  };



}