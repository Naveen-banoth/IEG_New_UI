import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serviceConstants, httpOptions } from '../../constants/service.constants';

export interface EmailConfiguration {
  EmailServerID?: string;
  EmailConfigID?: string;
  EmailID?: string;
  EmailPwd?: string;
  EmailDisplayName?: string;
  SMTPHost?: string;
  SMTPPort?: string;
  SMTPSSL?: string;
  UserID?: string;
  SentItemsFolderName?: string;
  IMAPHost?: string;
  IMAPPort?: string;
  IMAPSSL?: string;
  EmailAccountTypeID?: number;
  EmailAccountType?: string;
  EmailAccountTypeCode?: string;
  TempFileID?: string;
  GSuiteFileID?: string;
  FileName?: string;
  FileExt?: string;
  MicrosoftTenantID?: string;
  MicrosoftClientID?: string;
  MicrosoftClientSecret?: string;
  OrgID?: string;
  LoggedUserID?: string;
  OrgGroupID?: string;
  EmailServerStatus?: boolean;
}

export interface ConfigSummary {
  EmailServerID?: string;
  EmailID?: string;
  EmailDisplayName?: string;
  SMTPHost?: string;
  SMTPPort?: string;
}

export interface ConfigSearch {
  OrgID?: string;
  UserID?: string;
  EmailID?: string;
}

export interface SMTPTestModel {
  Config?: EmailConfiguration;
  SMTPConfig?: EmailConfiguration;
  ToEmailID?: string;
  Subject?: string;
  Body?: string;
  EmailID?: string;
  EmailPwd?: string;
  SMTPHost?: string;
  SMTPPort?: string;
  SMTPSSL?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminEmailConfigurationService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Search Email Configuration Summary
   * POST api/EmailSetUP/SearchSummary
   */
  getSummarySearchAsync(search: Partial<ConfigSearch> = {}): Observable<ConfigSummary[]> {
    return this.http.post<ConfigSummary[]>(`${serviceConstants.apiURL}api/EmailSetUP/SearchSummary`, search, httpOptions);
  }

  /**
   * Fetch Email Configuration Record by ID
   * GET api/EmailSetUP/FetchRecordByID/{id}
   */
  fetchConfigAsync(configID: string): Observable<EmailConfiguration> {
    return this.http.get<EmailConfiguration>(`${serviceConstants.apiURL}api/EmailSetUP/FetchRecordByID/${configID}`, httpOptions);
  }

  /**
   * Insert Email Setup Configuration
   * POST api/EmailSetUP/Insert
   */
  insertConfigAsync(model: EmailConfiguration): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/EmailSetUP/Insert`, model, httpOptions);
  }

  /**
   * Update Email Setup Configuration
   * POST api/EmailSetUP/Update
   */
  updateConfigAsync(model: EmailConfiguration): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/EmailSetUP/Update`, model, httpOptions);
  }

  /**
   * Delete Email Setup Configuration
   * GET api/EmailSetUP/Delete/{id}
   */
  deleteConfigAsync(configID: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/EmailSetUP/Delete/${configID}`, httpOptions);
  }

  /**
   * Test SMTP Connection
   * POST api/EmailSetUP/SMTPTest
   */
  smtpTestAsync(model: SMTPTestModel): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/EmailSetUP/SMTPTest`, model, httpOptions);
  }

  /**
   * Test IMAP Connection
   * POST api/EmailSetUP/IMAPTest
   */
  imapTestAsync(model: EmailConfiguration): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/EmailSetUP/IMAPTest`, model, httpOptions);
  }

  /**
   * Test Graph API Send Connection
   * POST api/EmailSetUP/GraphAPISendTest
   */
  graphSendTestAsync(model: SMTPTestModel): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/EmailSetUP/GraphAPISendTest`, model, httpOptions);
  }

  /**
   * Test Graph API Read Connection
   * POST api/EmailSetUP/GraphAPIReadTest
   */
  graphReadTestAsync(model: SMTPTestModel): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/EmailSetUP/GraphAPIReadTest`, model, httpOptions);
  }
}

// Alias export to maintain 1:1 parity with old IEG EmailConfigurationService
export { AdminEmailConfigurationService as EmailConfigurationService };
