import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions, serviceConstants } from '../../constants/service.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonAlertsNotificationsService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch Application Types for alerts configuration
   * GET api/AlertsAndNotifications/GetApplicationTypes?ModuleId={ModuleId}&RecordID={RecordID}
   */
  getApplicationTypes(moduleId: string = '1', recordId: string = '-1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/AlertsAndNotifications/GetApplicationTypes?ModuleId=${moduleId}&RecordID=${recordId}`,
      httpOptions
    );
  }

  /**
   * Fetch Placeholders for dynamic alert message templates
   * GET api/AlertsAndNotifications/GetANPlaceHolders/{ModuleId}
   */
  getANPlaceHolders(moduleId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/AlertsAndNotifications/GetANPlaceHolders/${moduleId}`,
      httpOptions
    );
  }

  /**
   * Fetch Notification & Alert Events list
   * GET api/AlertsAndNotifications/GetANNotificationAndAlertEvents/{ModuleId}
   */
  getANNotificationAndAlertEvents(moduleId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/AlertsAndNotifications/GetANNotificationAndAlertEvents/${moduleId}`,
      httpOptions
    );
  }

  /**
   * Fetch Outgoing SMTP Email servers configured for a module
   * GET api/AlertsAndNotifications/GetANOutgoingSMTPEmailServers/{ModuleId}
   */
  getANOutgoingSMTPEmailServers(moduleId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/AlertsAndNotifications/GetANOutgoingSMTPEmailServers/${moduleId}`,
      httpOptions
    );
  }

  /**
   * Fetch configured Alerts and Notifications summary for a module
   * GET api/AlertsAndNotifications/GetAlertsAndNotificationsSummary/{ModuleId}
   */
  getAlertsAndNotificationsSummary(moduleId: string = '1'): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/AlertsAndNotifications/GetAlertsAndNotificationsSummary/${moduleId}`,
      httpOptions
    );
  }

  /**
   * Fetch single Alert/Notification rule by ID
   * GET api/AlertsAndNotifications/GetAlertsAndNotificationsById/{ModuleId}/{Id}
   */
  getAlertsAndNotificationsById(moduleId: string = '1', id: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/AlertsAndNotifications/GetAlertsAndNotificationsById/${moduleId}/${id}`,
      httpOptions
    );
  }

  /**
   * Save / Update Alert or Notification rule
   * POST api/AlertsAndNotifications/SaveAlertsAndNotifications
   */
  saveAlertsAndNotifications(model: any): Observable<any> {
    return this.http.post<any>(
      `${serviceConstants.apiURL}api/AlertsAndNotifications/SaveAlertsAndNotifications`,
      model,
      httpOptions
    );
  }

  /**
   * Save Outgoing SMTP Server assignment for a module
   * GET api/AlertsAndNotifications/SaveOutgoingSMTPEmail/{ModuleId}/{EmailServerId}
   */
  saveOutgoingSMTP(moduleId: string = '1', emailServerId: string = '1'): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/AlertsAndNotifications/SaveOutgoingSMTPEmail/${moduleId}/${emailServerId}`,
      httpOptions
    );
  }

  /**
   * Fetch in-app notifications for the logged-in user
   * GET api/Notifications/GetUserNotifications
   */
  getUserNotifications(): Observable<any[]> {
    return this.http.get<any[]>(
      `${serviceConstants.apiURL}api/Notifications/GetUserNotifications`,
      httpOptions
    );
  }

  /**
   * Fetch total unread notifications count
   * GET api/Notifications/NotificationCount
   */
  getNotificationCount(): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Notifications/NotificationCount`,
      httpOptions
    );
  }

  /**
   * Mark single notification as read / update state
   * GET api/Notifications/UpdateNotification/{id}
   */
  updateUserNotification(orgUserNotificationId: string): Observable<any> {
    return this.http.get<any>(
      `${serviceConstants.apiURL}api/Notifications/UpdateNotification/${orgUserNotificationId}`,
      httpOptions
    );
  }
}
