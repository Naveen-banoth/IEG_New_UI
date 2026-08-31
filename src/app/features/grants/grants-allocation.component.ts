import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grants-allocation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="screen-container">
      <div class="screen-header">
        <div>
          <span class="module-tag grants-tag">Module: Grants</span>
          <h2>Grant Application Allocations</h2>
          <p class="subtitle">Screen Permission: Grant Allocations (grants-allocation). Evaluated proposals & funding distribution.</p>
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
  `]
})
export class GrantsAllocationComponent {}
