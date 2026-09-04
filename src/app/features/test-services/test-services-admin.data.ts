import { CategoryTab, DetailedTestItem, TestContextIds } from './test-services.types';

export const ADMIN_CATEGORIES: CategoryTab[] = [
  { key: 'ALL', label: 'All Domains', icon: 'ph-squares-four' },
  { key: 'CORE', label: 'Core Settings & UM', icon: 'ph-gear' },
  { key: 'EMAIL', label: 'Email Configuration', icon: 'ph-envelope-simple' },
  { key: 'PRODUCT', label: 'Product & Lookups', icon: 'ph-cube' },
  { key: 'INSTRUCTIONS', label: 'Instructions & FAQs', icon: 'ph-book-open-text' },
  { key: 'PLATFORM', label: 'Platform & Logs', icon: 'ph-sliders' },
  { key: 'WORKFLOW', label: 'Workflow & Policy', icon: 'ph-git-fork' },
  { key: 'ANALYTICS', label: 'Analytics & Dashboards', icon: 'ph-chart-bar' }
];

export function getAdministrationTestItems(context: TestContextIds): DetailedTestItem[] {
  const items: DetailedTestItem[] = [
    // ----------------------------------------------------
    // 1. CORE SETTINGS & USER MANAGEMENT (CORE)
    // ----------------------------------------------------
    {
      id: 'ADM-DEPT-1',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Departments Advanced Search (Grid)',
      endpoint: 'api/department/getadvsearch',
      method: 'POST',
      payload: { CODE: '', NAME: '', STATUS: '-1' },
      expectedData: 'Array of DEPARTMENT records with CODE, NAME, STATUS',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-DEPT-2',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Get Departments List',
      endpoint: 'api/department/getdepartments/-1/-1',
      method: 'GET',
      payload: { name: '-1', id: '-1' },
      expectedData: 'Array of department items',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-DEPT-3',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Get Department By ID',
      endpoint: 'api/department/getdepartmentbyid/{id}',
      method: 'GET',
      payload: { id: context.firstDeptId },
      expectedData: 'Department details object',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-DEPT-4',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Insert Department',
      endpoint: 'api/department/insert',
      method: 'POST',
      payload: { CODE: 'TEST_ADM_DEPT', NAME: 'Test Administration Dept', STATUS: 1, PARENT_ID: '' },
      expectedData: 'Success confirmation response',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-DEPT-5',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Update Department',
      endpoint: 'api/department/update',
      method: 'POST',
      payload: { ID: context.firstDeptId, CODE: 'TEST_ADM_DEPT', NAME: 'Test Administration Dept Updated', STATUS: 1 },
      expectedData: 'Success confirmation response',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-ROLE-1',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Roles Advanced Search',
      endpoint: 'api/role/getadvsearch',
      method: 'POST',
      payload: { ROLE_NAME: '', STATUS: '-1' },
      expectedData: 'Array of ROLE records',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-ROLE-2',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Get System Modules for Privileges',
      endpoint: 'api/role/getmodules',
      method: 'GET',
      payload: null,
      expectedData: 'Array of system modules for permission matrix',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-ROLE-3',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Get Role Privileges By ID',
      endpoint: 'api/role/getroleprivileges/{id}',
      method: 'GET',
      payload: { id: context.firstRoleId },
      expectedData: 'Array of privileges assigned to the role',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-ROLE-4',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Insert Role',
      endpoint: 'api/role/insert',
      method: 'POST',
      payload: { ROLE_NAME: 'Test Admin Role', ROLE_CODE: 'TEST_ADM_ROLE', STATUS: 1 },
      expectedData: 'Success confirmation response',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-ROLE-5',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Update Role',
      endpoint: 'api/role/update',
      method: 'POST',
      payload: { ID: context.firstRoleId, ROLE_NAME: 'Test Admin Role Updated', ROLE_CODE: 'TEST_ADM_ROLE', STATUS: 1 },
      expectedData: 'Success confirmation response',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-USER-1',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Users Advanced Search',
      endpoint: 'api/appuser/getadvsearch',
      method: 'POST',
      payload: { CODE: '', TITLE: '', EMAIL: '', DEPARTMENT_ID: '', ROLEID: '', STATUS: '-1', RECORD_STATE: 101 },
      expectedData: 'Array of user accounts',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-USER-2',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Get User Search Master Dropdowns',
      endpoint: 'api/appuser/getusersearchmaster',
      method: 'GET',
      payload: null,
      expectedData: 'MastersDataLists containing department & role lists',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-USER-3',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Fetch Internal Users',
      endpoint: 'api/appuser/getinternalusers',
      method: 'GET',
      payload: null,
      expectedData: 'Array of internal users',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-USER-4',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Insert User',
      endpoint: 'api/appuser/insert',
      method: 'POST',
      payload: { FIRST_NAME: 'Admin', LAST_NAME: 'Tester', EMAIL: 'admin.tester@scimaxglobal.com', TITLE: 'Admin Tester', STATUS: 1, RECORD_STATE: 101 },
      expectedData: 'Success confirmation response',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-USER-5',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Update User',
      endpoint: 'api/appuser/update',
      method: 'POST',
      payload: { ID: context.firstUserId, FIRST_NAME: 'Admin', LAST_NAME: 'Tester Updated', EMAIL: 'admin.tester@scimaxglobal.com', STATUS: 1 },
      expectedData: 'Success confirmation response',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-SET-1',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Fetch System Timezones',
      endpoint: 'api/appuser/fetchtimezones',
      method: 'GET',
      payload: null,
      expectedData: 'Array of timezone definitions',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-SET-2',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Timezone Auto-Save',
      endpoint: 'api/appuser/timezoneautosave/{tz}',
      method: 'POST',
      payload: { timezone: '(UTC-05:00) Eastern Time (US & Canada)' },
      expectedData: 'Success response',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-SET-3',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Currency Auto-Save',
      endpoint: 'api/appuser/currencyautosave',
      method: 'POST',
      payload: { Currency: 'USD ($)' },
      expectedData: 'Success response',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-SET-4',
      category: 'CORE',
      categoryLabel: 'Core Settings & UM',
      apiName: 'Get Preferred Currency',
      endpoint: 'api/common/getCurrency',
      method: 'GET',
      payload: null,
      expectedData: 'Currency configuration',
      status: 'IDLE',
      matched: false
    },

    // ----------------------------------------------------
    // 2. EMAIL CONFIGURATION (EMAIL)
    // ----------------------------------------------------
    {
      id: 'ADM-EML-1',
      category: 'EMAIL',
      categoryLabel: 'Email Configuration',
      apiName: 'Email Setup Search Summary',
      endpoint: 'api/EmailSetUP/SearchSummary',
      method: 'POST',
      payload: { OrgID: '', UserID: '', EmailID: '' },
      expectedData: 'Array of configured organization email accounts',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-EML-2',
      category: 'EMAIL',
      categoryLabel: 'Email Configuration',
      apiName: 'Fetch Email Setup Record By ID',
      endpoint: 'api/EmailSetUP/FetchRecordByID/{id}',
      method: 'GET',
      payload: { id: 'C4F5E8A6-2A65-472B-AB7F-C5F39C057768' },
      expectedData: 'Email configuration record',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-EML-3',
      category: 'EMAIL',
      categoryLabel: 'Email Configuration',
      apiName: 'Insert Email Setup Configuration',
      endpoint: 'api/EmailSetUP/Insert',
      method: 'POST',
      payload: {
        EmailDisplayName: 'Scimax Admin Mailer',
        EmailID: 'admin.notifications@scimaxglobal.com',
        SMTPHost: 'smtp.office365.com',
        SMTPPort: '587',
        SMTPSSL: '1',
        EmailServerStatus: true
      },
      expectedData: 'Success confirmation response',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-EML-4',
      category: 'EMAIL',
      categoryLabel: 'Email Configuration',
      apiName: 'Update Email Setup Configuration',
      endpoint: 'api/EmailSetUP/Update',
      method: 'POST',
      payload: {
        EmailServerID: 'C4F5E8A6-2A65-472B-AB7F-C5F39C057768',
        EmailDisplayName: 'Scimax Admin Mailer Updated',
        EmailID: 'admin.notifications@scimaxglobal.com',
        SMTPHost: 'smtp.office365.com',
        SMTPPort: '587',
        SMTPSSL: '1'
      },
      expectedData: 'Success confirmation response',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-EML-5',
      category: 'EMAIL',
      categoryLabel: 'Email Configuration',
      apiName: 'SMTP Connection Test',
      endpoint: 'api/EmailSetUP/SMTPTest',
      method: 'POST',
      payload: {
        EmailID: 'notifications@domain.com',
        SMTPHost: 'smtp.office365.com',
        SMTPPort: '587',
        SMTPSSL: '1'
      },
      expectedData: 'SMTP connection verification result',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-EML-6',
      category: 'EMAIL',
      categoryLabel: 'Email Configuration',
      apiName: 'IMAP Connection Test',
      endpoint: 'api/EmailSetUP/IMAPTest',
      method: 'POST',
      payload: {
        EmailID: 'notifications@domain.com',
        IMAPHost: 'imap.office365.com',
        IMAPPort: '993',
        IMAPSSL: '1'
      },
      expectedData: 'IMAP connection verification result',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-EML-7',
      category: 'EMAIL',
      categoryLabel: 'Email Configuration',
      apiName: 'Graph API Send Connection Test',
      endpoint: 'api/EmailSetUP/GraphAPISendTest',
      method: 'POST',
      payload: {
        MicrosoftClientID: 'sample-client-id',
        MicrosoftClientSecret: 'sample-secret',
        MicrosoftTenantID: 'sample-tenant-id',
        EmailID: 'admin@scimaxglobal.com'
      },
      expectedData: 'Graph API send test result',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-EML-8',
      category: 'EMAIL',
      categoryLabel: 'Email Configuration',
      apiName: 'Graph API Read Connection Test',
      endpoint: 'api/EmailSetUP/GraphAPIReadTest',
      method: 'POST',
      payload: {
        MicrosoftClientID: 'sample-client-id',
        MicrosoftClientSecret: 'sample-secret',
        MicrosoftTenantID: 'sample-tenant-id',
        EmailID: 'admin@scimaxglobal.com'
      },
      expectedData: 'Graph API read test result',
      status: 'IDLE',
      matched: false
    },

    // ----------------------------------------------------
    // 3. PRODUCT SETUP & LOOKUPS (PRODUCT)
    // ----------------------------------------------------
    {
      id: 'ADM-PROD-1',
      category: 'PRODUCT',
      categoryLabel: 'Product & Lookups',
      apiName: 'Program Category Summary',
      endpoint: 'api/AdminProgram/GetSummaryData',
      method: 'GET',
      payload: null,
      expectedData: 'Array of Program Category items',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PROD-2',
      category: 'PRODUCT',
      categoryLabel: 'Product & Lookups',
      apiName: 'Program Category Advanced Search',
      endpoint: 'api/AdminProgram/AdvanceSearch',
      method: 'POST',
      payload: { NAME: '', PROGRAM_ID: '-1', STATUS: '-1' },
      expectedData: 'Array of filtered Program Category items',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PROD-3',
      category: 'PRODUCT',
      categoryLabel: 'Product & Lookups',
      apiName: 'Insert Program Category',
      endpoint: 'api/AdminProgram/Insert',
      method: 'POST',
      payload: { NAME: 'Test Oncology Category', PROGRAM_ID: '2', DESCRIPTION: 'Test category description', RECORD_STATE: 1 },
      expectedData: 'Success confirmation response',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PROD-4',
      category: 'PRODUCT',
      categoryLabel: 'Product & Lookups',
      apiName: 'Update Program Category',
      endpoint: 'api/AdminProgram/Update',
      method: 'POST',
      payload: { ID: context.firstProgId, NAME: 'Test Oncology Category Updated', PROGRAM_ID: '2', RECORD_STATE: 1 },
      expectedData: 'Success confirmation response',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PROD-5',
      category: 'PRODUCT',
      categoryLabel: 'Product & Lookups',
      apiName: 'Product Summary',
      endpoint: 'api/Product/GetSummaryData',
      method: 'GET',
      payload: null,
      expectedData: 'Array of Product records',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PROD-6',
      category: 'PRODUCT',
      categoryLabel: 'Product & Lookups',
      apiName: 'Product Advanced Search',
      endpoint: 'api/Product/AdvanceSearch',
      method: 'POST',
      payload: { CODE: '', NAME: '', STATUS: '-1' },
      expectedData: 'Array of filtered Product records',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PROD-7',
      category: 'PRODUCT',
      categoryLabel: 'Product & Lookups',
      apiName: 'Product Master Screen Data',
      endpoint: 'api/Product/GetMasterScreenData',
      method: 'GET',
      payload: null,
      expectedData: 'Masters data with Therapeutic Area dropdowns',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PROD-8',
      category: 'PRODUCT',
      categoryLabel: 'Product & Lookups',
      apiName: 'Insert Product',
      endpoint: 'api/Product/Insert',
      method: 'POST',
      payload: { CODE: 'PRD-TEST-99', NAME: 'Test Product Molecule', THERAPEUTIC_AREA_ID: '1', STATUS: 1 },
      expectedData: 'Success confirmation response',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PROD-9',
      category: 'PRODUCT',
      categoryLabel: 'Product & Lookups',
      apiName: 'Update Product',
      endpoint: 'api/Product/Update',
      method: 'POST',
      payload: { ID: context.firstProductId, CODE: 'PRD-TEST-99', NAME: 'Test Product Molecule Updated', STATUS: 1 },
      expectedData: 'Success confirmation response',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PROD-10',
      category: 'PRODUCT',
      categoryLabel: 'Product & Lookups',
      apiName: 'Product Network Locations Summary',
      endpoint: 'api/ProductNetworkLocations/GetSummaryData',
      method: 'GET',
      payload: null,
      expectedData: 'Array of network location records',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PROD-11',
      category: 'PRODUCT',
      categoryLabel: 'Product & Lookups',
      apiName: 'Lookups Summary',
      endpoint: 'api/lookup/getsummary',
      method: 'GET',
      payload: null,
      expectedData: 'Array of lookup master records',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PROD-12',
      category: 'PRODUCT',
      categoryLabel: 'Product & Lookups',
      apiName: 'Hierarchical Lookups Summary',
      endpoint: 'api/lookup/gethlookssummary',
      method: 'GET',
      payload: null,
      expectedData: 'Array of hierarchical lookup records',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PROD-13',
      category: 'PRODUCT',
      categoryLabel: 'Product & Lookups',
      apiName: 'Get Modules List for Lookups',
      endpoint: 'api/common/getmoduleslist',
      method: 'GET',
      payload: null,
      expectedData: 'Array of modules supporting lookup lists',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PROD-14',
      category: 'PRODUCT',
      categoryLabel: 'Product & Lookups',
      apiName: 'Review Types Summary',
      endpoint: 'api/reviewtype/SummaryData',
      method: 'GET',
      payload: null,
      expectedData: 'Array of review & approval title definitions',
      status: 'IDLE',
      matched: false
    },

    // ----------------------------------------------------
    // 4. USER INSTRUCTIONS & CONFIGURATION (INSTRUCTIONS)
    // ----------------------------------------------------
    {
      id: 'ADM-INST-1',
      category: 'INSTRUCTIONS',
      categoryLabel: 'Instructions & FAQs',
      apiName: 'Get App Type Modules for Instructions',
      endpoint: 'api/common/getapptypemodules',
      method: 'GET',
      payload: null,
      expectedData: 'Array of application modules',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-INST-2',
      category: 'INSTRUCTIONS',
      categoryLabel: 'Instructions & FAQs',
      apiName: 'FAQ Advanced Search',
      endpoint: 'api/faq/getadvsearch',
      method: 'POST',
      payload: { QUESTION: '', MODULE_ID: '-1', STATUS: '-1' },
      expectedData: 'Array of FAQ records',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-INST-3',
      category: 'INSTRUCTIONS',
      categoryLabel: 'Instructions & FAQs',
      apiName: 'Email Templates Search Summary',
      endpoint: 'api/EmailTemplates/GetEmailTemplatesSearchSummary',
      method: 'POST',
      payload: { ModuleId: '-1' },
      expectedData: 'Array of notification email templates',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-INST-4',
      category: 'INSTRUCTIONS',
      categoryLabel: 'Instructions & FAQs',
      apiName: 'Get Auto Code Modules',
      endpoint: 'api/common/getautocodemodules',
      method: 'GET',
      payload: null,
      expectedData: 'Array of autocode configuration modules',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-INST-5',
      category: 'INSTRUCTIONS',
      categoryLabel: 'Instructions & FAQs',
      apiName: 'Auto Code Advanced Search',
      endpoint: 'api/autocode/getadvsearch',
      method: 'POST',
      payload: { ModuleId: '-1' },
      expectedData: 'Array of auto-code ID rule configurations',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-INST-6',
      category: 'INSTRUCTIONS',
      categoryLabel: 'Instructions & FAQs',
      apiName: 'Fetch Registration Configuration Summary',
      endpoint: 'api/RegistrationConfig/FetchRegConfigSummary',
      method: 'GET',
      payload: null,
      expectedData: 'Registration form field configuration schema',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-INST-7',
      category: 'INSTRUCTIONS',
      categoryLabel: 'Instructions & FAQs',
      apiName: 'Application Types Summary',
      endpoint: 'api/applicationtype/SummaryData',
      method: 'GET',
      payload: null,
      expectedData: 'Array of Application Types',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-INST-8',
      category: 'INSTRUCTIONS',
      categoryLabel: 'Instructions & FAQs',
      apiName: 'RFP Search Summary',
      endpoint: 'api/rfp/getadvsearch',
      method: 'POST',
      payload: { Name: '', Status: '-1' },
      expectedData: 'Array of RFP search summary records',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-INST-9',
      category: 'INSTRUCTIONS',
      categoryLabel: 'Instructions & FAQs',
      apiName: 'RFI Search Summary',
      endpoint: 'api/rfi/getadvsearch',
      method: 'POST',
      payload: { Name: '', Status: '-1' },
      expectedData: 'Array of RFI search summary records',
      status: 'IDLE',
      matched: false
    },

    // ----------------------------------------------------
    // 5. PLATFORM, ANALYTICS & LOGS (PLATFORM)
    // ----------------------------------------------------
    {
      id: 'ADM-PLAT-1',
      category: 'PLATFORM',
      categoryLabel: 'Platform & Logs',
      apiName: 'Theme Templates Summary',
      endpoint: 'api/themetype/SummaryData',
      method: 'GET',
      payload: null,
      expectedData: 'Array of custom themes and CSS styles',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PLAT-2',
      category: 'PLATFORM',
      categoryLabel: 'Platform & Logs',
      apiName: 'Admin Audit Trail Search Summary',
      endpoint: 'api/AdminAuditTrail/GetAuditTrailSearchSummary',
      method: 'POST',
      payload: { ModuleId: '-1', UserId: '-1', OperationType: '-1', StartDate: '', EndDate: '' },
      expectedData: 'Array of administrative audit events',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PLAT-3',
      category: 'PLATFORM',
      categoryLabel: 'Platform & Logs',
      apiName: 'User Login Logs Advanced Search',
      endpoint: 'api/common/getadvuserlog',
      method: 'POST',
      payload: { UserName: '', FromDate: '', ToDate: '', Status: '-1' },
      expectedData: 'Array of user login activity entries',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PLAT-4',
      category: 'PLATFORM',
      categoryLabel: 'Platform & Logs',
      apiName: 'Get Analytics Dashboards Details',
      endpoint: 'api/Analytics/GetAnalyticsDashboardsDetails',
      method: 'POST',
      payload: { DashboardId: '-1' },
      expectedData: 'Array of dashboard visual widgets details',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-PLAT-5',
      category: 'PLATFORM',
      categoryLabel: 'Platform & Logs',
      apiName: 'Get User Dashboards',
      endpoint: 'api/Analytics/GetUserDashboards/',
      method: 'GET',
      payload: null,
      expectedData: 'User accessible dashboards list',
      status: 'IDLE',
      matched: false
    },

    // ----------------------------------------------------
    // 6. WORKFLOW, POLICY & SCREEN CONFIGURATION (WORKFLOW)
    // ----------------------------------------------------
    {
      id: 'ADM-WF-1',
      category: 'WORKFLOW',
      categoryLabel: 'Workflow & Policy',
      apiName: 'Get Policy Modules',
      endpoint: 'api/policy/getpolicymodule',
      method: 'GET',
      payload: null,
      expectedData: 'Array of modules with policy versioning',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'ADM-WF-2',
      category: 'WORKFLOW',
      categoryLabel: 'Workflow & Policy',
      apiName: 'Screen Policy Version Details',
      endpoint: 'api/screen/PolicyVersionDetails',
      method: 'GET',
      payload: null,
      expectedData: 'Array of screen controls and layout definitions',
      status: 'PENDING',
      matched: false
    },
    {
      id: 'ADM-WF-3',
      category: 'WORKFLOW',
      categoryLabel: 'Workflow & Policy',
      apiName: 'Workflow State Summary',
      endpoint: 'api/state/SummaryData',
      method: 'GET',
      payload: null,
      expectedData: 'Array of workflow stage definitions',
      status: 'PENDING',
      matched: false
    },
    {
      id: 'ADM-WF-4',
      category: 'WORKFLOW',
      categoryLabel: 'Workflow & Policy',
      apiName: 'Budget Assignment Summary',
      endpoint: 'api/BudgetAssignment/Summary',
      method: 'GET',
      payload: null,
      expectedData: 'Array of budget assignment allocations',
      status: 'PENDING',
      matched: false
    },
    {
      id: 'ADM-WF-5',
      category: 'WORKFLOW',
      categoryLabel: 'Workflow & Policy',
      apiName: 'Budget Assignment Master Data',
      endpoint: 'api/BudgetAssignment/GetMasterData/-1/-1',
      method: 'GET',
      payload: { programId: '-1', appTypeId: '-1' },
      expectedData: 'Master dropdowns for budget assignment',
      status: 'PENDING',
      matched: false
    },
    {
      id: 'ADM-WF-6',
      category: 'WORKFLOW',
      categoryLabel: 'Workflow & Policy',
      apiName: 'Get Timeline Configuration',
      endpoint: 'api/timeconfig/Edit',
      method: 'GET',
      payload: null,
      expectedData: 'Timeline configuration object',
      status: 'PENDING',
      matched: false
    },
    // ----------------------------------------------------
    // 7. ANALYTICS & DASHBOARDS (ANALYTICS)
    // ----------------------------------------------------
    {
      id: 'ADM-ANALYTICS-1',
      category: 'ANALYTICS',
      categoryLabel: 'Analytics & Dashboards',
      apiName: 'Get Analytics Dashboards Details',
      endpoint: 'api/Analytics/GetAnalyticsDashboardsDetails',
      method: 'POST',
      payload: {},
      expectedData: 'List of analytics dashboard items',
      status: 'PENDING',
      matched: false
    },
    {
      id: 'ADM-ANALYTICS-2',
      category: 'ANALYTICS',
      categoryLabel: 'Analytics & Dashboards',
      apiName: 'Get Analytics Dashboard By ID',
      endpoint: 'api/Analytics/GetAnalyticsDashboardsDetailsByID/{id}',
      method: 'GET',
      payload: { id: 'DASH-IST-01' },
      expectedData: 'Single analytics dashboard detail',
      status: 'PENDING',
      matched: false
    },
    {
      id: 'ADM-ANALYTICS-3',
      category: 'ANALYTICS',
      categoryLabel: 'Analytics & Dashboards',
      apiName: 'Get User Assigned Dashboards',
      endpoint: 'api/Analytics/GetUserDashboards/',
      method: 'GET',
      payload: null,
      expectedData: 'Array of user accessible dashboards',
      status: 'PENDING',
      matched: false
    },
    {
      id: 'ADM-ANALYTICS-4',
      category: 'ANALYTICS',
      categoryLabel: 'Analytics & Dashboards',
      apiName: 'Sync Organization Dashboards',
      endpoint: 'api/organization/SyncDashboards',
      method: 'POST',
      payload: { OrgId: '1', OrgName: 'scimax', IST: true, EAP: true, GRANTS: true, IS_ORG_ACCOUNT_IN_LOGI: true },
      expectedData: 'Sync operation confirmation response',
      status: 'PENDING',
      matched: false
    },
    {
      id: 'ADM-ANALYTICS-5',
      category: 'ANALYTICS',
      categoryLabel: 'Analytics & Dashboards',
      apiName: 'Refresh Organization Analytics',
      endpoint: 'api/organization/RefreshOrg',
      method: 'POST',
      payload: { OrgId: '1', OrgName: 'scimax', IST: true, EAP: true, GRANTS: true },
      expectedData: 'Refresh operation response',
      status: 'PENDING',
      matched: false
    },
    {
      id: 'ADM-ANALYTICS-6',
      category: 'ANALYTICS',
      categoryLabel: 'Analytics & Dashboards',
      apiName: 'Check If Analytics Update Enabled',
      endpoint: 'api/Analytics/IsAnalyticsUpdateEnabledWhileDashboardClick',
      method: 'GET',
      payload: null,
      expectedData: 'Boolean or flag indicating if update is enabled on click',
      status: 'PENDING',
      matched: false
    }
  ];

  items.forEach(item => {
    item.customPayloadJson = item.payload ? JSON.stringify(item.payload, null, 2) : '';
  });

  return items;
}
