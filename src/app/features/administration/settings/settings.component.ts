import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminUserManagementService } from '../../../TestServices/Administration/admin-user-management.service';


import { TopUserToolbarComponent } from '../../../layout/top-user-toolbar/top-user-toolbar.component';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TopUserToolbarComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  public accountActivity = 'Enabled for all portal users';
  public correspondence = 'Automated system digests & webhooks';
  public timeZone = '(UTC-05:00) Eastern Time (US & Canada)';
  public currency = 'USD ($)';
  
  public isSavedAlert = false;
  public showTextPreview = false;

  public loginScreenText = `Scimax maintains HIPAA compliance in the United States. HIPAA compliance involves fulfilling the requirements of the Health Insurance Portability and Accountability Act of 1996, its subsequent amendments, and related regulations such as the HITECH Act. All data transmissions are encrypted with AES-256 standards.`;

  public activeFont = 'Segoe UI';
  public activeFontSize = '15px';
  public activeFormat = 'Paragraph';

  public timezonesList: string[] = [
    '(UTC-08:00) Pacific Time (US & Canada)',
    '(UTC-07:00) Mountain Time (US & Canada)',
    '(UTC-06:00) Central Time (US & Canada)',
    '(UTC-05:00) Eastern Time (US & Canada)',
    '(UTC+00:00) UTC / London',
    '(UTC+01:00) Central European Time (Berlin, Paris)',
    '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi',
    '(UTC+08:00) Singapore, Beijing, Perth',
    '(UTC+09:00) Tokyo, Seoul'
  ];

  public accountActivityOptions: string[] = [
    'Enabled for all portal users',
    'Enabled for internal team only',
    'Restricted by role hierarchy'
  ];

  public correspondenceOptions: string[] = [
    'Automated system digests & webhooks',
    'Immediate notification events only',
    'Batch nightly summaries'
  ];

  constructor(private userMgmtService: AdminUserManagementService) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.userMgmtService.fetchTimeZones().subscribe({
      next: (res: any) => {
        const list = Array.isArray(res) ? res : (res?.Data && Array.isArray(res.Data) ? res.Data : []);
        if (list.length > 0) {
          const tzNames = list.map((t: any) => t.DisplayName || t.TimeZone || t.Value || t.label || t).filter(Boolean);
          if (tzNames.length > 0) {
            this.timezonesList = Array.from(new Set([...this.timezonesList, ...tzNames]));
          }
        }
      },
      error: () => {}
    });

    this.userMgmtService.getCurrency().subscribe({
      next: (res: any) => {
        if (res && res.Currency) {
          this.currency = res.Currency;
        }
      },
      error: () => {}
    });
  }

  saveSettings(): void {
    this.userMgmtService.timeZoneAutoSave(this.timeZone).subscribe({
      next: () => {},
      error: () => {}
    });

    this.userMgmtService.currencyAutoSave({ Currency: this.currency }).subscribe({
      next: () => {},
      error: () => {}
    });

    this.isSavedAlert = true;
    setTimeout(() => {
      this.isSavedAlert = false;
    }, 3000);
  }

  formatText(command: string, value: string = ''): void {
    document.execCommand(command, false, value);
  }
}

