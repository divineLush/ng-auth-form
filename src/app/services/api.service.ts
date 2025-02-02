import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import { map, Observable, throwError, timer } from "rxjs";

@Injectable()
export class ApiService {
  private checkConnection() {
    if (!navigator.onLine) {
      throw new Error('Oops! Connection Error')
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
          throw new Error('Oops! Something went wrong with your login');
        }

        return data;
      }));
  }
}
