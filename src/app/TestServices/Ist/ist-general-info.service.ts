import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formOptions, httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class IstGeneralInfoService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch IST applications list
   * POST api/ISTGeneralInfo/GetApplicationsList
   */
  getApplicationsList(search: any = { Status: 'ALL', PageIndex: 1, PageSize: 10 }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/ISTGeneralInfo/GetApplicationsList`,
      search,
      httpOptions
    );
  }

  /**
   * Summary search for IST applications
   * POST api/ISTGeneralInfo/getSummarySearch
   */
  getSummarySearch(search: any = { SearchText: '', Status: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/ISTGeneralInfo/getSummarySearch`,
      search,
      httpOptions
    );
  }

  /**
   * Fetch master dropdown data for IST application
   * GET api/ISTGeneralInfo/GetMasterList?ApplicationID={appId}
   */
  getMasterList(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTGeneralInfo/GetMasterList?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch My IST Applications grid list
   * POST api/ISTMyApplications/GetMyApplicationsList
   */
  getMyApplicationsList(search: any = { PageIndex: 1, PageSize: 10 }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/ISTMyApplications/GetMyApplicationsList`,
      search,
      httpOptions
    );
  }

  /**
   * Search within My IST Applications
   * POST api/ISTMyApplications/getMySummarySearch
   */
  getMySummarySearch(search: any = { SearchText: '' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/ISTMyApplications/getMySummarySearch`,
      search,
      httpOptions
    );
  }

  /**
   * Fetch application change logs
   * GET api/ISTGeneralInfo/GetApp_ChangeLog?ApplicationID={appId}
   */
  getAppChangeLog(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTGeneralInfo/GetApp_ChangeLog?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Check IST application submit validations
   * GET api/ISTGeneralInfo/IST_APPSubmitValidation?ApplicationID={appId}
   */
  getAppSubmitValidation(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTGeneralInfo/IST_APPSubmitValidation?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Insert new IST general info
   * POST api/ISTGeneralInfo/Insert
   */
  insertGeneralInfo(formData: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTGeneralInfo/Insert`,
      formData,
      formOptions
    );
  }

  /**
   * Update IST general info
   * POST api/ISTGeneralInfo/Update
   */
  updateGeneralInfo(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTGeneralInfo/Update`,
      model,
      httpOptions
    );
  }

  /**
   * Insert IST organization mapping
   * POST api/ISTOrganization/Insert
   */
  insertOrganization(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTOrganization/Insert`,
      model,
      httpOptions
    );
  }

  /**
   * Save IST application change log
   * POST api/ISTGeneralInfo/SaveApp_ChangeLog
   */
  saveAppChangeLog(data: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTGeneralInfo/SaveApp_ChangeLog`,
      data,
      httpOptions
    );
  }
}

