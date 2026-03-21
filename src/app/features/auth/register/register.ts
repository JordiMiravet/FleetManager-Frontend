import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../services/auth-service/auth-service';
import { AuthMessagesService } from '../services/auth-messages-service/auth-messages-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class RegisterComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  private messagesService = inject(AuthMessagesService);

  readonly formMsg = this.messagesService.form;
  readonly errorMsg = this.messagesService.errors;
  readonly ariaMsg = this.messagesService.aria;

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
        this.errorSubmit = this.errorMsg.emailAlreadyExists;
      } else {
        this.errorSubmit = this.errorMsg.invalidCredentials;
      }
      console.error('Error:', error);
    });
  }

  get formControls(): { email: FormControl; password: FormControl } {
    return this.formReg.controls as { email: FormControl; password: FormControl };
  }

}
