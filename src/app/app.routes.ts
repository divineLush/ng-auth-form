import { Routes } from '@angular/router';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuard } from './services/auth.guard';
import { AppRoutes } from './enums/routes.enum';

export const routes: Routes = [
  {
    path: AppRoutes.BASE,
    component: AuthFormComponent,
  },
  {
    path: AppRoutes.PROTECTED,
    component: ProtectedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  }
];
