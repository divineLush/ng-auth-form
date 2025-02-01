import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concat, map, Observable, of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-form',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ApiService],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  private isLoading = false;

  private readonly fb = inject(FormBuilder);
  private readonly apiService = inject(ApiService);
  private readonly authService = inject(AuthService);

  public readonly form: FormGroup;
  public readonly submitDisabled$: Observable<boolean>;

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
      password: ['', [Validators.required, Validators.maxLength(320)]],
    });

    this.submitDisabled$ = concat(of(true), this.form.statusChanges
      .pipe(map(status => (status !== 'VALID' || this.isLoading))));
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.apiService.submitForm(this.form.value as User)
      .subscribe({
        next: (data) => {
          this.authService.signIn(data);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
