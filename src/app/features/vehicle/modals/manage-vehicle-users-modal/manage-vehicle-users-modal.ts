import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';

import { VehicleInterface } from '../../interfaces/vehicle';
import { DeleteButtonComponent } from "../../../../shared/components/buttons/delete-button/delete-button";
import { PermissionService } from '../../../../shared/services/permission/permission';

@Component({
  selector: 'app-manage-vehicle-users-modal',
  imports: [FormsModule, CommonModule, DeleteButtonComponent],
  templateUrl: './manage-vehicle-users-modal.html',
  styleUrl: './manage-vehicle-users-modal.css',
})
export class ManageVehicleUsersModalComponent {

  private auth = inject(Auth);
  private permission = inject(PermissionService)


  vehicle = input.required<VehicleInterface | null>();

  email = signal('');
  loading = signal(false);
  error = signal('');

  submit = output<string>();
  removeUser = output<string>();
  cancel = output<void>();

  isOwner(): boolean {
    return this.permission.isOwner(this.vehicle());
  }

  canRemove(userId: string): boolean {
    return this.permission.canRemove(this.vehicle(), userId);
  }

  onSubmit(): void {
    const emailValue = this.email().trim();

    if (!emailValue) return this.error.set('Email is required');
    if (!this.isValidEmail(emailValue)) return this.error.set('Please enter a valid email');

    this.error.set('');
    this.loading.set(true);
    this.submit.emit(emailValue);
  }
  
  onRemoveUser(userId: string): void {
    this.removeUser.emit(userId);
  }

  setError(message: string): void {
    this.error.set(message);
    this.loading.set(false);
  }

  resetModal(): void {
    this.loading.set(false);
    this.error.set('');
    this.email.set('');
  }

  onCancel(): void {
    this.cancel.emit();
    this.resetModal();
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}