import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminInstructionsConfigService {

  constructor(private http: HttpClient) {}

  // ==================== 1. USER INSTRUCTIONS ====================

  /**
   * Fetch instructions by Module ID
   * GET api/instruction/fetchinstructions/{moduleId}
   */
  fetchInstructions(moduleId: string = '-1'): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/instruction/fetchinstructions/${moduleId}`, httpOptions);
  }

  /**
   * Search instructions
   * POST api/instruction/search
   */
  searchInstructions(search: any = { MODULE_ID: '-1', APPLICATION_TYPE_ID: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/instruction/search`, search, httpOptions);
  }

  /**
   * Fetch application type modules for instructions
   * GET api/common/getapptypemodules
   */
  getAppTypeModules(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/common/getapptypemodules`, httpOptions);
  }

  /**
   * Insert instruction
   * POST api/instruction/insert
   */
  insertInstruction(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/instruction/insert`, model, httpOptions);
  }

  /**
   * Update instruction
   * POST api/instruction/update
   */
  updateInstruction(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/instruction/update`, model, httpOptions);
  }

  /**
   * Delete instruction
   * GET api/instruction/delete/{id}
   */
  deleteInstruction(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/instruction/delete/${id}`, httpOptions);
  }

  // ==================== 2. FREQUENTLY ASKED QUESTIONS (FAQ) ====================

  /**
   * Fetch FAQs by name/filter
   * GET api/faq/getfaqs/{name}
   */
  getFaqs(name: string = '-1'): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/faq/getfaqs/${name}`, httpOptions);
  }

  /**
   * Advanced search FAQs
   * POST api/faq/getadvsearch
   */
  getFaqAdvSearch(search: any = { QUESTION: '', MODULE_ID: '-1', STATUS: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/faq/getadvsearch`, search, httpOptions);
  }

  /**
   * Fetch FAQ modules
   * GET api/common/getmodulesbyid
   */
  getFaqModules(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/common/getmodulesbyid`, httpOptions);
  }

  /**
   * Insert FAQ
   * POST api/faq/insert
   */
  insertFaq(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/faq/insert`, model, httpOptions);
  }

  /**
   * Update FAQ
   * POST api/faq/update
   */
  updateFaq(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/faq/update`, model, httpOptions);
  }

  /**
   * Delete FAQ
   * GET api/faq/delete/{id}
   */
  deleteFaq(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/faq/delete/${id}`, httpOptions);
  }

  // ==================== 3. EMAIL TEMPLATES ====================

  /**
   * Search / List Email Templates
   * POST api/EmailTemplates/GetEmailTemplatesSearchSummary
   */
  getEmailTemplatesSearchSummary(model: any = { ModuleId: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/EmailTemplates/GetEmailTemplatesSearchSummary`, model, httpOptions);
  }

  /**
   * Fetch Applicable Programs for Email Templates
   * GET api/EmailTemplates/GetApplicablePrograms/{orgCode}
   */
  getApplicablePrograms(orgCode: string = '-1'): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/EmailTemplates/GetApplicablePrograms/${orgCode}`, httpOptions);
  }

  /**
   * Fetch Email Application Types
   * GET api/EmailTemplates/GetEmailApplicationTypes/{moduleId}/{recordId}
   */
  getEmailApplicationTypes(moduleId: string, recordId: string = '-1'): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/EmailTemplates/GetEmailApplicationTypes/${moduleId}/${recordId}`, httpOptions);
  }

  /**
   * Fetch Email Template by ID
   * GET api/EmailTemplates/GetEmailTemplateById/{id}
   */
  getEmailTemplateById(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/EmailTemplates/GetEmailTemplateById/${id}`, httpOptions);
  }

  /**
   * Fetch Email Placeholders
   * GET api/AlertsAndNotifications/GetANPlaceHolders
   */
  getEmailPlaceholders(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/AlertsAndNotifications/GetANPlaceHolders`, httpOptions);
  }

  /**
   * Save / Insert Email Template
   * POST api/EmailTemplates/SaveEmailTemplates
   */
  saveEmailTemplate(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/EmailTemplates/SaveEmailTemplates`, model, httpOptions);
  }

  /**
   * Delete Email Template by ID
   * GET api/EmailTemplates/DeleteEmailTemplateById/{id}
   */
  deleteEmailTemplate(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/EmailTemplates/DeleteEmailTemplateById/${id}`, httpOptions);
  }

  // ==================== 4. AUTO C-CODE (ID CONFIGURATION) ====================

  /**
   * Fetch auto code modules
   * GET api/common/getautocodemodules
   */
  getAutoCodeModules(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/common/getautocodemodules`, httpOptions);
  }

  /**
   * Insert auto code definition
   * POST api/autocode/insert
   */
  insertAutoCode(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/autocode/insert`, model, httpOptions);
  }

  /**
   * Update auto code definition
   * POST api/autocode/update
   */
  updateAutoCode(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/autocode/update`, model, httpOptions);
  }

  /**
   * Search / List Auto Code definitions
   * POST api/autocode/getadvsearch
   */
  getAutoCodeSearchSummary(model: any = { ModuleId: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/autocode/getadvsearch`, model, httpOptions);
  }

  /**
   * Delete auto code definition
   * GET api/autocode/delete/{id}
   */
  deleteAutoCode(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/autocode/delete/${id}`, httpOptions);
  }

  // ==================== 5. REGISTRATION CONFIGURATION ====================

  /**
   * Fetch registration configuration summary
   * GET api/RegistrationConfig/FetchRegConfigSummary
   */
  fetchRegistrationConfigSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/RegistrationConfig/FetchRegConfigSummary`, httpOptions);
  }

  /**
   * Fetch registration config details by ID
   * GET api/RegistrationConfig/GetRegConfigSummaryById?Id={id}
   */
  getRegistrationConfigById(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/RegistrationConfig/GetRegConfigSummaryById?Id=${id}`, httpOptions);
  }

  /**
   * Update registration configuration
   * POST api/RegistrationConfig/Update
   */
  updateRegistrationConfig(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/RegistrationConfig/Update`, model, httpOptions);
  }

  /**
   * Check whether control is referenced/used
   * GET api/RegistrationConfig/CheckwheatherUsedorNot?CtrlId={ctrlId}
   */
  checkRegistrationControlUsed(ctrlId: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/RegistrationConfig/CheckwheatherUsedorNot?CtrlId=${ctrlId}`, httpOptions);
  }

  // ==================== 6. APPLICATION TYPES ====================

  /**
   * Fetch application types summary
   * GET api/applicationtype/SummaryData
   */
  getApplicationTypesSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/applicationtype/SummaryData`, httpOptions);
  }

  /**
   * Insert application type
   * POST api/applicationtype/insert
   */
  insertApplicationType(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/applicationtype/insert`, model, httpOptions);
  }

  /**
   * Update application type
   * POST api/applicationtype/update
   */
  updateApplicationType(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/applicationtype/update`, model, httpOptions);
  }

  /**
   * Delete application type
   * GET api/applicationtype/delete/{id}
   */
  deleteApplicationType(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/applicationtype/delete/${id}`, httpOptions);
  }

  // ==================== 7. RFP, RFI & NOTES (Old IEG Administration) ====================

  /**
   * RFP Advanced Search
   * POST api/rfp/getadvsearch
   */
  getRFPSearchSummary(model: any): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/rfp/getadvsearch`, model, httpOptions);
  }

  /**
   * RFI Advanced Search
   * POST api/rfi/getadvsearch
   */
  getRFISearchSummary(model: any): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/rfi/getadvsearch`, model, httpOptions);
  }

  /**
   * Add Notes
   * POST api/notes/insert
   */
  addNotes(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/notes/insert`, model, httpOptions);
  }

  /**
   * Update Notes
   * POST api/notes/update
   */
  editNotes(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/notes/update`, model, httpOptions);
  }

  /**
   * Delete Notes
   * GET api/notes/delete/{id}
   */
  deleteNotes(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/notes/delete/${id}`, httpOptions);
  }

  /**
   * Get Notes
   * GET api/notes/getnotes/{name}/{appid}
   */
  getNotes(name: string = '-1', appid: string = '-1'): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/notes/getnotes/${name}/${appid}`, httpOptions);
  }
}

