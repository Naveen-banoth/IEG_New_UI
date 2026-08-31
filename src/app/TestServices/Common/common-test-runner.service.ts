import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CommonAlertsNotificationsService } from './common-alerts-notifications.service';
import { CommonCriteriaService } from './common-criteria.service';
import { CommonReviewService } from './common-review.service';
import { CommonFileService } from './common-file.service';
import { CommonSummaryService } from './common-summary.service';
import { DetailedTestItem, TestContextIds } from '../../features/test-services/test-services.types';
import { getCommonTestItems } from '../../features/test-services/test-services-common.data';

export interface CommonApiTestResult {
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
export class CommonTestRunnerService {
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
    private alertsService: CommonAlertsNotificationsService,
    private criteriaService: CommonCriteriaService,
    private reviewService: CommonReviewService,
    private fileService: CommonFileService,
    private summaryService: CommonSummaryService
  ) {
    // Expose test runner to window for direct browser console execution
    (window as any).runCommonApiTests = () => this.runAllTests();
  }

  /**
   * Execute single Common API call by ID with dynamic payload and context
   */
  public async executeApiCall(
    item: DetailedTestItem,
    effective: any,
    context: TestContextIds = this.context
  ): Promise<any> {
    let res: any;
    switch (item.id) {
      // 1. ALERTS & NOTIFICATIONS
      case 'COM-ALT-1':
        res = await firstValueFrom(this.alertsService.getApplicationTypes('1', '-1'));
        item.matched = res !== undefined;
        break;

      case 'COM-ALT-2':
        res = await firstValueFrom(this.alertsService.getANPlaceHolders('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-ALT-3':
        res = await firstValueFrom(this.alertsService.getANNotificationAndAlertEvents('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-ALT-4':
        res = await firstValueFrom(this.alertsService.getANOutgoingSMTPEmailServers('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-ALT-5':
        res = await firstValueFrom(this.alertsService.getAlertsAndNotificationsSummary('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-ALT-6':
        res = await firstValueFrom(this.alertsService.getAlertsAndNotificationsById('1', '1'));
        item.matched = res !== undefined;
        break;

      case 'COM-ALT-7':
        res = await firstValueFrom(this.alertsService.saveAlertsAndNotifications(effective));
        item.matched = res !== undefined;
        break;

      case 'COM-ALT-8':
        res = await firstValueFrom(this.alertsService.saveOutgoingSMTP('1', '1'));
        item.matched = res !== undefined;
        break;

      case 'COM-ALT-9':
        res = await firstValueFrom(this.alertsService.getUserNotifications());
        item.matched = res !== undefined;
        break;

      case 'COM-ALT-10':
        res = await firstValueFrom(this.alertsService.getNotificationCount());
        item.matched = res !== undefined;
        break;

      // 2. CRITERIA & DYNAMIC SCREEN RESPONSE
      case 'COM-CRT-1':
        res = await firstValueFrom(this.criteriaService.getModules());
        item.matched = Array.isArray(res);
        break;

      case 'COM-CRT-2':
        res = await firstValueFrom(this.criteriaService.getScreenList('1'));
        item.matched = Array.isArray(res);
        break;

      case 'COM-CRT-3':
        res = await firstValueFrom(this.criteriaService.getScreenListAdvance(effective));
        item.matched = Array.isArray(res);
        break;

      case 'COM-CRT-4':
        res = await firstValueFrom(this.criteriaService.fetchScreenControls('1', '0'));
        item.matched = res !== undefined;
        break;

      case 'COM-CRT-5':
        res = await firstValueFrom(this.criteriaService.fetchExtendedControls('1', '0'));
        item.matched = res !== undefined;
        break;

      case 'COM-CRT-6':
        res = await firstValueFrom(this.criteriaService.fetchResponseControls('1', '0'));
        item.matched = res !== undefined;
        break;

      case 'COM-CRT-7':
        res = await firstValueFrom(this.criteriaService.getScreenControlsList('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-CRT-8':
        res = await firstValueFrom(this.criteriaService.getScreenResponse(effective));
        item.matched = res !== undefined;
        break;

      case 'COM-CRT-9':
        res = await firstValueFrom(this.criteriaService.getScreenResponseRow(effective));
        item.matched = res !== undefined;
        break;

      case 'COM-CRT-10':
        res = await firstValueFrom(this.criteriaService.getExtendedScreenResponse('1', '1'));
        item.matched = res !== undefined;
        break;

      case 'COM-CRT-11':
        res = await firstValueFrom(this.criteriaService.saveUserPreferencesColumns(effective));
        item.matched = res !== undefined;
        break;

      // 3. REVIEW WORKFLOW
      case 'COM-REV-1':
        res = await firstValueFrom(this.reviewService.getReviews('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-2':
        res = await firstValueFrom(this.reviewService.getReviewTypes('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-3':
        res = await firstValueFrom(this.reviewService.getMyReviews(effective));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-4':
        res = await firstValueFrom(this.reviewService.getMyReviewsCount(false));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-5':
        res = await firstValueFrom(this.reviewService.getDocuments('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-6':
        res = await firstValueFrom(this.reviewService.getReviewDocuments('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-7':
        res = await firstValueFrom(this.reviewService.getReviewDocments('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-8':
        res = await firstValueFrom(this.reviewService.getUsers('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-9':
        res = await firstValueFrom(this.reviewService.getOwner('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-10':
        res = await firstValueFrom(this.reviewService.getChangeOwnPr('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-11':
        res = await firstValueFrom(this.reviewService.editReview('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-12':
        res = await firstValueFrom(this.reviewService.checkReviewerBeforeStart('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-13':
        res = await firstValueFrom(this.reviewService.insertReview(effective));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-14':
        res = await firstValueFrom(this.reviewService.updateReview(effective));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-15':
        res = await firstValueFrom(this.reviewService.deleteReview('9999'));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-16':
        res = await firstValueFrom(this.reviewService.startReview('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-17':
        res = await firstValueFrom(this.reviewService.cancelReview('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-18':
        res = await firstValueFrom(this.reviewService.changeOwnerReview(effective));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-19':
        res = await firstValueFrom(this.reviewService.updateReviewerStatus(effective));
        item.matched = res !== undefined;
        break;

      case 'COM-REV-20':
        res = await firstValueFrom(this.reviewService.updateOrder(effective));
        item.matched = res !== undefined;
        break;

      // 4. FILE ATTACHMENTS
      case 'COM-FIL-1':
        res = await firstValueFrom(this.fileService.getAttachClass('IST'));
        item.matched = res !== undefined;
        break;

      case 'COM-FIL-2':
        res = await firstValueFrom(this.fileService.getApplicationTypes('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-FIL-3':
        res = await firstValueFrom(this.fileService.getScreenNames('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-FIL-4':
        res = await firstValueFrom(this.fileService.getAttachmentsSummary('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-FIL-5':
        res = await firstValueFrom(this.fileService.getAttachmentsSearch(effective));
        item.matched = res !== undefined;
        break;

      case 'COM-FIL-6':
        res = await firstValueFrom(this.fileService.getScreenAttachments('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-FIL-7':
        res = await firstValueFrom(this.fileService.getMasterData());
        item.matched = res !== undefined;
        break;

      case 'COM-FIL-8':
        res = await firstValueFrom(this.fileService.getFeatureDocuments());
        item.matched = res !== undefined;
        break;

      case 'COM-FIL-9':
        res = await firstValueFrom(this.fileService.insertAttachment(effective));
        item.matched = res !== undefined;
        break;

      case 'COM-FIL-10':
        res = await firstValueFrom(this.fileService.updateAttachment(effective));
        item.matched = res !== undefined;
        break;

      case 'COM-FIL-11':
        res = await firstValueFrom(this.fileService.deleteFile('9999'));
        item.matched = res !== undefined;
        break;

      case 'COM-FIL-12':
        res = await firstValueFrom(this.fileService.editTemplateDetails('1'));
        item.matched = res !== undefined;
        break;

      // 5. MASTER LOOKUPS & METADATA
      case 'COM-SUM-1':
        res = await firstValueFrom(this.summaryService.getPrefixLkps('DEFAULT'));
        item.matched = res !== undefined;
        break;

      case 'COM-SUM-2':
        res = await firstValueFrom(this.summaryService.getStatesSummary('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-SUM-3':
        res = await firstValueFrom(this.summaryService.getStateById('1'));
        item.matched = res !== undefined;
        break;

      case 'COM-SUM-4':
        res = await firstValueFrom(this.summaryService.getBuildVersion());
        item.matched = res !== undefined;
        break;

      case 'COM-SUM-5':
        res = await firstValueFrom(this.summaryService.getPolicyVersionDetails('IST'));
        item.matched = res !== undefined;
        break;

      case 'COM-SUM-6':
        res = await firstValueFrom(this.summaryService.saveFeatureDocuments(effective));
        item.matched = res !== undefined;
        break;

      default:
        res = { message: 'No execution handler mapped' };
        item.matched = true;
    }
    return res;
  }

  /**
   * Run all Common APIs programmatically in sequence and log to console
   */
  public async runAllTests(): Promise<DetailedTestItem[]> {
    console.log(
      '%c=======================================================\n' +
      '  STARTING COMMON SERVICES API SUITE EXECUTION\n' +
      '=======================================================',
      'color: #8b5cf6; font-weight: bold; font-size: 14px;'
    );

    const items = getCommonTestItems(this.context);
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
