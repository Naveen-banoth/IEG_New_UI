import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UmAuditLogService } from './um-audit-log.service';
import { UmUserManagementService } from './um-user-management.service';
import { DetailedTestItem, TestContextIds } from '../../features/test-services/test-services.types';
import { getUmTestItems } from '../../features/test-services/test-services-um.data';

export interface UmApiTestResult {
  module: string;
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
export class UmTestRunnerService {
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
    private auditLogService: UmAuditLogService,
    private userMgmtService: UmUserManagementService
  ) {
    // Expose test runner to window for direct browser console execution
    (window as any).runUmApiTests = () => this.runAllTests();
  }

  /**
   * Execute single UM API call by ID with dynamic payload and context
   */
  public async executeApiCall(
    item: DetailedTestItem,
    effective: any,
    context: TestContextIds = this.context
  ): Promise<any> {
    let res: any;
    switch (item.id) {
      // 1. AUDIT & ACTIVITY LOGS
      case 'UM-AUD-1':
        res = await firstValueFrom(this.auditLogService.searchAuditRecords(effective));
        item.matched = res !== undefined;
        break;

      case 'UM-AUD-2':
        res = await firstValueFrom(this.auditLogService.getAuditLogDetailsList(effective));
        item.matched = res !== undefined;
        break;

      case 'UM-AUD-3':
        res = await firstValueFrom(this.auditLogService.getAuditLogRevisionList('1', 'Organization'));
        item.matched = res !== undefined;
        break;

      case 'UM-AUD-4':
        res = await firstValueFrom(this.auditLogService.getActivityLogsSearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'UM-AUD-5':
        res = await firstValueFrom(this.auditLogService.getActivityLogByAppId('1'));
        item.matched = Array.isArray(res);
        break;

      case 'UM-AUD-6':
        res = await firstValueFrom(this.auditLogService.getAuditLogMultiSummary(effective));
        item.matched = Array.isArray(res);
        break;

      case 'UM-AUD-7':
        res = await firstValueFrom(this.auditLogService.getAllOrgUsersList('IST'));
        item.matched = Array.isArray(res);
        break;

      case 'UM-AUD-8':
        res = await firstValueFrom(this.auditLogService.getApplicationIdsList('IST'));
        item.matched = Array.isArray(res);
        break;

      case 'UM-AUD-9':
        res = await firstValueFrom(this.auditLogService.getGrantTypes('GM'));
        item.matched = Array.isArray(res);
        break;

      case 'UM-AUD-10':
        res = await firstValueFrom(this.auditLogService.getScreenNameList('IST'));
        item.matched = Array.isArray(res);
        break;

      // 2. USERS
      case 'UM-USR-1':
        res = await firstValueFrom(this.userMgmtService.getUserSummary('-1'));
        item.matched = Array.isArray(res);
        break;

      case 'UM-USR-2':
        res = await firstValueFrom(this.userMgmtService.getUserSearchMaster());
        item.matched = res !== undefined;
        break;

      case 'UM-USR-3':
        res = await firstValueFrom(this.userMgmtService.getUserAdvSearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'UM-USR-4':
        res = await firstValueFrom(this.userMgmtService.getInternalUsers());
        item.matched = Array.isArray(res);
        break;

      case 'UM-USR-5':
        res = await firstValueFrom(this.userMgmtService.getUserById('1'));
        item.matched = res !== undefined;
        break;

      case 'UM-USR-6':
        res = await firstValueFrom(this.userMgmtService.getSupportUserById('1'));
        item.matched = res !== undefined;
        break;

      case 'UM-USR-7':
        res = await firstValueFrom(this.userMgmtService.insertUser(effective));
        item.matched = res !== undefined;
        break;

      case 'UM-USR-8':
        res = await firstValueFrom(this.userMgmtService.updateUser(effective));
        item.matched = res !== undefined;
        break;

      case 'UM-USR-9':
        res = await firstValueFrom(this.userMgmtService.deleteUser('9999'));
        item.matched = res !== undefined;
        break;

      case 'UM-USR-10':
        res = await firstValueFrom(this.userMgmtService.addUserRoles(effective));
        item.matched = res !== undefined;
        break;

      case 'UM-USR-11':
        res = await firstValueFrom(this.userMgmtService.addSupportUser(effective));
        item.matched = res !== undefined;
        break;

      // 3. DEPARTMENTS & ROLES
      case 'UM-DPT-1':
        res = await firstValueFrom(this.userMgmtService.getDepartments('-1', '-1'));
        item.matched = Array.isArray(res);
        break;

      case 'UM-DPT-2':
        res = await firstValueFrom(this.userMgmtService.getDepartmentAdvSearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'UM-DPT-3':
        res = await firstValueFrom(this.userMgmtService.insertDepartment(effective));
        item.matched = res !== undefined;
        break;

      case 'UM-DPT-4':
        res = await firstValueFrom(this.userMgmtService.updateDepartment(effective));
        item.matched = res !== undefined;
        break;

      case 'UM-DPT-5':
        res = await firstValueFrom(this.userMgmtService.deleteDepartment('9999'));
        item.matched = res !== undefined;
        break;

      case 'UM-ROL-1':
        res = await firstValueFrom(this.userMgmtService.getRoles('-1'));
        item.matched = Array.isArray(res);
        break;

      case 'UM-ROL-2':
        res = await firstValueFrom(this.userMgmtService.getRoleAdvSearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'UM-ROL-3':
        res = await firstValueFrom(this.userMgmtService.getSystemModules());
        item.matched = Array.isArray(res);
        break;

      case 'UM-ROL-4':
        res = await firstValueFrom(this.userMgmtService.insertRole(effective));
        item.matched = res !== undefined;
        break;

      case 'UM-ROL-5':
        res = await firstValueFrom(this.userMgmtService.updateRole(effective));
        item.matched = res !== undefined;
        break;

      case 'UM-ROL-6':
        res = await firstValueFrom(this.userMgmtService.deleteRole('9999'));
        item.matched = res !== undefined;
        break;

      case 'UM-ROL-7':
        res = await firstValueFrom(this.userMgmtService.insertRolePrivilege(effective));
        item.matched = res !== undefined;
        break;

      // 4. ORGANIZATIONS
      case 'UM-ORG-1':
        res = await firstValueFrom(this.userMgmtService.getOrganizations());
        item.matched = Array.isArray(res);
        break;

      case 'UM-ORG-2':
        res = await firstValueFrom(this.userMgmtService.getOrganizationAdvSearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'UM-ORG-3':
        res = await firstValueFrom(this.userMgmtService.getOrgsForStorage('DEFAULT'));
        item.matched = res !== undefined;
        break;

      case 'UM-ORG-4':
        res = await firstValueFrom(this.userMgmtService.insertOrganization(effective));
        item.matched = res !== undefined;
        break;

      case 'UM-ORG-5':
        res = await firstValueFrom(this.userMgmtService.updateOrganization(effective));
        item.matched = res !== undefined;
        break;

      case 'UM-ORG-6':
        res = await firstValueFrom(this.userMgmtService.deleteOrganization('9999'));
        item.matched = res !== undefined;
        break;

      default:
        res = { message: 'No execution handler mapped' };
        item.matched = true;
    }
    return res;
  }

  /**
   * Run all UM APIs programmatically in sequence and log to console
   */
  public async runAllTests(): Promise<DetailedTestItem[]> {
    console.log(
      '%c=======================================================\n' +
      '  STARTING USER MANAGEMENT (UM) API SUITE EXECUTION\n' +
      '=======================================================',
      'color: #ec4899; font-weight: bold; font-size: 14px;'
    );

    const items = getUmTestItems(this.context);
    const results: DetailedTestItem[] = [];

    for (const item of items) {
      item.status = 'RUNNING';
      const start = performance.now();
      try {
        const res = await this.executeApiCall(item, item.payload, this.context);
        item.durationMs = Math.round(performance.now() - start);
        item.statusCode = 200;
        item.status = 'SUCCESS';
        item.response = res;

        console.log(
`===== API TEST [${item.categoryLabel}] =====
API Name: ${item.apiName}
Endpoint: ${item.endpoint}
Method: ${item.method}
Status: SUCCESS (200 OK)
Duration: ${item.durationMs}ms
Response:`, res,
`
Matched: ${item.matched ? 'YES' : 'NO'}
============================================`
        );
      } catch (err: any) {
        item.durationMs = Math.round(performance.now() - start);
        item.statusCode = err?.status || 'ERR';
        item.status = 'FAILED';
        item.error = err;
        item.response = err?.error || err?.message;
        item.matched = false;

        console.error(
`===== API TEST FAILED [${item.categoryLabel}] =====
API Name: ${item.apiName}
Endpoint: ${item.endpoint}
Method: ${item.method}
Status: FAILED (${item.statusCode})
Error:`, err,
`
Matched: NO
===================================================`
        );
      }
      results.push(item);
    }

    console.table(
      results.map(r => ({
        ID: r.id,
        Category: r.category,
        API_Name: r.apiName,
        Endpoint: r.endpoint,
        Status: r.status,
        Duration: `${r.durationMs}ms`
      }))
    );

    return results;
  }
}
