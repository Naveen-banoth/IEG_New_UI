import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SuperAdminEmailConfigService } from '../../../TestServices/Superadmin/super-admin-email-config.service';
import { EmailAccountItem } from '../../../core/models/administration.model';

export { EmailAccountItem };


@Component({
  selector: 'app-email-setup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './email-setup.component.html',
  styleUrl: './email-setup.component.scss'
})
export class EmailSetupComponent implements OnInit {
  public searchExpanded = false;
  public searchKeyword = '';

  public showModal = false;
  public isEditMode = false;
  public isSaving = false;
  public activeActionMenuId: string | null = null;

  public emailForm: EmailAccountItem = {
    id: '',
    email: '',
    displayName: '',
    smtpHost: 'smtp.office365.com',
    port: 587,
    username: '',
    password: '',
    enableSsl: true,
    active: true,
    accountType: 'GOOGLE'
  };

  public accountsList: EmailAccountItem[] = [];

  public currentPage = 1;
  public pageSize = 10;

  constructor(private emailService: SuperAdminEmailConfigService) {}

  ngOnInit(): void {
    this.loadEmailAccounts();
  }

  loadEmailAccounts(): void {
    this.emailService.getSMTPRecordList().subscribe({
      next: (res: any) => {
        const records = Array.isArray(res) ? res : (res?.Data && Array.isArray(res.Data) ? res.Data : []);
        if (records.length > 0) {
          this.accountsList = records.map((r: any, idx: number) => ({
            id: r.EmailConfigID || `EML-${idx + 1}`,
            email: r.EmailID || '',
            displayName: r.EmailDisplayName || '',
            smtpHost: r.SMTPHost || 'smtp.office365.com',
            port: Number(r.SMTPPort) || 587,
            username: r.EmailID || '',
            password: r.EmailPwd || '',
            enableSsl: r.SMTPSSL === '4' || r.SMTPSSL === '1' || r.SMTPSSL === true,
            active: r.EmailServerStatus !== false,
            accountType: r.EmailAccountTypeCode || 'GOOGLE',
            rawConfig: r
          }));
        } else {
          this.loadSingleConfig();
        }
      },
      error: () => {
        this.loadSingleConfig();
      }
    });
  }

  private loadSingleConfig(): void {
    this.emailService.fetchConfig().subscribe({
      next: (res: any) => {
        const cfg = res?.Data || res;
        if (cfg && (cfg.EmailID || cfg.EmailConfigID)) {
          this.accountsList = [{
            id: cfg.EmailConfigID || 'EML-1',
            email: cfg.EmailID || 'ieg@scimaxier.com',
            displayName: cfg.EmailDisplayName || 'Scimax IEG Notifications',
            smtpHost: cfg.SMTPHost || 'smtp.office365.com',
            port: Number(cfg.SMTPPort) || 587,
            username: cfg.EmailID || 'ieg@scimaxier.com',
            password: cfg.EmailPwd || '',
            enableSsl: cfg.SMTPSSL === '4' || cfg.SMTPSSL === '1' || cfg.SMTPSSL === true,
            active: cfg.EmailServerStatus !== false,
            accountType: cfg.EmailAccountTypeCode || 'GOOGLE',
            rawConfig: cfg
          }];
        } else if (this.accountsList.length === 0) {
          this.accountsList = [
            {
              id: 'EML-1',
              email: 'ieg@scimaxier.com',
              displayName: 'Scimax IEG Portal Notifications',
              smtpHost: 'smtp.office365.com',
              port: 587,
              username: 'ieg@scimaxier.com',
              enableSsl: true,
              active: true,
              accountType: 'GOOGLE'
            }
          ];
        }
      },
      error: () => {
        if (this.accountsList.length === 0) {
          this.accountsList = [
            {
              id: 'EML-1',
              email: 'ieg@scimaxier.com',
              displayName: 'Scimax IEG Portal Notifications',
              smtpHost: 'smtp.office365.com',
              port: 587,
              username: 'ieg@scimaxier.com',
              enableSsl: true,
              active: true,
              accountType: 'GOOGLE'
            }
          ];
        }
      }
    });
  }

  get filteredAccounts(): EmailAccountItem[] {
    return this.accountsList.filter(a => {
      return !this.searchKeyword || 
        a.email.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        a.displayName.toLowerCase().includes(this.searchKeyword.toLowerCase());
    });
  }

  get paginatedAccounts(): EmailAccountItem[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredAccounts.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAccounts.length / this.pageSize) || 1;
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.emailForm = {
      id: '',
      email: '',
      displayName: '',
      smtpHost: 'smtp.office365.com',
      port: 587,
      username: '',
      password: '',
      enableSsl: true,
      active: true,
      accountType: 'GOOGLE'
    };
    this.showModal = true;
  }

  openEditModal(account: EmailAccountItem): void {
    this.isEditMode = true;
    this.emailForm = { ...account };
    this.showModal = true;
    this.activeActionMenuId = null;
  }

  saveAccount(): void {
    if (!this.emailForm.email) return;

    this.isSaving = true;
    const raw = this.emailForm.rawConfig || {};
    const payload = {
      ...raw,
      EmailConfigID: this.isEditMode && this.emailForm.id && !this.emailForm.id.startsWith('EML-') 
        ? this.emailForm.id 
        : (raw.EmailConfigID || this.generateGuid()),
      EmailAccountTypeCode: this.emailForm.accountType || raw.EmailAccountTypeCode || 'GOOGLE',
      EmailDisplayName: this.emailForm.displayName || this.emailForm.email,
      EmailID: this.emailForm.email,
      EmailPwd: this.emailForm.password || raw.EmailPwd || 'Techsol@321',
      EmailServerStatus: this.emailForm.active,
      SMTPHost: this.emailForm.smtpHost || 'smtp.office365.com',
      SMTPPort: String(this.emailForm.port || 587),
      SMTPSSL: this.emailForm.enableSsl ? '4' : '0',
      FileExt: raw.FileExt || '.json',
      FileName: raw.FileName || 'smtp-config',
      GSuiteFileID: raw.GSuiteFileID || '',
      ManageAccessToken: raw.ManageAccessToken ? 1 : 0
    };

    this.emailService.insertSMTPConfiguration(payload).subscribe({
      next: () => {
        this.isSaving = false;
        this.showModal = false;
        this.loadEmailAccounts();
      },
      error: () => {
        this.isSaving = false;
        if (this.isEditMode) {
          const idx = this.accountsList.findIndex(a => a.id === this.emailForm.id);
          if (idx !== -1) {
            this.accountsList[idx] = { ...this.emailForm };
          }
        } else {
          this.accountsList.unshift({ ...this.emailForm, id: payload.EmailConfigID });
        }
        this.showModal = false;
      }
    });
  }

  deleteAccount(id: string): void {
    const rawAccount = this.accountsList.find(a => a.id === id);
    const apiId = rawAccount?.rawConfig?.EmailConfigID || rawAccount?.rawConfig?.EmailServerID || id;

    this.accountsList = this.accountsList.filter(a => a.id !== id);
    this.emailService.deleteConfigAsync(apiId).subscribe({
      next: () => {},
      error: () => {}
    });
    this.activeActionMenuId = null;
  }

  toggleActionMenu(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.activeActionMenuId = this.activeActionMenuId === id ? null : id;
  }

  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16).toUpperCase();
    });
  }
}
