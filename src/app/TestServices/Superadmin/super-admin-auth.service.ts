import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminAuthService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch application configuration data (before login)
   * GET api/Login/GetConfigData?orgCode=
   */
  getConfigData(orgCode: string = ''): Observable<any> {
    return this.http.get(`${serviceConstants.apiURL}api/Login/GetConfigData?orgCode=${encodeURIComponent(orgCode || '')}`, httpOptions);
  }

  /**
   * Fetch current IEG build version
   * GET api/appuser/fetchiegbuildversion
   */
  getBuildVersion(): Observable<any> {
    return this.http.get(`${serviceConstants.apiURL}api/appuser/fetchiegbuildversion`, httpOptions);
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
