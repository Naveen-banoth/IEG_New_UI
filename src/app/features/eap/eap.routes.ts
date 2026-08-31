import { Routes } from '@angular/router';
import { ModuleCode, ScreenCode } from '../../core/models/permissions.model';
import { permissionGuard } from '../../core/guards/permission.guard';

export const EAP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./eap-dashboard.component').then(m => m.EapDashboardComponent),
    canActivate: [permissionGuard],
    data: {
      module: ModuleCode.EAP,
      screen: ScreenCode.EAP_DASHBOARD
    }
  },
  {
    path: 'applications',
    loadComponent: () => import('./eap-applications.component').then(m => m.EapApplicationsComponent),
    canActivate: [permissionGuard],
    data: {
      module: ModuleCode.EAP,
      screen: ScreenCode.EAP_APPLICATIONS
    }
  },
  {
    path: 'approvals',
    loadComponent: () => import('./eap-approvals.component').then(m => m.EapApprovalsComponent),
    canActivate: [permissionGuard],
    data: {
      module: ModuleCode.EAP,
      screen: ScreenCode.EAP_APPROVALS
    }
  }
];
