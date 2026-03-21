import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthMessagesService {
  readonly form = {
    title: {
      login: 'Login',
      register: 'Register'
    },
    fields: {
      email: {
        label: 'Email *',
        placeholder: 'Enter your email'
      },
      password: {
        label: 'Password *',
        placeholder: 'Enter your password'
      }
    },
    buttons: {
      login: 'Login',
      register: 'Register'
    },
    switch: {
      toRegister: {
        prompt: "Don't have an account?",
        action: 'Sign up'
      },
      toLogin: {
        prompt: 'Already have an account?',
        action: 'Log in'
      }
    },
    note: 'Fields marked with * are required'
  };

  readonly errors = {
    invalidEmail: 'Please enter a valid email',
    invalidPassword: (length: number) => `Password must be at least ${length} characters`,
    invalidCredentials: 'This email or password is invalid',
    emailAlreadyExists: 'This email already exists'
  };

  readonly aria = {
    buttons: {
      login: 'Press to log in using your email and password',
      register: 'Press to register a new account using your email and password'
    },
    switch: {
      toLogin: 'Navigate to the login page',
      toRegister: 'Navigate to the registration page'
    }
  };

}
