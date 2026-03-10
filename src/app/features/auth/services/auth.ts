import { computed, inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private auth = inject(Auth);

  private userSignal = signal<User | null>(null);

  readonly user = this.userSignal.asReadonly();
  readonly isLogged = computed(() => !!this.userSignal());

  public readonly authMessages = {
    authType: {
      login: 'Login',
      register: 'Register'
    },
    fieldLabels: {
      email: 'Email *',
      password: 'Password *'
    },
    errorMessages: {
      invalidEmail: 'Please enter a valid email',
      invalidPassword: 'Please enter a password that contains at least 6 characters',
      invalidCredentials: 'This email or password is invalid',
      emailAlreadyExists: 'This email already exists'
    },
    note: 'Fields marked with * are required'
  };
  
  constructor() {
    onAuthStateChanged(this.auth, (user: User | null) => {
      this.userSignal.set(user)
    });
  }

  register(credentials: { email: string, password: string}) {
    return createUserWithEmailAndPassword(
      this.auth, 
      credentials.email, 
      credentials.password
    );
  }

  login(credentials: { email: string, password: string}) {
    return signInWithEmailAndPassword(
      this.auth, 
      credentials.email, 
      credentials.password
    );
  }

  logout() {
    return signOut(this.auth);
  }
}
