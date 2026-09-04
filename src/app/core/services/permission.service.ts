import { Injectable, signal, inject } from '@angular/core';
import { LocalDbService } from './local-db.service';
import { MODULE_REGISTRY, ModuleCode, ModulePermission, ScreenCode } from '../models/permissions.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private localDb = inject(LocalDbService);
  private authService = inject(AuthService);
  private permissionsSignal = signal(this.localDb.currentUserProfile.permissions);

  constructor() {
    this.localDb.userProfile$.subscribe(profile => {
      this.permissionsSignal.set(profile.permissions);
    });
  }

  public hasModuleAccess(moduleCode: ModuleCode | string): boolean {
    if (this.authService.isAuthenticated() || localStorage.getItem('_auth_') || sessionStorage.getItem('token')) {
      const user = this.authService.getUserDetails();
      const userType = localStorage.getItem('userType') || user?.USER_TYPE || user?.ROLE_TYPE;
      // All authenticated internal, external, and admin users have access to modules
      if (userType === 'I' || userType === 'A' || userType === 'E' || userType === 'S' || userType === 'SUPER_ADMIN') {
        return true;
      }
    }
    const perm = this.permissionsSignal();
    if (!perm || !perm.allowedModules) return false;
    return perm.allowedModules.includes(moduleCode as ModuleCode);
  }

  public hasScreenAccess(screenCode: ScreenCode | string, moduleCode?: ModuleCode | string): boolean {
    if (this.authService.isAuthenticated() || localStorage.getItem('_auth_') || sessionStorage.getItem('token')) {
      return true;
    }
    const perm = this.permissionsSignal();
    if (!perm || !perm.allowedScreens) return false;
    
    if (moduleCode && !this.hasModuleAccess(moduleCode)) {
      return false;
    }

    return perm.allowedScreens.includes(screenCode as ScreenCode);
  }

  public getAuthorizedMenu(): ModulePermission[] {
    const perm = this.permissionsSignal();
    if (!perm) return [];

    return MODULE_REGISTRY
      .filter(mod => perm.allowedModules.includes(mod.code))
      .map(mod => {
        const allowedScreens = mod.screens.filter(scr => perm.allowedScreens.includes(scr.code));
        return {
          ...mod,
          screens: allowedScreens
        };
      })
      .filter(mod => mod.screens.length > 0);
  }

  public getFirstAuthorizedRoute(): string {
    const menu = this.getAuthorizedMenu();
    if (menu.length > 0 && menu[0].screens.length > 0) {
      return menu[0].screens[0].route;
    }
    return '/unauthorized';
  }
}
