import { Component, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-auth-input',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AuthInputComponent,
    },
  ],
  templateUrl: './auth-input.component.html',
  styleUrl: './auth-input.component.css'
})
export class AuthInputComponent {
  label = input.required<string>();
  id = input.required<string>();
  type = input.required<string>();
  readonly = input.required<boolean>();

  value!: string;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
    this.onTouched();
  }
}
