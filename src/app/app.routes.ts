import { Routes } from '@angular/router';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthFormComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
