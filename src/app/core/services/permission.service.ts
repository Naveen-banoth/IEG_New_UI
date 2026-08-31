import { Injectable, signal, inject } from '@angular/core';
import { LocalDbService } from './local-db.service';
import { MODULE_REGISTRY, ModuleCode, ModulePermission, ScreenCode } from '../models/permissions.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private localDb = inject(LocalDbService);
  private permissionsSignal = signal(this.localDb.currentUserProfile.permissions);

  constructor() {
    this.localDb.userProfile$.subscribe(profile => {
      this.permissionsSignal.set(profile.permissions);
    });
  }

  public hasModuleAccess(moduleCode: ModuleCode | string): boolean {
    const perm = this.permissionsSignal();
    if (!perm || !perm.allowedModules) return false;
    return perm.allowedModules.includes(moduleCode as ModuleCode);
  }

  public hasScreenAccess(screenCode: ScreenCode | string, moduleCode?: ModuleCode | string): boolean {
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
