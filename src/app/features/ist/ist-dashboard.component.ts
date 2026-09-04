import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { IstGeneralInfoService, CommonSummaryService } from '../../TestServices';

export interface TrialApplication {
  title: string;
  appId: string;
  type: string;
  physicianName: string;
  owner: string;
  product: string;
  studyType: string;
  requestType: string;
  status: string;
  therapeuticArea: string;
  studySponsored?: string;
  submittedOn: string;
  lastUpdatedOn?: string;
}

@Component({
  selector: 'app-ist-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ist-dashboard.component.html',
  styleUrl: './ist-dashboard.component.css'
})
export class IstDashboardComponent implements OnInit {
  // Active Program Tab (Navigation in screenshot)
  public currentProgram = signal<string>('ist');

  // Search & Status Tabs State (from screenshot)
  public globalSearch = signal<string>('');
  public selectedTab = signal<'active' | 'draft' | 'completed' | 'all'>('all');

  // Signals for UI Layout and Search Toggle State
  public isSearchOpen = signal<boolean>(false);
  public isSplitView = signal<boolean>(false);
  public activeTab = signal<string>('All');
  public isLoading = signal<boolean>(false);

  // Signals for Search Filter Inputs
  public filterAppId = signal<string>('');
  public filterAppType = signal<string>('All');
  public filterPhysician = signal<string>('');
  public filterTherapeuticArea = signal<string>('All');
  public filterRequestType = signal<string>('All');
  public filterProduct = signal<string>('Select');
  public filterStudyType = signal<string>('Select');
  public filterOwner = signal<string>('');
  public filterStatus = signal<string>('All');
  public filterFromDate = signal<string>('');
  public filterToDate = signal<string>('');

  // Selected Row Signal
  public selectedRow = signal<TrialApplication | null>(null);

  // Create Application Modal Signals
  public isCreateModalOpen = signal<boolean>(false);
  public isCreating = signal<boolean>(false);
  public createSuccessMessage = signal<string | null>(null);
  public createErrorMessage = signal<string | null>(null);

  // New Application Form Fields
  public newAppType = signal<string>('Ascoril Clinical use');
  public newAppTitle = signal<string>('');
  public newAppPhysician = signal<string>('');
  public newAppTherapeuticArea = signal<string>('Pulmonology');
  public newAppRequestType = signal<string>('Funds');
  public newAppProduct = signal<string>('Ascoril');
  public newAppStudyType = signal<string>('Cohort Study');
  public newAppCurrency = signal<string>('USD');

  public currencyOptions = signal<{ code: string; symbol: string; name: string }[]>([
    { code: 'USD', symbol: '$', name: 'US Dollar (USD)' },
    { code: 'EUR', symbol: '€', name: 'Euro (EUR)' },
    { code: 'GBP', symbol: '£', name: 'British Pound (GBP)' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee (INR)' },
    { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar (CAD)' }
  ]);

  public appTypePresets = signal<{ id: string; title: string; desc: string; icon: string; tag: string }[]>([
    {
      id: 'Ascoril Clinical use',
      title: 'Ascoril Clinical Use',
      desc: 'Clinical evaluation & pharmacokinetics studies for Ascoril formulations.',
      icon: 'ph-flask',
      tag: 'Clinical Trial'
    },
    {
      id: 'NewApplication1',
      title: 'Interventional Trial',
      desc: 'Phase II/III investigational compound safety & efficacy assessment.',
      icon: 'ph-dna',
      tag: 'Interventional'
    },
    {
      id: 'ORS Powder Type',
      title: 'ORS Bioavailability Study',
      desc: 'Comparative electrolyte absorption & restoration registry.',
      icon: 'ph-drop',
      tag: 'Registry'
    },
    {
      id: 'General IST',
      title: 'General Investigator Study',
      desc: 'Independent observational or investigator-initiated protocol.',
      icon: 'ph-stethoscope',
      tag: 'Observational'
    }
  ]);

  // Filter Dropdown Options Signals
  public applicationTypeOptions = signal<string[]>([
    'All',
    'Ascoril Clinical use',
    'NewApplication1',
    'ORS Powder Type',
    'General IST'
  ]);
  public requestTypeOptions = signal<string[]>(['All', 'Funds', 'Product', 'Both']);
  public therapeuticAreaOptions = signal<string[]>([
    'All',
    'Pulmonology',
    'Oncology',
    'Cardiology',
    'Endocrinology',
    'Neurology',
    'Hematology'
  ]);
  public productOptions = signal<string[]>([
    'Select',
    'Ascoril',
    'ORS Powder',
    'Product Alpha',
    'Product Beta',
    'HemaCure XL'
  ]);
  public studyTypeOptions = signal<string[]>([
    'Select',
    'Cohort Study',
    'Systematic Review',
    'Observational',
    'Registry',
    'Interventional'
  ]);
  public statusOptions = signal<string[]>([
    'All',
    'Accepted-this is accepted state',
    'Submitted-this is submitted state',
    'Withdrawn',
    'Rejected'
  ]);

  // Main Applications Signal State
  public applications = signal<TrialApplication[]>([]);

  // Tab counts for status filter pills (from screenshot)
  public activeCount = computed(() => this.applications().filter(a => !a.status?.toLowerCase().includes('close') && !a.status?.toLowerCase().includes('draft') && !a.status?.toLowerCase().includes('reject')).length);
  public draftCount = computed(() => this.applications().filter(a => a.status?.toLowerCase().includes('draft')).length);
  public completedCount = computed(() => this.applications().filter(a => a.status?.toLowerCase().includes('close') || a.status?.toLowerCase().includes('reject') || a.status?.toLowerCase().includes('withdraw')).length);

  // Computed Signal for Filtered Applications
  public filteredApplications = computed(() => {
    let list = this.applications();
    const query = this.globalSearch().trim().toLowerCase();
    const tab = this.selectedTab();

    // Quick tab filtering from top-right status pills
    if (tab === 'active') {
      list = list.filter(a => !a.status?.toLowerCase().includes('close') && !a.status?.toLowerCase().includes('draft') && !a.status?.toLowerCase().includes('reject'));
    } else if (tab === 'draft') {
      list = list.filter(a => a.status?.toLowerCase().includes('draft'));
    } else if (tab === 'completed') {
      list = list.filter(a => a.status?.toLowerCase().includes('close') || a.status?.toLowerCase().includes('reject') || a.status?.toLowerCase().includes('withdraw'));
    }

    // Global quick search bar filter
    if (query) {
      list = list.filter(app =>
        (app.title && app.title.toLowerCase().includes(query)) ||
        (app.appId && app.appId.toLowerCase().includes(query)) ||
        (app.physicianName && app.physicianName.toLowerCase().includes(query)) ||
        (app.owner && app.owner.toLowerCase().includes(query)) ||
        (app.product && app.product.toLowerCase().includes(query)) ||
        (app.status && app.status.toLowerCase().includes(query))
      );
    }

    // Advanced search criteria filter
    const appId = this.filterAppId().trim().toLowerCase();
    const physician = this.filterPhysician().trim().toLowerCase();
    const owner = this.filterOwner().trim().toLowerCase();
    const appType = this.filterAppType();
    const reqType = this.filterRequestType();
    const product = this.filterProduct();
    const studyType = this.filterStudyType();
    const area = this.filterTherapeuticArea();
    const status = this.filterStatus();

    return list.filter(app => {
      if (appId && !app.appId?.toLowerCase().includes(appId) && !app.title?.toLowerCase().includes(appId)) return false;
      if (physician && !app.physicianName?.toLowerCase().includes(physician)) return false;
      if (owner && !app.owner?.toLowerCase().includes(owner)) return false;
      if (appType !== 'All' && !app.type?.toLowerCase().includes(appType.toLowerCase())) return false;
      if (reqType !== 'All' && !app.requestType?.toLowerCase().includes(reqType.toLowerCase())) return false;
      if (product !== 'Select' && app.product !== product) return false;
      if (studyType !== 'Select' && app.studyType !== studyType) return false;
      if (area !== 'All' && app.therapeuticArea && !app.therapeuticArea.toLowerCase().includes(area.toLowerCase())) return false;
      if (status !== 'All' && !app.status?.toLowerCase().includes(status.toLowerCase())) return false;
      return true;
    });
  });

  // Computed Signal Helpers
  public totalCount = computed(() => this.applications().length);
  public filteredCount = computed(() => this.filteredApplications().length);

  private istGeneralInfo = inject(IstGeneralInfoService);
  private commonSummary = inject(CommonSummaryService);
  private router = inject(Router);

  ngOnInit(): void {
    if (this.applications().length > 0) {
      this.selectedRow.set(this.applications()[0]);
    }
    this.loadApplicationsData();
    this.loadStatusesAndMetadata();
  }

  loadApplicationsData(): void {
    this.isLoading.set(true);
    this.istGeneralInfo.getApplicationsList().subscribe({
      next: (response: any) => {
        this.isLoading.set(false);
        const rows = response?.SummaryData || (Array.isArray(response) ? response : null);
        if (rows && rows.length > 0) {
          const mapped: TrialApplication[] = rows.map((r: any) => ({
            appId: r.APPLICATION_CODE,
            type: r.APPLICATION_TYPE_NAME || r.Type || r.APPLICATION_TYPE || 'Ascoril Clinical use',
            title: r.TITLE || r.ProtocolTitle || r.Title || 'Clinical Study Protocol',
            physicianName: r.PHYSICIAN_NAME || r.PhysicianName || 'Dr. Investigator',
            requestType: r.REQUEST_TYPE_NAME || r.RequestType || (r.REQUEST_TYPE === 1 ? 'Funds' : r.REQUEST_TYPE === 2 ? 'Product' : 'Both'),
            owner: r.ORGANIZATION_NAME || r.AssignedTo || r.Owner || 'scimax1A',
            product: r.PRODUCT_NAME || r.Product || '',
            studyType: r.STUDY_TYPE_NAME || r.StudyType || 'Cohort Study',
            status: r.STATUS_NAME || r.Status || 'Accepted-this is accepted state',
            therapeuticArea: r.THERAPEUTIC_AREA_NAME || r.TherapeuticArea || 'Pulmonology',
            studySponsored: r.STUDY_SPONSORED || 'Individual',
            submittedOn: r.SubmittedOnStr || r.SUBMITTED_ON || '18-Aug-2026 10:20:39',
            lastUpdatedOn: r.LastUpdatedStr || r.LAST_UPDATED_ON || '18-Aug-2026 11:13:02'
          }));
          this.applications.set(mapped);
          if (mapped.length > 0) {
            this.selectedRow.set(mapped[0]);
          }
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        console.warn('IST getApplicationsList fallback to default rows:', err);
      }
    });
  }

  loadStatusesAndMetadata(): void {
    this.commonSummary.getStatusList('2').subscribe({
      next: (statuses: any) => {
        if (statuses && Array.isArray(statuses)) {
          this.statusOptions.set(['All', ...statuses.map((s: any) => s.STATUS_NAME || s.NAME || s)]);
        }
      },
      error: (err) => console.warn('GetStatus master fallback:', err)
    });
  }

  selectRow(app: TrialApplication): void {
    this.selectedRow.set(app);
  }

  toggleSearch(): void {
    this.isSearchOpen.update(v => !v);
  }

  setSplitView(isSplit: boolean): void {
    this.isSplitView.set(isSplit);
  }

  setTab(tab: 'active' | 'draft' | 'completed' | 'all'): void {
    this.selectedTab.set(tab);
  }

  setProgram(program: string): void {
    this.currentProgram.set(program);
    if (program === 'eap') {
      this.router.navigate(['/eap']);
    } else if (program === 'grants') {
      this.router.navigate(['/grants']);
    }
  }

  getStatusBadgeClass(status: string | undefined): string {
    if (!status) return 'status-badge-submitted';
    const s = status.toLowerCase();
    if (s.includes('reject')) return 'status-badge-rejected';
    if (s.includes('submit')) return 'status-badge-submitted';
    if (s.includes('withdraw')) return 'status-badge-withdrawn';
    if (s.includes('close')) return 'status-badge-closed';
    if (s.includes('accept') || s.includes('approv')) return 'status-badge-accepted';
    if (s.includes('draft')) return 'status-badge-draft';
    return 'status-badge-submitted';
  }

  getCleanStatus(status: string | undefined): string {
    if (!status) return 'Submitted';
    if (status.includes('-')) {
      return status.split('-')[0].trim();
    }
    return status;
  }

  formatSubmittedDate(dateStr: string | undefined): string {
    if (!dateStr || dateStr === '—') return '—';
    if (dateStr.includes(' ')) {
      return dateStr.split(' ')[0];
    }
    return dateStr;
  }

  editApplication(app: TrialApplication | null, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (app) {
      this.router.navigate(['/ist/detail', app.appId]);
    }
  }

  applySearch(): void {
    const searchPayload = {
      Title: this.filterAppId(),
      PhysicianName: this.filterPhysician(),
      Assignedto: this.filterOwner(),
      ProductName: this.filterProduct() === 'Select' ? '' : this.filterProduct(),
      StudyType: this.filterStudyType() === 'Select' ? '' : this.filterStudyType(),
      TherapeuticArea: this.filterTherapeuticArea() === 'All' ? '' : this.filterTherapeuticArea(),
      RequestType: this.filterRequestType() === 'All' ? '' : this.filterRequestType(),
      Status: this.filterStatus() === 'All' ? '' : this.filterStatus()
    };

    this.istGeneralInfo.getSummarySearch(searchPayload).subscribe({
      next: (res: any) => {
        const rows = res?.SummaryData || (Array.isArray(res) ? res : null);
        if (rows && rows.length > 0) {
          const mapped: TrialApplication[] = rows.map((r: any) => ({
            appId: r.APPLICATION_NO || r.APPLICATION_ID || r.ApplicationId || `IST-${r.ID || '101'}`,
            type: r.APPLICATION_TYPE_NAME || r.Type || r.APPLICATION_TYPE || 'Ascoril Clinical use',
            title: r.TITLE || r.ProtocolTitle || r.Title || 'Clinical Study Protocol',
            physicianName: r.PHYSICIAN_NAME || r.PhysicianName || 'Dr. Investigator',
            requestType: r.REQUEST_TYPE_NAME || r.RequestType || (r.REQUEST_TYPE === 1 ? 'Funds' : r.REQUEST_TYPE === 2 ? 'Product' : 'Both'),
            owner: r.ORGANIZATION_NAME || r.AssignedTo || r.Owner || 'scimax1A',
            product: r.PRODUCT_NAME || r.Product || '',
            studyType: r.STUDY_TYPE_NAME || r.StudyType || 'Cohort Study',
            status: r.STATUS_NAME || r.Status || 'Accepted-this is accepted state',
            therapeuticArea: r.THERAPEUTIC_AREA_NAME || r.TherapeuticArea || 'Pulmonology',
            studySponsored: r.STUDY_SPONSORED || 'Individual',
            submittedOn: r.SubmittedOnStr || r.SUBMITTED_ON || '18-Aug-2026 10:20:39',
            lastUpdatedOn: r.LastUpdatedStr || r.LAST_UPDATED_ON || '18-Aug-2026 11:13:02'
          }));
          this.applications.set(mapped);
          if (mapped.length > 0) {
            this.selectedRow.set(mapped[0]);
          }
        }
      },
      error: (err) => console.warn('Search fallback to client filter:', err)
    });
  }

  toggleAppType(type: string): void {
    if (this.filterAppType() === type) {
      this.filterAppType.set('All');
    } else {
      this.filterAppType.set(type);
    }
  }

  toggleRequestType(type: string): void {
    if (this.filterRequestType() === type) {
      this.filterRequestType.set('All');
    } else {
      this.filterRequestType.set(type);
    }
  }

  resetFilters(): void {
    this.clearSearch();
    this.globalSearch.set('');
  }

  clearSearch(): void {
    this.filterAppId.set('');
    this.filterAppType.set('All');
    this.filterPhysician.set('');
    this.filterTherapeuticArea.set('All');
    this.filterRequestType.set('All');
    this.filterProduct.set('Select');
    this.filterStudyType.set('Select');
    this.filterOwner.set('');
    this.filterStatus.set('All');
    this.filterFromDate.set('');
    this.filterToDate.set('');
    this.loadApplicationsData();
  }

  openCreateModal(): void {
    this.createSuccessMessage.set(null);
    this.createErrorMessage.set(null);
    this.newAppTitle.set('');
    this.newAppPhysician.set('');
    this.newAppType.set('Ascoril Clinical use');
    this.newAppTherapeuticArea.set('Pulmonology');
    this.newAppRequestType.set('Funds');
    this.newAppProduct.set('Ascoril');
    this.newAppStudyType.set('Cohort Study');
    this.newAppCurrency.set('USD');
    this.isCreateModalOpen.set(true);
  }

  closeCreateModal(): void {
    this.isCreateModalOpen.set(false);
  }

  submitCreateApplication(): void {
    const title = this.newAppTitle().trim();
    const physician = this.newAppPhysician().trim();

    if (!title) {
      this.createErrorMessage.set('Please provide a Study Protocol Title to proceed.');
      return;
    }
    if (!physician) {
      this.createErrorMessage.set('Please provide the Principal Investigator / Physician name.');
      return;
    }

    this.isCreating.set(true);
    this.createErrorMessage.set(null);

    // Generate local unique application ID
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newId = `IST-2026-${randomNum}`;

    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}-${now.toLocaleString('default', { month: 'short' })}-${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newApp: TrialApplication = {
      appId: newId,
      title: title,
      type: this.newAppType(),
      physicianName: physician,
      therapeuticArea: this.newAppTherapeuticArea(),
      requestType: this.newAppRequestType(),
      product: this.newAppProduct(),
      studyType: this.newAppStudyType(),
      owner: 'scimax1A',
      status: 'Submitted-this is submitted state',
      studySponsored: 'Individual',
      submittedOn: dateStr,
      lastUpdatedOn: dateStr
    };

    // Prepend new application to active list
    setTimeout(() => {
      this.applications.update(apps => [newApp, ...apps]);
      this.selectedRow.set(newApp);
      this.isCreating.set(false);
      this.createSuccessMessage.set(`Application ${newId} created successfully!`);

      setTimeout(() => {
        this.closeCreateModal();
      }, 1200);
    }, 600);
  }

  viewAll(): void {
    this.clearSearch();
  }
}


