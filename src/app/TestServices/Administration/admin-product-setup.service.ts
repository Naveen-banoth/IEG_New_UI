import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminProductSetupService {

  constructor(private http: HttpClient) {}

  // ==================== 1. PROGRAM CATEGORY (ADMIN PROGRAM) ====================

  /**
   * Fetch program summary data
   * GET api/AdminProgram/GetSummaryData
   */
  getProgramSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/AdminProgram/GetSummaryData`, httpOptions);
  }

  /**
   * Search / List program categories
   * POST api/AdminProgram/AdvanceSearch
   */
  getProgramAdvSearch(search: any = { NAME: '', PROGRAM_ID: '-1', RECORD_STATE: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/AdminProgram/AdvanceSearch`, search, httpOptions);
  }

  /**
   * Fetch available products for program mapping
   * GET api/AdminProgram/GetProductsAvaliable/{id}
   */
  getProductsAvailableForProgram(id: string = '-1'): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/AdminProgram/GetProductsAvaliable/${id}`, httpOptions);
  }

  /**
   * Fetch saved product mappings for program
   * GET api/AdminProgram/getSavedMappings/{id}
   */
  getSavedProgramMappings(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/AdminProgram/getSavedMappings/${id}`, httpOptions);
  }

  /**
   * Insert new program category
   * POST api/AdminProgram/Insert
   */
  insertProgramCategory(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/AdminProgram/Insert`, model, httpOptions);
  }

  /**
   * Update existing program category
   * POST api/AdminProgram/Update
   */
  updateProgramCategory(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/AdminProgram/Update`, model, httpOptions);
  }

  /**
   * Delete program category
   * GET api/AdminProgram/Delete?RecordID={id}
   */
  deleteProgramCategory(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/AdminProgram/Delete?RecordID=${id}`, httpOptions);
  }

  /**
   * Activate program category
   * GET api/AdminProgram/Active/{id}
   */
  activateProgramCategory(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/AdminProgram/Active/${id}`, httpOptions);
  }

  /**
   * Deactivate program category
   * GET api/AdminProgram/InActive/{id}
   */
  deactivateProgramCategory(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/AdminProgram/InActive/${id}`, httpOptions);
  }

  // ==================== 2. PRODUCTS ====================

  /**
   * Fetch products summary list
   * GET api/Product/GetSummaryData
   */
  getProductSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/Product/GetSummaryData`, httpOptions);
  }

  /**
   * Fetch product master screen dropdown data (Therapeutic areas, etc.)
   * GET api/Product/GetMasterScreenData
   */
  getProductMasterScreenData(): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/Product/GetMasterScreenData`, httpOptions);
  }

  /**
   * Advance search products
   * POST api/Product/AdvanceSearch
   */
  getProductAdvSearch(search: any = { NAME: '', THERAPEUTIC_AREA_ID: '-1', STATUS: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/Product/AdvanceSearch`, search, httpOptions);
  }

  /**
   * Fetch available products under therapeutic area
   * GET api/Theraupetic_Area/GetAvailableProducts
   */
  getAvailableProducts(therapeuticAreaId: string = '-1'): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/Theraupetic_Area/GetAvailableProducts/${therapeuticAreaId}`, httpOptions);
  }

  /**
   * Insert product
   * POST api/Product/Insert
   */
  insertProduct(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/Product/Insert`, model, httpOptions);
  }

  /**
   * Update product
   * POST api/Product/Update
   */
  updateProduct(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/Product/Update`, model, httpOptions);
  }

  /**
   * Delete product
   * GET api/Product/Delete?RecordID={id}
   */
  deleteProduct(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/Product/Delete?RecordID=${id}`, httpOptions);
  }

  // ==================== 3. PRODUCT NETWORK LOCATIONS ====================

  /**
   * Fetch product network locations summary
   * GET api/ProductNetworkLocations/GetSummaryData
   */
  getProductNetworkLocationsSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/ProductNetworkLocations/GetSummaryData`, httpOptions);
  }

  /**
   * Search product network locations
   * POST api/ProductNetworkLocations/GetSummarySearchData
   */
  searchProductNetworkLocations(search: any = { LOCATION_NAME: '', STATUS: '-1' }): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/ProductNetworkLocations/GetSummarySearchData`, search, httpOptions);
  }

  /**
   * Fetch master dropdown data for product network locations
   * GET api/ProductNetworkLocations/GetMasterData
   */
  getProductNetworkLocationMasterData(): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/ProductNetworkLocations/GetMasterData`, httpOptions);
  }

  /**
   * Fetch network locations list
   * GET api/ProductNetworkLocations/GetNetworkLocations
   */
  getNetworkLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/ProductNetworkLocations/GetNetworkLocations`, httpOptions);
  }

  /**
   * Delete product network location
   * GET api/ProductNetworkLocations/Delete?RecordID={id}
   */
  deleteProductNetworkLocation(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/ProductNetworkLocations/Delete?RecordID=${id}`, httpOptions);
  }

  // ==================== 4. LOOKUPS (LIST VALUES) ====================

  /**
   * Fetch lookups summary
   * GET api/lookup/getsummary or GET api/lookup/getlookups/{id}
   */
  getLookupsSummary(id?: string): Observable<any[]> {
    if (id) {
      return this.http.get<any[]>(`${serviceConstants.apiURL}api/lookup/getlookups/${id}`, httpOptions);
    }
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/lookup/getsummary`, httpOptions);
  }

  /**
   * Search lookups
   * POST api/lookup/getsummary
   */
  getLookupsAdvSearch(search: any): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/lookup/getsummary`, search, httpOptions);
  }

  /**
   * Fetch modules list for Lookups
   * GET api/common/getmoduleslist
   */
  getModulesList(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/common/getmoduleslist`, httpOptions);
  }

  /**
   * Insert bulk lookups
   * POST api/lookup/insertList
   */
  insertLookupList(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/lookup/insertList`, model, httpOptions);
  }

  /**
   * Insert single lookup
   * POST api/lookup/insert
   */
  insertLookup(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/lookup/insert`, model, httpOptions);
  }

  /**
   * Update lookup
   * POST api/lookup/update
   */
  updateLookup(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/lookup/update`, model, httpOptions);
  }

  /**
   * Delete lookup
   * POST api/lookup/delete
   */
  deleteLookup(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/lookup/delete`, model, httpOptions);
  }

  // ==================== 5. HIERARCHICAL LOOKUPS (H-LOOKUPS) ====================

  /**
   * Fetch hierarchical lookups summary
   * GET api/lookup/gethlookssummary or GET api/lookup/getlookdetails/{id}
   */
  getHLookupsSummary(id?: string): Observable<any[]> {
    if (id) {
      return this.http.get<any[]>(`${serviceConstants.apiURL}api/lookup/getlookdetails/${id}`, httpOptions);
    }
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/lookup/gethlookssummary`, httpOptions);
  }

  /**
   * Search hierarchical lookups
   * POST api/lookup/getadvancesummaryhlookups
   */
  getHLookupsAdvSearch(search: any): Observable<any[]> {
    return this.http.post<any[]>(`${serviceConstants.apiURL}api/lookup/getadvancesummaryhlookups`, search, httpOptions);
  }

  /**
   * Fetch hierarchical lookups module dropdowns
   * GET api/common/getmodulesbyid
   */
  getHLookupModules(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/common/getmodulesbyid`, httpOptions);
  }


  /**
   * Insert hierarchical lookup
   * POST api/lookup/hlookupinsert
   */
  insertHLookup(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/lookup/hlookupinsert`, model, httpOptions);
  }

  /**
   * Update hierarchical lookup
   * POST api/lookup/UpdatHLookups
   */
  updateHLookup(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/lookup/UpdatHLookups`, model, httpOptions);
  }

  /**
   * Delete hierarchical lookup
   * POST api/lookup/hlookupsdelete
   */
  deleteHLookup(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/lookup/hlookupsdelete`, model, httpOptions);
  }

  // ==================== 6. REVIEW & APPROVAL TITLE (REVIEW TYPE) ====================

  /**
   * Fetch review types summary data
   * GET api/reviewtype/SummaryData
   */
  getReviewTypesSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${serviceConstants.apiURL}api/reviewtype/SummaryData`, httpOptions);
  }

  /**
   * Insert review type
   * POST api/reviewtype/insert
   */
  insertReviewType(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/reviewtype/insert`, model, httpOptions);
  }

  /**
   * Update review type
   * POST api/reviewtype/update
   */
  updateReviewType(model: any): Observable<any> {
    return this.http.post<any>(`${serviceConstants.apiURL}api/reviewtype/update`, model, httpOptions);
  }

  /**
   * Delete review type
   * GET api/reviewtype/delete/{id}
   */
  deleteReviewType(id: string): Observable<any> {
    return this.http.get<any>(`${serviceConstants.apiURL}api/reviewtype/delete/${id}`, httpOptions);
  }
}
