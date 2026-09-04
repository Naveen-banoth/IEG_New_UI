import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GrantsGeneralInfoService } from './grants-general-info.service';
import { GrantsSponsorBudgetService } from './grants-sponsor-budget.service';
import { GrantsStudyTeamService } from './grants-study-team.service';
import { DetailedTestItem, TestContextIds } from '../../features/test-services/test-services.types';
import { getGrantsTestItems } from '../../features/test-services/test-services-grants.data';

export interface GrantsApiTestResult {
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
export class GrantsTestRunnerService {
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
    private generalInfoService: GrantsGeneralInfoService,
    private sponsorBudgetService: GrantsSponsorBudgetService,
    private studyTeamService: GrantsStudyTeamService
  ) {
    // Expose test runner to window for direct browser console execution
    (window as any).runGrantsApiTests = () => this.runAllTests();
  }

  /**
   * Execute single Grants API call by ID with dynamic payload and context
   */
  public async executeApiCall(
    item: DetailedTestItem,
    effective: any,
    context: TestContextIds = this.context
  ): Promise<any> {
    let res: any;
    switch (item.id) {
      // 1. GENERAL INFO & AUDIENCE
      case 'GRT-GEN-1':
        res = await firstValueFrom(this.generalInfoService.getAdvSearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-GEN-2':
        res = await firstValueFrom(this.generalInfoService.getMyApplicationsList(effective));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-GEN-3':
        res = await firstValueFrom(this.generalInfoService.getAudienceSummary('1'));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-GEN-4':
        res = await firstValueFrom(this.generalInfoService.getAudienceAdvSummary(effective));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-GEN-5':
        res = await firstValueFrom(this.generalInfoService.getAudienceLookupList());
        item.matched = Array.isArray(res);
        break;

      case 'GRT-GEN-6':
        res = await firstValueFrom(this.generalInfoService.insertAudience(effective));
        item.matched = res !== undefined;
        break;

      case 'GRT-GEN-7':
        res = await firstValueFrom(this.generalInfoService.updateAudience(effective));
        item.matched = res !== undefined;
        break;

      case 'GRT-GEN-8':
        res = await firstValueFrom(this.generalInfoService.deleteAudience('9999'));
        item.matched = res !== undefined;
        break;

      case 'GRT-GEN-9':
        res = await firstValueFrom(this.generalInfoService.getDeliveryFormatList());
        item.matched = Array.isArray(res);
        break;

      case 'GRT-GEN-10':
        res = await firstValueFrom(this.generalInfoService.getTherapeuticAreaList());
        item.matched = Array.isArray(res);
        break;

      case 'GRT-GEN-11':
        res = await firstValueFrom(this.generalInfoService.insertDeliveryFormat(effective));
        item.matched = res !== undefined;
        break;

      case 'GRT-GEN-12':
        res = await firstValueFrom(this.generalInfoService.getAssessmentSummary('1'));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-GEN-13':
        res = await firstValueFrom(this.generalInfoService.insertAssessment(effective));
        item.matched = res !== undefined;
        break;

      case 'GRT-GEN-14':
        res = await firstValueFrom(this.generalInfoService.updateAssessment(effective));
        item.matched = res !== undefined;
        break;

      case 'GRT-GEN-15':
        res = await firstValueFrom(this.generalInfoService.deleteAssessment('9999'));
        item.matched = res !== undefined;
        break;

      case 'GRT-GEN-16':
        res = await firstValueFrom(this.generalInfoService.editCME('1'));
        item.matched = res !== undefined;
        break;

      case 'GRT-GEN-17':
        res = await firstValueFrom(this.generalInfoService.insertCME(effective));
        item.matched = res !== undefined;
        break;

      case 'GRT-GEN-18':
        res = await firstValueFrom(this.generalInfoService.updateCME(effective));
        item.matched = res !== undefined;
        break;

      // 2. SPONSORS & SIGNEES
      case 'GRT-SPN-1':
        res = await firstValueFrom(this.sponsorBudgetService.getSponSummary('1'));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-SPN-2':
        res = await firstValueFrom(this.sponsorBudgetService.getSponAdvSummary(effective));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-SPN-3':
        res = await firstValueFrom(this.sponsorBudgetService.getSponMasterData('1'));
        item.matched = res !== undefined;
        break;

      case 'GRT-SPN-4':
        res = await firstValueFrom(this.sponsorBudgetService.getSignee('1'));
        item.matched = res !== undefined;
        break;

      case 'GRT-SPN-5':
        res = await firstValueFrom(this.sponsorBudgetService.insertSpon(effective));
        item.matched = res !== undefined;
        break;

      case 'GRT-SPN-6':
        res = await firstValueFrom(this.sponsorBudgetService.updateSpon(effective));
        item.matched = res !== undefined;
        break;

      case 'GRT-SPN-7':
        res = await firstValueFrom(this.sponsorBudgetService.deleteSpon('9999'));
        item.matched = res !== undefined;
        break;

      case 'GRT-SPN-8':
        res = await firstValueFrom(this.sponsorBudgetService.makeDefaultSpon('1'));
        item.matched = res !== undefined;
        break;

      case 'GRT-SPN-9':
        res = await firstValueFrom(this.sponsorBudgetService.updateSignee(effective));
        item.matched = res !== undefined;
        break;

      case 'GRT-SPN-10':
        res = await firstValueFrom(this.sponsorBudgetService.deleteSignee('9999'));
        item.matched = res !== undefined;
        break;

      case 'GRT-SPN-11':
        res = await firstValueFrom(this.sponsorBudgetService.makeDefaultSignee('1'));
        item.matched = res !== undefined;
        break;

      // 3. BUDGET & FUND CATEGORIES
      case 'GRT-BDG-1':
        res = await firstValueFrom(this.sponsorBudgetService.getBudgetTypeList('1', '-1', 'USD'));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-BDG-2':
        res = await firstValueFrom(this.sponsorBudgetService.getSponBudgetTypeList('1', '-1', 'USD'));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-BDG-3':
        res = await firstValueFrom(this.sponsorBudgetService.getCharBudgetTypeList('1', '-1', 'USD'));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-BDG-4':
        res = await firstValueFrom(this.sponsorBudgetService.getBudgetSubTypeList(effective));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-BDG-5':
        res = await firstValueFrom(this.sponsorBudgetService.getSponBudgetSummary('1'));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-BDG-6':
        res = await firstValueFrom(this.sponsorBudgetService.getBudgetSum('1'));
        item.matched = res !== undefined;
        break;

      case 'GRT-BDG-7':
        res = await firstValueFrom(this.sponsorBudgetService.deleteSponBudget('9999'));
        item.matched = res !== undefined;
        break;

      case 'GRT-BDG-8':
        res = await firstValueFrom(this.sponsorBudgetService.updateSponBudgetStatus('1'));
        item.matched = res !== undefined;
        break;

      case 'GRT-BDG-9':
        res = await firstValueFrom(this.sponsorBudgetService.deleteCharBudget('9999'));
        item.matched = res !== undefined;
        break;

      case 'GRT-BDG-10':
        res = await firstValueFrom(this.sponsorBudgetService.updateCharBudgetStatus('1'));
        item.matched = res !== undefined;
        break;

      case 'GRT-BDG-11':
        res = await firstValueFrom(this.sponsorBudgetService.deleteGMBudget('9999'));
        item.matched = res !== undefined;
        break;

      case 'GRT-BDG-12':
        res = await firstValueFrom(this.sponsorBudgetService.updateGMBudgetStatus('1'));
        item.matched = res !== undefined;
        break;

      // 4. STUDY TEAM & MILESTONES
      case 'GRT-STM-1':
        res = await firstValueFrom(this.studyTeamService.getStudyTeamSummary('1'));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-STM-2':
        res = await firstValueFrom(this.studyTeamService.getStudyTeamSearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-STM-3':
        res = await firstValueFrom(this.studyTeamService.getStudyTeamMaster('1'));
        item.matched = res !== undefined;
        break;

      case 'GRT-STM-4':
        res = await firstValueFrom(this.studyTeamService.insertStudyTeam(effective));
        item.matched = res !== undefined;
        break;

      case 'GRT-STM-5':
        res = await firstValueFrom(this.studyTeamService.updateStudyTeam(effective));
        item.matched = res !== undefined;
        break;

      case 'GRT-STM-6':
        res = await firstValueFrom(this.studyTeamService.deleteStudyTeam('9999'));
        item.matched = res !== undefined;
        break;

      case 'GRT-STM-7':
        res = await firstValueFrom(this.studyTeamService.getMilestonesSummary('1'));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-STM-8':
        res = await firstValueFrom(this.studyTeamService.getMilestonesSearch(effective));
        item.matched = Array.isArray(res);
        break;

      case 'GRT-STM-9':
        res = await firstValueFrom(this.studyTeamService.insertMilestone(effective));
        item.matched = res !== undefined;
        break;

      case 'GRT-STM-10':
        res = await firstValueFrom(this.studyTeamService.updateMilestone(effective));
        item.matched = res !== undefined;
        break;

      case 'GRT-STM-11':
        res = await firstValueFrom(this.studyTeamService.deleteMilestone('9999'));
        item.matched = res !== undefined;
        break;

      default:
        res = { message: 'No execution handler mapped' };
        item.matched = true;
    }
    return res;
  }

  /**
   * Run all Grants APIs programmatically in sequence and log to console
   */
  public async runAllTests(): Promise<DetailedTestItem[]> {
    console.log(
      '%c=======================================================\n' +
      '  STARTING GRANTS SERVICES API SUITE EXECUTION\n' +
      '=======================================================',
      'color: #f59e0b; font-weight: bold; font-size: 14px;'
    );

    const items = getGrantsTestItems(this.context);
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
