import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { SuperAdminAuthService } from './TestServices';
import { serviceConstants } from './constants/service.constants';

export function initializeAppPreSetup(superAdminAuth: SuperAdminAuthService) {
  return async () => {
    let orgCode = '';
    if (typeof window !== 'undefined' && window.location) {
      const path = window.location.pathname || '';
      const segments = path.split('/').filter(Boolean);
      if (segments.length >= 2 && segments[1] === 'login' && segments[0] !== 'login') {
        orgCode = segments[0];
      } else if (segments.length === 1 && segments[0] !== 'login' && !['ist', 'eap', 'grants', 'administration', 'home', 'unauthorized', 'test-services'].includes(segments[0])) {
        orgCode = segments[0];
      }

      if (!orgCode && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        orgCode = params.get('orgCode') || params.get('code') || '';
      }

      if (!orgCode) {
        orgCode = localStorage.getItem('orgCode') || sessionStorage.getItem('orgCode') || '';
      }

      // Default orgCode for organization/internal users if not in pure superadmin path
      if (!orgCode) {
        orgCode = 'scimax';
      }
    }

    try {
      const response: any = await firstValueFrom(superAdminAuth.getConfigData(orgCode || 'scimax'));
      if (response && (response.Data || response.Themes)) {
        const configData = response.Data || response;
        if (configData.apiURL) serviceConstants.apiURL = configData.apiURL;
        if (configData.baseUrl) serviceConstants.baseUrl = configData.baseUrl;
        const themes = configData.Themes || response.Themes;
        if (themes) {
          superAdminAuth.applyTheme(themes);
        }
      }
    } catch (err) {
      console.warn('Config initialization fallback:', err);
    }

    try {
      await firstValueFrom(superAdminAuth.negotiateHub(1));
    } catch (hubErr) {
      console.warn('SignalR Hub negotiation fallback:', hubErr);
    }

    return true;
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor, loggingInterceptor])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppPreSetup,
      deps: [SuperAdminAuthService],
      multi: true
    }
  ]
};
