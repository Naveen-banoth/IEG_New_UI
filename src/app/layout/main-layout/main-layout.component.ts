import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter, Subscription } from 'rxjs';
import { LocalDbService } from '../../core/services/local-db.service';
import { PermissionService } from '../../core/services/permission.service';
import { AuthService } from '../../core/services/auth.service';
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
  public showPermissionModal = false;
  public showProfileModal = false;
  public showChangePasswordModal = false;
  public currentUser: UserProfile | null = null;
  public authorizedMenu: ModulePermission[] = [];
  public activeDropdownModule: string | null = null;
  public activeScreenName = 'All Applications';
  public isDetailView = false;
  public isSidebarCollapsed = true;

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

  public passwordBanner: { text: string; type: 'success' | 'error' } | null = null;

  private sub = new Subscription();

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  openProfileModal(): void {
    this.showProfileModal = true;
    this.showChangePasswordModal = false;
  }

  openChangePassword(): void {
    this.showChangePasswordModal = true;
    this.passwordBanner = null;
    this.passwordForm = { current: '', newPass: '', confirm: '' };
  }

  submitPasswordChange(): void {
    if (!this.passwordForm.current || !this.passwordForm.newPass || !this.passwordForm.confirm) {
      this.passwordBanner = { text: 'Please fill in all password fields.', type: 'error' };
      return;
    }
    if (this.passwordForm.newPass !== this.passwordForm.confirm) {
      this.passwordBanner = { text: 'New password and confirmation do not match.', type: 'error' };
      return;
    }
    if (this.passwordForm.newPass.length < 6) {
      this.passwordBanner = { text: 'Password must be at least 6 characters long.', type: 'error' };
      return;
    }
    this.passwordBanner = { text: 'Password changed successfully!', type: 'success' };
    setTimeout(() => {
      this.showChangePasswordModal = false;
      this.passwordBanner = null;
    }, 1500);
  }

  constructor(
    private localDb: LocalDbService,
    private permissionService: PermissionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.localDb.userProfile$.subscribe(profile => {
        this.currentUser = profile;
        this.authorizedMenu = this.permissionService.getAuthorizedMenu();
      })
    );

    this.sub.add(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
        this.checkRouteState();
      })
    );

    this.checkRouteState();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public onLogout(): void {
    this.showProfileModal = false;
    this.showChangePasswordModal = false;
    this.authService.logout();
  }

  private checkRouteState(): void {
    const currentUrl = this.router.url;
    // When URL contains /detail, /administration, or /test-services, we hide top module tabs & generic header title so it renders full-screen!
    this.isDetailView = currentUrl.includes('/detail') || currentUrl.includes('/administration') || currentUrl.includes('/test-services');
  }

  getUserInitials(): string {
    if (!this.currentUser?.name) return 'AS';
    return this.currentUser.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  getModuleDisplayName(code: string): string {
    switch (code) {
      case 'IST': return 'Investigator Sponsored Trial';
      case 'EAP': return 'Expanded Access Program';
      case 'GRANTS': return 'Grants';
      default: return code;
    }
  }
}

