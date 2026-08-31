import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonCriteriaService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch modules list for screens configuration
   * GET api/screen/getmodules/
   */
  getModules(): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/screen/getmodules/`,
      httpOptions
    );
  }

  /**
   * Fetch screens list by Module ID
   * GET api/screen/getscreenlist/{ModuleId}
   */
  getScreenList(moduleId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/screen/getscreenlist/${moduleId}`,
      httpOptions
    );
  }

  /**
   * Advanced search for screens
   * POST api/screen/getscreenlistadvance
   */
  getScreenListAdvance(search: any = { MODULE_ID: '1', STATUS: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/screen/getscreenlistadvance`,
      search,
      httpOptions
    );
  }

  /**
   * Fetch standard screen controls for dynamic rendering
   * GET api/screen/fetchscreencontrols/{ScreenId}/{AppId}
   */
  fetchScreenControls(screenId: string = '1', appId: string = '0'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/screen/fetchscreencontrols/${screenId}/${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch extended dynamic controls
   * GET api/screen/fetchextendedcontrols/{ScreenId}/{AppId}
   */
  fetchExtendedControls(screenId: string = '1', appId: string = '0'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/screen/fetchextendedcontrols/${screenId}/${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch response controls list
   * GET api/screen/fetchresponsecontrols/{ScreenId}/{AppId}
   */
  fetchResponseControls(screenId: string = '1', appId: string = '0'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/screen/fetchresponsecontrols/${screenId}/${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch screen control master list
   * GET api/screencontrol/getscreencontrolslist/{ScreenId}
   */
  getScreenControlsList(screenId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/screencontrol/getscreencontrolslist/${screenId}`,
      httpOptions
    );
  }

  /**
   * Fetch saved screen response values
   * POST api/screenresponse/getscreenresponse
   */
  getScreenResponse(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/screenresponse/getscreenresponse`,
      model,
      httpOptions
    );
  }

  /**
   * Fetch single row screen response
   * POST api/screenresponse/getscreenresponserow
   */
  getScreenResponseRow(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/screenresponse/getscreenresponserow`,
      model,
      httpOptions
    );
  }

  /**
   * Fetch extended screen response by IDs
   * GET api/screenresponse/getextendedscreenresponse/{ScreenId}/{RecordId}
   */
  getExtendedScreenResponse(screenId: string = '1', recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/screenresponse/getextendedscreenresponse/${screenId}/${recordId}`,
      httpOptions
    );
  }

  /**
   * Insert dynamic screen response
   * POST api/screenresponse/insert
   */
  insertScreenResponse(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/screenresponse/insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update dynamic screen response
   * POST api/screenresponse/update
   */
  updateScreenResponse(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/screenresponse/update`,
      model,
      httpOptions
    );
  }

  /**
   * Save user column preferences
   * POST api/CommonCriteria/SaveUserPreferencesColumns
   */
  saveUserPreferencesColumns(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/CommonCriteria/SaveUserPreferencesColumns`,
      model,
      httpOptions
    );
  }
}

