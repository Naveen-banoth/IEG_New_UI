import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formOptions, httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class EapGeneralInfoService {

  constructor(private http: HttpClient) { }

  /**
   * Fetch EAP applications list
   * GET api/EAPGeneralInfo/GetALLEAPApplicationsList
   */
  getApplicationsList(): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/EAPGeneralInfo/GetALLEAPApplicationsList`
    );
  }

  /**
   * Summary search for EAP applications
   * POST api/EAPGeneralInfo/getALLEapSummarySearch
   */
  getSummarySearch(search: any = { SearchText: '', Status: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/EAPGeneralInfo/getALLEapSummarySearch`,
      search,
      httpOptions
    );
  }

  /**
   * Fetch master dropdown data for EAP application
   * GET api/EAPGeneralInfo/GetMasterList?ApplicationID={appId}
   */
  getMasterList(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPGeneralInfo/GetMasterList?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch My EAP Applications grid list
   * GET api/EAPGeneralInfo/GetMyEAPApplicationsList
   */
  getMyApplicationsList(): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/EAPGeneralInfo/GetMyEAPApplicationsList`
    );
  }

  /**
   * Search within My EAP Applications
   * POST api/EAPMyApplications/getMySummarySearch
   */
  getMySummarySearch(search: any = { SearchText: '' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/EAPMyApplications/getMySummarySearch`,
      search,
      httpOptions
    );
  }

  /**
   * Fetch application change logs
   * GET api/EAPGeneralInfo/GetApp_ChangeLog?ApplicationID={appId}
   */
  getAppChangeLog(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/EAPGeneralInfo/GetApp_ChangeLog?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Check EAP application submit validations
   * GET api/EAPGeneralInfo/EAP_APPSubmitValidation?ApplicationID={appId}
   */
  getAppSubmitValidation(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPGeneralInfo/EAP_APPSubmitValidation?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Insert new EAP general info
   * POST api/EAPGeneralInfo/Insert
   */
  insertGeneralInfo(formData: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPGeneralInfo/Insert`,
      formData,
      formOptions
    );
  }

  /**
   * Update EAP general info
   * POST api/EAPGeneralInfo/Update
   */
  updateGeneralInfo(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPGeneralInfo/Update`,
      model,
      httpOptions
    );
  }

  /**
   * Insert EAP organization mapping
   * POST api/EAPOrganization/Insert
   */
  insertOrganization(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPOrganization/Insert`,
      model,
      httpOptions
    );
  }

  /**
   * Save EAP application change log
   * POST api/EAPGeneralInfo/SaveApp_ChangeLog
   */
  saveAppChangeLog(data: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPGeneralInfo/SaveApp_ChangeLog`,
      data,
      httpOptions
    );
  }
}

