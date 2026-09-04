import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminAnalyticsService, OrgDashboardDetails } from '../../../TestServices';

export interface AnalyticsDashboardItem {
  id: string;
  name: string;
  module: string;
  category: string;
  type: string;
  status: string;
  lastUpdated: string;
  reportCount: number;
}

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="screen-container">
      <!-- HEADER -->
      <div class="screen-header">
        <div>
          <div class="flex items-center gap-2">
            <span class="module-tag analytics-tag">Platform & Logs</span>
            <span class="text-xs text-slate-400">• Analytics Console</span>
          </div>
          <h2>Analytics & BI Dashboards</h2>
          <p class="subtitle">Screen Permission: Analytics Dashboards (analyticsconsole). Real-time KPI reporting, cross-module analytics & data visualizations.</p>
        </div>
        <div class="header-actions">
          <button class="btn-sync" (click)="syncDashboards()" [disabled]="isSyncing()">
            <i class="ph ph-arrows-clockwise" [class.animate-spin]="isSyncing()"></i>
            <span>{{ isSyncing() ? 'Syncing...' : 'Sync Dashboards' }}</span>
          </button>
        </div>
      </div>

      <!-- METRIC CARDS -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon-wrap bg-blue-500/10 text-blue-400">
            <i class="ph ph-chart-bar text-xl"></i>
          </div>
          <div class="kpi-content">
            <div class="kpi-title">Active Dashboards</div>
            <div class="kpi-value">{{ dashboards().length }}</div>
            <div class="kpi-trend positive">All modules connected</div>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon-wrap bg-emerald-500/10 text-emerald-400">
            <i class="ph ph-microscope text-xl"></i>
          </div>
          <div class="kpi-content">
            <div class="kpi-title">IST Clinical Metrics</div>
            <div class="kpi-value">12 Metrics</div>
            <div class="kpi-trend positive">Recruitment & Milestones</div>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon-wrap bg-purple-500/10 text-purple-400">
            <i class="ph ph-heart-handshake text-xl"></i>
          </div>
          <div class="kpi-content">
            <div class="kpi-title">EAP Protocol Reports</div>
            <div class="kpi-value">8 Reports</div>
            <div class="kpi-trend positive">Compassionate Use Stats</div>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon-wrap bg-amber-500/10 text-amber-400">
            <i class="ph ph-coins text-xl"></i>
          </div>
          <div class="kpi-content">
            <div class="kpi-title">Grants Allocation</div>
            <div class="kpi-value">$4.2M</div>
            <div class="kpi-trend positive">CME & Charitable Totals</div>
          </div>
        </div>
      </div>

      <!-- DASHBOARDS TABLE CARD -->
      <div class="card-box">
        <div class="table-toolbar">
          <div class="search-input-wrap">
            <i class="ph ph-magnifying-glass search-icon"></i>
            <input 
              type="text" 
              [ngModel]="searchQuery()" 
              (ngModelChange)="searchQuery.set($event)" 
              placeholder="Search dashboards by name or module..." 
              class="search-input" />
          </div>

          <div class="module-filter-tabs">
            <button class="filter-tab" [class.active]="selectedModule() === 'All'" (click)="selectedModule.set('All')">All</button>
            <button class="filter-tab" [class.active]="selectedModule() === 'IST'" (click)="selectedModule.set('IST')">IST</button>
            <button class="filter-tab" [class.active]="selectedModule() === 'EAP'" (click)="selectedModule.set('EAP')">EAP</button>
            <button class="filter-tab" [class.active]="selectedModule() === 'Grants'" (click)="selectedModule.set('Grants')">Grants</button>
            <button class="filter-tab" [class.active]="selectedModule() === 'Executive'" (click)="selectedModule.set('Executive')">Executive</button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>DASHBOARD ID</th>
                <th>DASHBOARD NAME</th>
                <th>MODULE</th>
                <th>CATEGORY</th>
                <th>TYPE</th>
                <th>STATUS</th>
                <th>REPORTS</th>
                <th>LAST SYNC</th>
                <th class="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              @for (item of filteredDashboards(); track item.id) {
                <tr>
                  <td class="font-mono">{{ item.id }}</td>
                  <td class="font-bold text-slate-100">{{ item.name }}</td>
                  <td>
                    <span class="module-badge" [ngClass]="getModuleBadgeClass(item.module)">{{ item.module }}</span>
                  </td>
                  <td class="text-slate-300">{{ item.category }}</td>
                  <td>
                    <span class="type-pill">{{ item.type }}</span>
                  </td>
                  <td>
                    <span class="status-badge" [class.status-active]="item.status === 'Active'">{{ item.status }}</span>
                  </td>
                  <td class="font-mono text-slate-300">{{ item.reportCount }}</td>
                  <td class="text-slate-400 text-xs">{{ item.lastUpdated }}</td>
                  <td class="text-center">
                    <button class="btn-action-view" (click)="viewDashboard(item)" title="Launch Dashboard">
                      <i class="ph ph-arrow-square-out text-lg"></i>
                    </button>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="9" class="text-center py-8 text-slate-400">No analytics dashboards found matching criteria.</td>
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
    .analytics-tag { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
    h2 { margin: 0.3rem 0 0.2rem 0; font-size: 1.5rem; color: #f8fafc; font-weight: 700; }
    .subtitle { margin: 0; font-size: 0.85rem; color: #94a3b8; }
    .header-actions { display: flex; gap: 0.75rem; }
    .btn-sync { background: #2563eb; color: white; border: none; padding: 0.5rem 1.1rem; border-radius: 8px; font-weight: 600; font-size: 0.85rem; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; transition: background 0.2s; }
    .btn-sync:hover { background: #1d4ed8; }
    .btn-sync:disabled { opacity: 0.6; cursor: not-allowed; }
    .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
    .kpi-card { background: #1e293b; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.25rem; display: flex; align-items: flex-start; gap: 1rem; }
    .kpi-icon-wrap { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .kpi-title { font-size: 0.8rem; color: #94a3b8; font-weight: 500; }
    .kpi-value { font-size: 1.6rem; font-weight: 700; color: #f8fafc; margin: 0.2rem 0; }
    .kpi-trend { font-size: 0.75rem; }
    .kpi-trend.positive { color: #34d399; }
    .card-box { background: #1e293b; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.25rem; }
    .table-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem; }
    .search-input-wrap { position: relative; width: 320px; max-width: 100%; }
    .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #64748b; font-size: 1rem; }
    .search-input { width: 100%; background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; padding: 0.5rem 0.75rem 0.5rem 2.2rem; color: #f8fafc; font-size: 0.85rem; }
    .search-input:focus { outline: none; border-color: #3b82f6; }
    .module-filter-tabs { display: flex; background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 2px; }
    .filter-tab { background: transparent; border: none; color: #94a3b8; padding: 0.35rem 0.8rem; font-size: 0.8rem; border-radius: 6px; cursor: pointer; font-weight: 500; }
    .filter-tab.active { background: #3b82f6; color: white; }
    .table-responsive { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem; }
    .data-table th { background: rgba(15, 23, 42, 0.6); padding: 0.75rem 1rem; color: #94a3b8; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.03em; }
    .data-table td { padding: 0.75rem 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1; }
    .font-mono { font-family: monospace; color: #60a5fa; font-weight: 600; }
    .font-bold { font-weight: 600; }
    .module-badge { padding: 0.2rem 0.55rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
    .badge-ist { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
    .badge-eap { background: rgba(139, 92, 246, 0.15); color: #a78bfa; }
    .badge-grants { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    .badge-exec { background: rgba(16, 185, 129, 0.15); color: #34d399; }
    .type-pill { background: rgba(255, 255, 255, 0.06); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; color: #cbd5e1; }
    .status-badge { padding: 0.2rem 0.55rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; background: rgba(148, 163, 184, 0.15); color: #94a3b8; }
    .status-badge.status-active { background: rgba(16, 185, 129, 0.15); color: #34d399; }
    .btn-action-view { background: transparent; border: none; color: #94a3b8; cursor: pointer; padding: 0.3rem; border-radius: 6px; transition: color 0.2s; }
    .btn-action-view:hover { color: #60a5fa; }
  `]
})
export class AnalyticsComponent implements OnInit {
  private analyticsService = inject(AdminAnalyticsService);

  public searchQuery = signal<string>('');
  public selectedModule = signal<string>('All');
  public isSyncing = signal<boolean>(false);

  public dashboards = signal<AnalyticsDashboardItem[]>([
    {
      id: 'DASH-IST-01',
      name: 'IST Clinical Milestones & Patient Enrollment',
      module: 'IST',
      category: 'Clinical Operations',
      type: 'Interactive Visual',
      status: 'Active',
      lastUpdated: '03-Sep-2026 11:45',
      reportCount: 6
    },
    {
      id: 'DASH-IST-02',
      name: 'IST Financial Burn & Site Budget Utilization',
      module: 'IST',
      category: 'Financial Planning',
      type: 'Pivot Grid & Chart',
      status: 'Active',
      lastUpdated: '02-Sep-2026 16:20',
      reportCount: 4
    },
    {
      id: 'DASH-EAP-01',
      name: 'Expanded Access Patient Approvals & Drug Supply',
      module: 'EAP',
      category: 'Regulatory Affairs',
      type: 'KPI Gauge',
      status: 'Active',
      lastUpdated: '01-Sep-2026 09:10',
      reportCount: 5
    },
    {
      id: 'DASH-GRT-01',
      name: 'Grants Allocation, CME & Sponsorship Tracker',
      module: 'Grants',
      category: 'Funding & Grants',
      type: 'Executive Summary',
      status: 'Active',
      lastUpdated: '28-Aug-2026 14:00',
      reportCount: 8
    },
    {
      id: 'DASH-EXEC-01',
      name: 'Cross-Program Executive Leadership Cockpit',
      module: 'Executive',
      category: 'Enterprise Oversight',
      type: 'Multi-Tab Board',
      status: 'Active',
      lastUpdated: '03-Sep-2026 08:30',
      reportCount: 12
    }
  ]);

  public filteredDashboards = computed(() => {
    const list = this.dashboards();
    const selMod = this.selectedModule();
    const q = this.searchQuery().toLowerCase().trim();

    return list.filter(d => {
      if (selMod !== 'All' && d.module.toUpperCase() !== selMod.toUpperCase()) {
        return false;
      }
      if (q) {
        return d.name.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.category.toLowerCase().includes(q);
      }
      return true;
    });
  });

  ngOnInit(): void {
    this.loadDashboards();
  }

  loadDashboards(): void {
    this.analyticsService.getDashboardsDetails({}).subscribe({
      next: (res: any) => {
        const list = res?.Data || (Array.isArray(res) ? res : null);
        if (list && list.length > 0) {
          const mapped = list.map((d: any) => ({
            id: d.ID || d.DashboardId || `DASH-${d.ModuleCode || '01'}`,
            name: d.NAME || d.DashboardName || 'Analytics Dashboard',
            module: d.MODULE_NAME || d.ModuleCode || 'IST',
            category: d.CATEGORY || 'General Operations',
            type: d.DASHBOARD_TYPE || 'Interactive Visual',
            status: d.STATUS === 1 || d.Status === 'Active' ? 'Active' : 'Draft',
            lastUpdated: d.LAST_SYNC_DATE || 'Today',
            reportCount: d.REPORT_COUNT || 5
          }));
          this.dashboards.set(mapped);
        }
      },
      error: (err) => console.warn('getDashboardsDetails fallback:', err)
    });
  }

  syncDashboards(): void {
    this.isSyncing.set(true);
    const orgData: OrgDashboardDetails = {
      OrgId: localStorage.getItem('id') || '1',
      OrgName: localStorage.getItem('orgCode') || 'scimax',
      IST: true,
      EAP: true,
      GRANTS: true,
      IS_ORG_ACCOUNT_IN_LOGI: true
    };
    this.analyticsService.postOrgDetails(orgData).subscribe({
      next: (res) => {
        this.isSyncing.set(false);
        console.log('Dashboards synchronized successfully:', res);
        this.loadDashboards();
      },
      error: (err) => {
        this.isSyncing.set(false);
        console.warn('SyncDashboards fallback:', err);
      }
    });
  }

  getModuleBadgeClass(module: string): string {
    const m = (module || '').toUpperCase();
    if (m.includes('IST')) return 'badge-ist';
    if (m.includes('EAP')) return 'badge-eap';
    if (m.includes('GRANT')) return 'badge-grants';
    return 'badge-exec';
  }

  viewDashboard(item: AnalyticsDashboardItem): void {
    console.log('Opening dashboard:', item.name);
  }
}
