import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formOptions, httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class EapStudyTeamService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch Master data for Study Team
   * GET api/EAPStudyTeam/GetMasterData?ApplicationID={appId}
   */
  getStudyTeamMasterData(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPStudyTeam/GetMasterData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Master data for Study Team
   * GET api/EAPStudyTeam/GetMasterDataSearch?ApplicationID={appId}
   */
  getStudyTeamMasterDataSearch(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPStudyTeam/GetMasterDataSearch?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch Study Team members summary list
   * GET api/EAPStudyTeam/GetSummaryData?ApplicationID={appId}
   */
  getStudyTeamSummaryData(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/EAPStudyTeam/GetSummaryData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Study Team summary data
   * POST api/EAPStudyTeam/GetSummarySearchData
   */
  getStudyTeamSummarySearchData(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/EAPStudyTeam/GetSummarySearchData`,
      search,
      httpOptions
    );
  }

  /**
   * Edit Study Team member by record ID
   * GET api/EAPStudyTeam/Edit?RecordID={recordId}
   */
  editStudyTeam(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPStudyTeam/Edit?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Insert new study team member
   * POST api/EAPStudyTeam/Insert
   */
  insertStudyTeam(formData: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPStudyTeam/Insert`,
      formData,
      formOptions
    );
  }

  /**
   * Update study team member
   * POST api/EAPStudyTeam/Update
   */
  updateStudyTeam(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPStudyTeam/Update`,
      model,
      httpOptions
    );
  }

  /**
   * Insert EAP Organization
   * POST api/EAPOrganization/Insert
   */
  insertOrganization(formData: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPOrganization/Insert`,
      formData,
      formOptions
    );
  }

  /**
   * Fetch Review Board / IRB Data for EAP
   * GET api/EAPReviewBoard/GetReviewBoardData?ApplicationID={appId}
   */
  getReviewBoardData(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPReviewBoard/GetReviewBoardData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Insert Review Board
   * POST api/EAPReviewBoard/Insert
   */
  insertReviewBoard(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPReviewBoard/Insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update Review Board
   * POST api/EAPReviewBoard/Update
   */
  updateReviewBoard(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPReviewBoard/Update`,
      model,
      httpOptions
    );
  }
}

