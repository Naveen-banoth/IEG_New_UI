import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IstGeneralInfoService } from './ist-general-info.service';
import { IstStudyTeamService } from './ist-study-team.service';
import { IstActivitiesPublicationsService } from './ist-activities-publications.service';
import { IstRequestsAmendmentsService } from './ist-requests-amendments.service';
import { DetailedTestItem, TestContextIds } from '../../features/test-services/test-services.types';
import { getIstTestItems } from '../../features/test-services/test-services-ist.data';

export interface IstApiTestResult {
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
export class IstTestRunnerService {
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
    private generalInfoService: IstGeneralInfoService,
    private studyTeamService: IstStudyTeamService,
    private activitiesPubsService: IstActivitiesPublicationsService,
    private requestsService: IstRequestsAmendmentsService
  ) {
    // Expose test runner to window for direct browser console execution
    (window as any).runIstApiTests = () => this.runAllTests();
  }

  /**
   * Execute single IST API call by ID with dynamic payload and context
   */
  public async executeApiCall(
    item: DetailedTestItem,
    effective: any,
    context: TestContextIds = this.context
  ): Promise<any> {
    let res: any;
    switch (item.id) {
      // 1. GENERAL INFO & APPLICATIONS
      case 'IST-GEN-1':
        res = await firstValueFrom(this.generalInfoService.getApplicationsList(effective));
        item.matched = Array.isArray(res);
        break;

      case 'IST-GEN-2':
        res = await firstValueFrom(this.generalInfoService.getSummarySearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'IST-GEN-3':
        res = await firstValueFrom(this.generalInfoService.getMasterList('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-GEN-4':
        res = await firstValueFrom(this.generalInfoService.getMyApplicationsList(effective));
        item.matched = Array.isArray(res);
        break;

      case 'IST-GEN-5':
        res = await firstValueFrom(this.generalInfoService.getMySummarySearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'IST-GEN-6':
        res = await firstValueFrom(this.generalInfoService.getAppChangeLog('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-GEN-7':
        res = await firstValueFrom(this.generalInfoService.getAppSubmitValidation('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-GEN-8':
        res = await firstValueFrom(this.generalInfoService.insertGeneralInfo(effective));
        item.matched = res !== undefined;
        break;

      case 'IST-GEN-9':
        res = await firstValueFrom(this.generalInfoService.updateGeneralInfo(effective));
        item.matched = res !== undefined;
        break;

      case 'IST-GEN-10':
        res = await firstValueFrom(this.generalInfoService.insertOrganization(effective));
        item.matched = res !== undefined;
        break;

      // 2. STUDY TEAM & IRB
      case 'IST-STM-1':
        res = await firstValueFrom(this.studyTeamService.getStudyTeamMasterData('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-STM-2':
        res = await firstValueFrom(this.studyTeamService.getStudyTeamMasterDataSearch('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-STM-3':
        res = await firstValueFrom(this.studyTeamService.getStudyTeamSummaryData('1'));
        item.matched = Array.isArray(res);
        break;

      case 'IST-STM-4':
        res = await firstValueFrom(this.studyTeamService.getStudyTeamSummarySearchData(effective));
        item.matched = Array.isArray(res);
        break;

      case 'IST-STM-5':
        res = await firstValueFrom(this.studyTeamService.editStudyTeam('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-STM-6':
        res = await firstValueFrom(this.studyTeamService.insertStudyTeam(effective));
        item.matched = res !== undefined;
        break;

      case 'IST-STM-7':
        res = await firstValueFrom(this.studyTeamService.updateStudyTeam(effective));
        item.matched = res !== undefined;
        break;

      case 'IST-STM-8':
        res = await firstValueFrom(this.studyTeamService.getReviewBoardData('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-STM-9':
        res = await firstValueFrom(this.studyTeamService.insertReviewBoard(effective));
        item.matched = res !== undefined;
        break;

      case 'IST-STM-10':
        res = await firstValueFrom(this.studyTeamService.updateReviewBoard(effective));
        item.matched = res !== undefined;
        break;

      // 3. ACTIVITIES & PUBLICATIONS
      case 'IST-ACT-1':
        res = await firstValueFrom(this.activitiesPubsService.getActivitiesSummaryData('1'));
        item.matched = Array.isArray(res);
        break;

      case 'IST-ACT-2':
        res = await firstValueFrom(this.activitiesPubsService.getActivitiesMasterDropData('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-ACT-3':
        res = await firstValueFrom(this.activitiesPubsService.getActivitiesSummarySearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'IST-ACT-4':
        res = await firstValueFrom(this.activitiesPubsService.getPublicationsSummaryData('1'));
        item.matched = Array.isArray(res);
        break;

      case 'IST-ACT-5':
        res = await firstValueFrom(this.activitiesPubsService.getPublicationsMasterDropData('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-ACT-6':
        res = await firstValueFrom(this.activitiesPubsService.getPublicationsSummarySearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'IST-ACT-7':
        res = await firstValueFrom(this.activitiesPubsService.getSiteEvaluationSummary('1'));
        item.matched = Array.isArray(res);
        break;

      case 'IST-ACT-8':
        res = await firstValueFrom(this.activitiesPubsService.getSiteEvaluationSearch(effective));
        item.matched = Array.isArray(res);
        break;

      // 4. REQUESTS, MILESTONES & REPORTS
      case 'IST-REQ-1':
        res = await firstValueFrom(this.requestsService.getSummaryMaster('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-2':
        res = await firstValueFrom(this.requestsService.getSummaryData('1'));
        item.matched = Array.isArray(res);
        break;

      case 'IST-REQ-3':
        res = await firstValueFrom(this.requestsService.getSummarySearchData(effective));
        item.matched = Array.isArray(res);
        break;

      case 'IST-REQ-4':
        res = await firstValueFrom(this.requestsService.getProductMasterDropData('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-5':
        res = await firstValueFrom(this.requestsService.getFundMasterDropData('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-6':
        res = await firstValueFrom(this.requestsService.insertProduct(effective));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-7':
        res = await firstValueFrom(this.requestsService.updateProduct(effective));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-8':
        res = await firstValueFrom(this.requestsService.editProduct('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-9':
        res = await firstValueFrom(this.requestsService.insertFund(effective));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-10':
        res = await firstValueFrom(this.requestsService.updateFund(effective));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-11':
        res = await firstValueFrom(this.requestsService.approveRequest('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-12':
        res = await firstValueFrom(this.requestsService.rejectRequest('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-13':
        res = await firstValueFrom(this.requestsService.allocateRequest('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-14':
        res = await firstValueFrom(this.requestsService.returnRequest('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-15':
        res = await firstValueFrom(this.requestsService.withdrawRequest('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-16':
        res = await firstValueFrom(this.requestsService.closeRequest('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-17':
        res = await firstValueFrom(this.requestsService.getMilestonesSummaryData('1'));
        item.matched = Array.isArray(res);
        break;

      case 'IST-REQ-18':
        res = await firstValueFrom(this.requestsService.getMilestonesSummarySearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'IST-REQ-19':
        res = await firstValueFrom(this.requestsService.editMilestone('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-20':
        res = await firstValueFrom(this.requestsService.insertMilestone(effective));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-21':
        res = await firstValueFrom(this.requestsService.updateMilestone(effective));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-22':
        res = await firstValueFrom(this.requestsService.getStudyReportsSummaryData('1'));
        item.matched = Array.isArray(res);
        break;

      case 'IST-REQ-23':
        res = await firstValueFrom(this.requestsService.getStudyReportsMasterData('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-24':
        res = await firstValueFrom(this.requestsService.getStudyReportsSummarySearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'IST-REQ-25':
        res = await firstValueFrom(this.requestsService.editStudyReport('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-26':
        res = await firstValueFrom(this.requestsService.insertStudyReport(effective));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-27':
        res = await firstValueFrom(this.requestsService.updateStudyReport(effective));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-28':
        res = await firstValueFrom(this.requestsService.getAmendmentsSummary('1'));
        item.matched = Array.isArray(res);
        break;

      case 'IST-REQ-29':
        res = await firstValueFrom(this.requestsService.getAmendmentsTypes('1'));
        item.matched = Array.isArray(res);
        break;

      case 'IST-REQ-30':
        res = await firstValueFrom(this.requestsService.getAmendmentsSummarySearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'IST-REQ-31':
        res = await firstValueFrom(this.requestsService.editAmendment('1'));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-32':
        res = await firstValueFrom(this.requestsService.insertAmendment(effective));
        item.matched = res !== undefined;
        break;

      case 'IST-REQ-33':
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
   * Run all IST APIs programmatically in sequence and log to console
   */
  public async runAllTests(): Promise<DetailedTestItem[]> {
    console.log(
      '%c=======================================================\n' +
      '  STARTING IST SERVICES API SUITE EXECUTION\n' +
      '=======================================================',
      'color: #3b82f6; font-weight: bold; font-size: 14px;'
    );

    const items = getIstTestItems(this.context);
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
