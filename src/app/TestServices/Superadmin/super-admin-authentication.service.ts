import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminAuthenticationService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch available authentication types (SAML, LDAP, etc.)
   * GET api/configuration/getauthtypes
   */
  getAuthTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/configuration/getauthtypes`, httpOptions);
  }

  /**
   * Search / List configured authentications
   * POST api/Configuration/GetAuthSearchSummary
   */
  getAuthSearchSummary(search: {
    AuthName?: string;
    AuthType?: string;
    Status?: string;
  }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/Configuration/GetAuthSearchSummary`, search, httpOptions);
  }

  /**
   * Fetch single authentication configuration details by Auth ID
   * GET api/configuration/getauthbyid?AuthId={AuthId}
   */
  getAuthById(authId: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/configuration/getauthbyid?AuthId=${authId}`, httpOptions);
  }

  /**
   * Fetch authentications mapped to an Organization
   * GET api/configuration/GetAuthenticationsByOrgId?orgId={orgId}
   */
  getAuthenticationsByOrgId(orgId: string): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/configuration/GetAuthenticationsByOrgId?orgId=${orgId}`, httpOptions);
  }

  /**
   * Insert / Save SAML Authentication Configuration
   * POST api/configuration/insertsaml
   */
  insertSAML(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/configuration/insertsaml`, model, httpOptions);
  }

  /**
   * Insert / Save LDAP Authentication Configuration
   * POST api/configuration/insertldap
   */
  insertLDAP(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/configuration/insertldap`, model, httpOptions);
  }

  /**
   * Insert / Save Email (Direct) Authentication Configuration
   * POST api/configuration/insertemail
   */
  insertEmail(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/configuration/insertemail`, model, httpOptions);
  }

  /**
   * Upload / Update Authentication Configuration Metadata
   * POST api/configuration/upload
   */
  uploadAuth(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/configuration/upload`, model, httpOptions);
  }
}
