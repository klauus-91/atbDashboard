import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminComponent} from './admin/admin.component';
import {MainDashboardComponent} from './main-dashboard/main-dashboard.component';

export const routes: Routes = [
  { path: '', component: MainDashboardComponent },       // Main dashboard
  { path: 'atmLiquidity', component: DashboardComponent },       // Main dashboard
  { path: 'admin', component: AdminComponent },        // Admin page
  { path: '**', redirectTo: '' } // fallback for unknown routes
];
