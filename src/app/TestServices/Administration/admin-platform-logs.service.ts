import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminPlatformLogsService {

  constructor(private http: HttpClient) {}

  // ==================== 1. THEME TEMPLATES ====================

  /**
   * Fetch themes summary data
   * GET api/themetype/SummaryData
   */
  getThemeSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/themetype/SummaryData`, httpOptions);
  }

  /**
   * Search themes
   * POST api/themetype/search
   */
  searchThemes(search: any = { NAME: '', STATUS: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/themetype/search`, search, httpOptions);
  }

  /**
   * Fetch single theme by ID for edit
   * GET api/themetype/Edit/{id}
   */
  getThemeById(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/themetype/Edit/${id}`, httpOptions);
  }

  /**
   * Insert theme
   * POST api/themetype/Insert
   */
  insertTheme(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/themetype/Insert`, model, httpOptions);
  }

  /**
   * Update theme
   * POST api/themetype/Update
   */
  updateTheme(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/themetype/Update`, model, httpOptions);
  }

  /**
   * Set theme as default
   * GET api/themetype/makedefault/{id}
   */
  makeThemeDefault(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/themetype/makedefault/${id}`, httpOptions);
  }

  /**
   * Delete theme
   * GET api/themetype/delete/{id}
   */
  deleteTheme(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/themetype/delete/${id}`, httpOptions);
  }

  // ==================== 2. ADMIN AUDIT TRAIL / LOGS ====================

  /**
   * Search / List Admin Audit Trail entries
   * POST api/AdminAuditTrail/GetAuditTrailSearchSummary
   */
  getAuditTrailSearchSummary(search: any = {
    ModuleId: '-1',
    UserId: '-1',
    OperationType: '-1',
    StartDate: '',
    EndDate: ''
  }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/AdminAuditTrail/GetAuditTrailSearchSummary`, search, httpOptions);
  }

  /**
   * Fetch all Organization Users list for audit filter dropdown
   * GET api/AdminAuditTrail/GetAllOrgUsersList
   */
  getAllOrgUsersList(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/AdminAuditTrail/GetAllOrgUsersList`, httpOptions);
  }

  // ==================== 3. USER LOGIN LOGS ====================

  /**
   * Fetch Advanced User Login Log records
   * POST api/common/getadvuserlog
   */
  getAdvancedUserLoginLogs(search: any = {
    UserName: '',
    FromDate: '',
    ToDate: '',
    Status: '-1'
  }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/common/getadvuserlog`, search, httpOptions);
  }

  // ==================== 4. ANALYTICS & DASHBOARDS ====================

  /**
   * Get Analytics Dashboards Details
   * POST api/Analytics/GetAnalyticsDashboardsDetails
   */
  getAnalyticsDashboardsDetails(model: any = { DashboardId: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/Analytics/GetAnalyticsDashboardsDetails`, model, httpOptions);
  }

  /**
   * Get Analytics Dashboard Details By ID
   * GET api/Analytics/GetAnalyticsDashboardsDetailsByID/{id}
   */
  getAnalyticsDashboardDetailsById(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/Analytics/GetAnalyticsDashboardsDetailsByID/${id}`, httpOptions);
  }

  /**
   * Update Analytics Dashboard Details
   * POST api/Analytics/UpdateAnalyticsDashboardDetails
   */
  updateAnalyticsDashboardDetails(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/Analytics/UpdateAnalyticsDashboardDetails`, model, httpOptions);
  }

  /**
   * Get User Dashboards
   * GET api/Analytics/GetUserDashboards/
   */
  getUserDashboards(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/Analytics/GetUserDashboards/`, httpOptions);
  }

  /**
   * Check if analytics update is enabled on dashboard click
   * GET api/Analytics/IsAnalyticsUpdateEnabledWhileDashboardClick
   */
  isAnalyticsUpdateEnabled(): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/Analytics/IsAnalyticsUpdateEnabledWhileDashboardClick`, httpOptions);
  }
}

