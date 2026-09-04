import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EapGeneralInfoService, CommonSummaryService } from '../../TestServices';

export interface EapApplicationItem {
  appId: string;
  title: string;
  physicianName: string;
  product: string;
  studyType: string;
  status: string;
  submittedOn: string;
  domain?: string;
}

@Component({
  selector: 'app-eap-applications',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="screen-container">
      <div class="screen-header">
        <div>
          <span class="module-tag eap-tag">Module: Expanded Access Program (EAP)</span>
          <h2>EAP Applications Management</h2>
          <p class="subtitle">Screen Permission: EAP Applications (eap-applications). Comprehensive directory of all expanded access requests.</p>
        </div>
      </div>

      <!-- SEARCH CRITERIA CARD -->
      <div class="card-box search-box">
        <div class="search-grid">
          <div class="form-group">
            <label>Application ID</label>
            <input 
              type="text" 
              [ngModel]="searchAppId()" 
              (ngModelChange)="searchAppId.set($event)" 
              placeholder="e.g. EAP-801" 
              class="form-input" />
          </div>
          <div class="form-group">
            <label>Physician Name</label>
            <input 
              type="text" 
              [ngModel]="searchPhysician()" 
              (ngModelChange)="searchPhysician.set($event)" 
              placeholder="Physician name" 
              class="form-input" />
          </div>
          <div class="form-group">
            <label>Product</label>
            <input 
              type="text" 
              [ngModel]="searchProduct()" 
              (ngModelChange)="searchProduct.set($event)" 
              placeholder="Product name" 
              class="form-input" />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select 
              [ngModel]="searchStatus()" 
              (ngModelChange)="searchStatus.set($event)" 
              class="form-select">
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div class="search-actions">
          <button class="btn-primary" (click)="applySearch()">Search</button>
          <button class="btn-secondary" (click)="clearSearch()">Reset</button>
        </div>
      </div>

      <!-- DATA GRID CARD -->
      <div class="card-box">
        <div class="table-toolbar">
          <span class="showing-count">Showing {{ filteredApplications().length }} of {{ applications().length }} applications</span>
          <div class="status-tabs-pill">
            <button class="status-tab" [class.active]="activeTab() === 'All'" (click)="activeTab.set('All')">All ({{ applications().length }})</button>
            <button class="status-tab" [class.active]="activeTab() === 'Active'" (click)="activeTab.set('Active')">Active ({{ activeCount() }})</button>
            <button class="status-tab" [class.active]="activeTab() === 'Draft'" (click)="activeTab.set('Draft')">Drafts ({{ draftCount() }})</button>
            <button class="status-tab" [class.active]="activeTab() === 'Completed'" (click)="activeTab.set('Completed')">Completed ({{ completedCount() }})</button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>APP ID</th>
                <th>PROTOCOL / TITLE</th>
                <th>PHYSICIAN NAME</th>
                <th>PRODUCT</th>
                <th>STUDY TYPE</th>
                <th>STATUS</th>
                <th>SUBMITTED ON</th>
              </tr>
            </thead>
            <tbody>
              @for (item of filteredApplications(); track item.appId) {
                <tr>
                  <td class="font-mono">{{ item.appId }}</td>
                  <td class="font-bold">{{ item.title }}</td>
                  <td>{{ item.physicianName }}</td>
                  <td>{{ item.product }}</td>
                  <td>{{ item.studyType }}</td>
                  <td>
                    <span class="badge" [ngClass]="getStatusBadgeClass(item.status)">{{ item.status }}</span>
                  </td>
                  <td class="col-date">{{ item.submittedOn }}</td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="7" class="text-center py-6 text-slate-400">No applications found matching search criteria.</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .screen-container { display: flex; flex-direction: column; gap: 1.25rem; }
    .screen-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .module-tag { font-size: 0.7rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 999px; text-transform: uppercase; }
    .eap-tag { background: rgba(139, 92, 246, 0.15); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.3); }
    h2 { margin: 0.3rem 0 0.2rem 0; font-size: 1.5rem; color: #f8fafc; font-weight: 700; }
    .subtitle { margin: 0; font-size: 0.85rem; color: #94a3b8; }
    .card-box { background: #1e293b; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.25rem; }
    .search-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.35rem; }
    .form-group label { font-size: 0.8rem; color: #94a3b8; font-weight: 500; }
    .form-input, .form-select { background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; padding: 0.5rem 0.75rem; color: #f8fafc; font-size: 0.85rem; }
    .form-input:focus, .form-select:focus { outline: none; border-color: #8b5cf6; }
    .search-actions { display: flex; gap: 0.75rem; justify-content: flex-end; }
    .btn-primary { background: #8b5cf6; color: white; border: none; padding: 0.45rem 1.2rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .btn-secondary { background: transparent; border: 1px solid rgba(255, 255, 255, 0.2); color: #cbd5e1; padding: 0.45rem 1rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .table-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem; }
    .showing-count { font-size: 0.85rem; color: #94a3b8; }
    .status-tabs-pill { display: flex; background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 2px; }
    .status-tab { background: transparent; border: none; color: #94a3b8; padding: 0.35rem 0.75rem; font-size: 0.8rem; border-radius: 6px; cursor: pointer; font-weight: 500; }
    .status-tab.active { background: #8b5cf6; color: white; }
    .table-responsive { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem; }
    .data-table th { background: rgba(15, 23, 42, 0.6); padding: 0.75rem 1rem; color: #94a3b8; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.03em; }
    .data-table td { padding: 0.75rem 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1; }
    .font-mono { font-family: monospace; color: #a78bfa; font-weight: 600; }
    .font-bold { font-weight: 600; color: #f8fafc; }
    .badge { padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
    .badge.badge-active { background: rgba(16, 185, 129, 0.15); color: #34d399; }
    .badge.badge-draft { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    .badge.badge-completed { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
  `]
})
export class EapApplicationsComponent implements OnInit {
  private eapGeneralInfo = inject(EapGeneralInfoService);
  private commonSummary = inject(CommonSummaryService);

  public searchAppId = signal<string>('');
  public searchPhysician = signal<string>('');
  public searchProduct = signal<string>('');
  public searchStatus = signal<string>('All');
  public activeTab = signal<string>('All');

  public applications = signal<EapApplicationItem[]>([
    {
      appId: 'EAP-901',
      title: 'Expanded Access Treatment Protocol for Rare Pulmonary Disorder',
      physicianName: 'Dr. Gregory Vance',
      product: 'PulmoVance RX',
      studyType: 'Expanded Access Protocol',
      status: 'Active',
      submittedOn: '18-Aug-2026'
    },
    {
      appId: 'EAP-902',
      title: 'Single-Patient Compassionate Use IND in Pediatric Cardiology',
      physicianName: 'Dr. Sarah Jenkins',
      product: 'CardioRelief XR',
      studyType: 'Single Patient EAP',
      status: 'Active',
      submittedOn: '10-Aug-2026'
    },
    {
      appId: 'EAP-903',
      title: 'Emergency Use Authorization for Resistant Neurological Infection',
      physicianName: 'Dr. Michael Torres',
      product: 'NeuroBlock 50',
      studyType: 'Emergency IND',
      status: 'Draft',
      submittedOn: '02-Aug-2026'
    },
    {
      appId: 'EAP-904',
      title: 'Intermediate-Size Population EAP for Oncology Therapy',
      physicianName: 'Dr. Amelia Smith',
      product: 'OncoCure Plus',
      studyType: 'Intermediate EAP',
      status: 'Completed',
      submittedOn: '25-Jul-2026'
    }
  ]);

  public activeCount = computed(() => {
    return this.applications().filter(a => (a.status || '').toLowerCase().includes('active') || (a.status || '').toLowerCase().includes('approved')).length;
  });

  public draftCount = computed(() => {
    return this.applications().filter(a => (a.status || '').toLowerCase().includes('draft')).length;
  });

  public completedCount = computed(() => {
    return this.applications().filter(a => (a.status || '').toLowerCase().includes('complete') || (a.status || '').toLowerCase().includes('closed')).length;
  });

  public filteredApplications = computed(() => {
    const list = this.applications();
    const id = this.searchAppId().toLowerCase().trim();
    const phys = this.searchPhysician().toLowerCase().trim();
    const prod = this.searchProduct().toLowerCase().trim();
    const stat = this.searchStatus();
    const tab = this.activeTab();

    return list.filter(app => {
      if (id && !app.appId.toLowerCase().includes(id)) return false;
      if (phys && !app.physicianName.toLowerCase().includes(phys)) return false;
      if (prod && !app.product.toLowerCase().includes(prod)) return false;
      if (stat !== 'All' && !app.status.toLowerCase().includes(stat.toLowerCase())) return false;
      if (tab !== 'All') {
        if (tab === 'Active' && !['active', 'approved', 'submitted'].includes(app.status.toLowerCase())) return false;
        if (tab === 'Draft' && !app.status.toLowerCase().includes('draft')) return false;
        if (tab === 'Completed' && !['completed', 'closed'].includes(app.status.toLowerCase())) return false;
      }
      return true;
    });
  });

  ngOnInit(): void {
    this.loadEapApplications();
  }

  loadEapApplications(): void {
    this.eapGeneralInfo.getApplicationsList().subscribe({
      next: (response: any) => {
        const rows = response?.SummaryData || (Array.isArray(response) ? response : null);
        if (rows && rows.length > 0) {
          const mapped = rows.map((r: any) => ({
            appId: r.APPLICATION_NO || r.APPLICATION_ID || `EAP-${r.ID || '901'}`,
            title: r.TITLE || r.ProtocolTitle || r.Title || 'Expanded Access Protocol',
            physicianName: r.PHYSICIAN_NAME || r.PhysicianName || 'Dr. Principal Physician',
            product: r.PRODUCT_NAME || r.Product || 'Product Asset',
            studyType: r.STUDY_TYPE_NAME || r.StudyType || 'Expanded Access',
            status: r.STATUS_NAME || r.Status || 'Active',
            submittedOn: r.SubmittedOnStr || r.SUBMITTED_ON || '01-Aug-2026'
          }));
          this.applications.set(mapped);
        }
      },
      error: (err) => console.warn('EAP getApplicationsList fallback to mock data:', err)
    });

    this.commonSummary.getStatusList('5').subscribe({
      next: (res) => console.log('EAP status master loaded:', res ? 'OK' : 'Empty'),
      error: (err) => console.warn('EAP getstatus/5 fallback:', err)
    });
  }

  getStatusBadgeClass(status: string): string {
    const s = (status || '').toLowerCase();
    if (s.includes('active') || s.includes('approved')) return 'badge-active';
    if (s.includes('draft')) return 'badge-draft';
    return 'badge-completed';
  }

  applySearch(): void {
    const searchObj = {
      SearchText: this.searchAppId() || this.searchPhysician() || this.searchProduct(),
      Status: this.searchStatus() === 'All' ? '-1' : this.searchStatus()
    };
    this.eapGeneralInfo.getSummarySearch(searchObj).subscribe({
      next: (res: any) => {
        const rows = res?.SummaryData || (Array.isArray(res) ? res : null);
        if (rows && rows.length > 0) {
          const mapped = rows.map((r: any) => ({
            appId: r.APPLICATION_NO || r.APPLICATION_ID || `EAP-${r.ID || '901'}`,
            title: r.TITLE || r.ProtocolTitle || r.Title || 'Expanded Access Protocol',
            physicianName: r.PHYSICIAN_NAME || r.PhysicianName || 'Dr. Principal Physician',
            product: r.PRODUCT_NAME || r.Product || 'Product Asset',
            studyType: r.STUDY_TYPE_NAME || r.StudyType || 'Expanded Access',
            status: r.STATUS_NAME || r.Status || 'Active',
            submittedOn: r.SubmittedOnStr || r.SUBMITTED_ON || '01-Aug-2026'
          }));
          this.applications.set(mapped);
        }
      },
      error: (err) => console.warn('EAP search fallback to local filter:', err)
    });
  }

  clearSearch(): void {
    this.searchAppId.set('');
    this.searchPhysician.set('');
    this.searchProduct.set('');
    this.searchStatus.set('All');
    this.loadEapApplications();
  }
}
