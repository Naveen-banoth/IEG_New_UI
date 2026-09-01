import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminUserManagementService } from '../../../TestServices/Administration/admin-user-management.service';
import { DepartmentItem } from '../../../core/models/administration.model';

export { DepartmentItem };


import { TopUserToolbarComponent } from '../../../layout/top-user-toolbar/top-user-toolbar.component';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TopUserToolbarComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent implements OnInit {
  public searchExpanded = false;
  public searchKeyword = '';
  public filterStatus = '';
  public isLoading = false;
  public isSaving = false;

  public showModal = false;
  public isEditMode = false;
  public activeActionMenuId: string | null = null;

  public associateOptions: string[] = [
    'Testers',
    'PDM',
    'Developers/Coders',
    'Testing',
    'Program Management',
    'Quality Assurance',
    'Development',
    'Executive Review Board',
    'Clinical Operations',
    'Regulatory Affairs'
  ];

  public deptForm: DepartmentItem = {
    id: '',
    name: '',
    associatedDepartment: '',
    active: true
  };

  public departmentsList: DepartmentItem[] = [
    { id: 'DEP-1', name: 'Medical Affairs', associatedDepartment: 'Testers', active: true },
    { id: 'DEP-2', name: 'Clinical Operations', associatedDepartment: 'PDM', active: true },
    { id: 'DEP-3', name: 'Regulatory Affairs', associatedDepartment: 'Developers/Coders', active: true },
    { id: 'DEP-4', name: 'Pharmacovigilance', associatedDepartment: 'Testing', active: true },
    { id: 'DEP-5', name: 'Grants & Funding', associatedDepartment: 'Program Management', active: false },
    { id: 'DEP-6', name: 'Quality Assurance', associatedDepartment: 'Quality Assurance', active: true },
    { id: 'DEP-7', name: 'Biostatistics', associatedDepartment: 'Development', active: true },
    { id: 'DEP-8', name: 'Program Management', associatedDepartment: 'Executive Review Board', active: true },
    { id: 'DEP-9', name: 'Data Management', associatedDepartment: 'Testers', active: true },
    { id: 'DEP-10', name: 'Legal & Compliance', associatedDepartment: 'Regulatory Affairs', active: true },
    { id: 'DEP-11', name: 'Medical Science Liaisons', associatedDepartment: 'Clinical Operations', active: true }
  ];

  public currentPage = 1;
  public pageSize = 10;

  constructor(private userMgmtService: AdminUserManagementService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoading = true;
    const payload = {
      CODE: '',
      NAME: this.searchKeyword || '',
      STATUS: this.filterStatus === 'Active' ? '1' : this.filterStatus === 'Inactive' ? '0' : '-1'
    };

    this.userMgmtService.getDeptAdvSearch(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        const records = Array.isArray(res) ? res : (res?.Data && Array.isArray(res.Data) ? res.Data : []);
        if (records.length > 0) {
          this.departmentsList = records.map((d: any, idx: number) => ({
            id: d.DEPARTMENT_ID || d.ID || `DEP-${idx + 1}`,
            name: d.NAME || d.DEPARTMENT_NAME || '',
            associatedDepartment: d.PARENTNAME || d.PARENT_NAME || d.PARENT_ID || '',
            active: d.STATUS === '1' || d.STATUS === 1 || d.RECORD_STATE === 1 || d.RecordStatus === 'Active' || d.active === true,
            raw: d
          }));
        }
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  get filteredDepartments(): DepartmentItem[] {
    return this.departmentsList.filter(d => {
      const matchKey = !this.searchKeyword || 
        d.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        d.associatedDepartment.toLowerCase().includes(this.searchKeyword.toLowerCase());
      const matchStatus = !this.filterStatus || (this.filterStatus === 'Active' ? d.active : !d.active);
      return matchKey && matchStatus;
    });
  }

  get paginatedDepartments(): DepartmentItem[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredDepartments.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredDepartments.length / this.pageSize) || 1;
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.deptForm = {
      id: 'DEP-' + (this.departmentsList.length + 1),
      name: '',
      associatedDepartment: '',
      active: true
    };
    this.showModal = true;
  }

  openEditModal(dept: DepartmentItem): void {
    this.isEditMode = true;
    this.deptForm = { ...dept };
    this.showModal = true;
    this.activeActionMenuId = null;
  }

  saveDepartment(): void {
    if (!this.deptForm.name) return;

    this.isSaving = true;
    const raw = this.deptForm.raw || {};
    const payload = {
      ...raw,
      ID: this.isEditMode && this.deptForm.id && !this.deptForm.id.startsWith('DEP-') ? this.deptForm.id : (raw.ID || ''),
      NAME: this.deptForm.name,
      CODE: this.deptForm.code || (raw.CODE || ''),
      PARENT_ID: this.deptForm.associatedDepartment || (raw.PARENT_ID || ''),
      RECORD_STATE: this.deptForm.active ? 1 : 0,
      STATUS: this.deptForm.active ? '1' : '0'
    };

    if (this.isEditMode) {
      this.userMgmtService.updateDepartment(payload).subscribe({
        next: () => {
          this.isSaving = false;
          this.showModal = false;
          this.loadDepartments();
        },
        error: () => {
          this.isSaving = false;
          const idx = this.departmentsList.findIndex(d => d.id === this.deptForm.id);
          if (idx !== -1) {
            this.departmentsList[idx] = { ...this.deptForm };
          }
          this.showModal = false;
        }
      });
    } else {
      this.userMgmtService.insertDepartment(payload).subscribe({
        next: () => {
          this.isSaving = false;
          this.showModal = false;
          this.loadDepartments();
        },
        error: () => {
          this.isSaving = false;
          this.departmentsList.unshift({ ...this.deptForm });
          this.showModal = false;
        }
      });
    }
  }

  deleteDepartment(deptId: string): void {
    const rawDept = this.departmentsList.find(d => d.id === deptId);
    const apiId = rawDept?.raw?.DEPARTMENT_ID || rawDept?.raw?.ID || deptId;

    this.departmentsList = this.departmentsList.filter(d => d.id !== deptId);
    this.userMgmtService.deleteDepartment(apiId).subscribe({
      next: () => {},
      error: () => {}
    });
    this.activeActionMenuId = null;
  }

  toggleDeptStatus(dept: DepartmentItem): void {
    dept.active = !dept.active;
    const raw = dept.raw || {};
    const payload = {
      ...raw,
      ID: dept.id && !dept.id.startsWith('DEP-') ? dept.id : (raw.ID || ''),
      NAME: dept.name,
      RECORD_STATE: dept.active ? 1 : 0,
      STATUS: dept.active ? '1' : '0'
    };

    this.userMgmtService.updateDepartment(payload).subscribe({
      next: () => {},
      error: () => {}
    });
    this.activeActionMenuId = null;
  }

  toggleActionMenu(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.activeActionMenuId = this.activeActionMenuId === id ? null : id;
  }
}


