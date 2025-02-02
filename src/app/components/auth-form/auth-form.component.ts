import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { AuthInputComponent } from '../auth-input/auth-input.component';

@Component({
  selector: 'app-auth-form',
  imports: [CommonModule, ReactiveFormsModule, AuthInputComponent],
  providers: [ApiService],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly apiService = inject(ApiService);
  private readonly authService = inject(AuthService);

  public readonly form: FormGroup;

  public isLoading = false;
  public error = '';

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
      password: ['', [Validators.required, Validators.maxLength(320)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.apiService.submitForm(this.form.value as User)
      .subscribe({
        next: (data: User) => {
          this.isLoading = false;
          try {
            this.authService.signIn(data);
          } catch(e) {
            this.error = (e as Error).message;
          }
        },
        error: (err: Error) => {
          this.isLoading = false;
          this.error = err.message;
        },
      });
  }
}
