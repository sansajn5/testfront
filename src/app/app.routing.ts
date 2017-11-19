import { Routes , RouterModule} from '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './authentication/Login/login.component';
import { SignUpComponent } from './authentication/Registration/sign-up.component';
import { ConfirmComponent } from './authentication/Confirm/confirm.component';

export const routes : Routes = [
  { path: '', canActivate: [AuthGuard], redirectTo: 'pages', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'verification/:id', component: ConfirmComponent},
  { path: '**', redirectTo: 'pages/dashboard' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
