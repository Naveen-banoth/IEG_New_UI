import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class UmUserManagementService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch departments list
   * GET api/department/getdepartments/{name}/{id}
   */
  getDepartments(name: string = '-1', id: string = '-1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/department/getdepartments/${name}/${id}`,
      httpOptions
    );
  }

  /**
   * Search departments
   * POST api/department/getadvsearch
   */
  getDeptAdvSearch(search: any = { CODE: '', NAME: '', STATUS: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/department/getadvsearch`,
      search,
      httpOptions
    );
  }

  getDepartmentAdvSearch(search: any = { CODE: '', NAME: '', STATUS: '-1' }): Observable<any[]> {
    return this.getDeptAdvSearch(search);
  }

  /**
   * Fetch organizations list
   * GET api/organization/getorganizatoins/{id}
   */
  getOrganizations(id: string = ''): Observable<any[]> {
    const url = id
      ? `${serviceConstants.apiURL}api/organization/getorganizatoins/${id}`
      : `${serviceConstants.apiURL}api/organization/getorganizatoins`;
    return this.http.get<any[]>(url, httpOptions);
  }

  /**
   * Search organizations
   * POST api/organization/getadvsearch
   */
  getOrgAdvSearch(search: any = { NAME: '', STATUS: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/organization/getadvsearch`,
      search,
      httpOptions
    );
  }

  getOrganizationAdvSearch(search: any = { NAME: '', STATUS: '-1' }): Observable<any[]> {
    return this.getOrgAdvSearch(search);
  }

  /**
   * Get Orgs For Storage mapping
   * GET api/appuser/GetOrgsForStorage/{orgCode}
   */
  getOrgsForStorage(orgCode: string = 'DEFAULT'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/appuser/GetOrgsForStorage/${orgCode}`,
      httpOptions
    );
  }

  /**
   * Get user summary by filter
   * GET api/appuser/getusers/{filter}
   */
  getUserSummary(filter: string = '-1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/appuser/getusers/${filter}`,
      httpOptions
    );
  }

  /**
   * Get user search master dropdowns
   * GET api/appuser/getusersearchmaster
   */
  getUserSearchMaster(): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/appuser/getusersearchmaster`,
      httpOptions
    );
  }

  /**
   * Advanced search users
   * POST api/appuser/getadvsearch
   */
  getUserAdvSearch(search: any = { USER_NAME: '', STATUS: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/appuser/getadvsearch`,
      search,
      httpOptions
    );
  }

  /**
   * Get internal users list
   * GET api/appuser/getinternalusers
   */
  getInternalUsers(): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/appuser/getinternalusers`,
      httpOptions
    );
  }

  /**
   * Get user by ID
   * GET api/appuser/getuserbyid/{id}
   */
  getUserById(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/appuser/getuserbyid/${id}`,
      httpOptions
    );
  }

  /**
   * Get support user by ID
   * GET api/appuser/getsupportuserbyid/{id}
   */
  getSupportUserById(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/appuser/getsupportuserbyid/${id}`,
      httpOptions
    );
  }

  /**
   * Get Roles list
   * GET api/role/getroles/{name}
   */
  getRoles(name: string = '-1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/role/getroles/${name}`,
      httpOptions
    );
  }

  /**
   * Search roles
   * POST api/role/getadvsearch
   */
  getRoleAdvSearch(search: any = { ROLE_NAME: '', STATUS: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/role/getadvsearch`,
      search,
      httpOptions
    );
  }

  /**
   * Get system modules
   * GET api/role/getmodules
   */
  getModules(): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/role/getmodules`,
      httpOptions
    );
  }

  getSystemModules(): Observable<any[]> {
    return this.getModules();
  }

  /**
   * Insert role privilege mapping
   * POST api/roleprivilege/insert
   */
  insertRolePrivilege(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/roleprivilege/insert`,
      model,
      httpOptions
    );
  }

  /**
   * Insert department
   * POST api/department/insert
   */
  insertDepartment(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/department/insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update department
   * POST api/department/update
   */
  updateDepartment(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/department/update`,
      model,
      httpOptions
    );
  }

  /**
   * Delete department
   * GET api/department/delete/{id}
   */
  deleteDepartment(id: string = '9999'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/department/delete/${id}`,
      httpOptions
    );
  }

  /**
   * Insert Organization
   * POST api/organization/organizations
   */
  insertOrganization(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/organization/organizations`,
      model,
      httpOptions
    );
  }

  /**
   * Update Organization
   * PUT api/organization/organizations/{id}
   */
  updateOrganization(id: string = '1', model: any = {}): Observable<any> {
    return this.http.put<any>(
      `${serviceConstants.apiURL}api/organization/organizations/${id}`,
      model,
      httpOptions
    );
  }

  /**
   * Delete Organization
   * DELETE api/organization/organizations/{id}
   */
  deleteOrganization(id: string = '9999'): Observable<any> {
    return this.http.delete<any>(
      `${serviceConstants.apiURL}api/organization/organizations/${id}`,
      httpOptions
    );
  }

  /**
   * Insert User
   * POST api/appuser/insert
   */
  insertUser(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/appuser/insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update User
   * POST api/appuser/update
   */
  updateUser(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/appuser/update`,
      model,
      httpOptions
    );
  }

  /**
   * Delete User
   * GET api/appuser/delete/{id}
   */
  deleteUser(id: string = '9999'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/appuser/delete/${id}`,
      httpOptions
    );
  }

  /**
   * Add Support User
   * POST api/appuser/insertsupportuser
   */
  addSupportUser(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/appuser/insertsupportuser`,
      model,
      httpOptions
    );
  }

  /**
   * Add User Roles
   * POST api/appuser/adduserroles
   */
  addUserRoles(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/appuser/adduserroles`,
      model,
      httpOptions
    );
  }

  /**
   * Insert Role
   * POST api/role/insert
   */
  insertRole(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/role/insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update Role
   * POST api/role/update
   */
  updateRole(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/role/update`,
      model,
      httpOptions
    );
  }

  /**
   * Delete Role
   * DELETE api/role/delete/{id}
   */
  deleteRole(id: string = '9999'): Observable<any> {
    return this.http.delete<any>(
      `${serviceConstants.apiURL}api/role/delete/${id}`,
      httpOptions
    );
  }
}
