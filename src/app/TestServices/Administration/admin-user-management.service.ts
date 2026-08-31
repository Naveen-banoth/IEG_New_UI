import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminUserManagementService {

  constructor(private http: HttpClient) {}

  // ==================== 1. DEPARTMENTS ====================

  /**
   * Search / List departments for grid
   * POST api/department/getadvsearch
   */
  getDeptAdvSearch(search: any = { CODE: '', NAME: '', STATUS: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/department/getadvsearch`, search, httpOptions);
  }

  /**
   * Fetch departments by name/id
   * GET api/department/getdepartments/{name}/{id}
   */
  getDepartments(name: string = '-1', id: string = '-1'): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/department/getdepartments/${name}/${id}`, httpOptions);
  }

  /**
   * Fetch single department by ID
   * GET api/department/getdepartmentbyid/{id}
   */
  getDepartmentById(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/department/getdepartmentbyid/${id}`, httpOptions);
  }

  /**
   * Fetch active departments under organization
   * GET api/appuser/getactivedept/{orgId}
   */
  getActiveDepartments(orgId: string = '-1'): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/appuser/getactivedept/${orgId}`, httpOptions);
  }

  /**
   * Fetch users assigned to department
   * GET api/appuser/getdeptusers/{id}
   */
  getDeptUsers(deptId: string = 'I'): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/appuser/getdeptusers/${deptId}`, httpOptions);
  }

  /**
   * Insert new department
   * POST api/department/insert
   */
  insertDepartment(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/department/insert`, model, httpOptions);
  }

  /**
   * Update existing department
   * POST api/department/update
   */
  updateDepartment(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/department/update`, model, httpOptions);
  }

  /**
   * Delete department
   * GET api/department/delete/{id}
   */
  deleteDepartment(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/department/delete/${id}`, httpOptions);
  }

  // ==================== 2. USER ROLES & PRIVILEGES ====================

  /**
   * Search / List roles for grid
   * POST api/role/getadvsearch
   */
  getRoleAdvSearch(search: any = { ROLE_NAME: '', STATUS: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/role/getadvsearch`, search, httpOptions);
  }

  /**
   * Fetch roles list
   * GET api/role/getroles/{name}
   */
  getRoles(name: string = '-1'): Observable<any[]> {
    const param = name || '-1';
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/role/getroles/${param}`, httpOptions);
  }

  /**
   * Fetch active roles
   * GET api/appuser/getactiveroles
   */
  getActiveRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/appuser/getactiveroles`, httpOptions);
  }

  /**
   * Fetch single role by ID
   * GET api/role/getrolebyid/{id}
   */
  getRoleById(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/role/getrolebyid/${id}`, httpOptions);
  }

  /**
   * Fetch system modules for permission mapping
   * GET api/role/getmodules
   */
  getModules(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/role/getmodules`, httpOptions);
  }

  /**
   * Fetch role privileges by Role ID
   * GET api/role/getroleprivileges/{id}
   */
  getRolePrivileges(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/role/getroleprivileges/${id}`, httpOptions);
  }

  /**
   * Insert new role
   * POST api/role/insert
   */
  insertRole(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/role/insert`, model, httpOptions);
  }

  /**
   * Update existing role
   * POST api/role/update
   */
  updateRole(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/role/update`, model, httpOptions);
  }

  /**
   * Insert / Assign role privileges
   * POST api/role/insertroleprivilege
   */
  insertRolePrivilege(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/role/insertroleprivilege`, model, httpOptions);
  }

  /**
   * Delete role
   * DELETE api/role/delete/{id}
   */
  deleteRole(id: string): Observable<any> {
    return this.http.delete<any>(`${serviceConstants.apiURL}api/role/delete/${id}`, httpOptions);
  }

  // ==================== 3. USERS ====================

  /**
   * Advanced search users
   * POST api/appuser/getadvsearch
   */
  getUsersAdvSearch(search: any = { CODE: '', TITLE: '', EMAIL: '', DEPARTMENT_ID: '', ROLEID: '', STATUS: '-1', RECORD_STATE: 101 }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/appuser/getadvsearch`, search, httpOptions);
  }

  /**
   * Fetch single user details by ID
   * GET api/appuser/getuserbyid/{id}
   */
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/appuser/getuserbyid/${id}`, httpOptions);
  }

  /**
   * Fetch support user by ID
   * GET api/appuser/getsupportuserbyid/{id}
   */
  getSupportUserById(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/appuser/getsupportuserbyid/${id}`, httpOptions);
  }

  /**
   * Fetch internal system users
   * GET api/appuser/getinternalusers
   */
  getInternalUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/appuser/getinternalusers`, httpOptions);
  }

  /**
   * Fetch user search master dropdowns
   * GET api/appuser/getusersearchmaster
   */
  getUserSearchMaster(): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/appuser/getusersearchmaster`, httpOptions);
  }

  /**
   * Insert new user
   * POST api/appuser/insert
   */
  insertUser(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/appuser/insert`, model, httpOptions);
  }

  /**
   * Update existing user
   * POST api/appuser/update
   */
  updateUser(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/appuser/update`, model, httpOptions);
  }

  /**
   * Resend User Activation / Invitation Email
   * GET api/appuser/resenduseremail/{userId}/{orgId}
   */
  resendUserEmail(userId: string, orgId: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/appuser/resenduseremail/${userId}/${orgId}`, httpOptions);
  }

  /**
   * Delete User
   * GET api/appuser/delete/{id}
   */
  deleteUser(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/appuser/delete/${id}`, httpOptions);
  }

  /**
   * Fetch User Roles mapping by User ID
   * GET api/appuser/getuserroles/{id}
   */
  getUserRoles(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/appuser/getuserroles/${id}`, httpOptions);
  }

  /**
   * Fetch Users mapped to a Role ID
   * GET api/appuser/getroleusers/{id}
   */
  getRoleUsers(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/appuser/getroleusers/${id}`, httpOptions);
  }

  // ==================== 4. GENERAL SETTINGS & TIMEZONES ====================

  /**
   * Fetch available system timezones
   * GET api/appuser/fetchtimezones
   */
  fetchTimeZones(): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/appuser/fetchtimezones`, httpOptions);
  }

  /**
   * Auto-save organization timezone
   * POST api/appuser/timezoneautosave/{timeZone}
   */
  timeZoneAutoSave(timeZone: string): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/appuser/timezoneautosave/${encodeURIComponent(timeZone)}`, { TimeZone: timeZone }, httpOptions);
  }

  /**
   * Auto-save default system currency
   * POST api/appuser/currencyautosave
   */
  currencyAutoSave(currency: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/appuser/currencyautosave`, currency, httpOptions);
  }

  /**
   * Fetch system currency
   * GET api/common/getCurrency
   */
  getCurrency(): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/common/getCurrency`, httpOptions);
  }

  /**
   * Fetch Organization Authentication configurations (SSO/SAML/Basic)
   * GET api/appuser/getssoconfig/{orgId}
   */
  getAuthenticationsByOrgId(orgId: string = '-1'): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/appuser/getssoconfig/${orgId}`, httpOptions);
  }

}

