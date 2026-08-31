import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuperAdminTestRunnerService, AdminTestRunnerService } from './TestServices';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'IEGClientApp';

  constructor(
    private superAdminTestRunner: SuperAdminTestRunnerService,
    private adminTestRunner: AdminTestRunnerService
  ) {}
}

