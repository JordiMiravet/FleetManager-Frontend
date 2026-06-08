import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Auth, UserCredential } from '@angular/fire/auth';
import { provideRouter, Router } from '@angular/router';

import { RegisterComponent } from './register';
import { AuthService } from '../../data-access/auth-service';

const mockAuth = {
  signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(Promise.resolve('usuario logueado')),
  onAuthStateChanged: () => {}
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let registerSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
      ],
      providers: [
        provideRouter([]),
        AuthService,
        { provide: Auth, useValue: mockAuth },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService);
    registerSpy = spyOn(authService, 'register').and.callThrough();

    fixture.detectChanges();
  });

  describe('Component creation', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

  });

  describe('Form initialization', () => {

    it('should initialize the register form', () => {
      expect(component.formReg).toBeTruthy();

      expect(component.formReg.get('email')).toBeTruthy();
      expect(component.formReg.get('password')).toBeTruthy();
    });

  });

  describe('Form validation', () => {

    it('should mark email as invalid when format is incorrect', () => {
      const emailControl = component.formReg.get('email');

      emailControl?.setValue('Hello');

      expect(emailControl?.invalid).toBeTruthy();
      expect(emailControl?.errors?.['email']).toBeTrue();
    });

    it('should mark email as invalid when pattern does not match', () => {
      const emailControl = component.formReg.get('email');

      emailControl?.setValue('jordi@gm.co');

      expect(emailControl?.invalid).toBeTrue();
      expect(emailControl?.errors?.['pattern']).toBeTruthy();
      expect(emailControl?.errors?.['email']).toBeUndefined();
    });

    it('should mark password as invalid when shorter than 6 characters', () => {
      const passwordControl = component.formReg.get('password');

      passwordControl?.setValue('12345');

      expect(passwordControl?.invalid).toBeTrue();
      expect(passwordControl?.errors).toBeTruthy();
      expect(passwordControl?.errors?.['minlength']).toBeTruthy();
    });

    it('should mark the form as invalid when empty', () => {
      component.formReg.get('email')?.setValue('');
      component.formReg.get('password')?.setValue('');

      expect(component.formReg.valid).toBeFalse();
    });

  });

  describe('Template rendering', () => {

    it('should enable submit button when form is valid', () => {
      const button = fixture.nativeElement.querySelector('button');

      component.formReg.get('email')?.setValue('itacademy@gmail.com');
      component.formReg.get('password')?.setValue('123456');
      fixture.detectChanges();

      expect(button.disabled).toBeFalse();
    });

    it('should show email error message when email is invalid and touched', () => {
      const emailControl = component.formReg.get('email');
      const errorMessageElement : HTMLElement = fixture.nativeElement.querySelector('#register-email-error');

      emailControl?.setValue('invalid-email');
      emailControl?.markAsTouched();
      fixture.detectChanges();

      expect(emailControl?.invalid).toBeTrue();
      expect(emailControl?.touched).toBeTrue();
      expect(errorMessageElement.hidden).toBeFalse();
      expect(errorMessageElement.textContent).toContain(component.formMsg.errors.invalidEmail);
    });

    it('should show password error message when password is invalid and touched', () => {
      const passwordControl = component.formReg.get('password');
      const errorMessageElement : HTMLElement = fixture.nativeElement.querySelector('#register-password-error');

      passwordControl?.setValue('12345');
      passwordControl?.markAsTouched();
      fixture.detectChanges();

      expect(passwordControl?.invalid).toBeTrue();
      expect(passwordControl?.touched).toBeTrue();
      expect(errorMessageElement.hidden).toBeFalse();
      expect(errorMessageElement.textContent).toContain(component.formMsg.errors.invalidPassword(component.passwordMinLength));
    });

    it('should not show error messages when inputs are valid', () => {
      const emailControl = component.formReg.get('email');
      const passwordControl = component.formReg.get('password');
      
      emailControl?.setValue('itacademy@gmail.com');
      passwordControl?.setValue('123456');

      emailControl?.markAsTouched();
      passwordControl?.markAsTouched();

      fixture.detectChanges();

      const emailErrorElement: HTMLElement = fixture.nativeElement.querySelector('#register-email-error');
      const passwordErrorElement: HTMLElement = fixture.nativeElement.querySelector('#register-password-error');

      expect(emailErrorElement.hidden).toBeTrue();
      expect(passwordErrorElement.hidden).toBeTrue();
    });

    it('should display submit error message when register fails', () => {
      component.errorSubmit = 'This email or password is invalid';
      fixture.detectChanges();

      const errorElement: HTMLElement = fixture.nativeElement.querySelector('.form__error--submit');

      expect(errorElement).toBeTruthy();
      expect(errorElement.textContent).toContain('This email or password is invalid');
    });

  });

  describe('Interactions', () => {

    it('should call authService.register when form is valid', () => {
      component.formReg.get('email')?.setValue('gohan@gmail.com');
      component.formReg.get('password')?.setValue('123456');

      expect(component.formReg.valid).toBeTrue();

      component.onSubmit();
      expect(registerSpy).toHaveBeenCalledWith({
        email: 'gohan@gmail.com',
        password: '123456'
      });
    });

    it('should navigate to home on successful register', async () => {
      const router = TestBed.inject(Router);
      const navigateSpy = spyOn(router, 'navigate');

      component.formReg.get('email')?.setValue('itacademy@gmail.com');
      component.formReg.get('password')?.setValue('123456');

      const mockUserCredential = {} as UserCredential;
      registerSpy.and.returnValue(Promise.resolve(mockUserCredential));

      await component.onSubmit();

      expect(navigateSpy).toHaveBeenCalledWith(['']);
    });

    it('should mark all fields as touched when form is invalid', () => {
      spyOn(component.formReg, 'markAllAsTouched');

      component.formReg.get('email')?.setValue('');
      component.onSubmit();

      expect(component.formReg.markAllAsTouched).toHaveBeenCalled();
    });

    it('should not fail when form is invalid', () => {
      component.formReg.get('email')?.setValue('');
      component.formReg.get('password')?.setValue('');

      expect(component.formReg.invalid).toBeTrue();
      component.onSubmit();
    });

    it('should set errorSubmit to emailAlreadyExists when email is already in use', fakeAsync(() => {
      registerSpy.and.returnValue(Promise.reject({ code: 'auth/email-already-in-use' }));

      component.formReg.get('email')?.setValue('gohan@gmail.com');
      component.formReg.get('password')?.setValue('123456');

      component.onSubmit();
      tick();

      expect(component.errorSubmit).toBe(component.formMsg.errors.emailAlreadyExists);
    }));

    it('should set errorSubmit to invalidCredentials when register fails with unknown error', fakeAsync(() => {
      registerSpy.and.returnValue(Promise.reject({ code: 'auth/unknown-error' }));

      component.formReg.get('email')?.setValue('gohan@gmail.com');
      component.formReg.get('password')?.setValue('123456');

      component.onSubmit();
      tick();

      expect(component.errorSubmit).toBe(component.formMsg.errors.invalidCredentials);
    }));

  });

});
