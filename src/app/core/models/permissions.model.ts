export enum ModuleCode {
  IST = 'IST',
  EAP = 'EAP',
  GRANTS = 'GRANTS'
}

export enum ScreenCode {
  // IST Screens
  IST_DASHBOARD = 'ist-dashboard',
  IST_PROJECTS = 'ist-projects',
  IST_REPORTS = 'ist-reports',

  // EAP Screens
  EAP_DASHBOARD = 'eap-dashboard',
  EAP_APPLICATIONS = 'eap-applications',
  EAP_APPROVALS = 'eap-approvals',

  // Grants Screens
  GRANTS_DASHBOARD = 'grants-dashboard',
  GRANTS_ALLOCATION = 'grants-allocation',
  GRANTS_DISBURSEMENTS = 'grants-disbursements'
}

export interface ScreenPermission {
  code: ScreenCode;
  name: string;
  route: string;
  icon: string;
  description: string;
}

export interface ModulePermission {
  code: ModuleCode;
  name: string;
  icon: string;
  badgeColor: string;
  screens: ScreenPermission[];
}

export interface UserPermissionConfig {
  allowedModules: ModuleCode[];
  allowedScreens: ScreenCode[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  permissions: UserPermissionConfig;
}

export const MODULE_REGISTRY: ModulePermission[] = [
  {
    code: ModuleCode.IST,
    name: 'IST Module',
    icon: 'cpu',
    badgeColor: '#3b82f6',
    screens: [
      {
        code: ScreenCode.IST_DASHBOARD,
        name: 'IST Overview',
        route: '/ist/dashboard',
        icon: 'layout-dashboard',
        description: 'IT Service & Systems Metrics Dashboard'
      },
      {
        code: ScreenCode.IST_PROJECTS,
        name: 'IT Projects',
        route: '/ist/projects',
        icon: 'folder-git-2',
        description: 'Active IT Infrastructure & Development Projects'
      },
      {
        code: ScreenCode.IST_REPORTS,
        name: 'System Reports',
        route: '/ist/reports',
        icon: 'bar-chart-3',
        description: 'Performance Analytics & Service Level Compliance'
      }
    ]
  },
  {
    code: ModuleCode.EAP,
    name: 'EAP Module',
    icon: 'layers',
    badgeColor: '#8b5cf6',
    screens: [
      {
        code: ScreenCode.EAP_DASHBOARD,
        name: 'EAP Overview',
        route: '/eap/dashboard',
        icon: 'layout-grid',
        description: 'Enterprise Architecture Planning Dashboard'
      },
      {
        code: ScreenCode.EAP_APPLICATIONS,
        name: 'App Inventory',
        route: '/eap/applications',
        icon: 'boxes',
        description: 'Software Application Catalog & Tech Stack Health'
      },
      {
        code: ScreenCode.EAP_APPROVALS,
        name: 'ARB Approvals',
        route: '/eap/approvals',
        icon: 'check-square',
        description: 'Architecture Review Board Approval Workflows'
      }
    ]
  },
  {
    code: ModuleCode.GRANTS,
    name: 'Grants Module',
    icon: 'coins',
    badgeColor: '#10b981',
    screens: [
      {
        code: ScreenCode.GRANTS_DASHBOARD,
        name: 'Grants Overview',
        route: '/grants/dashboard',
        icon: 'pie-chart',
        description: 'Funding Overview & Financial Performance Summary'
      },
      {
        code: ScreenCode.GRANTS_ALLOCATION,
        name: 'Grant Allocations',
        route: '/grants/allocation',
        icon: 'scale',
        description: 'Grant Proposals, Scoring & Budget Allocation'
      },
      {
        code: ScreenCode.GRANTS_DISBURSEMENTS,
        name: 'Disbursements',
        route: '/grants/disbursements',
        icon: 'receipt',
        description: 'Payment Ledgers, Triggers & Financial Audit Trails'
      }
    ]
  }
];
