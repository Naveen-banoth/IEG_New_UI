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
  getDeptAdvSearch(search: any): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/department/getadvsearch`, search, httpOptions);
  }

  /**
   * Fetch departments by name/id
   * GET api/department/getdepartments/{name}/{id}
   */
  getDepartments(name: string, id: string): Observable<any[]> {
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

  // ==================== ROLE APIS ====================

  /**
   * Search / List roles for grid
   * POST api/role/getadvsearch
   */
  getRoleAdvSearch(search: any): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/role/getadvsearch`, search, httpOptions);
  }

  /**
   * Fetch roles list
   * GET api/role/getroles/{name}
   */
  getRoles(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/role/getroles/${name}`, httpOptions);
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
   * GET api/role/delete/{id}
   */
  deleteRole(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/role/delete/${id}`, httpOptions);
  }

  // ==================== USER APIS ====================

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
   * Check internal users quota limit
   * GET api/appuser/checkinternalusers/{OrgID}
   */
  checkInternalUsers(orgId: string): Observable<boolean> {
    return this.http.get<boolean>(`${serviceConstants.apiURL}api/appuser/checkinternalusers/${orgId}`, httpOptions);
  }

  /**
   * Fetch users by type and organization ID
   * GET api/appuser/getusersbyid/{type}/{orgid}
   */
  getUsersByType(type: string, orgId: string): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/appuser/getusersbyid/${type}/${orgId}`, httpOptions);
  }

  /**
   * Delete User
   * GET api/appuser/delete/{id}
   */
  deleteUser(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/appuser/delete/${id}`, httpOptions);
  }
}
