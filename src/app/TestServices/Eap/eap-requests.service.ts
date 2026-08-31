import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class EapRequestsService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch All Requests summary master
   * GET api/EAPAllRequests/GetSummaryMaster?ApplicationID={appId}
   */
  getSummaryMaster(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPAllRequests/GetSummaryMaster?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch All Requests summary data
   * GET api/EAPAllRequests/getSummaryData?ApplicationID={appId}
   */
  getSummaryData(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/EAPAllRequests/getSummaryData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search All Requests summary
   * POST api/EAPAllRequests/getSummarySearchData
   */
  getSummarySearchData(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/EAPAllRequests/getSummarySearchData`,
      search,
      httpOptions
    );
  }

  /**
   * Fetch product dropdown master data
   * GET api/EAPAllRequests/GetProductMasterDropData?ApplicationID={appId}
   */
  getProductMasterDropData(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPAllRequests/GetProductMasterDropData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch fund dropdown master data
   * GET api/EAPAllRequests/GetFundMasterDropData?ApplicationID={appId}
   */
  getFundMasterDropData(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPAllRequests/GetFundMasterDropData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Insert product request
   * POST api/EAPAllRequests/InsertProduct
   */
  insertProduct(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPAllRequests/InsertProduct`,
      model,
      httpOptions
    );
  }

  /**
   * Update product request
   * POST api/EAPAllRequests/UpdateProduct
   */
  updateProduct(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPAllRequests/UpdateProduct`,
      model,
      httpOptions
    );
  }

  /**
   * Edit product request by Record ID
   * GET api/EAPAllRequests/EditProduct?RecordID={recordId}
   */
  editProduct(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPAllRequests/EditProduct?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Approve Request by Record ID
   * GET api/EAPAllRequests/Approve?RecordID={recordId}
   */
  approveRequest(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPAllRequests/Approve?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Reject Request by Record ID
   * GET api/EAPAllRequests/Reject?RecordID={recordId}
   */
  rejectRequest(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPAllRequests/Reject?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Allocate Request by Record ID
   * GET api/EAPAllRequests/Allocate?RecordID={recordId}
   */
  allocateRequest(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPAllRequests/Allocate?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Return Request by Record ID
   * GET api/EAPAllRequests/RequestReturn?RecordID={recordId}
   */
  returnRequest(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPAllRequests/RequestReturn?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Withdraw Request by Record ID
   * GET api/EAPAllRequests/WithDraw?RecordID={recordId}
   */
  withdrawRequest(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPAllRequests/WithDraw?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Close Request by Record ID
   * GET api/EAPAllRequests/Close?RecordID={recordId}
   */
  closeRequest(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPAllRequests/Close?RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Insert fund request
   * POST api/EAPAllRequests/InsertFund
   */
  insertFund(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPAllRequests/InsertFund`,
      model,
      httpOptions
    );
  }

  /**
   * Update fund request
   * POST api/EAPAllRequests/UpdateFund
   */
  updateFund(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPAllRequests/UpdateFund`,
      model,
      httpOptions
    );
  }

  /**
   * Fetch Amendments summary
   * GET api/EAPAmendments/getSummaryData?ApplicationID={appId}
   */
  getAmendmentsSummary(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/EAPAmendments/getSummaryData?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch Amendments types
   * GET api/EAPAmendments/getTypes?ApplicationID={appId}
   */
  getAmendmentsTypes(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/EAPAmendments/getTypes?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Amendments summary
   * POST api/EAPAmendments/getSummarySearchData
   */
  getAmendmentsSummarySearch(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/EAPAmendments/getSummarySearchData`,
      search,
      httpOptions
    );
  }

  /**
   * Insert amendment
   * POST api/EAPAmendments/Insert
   */
  insertAmendment(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPAmendments/Insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update amendment
   * POST api/EAPAmendments/Update
   */
  updateAmendment(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/EAPAmendments/Update`,
      model,
      httpOptions
    );
  }

  /**
   * Edit amendment by record ID
   * GET api/EAPAmendments/Edit?RecordID={recordId}
   */
  editAmendment(recordId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/EAPAmendments/Edit?RecordID=${recordId}`,
      httpOptions
    );
  }
}

