import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import { map, Observable, throwError, timer } from "rxjs";

@Injectable()
export class ApiService {
  private checkConnection() {
    if (!navigator.onLine) {
      throw new Error('Please check your internet connection and try again.')
    }
  }

  private hasError() {
    return Boolean(Math.random() < 0.5);
  }

  submitForm(data: User): Observable<User> {
    try {
      this.checkConnection();
    } catch(e) {
      return throwError(() => e);
    }

    return timer(3000).pipe(
      map(() => {
        if (this.hasError()) {
          throw new Error('Please check your email and password and try again.');
        }

        return data;
      }));
  }
}
