import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formOptions, httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class EapMilestonesService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch Milestones summary for an application
   * GET api/EAPMilestones/getSummaryData?ApplicationID={appId}
   */
  getMilestonesSummaryData(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/EAPMilestones/getSummaryData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Milestones summary
   * POST api/EAPMilestones/getSummarySearchData
   */
  getMilestonesSummarySearchData(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/EAPMilestones/getSummarySearchData`,
      search,
      httpOptions
    );
  }

  /**
   * Edit milestone by record ID
   * GET api/EAPMilestones/Edit?RecordID={recordId}
   */
  editMilestone(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPMilestones/Edit?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Insert new milestone
   * POST api/EAPMilestones/Insert
   */
  insertMilestone(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPMilestones/Insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update milestone
   * POST api/EAPMilestones/Update
   */
  updateMilestone(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPMilestones/Update`,
      model,
      httpOptions
    );
  }

  /**
   * Send notification for milestone
   * GET api/EAPMilestones/MilestoneSendNotification/{id}
   */
  sendMilestoneNotification(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPMilestones/MilestoneSendNotification/${id}`,
      httpOptions
    );
  }

  /**
   * Fetch Study Reports summary for an application
   * GET api/EAPStudyreports/getSummaryData?ApplicationID={appId}
   */
  getStudyReportsSummaryData(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/EAPStudyreports/getSummaryData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch Study Reports master data
   * GET api/EAPStudyreports/GetMasterData?ApplicationID={appId}
   */
  getStudyReportsMasterData(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPStudyreports/GetMasterData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Study Reports summary
   * POST api/EAPStudyreports/getSummarySearchData
   */
  getStudyReportsSummarySearchData(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/EAPStudyreports/getSummarySearchData`,
      search,
      httpOptions
    );
  }

  /**
   * Insert study report
   * POST api/EAPStudyreports/Insert
   */
  insertStudyReport(formData: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPStudyreports/Insert`,
      formData,
      formOptions
    );
  }

  /**
   * Update study report
   * POST api/EAPStudyreports/Update
   */
  updateStudyReport(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPStudyreports/Update`,
      model,
      httpOptions
    );
  }

  /**
   * Edit study report by record ID
   * GET api/EAPStudyreports/Edit?RecordID={recordId}
   */
  editStudyReport(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPStudyreports/Edit?RecordID=${recordId}`,
      httpOptions
    );
  }
}

