import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminAuditLogService {

  constructor(private http: HttpClient) {}

  /**
   * Search / Get Super Admin Audit Log records list
   * POST api/SuperAdminAuditLog/GetAuditLogRecordList
   */
  getAuditLogRecordList(search: {
    Category: string;
    Name?: string;
    StartDate?: string;
    EndDate?: string;
  }): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/SuperAdminAuditLog/GetAuditLogRecordList`, search, httpOptions);
  }

  /**
   * Get Super Admin Audit Log revision list for a specific record
   * GET api/SuperAdminAuditLog/GetAuditLogRevisionList?RelatedPkId=...&CatergoryType=...
   */
  getAuditLogRevisionList(relatedPkId: string, categoryType: string): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/SuperAdminAuditLog/GetAuditLogRevisionList?RelatedPkId=${encodeURIComponent(relatedPkId || '')}&CatergoryType=${encodeURIComponent(categoryType || '')}`,
      httpOptions
    );
  }

  /**
   * Get Super Admin Audit Log details list
   * POST api/SuperAdminAuditLog/GetAuditLogDetailsList
   */
  getAuditLogDetailsList(param: {
    versionIDs: any[];
    categories: string;
  }): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/SuperAdminAuditLog/GetAuditLogDetailsList`, param, httpOptions);
  }
}
