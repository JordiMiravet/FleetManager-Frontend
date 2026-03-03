import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-vehicle-users-modal',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './manage-vehicle-users-modal.html',
  styleUrl: './manage-vehicle-users-modal.css',
})
export class ManageVehicleUsersModalComponent {
  email = signal('');
  loading = signal(false);
  error = signal('');

  submit = output<string>();
  cancel = output<void>();

  onSubmit() {
    const emailValue = this.email().trim();

    if (!emailValue) return this.error.set('Email is required');
    if (!this.isValidEmail(emailValue)) return this.error.set('Please enter a valid email');

    this.error.set('');
    this.loading.set(true);

    this.submit.emit(emailValue);
  }

  setError(message: string) {
    this.error.set(message);
    this.loading.set(false);
  }

  resetModal() {
    this.loading.set(false);
    this.error.set('');
    this.email.set('');
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onCancel() {
    this.cancel.emit();
    this.resetModal();
  }
}