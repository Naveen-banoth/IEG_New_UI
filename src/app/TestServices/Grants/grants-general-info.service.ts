import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formOptions, httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class GrantsGeneralInfoService {

  constructor(private http: HttpClient) { }

  /**
   * Fetch Grants application summary
   * GET api/gmmyapplications/getapplicationsummary/{appId}
   */
  getApplicationSummary(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmmyapplications/getapplicationsummary/${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch Grants applications list
   * POST api/gmapp/getadvsearch
   */
  getAdvSearch(formData: any = { TYPE: 'A' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/gmapp/getadvsearch`,
      formData,
      httpOptions
    );
  }

  /**
   * Fetch Grants applications list
   * GET api/gmapp/getallapplications
   */
  getApplicationsList(): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/gmapp/getallapplications`
    );
  }

  /**
   * Fetch user (My) grants applications list
   * POST api/gmapp/getadvsearch
   */
  getMyApplicationsList(formData: any = { TYPE: 'M' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/gmapp/getadvsearch`,
      formData,
      httpOptions
    );
  }

  /**
   * Fetch Audience summary
   * GET api/gmaudience/fetchsummary/{appId}
   */
  getAudienceSummary(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/gmaudience/fetchsummary/${appId}`,
      httpOptions
    );
  }

  /**
   * Advanced search audience summary
   * POST api/gmaudience/fetchsummaryadv
   */
  getAudienceAdvSummary(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/gmaudience/fetchsummaryadv`,
      search,
      httpOptions
    );
  }

  /**
   * Fetch Audience lookup list
   * GET api/gmaudience/getlookuplist
   */
  getAudienceLookupList(): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/gmaudience/getlookuplist`,
      httpOptions
    );
  }

  /**
   * Fetch Audience master list with parameters
   * GET api/gmaudience/getlookuplist?id={id}&AppID={appId}
   */
  getAudienceMasterList(id: string = '1', appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/gmaudience/getlookuplist?id=${id}&AppID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch Lookup List for audience search
   * GET api/gmaudience/getLookupListForSearch/{id}/{appId}
   */
  getLookupListForSearch(id: string = '1', appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/gmaudience/getLookupListForSearch/${id}/${appId}`,
      httpOptions
    );
  }

  /**
   * Insert Audience
   * POST api/gmaudience/insert
   */
  insertAudience(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/gmaudience/insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update Audience
   * POST api/gmaudience/update
   */
  updateAudience(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/gmaudience/update`,
      model,
      httpOptions
    );
  }

  /**
   * Delete Audience
   * GET api/gmaudience/delete/{id}
   */
  deleteAudience(id: string = '9999'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmaudience/delete/${id}`,
      httpOptions
    );
  }

  /**
   * Fetch Delivery Format list
   * GET api/gmdeliveryformat/getdeliveryformat
   */
  getDeliveryFormatList(): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/gmdeliveryformat/getdeliveryformat`,
      httpOptions
    );
  }

  /**
   * Fetch Delivery Format summary
   * GET api/gmdeliveryformat/getdeliveryformat?id={id}&AppId={appId}
   */
  getDeliveryFormatSummary(id: string = '1', appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmdeliveryformat/getdeliveryformat?id=${id}&AppId=${appId}`,
      httpOptions
    );
  }

  /**
   * Insert Delivery Format
   * POST api/gmdeliveryformat/insertdeliveryformat
   */
  insertDeliveryFormat(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/gmdeliveryformat/insertdeliveryformat`,
      model,
      httpOptions
    );
  }

  /**
   * Fetch Therapeutic Area list
   * GET api/gmdeliveryformat/gettherapeuticarealist
   */
  getTherapeuticAreaList(): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/gmdeliveryformat/gettherapeuticarealist`,
      httpOptions
    );
  }

  /**
   * Fetch uploaded documents
   * GET api/gmdocumentupload/getdocumentupload/{id}
   */
  getDocumentUpload(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmdocumentupload/getdocumentupload/${id}`,
      httpOptions
    );
  }

  /**
   * Fetch Assessment summary
   * GET api/gmassessment/fetchsummary?ApplicationID={appId}
   */
  getAssessmentSummary(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/gmassessment/fetchsummary?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Insert Assessment
   * POST api/gmassessment/insert
   */
  insertAssessment(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/gmassessment/insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update Assessment
   * POST api/gmassessment/update
   */
  updateAssessment(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/gmassessment/update`,
      model,
      httpOptions
    );
  }

  /**
   * Delete Assessment
   * GET api/gmassessment/delete/{id}
   */
  deleteAssessment(id: string = '9999'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmassessment/delete/${id}`,
      httpOptions
    );
  }

  /**
   * Edit CME record
   * GET api/GMAPPCME/Edit?RecordID={recordId}
   */
  editCME(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/GMAPPCME/Edit?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Insert CME record
   * POST api/GMAPPCME/Insert
   */
  insertCME(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/GMAPPCME/Insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update CME record
   * POST api/GMAPPCME/Update
   */
  updateCME(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/GMAPPCME/Update`,
      model,
      httpOptions
    );
  }

  /**
   * Insert GM App record
   * POST api/gmapp/insert/
   */
  insertGmApp(body: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/gmapp/insert/`,
      body,
      httpOptions
    );
  }

  /**
   * Get Currency for application
   * GET api/gmbudget/GetCurrency/{appId}
   */
  getCurrency(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmbudget/GetCurrency/${appId}`,
      httpOptions
    );
  }
}
