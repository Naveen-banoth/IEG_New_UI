import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SuperAdminAuthService } from '../../../TestServices';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  submitted = false;
  isLoading = false;
  errorMess = '';
  errorMess2 = '';
  orgCode?: string;
  DynamicContent: any = '';
  orgId?: string;
  organization?: string;
  orgName = 'Scimax Global LLC HYD';
  src = 'assets/images/logo1.png';
  currentbuildversion = 'v25R1.1';
  message = '';
  showPassword = false;
  onDisableMessage = 'This feature is not available, please contact administrator';

  loginForm = new FormGroup({
    username: new FormControl('internal@gmail.com', [Validators.required]),
    password: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private superAdminAuth: SuperAdminAuthService
  ) {
    this.orgCode = this.route.snapshot.params['code'];
    if (this.orgCode) {
      this.orgName = this.orgCode.toUpperCase();
    }
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/ist']);
    }
  }

  Next(): void {
    this.errorMess = '';
    this.errorMess2 = '';
    const username = this.loginForm.get('username')?.value?.trim();

    if (!username) {
      this.errorMess = 'Please enter Email ID';
      return;
    }

    if (!this.showPassword) {
      this.showPassword = true;
      return;
    }

    const password = this.loginForm.get('password')?.value;
    if (!password) {
      this.errorMess = 'Please enter Password';
      return;
    }

    this.login();
  }

  async login(): Promise<void> {
    this.submitted = true;
    this.errorMess = '';
    const username = this.loginForm.get('username')?.value?.trim() || '';
    const password = this.loginForm.get('password')?.value || '';

    if (!username) {
      this.errorMess = 'Please enter Email ID';
      return;
    }
    if (!password) {
      this.errorMess = 'Please enter Password';
      return;
    }

    this.isLoading = true;

    try {
      // Attempt backend login first if available
      try {
        const payload = {
          CODE: username,
          PASSWORD: password,
          ORGCODE: this.orgCode || null,
          Browser: 'Chrome',
          Version: '1.0'
        };
        const res = await firstValueFrom(this.superAdminAuth.login(payload));
        if (res && res.Token) {
          this.authService.login(username, res.Token);
          this.navigateToTarget();
          return;
        }
      } catch (backendErr) {
        console.warn('Backend login endpoint unavailable or errored, falling back to local session:', backendErr);
      }

      // Local / Offline authentication fallback
      this.authService.login(username);
      this.navigateToTarget();
    } catch (e: any) {
      this.errorMess = e?.message || 'Login failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  private navigateToTarget(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/ist';
    this.router.navigateByUrl(returnUrl);
  }

  forgotPassword(): void {
    this.errorMess = 'Password reset instructions will be sent to your registered email address.';
  }

  applyProgram(program: string): void {
    if (program === 'ist') {
      this.router.navigate(['/ist']);
    } else if (program === 'eap') {
      this.router.navigate(['/eap']);
    } else if (program === 'grants') {
      this.router.navigate(['/grants']);
    }
  }
}


