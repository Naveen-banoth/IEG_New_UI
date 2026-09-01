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
  getAdvSearch(search: any): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/organization/getadvsearch`, search, httpOptions);
  }

  /**
   * Fetch all organizations
   * GET api/organization/getorganizatoins/{name}
   */
  getOrganizations(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/organization/getorganizatoins/${name}`, httpOptions);
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
    return this.http.get<any>(`${serviceConstants.apiURL}api/organization/getorganizationbyid/${id}`, httpOptions);
  }

  /**
   * Fetch master dropdown data (currencies, account emails) for Organization Add/Edit Modal
   * GET api/organization/GetMasterScreenData/{id}
   */
  getMasterScreenData(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/organization/GetMasterScreenData/${id}`, httpOptions);
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
  getSupportUsersAdvSearch(search: any): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/appuser/getadvsearch`, search, httpOptions);
  }

  /**
   * Fetch users by type and organization ID
   * GET api/appuser/getusersbyid/{type}/{orgid}
   */
  getUsersByType(type: string, orgId: string): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/appuser/getusersbyid/${type}/${orgId}`, httpOptions);
  }

  /**
   * Insert / Create new Organization
   * POST api/organization/InsertOrganization
   */
  insertOrganization(data: FormData | any): Observable<any> {
    if (data instanceof FormData) {
      if (!data.has('FileType')) {
        data.append('FileType', 'IMAGE');
      }
      return this.http.post<any>(`${serviceConstants.apiURL}api/organization/InsertOrganization`, data);
    }
    const formData = new FormData();
    formData.append('ScreenData', JSON.stringify(data));
    formData.append('FileType', 'IMAGE');
    return this.http.post<any>(`${serviceConstants.apiURL}api/organization/InsertOrganization`, formData);
  }

  /**
   * Update existing Organization
   * POST api/organization/UpdateOrganization
   */
  updateOrganization(data: FormData | any): Observable<any> {
    if (data instanceof FormData) {
      if (!data.has('FileType')) {
        data.append('FileType', 'IMAGE');
      }
      return this.http.post<any>(`${serviceConstants.apiURL}api/organization/UpdateOrganization`, data);
    }
    const formData = new FormData();
    formData.append('ScreenData', JSON.stringify(data));
    formData.append('FileType', 'IMAGE');
    return this.http.post<any>(`${serviceConstants.apiURL}api/organization/UpdateOrganization`, formData);
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
