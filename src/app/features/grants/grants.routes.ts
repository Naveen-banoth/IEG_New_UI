import { Routes } from '@angular/router';
import { ModuleCode, ScreenCode } from '../../core/models/permissions.model';
import { permissionGuard } from '../../core/guards/permission.guard';

export const GRANTS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./grants-dashboard.component').then(m => m.GrantsDashboardComponent),
    canActivate: [permissionGuard],
    data: {
      module: ModuleCode.GRANTS,
      screen: ScreenCode.GRANTS_DASHBOARD
    }
  },
  {
    path: 'allocation',
    loadComponent: () => import('./grants-allocation.component').then(m => m.GrantsAllocationComponent),
    canActivate: [permissionGuard],
    data: {
      module: ModuleCode.GRANTS,
      screen: ScreenCode.GRANTS_ALLOCATION
    }
  },
  {
    path: 'disbursements',
    loadComponent: () => import('./grants-disbursements.component').then(m => m.GrantsDisbursementsComponent),
    canActivate: [permissionGuard],
    data: {
      module: ModuleCode.GRANTS,
      screen: ScreenCode.GRANTS_DISBURSEMENTS
    }
  }
];
