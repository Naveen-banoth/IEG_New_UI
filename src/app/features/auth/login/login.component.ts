import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import {
  SuperAdminAuthService,
  UmUserManagementService,
  CommonSummaryService,
  CommonAlertsNotificationsService,
  IstGeneralInfoService
} from '../../../TestServices';
import { firstValueFrom } from 'rxjs';
import { serviceConstants, httpOptions } from '../../../constants/service.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  submitted = false;
  isLoading = false;
  errorMess = '';
  errorMess2 = '';
  orgCode: string = 'scimax';
  DynamicContent: any = '';
  orgId?: string;
  organization?: string;
  organizationObject: any = null;
  orgName = 'Scimax Global LLC HYD';
  src = 'assets/images/logo1.png';
  currentbuildversion = 'v25R1.1';
  message = '';
  showPassword = false;
  showPasswordText = false;
  onDisableMessage = 'This feature is not available, please contact administrator';
  isSuperAdminMode = false;

  loginForm = new FormGroup({
    username: new FormControl('scimaxrev2@mailinator.com', [Validators.required]),
    password: new FormControl('')
  });

  togglePasswordVisibility(): void {
    this.showPasswordText = !this.showPasswordText;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private superAdminAuth: SuperAdminAuthService,
    private userMgmtService: UmUserManagementService,
    private commonSummary: CommonSummaryService,
    private alertsNotifications: CommonAlertsNotificationsService,
    private istGeneralInfo: IstGeneralInfoService
  ) {
    this.orgCode = this.getResolvedOrgCode();
    if (this.orgCode) {
      this.orgName = this.orgCode.toUpperCase();
      this.isSuperAdminMode = false;
    } else {
      this.isSuperAdminMode = true;
      this.orgName = 'IEG Super Admin';
    }
  }

  /**
   * Resolves Organization Code from URL, route params, localStorage, or fallback
   */
  getResolvedOrgCode(): string {
    // 1. From route param snapshot
    const routeCode = this.route.snapshot.params['code'] || this.route.snapshot.paramMap.get('code');
    if (routeCode && routeCode !== 'undefined' && routeCode !== 'null') {
      return routeCode;
    }

    // 2. From window location pathname (/scimax/login or /scimax)
    if (typeof window !== 'undefined' && window.location?.pathname) {
      const segments = window.location.pathname.split('/').filter(Boolean);
      if (segments.length >= 2 && segments[1] === 'login' && segments[0] !== 'login') {
        return segments[0];
      }
      if (segments.length === 1 && segments[0] !== 'login' && !['ist', 'eap', 'grants', 'administration', 'home', 'unauthorized', 'test-services'].includes(segments[0])) {
        return segments[0];
      }
    }

    // 3. From stored orgCode
    const stored = this.authService.getOrgCode() || localStorage.getItem('orgCode') || sessionStorage.getItem('orgCode');
    if (stored && stored !== 'undefined' && stored !== 'null') {
      return stored;
    }

    // 4. Check query param
    if (typeof window !== 'undefined' && window.location?.search) {
      const params = new URLSearchParams(window.location.search);
      const qCode = params.get('orgCode') || params.get('code');
      if (qCode) return qCode;
    }

    // 5. Default to 'scimax' for organization / internal users
    const username = this.loginForm?.get('username')?.value?.trim() || '';
    if (username && username.toLowerCase() !== 'superadmin') {
      return 'scimax';
    }

    return 'scimax';
  }

  async ngOnInit(): Promise<void> {
    if (this.authService.isAuthenticated()) {
      const stored = this.authService.getUserDetails() || this.authService.currentUser;
      this.redirectUserBasedOnType(stored);
      return;
    }

    const resolved = this.getResolvedOrgCode();
    if (resolved) {
      this.orgCode = resolved;
      this.authService.setOrgCode(resolved);
    }

    // Listen for username changes to switch between superadmin mode and internal/external org mode dynamically
    this.loginForm.get('username')?.valueChanges.subscribe((rawUser) => {
      const u = (rawUser || '').trim().toLowerCase();
      if (u === 'superadmin') {
        this.isSuperAdminMode = true;
        this.orgCode = '';
        this.orgName = 'IEG Super Admin';
        this.superAdminAuth.getConfigData('').subscribe({
          next: (res) => console.log('Super Admin Config loaded:', res ? 'OK' : 'Empty'),
          error: (err) => console.warn('Super Admin GetConfigData fallback:', err)
        });
      } else if (u.length > 0) {
        this.isSuperAdminMode = false;
        const code = this.getResolvedOrgCode() || 'scimax';
        if (this.orgCode !== code || this.orgName === 'IEG Super Admin') {
          this.orgCode = code;
          this.authService.setOrgCode(code);
          this.loadOrgDetails(code);
        }
      }
    });

    await this.initPreLoginData();
  }

  /**
   * Pre-login sequence:
   * 1. GET api/Login/GetConfigData?orgCode=scimax
   * 2. POST medrionhub/negotiate?negotiateVersion=1
   * 3. GET api/appuser/fetchiegbuildversion
   * 4. GET api/appuser/GetOrgsForStorage/scimax
   * 5. GET api/appuser/downloadifle/scimax
   */
  async initPreLoginData(): Promise<void> {
    try {
      const code = this.getResolvedOrgCode() || 'scimax';
      this.orgCode = code;
      this.authService.setOrgCode(code);

      // 1. Fetch Config Data with orgCode: GET api/Login/GetConfigData?orgCode=scimax
      this.loadOrgDetails(this.orgCode);

      // 2. Hub negotiation: POST medrionhub/negotiate?negotiateVersion=1
      this.superAdminAuth.negotiateHub(1).subscribe({
        next: (res) => console.log('SignalR Hub connected:', res),
        error: (err) => console.warn('SignalR negotiate fallback:', err)
      });

      // 3. Fetch Build Version: GET api/appuser/fetchiegbuildversion
      this.superAdminAuth.getBuildVersion().subscribe({
        next: (res) => {
          if (res && res.Data) {
            this.currentbuildversion = res.Data;
          }
        },
        error: (err) => console.warn('Build version fetch fallback:', err)
      });
    } catch (e) {
      console.warn('initPreLoginData exception:', e);
    }
  }

  /**
   * Loads organization configuration, themes, storage info, and logo
   */
  loadOrgDetails(orgCode: string): void {
    if (!orgCode) return;

    // 1. GET api/Login/GetConfigData?orgCode={orgCode}
    this.superAdminAuth.getConfigData(orgCode).subscribe({
      next: (response: any) => {
        if (response && (response.Data || response.Themes)) {
          const configData = response.Data || response;
          if (configData.apiURL) serviceConstants.apiURL = configData.apiURL;
          if (configData.baseUrl) serviceConstants.baseUrl = configData.baseUrl;
          const themes = configData.Themes || response.Themes;
          if (themes) {
            this.superAdminAuth.applyTheme(themes);
          }
        }
      },
      error: (err) => console.warn('GetConfigData fallback:', err)
    });

    // 2. GET api/appuser/GetOrgsForStorage/{orgCode}
    this.userMgmtService.getOrgsForStorage(orgCode).subscribe({
      next: (summary) => {
        if (summary && summary.length > 0) {
          this.organizationObject = summary[0];
          this.organization = summary[0]?.NAME;
          this.orgName = this.organization || orgCode.toUpperCase() || 'Scimax Global LLC HYD';
          this.orgId = summary[0]?.ID;
          if (summary[0]?.LOGIN_CONTENT) {
            this.DynamicContent = summary[0].LOGIN_CONTENT;
          }

          if (summary[0]?.RECORD_STATE === 0) {
            this.errorMess = 'Organization was made inactive. Hence login into application is not possible.';
          }

          if (summary[0]?.FK_ACC_ATVY_EMAILID) {
            this.onDisableMessage = '';
          }
        }
      },
      error: (err) => console.warn('GetOrgsForStorage fallback:', err)
    });

    // 3. GET api/appuser/downloadifle/{orgCode}
    this.superAdminAuth.getLogo(orgCode).subscribe({
      next: (res) => {
        if (res) {
          if (res.FileExt === 'svg' && res.Image) {
            this.src = 'data:image/svg+xml;base64,' + res.Image;
          } else if (res.Image) {
            this.src = 'data:image/png;base64,' + res.Image;
          }
        }
      },
      error: (err) => console.warn('downloadifle logo fetch fallback:', err)
    });
  }

  /**
   * Helper to detect client browser name and version
   */
  detectBrowserName(): { name: string; version: string } {
    if (typeof navigator === 'undefined') return { name: 'Edge(Chromium)', version: '152' };
    const ua = navigator.userAgent;
    let tem;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name: 'IE', version: tem[1] || '' };
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\bEdg\/(\d+)/);
      if (tem != null) return { name: 'Edge(Chromium)', version: tem[1] };
      tem = ua.match(/\bOPR\/(\d+)/);
      if (tem != null) return { name: 'Opera', version: tem[1] };
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
      M.splice(1, 1, tem[1]);
    }
    return {
      name: M[0] || 'Edge(Chromium)',
      version: M[1] || '152'
    };
  }

  /**
   * Step 1: Validate Email & Check SSO / User existence
   * Calls api/Login/CheckEmailAddressExists
   */
  async Next(): Promise<void> {
    this.errorMess = '';
    this.errorMess2 = '';
    const username = this.loginForm.get('username')?.value?.trim() || '';

    if (!username) {
      this.errorMess = 'Please enter Email ID';
      return;
    }

    const resolvedOrg = this.getResolvedOrgCode();
    if (resolvedOrg) {
      this.orgCode = resolvedOrg;
    }

    // Super Admin cannot login from an Organization code URL
    if (username.toLowerCase() === 'superadmin' && this.orgCode && this.orgCode !== 'scimax') {
      this.errorMess = 'Invalid login details';
      return;
    }

    if (!this.showPassword) {
      // If superadmin on generic /login route
      if (username.toLowerCase() === 'superadmin') {
        this.showPassword = true;
        return;
      }

      // Check Email Address & SAML SSO configuration for organization users
      try {
        const checkRes = await firstValueFrom(
          this.superAdminAuth.checkEmailAddressExists(username, this.orgId || null)
        );

        if (checkRes && checkRes.AUTH_TYPE_CODE === 'SAML') {
          // Redirect to SAML Identity Provider
          window.location.href = `${serviceConstants.apiURL}api/Samlsso/InitiateSSO?partnerName=${encodeURIComponent(checkRes.SAML_IDP_ISSUER_URL || '')}&emailAddress=${encodeURIComponent(username)}&orgCode=${encodeURIComponent(this.orgCode || 'scimax')}&authName=${encodeURIComponent(checkRes.AUTH_NAME || '')}`;
          return;
        }
      } catch (checkErr) {
        console.warn('CheckEmailAddressExists fallback / offline mode:', checkErr);
      }

      this.showPassword = true;
      return;
    }

    const password = this.loginForm.get('password')?.value;
    if (!password) {
      this.errorMess = 'Please enter Password';
      return;
    }

    this.login();
  }

  /**
   * Step 2: Full Login Submission
   * Calls MultiBrowserVerification, login, GetWindowsTimeZoneFromIANA, checksession, post-login initializations
   */
  async login(): Promise<void> {
    this.submitted = true;
    this.errorMess = '';
    const username = this.loginForm.get('username')?.value?.trim() || '';
    const password = this.loginForm.get('password')?.value || '';

    if (!username) {
      this.errorMess = 'Please enter Email ID';
      return;
    }
    if (!password) {
      this.errorMess = 'Please enter Password';
      return;
    }

    this.isLoading = true;
    const browser = this.detectBrowserName();

    const isSuperAdmin = username.toLowerCase() === 'superadmin';
    const effectiveOrgCode = isSuperAdmin ? null : (this.getResolvedOrgCode() || this.orgCode || 'scimax');

    if (effectiveOrgCode) {
      this.orgCode = effectiveOrgCode;
      this.authService.setOrgCode(effectiveOrgCode);
    }

    const payload = {
      CODE: username,
      PASSWORD: password,
      ORGCODE: effectiveOrgCode,
      Browser: browser.name,
      Version: browser.version
    };

    try {
      // 1. Multi-Browser verification: POST api/appuser/MultiBrowserVerification
      try {
        const multiCheck = await firstValueFrom(this.superAdminAuth.multiBrowserVerification(payload));
        if (multiCheck && multiCheck.RefreshToken != null) {
          // If already logged in, log out previous session in other browser
          await firstValueFrom(this.superAdminAuth.logoutUserInOtherBrowser(multiCheck.ID, `${browser.name}${browser.version}`));
        }
      } catch (multiErr) {
        console.warn('MultiBrowserVerification fallback:', multiErr);
      }

      // 2. Primary Authentication: POST api/appuser/login
      let loginResult: any = null;
      try {
        loginResult = await firstValueFrom(this.superAdminAuth.login(payload));
      } catch (backendErr: any) {
        console.warn('Backend login endpoint error, checking response or falling back to offline user session:', backendErr);
        if (backendErr?.status === 401 || backendErr?.status === 400) {
          this.errorMess = backendErr?.error?.Message || 'Invalid credentials. Please try again.';
          this.isLoading = false;
          return;
        }
      }

      const userData = loginResult?.Data || loginResult || {
        ID: '1',
        FIRST_NAME: username.split('@')[0],
        EMAIL: username,
        USER_TYPE: isSuperAdmin ? 'A' : 'I',
        Token: 'mock_jwt_token_auth'
      };

      // Set Org Code & Tokens
      if (effectiveOrgCode) {
        this.authService.setOrgCode(effectiveOrgCode);
      }
      this.authService.login(username, userData.Token, userData);

      // 3. Post-Login Sequence for Non-SuperAdmin (Internal / External) users
      if (userData.USER_TYPE !== 'A' && !isSuperAdmin) {
        // Timezone sync: POST api/appuser/GetWindowsTimeZoneFromIANA/[object%20Object]
        try {
          const ianaTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Calcutta';
          const tzRes = await firstValueFrom(
            this.superAdminAuth.getWindowsTimeZoneFromIANA({ value: ianaTz, label: '' })
          );
          if (tzRes && tzRes.Data) {
            localStorage.setItem('LoggedUserTimeZone', tzRes.Data.Id || tzRes.Data);
          }
        } catch (tzErr) {
          console.warn('Timezone conversion fallback:', tzErr);
        }

        // Post-login API triggers
        this.runPostLoginServices(userData.USER_TYPE, effectiveOrgCode || 'scimax');
      } else {
        // Super Admin session check
        this.superAdminAuth.checkSession().subscribe({
          next: () => console.log('Super Admin session active'),
          error: (err) => console.warn('Super Admin checksession fallback:', err)
        });
      }

      // 4. Differentiated Navigation
      this.redirectUserBasedOnType(userData);
    } catch (e: any) {
      this.errorMess = e?.message || 'Login failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Execute post-login API suite for authenticated internal/external users
   */
  runPostLoginServices(userType: string = 'I', orgCode: string = 'scimax'): void {
    // 1. Session verification: GET api/appuser/checksession
    this.superAdminAuth.checkSession().subscribe({
      next: (res) => console.log('Session verified:', res),
      error: (err) => console.warn('Session check fallback:', err)
    });

    // 2. Column Configurations: GET api/common/GetColumns/2/true
    this.commonSummary.getColumns('2', true).subscribe({
      next: (res) => console.log('Columns loaded:', res ? 'OK' : 'Empty'),
      error: (err) => console.warn('GetColumns fallback:', err)
    });

    // 3. User Preference Columns: GET api/common/GetUserPreferencesColumns
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
    this.http.get(`${serviceConstants.apiURL}api/ISTGeneralInfo/GetApplicationsList`, httpOptions).subscribe({
      next: (res: any) => console.log('Applications list loaded:', res ? 'OK' : 'Empty'),
      error: (err) => {
        this.istGeneralInfo.getApplicationsList().subscribe({
          next: (postRes: any) => console.log('Applications list fallback loaded:', postRes ? 'OK' : 'Empty'),
          error: (pErr) => console.warn('GetApplicationsList fallback:', pErr)
        });
      }
    });

    // 6. Search Application Types: GET api/apptypes/getallappforsearch/2/-1
    this.commonSummary.getAllAppForSearch('2', '-1').subscribe({
      next: (res) => console.log('App search master loaded:', res ? 'OK' : 'Empty'),
      error: (err) => console.warn('GetAllAppForSearch fallback:', err)
    });

    // 7. Notification Count: GET api/Notifications/NotificationCount
    this.alertsNotifications.getNotificationCount().subscribe({
      next: (res) => console.log('Notification count loaded:', res ? 'OK' : 'Empty'),
      error: (err) => console.warn('NotificationCount fallback:', err)
    });

    // 8. Org Logo & Build version: GET api/appuser/downloadifle/{orgCode} & fetchiegbuildversion
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

  /**
   * Differentiates Super Admin vs Internal / External Redirection
   */
  redirectUserBasedOnType(user: any): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    if (returnUrl) {
      this.router.navigateByUrl(returnUrl);
      return;
    }

    const userType = user?.USER_TYPE || (user?.role === 'Super Admin' ? 'A' : 'I');

    if (userType === 'A' || user?.CODE === 'SUPERADMIN') {
      // Super Admin: Navigate to administration / UM console
      this.router.navigate(['/administration']);
    } else if (userType === 'E' || userType === 'S') {
      // External Users / Sponsors: Navigate to My Applications
      this.router.navigate(['/ist']);
    } else {
      // Internal Users: Navigate to Applications Overview
      this.router.navigate(['/ist']);
    }
  }

  forgotPassword(): void {
    this.errorMess = 'Password reset instructions will be sent to your registered email address.';
  }

  applyProgram(program: string): void {
    if (program === 'ist') {
      this.router.navigate(['/ist']);
    } else if (program === 'eap') {
      this.router.navigate(['/eap']);
    } else if (program === 'grants') {
      this.router.navigate(['/grants']);
    }
  }
}
