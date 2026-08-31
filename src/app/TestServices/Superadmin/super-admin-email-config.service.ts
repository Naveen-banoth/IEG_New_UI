import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminEmailConfigService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch current SMTP/Email configuration
   * GET api/SMTPConfiguration/Fetch
   */
  fetchConfig(): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/SMTPConfiguration/Fetch`, httpOptions);
  }

  /**
   * Get SMTP configuration revision history list
   * GET api/SMTPConfiguration/GetSMTPRecordList
   */
  getSMTPRecordList(): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/SMTPConfiguration/GetSMTPRecordList`, httpOptions);
  }

  /**
   * Fetch specific SMTP configuration record by ID
   * GET api/SMTPConfiguration/FetchRecordByIDAsync/{EmailConfigID}
   */
  fetchRecordById(emailConfigId: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/SMTPConfiguration/FetchRecordByIDAsync/${emailConfigId}`, httpOptions);
  }

  /**
   * Test SMTP configuration connection
   * POST api/SMTPConfiguration/SMTPTest
   */
  smtpTest(model: any): Observable<any> {
    const payload = model?.SMTPConfig ? model : { SMTPConfig: model };
    return this.http.post<any>(`${serviceConstants.apiURL}api/SMTPConfiguration/SMTPTest`, payload, httpOptions);
  }

  /**
   * Test Graph API Send Connection
   * POST api/SMTPConfiguration/GraphAPISendTest
   */
  graphApiSendTest(model: any): Observable<any> {
    const payload = model?.SMTPConfig ? model : { SMTPConfig: model };
    return this.http.post<any>(`${serviceConstants.apiURL}api/SMTPConfiguration/GraphAPISendTest`, payload, httpOptions);
  }

  /**
   * Insert / Add SMTP Configuration
   * POST api/SMTPConfiguration/InsertSMTPConfiguration
   */
  insertSMTPConfiguration(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/SMTPConfiguration/InsertSMTPConfiguration`, model, httpOptions);
  }

  /**
   * Delete SMTP / Email Configuration by ID
   * GET api/EmailSetUP/Delete/{id}
   */
  deleteConfigAsync(emailConfigId: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/EmailSetUP/Delete/${emailConfigId}`, httpOptions);
  }
}

