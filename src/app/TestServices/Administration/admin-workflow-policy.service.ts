import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminWorkflowPolicyService {

  constructor(private http: HttpClient) {}

  // ==================== 1. POLICY CONFIGURATOR ====================

  /**
   * Fetch policy modules
   * GET api/policy/getpolicymodule
   */
  getPolicyModules(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/policy/getpolicymodule`, httpOptions);
  }

  /**
   * Fetch policy version details
   * GET api/policy/getVersionDetails/{id}
   */
  getPolicyVersionDetails(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/policy/getVersionDetails/${id}`, httpOptions);
  }

  /**
   * Update policy with current version
   * POST api/policy/updatepolicywithcurrentversion/{id}
   */
  updatePolicyWithCurrentVersion(id: string, model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/policy/updatepolicywithcurrentversion/${id}`, model, httpOptions);
  }

  /**
   * Delete policy
   * GET api/policy/delete/{id}
   */
  deletePolicy(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/policy/delete/${id}`, httpOptions);
  }

  // ==================== 2. SCREEN REPOSITORY ====================

  /**
   * Fetch screen policy version details
   * GET api/screen/PolicyVersionDetails
   */
  getScreenPolicyVersionDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/screen/PolicyVersionDetails`, httpOptions);
  }

  /**
   * Check if control is referenced
   * GET api/screen/CheckIsReferencedControl/{id}
   */
  checkIsReferencedControl(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/screen/CheckIsReferencedControl/${id}`, httpOptions);
  }

  /**
   * Check if control value is referenced
   * GET api/screen/CheckIsReferencedValues/{controlId}/{value}
   */
  checkIsReferencedValue(controlId: string, value: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/screen/CheckIsReferencedValues/${controlId}/${value}`, httpOptions);
  }

  // ==================== 3. WORKFLOW STATE CONFIGURATION ====================

  /**
   * Fetch workflow states summary
   * GET api/state/SummaryData
   */
  getWorkflowStatesSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/state/SummaryData`, httpOptions);
  }

  /**
   * Fetch workflow state by ID
   * GET api/state/getstatebyid/{id}
   */
  getWorkflowStateById(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/state/getstatebyid/${id}`, httpOptions);
  }

  /**
   * Insert workflow state
   * POST api/state/insert
   */
  insertWorkflowState(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/state/insert`, model, httpOptions);
  }

  /**
   * Update workflow state
   * POST api/state/update
   */
  updateWorkflowState(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/state/update`, model, httpOptions);
  }

  // ==================== 4. BUDGET SUMMARY & TIMELINE CONFIGURATION ====================

  /**
   * Fetch Budget Assignment summary
   * GET api/BudgetAssignment/Summary
   */
  getBudgetSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/BudgetAssignment/Summary`, httpOptions);
  }

  /**
   * Search Budget Assignment summary
   * POST api/BudgetAssignment/SummarySearch
   */
  searchBudgetSummary(search: any = { PROGRAM_ID: '-1', APPLICATION_TYPE_ID: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/BudgetAssignment/SummarySearch`, search, httpOptions);
  }

  /**
   * Fetch Budget Assignment Master Data
   * GET api/BudgetAssignment/GetMasterData/-1/-1
   */
  getBudgetMasterData(programId: string = '-1', appTypeId: string = '-1'): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/BudgetAssignment/GetMasterData/${programId}/${appTypeId}`, httpOptions);
  }

  /**
   * Delete Budget Assignment
   * GET api/BudgetAssignment/Delete/{id}
   */
  deleteBudgetAssignment(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/BudgetAssignment/Delete/${id}`, httpOptions);
  }

  /**
   * Fetch / Edit Time Configuration
   * GET api/timeconfig/Edit
   */
  getTimeConfig(): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/timeconfig/Edit`, httpOptions);
  }

  /**
   * Insert / Save Time Configuration
   * POST api/timeconfig/insert
   */
  saveTimeConfig(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/timeconfig/insert`, model, httpOptions);
  }
}
