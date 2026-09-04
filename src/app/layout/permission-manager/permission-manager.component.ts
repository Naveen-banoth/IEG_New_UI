import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalDbService, PREDEFINED_ROLES, PredefinedRole } from '../../core/services/local-db.service';
import { MODULE_REGISTRY, ModuleCode, ScreenCode, UserPermissionConfig } from '../../core/models/permissions.model';

@Component({
  selector: 'app-permission-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permission-manager.component.html',
  styleUrl: './permission-manager.component.css'
})
export class PermissionManagerComponent {
  @Output() close = new EventEmitter<void>();

  private localDb = inject(LocalDbService);
  public predefinedRoles: PredefinedRole[] = PREDEFINED_ROLES;
  public moduleRegistry = MODULE_REGISTRY;
  
  public currentProfile = signal(this.localDb.currentUserProfile);
  public lastSyncTime = signal<string>(this.localDb.getLastSyncTime());

  public selectedModules = signal<ModuleCode[]>([...this.localDb.currentUserProfile.permissions.allowedModules]);
  public selectedScreens = signal<ScreenCode[]>([...this.localDb.currentUserProfile.permissions.allowedScreens]);

  closeModal(): void {
    this.close.emit();
  }

  applyRolePreset(roleId: string): void {
    this.localDb.switchRolePreset(roleId);
    const updatedProfile = this.localDb.currentUserProfile;
    this.currentProfile.set(updatedProfile);
    this.selectedModules.set([...updatedProfile.permissions.allowedModules]);
    this.selectedScreens.set([...updatedProfile.permissions.allowedScreens]);
    this.lastSyncTime.set(this.localDb.getLastSyncTime());
  }

  isModuleSelected(code: ModuleCode): boolean {
    return this.selectedModules().includes(code);
  }

  isScreenSelected(code: ScreenCode): boolean {
    return this.selectedScreens().includes(code);
  }

  toggleModule(code: ModuleCode): void {
    if (this.isModuleSelected(code)) {
      this.selectedModules.update(list => list.filter(m => m !== code));
      const targetMod = MODULE_REGISTRY.find(m => m.code === code);
      if (targetMod) {
        const modScreenCodes = targetMod.screens.map(s => s.code);
        this.selectedScreens.update(list => list.filter(s => !modScreenCodes.includes(s)));
      }
    } else {
      this.selectedModules.update(list => [...list, code]);
      const targetMod = MODULE_REGISTRY.find(m => m.code === code);
      if (targetMod) {
        const screensToAdd = targetMod.screens.map(s => s.code).filter(s => !this.selectedScreens().includes(s));
        this.selectedScreens.update(list => [...list, ...screensToAdd]);
      }
    }
  }

  toggleScreen(code: ScreenCode): void {
    if (this.isScreenSelected(code)) {
      this.selectedScreens.update(list => list.filter(s => s !== code));
    } else {
      this.selectedScreens.update(list => [...list, code]);
    }
  }

  getSelectedScreenCount(moduleCode: ModuleCode): number {
    const mod = MODULE_REGISTRY.find(m => m.code === moduleCode);
    if (!mod) return 0;
    const currentScreens = this.selectedScreens();
    return mod.screens.filter(s => currentScreens.includes(s.code)).length;
  }

  savePermissions(): void {
    const config: UserPermissionConfig = {
      allowedModules: this.selectedModules(),
      allowedScreens: this.selectedScreens()
    };
    this.localDb.updatePermissions(config);
    this.closeModal();
  }

  resetDb(): void {
    this.localDb.resetLocalDb();
    const defaultProfile = this.localDb.currentUserProfile;
    this.currentProfile.set(defaultProfile);
    this.selectedModules.set([...defaultProfile.permissions.allowedModules]);
    this.selectedScreens.set([...defaultProfile.permissions.allowedScreens]);
    this.lastSyncTime.set(this.localDb.getLastSyncTime());
  }
}
