import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PermissionService } from '../services/permission.service';
import { ModuleCode, ScreenCode } from '../models/permissions.model';

export interface RoutePermissionData {
  module?: ModuleCode | string;
  screen?: ScreenCode | string;
}

export const permissionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  const data = route.data as RoutePermissionData;
  const moduleCode = data?.module;
  const screenCode = data?.screen;

  if (moduleCode && !permissionService.hasModuleAccess(moduleCode)) {
    console.warn(`[PermissionGuard] Access denied to module: ${moduleCode} for path: ${state.url}`);
    return router.createUrlTree(['/unauthorized'], {
      queryParams: {
        deniedModule: moduleCode,
        deniedScreen: screenCode || '',
        redirectUrl: state.url
      }
    });
  }

  if (screenCode && !permissionService.hasScreenAccess(screenCode, moduleCode)) {
    console.warn(`[PermissionGuard] Access denied to screen: ${screenCode} in module: ${moduleCode} for path: ${state.url}`);
    return router.createUrlTree(['/unauthorized'], {
      queryParams: {
        deniedModule: moduleCode || '',
        deniedScreen: screenCode,
        redirectUrl: state.url
      }
    });
  }

  return true;
};
