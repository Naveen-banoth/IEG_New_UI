import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface TrialApplication {
  title: string;
  appId: string;
  type: string;
  physicianName: string;
  owner: string;
  product: string;
  studyType: string;
  submittedOn: string;
}

@Component({
  selector: 'app-ist-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ist-dashboard.component.html',
  styleUrl: './ist-dashboard.component.css'
})
export class IstDashboardComponent {
  public isSearchOpen = true;
  public activeTab = 'Active';

  public filterAppId = '';
  public filterAppType = 'All';
  public filterPhysician = '';
  public filterTherapeuticArea = 'All';
  public filterRequestType = 'All';
  public filterProduct = 'Select';
  public filterStudyType = 'Select';
  public filterOwner = '';
  public filterStatus = 'All';
  public filterFromDate = '';
  public filterToDate = '';

  public applications: TrialApplication[] = [
    {
      title: 'Systematic Review of Oncology Outcomes',
      appId: 'DEMO-2026-008',
      type: 'IST',
      physicianName: 'Dr. Amelia Smith',
      owner: 'Oncology Research Group',
      product: 'Product Alpha',
      studyType: 'Systematic Review',
      submittedOn: '14-Jul-2026'
    },
    {
      title: 'Cardiology Observational Study – Phase 2',
      appId: 'IST-8842',
      type: 'IST',
      physicianName: 'Dr. Amelia Smith',
      owner: 'Cardiovascular Institute',
      product: 'Product Beta',
      studyType: 'Observational',
      submittedOn: '12-Jul-2026'
    },
    {
      title: 'Hematology Phase 3 Extension Trial',
      appId: 'IST-8843',
      type: 'IST',
      physicianName: 'Dr. Amanda Foster',
      owner: 'Hematology Research Co',
      product: 'HemaCure XL',
      studyType: 'Interventional',
      submittedOn: '09-Jul-2026'
    },
    {
      title: 'Pulmonary Fibrosis Real-World Evidence Study',
      appId: 'IST-8845',
      type: 'IST',
      physicianName: 'Dr. Michael Torres',
      owner: 'Pulmonary Medicine Dep',
      product: 'FibroClear',
      studyType: 'Observational',
      submittedOn: '01-Jul-2026'
    },
    {
      title: 'Diabetes Device Safety Registry',
      appId: 'IST-8846',
      type: 'IST',
      physicianName: 'Dr. Sarah Mitchell',
      owner: 'Endocrine Research Unit',
      product: 'GlucoSense Pro',
      studyType: 'Registry',
      submittedOn: '29-Jun-2026'
    },
    {
      title: 'Pediatric Epilepsy Longitudinal Cohort',
      appId: 'IST-8848',
      type: 'IST',
      physicianName: 'Dr. Robert Kim',
      owner: 'Neuroscience Division',
      product: 'NeuroRelief',
      studyType: 'Observational',
      submittedOn: '22-Jun-2026'
    },
    {
      title: 'Immunotherapy Biomarker Registry',
      appId: 'IST-8851',
      type: 'IST',
      physicianName: 'Dr. Amelia Smith',
      owner: 'Dermatology Clinical Trial',
      product: 'Product Delta',
      studyType: 'Observational',
      submittedOn: '28-Jun-2026'
    }
  ];

  public get filteredApplications(): TrialApplication[] {
    return this.applications.filter(app => {
      if (this.filterAppId && !app.appId.toLowerCase().includes(this.filterAppId.toLowerCase())) return false;
      if (this.filterPhysician && !app.physicianName.toLowerCase().includes(this.filterPhysician.toLowerCase())) return false;
      if (this.filterOwner && !app.owner.toLowerCase().includes(this.filterOwner.toLowerCase())) return false;
      if (this.filterAppType !== 'All' && app.type !== this.filterAppType) return false;
      if (this.filterProduct !== 'Select' && app.product !== this.filterProduct) return false;
      if (this.filterStudyType !== 'Select' && app.studyType !== this.filterStudyType) return false;
      return true;
    });
  }

  applySearch(): void {
    console.log('Search criteria applied!');
  }

  clearSearch(): void {
    this.filterAppId = '';
    this.filterAppType = 'All';
    this.filterPhysician = '';
    this.filterTherapeuticArea = 'All';
    this.filterRequestType = 'All';
    this.filterProduct = 'Select';
    this.filterStudyType = 'Select';
    this.filterOwner = '';
    this.filterStatus = 'All';
    this.filterFromDate = '';
    this.filterToDate = '';
  }

  viewAll(): void {
    this.clearSearch();
  }
}
