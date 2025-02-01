import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import { map, of, timer } from "rxjs";

@Injectable()
export class ApiService {
  private checkConnection() {
    return of(!navigator.onLine)
      .pipe(map(isOffline => {
        if (isOffline) {
          throw new Error('Oops! Connection Error')
        }
      }));
  }

  private hasError() {
    return Boolean(Math.random() < 0.5);
  }

  submitForm(data: User) {
    return this.checkConnection().pipe(
      map(() => timer(2000)),
      map(() => {
        if (this.hasError()) {
          throw new Error('Oops! Something went wrong with your login');
        }

        return data;
      }));
  }
}
