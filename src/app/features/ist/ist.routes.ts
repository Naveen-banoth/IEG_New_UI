import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';

export const IST_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./ist-dashboard.component').then(m => m.IstDashboardComponent),
    canActivate: [permissionGuard],
    data: { module: 'IST', screen: 'ist-dashboard' }
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./application-detail.component').then(m => m.ApplicationDetailComponent),
    canActivate: [permissionGuard],
    data: { module: 'IST', screen: 'ist-projects' },
    children: [
      {
        path: '',
        redirectTo: 'study-team',
        pathMatch: 'full'
      },
      {
        path: 'general',
        loadComponent: () => import('./detail-steps/general-info.component').then(m => m.GeneralInfoComponent)
      },
      {
        path: 'study-team',
        loadComponent: () => import('./detail-steps/study-team.component').then(m => m.StudyTeamComponent)
      },
      {
        path: 'org-setup',
        loadComponent: () => import('./detail-steps/org-setup.component').then(m => m.OrgSetupComponent)
      },
      {
        path: 'irb',
        loadComponent: () => import('./detail-steps/irb.component').then(m => m.IrbComponent)
      },
      {
        path: 'concept-proposal',
        loadComponent: () => import('./detail-steps/concept-proposal.component').then(m => m.ConceptProposalComponent)
      }
    ]
  },
  {
    path: 'projects',
    loadComponent: () => import('./ist-projects.component').then(m => m.IstProjectsComponent),
    canActivate: [permissionGuard],
    data: { module: 'IST', screen: 'ist-projects' }
  },
  {
    path: 'reports',
    loadComponent: () => import('./ist-reports.component').then(m => m.IstReportsComponent),
    canActivate: [permissionGuard],
    data: { module: 'IST', screen: 'ist-reports' }
  }
];
