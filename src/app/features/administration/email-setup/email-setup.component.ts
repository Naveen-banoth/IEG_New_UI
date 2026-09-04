import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SuperAdminEmailConfigService } from '../../../TestServices/Superadmin/super-admin-email-config.service';
import { EmailAccountItem } from '../../../core/models/administration.model';

export { EmailAccountItem };

import { TopUserToolbarComponent } from '../../../layout/top-user-toolbar/top-user-toolbar.component';

@Component({
  selector: 'app-email-setup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TopUserToolbarComponent],
  templateUrl: './email-setup.component.html',
  styleUrl: './email-setup.component.scss'
})
export class EmailSetupComponent implements OnInit {
  private emailService = inject(SuperAdminEmailConfigService);

  public searchExpanded = signal<boolean>(false);
  public searchKeyword = signal<string>('');

  public showModal = signal<boolean>(false);
  public isEditMode = signal<boolean>(false);
  public isSaving = signal<boolean>(false);
  public activeActionMenuId = signal<string | null>(null);

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

  public accountsList = signal<EmailAccountItem[]>([]);

  public currentPage = signal<number>(1);
  public pageSize = signal<number>(10);

  public filteredAccounts = computed(() => {
    const keyword = this.searchKeyword().toLowerCase().trim();
    const list = this.accountsList();
    if (!keyword) return list;
    return list.filter(a =>
      a.email.toLowerCase().includes(keyword) ||
      a.displayName.toLowerCase().includes(keyword)
    );
  });

  public paginatedAccounts = computed(() => {
    const page = this.currentPage();
    const size = this.pageSize();
    const start = (page - 1) * size;
    return this.filteredAccounts().slice(start, start + size);
  });

  public totalPages = computed(() => {
    return Math.ceil(this.filteredAccounts().length / this.pageSize()) || 1;
  });

  ngOnInit(): void {
    this.loadEmailAccounts();
  }

  loadEmailAccounts(): void {
    this.emailService.getSMTPRecordList().subscribe({
      next: (res: any) => {
        const records = Array.isArray(res) ? res : (res?.Data && Array.isArray(res.Data) ? res.Data : []);
        if (records.length > 0) {
          const mapped = records.map((r: any, idx: number) => ({
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
          this.accountsList.set(mapped);
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
          this.accountsList.set([{
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
          }]);
        } else if (this.accountsList().length === 0) {
          this.accountsList.set([
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
          ]);
        }
      },
      error: () => {
        if (this.accountsList().length === 0) {
          this.accountsList.set([
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
          ]);
        }
      }
    });
  }

  openAddModal(): void {
    this.isEditMode.set(false);
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
    this.showModal.set(true);
  }

  openEditModal(account: EmailAccountItem): void {
    this.isEditMode.set(true);
    this.emailForm = { ...account };
    this.showModal.set(true);
    this.activeActionMenuId.set(null);
  }

  saveAccount(): void {
    if (!this.emailForm.email) return;

    this.isSaving.set(true);
    const raw = this.emailForm.rawConfig || {};
    const isEdit = this.isEditMode();
    const payload = {
      ...raw,
      EmailConfigID: isEdit && this.emailForm.id && !this.emailForm.id.startsWith('EML-') 
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
        this.isSaving.set(false);
        this.showModal.set(false);
        this.loadEmailAccounts();
      },
      error: () => {
        this.isSaving.set(false);
        if (isEdit) {
          const list = [...this.accountsList()];
          const idx = list.findIndex(a => a.id === this.emailForm.id);
          if (idx !== -1) {
            list[idx] = { ...this.emailForm };
            this.accountsList.set(list);
          }
        } else {
          this.accountsList.update(list => [{ ...this.emailForm, id: payload.EmailConfigID }, ...list]);
        }
        this.showModal.set(false);
      }
    });
  }

  deleteAccount(id: string): void {
    const rawAccount = this.accountsList().find(a => a.id === id);
    const apiId = rawAccount?.rawConfig?.EmailConfigID || rawAccount?.rawConfig?.EmailServerID || id;

    this.accountsList.update(list => list.filter(a => a.id !== id));
    this.emailService.deleteConfigAsync(apiId).subscribe({
      next: () => {},
      error: () => {}
    });
    this.activeActionMenuId.set(null);
  }

  toggleActionMenu(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.activeActionMenuId.set(this.activeActionMenuId() === id ? null : id);
  }

  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16).toUpperCase();
    });
  }
}
