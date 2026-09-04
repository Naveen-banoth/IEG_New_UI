import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminAuthService {
  readonly logindata = signal<any>(this.getInitialLoginData());

  constructor(private http: HttpClient) { }

  private getInitialLoginData(): any {
    try {
      const stored = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  clearLoginData(): void {
    this.logindata.set(null);
    localStorage.removeItem('loginData');
    sessionStorage.removeItem('loginData');
  }


  /**
   * Fetch application configuration data (before login)
   * GET api/Login/GetConfigData?orgCode=
   */
  getConfigData(orgCode: string = ''): Observable<any> {
    return this.http.get(`${serviceConstants.apiURL}api/Login/GetConfigData?orgCode=${encodeURIComponent(orgCode || '')}`, httpOptions);
  }

  /**
   * Apply dynamic CSS variables from Theme configuration
   */
  applyTheme(theme: any): void {
    if (typeof document === 'undefined' || !document.documentElement || !theme) return;
    const root = document.documentElement;
    if (theme.HEADER_COLOR) root.style.setProperty('--header_color', theme.HEADER_COLOR);
    if (theme.NAV_HOVER_BG) root.style.setProperty('--nav_hover_bg', theme.NAV_HOVER_BG);
    if (theme.BUTTON_BORDER_COLOR) root.style.setProperty('--button_border-Color', theme.BUTTON_BORDER_COLOR);
    if (theme.BUTTON_HOVER_COLOR) root.style.setProperty('--button_hover_color', theme.BUTTON_HOVER_COLOR);
    if (theme.BUTTON_TEXT_COLOR) root.style.setProperty('--button_text_color', theme.BUTTON_TEXT_COLOR);
    if (theme.LOGIN_BG_COLOR) root.style.setProperty('--login_bg_color', theme.LOGIN_BG_COLOR);
    if (theme.LOGIN_BUTTON_COLOR) root.style.setProperty('--login_button_color', theme.LOGIN_BUTTON_COLOR);
    if (theme.LOGIN_BUTTON_HOVER) root.style.setProperty('--login_button_hover', theme.LOGIN_BUTTON_HOVER);
    if (theme.LOGIN_BTN_TEXT_COLOR) root.style.setProperty('--login_btn_text_color', theme.LOGIN_BTN_TEXT_COLOR);
  }

  /**
   * Fetch current IEG build version
   * GET api/appuser/fetchiegbuildversion
   */
  getBuildVersion(): Observable<any> {
    return this.http.get(`${serviceConstants.apiURL}api/appuser/fetchiegbuildversion`, httpOptions);
  }

  /**
   * Negotiate SignalR Hub connection
   * POST medrionhub/negotiate?negotiateVersion=1
   */
  negotiateHub(negotiateVersion: number = 1): Observable<any> {
    return this.http.post(`${serviceConstants.apiURL}medrionhub/negotiate?negotiateVersion=${negotiateVersion}`, {}, httpOptions);
  }

  /**
   * Download organization logo image
   * GET api/appuser/downloadifle/{orgCode}
   */
  getLogo(orgCode: string): Observable<any> {
    return this.http.get(`${serviceConstants.apiURL}api/appuser/downloadifle/${encodeURIComponent(orgCode)}`, httpOptions);
  }

  /**
   * Get Windows TimeZone ID from IANA timezone string
   * POST api/appuser/GetWindowsTimeZoneFromIANA/[object%20Object]
   */
  getWindowsTimeZoneFromIANA(timeZone: { value: string; label: string }): Observable<any> {
    return this.http.post(`${serviceConstants.apiURL}api/appuser/GetWindowsTimeZoneFromIANA/[object%20Object]`, timeZone, httpOptions);
  }

  /**
   * Check if email address exists & verify authentication type (SAML/Standard)
   * POST api/Login/CheckEmailAddressExists
   */
  checkEmailAddressExists(email: string, orgId: string | null = null): Observable<any> {
    const payload = {
      EMAIL: email,
      ORGANIZATION_ID: orgId
    };
    return this.http.post(`${serviceConstants.apiURL}api/Login/CheckEmailAddressExists`, payload, httpOptions);
  }

  /**
   * Check user type
   * POST api/appuser/checkusertype
   */
  checkUserType(code: string, orgCode: string | null = null): Observable<any> {
    const payload = {
      CODE: code,
      ORGCODE: orgCode
    };
    return this.http.post(`${serviceConstants.apiURL}api/appuser/checkusertype`, payload, httpOptions);
  }

  /**
   * Multi-browser verification check before logging in
   * POST api/appuser/MultiBrowserVerification
   */
  multiBrowserVerification(payload: {
    CODE: string;
    PASSWORD?: string;
    ORGCODE?: string | null;
    Browser: string;
    Version: string;
  }): Observable<any> {
    return this.http.post(`${serviceConstants.apiURL}api/appuser/MultiBrowserVerification`, payload, httpOptions);
  }

  /**
   * Super Admin Login authentication
   * POST api/appuser/login
   */
  login(payload: {
    CODE: string;
    PASSWORD?: string;
    ORGCODE?: string | null;
    Browser: string;
    Version: string;
  }): Observable<any> {
    return this.http.post(`${serviceConstants.apiURL}api/appuser/login`, payload, httpOptions).pipe(
      tap((res: any) => {
        const raw = res?.Data || res;
        this.logindata.set(raw);
        try {
          localStorage.setItem('loginData', JSON.stringify(raw));
          sessionStorage.setItem('loginData', JSON.stringify(raw));
        } catch (e) {
          console.warn('Could not cache loginData', e);
        }

        const token = raw?.Token || raw?.token || raw?.access_token || res?.Token || res?.token;
        if (token) {
          sessionStorage.setItem('token', token);
          localStorage.setItem('token', token);
          sessionStorage.setItem('jwt_token', token);
          localStorage.setItem('jwt_token', token);
          sessionStorage.setItem('app_is_authenticated', 'true');
        }
        if (raw?.RefreshToken || res?.RefreshToken) {
          const refreshToken = raw?.RefreshToken || res?.RefreshToken;
          sessionStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('refreshToken', refreshToken);
        }
      })
    );
  }

  /**
   * Check session status
   * GET api/appuser/checksession
   */
  checkSession(): Observable<any> {
    return this.http.get(`${serviceConstants.apiURL}api/appuser/checksession`, httpOptions);
  }

  /**
   * Fetch system timezones
   * GET api/appuser/fetchtimezones
   */
  fetchTimezones(): Observable<any> {
    return this.http.get(`${serviceConstants.apiURL}api/appuser/fetchtimezones`, httpOptions);
  }

  /**
   * Get user currency preference
   * GET api/appuser/getcurrency
   */
  getUserCurrency(): Observable<any> {
    return this.http.get(`${serviceConstants.apiURL}api/appuser/getcurrency`, {
      ...httpOptions,
      responseType: 'text' as 'json'
    });
  }

  /**
   * Get roles and profile info by user ID
   * GET api/appuser/getur/{id}
   */
  getUserRoles(userId: string): Observable<any> {
    const id = userId || '1';
    return this.http.get(`${serviceConstants.apiURL}api/appuser/getur/${id}`, httpOptions);
  }

  /**
   * Logout user in other browser
   * GET api/appuser/LogoutUserInOtherBrowser/{id}/{browser}
   */
  logoutUserInOtherBrowser(userId: string, browser: string): Observable<any> {
    const id = userId || '1';
    const br = browser || 'Edge(Chromium)';
    return this.http.get(`${serviceConstants.apiURL}api/appuser/LogoutUserInOtherBrowser/${id}/${encodeURIComponent(br)}`, httpOptions);
  }

  /**
   * User logout
   * POST api/appuser/logout/
   */
  logout(model: {
    Reason?: string;
    Browser?: string;
    Version?: string;
    UserId?: string;
  }): Observable<any> {
    return this.http.post(`${serviceConstants.apiURL}api/appuser/logout/`, model, httpOptions);
  }
}
