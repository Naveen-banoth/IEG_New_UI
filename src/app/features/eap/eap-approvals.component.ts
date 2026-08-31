import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eap-approvals',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="screen-container">
      <div class="screen-header">
        <div>
          <span class="module-tag eap-tag">Module: EAP</span>
          <h2>Architecture Review Board (ARB) Approvals</h2>
          <p class="subtitle">Screen Permission: ARB Approvals (eap-approvals). Architecture change governance workflow.</p>
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
  `]
})
export class EapApprovalsComponent {}
