import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token =
    localStorage.getItem('token') ||
    sessionStorage.getItem('token') ||
    localStorage.getItem('_auth_') ||
    sessionStorage.getItem('_auth_') ||
    localStorage.getItem('jwt_token') ||
    sessionStorage.getItem('jwt_token') ||
    authService.getToken() ||
    '';
  const currentUser = authService.currentUser;

  const headers: Record<string, string> = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['token'] = token;
    headers['Token'] = token;
    headers['x-access-token'] = token;
  }

  if (currentUser) {
    if (currentUser.role) {
      headers['X-User-Role'] = currentUser.role;
    }
    if (currentUser.permissions?.allowedModules?.length) {
      headers['X-Allowed-Modules'] = currentUser.permissions.allowedModules.join(',');
    }
    if (currentUser.permissions?.allowedScreens?.length) {
      headers['X-Allowed-Screens'] = currentUser.permissions.allowedScreens.join(',');
    }
  }

  const authReq = req.clone({
    setHeaders: headers,
    withCredentials: true
  });

  return next(authReq);
};
