import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleInterface } from '../../interfaces/vehicle';
import { VehicleMessagesService } from '../../services/vehicle-messages-service/vehicle-messages-service';

@Component({
  selector: 'app-vehicle-form-modal',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './vehicle-form-modal.html',
  styleUrls: ['./vehicle-form-modal.css'],
})
export class VehicleFormModalComponent {

  private msg = inject(VehicleMessagesService);
  
  public readonly formMsg = this.msg.form;
  public readonly errorMsg = this.msg.errors;
  public readonly ariaMsg = this.msg.aria.form;

  mode = input<'create' | 'edit'>('create');
  vehicle = input<VehicleInterface | null>(null);

  submit = output<VehicleInterface>();
  cancel = output<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(30)
      ]],
      model: ['', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(30)
      ]],
      plate: ['', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(10)
      ]],
    });
  }

  ngOnChanges() {
    const vehicle = this.vehicle();
    const mode = this.mode();

    if (mode === 'edit' && vehicle) {
      this.form.patchValue({
        name: vehicle.name,
        model: vehicle.model,
        plate: vehicle.plate
      });
    } else {
      this.form.reset();
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submit.emit({ ...this.form.value });
  }

  onCancel() {
    this.cancel.emit();
  }

  getFieldError(field: string): string | null {
    const control = this.form.get(field);
    if (!control || !control.touched || control.valid) return null;

    const fieldName = this.capitalize(field);

    if (control.errors?.['required']) return this.errorMsg.required(fieldName);
    if (control.errors?.['minlength']) return this.errorMsg.minLength(fieldName, control.errors['minlength'].requiredLength);
    if (control.errors?.['maxlength']) return this.errorMsg.maxLength(fieldName, control.errors['maxlength'].requiredLength);

    return null;
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}