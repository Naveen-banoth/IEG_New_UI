import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eap-applications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="screen-container">
      <div class="screen-header">
        <div>
          <span class="module-tag eap-tag">Module: EAP</span>
          <h2>Enterprise Software Application Inventory</h2>
          <p class="subtitle">Screen Permission: App Inventory (eap-applications). Catalog of all registered software assets.</p>
        </div>
      </div>

      <div class="card-box">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Application Name</th>
                <th>Domain</th>
                <th>Technology Stack</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-mono">APP-EAP-001</td>
                <td class="font-bold">Grant Disbursement Gateway</td>
                <td>Finance & Grants</td>
                <td>Angular 22 / .NET 9 Web API</td>
                <td><span class="badge active">Strategic Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .screen-container { display: flex; flex-direction: column; gap: 1.5rem; }
    .screen-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .module-tag { font-size: 0.7rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 999px; text-transform: uppercase; }
    .eap-tag { background: rgba(139, 92, 246, 0.15); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.3); }
    h2 { margin: 0.3rem 0 0.2rem 0; font-size: 1.5rem; color: #f8fafc; }
    .subtitle { margin: 0; font-size: 0.85rem; color: #94a3b8; }
    .card-box { background: #1e293b; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.25rem; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem; }
    .data-table th { background: rgba(15, 23, 42, 0.5); padding: 0.75rem 1rem; color: #94a3b8; font-weight: 600; }
    .data-table td { padding: 0.75rem 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: #cbd5e1; }
    .font-mono { font-family: monospace; color: #a78bfa; }
    .font-bold { font-weight: 600; color: #f8fafc; }
    .badge { padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
    .badge.active { background: rgba(16, 185, 129, 0.15); color: #34d399; }
  `]
})
export class EapApplicationsComponent {}
