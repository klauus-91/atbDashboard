import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminComponent} from './admin/admin.component';
import {MainDashboardComponent} from './main-dashboard/main-dashboard.component';
import {LoginComponent} from './auth/login/login.component';
import {PredictionComponent} from './prediction/prediction.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: MainDashboardComponent, canActivate: [authGuard] },       // Main dashboard
  { path: 'atmLiquidity', component: DashboardComponent, canActivate: [authGuard] },       // Main dashboard
  { path: 'prediction', component: PredictionComponent, canActivate: [authGuard] },       // AI Prediction
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] }, // Admin page
  { path: 'login', component: LoginComponent }, // Admin page
  { path: '**', redirectTo: '' } // fallback for unknown routes
];
