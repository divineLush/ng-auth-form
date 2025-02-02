import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { AppRoutes } from '../enums/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isSignedIn = false;
  private readonly router = inject(Router);

  private isUserValid(value: User) {
    const isValid = (v: unknown) => typeof v === 'string' && v.length > 0;
    const { email, password } = value;

    return isValid(email) && isValid(password);
  }

  get isSignedIn() {
    return this._isSignedIn;
  }

  signIn(value: User) {
    if (this.isUserValid(value)) {
      this._isSignedIn = true;
      this.router.navigate([AppRoutes.PROTECTED]);
      console.log(`LOGGED IN AS ${value.email}`);
    } else {
      throw new Error('Invalid credentia s');
    }
  }
}
