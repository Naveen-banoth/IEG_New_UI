import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formOptions, httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class GrantsStudyTeamService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch Study Team summary data
   * GET api/gmstudyteam/getsummarydata?ApplicationID={appId}
   */
  getStudyTeamSummary(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/gmstudyteam/getsummarydata?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Study Team summary data
   * POST api/gmstudyteam/getsummarysearchdata
   */
  getStudyTeamSearch(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/gmstudyteam/getsummarysearchdata`,
      search,
      httpOptions
    );
  }

  /**
   * Fetch Study Team master dropdowns
   * GET api/gmstudyteam/getmasterdata?ApplicationID={appId}
   */
  getStudyTeamMaster(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmstudyteam/getmasterdata?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Insert study team member
   * POST api/gmstudyteam/insert
   */
  insertStudyTeam(formData: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/gmstudyteam/insert`,
      formData,
      formOptions
    );
  }

  /**
   * Update study team member
   * POST api/gmstudyteam/update
   */
  updateStudyTeam(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/gmstudyteam/update`,
      model,
      httpOptions
    );
  }

  /**
   * Fetch Milestones summary
   * GET api/gmmilestones/getsummarydata?ApplicationID={appId}
   */
  getMilestonesSummary(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/gmmilestones/getsummarydata?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Milestones summary
   * POST api/gmmilestones/getsummarysearchdata
   */
  getMilestonesSearch(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/gmmilestones/getsummarysearchdata`,
      search,
      httpOptions
    );
  }

  /**
   * Insert milestone
   * POST api/gmmilestones/insert
   */
  insertMilestone(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/gmmilestones/insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update milestone
   * POST api/gmmilestones/update
   */
  updateMilestone(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/gmmilestones/update`,
      model,
      httpOptions
    );
  }

  /**
   * Delete study team member
   * GET api/gmstudyteam/delete/{id}
   */
  deleteStudyTeam(id: string = '9999'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmstudyteam/delete/${id}`,
      httpOptions
    );
  }

  /**
   * Delete milestone
   * GET api/gmmilestones/delete/{id}
   */
  deleteMilestone(id: string = '9999'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmmilestones/delete/${id}`,
      httpOptions
    );
  }
}
