import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthFormData } from '../../interfaces/form-data';
import { concat, map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

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
    this.apiService.submitForm(this.form.value as AuthFormData)
      .subscribe({
        next: (data) => {
          console.log(data);
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
