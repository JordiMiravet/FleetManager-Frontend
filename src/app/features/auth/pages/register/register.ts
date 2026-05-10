import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../data-access/auth-service';
import { AuthMessagesService } from '../../i18n/auth-messages';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messagesService = inject(AuthMessagesService);

  readonly formMsg = this.messagesService.form;

  readonly passwordMinLength = 6;
  public errorSubmit: string = '';

  formReg: FormGroup;
  
  constructor() {
    this.formReg = new FormGroup({
      email: new FormControl('', [
        Validators.email, 
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._-]+([a-zA-Z0-9_-]+)*@[a-zA-Z]{3,}\.[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl('',[
        Validators.minLength(this.passwordMinLength),
        Validators.required
      ])
    })
  }

  onSubmit() {
    if (this.formReg.invalid) {
      this.formReg.markAllAsTouched();
      return
    }

    this.authService.register(this.formReg.value)
    .then( response => {
      this.router.navigate([''])
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        this.errorSubmit = this.formMsg.errors.emailAlreadyExists;
      } else {
        this.errorSubmit = this.formMsg.errors.invalidCredentials;
      }
      console.error('Error:', error);
    });
  }

  get formControls(): { email: FormControl; password: FormControl } {
    return this.formReg.controls as { email: FormControl; password: FormControl };
  }

}
