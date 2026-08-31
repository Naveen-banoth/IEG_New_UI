import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AdminUserManagementService } from './admin-user-management.service';
import { AdminProductSetupService } from './admin-product-setup.service';
import { AdminInstructionsConfigService } from './admin-instructions-config.service';
import { AdminPlatformLogsService } from './admin-platform-logs.service';
import { AdminWorkflowPolicyService } from './admin-workflow-policy.service';
import { AdminEmailConfigurationService } from './admin-email-configuration.service';
import { DetailedTestItem, TestContextIds } from '../../features/test-services/test-services.types';
import { getAdministrationTestItems } from '../../features/test-services/test-services-admin.data';

export interface AdminApiTestResult {
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
export class AdminTestRunnerService {
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
    private userMgmtService: AdminUserManagementService,
    private productSetupService: AdminProductSetupService,
    private instructionsService: AdminInstructionsConfigService,
    private platformLogsService: AdminPlatformLogsService,
    private workflowPolicyService: AdminWorkflowPolicyService,
    private emailConfigService: AdminEmailConfigurationService
  ) {
    // Expose test runner to window for direct browser console execution
    (window as any).runAdministrationApiTests = () => this.runAllTests();
  }

  /**
   * Execute single Administration API call by ID with dynamic payload and context
   */
  public async executeApiCall(
    item: DetailedTestItem,
    effective: any,
    context: TestContextIds = this.context
  ): Promise<any> {
    let res: any;
    switch (item.id) {
      // 1. CORE & UM
      case 'ADM-DEPT-1':
        res = await firstValueFrom(this.userMgmtService.getDeptAdvSearch(effective));
        if (Array.isArray(res) && res.length > 0 && res[0].DEPARTMENT_ID) {
          context.firstDeptId = res[0].DEPARTMENT_ID;
        }
        item.matched = Array.isArray(res);
        break;

      case 'ADM-DEPT-2':
        res = await firstValueFrom(this.userMgmtService.getDepartments('-1', '-1'));
        item.matched = Array.isArray(res);
        break;

      case 'ADM-DEPT-3':
        res = await firstValueFrom(this.userMgmtService.getDepartmentById(effective?.id || context.firstDeptId));
        item.matched = res !== undefined;
        break;

      case 'ADM-DEPT-4':
        res = await firstValueFrom(this.userMgmtService.insertDepartment(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-DEPT-5':
        res = await firstValueFrom(this.userMgmtService.updateDepartment(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-ROLE-1':
        res = await firstValueFrom(this.userMgmtService.getRoleAdvSearch(effective));
        if (Array.isArray(res) && res.length > 0 && res[0].ROLEID) {
          context.firstRoleId = res[0].ROLEID;
        }
        item.matched = Array.isArray(res);
        break;

      case 'ADM-ROLE-2':
        res = await firstValueFrom(this.userMgmtService.getModules());
        item.matched = Array.isArray(res);
        break;

      case 'ADM-ROLE-3':
        res = await firstValueFrom(this.userMgmtService.getRolePrivileges(effective?.id || context.firstRoleId));
        item.matched = Array.isArray(res);
        break;

      case 'ADM-ROLE-4':
        res = await firstValueFrom(this.userMgmtService.insertRole(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-ROLE-5':
        res = await firstValueFrom(this.userMgmtService.updateRole(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-USER-1':
        res = await firstValueFrom(this.userMgmtService.getUsersAdvSearch(effective));
        if (Array.isArray(res) && res.length > 0 && res[0].USER_ID) {
          context.firstUserId = res[0].USER_ID;
        }
        item.matched = Array.isArray(res);
        break;

      case 'ADM-USER-2':
        res = await firstValueFrom(this.userMgmtService.getUserSearchMaster());
        item.matched = !!(res && (res.MasterData1 !== undefined || res.MasterData2 !== undefined));
        break;

      case 'ADM-USER-3':
        res = await firstValueFrom(this.userMgmtService.getInternalUsers());
        item.matched = Array.isArray(res);
        break;

      case 'ADM-USER-4':
        res = await firstValueFrom(this.userMgmtService.insertUser(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-USER-5':
        res = await firstValueFrom(this.userMgmtService.updateUser(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-SET-1':
        res = await firstValueFrom(this.userMgmtService.fetchTimeZones());
        item.matched = Array.isArray(res) || res !== undefined;
        break;

      case 'ADM-SET-2':
        res = await firstValueFrom(this.userMgmtService.timeZoneAutoSave(effective?.timezone || '(UTC-05:00) Eastern Time (US & Canada)'));
        item.matched = res !== undefined;
        break;

      case 'ADM-SET-3':
        res = await firstValueFrom(this.userMgmtService.currencyAutoSave(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-SET-4':
        res = await firstValueFrom(this.userMgmtService.getCurrency());
        item.matched = res !== undefined;
        break;

      // 2. EMAIL CONFIGURATION (EMAIL)
      case 'ADM-EML-1':
        res = await firstValueFrom(this.emailConfigService.getSummarySearchAsync(effective));
        item.matched = Array.isArray(res) || res !== undefined;
        break;

      case 'ADM-EML-2':
        res = await firstValueFrom(this.emailConfigService.fetchConfigAsync(effective?.id || 'C4F5E8A6-2A65-472B-AB7F-C5F39C057768'));
        item.matched = res !== undefined;
        break;

      case 'ADM-EML-3':
        res = await firstValueFrom(this.emailConfigService.insertConfigAsync(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-EML-4':
        res = await firstValueFrom(this.emailConfigService.updateConfigAsync(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-EML-5':
        res = await firstValueFrom(this.emailConfigService.smtpTestAsync(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-EML-6':
        res = await firstValueFrom(this.emailConfigService.imapTestAsync(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-EML-7':
        res = await firstValueFrom(this.emailConfigService.graphSendTestAsync(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-EML-8':
        res = await firstValueFrom(this.emailConfigService.graphReadTestAsync(effective));
        item.matched = res !== undefined;
        break;

      // 3. PRODUCT & LOOKUPS
      case 'ADM-PROD-1':
        res = await firstValueFrom(this.productSetupService.getProgramSummary());
        if (Array.isArray(res) && res.length > 0 && res[0].PROGRAM_ID) {
          context.firstProgId = res[0].PROGRAM_ID;
        }
        item.matched = Array.isArray(res);
        break;

      case 'ADM-PROD-2':
        res = await firstValueFrom(this.productSetupService.getProgramAdvSearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'ADM-PROD-3':
        res = await firstValueFrom(this.productSetupService.insertProgramCategory(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-PROD-4':
        res = await firstValueFrom(this.productSetupService.updateProgramCategory(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-PROD-5':
        res = await firstValueFrom(this.productSetupService.getProductSummary());
        if (Array.isArray(res) && res.length > 0 && res[0].PRODUCT_ID) {
          context.firstProductId = res[0].PRODUCT_ID;
        }
        item.matched = Array.isArray(res);
        break;

      case 'ADM-PROD-6':
        res = await firstValueFrom(this.productSetupService.getProductAdvSearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'ADM-PROD-7':
        res = await firstValueFrom(this.productSetupService.getProductMasterScreenData());
        item.matched = !!(res && (res.MasterData3 !== undefined || typeof res === 'object'));
        break;

      case 'ADM-PROD-8':
        res = await firstValueFrom(this.productSetupService.insertProduct(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-PROD-9':
        res = await firstValueFrom(this.productSetupService.updateProduct(effective));
        item.matched = res !== undefined;
        break;

      case 'ADM-PROD-10':
        res = await firstValueFrom(this.productSetupService.getProductNetworkLocationsSummary());
        item.matched = Array.isArray(res);
        break;

      case 'ADM-PROD-11':
        res = await firstValueFrom(this.productSetupService.getLookupsSummary());
        item.matched = Array.isArray(res);
        break;

      case 'ADM-PROD-12':
        res = await firstValueFrom(this.productSetupService.getHLookupsSummary());
        item.matched = Array.isArray(res);
        break;

      case 'ADM-PROD-13':
        res = await firstValueFrom(this.productSetupService.getModulesList());
        item.matched = Array.isArray(res);
        break;

      case 'ADM-PROD-14':
        res = await firstValueFrom(this.productSetupService.getReviewTypesSummary());
        item.matched = Array.isArray(res);
        break;

      // 4. INSTRUCTIONS & FAQS
      case 'ADM-INST-1':
        res = await firstValueFrom(this.instructionsService.getAppTypeModules());
        item.matched = Array.isArray(res);
        break;

      case 'ADM-INST-2':
        res = await firstValueFrom(this.instructionsService.getFaqAdvSearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'ADM-INST-3':
        res = await firstValueFrom(this.instructionsService.getEmailTemplatesSearchSummary(effective));
        item.matched = Array.isArray(res);
        break;

      case 'ADM-INST-4':
        res = await firstValueFrom(this.instructionsService.getAutoCodeModules());
        item.matched = Array.isArray(res);
        break;

      case 'ADM-INST-5':
        res = await firstValueFrom(this.instructionsService.getAutoCodeSearchSummary(effective));
        item.matched = Array.isArray(res);
        break;

      case 'ADM-INST-6':
        res = await firstValueFrom(this.instructionsService.fetchRegistrationConfigSummary());
        item.matched = Array.isArray(res) || res !== undefined;
        break;

      case 'ADM-INST-7':
        res = await firstValueFrom(this.instructionsService.getApplicationTypesSummary());
        item.matched = Array.isArray(res);
        break;

      case 'ADM-INST-8':
        res = await firstValueFrom(this.instructionsService.getRFPSearchSummary(effective));
        item.matched = Array.isArray(res);
        break;

      case 'ADM-INST-9':
        res = await firstValueFrom(this.instructionsService.getRFISearchSummary(effective));
        item.matched = Array.isArray(res);
        break;

      // 5. PLATFORM & LOGS
      case 'ADM-PLAT-1':
        res = await firstValueFrom(this.platformLogsService.getThemeSummary());
        item.matched = Array.isArray(res);
        break;

      case 'ADM-PLAT-2':
        res = await firstValueFrom(this.platformLogsService.getAuditTrailSearchSummary(effective));
        item.matched = Array.isArray(res);
        break;

      case 'ADM-PLAT-3':
        res = await firstValueFrom(this.platformLogsService.getAdvancedUserLoginLogs(effective));
        item.matched = Array.isArray(res);
        break;

      case 'ADM-PLAT-4':
        res = await firstValueFrom(this.platformLogsService.getAnalyticsDashboardsDetails(effective));
        item.matched = Array.isArray(res);
        break;

      case 'ADM-PLAT-5':
        res = await firstValueFrom(this.platformLogsService.getUserDashboards());
        item.matched = Array.isArray(res);
        break;

      // 6. WORKFLOW & POLICY
      case 'ADM-WF-1':
        res = await firstValueFrom(this.workflowPolicyService.getPolicyModules());
        item.matched = Array.isArray(res);
        break;

      case 'ADM-WF-2':
        res = await firstValueFrom(this.workflowPolicyService.getScreenPolicyVersionDetails());
        item.matched = Array.isArray(res);
        break;

      case 'ADM-WF-3':
        res = await firstValueFrom(this.workflowPolicyService.getWorkflowStatesSummary());
        item.matched = Array.isArray(res);
        break;

      case 'ADM-WF-4':
        res = await firstValueFrom(this.workflowPolicyService.getBudgetSummary());
        item.matched = Array.isArray(res);
        break;

      case 'ADM-WF-5':
        res = await firstValueFrom(this.workflowPolicyService.getBudgetMasterData('-1', '-1'));
        item.matched = !!(res && (res.MasterData1 !== undefined || typeof res === 'object'));
        break;

      case 'ADM-WF-6':
        res = await firstValueFrom(this.workflowPolicyService.getTimeConfig());
        item.matched = res !== undefined;
        break;

      default:
        throw new Error(`Handler for ${item.id} not defined`);
    }
    return res;
  }

  /**
   * Run the complete Administration API Test Suite
   */
  public async runAllTests(): Promise<DetailedTestItem[]> {
    console.log(
      '%c=======================================================\n' +
      '  STARTING ADMINISTRATION API TEST SUITE\n' +
      '  Modules: Core Settings | Product Setup | Instructions | Platform Logs | Workflow & Policy\n' +
      '=======================================================',
      'color: #2196f3; font-weight: bold; font-size: 14px;'
    );

    const items = getAdministrationTestItems(this.context);

    for (const item of items) {
      await this.runSingleItem(item);
    }

    const passed = items.filter(t => t.status === 'SUCCESS' && t.matched).length;
    console.log(
      `%c[ADMINISTRATION TEST COMPLETE] Total: ${items.length} | Passed: ${passed} | Failed: ${items.length - passed}`,
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
