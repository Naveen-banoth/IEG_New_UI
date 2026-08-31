import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formOptions, httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class IstStudyTeamService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch Master data for Study Team
   * GET api/ISTStudyTeam/GetMasterData?ApplicationID={appId}
   */
  getStudyTeamMasterData(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTStudyTeam/GetMasterData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Master data for Study Team
   * GET api/ISTStudyTeam/GetMasterDataSearch?ApplicationID={appId}
   */
  getStudyTeamMasterDataSearch(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTStudyTeam/GetMasterDataSearch?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch Study Team members summary list
   * GET api/ISTStudyTeam/GetSummaryData?ApplicationID={appId}
   */
  getStudyTeamSummaryData(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTStudyTeam/GetSummaryData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Study Team summary data
   * POST api/ISTStudyTeam/GetSummarySearchData
   */
  getStudyTeamSummarySearchData(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/ISTStudyTeam/GetSummarySearchData`,
      search,
      httpOptions
    );
  }

  /**
   * Edit Study Team member by record ID
   * GET api/ISTStudyTeam/Edit?RecordID={recordId}
   */
  editStudyTeam(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTStudyTeam/Edit?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Insert new study team member
   * POST api/ISTStudyTeam/Insert
   */
  insertStudyTeam(formData: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTStudyTeam/Insert`,
      formData,
      formOptions
    );
  }

  /**
   * Update study team member
   * POST api/ISTStudyTeam/Update
   */
  updateStudyTeam(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTStudyTeam/Update`,
      model,
      httpOptions
    );
  }

  /**
   * Insert IST Organization
   * POST api/ISTOrganization/Insert
   */
  insertOrganization(formData: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTOrganization/Insert`,
      formData,
      formOptions
    );
  }

  /**
   * Fetch Review Board / IRB Data for IST
   * GET api/ISTReviewBoard/GetReviewBoardData?ApplicationID={appId}
   */
  getReviewBoardData(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTReviewBoard/GetReviewBoardData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Insert Review Board record
   * POST api/ISTReviewBoard/Insert
   */
  insertReviewBoard(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTReviewBoard/Insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update Review Board record
   * POST api/ISTReviewBoard/Update
   */
  updateReviewBoard(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTReviewBoard/Update`,
      model,
      httpOptions
    );
  }
}
