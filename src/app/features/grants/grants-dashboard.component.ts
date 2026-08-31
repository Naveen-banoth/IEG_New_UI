import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grants-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="screen-container">
      <div class="screen-header">
        <div>
          <span class="module-tag grants-tag">Module: Grants</span>
          <h2>Grants & Financial Assistance Dashboard</h2>
          <p class="subtitle">Screen Permission: Grants Overview (grants-dashboard). Funding program distribution & capital metrics.</p>
        </div>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-title">Total Allocated Capital</div>
          <div class="kpi-value">$14.2M</div>
          <div class="kpi-trend positive">85% of Annual Budget</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .screen-container { display: flex; flex-direction: column; gap: 1.5rem; }
    .screen-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .module-tag { font-size: 0.7rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 999px; text-transform: uppercase; }
    .grants-tag { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
    h2 { margin: 0.3rem 0 0.2rem 0; font-size: 1.5rem; color: #f8fafc; }
    .subtitle { margin: 0; font-size: 0.85rem; color: #94a3b8; }
    .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
    .kpi-card { background: #1e293b; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.25rem; }
    .kpi-title { font-size: 0.8rem; color: #94a3b8; font-weight: 500; }
    .kpi-value { font-size: 1.8rem; font-weight: 700; color: #f8fafc; margin: 0.4rem 0; }
    .kpi-trend.positive { color: #34d399; font-size: 0.75rem; }
  `]
})
export class GrantsDashboardComponent {}
