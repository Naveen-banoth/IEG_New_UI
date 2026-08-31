import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formOptions, httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class GrantsSponsorBudgetService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch Sponsor summary
   * GET api/gmspons/fetchsummary?ApplicationID={appId}
   */
  getSponSummary(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/gmspons/fetchsummary?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Sponsor advance summary
   * POST api/gmspon/fetchadvsummary
   */
  getSponAdvSummary(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/gmspon/fetchadvsummary`,
      search,
      httpOptions
    );
  }

  /**
   * Fetch Sponsor master data
   * GET api/gmspon/getmasterdata?ApplicationID={appId}
   */
  getSponMasterData(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmspon/getmasterdata?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch Signee by ID
   * GET api/gmspon/getsignee/{id}
   */
  getSignee(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmspon/getsignee/${id}`,
      httpOptions
    );
  }

  /**
   * Insert sponsor
   * POST api/gmspon/insert
   */
  insertSpon(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/gmspon/insert`,
      model,
      formOptions
    );
  }

  /**
   * Update sponsor
   * POST api/gmspon/update
   */
  updateSpon(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/gmspon/update`,
      model,
      httpOptions
    );
  }

  /**
   * Update signee
   * POST api/GMSignee/update
   */
  updateSignee(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/GMSignee/update`,
      model,
      formOptions
    );
  }

  /**
   * Fetch GM Budget Fund Category list
   * GET api/gmbudget/getfundcategorylist/{appId}/{recordId}/{currencyId}
   */
  getBudgetTypeList(appId: string = '1', recordId: string = '-1', currencyId: string = 'USD'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/gmbudget/getfundcategorylist/${appId}/${recordId}/${currencyId}`,
      httpOptions
    );
  }

  /**
   * Fetch Sponsor Budget Fund Category list
   * GET api/sponbudget/getfundcategorylist/{appId}/{recordId}/{currencyId}
   */
  getSponBudgetTypeList(appId: string = '1', recordId: string = '-1', currencyId: string = 'USD'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/sponbudget/getfundcategorylist/${appId}/${recordId}/${currencyId}`,
      httpOptions
    );
  }

  /**
   * Fetch Charitable Budget Fund Category list
   * GET api/gmcharbudget/getfundcategorylist/{appId}/{recordId}/{currencyId}
   */
  getCharBudgetTypeList(appId: string = '1', recordId: string = '-1', currencyId: string = 'USD'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/gmcharbudget/getfundcategorylist/${appId}/${recordId}/${currencyId}`,
      httpOptions
    );
  }

  /**
   * Fetch GM Budget Subcategory list
   * POST api/gmbudget/getfundsubcategorylist
   */
  getBudgetSubTypeList(model: any = { FundCategoryId: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/gmbudget/getfundsubcategorylist`,
      model,
      httpOptions
    );
  }

  /**
   * Fetch Sponsor Budget Subcategory list
   * POST api/sponbudget/getfundsubcategorylist
   */
  getSponBudgetSubTypeList(model: any = { FundCategoryId: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/sponbudget/getfundsubcategorylist`,
      model,
      httpOptions
    );
  }

  /**
   * Fetch Charitable Budget Subcategory list
   * POST api/gmcharbudget/getfundsubcategorylist
   */
  getCharBudgetSubTypeList(model: any = { FundCategoryId: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/gmcharbudget/getfundsubcategorylist`,
      model,
      httpOptions
    );
  }

  /**
   * Fetch Sponsor budget summary
   * GET api/sponbudget/fetchsummary?ApplicationID={appId}
   */
  getSponBudgetSummary(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/sponbudget/fetchsummary?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Search Sponsor budget advance summary
   * POST api/sponbudget/fetchadvancesummary
   */
  getSponBudgetAdvSummary(search: any = { ApplicationID: '1' }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/sponbudget/fetchadvancesummary`,
      search,
      httpOptions
    );
  }

  /**
   * Get single budget record by ID
   * GET api/sponbudget/getbudget/{id}
   */
  getBudget(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/sponbudget/getbudget/${id}`,
      httpOptions
    );
  }

  /**
   * Get total budget sum for application
   * GET api/sponbudget/getbudgetsum/{appId}
   */
  getBudgetSum(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/sponbudget/getbudgetsum/${appId}`,
      httpOptions
    );
  }

  /**
   * Delete sponsor
   * GET api/gmspon/delete/{id}
   */
  deleteSpon(id: string = '9999'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmspon/delete/${id}`,
      httpOptions
    );
  }

  /**
   * Make sponsor default
   * GET api/gmspon/makedefault/{id}
   */
  makeDefaultSpon(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmspon/makedefault/${id}`,
      httpOptions
    );
  }

  /**
   * Delete signee
   * GET api/gmsignee/delete/{id}
   */
  deleteSignee(id: string = '9999'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmsignee/delete/${id}`,
      httpOptions
    );
  }

  /**
   * Make signee default
   * GET api/gmsignee/makedefault/{id}
   */
  makeDefaultSignee(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmsignee/makedefault/${id}`,
      httpOptions
    );
  }

  /**
   * Delete sponsor budget record
   * GET api/sponbudget/delete/{id}
   */
  deleteSponBudget(id: string = '9999'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/sponbudget/delete/${id}`,
      httpOptions
    );
  }

  /**
   * Update sponsor budget status
   * GET api/sponbudget/statusupdate/{id}
   */
  updateSponBudgetStatus(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/sponbudget/statusupdate/${id}`,
      httpOptions
    );
  }

  /**
   * Delete charitable budget record
   * GET api/gmcharbudget/delete/{id}
   */
  deleteCharBudget(id: string = '9999'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmcharbudget/delete/${id}`,
      httpOptions
    );
  }

  /**
   * Update charitable budget status
   * GET api/gmcharbudget/statusupdate/{id}
   */
  updateCharBudgetStatus(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmcharbudget/statusupdate/${id}`,
      httpOptions
    );
  }

  /**
   * Delete GM budget record
   * GET api/gmbudget/delete/{id}
   */
  deleteGMBudget(id: string = '9999'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmbudget/delete/${id}`,
      httpOptions
    );
  }

  /**
   * Update GM budget status
   * GET api/gmbudget/statusupdate/{id}
   */
  updateGMBudgetStatus(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/gmbudget/statusupdate/${id}`,
      httpOptions
    );
  }
}
