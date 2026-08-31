import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class UmAuditLogService {

  constructor(private http: HttpClient) {}

  /**
   * Search Superadmin Audit Log records
   * POST api/SuperAdminAuditLog/GetAuditLogRecordList/
   */
  searchAuditRecords(model: any = { Category: 'Organization', Name: '', StartDate: '', EndDate: '' }): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/SuperAdminAuditLog/GetAuditLogRecordList/`,
      model,
      httpOptions
    );
  }

  /**
   * Fetch specific revision details
   * POST api/SuperAdminAuditLog/GetAuditLogDetailsList
   */
  getAuditLogDetailsList(versionId: any = { versionIDs: ['1'], categories: 'Organization' }): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/SuperAdminAuditLog/GetAuditLogDetailsList`,
      versionId,
      httpOptions
    );
  }

  /**
   * Fetch revision timeline for a record
   * GET api/SuperAdminAuditLog/GetAuditLogRevisionList?RelatedPkId={name}&CatergoryType={categoryType}
   */
  getAuditLogRevisionList(name: string = '1', categoryType: string = 'Organization'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/SuperAdminAuditLog/GetAuditLogRevisionList?RelatedPkId=${name}&CatergoryType=${categoryType}`,
      httpOptions
    );
  }

  /**
   * Search IEG Activity logs across modules
   * POST api/IEGAuditActivityLogs/GetIEGActivityLogSearch
   */
  getActivityLogsSearch(search: any = { ModuleName: 'IST', PageIndex: 1, PageSize: 10 }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/IEGAuditActivityLogs/GetIEGActivityLogSearch`,
      search,
      httpOptions
    );
  }

  /**
   * Fetch Activity Log for specific Application ID
   * GET api/IEGAuditActivityLogs/GetIEGActivityLogByApplicationId?ApplicationId={appId}
   */
  getActivityLogByAppId(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/IEGAuditActivityLogs/GetIEGActivityLogByApplicationId?ApplicationId=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch multi-criteria activity log summary
   * POST api/IEGAuditActivityLogs/GetIEGAuditLogMultiSummary
   */
  getAuditLogMultiSummary(model: any = { ModuleName: 'IST' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/IEGAuditActivityLogs/GetIEGAuditLogMultiSummary`,
      model,
      httpOptions
    );
  }

  /**
   * Fetch all active organization users for activity filters
   * GET api/IEGAuditActivityLogs/GetAllOrgUsersList?ModuleName={moduleName}
   */
  getAllOrgUsersList(moduleName: string = 'IST'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/IEGAuditActivityLogs/GetAllOrgUsersList?ModuleName=${moduleName}`,
      httpOptions
    );
  }

  /**
   * Fetch application IDs list for activity log filter dropdowns
   * GET api/IEGAuditActivityLogs/GetApplicationIdsList?ModuleName={moduleName}
   */
  getApplicationIdsList(moduleName: string = 'IST'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/IEGAuditActivityLogs/GetApplicationIdsList?ModuleName=${moduleName}`,
      httpOptions
    );
  }

  /**
   * Fetch Grant Types for activity log filter
   * GET api/IEGAuditActivityLogs/GetGrantTypes?ModuleName={moduleName}
   */
  getGrantTypes(moduleName: string = 'GM'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/IEGAuditActivityLogs/GetGrantTypes?ModuleName=${moduleName}`,
      httpOptions
    );
  }

  /**
   * Fetch Screen names list for activity log filtering
   * GET api/IEGAuditActivityLogs/GetScreenNameList?ModuleName={moduleName}
   */
  getScreenNameList(moduleName: string = 'IST'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/IEGAuditActivityLogs/GetScreenNameList?ModuleName=${moduleName}`,
      httpOptions
    );
  }
}
