import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-top-user-toolbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="top-header-user-toolbar">
      <button class="top-tool-btn" (click)="onOpenDocs()" title="FAQ & Documentation">
        <i class="ph ph-book-open"></i>
      </button>

      <button class="top-tool-btn" (click)="onOpenHelp()" title="Help & Support">
        <i class="ph ph-question"></i>
      </button>

      <div class="top-tool-btn has-badge" title="Notifications" (click)="onNotifications()">
        <i class="ph ph-bell"></i>
        <span class="red-dot"></span>
      </div>

      <div class="top-tool-divider"></div>

      <button class="top-tool-btn btn-logout" (click)="onLogout()" title="Sign Out">
        <i class="ph ph-sign-out"></i>
      </button>
    </div>
  `,
  styles: [`
    .top-header-user-toolbar {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.9);
      padding: 0.3rem 0.65rem;
      border-radius: 9999px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      flex-shrink: 0;
    }

    .top-tool-btn {
      background: none;
      border: none;
      color: #64748b;
      cursor: pointer;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.15rem;
      text-decoration: none;
      transition: all 0.15s ease;
      position: relative;
      padding: 0;
    }

    .top-tool-btn:hover {
      background: #f1f5f9;
      color: #2563eb;
    }

    .top-tool-btn.btn-logout:hover {
      color: #ef4444;
      background: #fef2f2;
    }

    .top-tool-btn i {
      display: block;
      line-height: 1;
    }

    .top-tool-divider {
      width: 1px;
      height: 18px;
      background: #e2e8f0;
      margin: 0 0.15rem;
    }

    .has-badge {
      position: relative;
    }

    .has-badge .red-dot {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 7px;
      height: 7px;
      background: #ef4444;
      border-radius: 50%;
      border: 1.5px solid #ffffff;
    }
  `]
})
export class TopUserToolbarComponent {
  constructor(private authService: AuthService) {}

  onOpenDocs(): void {
    // FAQ & documentation
  }

  onOpenHelp(): void {
    // Help & support
  }

  onNotifications(): void {
    // Notification center
  }

  onLogout(): void {
    this.authService.logout();
  }
}
