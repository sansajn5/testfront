import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import {AuthGuard} from '../auth.guard';
import {DashboardComponent} from './Dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'pages', component: PagesComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
