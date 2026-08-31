import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formOptions, httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class IstRequestsAmendmentsService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch All Requests summary master
   * GET api/ISTAllRequests/GetSummaryMaster?ApplicationID={appId}
   */
  getSummaryMaster(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/GetSummaryMaster?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch All Requests summary data
   * GET api/ISTAllRequests/getSummaryData?ApplicationID={appId}
   */
  getSummaryData(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTAllRequests/getSummaryData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search All Requests summary
   * POST api/ISTAllRequests/getSummarySearchData
   */
  getSummarySearchData(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/ISTAllRequests/getSummarySearchData`,
      search,
      httpOptions
    );
  }

  /**
   * Fetch product dropdown master data
   * GET api/ISTAllRequests/GetProductMasterDropData?ApplicationID={appId}
   */
  getProductMasterDropData(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/GetProductMasterDropData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch fund dropdown master data
   * GET api/ISTAllRequests/GetFundMasterDropData?ApplicationID={appId}
   */
  getFundMasterDropData(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/GetFundMasterDropData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Insert product request
   * POST api/ISTAllRequests/InsertProduct
   */
  insertProduct(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/InsertProduct`,
      model,
      httpOptions
    );
  }

  /**
   * Update product request
   * POST api/ISTAllRequests/UpdateProduct
   */
  updateProduct(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/UpdateProduct`,
      model,
      httpOptions
    );
  }

  /**
   * Edit product request by Record ID
   * GET api/ISTAllRequests/EditProduct?RecordID={recordId}
   */
  editProduct(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/EditProduct?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Insert fund request
   * POST api/ISTAllRequests/InsertFund
   */
  insertFund(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/InsertFund`,
      model,
      httpOptions
    );
  }

  /**
   * Update fund request
   * POST api/ISTAllRequests/UpdateFund
   */
  updateFund(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/UpdateFund`,
      model,
      httpOptions
    );
  }

  /**
   * Edit fund request by Record ID
   * GET api/ISTAllRequests/FundEdit?RecordID={recordId}
   */
  fundEdit(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/FundEdit?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Approve Request by Record ID
   * GET api/ISTAllRequests/Approve?RecordID={recordId}
   */
  approveRequest(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/Approve?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Reject Request by Record ID
   * GET api/ISTAllRequests/Reject?RecordID={recordId}
   */
  rejectRequest(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/Reject?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Allocate Request by Record ID
   * GET api/ISTAllRequests/Allocate?RecordID={recordId}
   */
  allocateRequest(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/Allocate?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Return Request by Record ID
   * GET api/ISTAllRequests/ReturnRequest?RecordID={recordId}
   */
  returnRequest(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/ReturnRequest?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Withdraw Request by Record ID
   * GET api/ISTAllRequests/WithDraw?RecordID={recordId}
   */
  withdrawRequest(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/WithDraw?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Close Request by Record ID
   * GET api/ISTAllRequests/Close?RecordID={recordId}
   */
  closeRequest(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTAllRequests/Close?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Fetch Milestones summary for an application
   * GET api/ISTMilestones/getSummaryData?ApplicationID={appId}
   */
  getMilestonesSummaryData(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTMilestones/getSummaryData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Milestones summary
   * POST api/ISTMilestones/getSummarySearchData
   */
  getMilestonesSummarySearch(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/ISTMilestones/getSummarySearchData`,
      search,
      httpOptions
    );
  }

  /**
   * Insert new milestone
   * POST api/ISTMilestones/Insert
   */
  insertMilestone(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTMilestones/Insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update milestone
   * POST api/ISTMilestones/Update
   */
  updateMilestone(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTMilestones/Update`,
      model,
      httpOptions
    );
  }

  /**
   * Send notification for milestone
   * GET api/ISTMilestones/MilestoneSendNotification/{id}
   */
  sendMilestoneNotification(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTMilestones/MilestoneSendNotification/${id}`,
      httpOptions
    );
  }

  /**
   * Fetch Amendments summary
   * GET api/ISTAmendments/getSummaryData?ApplicationID={appId}
   */
  getAmendmentsSummary(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTAmendments/getSummaryData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch Amendments types
   * GET api/ISTAmendments/getTypes?ApplicationID={appId}
   */
  getAmendmentsTypes(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTAmendments/getTypes?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Amendments summary
   * POST api/ISTAmendments/getSummarySearchData
   */
  getAmendmentsSummarySearch(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/ISTAmendments/getSummarySearchData`,
      search,
      httpOptions
    );
  }

  /**
   * Insert amendment
   * POST api/ISTAmendments/Insert
   */
  insertAmendment(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTAmendments/Insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update amendment
   * POST api/ISTAmendments/Update
   */
  updateAmendment(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTAmendments/Update`,
      model,
      httpOptions
    );
  }

  /**
   * Fetch Study Reports summary for an application
   * GET api/ISTStudyreports/getSummaryData?ApplicationID={appId}
   */
  getStudyReportsSummaryData(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/ISTStudyreports/getSummaryData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch Study Reports master data
   * GET api/ISTStudyreports/GetMasterData?ApplicationID={appId}
   */
  getStudyReportsMasterData(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTStudyreports/GetMasterData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Study Reports summary
   * POST api/ISTStudyreports/getSummarySearchData
   */
  getStudyReportsSummarySearch(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/ISTStudyreports/getSummarySearchData`,
      search,
      httpOptions
    );
  }

  /**
   * Insert study report
   * POST api/ISTStudyreports/Insert
   */
  insertStudyReport(formData: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTStudyreports/Insert`,
      formData,
      formOptions
    );
  }

  /**
   * Edit milestone by record ID
   * GET api/ISTMilestones/Edit?RecordID={recordId}
   */
  editMilestone(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTMilestones/Edit?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Edit amendment by record ID
   * GET api/ISTAmendments/Edit?RecordID={recordId}
   */
  editAmendment(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTAmendments/Edit?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Edit study report by record ID
   * GET api/ISTStudyreports/Edit?RecordID={recordId}
   */
  editStudyReport(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/ISTStudyreports/Edit?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Update study report
   * POST api/ISTStudyreports/Update
   */
  updateStudyReport(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/ISTStudyreports/Update`,
      model,
      httpOptions
    );
  }
}

