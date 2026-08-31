import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formOptions, httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonFileService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch Attachment Classifications by Module Name
   * GET api/ISTFileAttachments/GetAttachClass?ModuleName={ModuleName}
   */
  getAttachClass(moduleName: string = 'IST'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTFileAttachments/GetAttachClass?ModuleName=${moduleName}`,
      httpOptions
    );
  }

  /**
   * Fetch Application Types for attachments
   * GET api/ISTFileAttachments/GetApplicationTypes?moduleID={ModuleId}
   */
  getApplicationTypes(moduleId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTFileAttachments/GetApplicationTypes?moduleID=${moduleId}`,
      httpOptions
    );
  }

  /**
   * Fetch Screen names for attachment associations
   * GET api/ISTFileAttachments/GetScreenNames?MODULE_ID={ModuleId}
   */
  getScreenNames(moduleId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTFileAttachments/GetScreenNames?MODULE_ID=${moduleId}`,
      httpOptions
    );
  }

  /**
   * Fetch Attachments summary for an application
   * GET api/ISTFileAttachments/getAttachmentsSummary?ApplicationID={appId}
   */
  getAttachmentsSummary(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTFileAttachments/getAttachmentsSummary?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search attachments grid
   * POST api/ISTFileAttachments/getAttachmentsSearch
   */
  getAttachmentsSearch(search: any = { ApplicationID: '1', PageIndex: 1, PageSize: 10 }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/ISTFileAttachments/getAttachmentsSearch`,
      search,
      httpOptions
    );
  }

  /**
   * Fetch screen attachments by Transaction ID
   * GET api/ISTFileAttachments/getScreenAttachments?TransactionID={TransactionId}
   */
  getScreenAttachments(transactionId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTFileAttachments/getScreenAttachments?TransactionID=${transactionId}`,
      httpOptions
    );
  }

  /**
   * Fetch master data for file attachments
   * GET api/ISTFileAttachments/GetMasterData
   */
  getMasterData(): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTFileAttachments/GetMasterData`,
      httpOptions
    );
  }

  /**
   * Fetch feature documents
   * GET api/screen/getfeaturedocuments
   */
  getFeatureDocuments(): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/screen/getfeaturedocuments`,
      httpOptions
    );
  }

  /**
   * Save feature documents configuration
   * POST api/screen/savefeaturedocuments
   */
  saveFeatureDocuments(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/screen/savefeaturedocuments`,
      model,
      httpOptions
    );
  }

  /**
   * Insert attachment metadata / file form
   * POST api/ISTFileAttachments/InsertAttachment
   */
  insertAttachment(formData: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTFileAttachments/InsertAttachment`,
      formData,
      formOptions
    );
  }

  /**
   * Update attachment
   * POST api/ISTFileAttachments/UpdateAttachemnt
   */
  updateAttachment(formData: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTFileAttachments/UpdateAttachemnt`,
      formData,
      formOptions
    );
  }

  /**
   * Delete file attachment by File ID
   * GET api/ISTFileAttachments/DeleteFile?FileID={fileId}
   */
  deleteFile(fileId: string = '9999'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTFileAttachments/DeleteFile?FileID=${fileId}`,
      httpOptions
    );
  }

  /**
   * Edit template details by Template ID
   * GET api/ISTFileAttachments/EditTemplateDetails?TemplateID={templateId}
   */
  editTemplateDetails(templateId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTFileAttachments/EditTemplateDetails?TemplateID=${templateId}`,
      httpOptions
    );
  }
}
