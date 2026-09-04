import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PermissionService } from '../../core/services/permission.service';
import { LocalDbService } from '../../core/services/local-db.service';
import { PermissionManagerComponent } from '../permission-manager/permission-manager.component';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule, PermissionManagerComponent],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private permissionService = inject(PermissionService);
  private localDb = inject(LocalDbService);

  public deniedModule = signal<string>('');
  public deniedScreen = signal<string>('');
  public showManager = signal<boolean>(false);
  public currentProfile = signal(this.localDb.currentUserProfile);

  constructor() {
    this.route.queryParams.subscribe(params => {
      this.deniedModule.set(params['deniedModule'] || '');
      this.deniedScreen.set(params['deniedScreen'] || '');
    });

    this.localDb.userProfile$.subscribe(p => {
      this.currentProfile.set(p);
    });
  }

  goToFirstAvailableScreen(): void {
    const route = this.permissionService.getFirstAuthorizedRoute();
    this.router.navigateByUrl(route);
  }
}
