import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminUserManagementService } from '../../../TestServices/Administration/admin-user-management.service';
import { UserRoleItem } from '../../../core/models/administration.model';

export { UserRoleItem };


import { TopUserToolbarComponent } from '../../../layout/top-user-toolbar/top-user-toolbar.component';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TopUserToolbarComponent],
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.scss'
})
export class UserRolesComponent implements OnInit {
  public searchExpanded = false;
  public searchKeyword = '';
  public filterStatus = '';
  public isLoading = false;
  public isSaving = false;

  public isCreatingOrEditing = false;
  public isEditMode = false;
  public activeActionMenuId: string | null = null;
  public activeSidebarTab: 'details' | 'general' | 'ist' | 'eap' | 'grants' | 'analytics' = 'details';

  public roleForm: UserRoleItem = this.getEmptyRoleForm();

  public rolesList: UserRoleItem[] = [
    {
      id: 'ROLE-1',
      name: 'ANALYTICS 123',
      description: 'Analytics team reporting and telemetry dashboards.',
      active: true,
      modulePermissions: this.getDefaultPermissions(true, false, false, false, true)
    },
    {
      id: 'ROLE-2',
      name: 'all',
      description: 'Global access across all modules.',
      active: true,
      modulePermissions: this.getDefaultPermissions(true, true, true, true, true)
    },
    {
      id: 'ROLE-3',
      name: 'IST & GRANTS Co Owner Privilege',
      description: 'Co-ownership and approval privileges for IST and Grants.',
      active: true,
      modulePermissions: this.getDefaultPermissions(true, true, false, true, false)
    },
    {
      id: 'ROLE-4',
      name: 'IST & Grants Reviewer privilege',
      description: 'Reviewer and scoring permissions for IST & Grants.',
      active: true,
      modulePermissions: this.getDefaultPermissions(true, true, false, true, false)
    },
    {
      id: 'ROLE-5',
      name: 'Inactive All in one except analytics',
      description: 'Deactivated legacy role preset.',
      active: false,
      modulePermissions: this.getDefaultPermissions(false, false, false, false, true)
    },
    {
      id: 'ROLE-6',
      name: 'IST & Grants change ownership',
      description: 'Ability to transfer ownership of research applications.',
      active: true,
      modulePermissions: this.getDefaultPermissions(true, true, false, true, false)
    },
    {
      id: 'ROLE-7',
      name: 'Analytics',
      description: 'Read-only access to portal metrics and charts.',
      active: true,
      modulePermissions: this.getDefaultPermissions(true, false, false, false, true)
    },
    {
      id: 'ROLE-8',
      name: 'Super Admin',
      description: 'Full un-restricted administrative access across entire portal.',
      active: true,
      modulePermissions: this.getDefaultPermissions(true, true, true, true, true)
    },
    {
      id: 'ROLE-9',
      name: 'IST Department Lead',
      description: 'Lead reviewer for Investigator Sponsored Trials.',
      active: true,
      modulePermissions: this.getDefaultPermissions(true, true, false, false, false)
    },
    {
      id: 'ROLE-10',
      name: 'EAP Specialist',
      description: 'Expanded Access Program approvals and case tracking.',
      active: true,
      modulePermissions: this.getDefaultPermissions(true, false, true, false, false)
    }
  ];

  public currentPage = 1;
  public pageSize = 10;

  constructor(private userMgmtService: AdminUserManagementService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.isLoading = true;
    const payload = {
      ROLE_NAME: this.searchKeyword || '',
      STATUS: this.filterStatus === 'Active' ? '1' : this.filterStatus === 'Inactive' ? '0' : '-1'
    };

    this.userMgmtService.getRoleAdvSearch(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        const records = Array.isArray(res) ? res : (res?.Data && Array.isArray(res.Data) ? res.Data : []);
        if (records.length > 0) {
          this.rolesList = records.map((r: any, idx: number) => ({
            id: r.ROLEID || r.ID || r.Role_ID || `ROLE-${idx + 1}`,
            name: r.ROLE_NAME || r.Role_Name || r.NAME || '',
            description: r.DESCRIPTION || r.Description || '',
            active: r.STATUS === '1' || r.STATUS === 1 || r.RECORD_STATE === 1 || r.status === 'Active' || r.active === true,
            modulePermissions: this.getDefaultPermissions(true, true, true, true, true),
            raw: r
          }));
        }
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getEmptyRoleForm(): UserRoleItem {
    return {
      id: '',
      name: '',
      description: '',
      active: true,
      modulePermissions: this.getDefaultPermissions(false, false, false, false, false)
    };
  }

  getDefaultPermissions(gen: boolean, ist: boolean, eap: boolean, grants: boolean, analytics: boolean) {
    return {
      general: [
        { name: 'View Administration Portal', enabled: gen, code: 'ADM_VIEW' },
        { name: 'Manage Core Settings', enabled: gen, code: 'ADM_SETTINGS' },
        { name: 'Manage Email Configurations', enabled: gen, code: 'ADM_EMAIL' },
        { name: 'Manage User Accounts', enabled: gen, code: 'ADM_USERS' },
        { name: 'Manage User Roles & Permissions', enabled: gen, code: 'ADM_ROLES' },
        { name: 'Manage Departments & Organization Units', enabled: gen, code: 'ADM_DEPTS' },
        { name: 'View Audit Logs & System Activity', enabled: gen, code: 'ADM_AUDIT' },
        { name: 'Configure Security & Authentication Policies', enabled: gen, code: 'ADM_SECURITY' }
      ],
      ist: [
        { name: 'Access IST Dashboard & Metrics', enabled: ist, code: 'IST_DASH' },
        { name: 'View All IST Research Applications', enabled: ist, code: 'IST_VIEW' },
        { name: 'Create & Submit New IST Proposals', enabled: ist, code: 'IST_CREATE' },
        { name: 'Edit IST Proposal Information', enabled: ist, code: 'IST_EDIT' },
        { name: 'Approve / Reject IST Application Stage', enabled: ist, code: 'IST_APPROVE' },
        { name: 'Assign Scientific Reviewers', enabled: ist, code: 'IST_ASSIGN' },
        { name: 'Manage Budget & Milestone Schedules', enabled: ist, code: 'IST_BUDGET' },
        { name: 'Export Clinical Trial Data & Reports', enabled: ist, code: 'IST_EXPORT' }
      ],
      eap: [
        { name: 'Access EAP Dashboard', enabled: eap, code: 'EAP_DASH' },
        { name: 'View EAP Applications & Patient Cohorts', enabled: eap, code: 'EAP_VIEW' },
        { name: 'Submit Expanded Access Requests', enabled: eap, code: 'EAP_CREATE' },
        { name: 'ARB (Architecture/Access Review Board) Approvals', enabled: eap, code: 'EAP_ARB' },
        { name: 'Manage Compassionate Use Documentation', enabled: eap, code: 'EAP_DOCS' },
        { name: 'Regulatory Reporting & Safety Filing', enabled: eap, code: 'EAP_REG' }
      ],
      grants: [
        { name: 'Access Grants Dashboard & Funding Overview', enabled: grants, code: 'GRN_DASH' },
        { name: 'View Grant Allocation Matrix', enabled: grants, code: 'GRN_VIEW' },
        { name: 'Score & Evaluate Funding Proposals', enabled: grants, code: 'GRN_SCORE' },
        { name: 'Approve Grant Disbursements', enabled: grants, code: 'GRN_APPROVE' },
        { name: 'Manage Charitable & Sponsorship Workflows', enabled: grants, code: 'GRN_WORKFLOW' },
        { name: 'Manage Multi-Year Fiscal Ledgers', enabled: grants, code: 'GRN_LEDGER' }
      ],
      analytics: [
        { name: 'View Executive Business Dashboards', enabled: analytics, code: 'ANL_DASH' },
        { name: 'Generate Cross-Program Analytics Reports', enabled: analytics, code: 'ANL_REPORTS' },
        { name: 'Export Raw Data Warehousing Feeds', enabled: analytics, code: 'ANL_EXPORT' }
      ]
    };
  }

  get filteredRoles(): UserRoleItem[] {
    return this.rolesList.filter(r => {
      const matchKey = !this.searchKeyword || r.name.toLowerCase().includes(this.searchKeyword.toLowerCase());
      const matchStatus = !this.filterStatus || (this.filterStatus === 'Active' ? r.active : !r.active);
      return matchKey && matchStatus;
    });
  }

  get paginatedRoles(): UserRoleItem[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredRoles.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredRoles.length / this.pageSize) || 1;
  }

  getEnabledCount(items: { name: string; enabled: boolean }[]): number {
    if (!items) return 0;
    return items.filter(i => i.enabled).length;
  }

  openCreateRole(): void {
    this.isEditMode = false;
    this.roleForm = {
      id: 'ROLE-' + (this.rolesList.length + 1),
      name: '',
      description: '',
      active: true,
      modulePermissions: this.getDefaultPermissions(false, false, false, false, false)
    };
    this.activeSidebarTab = 'details';
    this.isCreatingOrEditing = true;
  }

  openEditRole(role: UserRoleItem): void {
    this.isEditMode = true;
    this.roleForm = JSON.parse(JSON.stringify(role));
    this.activeSidebarTab = 'details';
    this.isCreatingOrEditing = true;
    this.activeActionMenuId = null;

    if (role.id && !role.id.startsWith('ROLE-')) {
      this.userMgmtService.getRolePrivileges(role.id).subscribe({
        next: () => {},
        error: () => {}
      });
    }
  }

  saveRole(): void {
    if (!this.roleForm.name) return;

    this.isSaving = true;
    const raw = this.roleForm.raw || {};
    const payload = {
      ...raw,
      ID: this.isEditMode && this.roleForm.id && !this.roleForm.id.startsWith('ROLE-') ? this.roleForm.id : (raw.ID || ''),
      Role_ID: this.isEditMode && this.roleForm.id && !this.roleForm.id.startsWith('ROLE-') ? this.roleForm.id : (raw.Role_ID || ''),
      Role_Name: this.roleForm.name,
      NAME: this.roleForm.name,
      DESCRIPTION: this.roleForm.description || '',
      RECORD_STATE: this.roleForm.active ? 1 : 0,
      STATUS: this.roleForm.active ? '1' : '0'
    };

    if (this.isEditMode) {
      this.userMgmtService.updateRole(payload).subscribe({
        next: () => {
          this.isSaving = false;
          this.isCreatingOrEditing = false;
          this.loadRoles();
        },
        error: () => {
          this.isSaving = false;
          const idx = this.rolesList.findIndex(r => r.id === this.roleForm.id);
          if (idx !== -1) {
            this.rolesList[idx] = JSON.parse(JSON.stringify(this.roleForm));
          }
          this.isCreatingOrEditing = false;
        }
      });
    } else {
      this.userMgmtService.insertRole(payload).subscribe({
        next: () => {
          this.isSaving = false;
          this.isCreatingOrEditing = false;
          this.loadRoles();
        },
        error: () => {
          this.isSaving = false;
          this.rolesList.unshift(JSON.parse(JSON.stringify(this.roleForm)));
          this.isCreatingOrEditing = false;
        }
      });
    }
  }

  cancelEdit(): void {
    this.isCreatingOrEditing = false;
  }

  deleteRole(roleId: string): void {
    const rawRole = this.rolesList.find(r => r.id === roleId);
    const apiId = rawRole?.raw?.ID || rawRole?.raw?.ROLEID || roleId;

    this.rolesList = this.rolesList.filter(r => r.id !== roleId);
    this.userMgmtService.deleteRole(apiId).subscribe({
      next: () => {},
      error: () => {}
    });
    this.activeActionMenuId = null;
  }

  toggleRoleStatus(role: UserRoleItem): void {
    role.active = !role.active;
    const raw = role.raw || {};
    const payload = {
      ...raw,
      ID: role.id && !role.id.startsWith('ROLE-') ? role.id : (raw.ID || ''),
      Role_Name: role.name,
      NAME: role.name,
      RECORD_STATE: role.active ? 1 : 0,
      STATUS: role.active ? '1' : '0'
    };

    this.userMgmtService.updateRole(payload).subscribe({
      next: () => {},
      error: () => {}
    });
    this.activeActionMenuId = null;
  }

  toggleActionMenu(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.activeActionMenuId = this.activeActionMenuId === id ? null : id;
  }

  toggleAllInModule(module: 'general' | 'ist' | 'eap' | 'grants' | 'analytics', enable: boolean): void {
    const list = this.roleForm.modulePermissions[module];
    list.forEach(item => item.enabled = enable);
  }
}


