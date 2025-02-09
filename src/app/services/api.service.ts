import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import { map, Observable, throwError, timeout, timer } from "rxjs";

@Injectable()
export class ApiService {
  private readonly apiTimeout = 10000;

  private checkConnection() {
    if (!navigator.onLine) {
      throw new Error('Please check your internet connection and try again')
    }
  }

  private hasError() {
    return Boolean(Math.random() < 0.5);
  }

  private getTimeout() {
    return Math.floor(Math.random() * 27000) + 3000;
  }

  submitForm(data: User): Observable<User> {
    try {
      this.checkConnection();
    } catch(e) {
      return throwError(() => e);
    }

    return timer(this.getTimeout()).pipe(
      timeout({
        each: this.apiTimeout,
        with: () => throwError(() => new Error('Your request has timed out')),
      }),
      map(() => {
        if (this.hasError()) {
          throw new Error('Please check your email and password and try again');
        }

        return data;
      }));
  }
}
