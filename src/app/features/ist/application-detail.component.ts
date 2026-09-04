import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { TopUserToolbarComponent } from '../../layout/top-user-toolbar/top-user-toolbar.component';

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, TopUserToolbarComponent],
  templateUrl: './application-detail.component.html',
  styleUrl: './application-detail.component.css'
})
export class ApplicationDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public appId = signal<string>('DEMO-2026-008');
  public applicationTitle = signal<string>('Systematic Review of Oncology Outcomes');
  public currentStep = signal<number>(2); // Default to step 2 (Study Team)

  public steps = [
    { id: 1, name: 'General Information', path: 'general' },
    { id: 2, name: 'Study Team', path: 'study-team' },
    { id: 3, name: 'Organization Setup', path: 'org-setup' },
    { id: 4, name: 'Institutional Review Board', path: 'irb' },
    { id: 5, name: 'Concept Proposal', path: 'concept-proposal' }
  ];

  private sub = new Subscription();

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.appId.set(routeId);
    }

    this.sub.add(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
        this.syncCurrentStepFromUrl();
      })
    );

    this.syncCurrentStepFromUrl();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private syncCurrentStepFromUrl(): void {
    const currentUrl = this.router.url;
    for (const step of this.steps) {
      if (currentUrl.includes(step.path)) {
        this.currentStep.set(step.id);
        break;
      }
    }
  }

  selectStep(stepId: number): void {
    this.currentStep.set(stepId);
    const targetStep = this.steps.find(s => s.id === stepId);
    if (targetStep) {
      this.router.navigate(['/ist/detail', this.appId(), targetStep.path]);
    }
  }

  nextStep(): void {
    if (this.currentStep() < 5) {
      this.selectStep(this.currentStep() + 1);
    } else {
      this.goBack();
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.selectStep(this.currentStep() - 1);
    }
  }

  goBack(): void {
    this.router.navigate(['/ist']);
  }
}
