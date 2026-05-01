import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../data-access/auth-service';
import { AuthMessagesService } from '../../i18n/auth-messages-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    ReactiveFormsModule, 
    RouterModule 
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class LoginComponent {
  
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messagesService = inject(AuthMessagesService);

  readonly formMsg = this.messagesService.form;

  readonly passwordMinLength = 6;
  public errorSubmit: string = '';

  formLogin: FormGroup;

  constructor() {
    this.formLogin = new FormGroup({
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
    if(this.formLogin.invalid) {
      this.formLogin.markAllAsTouched(); 
      return;
    }
    
    this.authService.login(this.formLogin.value)
    .then( response => {
      this.router.navigate([''])
    })
    .catch(error => {
      this.errorSubmit = this.formMsg.errors.invalidCredentials
      console.error('Error:', error)
    });
  }

  get formControls(): { email: FormControl; password: FormControl } {
    return this.formLogin.controls as { email: FormControl; password: FormControl };
  }
}
