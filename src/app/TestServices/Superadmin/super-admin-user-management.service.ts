import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminUserManagementService {

  constructor(private http: HttpClient) {}

  // ==================== DEPARTMENT APIS ====================

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
    const n = name || '-1';
    const i = id || '-1';
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/department/getdepartments/${n}/${i}`, httpOptions);
  }

  /**
   * Fetch single department by ID
   * GET api/department/getdepartmentbyid/{id}
   */
  getDepartmentById(id: string): Observable<any> {
    const deptId = id || '1';
    return this.http.get<any>(`${serviceConstants.apiURL}api/department/getdepartmentbyid/${deptId}`, httpOptions);
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
    const deptId = id || '9999';
    return this.http.get<any>(`${serviceConstants.apiURL}api/department/delete/${deptId}`, httpOptions);
  }

  // ==================== ROLE APIS ====================

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
    const roleId = id || '1';
    return this.http.get<any>(`${serviceConstants.apiURL}api/role/getrolebyid/${roleId}`, httpOptions);
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
    const roleId = id || '1';
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/role/getroleprivileges/${roleId}`, httpOptions);
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
    const roleId = id || '9999';
    return this.http.delete<any>(`${serviceConstants.apiURL}api/role/delete/${roleId}`, httpOptions);
  }

  // ==================== USER APIS ====================

  /**
   * Fetch single user details by ID
   * GET api/appuser/getuserbyid/{id}
   */
  getUserById(id: string): Observable<any> {
    const userId = id || '1';
    return this.http.get<any>(`${serviceConstants.apiURL}api/appuser/getuserbyid/${userId}`, httpOptions);
  }

  /**
   * Fetch support user by ID
   * GET api/appuser/getsupportuserbyid/{id}
   */
  getSupportUserById(id: string): Observable<any> {
    const supId = id || '1';
    return this.http.get<any>(`${serviceConstants.apiURL}api/appuser/getsupportuserbyid/${supId}`, httpOptions);
  }

  /**
   * Fetch internal system users
   * GET api/appuser/getinternalusers
   */
  getInternalUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/appuser/getinternalusers`, httpOptions);
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
    const uId = userId || '1';
    const oId = orgId || '1';
    return this.http.get<any>(`${serviceConstants.apiURL}api/appuser/resenduseremail/${uId}/${oId}`, httpOptions);
  }

  /**
   * Delete User
   * GET api/appuser/delete/{id}
   */
  deleteUser(id: string): Observable<any> {
    const uId = id || '9999';
    return this.http.get<any>(`${serviceConstants.apiURL}api/appuser/delete/${uId}`, httpOptions);
  }
}
