import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminComponent} from './admin/admin.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },         // Main dashboard
  { path: 'admin', component: AdminComponent },        // Admin page
  { path: '**', redirectTo: '' } // fallback for unknown routes
];
