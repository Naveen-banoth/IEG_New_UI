import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminUserManagementService } from '../../../TestServices/Administration/admin-user-management.service';
import { UserItem } from '../../../core/models/administration.model';

export { UserItem };


import { TopUserToolbarComponent } from '../../../layout/top-user-toolbar/top-user-toolbar.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TopUserToolbarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  public searchExpanded = false;
  public searchKeyword = '';
  public filterDepartment = '';
  public filterStatus = '';
  public isLoading = false;
  public isSaving = false;

  public showUserModal = false;
  public isEditMode = false;
  public activeActionMenuId: string | null = null;
  public showDeptDropdown = false;
  public deptSearch = '';

  public allDepartments: string[] = [
    'Development',
    'Developers/Coders',
    'Testing',
    'Program Management',
    'Testers',
    'PDM',
    'Quality Assurance',
    'Medical Affairs',
    'Clinical Operations',
    'Regulatory Affairs',
    'Pharmacovigilance',
    'Grants & Funding',
    'Biostatistics'
  ];

  public authOptions: string[] = [
    'Basic Authentication',
    'Azure Active Directory (SSO)',
    'SAML 2.0 / Okta',
    'OAuth 2.0'
  ];

  public userForm: UserItem = {
    id: '',
    username: '',
    email: '',
    phone: '',
    department: '',
    departments: [],
    role: 'Super Admin',
    authType: 'Basic Authentication',
    active: true
  };

  public usersList: UserItem[] = [
    {
      id: 'USR-1',
      username: 's',
      email: 's@mailinator.com',
      phone: '+1 555-0101',
      department: '—',
      departments: [],
      role: 'Super Admin',
      authType: 'Basic Authentication',
      active: true
    },
    {
      id: 'USR-2',
      username: 'Sai P',
      email: 'saip@kellykode.com',
      phone: '+1 555-0102',
      department: 'Program Management',
      departments: ['Program Management'],
      role: 'IST & GRANTS Co Owner',
      authType: 'Basic Authentication',
      active: true
    },
    {
      id: 'USR-3',
      username: 'Sai',
      email: 'sai@kellykode.com',
      phone: '+1 555-0103',
      department: '—',
      departments: [],
      role: 'Super Admin',
      authType: 'Basic Authentication',
      active: true
    },
    {
      id: 'USR-4',
      username: 'scimaxi7',
      email: 'scimaxi7@kellykode.com',
      phone: '+1 555-0104',
      department: 'Testing',
      departments: ['Testing'],
      role: 'IST & Grants Reviewer',
      authType: 'Basic Authentication',
      active: true
    },
    {
      id: 'USR-5',
      username: 'siva',
      email: 'siva@mailinator.com',
      phone: '+1 555-0105',
      department: '—',
      departments: [],
      role: 'Super Admin',
      authType: 'Basic Authentication',
      active: true
    },
    {
      id: 'USR-6',
      username: 'scimaxii6',
      email: 'scimaxii6@kellykode.com',
      phone: '+1 555-0106',
      department: '—',
      departments: [],
      role: 'Analytics',
      authType: 'Basic Authentication',
      active: false
    },
    {
      id: 'USR-7',
      username: 'scimaxii5',
      email: 'scimaxii5@kellykode.com',
      phone: '+1 555-0107',
      department: '—',
      departments: [],
      role: 'Super Admin',
      authType: 'Basic Authentication',
      active: true
    },
    {
      id: 'USR-8',
      username: 'Alex Morgan',
      email: 'alex.morgan@enterprise.org',
      phone: '+1 555-0108',
      department: 'Quality Assurance',
      departments: ['Quality Assurance'],
      role: 'Super Admin',
      authType: 'Basic Authentication',
      active: true
    },
    {
      id: 'USR-9',
      username: 'Naveen Kumar',
      email: 'internal@mailinator.com',
      phone: '+1 555-0109',
      department: 'Development',
      departments: ['Development', 'Developers/Coders'],
      role: 'Super Admin',
      authType: 'Basic Authentication',
      active: true
    },
    {
      id: 'USR-10',
      username: 'Dr. Sarah Jenkins',
      email: 'sarah.j@kellykode.com',
      phone: '+1 555-0110',
      department: 'Clinical Operations',
      departments: ['Clinical Operations'],
      role: 'IST Department Lead',
      authType: 'Basic Authentication',
      active: true
    },
    {
      id: 'USR-11',
      username: 'Rachel Adams',
      email: 'rachel.adams@kellykode.com',
      phone: '+1 555-0111',
      department: 'Regulatory Affairs',
      departments: ['Regulatory Affairs'],
      role: 'EAP Specialist',
      authType: 'Basic Authentication',
      active: true
    }
  ];

  public currentPage = 1;
  public pageSize = 10;

  constructor(private userMgmtService: AdminUserManagementService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadDropdownData();
  }

  loadUsers(): void {
    this.isLoading = true;
    const payload = {
      CODE: '',
      TITLE: this.searchKeyword || '',
      EMAIL: this.searchKeyword || '',
      DEPARTMENT_ID: this.filterDepartment || '',
      ROLEID: '',
      STATUS: this.filterStatus === 'Active' ? '1' : this.filterStatus === 'Inactive' ? '0' : '-1',
      RECORD_STATE: 101
    };

    this.userMgmtService.getUsersAdvSearch(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        const records = Array.isArray(res) ? res : (res?.Data && Array.isArray(res.Data) ? res.Data : []);
        if (records.length > 0) {
          this.usersList = records.map((u: any, idx: number) => {
            const deptStr = u.DEPARTMENT_NAME || u.DEPARTMENT || (u.DEPARTMENT_ID ? String(u.DEPARTMENT_ID) : '—');
            const deptsArray = deptStr && deptStr !== '—' ? deptStr.split(',').map((d: string) => d.trim()) : [];
            return {
              id: u.USER_ID || u.ID || `USR-${idx + 1}`,
              username: u.USER_NAME || u.TITLE || u.FULLNAME || u.NAME || '',
              email: u.EMAIL || u.EMAIL_ID || '',
              phone: u.PHONE || u.PHONE_NO || '',
              department: deptStr || '—',
              departments: deptsArray,
              role: u.ROLE_NAME || u.ROLE || 'Super Admin',
              roleId: u.ROLEID || u.ROLE_ID,
              authType: u.AUTHTYPE || 'Basic Authentication',
              active: u.STATUS === 1 || u.STATUS === '1' || u.RECORD_STATE === 1 || u.Status === true || u.ACTIVE === true,
              raw: u
            };
          });
        }
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadDropdownData(): void {
    this.userMgmtService.getDepartments().subscribe({
      next: (res: any) => {
        const list = Array.isArray(res) ? res : [];
        if (list.length > 0) {
          const deptNames = list.map((d: any) => d.NAME || d.label || d.Value).filter(Boolean);
          if (deptNames.length > 0) {
            this.allDepartments = Array.from(new Set([...this.allDepartments, ...deptNames]));
          }
        }
      },
      error: () => {}
    });
  }

  get filteredUsers(): UserItem[] {
    return this.usersList.filter(u => {
      const matchKey = !this.searchKeyword || 
        u.username.toLowerCase().includes(this.searchKeyword.toLowerCase()) || 
        u.email.toLowerCase().includes(this.searchKeyword.toLowerCase());
      const matchDept = !this.filterDepartment || u.department.toLowerCase().includes(this.filterDepartment.toLowerCase());
      const matchStatus = !this.filterStatus || (this.filterStatus === 'Active' ? u.active : !u.active);
      return matchKey && matchDept && matchStatus;
    });
  }

  get paginatedUsers(): UserItem[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize) || 1;
  }

  get filteredDepartmentsList(): string[] {
    if (!this.deptSearch) return this.allDepartments;
    return this.allDepartments.filter(d => d.toLowerCase().includes(this.deptSearch.toLowerCase()));
  }

  toggleSearchCriteria(): void {
    this.searchExpanded = !this.searchExpanded;
  }

  clearSearch(): void {
    this.searchKeyword = '';
    this.filterDepartment = '';
    this.filterStatus = '';
    this.loadUsers();
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.userForm = {
      id: 'USR-' + (this.usersList.length + 1),
      username: '',
      email: '',
      phone: '',
      department: 'None',
      departments: [],
      role: 'Super Admin',
      authType: 'Basic Authentication',
      active: true
    };
    this.showDeptDropdown = false;
    this.showUserModal = true;
  }

  openEditModal(user: UserItem): void {
    this.isEditMode = true;
    this.userForm = {
      ...user,
      departments: user.departments.length > 0 ? [...user.departments] : (user.department !== '—' ? [user.department] : [])
    };
    this.showDeptDropdown = false;
    this.showUserModal = true;
    this.activeActionMenuId = null;
  }

  saveUser(): void {
    if (!this.userForm.username || !this.userForm.email) return;

    this.isSaving = true;
    this.userForm.department = this.userForm.departments.length > 0 
      ? this.userForm.departments.join(', ') 
      : '—';

    const raw = this.userForm.raw || {};
    const payload = {
      ...raw,
      ID: this.isEditMode && this.userForm.id && !this.userForm.id.startsWith('USR-') ? this.userForm.id : (raw.ID || ''),
      TITLE: this.userForm.username,
      FIRST_NAME: this.userForm.username,
      EMAIL: this.userForm.email,
      PHONE: this.userForm.phone || '',
      DEPARTMENT_ID: this.userForm.departments.join(','),
      ROLEID: this.userForm.roleId || this.userForm.role,
      AUTHTYPE: this.userForm.authType,
      AUTH_ID: this.userForm.authType,
      Status: this.userForm.active,
      RECORD_STATE: this.userForm.active ? 1 : 0
    };

    if (this.isEditMode) {
      this.userMgmtService.updateUser(payload).subscribe({
        next: () => {
          this.isSaving = false;
          this.showUserModal = false;
          this.loadUsers();
        },
        error: () => {
          this.isSaving = false;
          const idx = this.usersList.findIndex(u => u.id === this.userForm.id);
          if (idx !== -1) {
            this.usersList[idx] = { ...this.userForm };
          }
          this.showUserModal = false;
        }
      });
    } else {
      this.userMgmtService.insertUser(payload).subscribe({
        next: () => {
          this.isSaving = false;
          this.showUserModal = false;
          this.loadUsers();
        },
        error: () => {
          this.isSaving = false;
          this.usersList.unshift({ ...this.userForm });
          this.showUserModal = false;
        }
      });
    }
  }

  deleteUser(userId: string): void {
    const rawUser = this.usersList.find(u => u.id === userId);
    const apiId = rawUser?.raw?.ID || userId;

    this.usersList = this.usersList.filter(u => u.id !== userId);
    this.userMgmtService.deleteUser(apiId).subscribe({
      next: () => {},
      error: () => {}
    });
    this.activeActionMenuId = null;
  }

  toggleUserStatus(user: UserItem): void {
    user.active = !user.active;
    const raw = user.raw || {};
    const payload = {
      ...raw,
      ID: user.id && !user.id.startsWith('USR-') ? user.id : (raw.ID || ''),
      TITLE: user.username,
      EMAIL: user.email,
      Status: user.active,
      RECORD_STATE: user.active ? 1 : 0
    };

    this.userMgmtService.updateUser(payload).subscribe({
      next: () => {},
      error: () => {}
    });
    this.activeActionMenuId = null;
  }

  toggleDeptSelection(dept: string): void {
    const idx = this.userForm.departments.indexOf(dept);
    if (idx === -1) {
      this.userForm.departments.push(dept);
    } else {
      this.userForm.departments.splice(idx, 1);
    }
  }

  isDeptSelected(dept: string): boolean {
    return this.userForm.departments.includes(dept);
  }

  selectAllDepartments(): void {
    if (this.userForm.departments.length === this.allDepartments.length) {
      this.userForm.departments = [];
    } else {
      this.userForm.departments = [...this.allDepartments];
    }
  }

  getDepartmentDisplayText(): string {
    if (!this.userForm.departments || this.userForm.departments.length === 0) {
      return 'None';
    }
    return this.userForm.departments.join(', ');
  }

  toggleActionMenu(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.activeActionMenuId = this.activeActionMenuId === id ? null : id;
  }
}

