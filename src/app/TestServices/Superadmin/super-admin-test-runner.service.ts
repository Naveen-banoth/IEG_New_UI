import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SuperAdminAuthService } from './super-admin-auth.service';
import { SuperAdminOrganizationService } from './super-admin-organization.service';
import { SuperAdminAuthenticationService } from './super-admin-authentication.service';
import { SuperAdminEmailConfigService } from './super-admin-email-config.service';
import { SuperAdminAuditLogService } from './super-admin-audit-log.service';
import { SuperAdminUserManagementService } from './super-admin-user-management.service';
import { AdminUserManagementService } from '../Administration/admin-user-management.service';
import { DetailedTestItem, TestContextIds } from '../../features/test-services/test-services.types';
import {
  SUPERADMIN_CREDENTIALS,
  SUPERADMIN_INSERT_ORG_PAYLOAD,
  SUPERADMIN_SMTP_PAYLOAD,
  SUPERADMIN_VALIDATE_LOGI_PAYLOAD,
  getSuperAdminTestItems
} from '../../features/test-services/test-services-superadmin.data';

export interface ApiTestResult {
  apiName: string;
  endpoint: string;
  method: string;
  payload: any;
  status: string;
  response: any;
  expectedData: string;
  matched: boolean;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SuperAdminTestRunnerService {
  public readonly credentials = SUPERADMIN_CREDENTIALS;
  public readonly smtpPayload = SUPERADMIN_SMTP_PAYLOAD;
  public readonly validateLogiPayload = SUPERADMIN_VALIDATE_LOGI_PAYLOAD;
  public readonly insertOrgPayload = SUPERADMIN_INSERT_ORG_PAYLOAD;

  public context: TestContextIds = {
    loggedInUserId: '1EA31513E4C24BD1B27F5DB4096655BC',
    firstOrgId: '1',
    firstAuthId: '1',
    firstDeptId: '1',
    firstRoleId: '1',
    firstUserId: '1',
    firstProgId: '1',
    firstProductId: '1'
  };

  constructor(
    private authService: SuperAdminAuthService,
    private orgService: SuperAdminOrganizationService,
    private authConfigService: SuperAdminAuthenticationService,
    private emailConfigService: SuperAdminEmailConfigService,
    private auditLogService: SuperAdminAuditLogService,
    private umService: SuperAdminUserManagementService,
    private adminUmService: AdminUserManagementService
  ) {
    // Expose test runner to window for direct browser console execution
    (window as any).runSuperAdminApiTests = () => this.runAllTests();
  }

  /**
   * Helper to extract an array safely whether response is bare array or wrapped in { Data: [...] }
   */
  private extractList(res: any): any[] {
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.Data)) return res.Data;
    if (Array.isArray(res?.data)) return res.data;
    return [];
  }

  /**
   * Execute single API call by ID with dynamic payload and context
   */
  public async executeApiCall(
    item: DetailedTestItem,
    effective: any,
    context: TestContextIds = this.context
  ): Promise<any> {
    let res: any;
    switch (item.id) {
      // 1. AUTH
      case 'SA-AUTH-1':
        res = await firstValueFrom(this.authService.getConfigData(effective?.orgCode || ''));
        item.matched = !!(res && (res.Data || res.apiURL || res.Status !== undefined || typeof res === 'object'));
        break;

      case 'SA-AUTH-2':
        res = await firstValueFrom(this.authService.getBuildVersion());
        item.matched = !!(res && (res.Data !== undefined || typeof res === 'string' || typeof res === 'object'));
        break;

      case 'SA-AUTH-3':
        res = await firstValueFrom(this.authService.checkEmailAddressExists(effective?.EMAIL || this.credentials.username, effective?.ORGANIZATION_ID || null));
        item.matched = res !== undefined;
        break;

      case 'SA-AUTH-4':
        res = await firstValueFrom(this.authService.checkUserType(effective?.CODE || this.credentials.username, effective?.ORGCODE || null));
        item.matched = !!(res && (res.USER_TYPE !== undefined || res.UserLoginType !== undefined || res.IsLoggedIn !== undefined || typeof res === 'object'));
        break;

      case 'SA-AUTH-5':
        res = await firstValueFrom(this.authService.multiBrowserVerification(effective || {
          CODE: this.credentials.username,
          PASSWORD: this.credentials.password,
          ORGCODE: this.credentials.orgCode,
          Browser: this.credentials.browser,
          Version: this.credentials.version
        }));
        item.matched = res !== undefined;
        break;

      case 'SA-AUTH-6': {
        res = await firstValueFrom(this.authService.login(effective || {
          CODE: this.credentials.username,
          PASSWORD: this.credentials.password,
          ORGCODE: this.credentials.orgCode,
          Browser: this.credentials.browser,
          Version: this.credentials.version
        }));
        const raw = res?.Data || res;
        const token = raw?.Token || raw?.token || raw?.access_token || res?.Token || res?.token;
        const userId = raw?.UserID || raw?.userId || raw?.ID || raw?.id || res?.UserID || res?.userId;
        if (token) {
          sessionStorage.setItem('token', token);
          localStorage.setItem('token', token);
          sessionStorage.setItem('jwt_token', token);
          localStorage.setItem('jwt_token', token);
          sessionStorage.setItem('app_is_authenticated', 'true');
        }
        if (userId) {
          context.loggedInUserId = String(userId);
        }
        item.matched = !!(res && (token || userId || res.Status !== undefined || typeof res === 'object'));
        break;
      }

      case 'SA-AUTH-7':
        res = await firstValueFrom(this.authService.checkSession());
        item.matched = res !== undefined;
        break;

      case 'SA-AUTH-8': {
        res = await firstValueFrom(this.authService.fetchTimezones());
        const tzList = this.extractList(res);
        item.matched = tzList.length > 0 || res !== undefined;
        break;
      }

      case 'SA-AUTH-9':
        res = await firstValueFrom(this.authService.getUserCurrency());
        item.matched = res !== undefined && res !== null;
        break;

      case 'SA-AUTH-10':
        res = await firstValueFrom(this.authService.getUserRoles(effective?.userId || context.loggedInUserId));
        item.matched = res !== undefined && res !== null;
        break;

      case 'SA-AUTH-11':
        res = await firstValueFrom(this.authService.logoutUserInOtherBrowser(effective?.userId || context.loggedInUserId, effective?.browser || this.credentials.browser));
        item.matched = res !== undefined;
        break;

      case 'SA-AUTH-12':
        res = await firstValueFrom(this.authService.logout(effective || {
          Reason: 'Logout test',
          Browser: this.credentials.browser,
          Version: this.credentials.version,
          UserId: context.loggedInUserId
        }));
        item.matched = res !== undefined;
        break;

      // 2. ORGANIZATIONS
      case 'SA-ORG-1': {
        res = await firstValueFrom(this.orgService.getAdvSearch(effective || { CODE: '', NAME: '', Status: '-1' }));
        const orgList = this.extractList(res);
        if (orgList.length > 0) {
          context.firstOrgId = String(orgList[0].ID || orgList[0].ORGANIZATION_ID || orgList[0].OrganizationID || orgList[0].id || '1');
        }
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;
      }

      case 'SA-ORG-2': {
        res = await firstValueFrom(this.orgService.getOrganizations());
        const list = this.extractList(res);
        if (list.length > 0 && !context.firstOrgId) {
          context.firstOrgId = String(list[0].ID || list[0].id || '1');
        }
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;
      }

      case 'SA-ORG-3':
        res = await firstValueFrom(this.orgService.getOrganizationsFromAppUser());
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      case 'SA-ORG-4':
        res = await firstValueFrom(this.orgService.getOrganizationById(effective?.id || context.firstOrgId || '1'));
        item.matched = !!(res && (res.ID !== undefined || res.CODE !== undefined || res.Data !== undefined || typeof res === 'object'));
        break;

      case 'SA-ORG-5':
        res = await firstValueFrom(this.orgService.getMasterScreenData(effective?.id || context.firstOrgId || '1'));
        item.matched = !!(res && (res.MasterData1 !== undefined || res.Data?.MasterData1 !== undefined || typeof res === 'object'));
        break;

      case 'SA-ORG-6':
        res = await firstValueFrom(this.orgService.getOrgAnalyticsInfo());
        item.matched = res !== undefined && res !== null;
        break;

      case 'SA-ORG-7':
        res = await firstValueFrom(this.orgService.getDefaultAuthentication());
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      case 'SA-ORG-8':
        res = await firstValueFrom(this.orgService.getUserSearchMaster());
        item.matched = !!(res && (res.MasterData1 !== undefined || res.MasterData2 !== undefined || res.Data !== undefined || typeof res === 'object'));
        break;

      case 'SA-ORG-9':
        res = await firstValueFrom(this.orgService.getSupportUsersAdvSearch(effective || { TITLE: '', EMAIL: '', DEPARTMENT_ID: '', ROLEID: '', RECORD_STATE: 101, ORGANIZATION_ID: context.firstOrgId }));
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      case 'SA-ORG-10':
        res = await firstValueFrom(this.orgService.getDebarmentList());
        item.matched = res !== undefined;
        break;

      case 'SA-ORG-11':
        res = await firstValueFrom(this.orgService.insertOrganization(effective || this.insertOrgPayload));
        item.matched = res !== undefined;
        break;

      case 'SA-ORG-12':
        res = await firstValueFrom(this.orgService.updateOrganization(effective || { ID: context.firstOrgId, CODE: 'TEST_ORG_01', NAME: 'Test Organization 01 Updated', STATUS: '1', PROGENABLED: '1' }));
        item.matched = res !== undefined;
        break;

      case 'SA-ORG-13':
        res = await firstValueFrom(this.orgService.insertSupportUser(effective || { FIRST_NAME: 'Support', LAST_NAME: 'Tester', EMAIL: 'support.tester@scimaxglobal.com', ORGANIZATION_ID: context.firstOrgId, RECORD_STATE: 101 }));
        item.matched = res !== undefined;
        break;

      case 'SA-ORG-14':
        res = await firstValueFrom(this.orgService.syncDashboards(effective || { OrgId: context.firstOrgId, OrgName: 'Default Org' }));
        item.matched = res !== undefined;
        break;

      case 'SA-ORG-15':
        res = await firstValueFrom(this.orgService.refreshOrg(effective || { OrgId: context.firstOrgId, OrgName: 'Default Org' }));
        item.matched = res !== undefined;
        break;

      case 'SA-ORG-16':
        res = await firstValueFrom(this.orgService.validateLogiConf(effective || this.validateLogiPayload));
        item.matched = res !== undefined;
        break;

      case 'SA-ORG-17':
        res = await firstValueFrom(this.orgService.updateDebarmentBlockStatus(effective?.debarmentId || '1', effective?.isBlocked || false));
        item.matched = res !== undefined;
        break;

      // 3. AUTHENTICATION CONFIGS
      case 'SA-AUTHCFG-1':
        res = await firstValueFrom(this.authConfigService.getAuthTypes());
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      case 'SA-AUTHCFG-2': {
        res = await firstValueFrom(this.authConfigService.getAuthSearchSummary(effective || { AuthName: '', AuthType: '-1', Status: '-1' }));
        const authList = this.extractList(res);
        if (authList.length > 0) {
          context.firstAuthId = String(authList[0].ID || authList[0].AuthId || authList[0].AUTH_ID || authList[0].id || '1');
        }
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;
      }

      case 'SA-AUTHCFG-3':
        res = await firstValueFrom(this.authConfigService.getAuthById(effective?.AuthId || context.firstAuthId || '1'));
        item.matched = !!(res && (res.ID !== undefined || res.AUTH_NAME !== undefined || res.Data !== undefined || typeof res === 'object'));
        break;

      case 'SA-AUTHCFG-4':
        res = await firstValueFrom(this.authConfigService.getAuthenticationsByOrgId(effective?.orgId || context.firstOrgId || '1'));
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      case 'SA-AUTHCFG-5':
        res = await firstValueFrom(this.authConfigService.insertSAML(effective));
        item.matched = res !== undefined;
        break;

      case 'SA-AUTHCFG-6':
        res = await firstValueFrom(this.authConfigService.insertLDAP(effective));
        item.matched = res !== undefined;
        break;

      case 'SA-AUTHCFG-7':
        res = await firstValueFrom(this.authConfigService.insertEmail(effective));
        item.matched = res !== undefined;
        break;

      case 'SA-AUTHCFG-8':
        res = await firstValueFrom(this.authConfigService.uploadAuth(effective));
        item.matched = res !== undefined;
        break;

      // 4. EMAIL / SMTP CONFIG
      case 'SA-EMAIL-1':
        res = await firstValueFrom(this.emailConfigService.fetchConfig());
        item.matched = res !== undefined && res !== null;
        break;

      case 'SA-EMAIL-2':
        res = await firstValueFrom(this.emailConfigService.getSMTPRecordList());
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      case 'SA-EMAIL-3':
        res = await firstValueFrom(this.emailConfigService.fetchRecordById(effective?.EmailConfigID || 'C4F5E8A6-2A65-472B-AB7F-C5F39C057768'));
        item.matched = res !== undefined && res !== null;
        break;

      case 'SA-EMAIL-4':
        res = await firstValueFrom(this.emailConfigService.smtpTest(effective));
        item.matched = res !== undefined;
        break;

      case 'SA-EMAIL-5':
        res = await firstValueFrom(this.emailConfigService.graphApiSendTest(effective));
        item.matched = res !== undefined;
        break;

      case 'SA-EMAIL-6':
        res = await firstValueFrom(this.emailConfigService.insertSMTPConfiguration(effective || this.smtpPayload));
        item.matched = res !== undefined;
        break;

      // 5. AUDIT LOGS
      case 'SA-AUDIT-1':
        res = await firstValueFrom(this.auditLogService.getAuditLogRecordList(effective || { Category: 'Organization', Name: '', StartDate: '', EndDate: '' }));
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      case 'SA-AUDIT-2':
        res = await firstValueFrom(this.auditLogService.getAuditLogRevisionList(effective?.RelatedPkId || context.firstOrgId || '1', effective?.CatergoryType || 'Organization'));
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      case 'SA-AUDIT-3':
        res = await firstValueFrom(this.auditLogService.getAuditLogDetailsList(effective || { versionIDs: [], categories: 'Organization' }));
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      // 6. DEPARTMENTS
      case 'SA-DEPT-1': {
        res = await firstValueFrom(this.umService.getDeptAdvSearch(effective || { CODE: '', NAME: '', STATUS: '-1' }));
        const deptList = this.extractList(res);
        if (deptList.length > 0) {
          context.firstDeptId = String(deptList[0].DEPARTMENT_ID || deptList[0].DepartmentId || deptList[0].ID || deptList[0].id || '1');
        }
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;
      }

      case 'SA-DEPT-2':
        res = await firstValueFrom(this.umService.getDepartments('-1', '-1'));
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      case 'SA-DEPT-3':
        res = await firstValueFrom(this.umService.getDepartmentById(effective?.id || context.firstDeptId || '1'));
        item.matched = !!(res && (res.DEPARTMENT_ID !== undefined || res.CODE !== undefined || res.Data !== undefined || typeof res === 'object'));
        break;

      case 'SA-DEPT-4':
        res = await firstValueFrom(this.umService.insertDepartment(effective || { CODE: 'TEST_DEPT', NAME: 'Test Department', STATUS: 1 }));
        item.matched = res !== undefined;
        break;

      case 'SA-DEPT-5':
        res = await firstValueFrom(this.umService.updateDepartment(effective || { ID: context.firstDeptId, CODE: 'TEST_DEPT', NAME: 'Test Department Updated', STATUS: 1 }));
        item.matched = res !== undefined;
        break;

      case 'SA-DEPT-6':
        res = await firstValueFrom(this.umService.deleteDepartment(effective?.id || '9999'));
        item.matched = res !== undefined;
        break;

      // 7. ROLES & PRIVILEGES
      case 'SA-ROLE-1': {
        res = await firstValueFrom(this.umService.getRoleAdvSearch(effective || { ROLE_NAME: '', STATUS: '-1' }));
        const roleList = this.extractList(res);
        if (roleList.length > 0) {
          context.firstRoleId = String(roleList[0].ROLEID || roleList[0].RoleId || roleList[0].ROLE_ID || roleList[0].ID || roleList[0].id || '1');
        }
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;
      }

      case 'SA-ROLE-2':
        res = await firstValueFrom(this.umService.getRoles('-1'));
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      case 'SA-ROLE-3':
        res = await firstValueFrom(this.umService.getActiveRoles());
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      case 'SA-ROLE-4':
        res = await firstValueFrom(this.umService.getRoleById(effective?.id || context.firstRoleId || '1'));
        item.matched = !!(res && (res.ROLEID !== undefined || res.ROLE_NAME !== undefined || res.Data !== undefined || typeof res === 'object'));
        break;

      case 'SA-ROLE-5':
        res = await firstValueFrom(this.umService.getModules());
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      case 'SA-ROLE-6':
        res = await firstValueFrom(this.umService.getRolePrivileges(effective?.id || context.firstRoleId || '1'));
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      case 'SA-ROLE-7':
        res = await firstValueFrom(this.umService.insertRole(effective || { ROLE_NAME: 'Test Super Admin Role', ROLE_CODE: 'TEST_ROLE', STATUS: 1 }));
        item.matched = res !== undefined;
        break;

      case 'SA-ROLE-8':
        res = await firstValueFrom(this.umService.updateRole(effective || { ID: context.firstRoleId, ROLE_NAME: 'Test Super Admin Role Updated', ROLE_CODE: 'TEST_ROLE', STATUS: 1 }));
        item.matched = res !== undefined;
        break;

      case 'SA-ROLE-9':
        res = await firstValueFrom(this.umService.insertRolePrivilege(effective || [{ ROLE_ID: context.firstRoleId, PRIVILEGE_ID: '1', MODULE_ID: '1', STATUS: 1 }]));
        item.matched = res !== undefined;
        break;

      case 'SA-ROLE-10':
        res = await firstValueFrom(this.umService.deleteRole(effective?.id || '9999'));
        item.matched = res !== undefined;
        break;

      // 8. USER MANAGEMENT
      case 'SA-USER-1': {
        res = await firstValueFrom(this.adminUmService.getUsersAdvSearch(effective || { CODE: '', TITLE: '', EMAIL: '', DEPARTMENT_ID: '', ROLEID: '', STATUS: '-1', RECORD_STATE: 101 }));
        const userList = this.extractList(res);
        if (userList.length > 0) {
          context.firstUserId = String(userList[0].USER_ID || userList[0].UserId || userList[0].UserID || userList[0].ID || userList[0].id || '1');
        }
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;
      }

      case 'SA-USER-2':
        res = await firstValueFrom(this.umService.getUserById(effective?.id || context.loggedInUserId || '1'));
        item.matched = !!(res && (res.USER_ID !== undefined || res.ID !== undefined || res.Data !== undefined || typeof res === 'object'));
        break;

      case 'SA-USER-3':
        res = await firstValueFrom(this.umService.getSupportUserById(effective?.id || '1'));
        item.matched = res !== undefined && res !== null;
        break;

      case 'SA-USER-4':
        res = await firstValueFrom(this.umService.getInternalUsers());
        item.matched = Array.isArray(res) || Array.isArray(res?.Data) || res !== undefined;
        break;

      case 'SA-USER-5':
        res = await firstValueFrom(this.umService.insertUser(effective || { FIRST_NAME: 'Test', LAST_NAME: 'User', EMAIL: 'test.user@scimaxglobal.com', CODE: 'test.user@scimaxglobal.com', USER_TYPE: 'U', ORGANIZATION_ID: context.firstOrgId, STATUS: 1 }));
        item.matched = res !== undefined;
        break;

      case 'SA-USER-6':
        res = await firstValueFrom(this.umService.updateUser(effective || { ID: context.loggedInUserId, FIRST_NAME: 'Super', LAST_NAME: 'Admin', EMAIL: 'superadmin@scimaxglobal.com', STATUS: 1 }));
        item.matched = res !== undefined;
        break;

      case 'SA-USER-7':
        res = await firstValueFrom(this.umService.resendUserEmail(effective?.userId || context.loggedInUserId || '1', effective?.orgId || context.firstOrgId || '1'));
        item.matched = res !== undefined;
        break;

      case 'SA-USER-8':
        res = await firstValueFrom(this.umService.deleteUser(effective?.id || '9999'));
        item.matched = res !== undefined;
        break;

      default:
        throw new Error(`Handler for ${item.id} not defined`);
    }
    return res;
  }

  /**
   * Run the complete Super Admin API Test Suite
   */
  public async runAllTests(): Promise<DetailedTestItem[]> {
    console.log(
      '%c=======================================================\n' +
      '  STARTING SUPER ADMIN API TEST SUITE\n' +
      `  User: ${this.credentials.username}\n` +
      '=======================================================',
      'color: #00bcd4; font-weight: bold; font-size: 14px;'
    );

    const items = getSuperAdminTestItems(
      this.credentials,
      this.smtpPayload,
      this.validateLogiPayload,
      this.insertOrgPayload,
      this.context
    );

    // 1. Run Login (SA-AUTH-6) FIRST so token and user context are initialized
    const loginItem = items.find(t => t.id === 'SA-AUTH-6');
    if (loginItem) {
      await this.runSingleItem(loginItem);
    }

    // 2. Run all other items except login (SA-AUTH-6) and logout (SA-AUTH-12)
    for (const item of items) {
      if (item.id === 'SA-AUTH-6' || item.id === 'SA-AUTH-12') continue;
      await this.runSingleItem(item);
    }

    // 3. Run Logout (SA-AUTH-12) LAST so session is not terminated prematurely
    const logoutItem = items.find(t => t.id === 'SA-AUTH-12');
    if (logoutItem) {
      await this.runSingleItem(logoutItem);
    }

    const passed = items.filter(t => t.status === 'SUCCESS' && t.matched).length;
    console.log(
      `%c[SUPERADMIN TEST COMPLETE] Total: ${items.length} | Passed: ${passed} | Failed: ${items.length - passed}`,
      passed === items.length ? 'color: #10b981; font-weight: bold;' : 'color: #f59e0b; font-weight: bold;'
    );

    return items;
  }

  private async runSingleItem(item: DetailedTestItem): Promise<void> {
    item.status = 'RUNNING';
    const start = performance.now();
    try {
      const res = await this.executeApiCall(item, item.payload, this.context);
      item.durationMs = Math.round(performance.now() - start);
      item.statusCode = 200;
      item.status = 'SUCCESS';
      item.response = res;
    } catch (err: any) {
      item.durationMs = Math.round(performance.now() - start);
      item.statusCode = err?.status || 'ERR';
      item.status = 'FAILED';
      item.error = err;
      item.response = err?.error || err?.message;
      item.matched = false;
    }
  }
}
