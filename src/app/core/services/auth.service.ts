import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalDbService } from './local-db.service';
import { ModuleCode, ScreenCode, UserProfile } from '../models/permissions.model';

const STORAGE_KEY_AUTH = 'app_is_authenticated';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.checkInitialAuthState());
  public isLoggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(
    private localDb: LocalDbService,
    private router: Router
  ) {}

  private checkInitialAuthState(): boolean {
    const isAuth =
      sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true' ||
      localStorage.getItem(STORAGE_KEY_AUTH) === 'true' ||
      !!sessionStorage.getItem('token') ||
      !!localStorage.getItem('token');

    return isAuth;
  }

  public get user$(): Observable<UserProfile> {
    return this.localDb.userProfile$;
  }

  public get currentUser(): UserProfile {
    return this.localDb.currentUserProfile;
  }

  public getToken(): string {
    const storedToken =
      sessionStorage.getItem('token') ||
      localStorage.getItem('token') ||
      sessionStorage.getItem('jwt_token') ||
      localStorage.getItem('jwt_token');

    if (storedToken) {
      return storedToken;
    }

    if (this.isAuthenticated()) {
      const profile = this.currentUser;
      if (profile) {
        const mockPayload = {
          sub: profile.id,
          name: profile.name,
          role: profile.role,
          permissionsCount: profile.permissions?.allowedScreens?.length || 0,
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + btoa(JSON.stringify(mockPayload)) + '.mock_signature';
      }
    }

    return '';
  }

  public setToken(token: string): void {
    if (token) {
      sessionStorage.setItem('token', token);
      localStorage.setItem('token', token);
    }
  }

  public clearToken(): void {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    sessionStorage.removeItem('jwt_token');
    localStorage.removeItem('jwt_token');
    sessionStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshToken');
  }

  public isAuthenticated(): boolean {
    return this.loggedInSubject.value;
  }

  public getOrgCode(): string {
    return localStorage.getItem('orgCode') || sessionStorage.getItem('orgCode') || '';
  }

  public setOrgCode(orgCode: string): void {
    if (orgCode) {
      localStorage.setItem('orgCode', orgCode);
      sessionStorage.setItem('orgCode', orgCode);
    } else {
      localStorage.removeItem('orgCode');
      sessionStorage.removeItem('orgCode');
    }
  }

  public setUserDetails(details: any): void {
    if (details) {
      localStorage.setItem('userDetails', JSON.stringify(details));
      sessionStorage.setItem('userDetails', JSON.stringify(details));
      if (details.ID) {
        localStorage.setItem('id', String(details.ID));
        sessionStorage.setItem('id', String(details.ID));
      }
      if (details.USER_TYPE) {
        localStorage.setItem('userType', details.USER_TYPE);
        sessionStorage.setItem('userType', details.USER_TYPE);
      }
      if (details.LoggedUserDateFormat) localStorage.setItem('LoggedUserDateFormat', details.LoggedUserDateFormat);
      if (details.LoggedUserTimeFormat) localStorage.setItem('LoggedUserTimeFormat', details.LoggedUserTimeFormat);
      if (details.LoggedUserTimeZone) localStorage.setItem('LoggedUserTimeZone', details.LoggedUserTimeZone);
    }
  }

  public getUserDetails(): any {
    const raw = localStorage.getItem('userDetails') || sessionStorage.getItem('userDetails');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return null;
  }

  public login(email?: string, token?: string, userDetails?: any): void {
    sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
    localStorage.setItem(STORAGE_KEY_AUTH, 'true');

    if (token) {
      this.setToken(token);
    } else {
      const profile = this.currentUser;
      const mockPayload = {
        sub: profile?.id || 'USR-1001',
        name: profile?.name || 'Alex Morgan',
        role: profile?.role || 'Super Admin',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + btoa(JSON.stringify(mockPayload)) + '.mock_signature';
      this.setToken(mockToken);
    }

    if (userDetails) {
      this.setUserDetails(userDetails);
      const isSuperAdmin = userDetails.USER_TYPE === 'A' || userDetails.CODE === 'SUPERADMIN';
      const role = isSuperAdmin ? 'Super Admin' : (userDetails.USER_TYPE === 'E' ? 'External User' : 'Internal User');
      this.localDb.saveProfileToLocalDb({
        id: String(userDetails.ID || 'USR-1001'),
        name: `${userDetails.FIRST_NAME || ''} ${userDetails.LAST_NAME || ''}`.trim() || email || 'User',
        email: email || userDetails.EMAIL || 'user@medrion.com',
        role: role,
        avatar: userDetails.AVATAR || 'assets/images/avatar.png',
        permissions: {
          allowedModules: isSuperAdmin
            ? [ModuleCode.IST, ModuleCode.EAP, ModuleCode.GRANTS]
            : [ModuleCode.IST, ModuleCode.EAP, ModuleCode.GRANTS],
          allowedScreens: isSuperAdmin
            ? [
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
            : [ScreenCode.IST_DASHBOARD, ScreenCode.IST_PROJECTS, ScreenCode.IST_REPORTS]
        }
      });
    } else if (email) {
      const current = this.currentUser;
      if (current) {
        this.localDb.saveProfileToLocalDb({
          ...current,
          email: email
        });
      }
    }

    this.loggedInSubject.next(true);
  }

  public logout(): void {
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
    localStorage.removeItem(STORAGE_KEY_AUTH);
    localStorage.removeItem('userDetails');
    sessionStorage.removeItem('userDetails');
    localStorage.removeItem('id');
    sessionStorage.removeItem('id');
    localStorage.removeItem('userType');
    sessionStorage.removeItem('userType');
    this.clearToken();
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
}
