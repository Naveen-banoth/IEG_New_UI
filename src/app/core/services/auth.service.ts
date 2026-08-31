import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalDbService } from './local-db.service';
import { UserProfile } from '../models/permissions.model';

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

  public login(email?: string, token?: string): void {
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

    if (email) {
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
    this.clearToken();
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
}
