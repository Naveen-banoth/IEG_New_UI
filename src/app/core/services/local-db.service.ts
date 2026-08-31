import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModuleCode, ScreenCode, UserProfile, UserPermissionConfig } from '../models/permissions.model';

export interface PredefinedRole {
  id: string;
  roleName: string;
  description: string;
  permissions: UserPermissionConfig;
}

const STORAGE_KEY_USER_PROFILE = 'app_user_profile';
const STORAGE_KEY_DB_STAMP = 'app_db_last_sync';

export const PREDEFINED_ROLES: PredefinedRole[] = [
  {
    id: 'super-admin',
    roleName: 'Super Admin',
    description: 'Full un-restricted access to IST, EAP, and Grants modules and all screens.',
    permissions: {
      allowedModules: [ModuleCode.IST, ModuleCode.EAP, ModuleCode.GRANTS],
      allowedScreens: [
        ScreenCode.IST_DASHBOARD,
        ScreenCode.IST_PROJECTS,
        ScreenCode.IST_REPORTS,
        ScreenCode.EAP_DASHBOARD,
        ScreenCode.EAP_APPLICATIONS,
        ScreenCode.EAP_APPROVALS,
        ScreenCode.GRANTS_DASHBOARD,
        ScreenCode.GRANTS_ALLOCATION,
        ScreenCode.GRANTS_DISBURSEMENTS
      ]
    }
  },
  {
    id: 'ist-manager',
    roleName: 'IST Department Lead',
    description: 'Full access to IST screens + read-only Grants overview.',
    permissions: {
      allowedModules: [ModuleCode.IST, ModuleCode.GRANTS],
      allowedScreens: [
        ScreenCode.IST_DASHBOARD,
        ScreenCode.IST_PROJECTS,
        ScreenCode.IST_REPORTS,
        ScreenCode.GRANTS_DASHBOARD
      ]
    }
  },
  {
    id: 'eap-specialist',
    roleName: 'EAP Specialist',
    description: 'Dedicated access to Enterprise Architecture Planning (EAP) module.',
    permissions: {
      allowedModules: [ModuleCode.EAP],
      allowedScreens: [
        ScreenCode.EAP_DASHBOARD,
        ScreenCode.EAP_APPLICATIONS,
        ScreenCode.EAP_APPROVALS
      ]
    }
  },
  {
    id: 'grants-auditor',
    roleName: 'Grants & Compliance Officer',
    description: 'Access to Grants module screens + EAP Application Inventory for auditing.',
    permissions: {
      allowedModules: [ModuleCode.GRANTS, ModuleCode.EAP],
      allowedScreens: [
        ScreenCode.GRANTS_DASHBOARD,
        ScreenCode.GRANTS_ALLOCATION,
        ScreenCode.GRANTS_DISBURSEMENTS,
        ScreenCode.EAP_APPLICATIONS
      ]
    }
  },
  {
    id: 'custom-user',
    roleName: 'Custom Permission User',
    description: 'Granularly customized screen & module permissions from Local DB.',
    permissions: {
      allowedModules: [ModuleCode.IST, ModuleCode.EAP],
      allowedScreens: [
        ScreenCode.IST_DASHBOARD,
        ScreenCode.EAP_DASHBOARD
      ]
    }
  }
];

@Injectable({
  providedIn: 'root'
})
export class LocalDbService {
  private userProfileSubject = new BehaviorSubject<UserProfile>(this.loadProfileFromLocalDb());
  public userProfile$: Observable<UserProfile> = this.userProfileSubject.asObservable();

  constructor() {}

  public get currentUserProfile(): UserProfile {
    return this.userProfileSubject.value;
  }

  private loadProfileFromLocalDb(): UserProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER_PROFILE);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse local DB user profile', e);
    }

    const defaultProfile: UserProfile = {
      id: 'USR-1001',
      name: 'Alex Morgan',
      email: 'alex.morgan@enterprise.org',
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      permissions: PREDEFINED_ROLES[0].permissions
    };

    this.saveProfileToLocalDb(defaultProfile);
    return defaultProfile;
  }

  public saveProfileToLocalDb(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEY_USER_PROFILE, JSON.stringify(profile));
      localStorage.setItem(STORAGE_KEY_DB_STAMP, new Date().toISOString());
      this.userProfileSubject.next(profile);
    } catch (e) {
      console.error('Error writing to Local DB', e);
    }
  }

  public switchRolePreset(roleId: string): void {
    const rolePreset = PREDEFINED_ROLES.find(r => r.id === roleId) || PREDEFINED_ROLES[0];
    const current = this.userProfileSubject.value;
    const updated: UserProfile = {
      ...current,
      role: rolePreset.roleName,
      permissions: JSON.parse(JSON.stringify(rolePreset.permissions))
    };
    this.saveProfileToLocalDb(updated);
  }

  public updatePermissions(config: UserPermissionConfig): void {
    const current = this.userProfileSubject.value;
    const updated: UserProfile = {
      ...current,
      role: 'Custom (Local DB Modified)',
      permissions: config
    };
    this.saveProfileToLocalDb(updated);
  }

  public resetLocalDb(): void {
    localStorage.removeItem(STORAGE_KEY_USER_PROFILE);
    localStorage.removeItem(STORAGE_KEY_DB_STAMP);
    this.loadProfileFromLocalDb();
  }

  public getLastSyncTime(): string {
    return localStorage.getItem(STORAGE_KEY_DB_STAMP) || new Date().toISOString();
  }
}
