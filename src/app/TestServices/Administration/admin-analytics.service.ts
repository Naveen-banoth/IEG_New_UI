import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

export interface OrgDashboardDetails {
  OrgId?: string;
  OrgName?: string;
  IST?: boolean;
  EAP?: boolean;
  GRANTS?: boolean;
  IS_ORG_ACCOUNT_IN_LOGI?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAnalyticsService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch analytics dashboard list / details
   * POST api/Analytics/GetAnalyticsDashboardsDetails
   */
  getDashboardsDetails(obj: any = {}): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/Analytics/GetAnalyticsDashboardsDetails`,
      obj,
      httpOptions
    );
  }

  /**
   * Fetch specific analytics dashboard by ID
   * GET api/Analytics/GetAnalyticsDashboardsDetailsByID/{ID}
   */
  getDashboardsDetailsID(id: string): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Analytics/GetAnalyticsDashboardsDetailsByID/${encodeURIComponent(id)}`,
      httpOptions
    );
  }

  /**
   * Update analytics dashboard configuration
   * POST api/Analytics/UpdateAnalyticsDashboardDetails
   */
  updateAnalyticsDashboardDetails(obj: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/Analytics/UpdateAnalyticsDashboardDetails`,
      obj,
      httpOptions
    );
  }

  /**
   * Fetch dashboards assigned to current user
   * GET api/Analytics/GetUserDashboards/
   */
  getUserDashboards(): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Analytics/GetUserDashboards/`,
      httpOptions
    );
  }

  /**
   * Sync dashboards for an organization
   * POST api/organization/SyncDashboards
   */
  postOrgDetails(obj: OrgDashboardDetails): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/organization/SyncDashboards`,
      obj,
      httpOptions
    );
  }

  /**
   * Refresh organization analytics configuration
   * POST api/organization/RefreshOrg
   */
  refreshOrgDetails(obj: OrgDashboardDetails): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/organization/RefreshOrg`,
      obj,
      httpOptions
    );
  }

  /**
   * Check if analytics update is enabled on dashboard click
   * GET api/Analytics/IsAnalyticsUpdateEnabledWhileDashboardClick
   */
  fetchUpdatedAnalytics(): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Analytics/IsAnalyticsUpdateEnabledWhileDashboardClick`,
      httpOptions
    );
  }
}
