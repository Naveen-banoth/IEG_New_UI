import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonReviewService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch reviews for an application
   * GET api/Review/GetReviews?ApplicationID={appId}
   */
  getReviews(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/Review/GetReviews?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch review types list by module ID
   * GET api/Review/GetReviewTypes?moduleId={moduleId}
   */
  getReviewTypes(moduleId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/Review/GetReviewTypes?moduleId=${moduleId}`,
      httpOptions
    );
  }

  /**
   * Fetch reviews assigned to current user
   * POST api/Review/MyReviews
   */
  getMyReviews(model: any = { Status: 'ALL', PageIndex: 1, PageSize: 10 }): Observable<any[]> {
    return this.http.post<any[]>(
      `${serviceConstants.apiURL}api/Review/MyReviews`,
      model,
      httpOptions
    );
  }

  /**
   * Fetch count of reviews assigned to current user
   * GET api/Review/MyReviewsCount?isOwner={isOwner}
   */
  getMyReviewsCount(isOwner: boolean = false): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Review/MyReviewsCount?isOwner=${isOwner}`,
      httpOptions
    );
  }

  /**
   * Fetch reviewable documents for an application
   * GET api/Review/GetDocuments?ApplicationID={appId}
   */
  getDocuments(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/Review/GetDocuments?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch documents attached to a specific review
   * GET api/Review/GetReviewDocuments?ReviewId={reviewId}
   */
  getReviewDocuments(reviewId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/Review/GetReviewDocuments?ReviewId=${reviewId}`,
      httpOptions
    );
  }

  /**
   * Fetch review documents by ID
   * GET api/Review/ReviewDocments?Id={id}
   */
  getReviewDocments(id: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/Review/ReviewDocments?Id=${id}`,
      httpOptions
    );
  }

  /**
   * Fetch users available for review assignment
   * GET api/Review/GetUsers?ApplicationID={appId}
   */
  getUsers(appId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/Review/GetUsers?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch current review owner
   * GET api/Review/GetOwner?ApplicationID={appId}
   */
  getOwner(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Review/GetOwner?ApplicationID=${appId}`,
      httpOptions
    );
  }

  /**
   * Fetch change ownership permissions for a module
   * GET api/Review/GetChangeOwnPr?Module={moduleId}
   */
  getChangeOwnPr(moduleId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Review/GetChangeOwnPr?Module=${moduleId}`,
      httpOptions
    );
  }

  /**
   * Fetch review record for edit
   * GET api/Review/EditReview?Id={id}
   */
  editReview(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Review/EditReview?Id=${id}`,
      httpOptions
    );
  }

  /**
   * Insert new review workflow
   * POST api/Review/Insert
   */
  insertReview(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/Review/Insert`,
      model,
      httpOptions
    );
  }

  /**
   * Update review workflow
   * POST api/Review/Update
   */
  updateReview(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/Review/Update`,
      model,
      httpOptions
    );
  }

  /**
   * Start review workflow
   * GET api/Review/StartReview?Id={id}
   */
  startReview(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Review/StartReview?Id=${id}`,
      httpOptions
    );
  }

  /**
   * Cancel active review
   * GET api/Review/CancelReview?Id={id}
   */
  cancelReview(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Review/CancelReview?Id=${id}`,
      httpOptions
    );
  }

  /**
   * Delete review
   * GET api/Review/DeleteReview?Id={id}
   */
  deleteReview(id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Review/DeleteReview?Id=${id}`,
      httpOptions
    );
  }

  /**
   * Change review owner
   * POST api/Review/Changeowner_Review
   */
  changeOwnerReview(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/Review/Changeowner_Review`,
      model,
      httpOptions
    );
  }

  /**
   * Update reviewer status (e.g. approve, reject, comment)
   * POST api/Review/UpdateReviewerStatus
   */
  updateReviewerStatus(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/Review/UpdateReviewerStatus`,
      model,
      httpOptions
    );
  }

  /**
   * Check reviewer eligibility before start
   * GET api/Review/CheckReviwerBeforeStart?AppId={appId}
   */
  checkReviewerBeforeStart(appId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Review/CheckReviwerBeforeStart?AppId=${appId}`,
      httpOptions
    );
  }

  /**
   * Check reviewer before aborting
   * GET api/Review/CheckReviwerToAbort?ReviewerId={reviewerId}
   */
  checkReviewerToAbort(reviewerId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Review/CheckReviwerToAbort?ReviewerId=${reviewerId}`,
      httpOptions
    );
  }

  /**
   * Check if last task in review cycle is complete
   * GET api/Review/CheckIsLastTaskComplete?ReviewId={reviewId}
   */
  checkIsLastTaskComplete(reviewId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Review/CheckIsLastTaskComplete?ReviewId=${reviewId}`,
      httpOptions
    );
  }

  /**
   * Update reviewer sequence order
   * POST api/Review/UpdateOrder
   */
  updateOrder(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/Review/UpdateOrder`,
      model,
      httpOptions
    );
  }
}
