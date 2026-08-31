import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class IstActivitiesPublicationsService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch Activities & Seminars summary
   * GET api/ISTActivitiesseminars/getSummaryData?ApplicationID={appId}
   */
  getActivitiesSummaryData(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTActivitiesseminars/getSummaryData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch Activities master drop data
   * GET api/ISTActivitiesseminars/GetMasterDropData?ApplicationID={appId}
   */
  getActivitiesMasterDropData(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTActivitiesseminars/GetMasterDropData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Activities & Seminars summary
   * POST api/ISTActivitiesseminars/getSummarySearchData
   */
  getActivitiesSummarySearch(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/ISTActivitiesseminars/getSummarySearchData`,
      search,
      httpOptions
    );
  }

  /**
   * Insert new activity
   * POST api/ISTActivitiesseminars/Insert
   */
  insertActivity(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTActivitiesseminars/Insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update activity
   * POST api/ISTActivitiesseminars/Update
   */
  updateActivity(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTActivitiesseminars/Update`,
      model,
      httpOptions
    );
  }

  /**
   * Fetch Publications summary
   * GET api/ISTPublications/getSummaryData?ApplicationID={appId}
   */
  getPublicationsSummaryData(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTPublications/getSummaryData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch Publications master drop data
   * GET api/ISTPublications/GetMasterDropData?ApplicationID={appId}
   */
  getPublicationsMasterDropData(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTPublications/GetMasterDropData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Publications summary
   * POST api/ISTPublications/getSummarySearchData
   */
  getPublicationsSummarySearch(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/ISTPublications/getSummarySearchData`,
      search,
      httpOptions
    );
  }

  /**
   * Insert publication
   * POST api/ISTPublications/Insert
   */
  insertPublication(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTPublications/Insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update publication
   * POST api/ISTPublications/Update
   */
  updatePublication(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTPublications/Update`,
      model,
      httpOptions
    );
  }

  /**
   * Fetch Site Evaluation summary
   * GET api/ISTSiteevaluation/getSummaryData?ApplicationID={appId}
   */
  getSiteEvaluationSummary(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTSiteevaluation/getSummaryData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Site Evaluation summary
   * POST api/ISTSiteevaluation/getSummarySearchData
   */
  getSiteEvaluationSearch(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/ISTSiteevaluation/getSummarySearchData`,
      search,
      httpOptions
    );
  }

  /**
   * Insert Site Evaluation
   * POST api/ISTSiteevaluation/Insert
   */
  insertSiteEvaluation(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTSiteevaluation/Insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update Site Evaluation
   * POST api/ISTSiteevaluation/Update
   */
  updateSiteEvaluation(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTSiteevaluation/Update`,
      model,
      httpOptions
    );
  }
}
