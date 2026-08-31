import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonSummaryService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch Salutation / Prefix lookups for an organization
   * GET api/appuser/getPrefixlkps/{orgCode}
   */
  getPrefixLkps(orgCode: string = 'DEFAULT'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/appuser/getPrefixlkps/${orgCode}`,
      httpOptions
    );
  }

  /**
   * Fetch States summary / list for a module
   * GET api/state/SummaryData?moduleId={moduleId}
   */
  getStatesSummary(moduleId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/state/SummaryData?moduleId=${moduleId}`,
      httpOptions
    );
  }

  /**
   * Fetch single state by ID
   * GET api/state/getstatebyid/{stateId}
   */
  getStateById(stateId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/state/getstatebyid/${stateId}`,
      httpOptions
    );
  }

  /**
   * Fetch IEG application build version
   * GET api/appuser/fetchiegbuildversion
   */
  getBuildVersion(): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/appuser/fetchiegbuildversion`,
      httpOptions
    );
  }

  /**
   * Fetch Policy Version Details by Module Code
   * GET api/screen/PolicyVersionDetails?moduleCode={moduleCode}
   */
  getPolicyVersionDetails(moduleCode: string = 'IST'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/screen/PolicyVersionDetails?moduleCode=${moduleCode}`,
      httpOptions
    );
  }

  /**
   * Save feature guideline & template documents
   * POST api/CommonSummary/SaveFeatureDocuments
   */
  saveFeatureDocuments(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/CommonSummary/SaveFeatureDocuments`,
      model,
      httpOptions
    );
  }
}

