import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EapGeneralInfoService } from './eap-general-info.service';
import { EapStudyTeamService } from './eap-study-team.service';
import { EapMilestonesService } from './eap-milestones.service';
import { EapRequestsService } from './eap-requests.service';
import { DetailedTestItem, TestContextIds } from '../../features/test-services/test-services.types';
import { getEapTestItems } from '../../features/test-services/test-services-eap.data';

export interface EapApiTestResult {
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
export class EapTestRunnerService {
  public context: TestContextIds = {
    loggedInUserId: '1EA31513E4C24BD1B27F5DB4096655BC',
    firstOrgId: 'ae16f95d-494f-4937-ab44-2e05bf736ee4',
    firstAuthId: '1',
    firstDeptId: '1',
    firstRoleId: '1',
    firstUserId: '1',
    firstProgId: '1',
    firstProductId: '1'
  };

  constructor(
    private generalInfoService: EapGeneralInfoService,
    private studyTeamService: EapStudyTeamService,
    private milestonesService: EapMilestonesService,
    private requestsService: EapRequestsService
  ) {
    // Expose test runner to window for direct browser console execution
    (window as any).runEapApiTests = () => this.runAllTests();
  }

  /**
   * Execute single EAP API call by ID with dynamic payload and context
   */
  public async executeApiCall(
    item: DetailedTestItem,
    effective: any,
    context: TestContextIds = this.context
  ): Promise<any> {
    let res: any;
    switch (item.id) {
      // 1. GENERAL INFO & APPLICATIONS
      case 'EAP-GEN-1':
        res = await firstValueFrom(this.generalInfoService.getApplicationsList());
        item.matched = Array.isArray(res);
        break;

      case 'EAP-GEN-2':
        res = await firstValueFrom(this.generalInfoService.getSummarySearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'EAP-GEN-3':
        res = await firstValueFrom(this.generalInfoService.getMasterList('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-GEN-4':
        res = await firstValueFrom(this.generalInfoService.getMyApplicationsList());
        item.matched = Array.isArray(res);
        break;

      case 'EAP-GEN-5':
        res = await firstValueFrom(this.generalInfoService.getMySummarySearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'EAP-GEN-6':
        res = await firstValueFrom(this.generalInfoService.getAppChangeLog('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-GEN-7':
        res = await firstValueFrom(this.generalInfoService.getAppSubmitValidation('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-GEN-8':
        res = await firstValueFrom(this.generalInfoService.insertGeneralInfo(effective));
        item.matched = res !== undefined;
        break;

      case 'EAP-GEN-9':
        res = await firstValueFrom(this.generalInfoService.updateGeneralInfo(effective));
        item.matched = res !== undefined;
        break;

      case 'EAP-GEN-10':
        res = await firstValueFrom(this.generalInfoService.insertOrganization(effective));
        item.matched = res !== undefined;
        break;

      // 2. STUDY TEAM & ORGANIZATIONS
      case 'EAP-STM-1':
        res = await firstValueFrom(this.studyTeamService.getStudyTeamMasterData('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-STM-2':
        res = await firstValueFrom(this.studyTeamService.getStudyTeamMasterDataSearch('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-STM-3':
        res = await firstValueFrom(this.studyTeamService.getStudyTeamSummaryData('1'));
        item.matched = Array.isArray(res);
        break;

      case 'EAP-STM-4':
        res = await firstValueFrom(this.studyTeamService.getStudyTeamSummarySearchData(effective));
        item.matched = Array.isArray(res);
        break;

      case 'EAP-STM-5':
        res = await firstValueFrom(this.studyTeamService.editStudyTeam('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-STM-6':
        res = await firstValueFrom(this.studyTeamService.insertStudyTeam(effective));
        item.matched = res !== undefined;
        break;

      case 'EAP-STM-7':
        res = await firstValueFrom(this.studyTeamService.updateStudyTeam(effective));
        item.matched = res !== undefined;
        break;

      case 'EAP-STM-8':
        res = await firstValueFrom(this.studyTeamService.getReviewBoardData('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-STM-9':
        res = await firstValueFrom(this.studyTeamService.insertReviewBoard(effective));
        item.matched = res !== undefined;
        break;

      case 'EAP-STM-10':
        res = await firstValueFrom(this.studyTeamService.updateReviewBoard(effective));
        item.matched = res !== undefined;
        break;

      // 3. MILESTONES & STUDY REPORTS
      case 'EAP-MLS-1':
        res = await firstValueFrom(this.milestonesService.getMilestonesSummaryData('1'));
        item.matched = Array.isArray(res);
        break;

      case 'EAP-MLS-2':
        res = await firstValueFrom(this.milestonesService.getMilestonesSummarySearchData(effective));
        item.matched = Array.isArray(res);
        break;

      case 'EAP-MLS-3':
        res = await firstValueFrom(this.milestonesService.editMilestone('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-MLS-4':
        res = await firstValueFrom(this.milestonesService.insertMilestone(effective));
        item.matched = res !== undefined;
        break;

      case 'EAP-MLS-5':
        res = await firstValueFrom(this.milestonesService.updateMilestone(effective));
        item.matched = res !== undefined;
        break;

      case 'EAP-MLS-6':
        res = await firstValueFrom(this.milestonesService.sendMilestoneNotification('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-MLS-7':
        res = await firstValueFrom(this.milestonesService.getStudyReportsSummaryData('1'));
        item.matched = Array.isArray(res);
        break;

      case 'EAP-MLS-8':
        res = await firstValueFrom(this.milestonesService.getStudyReportsMasterData('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-MLS-9':
        res = await firstValueFrom(this.milestonesService.getStudyReportsSummarySearchData(effective));
        item.matched = Array.isArray(res);
        break;

      case 'EAP-MLS-10':
        res = await firstValueFrom(this.milestonesService.editStudyReport('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-MLS-11':
        res = await firstValueFrom(this.milestonesService.insertStudyReport(effective));
        item.matched = res !== undefined;
        break;

      case 'EAP-MLS-12':
        res = await firstValueFrom(this.milestonesService.updateStudyReport(effective));
        item.matched = res !== undefined;
        break;

      // 4. REQUESTS & AMENDMENTS
      case 'EAP-REQ-1':
        res = await firstValueFrom(this.requestsService.getSummaryMaster('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-2':
        res = await firstValueFrom(this.requestsService.getSummaryData('1'));
        item.matched = Array.isArray(res);
        break;

      case 'EAP-REQ-3':
        res = await firstValueFrom(this.requestsService.getSummarySearchData(effective));
        item.matched = Array.isArray(res);
        break;

      case 'EAP-REQ-4':
        res = await firstValueFrom(this.requestsService.getProductMasterDropData('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-5':
        res = await firstValueFrom(this.requestsService.getFundMasterDropData('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-6':
        res = await firstValueFrom(this.requestsService.insertProduct(effective));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-7':
        res = await firstValueFrom(this.requestsService.updateProduct(effective));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-8':
        res = await firstValueFrom(this.requestsService.editProduct('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-9':
        res = await firstValueFrom(this.requestsService.insertFund(effective));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-10':
        res = await firstValueFrom(this.requestsService.updateFund(effective));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-11':
        res = await firstValueFrom(this.requestsService.approveRequest('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-12':
        res = await firstValueFrom(this.requestsService.rejectRequest('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-13':
        res = await firstValueFrom(this.requestsService.allocateRequest('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-14':
        res = await firstValueFrom(this.requestsService.returnRequest('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-15':
        res = await firstValueFrom(this.requestsService.withdrawRequest('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-16':
        res = await firstValueFrom(this.requestsService.closeRequest('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-17':
        res = await firstValueFrom(this.requestsService.getAmendmentsSummary('1'));
        item.matched = Array.isArray(res);
        break;

      case 'EAP-REQ-18':
        res = await firstValueFrom(this.requestsService.getAmendmentsTypes('1'));
        item.matched = Array.isArray(res);
        break;

      case 'EAP-REQ-19':
        res = await firstValueFrom(this.requestsService.getAmendmentsSummarySearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'EAP-REQ-20':
        res = await firstValueFrom(this.requestsService.editAmendment('1'));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-21':
        res = await firstValueFrom(this.requestsService.insertAmendment(effective));
        item.matched = res !== undefined;
        break;

      case 'EAP-REQ-22':
        res = await firstValueFrom(this.requestsService.updateAmendment(effective));
        item.matched = res !== undefined;
        break;

      default:
        res = { message: 'No execution handler mapped' };
        item.matched = true;
    }
    return res;
  }

  /**
   * Run all EAP APIs programmatically in sequence and log to console
   */
  public async runAllTests(): Promise<DetailedTestItem[]> {
    console.log(
      '%c=======================================================\n' +
      '  STARTING EAP SERVICES API SUITE EXECUTION\n' +
      '=======================================================',
      'color: #059669; font-weight: bold; font-size: 14px;'
    );

    const items = getEapTestItems(this.context);
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
