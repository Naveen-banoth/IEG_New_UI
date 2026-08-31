import { Component, EventEmitter, Output, inject } from '@angular/core';
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
  public currentProfile = this.localDb.currentUserProfile;
  public lastSyncTime = this.localDb.getLastSyncTime();

  public selectedModules: ModuleCode[] = [];
  public selectedScreens: ScreenCode[] = [];

  constructor() {
    this.selectedModules = [...this.currentProfile.permissions.allowedModules];
    this.selectedScreens = [...this.currentProfile.permissions.allowedScreens];
  }

  closeModal(): void {
    this.close.emit();
  }

  applyRolePreset(roleId: string): void {
    this.localDb.switchRolePreset(roleId);
    this.currentProfile = this.localDb.currentUserProfile;
    this.selectedModules = [...this.currentProfile.permissions.allowedModules];
    this.selectedScreens = [...this.currentProfile.permissions.allowedScreens];
    this.lastSyncTime = this.localDb.getLastSyncTime();
  }

  isModuleSelected(code: ModuleCode): boolean {
    return this.selectedModules.includes(code);
  }

  isScreenSelected(code: ScreenCode): boolean {
    return this.selectedScreens.includes(code);
  }

  toggleModule(code: ModuleCode): void {
    if (this.isModuleSelected(code)) {
      this.selectedModules = this.selectedModules.filter(m => m !== code);
      const targetMod = MODULE_REGISTRY.find(m => m.code === code);
      if (targetMod) {
        const modScreenCodes = targetMod.screens.map(s => s.code);
        this.selectedScreens = this.selectedScreens.filter(s => !modScreenCodes.includes(s));
      }
    } else {
      this.selectedModules.push(code);
      const targetMod = MODULE_REGISTRY.find(m => m.code === code);
      if (targetMod) {
        targetMod.screens.forEach(s => {
          if (!this.selectedScreens.includes(s.code)) {
            this.selectedScreens.push(s.code);
          }
        });
      }
    }
  }

  toggleScreen(code: ScreenCode): void {
    if (this.isScreenSelected(code)) {
      this.selectedScreens = this.selectedScreens.filter(s => s !== code);
    } else {
      this.selectedScreens.push(code);
    }
  }

  getSelectedScreenCount(moduleCode: ModuleCode): number {
    const mod = MODULE_REGISTRY.find(m => m.code === moduleCode);
    if (!mod) return 0;
    return mod.screens.filter(s => this.selectedScreens.includes(s.code)).length;
  }

  savePermissions(): void {
    const config: UserPermissionConfig = {
      allowedModules: this.selectedModules,
      allowedScreens: this.selectedScreens
    };
    this.localDb.updatePermissions(config);
    this.closeModal();
  }

  resetDb(): void {
    this.localDb.resetLocalDb();
    this.currentProfile = this.localDb.currentUserProfile;
    this.selectedModules = [...this.currentProfile.permissions.allowedModules];
    this.selectedScreens = [...this.currentProfile.permissions.allowedScreens];
    this.lastSyncTime = this.localDb.getLastSyncTime();
  }
}
