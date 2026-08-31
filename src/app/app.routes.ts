import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { UnauthorizedComponent } from './layout/unauthorized/unauthorized.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard, authChildGuard, loginGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: ':code/login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    children: [
      {
        path: 'ist',
        loadChildren: () => import('./features/ist/ist.routes').then(m => m.IST_ROUTES)
      },
      {
        path: 'eap',
        loadChildren: () => import('./features/eap/eap.routes').then(m => m.EAP_ROUTES)
      },
      {
        path: 'grants',
        loadChildren: () => import('./features/grants/grants.routes').then(m => m.GRANTS_ROUTES)
      },
      {
        path: 'administration',
        loadChildren: () => import('./features/administration/administration.routes').then(m => m.ADMINISTRATION_ROUTES)
      },
      {
        path: 'internal/administration',
        loadChildren: () => import('./features/administration/administration.routes').then(m => m.ADMINISTRATION_ROUTES)
      },
      {
        path: 'internal/dashboard/ist',
        redirectTo: 'ist'
      },
      {
        path: 'internal/dashboard/eap',
        redirectTo: 'eap'
      },
      {
        path: 'internal/dashboard/grants',
        redirectTo: 'grants'
      },
      {
        path: 'internal/dashboard',
        redirectTo: 'ist'
      },
      {
        path: 'test-services',
        loadComponent: () => import('./features/test-services/test-services-navigation/test-services-navigation.component').then(m => m.TestServicesNavigationComponent)
      },
      {
        path: 'test-services/superadmin',
        loadComponent: () => import('./features/test-services/test-services.component').then(m => m.TestServicesComponent)
      },
      {
        path: 'test-services/administration',
        loadComponent: () => import('./features/test-services/test-services.component').then(m => m.TestServicesComponent)
      },
      {
        path: 'test-services/common',
        loadComponent: () => import('./features/test-services/test-services.component').then(m => m.TestServicesComponent)
      },
      {
        path: 'test-services/eap',
        loadComponent: () => import('./features/test-services/test-services.component').then(m => m.TestServicesComponent)
      },
      {
        path: 'test-services/ist',
        loadComponent: () => import('./features/test-services/test-services.component').then(m => m.TestServicesComponent)
      },
      {
        path: 'test-services/grants',
        loadComponent: () => import('./features/test-services/test-services.component').then(m => m.TestServicesComponent)
      },
      {
        path: 'test-services/um',
        loadComponent: () => import('./features/test-services/test-services.component').then(m => m.TestServicesComponent)
      },
      {
        path: 'internal/test-services',
        redirectTo: 'test-services'
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
