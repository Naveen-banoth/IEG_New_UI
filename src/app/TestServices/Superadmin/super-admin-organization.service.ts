import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminOrganizationService {

  constructor(private http: HttpClient) {}

  /**
   * Search / List organizations for Super Admin Grid
   * POST api/organization/getadvsearch
   */
  getAdvSearch(search: { CODE?: string; NAME?: string; Status?: string }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/organization/getadvsearch`, search, httpOptions);
  }

  /**
   * Fetch all organizations
   * GET api/organization/getorganizatoins
   */
  getOrganizations(name: string = ''): Observable<any[]> {
    if (name && name !== '-1') {
      return this.http.get<any[]>(`${serviceConstants.apiURL}api/organization/getorganizatoins/${name}`, httpOptions);
    }
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/organization/getorganizatoins`, httpOptions);
  }

  /**
   * Fetch organizations from appuser endpoint
   * GET api/appuser/getorganizatoins
   */
  getOrganizationsFromAppUser(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/appuser/getorganizatoins`, httpOptions);
  }

  /**
   * Fetch single organization details by ID
   * GET api/organization/getorganizationbyid/{id}
   */
  getOrganizationById(id: string): Observable<any> {
    const orgId = id || '1';
    return this.http.get<any>(`${serviceConstants.apiURL}api/organization/getorganizationbyid/${orgId}`, httpOptions);
  }

  /**
   * Fetch master dropdown data (currencies, account emails) for Organization Add/Edit Modal
   * GET api/organization/GetMasterScreenData/{id}
   */
  getMasterScreenData(id: string): Observable<any> {
    const orgId = id || '1';
    return this.http.get<any>(`${serviceConstants.apiURL}api/organization/GetMasterScreenData/${orgId}`, httpOptions);
  }

  /**
   * Fetch Logi Composer Analytics configuration for Organizations
   * GET api/organization/GetOrgAnlyticsInfo
   */
  getOrgAnalyticsInfo(): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/organization/GetOrgAnlyticsInfo`, httpOptions);
  }

  /**
   * Fetch Default Authentication providers
   * GET api/configuration/GetDefaultAuthentication
   */
  getDefaultAuthentication(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/configuration/GetDefaultAuthentication`, httpOptions);
  }

  /**
   * Fetch master metadata for support users popup
   * GET api/appuser/getusersearchmaster
   */
  getUserSearchMaster(): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/appuser/getusersearchmaster`, httpOptions);
  }

  /**
   * Search / List support users under a specific organization
   * POST api/appuser/getadvsearch
   */
  getSupportUsersAdvSearch(search: {
    TITLE?: string;
    EMAIL?: string;
    DEPARTMENT_ID?: string;
    ROLEID?: string;
    RECORD_STATE?: number;
    ORGANIZATION_ID?: string;
  }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/appuser/getadvsearch`, search, httpOptions);
  }

  /**
   * Fetch users by type and organization ID
   * GET api/appuser/getusersbyid/{type}/{orgid}
   */
  getUsersByType(type: string, orgId: string): Observable<any[]> {
    const t = type || 'S';
    const oId = orgId || '1';
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/appuser/getusersbyid/${t}/${oId}`, httpOptions);
  }

  /**
   * Fetch FDA Debarment list
   * GET api/organization/GetDebarmentList
   */
  getDebarmentList(): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/organization/GetDebarmentList`, httpOptions);
  }

  /**
   * Update Debarment Block Status
   * POST api/organization/UpdateDebarmentBlockStatus?debarmentId=...&isBlocked=...
   */
  updateDebarmentBlockStatus(debarmentId: string, isBlocked: boolean): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/organization/UpdateDebarmentBlockStatus?debarmentId=${debarmentId}&isBlocked=${isBlocked}`,
      {},
      httpOptions
    );
  }

  /**
   * Insert / Create new Organization
   * POST api/organization/InsertOrganization
   */
  insertOrganization(model: any): Observable<any> {
    if (model instanceof FormData) {
      return this.http.post<any>(`${serviceConstants.apiURL}api/organization/InsertOrganization`, model);
    }
    return this.http.post<any>(`${serviceConstants.apiURL}api/organization/InsertOrganization`, model, httpOptions);
  }

  /**
   * Update existing Organization
   * POST api/organization/UpdateOrganization
   */
  updateOrganization(model: any): Observable<any> {
    if (model instanceof FormData) {
      return this.http.post<any>(`${serviceConstants.apiURL}api/organization/UpdateOrganization`, model);
    }
    return this.http.post<any>(`${serviceConstants.apiURL}api/organization/UpdateOrganization`, model, httpOptions);
  }

  /**
   * Insert support user under organization
   * POST api/appuser/insert
   */
  insertSupportUser(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/appuser/insert`, model, httpOptions);
  }

  /**
   * Sync Organization Dashboards in Analytics
   * POST api/organization/SyncDashboards
   */
  syncDashboards(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/organization/SyncDashboards`, model, httpOptions);
  }

  /**
   * Refresh Organization in Logi Composer
   * POST api/organization/RefreshOrg
   */
  refreshOrg(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/organization/RefreshOrg`, model, httpOptions);
  }

  /**
   * Validate Logi Analytics Configuration connection
   * POST api/organization/ValidateLogiConf
   */
  validateLogiConf(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/organization/ValidateLogiConf`, model, httpOptions);
  }

  /**
   * Check organization name exists
   * GET api/organization/checkorganizationname/{name}
   */
  checkOrganizationName(name: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/organization/checkorganizationname/${encodeURIComponent(name)}`, httpOptions);
  }

  /**
   * Check organization code exists
   * GET api/organization/checkorganizationcode/{code}
   */
  checkOrganizationCode(code: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/organization/checkorganizationcode/${encodeURIComponent(code)}`, httpOptions);
  }
}
