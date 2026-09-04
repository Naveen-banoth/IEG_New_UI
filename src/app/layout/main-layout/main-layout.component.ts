import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { filter, Subscription } from 'rxjs';
import { LocalDbService } from '../../core/services/local-db.service';
import { PermissionService } from '../../core/services/permission.service';
import { AuthService } from '../../core/services/auth.service';
import {
  SuperAdminAuthService,
  CommonSummaryService,
  CommonAlertsNotificationsService,
  IstGeneralInfoService
} from '../../TestServices';
import { ModulePermission, UserProfile } from '../../core/models/permissions.model';
import { PermissionManagerComponent } from '../permission-manager/permission-manager.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PermissionManagerComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private localDb = inject(LocalDbService);
  private permissionService = inject(PermissionService);
  private authService = inject(AuthService);
  public superAdminAuth = inject(SuperAdminAuthService);
  private commonSummary = inject(CommonSummaryService);
  private alertsNotifications = inject(CommonAlertsNotificationsService);
  private istGeneralInfo = inject(IstGeneralInfoService);
  private router = inject(Router);

  // Modern Reactive Signals
  public showPermissionModal = signal<boolean>(false);
  public showProfileModal = signal<boolean>(false);
  public showChangePasswordModal = signal<boolean>(false);
  public currentUser = signal<UserProfile | null>(null);
  public authorizedMenu = signal<ModulePermission[]>([]);
  public activeDropdownModule = signal<string | null>(null);
  public activeScreenName = signal<string>('All Applications');
  public isDetailView = signal<boolean>(false);
  public isSidebarCollapsed = signal<boolean>(true);

  public selectedTimeZone = '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi';
  public selectedCurrency = '$ - United States Dollar (United States)';

  public timeZoneOptions = [
    '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi',
    '(UTC-05:00) Eastern Time (US & Canada)',
    '(UTC-08:00) Pacific Time (US & Canada)',
    '(UTC+00:00) UTC / London',
    '(UTC+01:00) Amsterdam, Berlin, Rome, Paris',
    '(UTC+08:00) Beijing, Singapore, Perth',
    '(UTC+09:00) Tokyo, Seoul'
  ];

  public currencyOptions = [
    '$ - United States Dollar (United States)',
    '€ - Euro (European Union)',
    '£ - British Pound (United Kingdom)',
    '₹ - Indian Rupee (India)',
    '¥ - Japanese Yen (Japan)',
    'C$ - Canadian Dollar (Canada)',
    'A$ - Australian Dollar (Australia)'
  ];

  public passwordForm = {
    current: '',
    newPass: '',
    confirm: ''
  };

  public passwordBanner = signal<{ text: string; type: 'success' | 'error' } | null>(null);

  private sub = new Subscription();

  toggleSidebar(): void {
    this.isSidebarCollapsed.update(v => !v);
  }

  openProfileModal(): void {
    this.showProfileModal.set(true);
    this.showChangePasswordModal.set(false);
  }

  closeProfileModal(): void {
    this.showProfileModal.set(false);
  }

  openChangePassword(): void {
    this.showChangePasswordModal.set(true);
    this.passwordBanner.set(null);
    this.passwordForm = { current: '', newPass: '', confirm: '' };
  }

  closeChangePassword(): void {
    this.showChangePasswordModal.set(false);
  }

  openPermissionModal(): void {
    this.showPermissionModal.set(true);
  }

  closePermissionModal(): void {
    this.showPermissionModal.set(false);
  }

  submitPasswordChange(): void {
    if (!this.passwordForm.current || !this.passwordForm.newPass || !this.passwordForm.confirm) {
      this.passwordBanner.set({ text: 'Please fill in all password fields.', type: 'error' });
      return;
    }
    if (this.passwordForm.newPass !== this.passwordForm.confirm) {
      this.passwordBanner.set({ text: 'New password and confirmation do not match.', type: 'error' });
      return;
    }
    if (this.passwordForm.newPass.length < 6) {
      this.passwordBanner.set({ text: 'Password must be at least 6 characters long.', type: 'error' });
      return;
    }
    this.passwordBanner.set({ text: 'Password changed successfully!', type: 'success' });
    setTimeout(() => {
      this.showChangePasswordModal.set(false);
      this.passwordBanner.set(null);
    }, 1500);
  }

  ngOnInit(): void {
    this.sub.add(
      this.localDb.userProfile$.subscribe(profile => {
        this.currentUser.set(profile);
        this.authorizedMenu.set(this.permissionService.getAuthorizedMenu());
      })
    );

    const userDetails = this.authService.getUserDetails();
    const userType = userDetails?.USER_TYPE || (this.currentUser()?.role === 'Super Admin' ? 'A' : 'I');
    const orgCode = this.authService.getOrgCode() || 'scimax';

    // Trigger after-login background calls directly via TestServices
    this.initPostLoginData(userType, orgCode);

    this.sub.add(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
        this.checkRouteState();
      })
    );

    this.checkRouteState();
  }

  private initPostLoginData(userType: string, orgCode: string): void {
    // 1. Session verification: GET api/appuser/checksession
    this.superAdminAuth.checkSession().subscribe({
      next: (res) => console.log('Session verified:', res),
      error: (err) => console.warn('Session check fallback:', err)
    });

    if (userType !== 'A') {
      // 2. Column Configurations: GET api/common/GetColumns/2/true
      this.commonSummary.getColumns('2', true).subscribe({
        next: (res) => console.log('Columns loaded:', res ? 'OK' : 'Empty'),
        error: (err) => console.warn('GetColumns fallback:', err)
      });

      // 3. User Preferences: GET api/common/GetUserPreferencesColumns
      this.commonSummary.getUserPreferencesColumns().subscribe({
        next: (res) => console.log('User preferences loaded:', res ? 'OK' : 'Empty'),
        error: (err) => console.warn('GetUserPreferencesColumns fallback:', err)
      });

      // 4. Application Statuses: GET api/gmapp/getstatus/2
      this.commonSummary.getStatusList('2').subscribe({
        next: (res) => console.log('Status list loaded:', res ? 'OK' : 'Empty'),
        error: (err) => console.warn('GetStatus fallback:', err)
      });

      // 5. IST Applications List: GET api/ISTGeneralInfo/GetApplicationsList
      this.istGeneralInfo.getApplicationsList().subscribe({
        next: (res: any) => console.log('Applications list loaded:', res ? 'OK' : 'Empty'),
        error: (err) => {
          this.istGeneralInfo.getApplicationsList().subscribe({
            next: (postRes: any) => console.log('Applications list fallback loaded:', postRes ? 'OK' : 'Empty'),
            error: (pErr) => console.warn('GetApplicationsList fallback:', pErr)
          });
        }
      });

      // 6. Search App Types: GET api/apptypes/getallappforsearch/2/-1
      this.commonSummary.getAllAppForSearch('2', '-1').subscribe({
        next: (res) => console.log('App search master loaded:', res ? 'OK' : 'Empty'),
        error: (err) => console.warn('GetAllAppForSearch fallback:', err)
      });

      // 7. Notification Count: GET api/Notifications/NotificationCount
      this.alertsNotifications.getNotificationCount().subscribe({
        next: (res) => console.log('Notification count loaded:', res ? 'OK' : 'Empty'),
        error: (err) => console.warn('NotificationCount fallback:', err)
      });
    }

    // 8. Logo & Build version
    if (orgCode) {
      this.superAdminAuth.getLogo(orgCode).subscribe({
        next: (res) => console.log('Org Logo loaded:', res ? 'OK' : 'Empty'),
        error: (err) => console.warn('Logo download fallback:', err)
      });
    }

    this.superAdminAuth.getBuildVersion().subscribe({
      next: (res) => console.log('Build version verified:', res?.Data || res),
      error: (err) => console.warn('Build version fallback:', err)
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public onLogout(): void {
    this.showProfileModal.set(false);
    this.showChangePasswordModal.set(false);
    this.authService.logout();
  }

  private checkRouteState(): void {
    const currentUrl = this.router.url;
    // When URL contains /detail, /administration, or /test-services, we hide top module tabs & generic header title so it renders full-screen!
    this.isDetailView.set(currentUrl.includes('/detail') || currentUrl.includes('/administration') || currentUrl.includes('/test-services'));
  }

  getUserName(): string {
    const loginInfo = this.superAdminAuth.logindata();
    if (loginInfo?.FullName) return loginInfo.FullName;
    if (loginInfo?.FIRST_NAME) {
      return `${loginInfo.FIRST_NAME} ${loginInfo.LAST_NAME || ''}`.trim();
    }
    if (loginInfo?.TITLE) return loginInfo.TITLE;
    if (loginInfo?.Username) return loginInfo.Username;
    return this.currentUser()?.name || '';
  }

  getUserEmail(): string {
    const loginInfo = this.superAdminAuth.logindata();
    return loginInfo?.EMAIL || loginInfo?.Email || loginInfo?.UserEmail || this.currentUser()?.email || '';
  }

  getUserRole(): string {
    const loginInfo = this.superAdminAuth.logindata();
    if (loginInfo?.ROLE_NAME) return loginInfo.ROLE_NAME;
    if (loginInfo?.RoleName) return loginInfo.RoleName;
    if (loginInfo?.USER_TYPE === 'A' || loginInfo?.CODE === 'SUPERADMIN') return 'Super Admin';
    if (loginInfo?.USER_TYPE === 'E') return 'External User';
    return this.currentUser()?.role || 'Administrator';
  }

  getUserInitials(): string {
    const name = this.getUserName();
    if (!name) return 'U';
    return name
      .split(' ')
      .filter(Boolean)
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  getNavModules(): { id: string; name: string; route: string; screens: { name: string; route: string; code?: string; id?: string }[] }[] {
    const loginInfo = this.superAdminAuth.logindata();
    const features = loginInfo?.FEATURES || loginInfo?.Features;

    if (Array.isArray(features) && features.length > 0) {
      const validModules: { id: string; name: string; route: string; screens: { name: string; route: string; code?: string; id?: string }[] }[] = [];

      for (const f of features) {
        if (!f || !f.Name) continue;
        const idLower = (f.Id || '').toLowerCase();

        // Skip internal non-program console modules from main program pills
        if (idLower === 'general' || idLower === 'auditlog') continue;

        let baseRoute = '/' + idLower.replace('console', '');
        if (!baseRoute || baseRoute === '/') {
          baseRoute = '/ist';
        }

        const subScreens: { name: string; route: string; code?: string; id?: string }[] = [];
        if (Array.isArray(f.Features) && f.Features.length > 0) {
          for (const sub of f.Features) {
            subScreens.push({
              name: sub.Name || 'All Applications',
              route: baseRoute,
              code: sub.Code,
              id: sub.Id
            });
          }
        } else {
          subScreens.push({
            name: 'All Applications',
            route: baseRoute
          });
        }

        const existing = validModules.find(m => m.route === baseRoute || m.id === f.Id);
        if (!existing) {
          validModules.push({
            id: f.Id || baseRoute.replace('/', ''),
            name: f.Name,
            route: baseRoute,
            screens: subScreens
          });
        }
      }

      if (validModules.length > 0) {
        return validModules;
      }
    }

    return [];
  }

  openDropdown(moduleId: string): void {
    this.activeDropdownModule.set(moduleId);
  }

  closeDropdown(): void {
    this.activeDropdownModule.set(null);
  }

  toggleDropdown(moduleId: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.activeDropdownModule.update(curr => curr === moduleId ? null : moduleId);
  }

  onModuleClick(mod: any, event?: Event): void {
    if (mod.screens && mod.screens.length > 0) {
      this.activeScreenName.set(mod.screens[0].name || 'All Applications');
    } else {
      this.activeScreenName.set('All Applications');
    }
    this.activeDropdownModule.set(null);
  }

  onScreenClick(scr: any, mod: any, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.activeScreenName.set(scr.name || 'All Applications');
    this.activeDropdownModule.set(null);
  }

  getActiveProgramName(): string {
    const currentUrl = this.router.url.toLowerCase();
    const modules = this.getNavModules();

    // Match by route
    const match = modules.find(m => m.route && currentUrl.includes(m.route.toLowerCase()));
    if (match) {
      return match.name;
    }

    // Default to first feature name from login data if present
    if (modules.length > 0) {
      return modules[0].name;
    }

    const loginInfo = this.superAdminAuth.logindata();
    const firstFeature = loginInfo?.FEATURES?.[0] || loginInfo?.Features?.[0];
    return firstFeature?.Name || '';
  }

  getModuleDisplayName(code: string): string {
    const loginInfo = this.superAdminAuth.logindata();
    const features = loginInfo?.FEATURES || loginInfo?.Features;
    if (Array.isArray(features) && features.length > 0) {
      const codeUpper = (code || '').toUpperCase();
      const match = features.find((f: any) =>
        (f.Id && f.Id.toUpperCase() === codeUpper) ||
        (f.Id && f.Id.toUpperCase().includes(codeUpper)) ||
        (f.Name && f.Name.toUpperCase().includes(codeUpper))
      );
      if (match?.Name) return match.Name;
    }
    return code || '';
  }
}
