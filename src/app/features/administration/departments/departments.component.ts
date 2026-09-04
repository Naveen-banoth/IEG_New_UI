import { Component, OnInit, inject, signal, computed } from '@angular/core';
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
  private userMgmtService = inject(AdminUserManagementService);

  public searchExpanded = signal<boolean>(false);
  public searchKeyword = signal<string>('');
  public filterStatus = signal<string>('');
  public isLoading = signal<boolean>(false);
  public isSaving = signal<boolean>(false);

  public showModal = signal<boolean>(false);
  public isEditMode = signal<boolean>(false);
  public activeActionMenuId = signal<string | null>(null);

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

  public departmentsList = signal<DepartmentItem[]>([
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
  ]);

  public currentPage = signal<number>(1);
  public pageSize = signal<number>(10);

  public filteredDepartments = computed(() => {
    const keyword = this.searchKeyword().toLowerCase().trim();
    const status = this.filterStatus();

    return this.departmentsList().filter(d => {
      const matchKey = !keyword || 
        d.name.toLowerCase().includes(keyword) ||
        d.associatedDepartment.toLowerCase().includes(keyword);
      const matchStatus = !status || (status === 'Active' ? d.active : !d.active);
      return matchKey && matchStatus;
    });
  });

  public paginatedDepartments = computed(() => {
    const page = this.currentPage();
    const size = this.pageSize();
    const start = (page - 1) * size;
    return this.filteredDepartments().slice(start, start + size);
  });

  public totalPages = computed(() => {
    return Math.ceil(this.filteredDepartments().length / this.pageSize()) || 1;
  });

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoading.set(true);
    const payload = {
      CODE: '',
      NAME: this.searchKeyword() || '',
      STATUS: this.filterStatus() === 'Active' ? '1' : this.filterStatus() === 'Inactive' ? '0' : '-1'
    };

    this.userMgmtService.getDeptAdvSearch(payload).subscribe({
      next: (res: any) => {
        this.isLoading.set(false);
        const records = Array.isArray(res) ? res : (res?.Data && Array.isArray(res.Data) ? res.Data : []);
        if (records.length > 0) {
          const mapped = records.map((d: any, idx: number) => ({
            id: d.DEPARTMENT_ID || d.ID || `DEP-${idx + 1}`,
            name: d.NAME || d.DEPARTMENT_NAME || '',
            associatedDepartment: d.PARENTNAME || d.PARENT_NAME || d.PARENT_ID || '',
            active: d.STATUS === '1' || d.STATUS === 1 || d.RECORD_STATE === 1 || d.RecordStatus === 'Active' || d.active === true,
            raw: d
          }));
          this.departmentsList.set(mapped);
        }
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  openAddModal(): void {
    this.isEditMode.set(false);
    this.deptForm = {
      id: 'DEP-' + (this.departmentsList().length + 1),
      name: '',
      associatedDepartment: '',
      active: true
    };
    this.showModal.set(true);
  }

  openEditModal(dept: DepartmentItem): void {
    this.isEditMode.set(true);
    this.deptForm = { ...dept };
    this.showModal.set(true);
    this.activeActionMenuId.set(null);
  }

  saveDepartment(): void {
    if (!this.deptForm.name) return;

    this.isSaving.set(true);
    const raw = this.deptForm.raw || {};
    const isEdit = this.isEditMode();
    const payload = {
      ...raw,
      ID: isEdit && this.deptForm.id && !this.deptForm.id.startsWith('DEP-') ? this.deptForm.id : (raw.ID || ''),
      NAME: this.deptForm.name,
      CODE: this.deptForm.code || (raw.CODE || ''),
      PARENT_ID: this.deptForm.associatedDepartment || (raw.PARENT_ID || ''),
      RECORD_STATE: this.deptForm.active ? 1 : 0,
      STATUS: this.deptForm.active ? '1' : '0'
    };

    if (isEdit) {
      this.userMgmtService.updateDepartment(payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.showModal.set(false);
          this.loadDepartments();
        },
        error: () => {
          this.isSaving.set(false);
          const list = [...this.departmentsList()];
          const idx = list.findIndex(d => d.id === this.deptForm.id);
          if (idx !== -1) {
            list[idx] = { ...this.deptForm };
            this.departmentsList.set(list);
          }
          this.showModal.set(false);
        }
      });
    } else {
      this.userMgmtService.insertDepartment(payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.showModal.set(false);
          this.loadDepartments();
        },
        error: () => {
          this.isSaving.set(false);
          this.departmentsList.update(list => [{ ...this.deptForm }, ...list]);
          this.showModal.set(false);
        }
      });
    }
  }

  deleteDepartment(deptId: string): void {
    const rawDept = this.departmentsList().find(d => d.id === deptId);
    const apiId = rawDept?.raw?.DEPARTMENT_ID || rawDept?.raw?.ID || deptId;

    this.departmentsList.update(list => list.filter(d => d.id !== deptId));
    this.userMgmtService.deleteDepartment(apiId).subscribe({
      next: () => {},
      error: () => {}
    });
    this.activeActionMenuId.set(null);
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
    this.activeActionMenuId.set(null);
  }

  toggleActionMenu(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.activeActionMenuId.set(this.activeActionMenuId() === id ? null : id);
  }
}
