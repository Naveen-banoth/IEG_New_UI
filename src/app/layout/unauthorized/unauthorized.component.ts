import { Component, inject } from '@angular/core';
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
  public deniedModule = '';
  public deniedScreen = '';
  public showManager = false;
  private localDb = inject(LocalDbService);
  public currentProfile = this.localDb.currentUserProfile;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private permissionService: PermissionService
  ) {
    this.route.queryParams.subscribe(params => {
      this.deniedModule = params['deniedModule'] || '';
      this.deniedScreen = params['deniedScreen'] || '';
    });

    this.localDb.userProfile$.subscribe(p => {
      this.currentProfile = p;
    });
  }

  goToFirstAvailableScreen(): void {
    const route = this.permissionService.getFirstAuthorizedRoute();
    this.router.navigateByUrl(route);
  }
}
