import { CategoryTab, DetailedTestItem, TestContextIds } from './test-services.types';

export const SUPERADMIN_CATEGORIES: CategoryTab[] = [
  { key: 'ALL', label: 'All Services', icon: 'ph-squares-four' },
  { key: 'AUTH', label: 'Auth & Session', icon: 'ph-key' },
  { key: 'ORGANIZATION', label: 'Organizations', icon: 'ph-buildings' },
  { key: 'AUTHENTICATION', label: 'Auth Config', icon: 'ph-fingerprint' },
  { key: 'EMAIL', label: 'SMTP Config', icon: 'ph-envelope-simple' },
  { key: 'AUDIT', label: 'Audit Logs', icon: 'ph-clipboard-text' },
  { key: 'DEPARTMENT', label: 'Departments', icon: 'ph-tree-structure' },
  { key: 'ROLE', label: 'Roles & Privs', icon: 'ph-user-gear' },
  { key: 'USER', label: 'Users', icon: 'ph-users' }
];

export const SUPERADMIN_CREDENTIALS = {
  username: 'superadmin@scimaxglobal.com',
  password: 'Admin@12',
  browser: 'Edge(Chromium)',
  version: '151',
  orgCode: null as string | null
};

export const SUPERADMIN_SMTP_PAYLOAD = {
  EmailConfigID: 'C4F5E8A6-2A65-472B-AB7F-C5F39C057768',
  EmailAccountTypeCode: 'GOOGLE',
  EmailDisplayName: 'IEG Testing trd1',
  EmailID: 'miqtesting12.gsuite@scimaxglobal123.com',
  EmailPwd: 'Techsol@321',
  EmailServerStatus: true,
  FileExt: '.json',
  FileName: 'total-platform-324517-7ccbed876728 (6)',
  GSuiteFileID: 'ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAidG90YWwtcGxhdGZvcm0tMzI0NTE3IiwKICAicHJpdmF0ZV9rZXlfaWQiOiAiN2NjYmVkODc2NzI4MDc5NjU3MTU4Zjk4NjMzMThkYzBjMjRiOWYxYSIsCiAgInByaXZhdGVfa2V5IjogIi0tLS0tQkVHSU4gUFJJVkFURSBLRVktLS0tLVxuTUlJRXZnSUJBREFOQmdrcWhraUc5dzBCQVFFRkFBU0NCS2d3Z2dTa0FnRUFBb0lCQVFDK1RsV1hCcEh3NmpaZlxuRjArSWhiUGhITmpsdmdPS3E2bGpMY05JaHo5bnJ5d25qMEdlUnNmTXZMaXZEcko4RSs3djY1NnpDSTlJNDE3OFxuaFNkOFM2OUhmaE1GQVBzSG85U3kwOWhXKzEzME1vS2lndmN1by8wMGJ0d3lYRCs1OXBPZXdBL1o1UXlFbHpZMVxuL3BYMFNidmpJVTc0c2Zpa294OWhQVERma2MvT1UyZ3B0aFNZVnJaMklLeUw0MXROdlFVOG02NXJuclVGcVJDSlxua2lzNDdEazc1OXBnV284MVgvWWtESFIzc1R4UzN0VkxsNEVPS3RoUWN4ZHFvcjg0b01LandCeER4SW9sZlI4WlxudXRjN0w1SmVhLzJEZGMvcloxMCtaeWNveVFkYWZRdVlaK3RWME9UQ1Y1OUxwOGJMQnRQaitJYXVubzhRWHpuTlxuV08yZXFwSDNBZ01CQUFFQ2dnRUFRWTJjUUFTOFd0OWkwVWluVmVDd2dMZStJdzFjRFBWcXlNWW53YUVNL3p0YlxuRzNObWFBMzdueFBYRGo0aXowalNnb1NJU3lXRXJkZmNqV0dVbzJVeXdJNjJJSUFnK0pXL204WUxmSkxqMzAxU1xuNElYNmZXOXh0aEVGK3JiNklLWEdYZVhNMEFMdFYvTDZjb2o2d0laeG1TQ05JbSt6dFlxWE1aaXhjQ0c3RWxmaVxucjBMMFdOUFBWWk9pN05Mdm9MYklSeGIzdlZaSldBMEhBRllkS05PQy9QaVhMaXRyeCszUHVhLzUvZk84ZmM2NlxuMzhVQVc4MjgwSlBiVXM0bkkrSnhlQ1kyVlFsN2YweTZZNzdJZFlDaFc2ZUtQL2pXbWxBSzY2TXNKc3dpQ1NmVlxuRXdLU3lJczI0dlBZYXZvOWxaY2k0L091SVRHS0JpTDd1T1ZTYlgzdHlRS0JnUURnL2M4aGdHWVgvVUIxdlZ6RVxuS0ZHVFJBR2R1eGFEdGQvNlN5dE5BZE1MY2Q5dUpHSUxOZ2ZubVVNdlNzcWFsV0VJVUYxR3RuZ3RuM29BN0V3NVxueEthbUpFc0MxQXN3eTVWQ1F3YVlzZUMwdTYremdUajBUekFROW1veTgwZkZEWjVkWVA5SVY2VGhQNmVvWW5mZlxuQ25EeDU5M3hlRzQ4eVFJTk1CZzhOa2ZMblFLQmdRRFlpTDhqclN3WWF2d1ZBaVdiRmNuZmorV2pBWC9JTDYyRVxuME5WcWRSa0ZyNENMb3l0SkJveXF1TlIwZjNocDNLbVpiSlZTQzVzRytQT1p0bFJTYkRhOS9zQ1ZpYzdkd2wzMVxuOEtYaXM3VU5TSFdIV2lxNjVJWVMrK0pydUt2VXhvYlExdFNFS0hzOXd4Y1RJSE5pRkJ1S3A1U2Nod00xWUhoNFxub0tTU1pTQ1Jvd0tCZ1FEUGRscGJxdmo1SCtZamExUXg4SGVnRXJKbXprL3BiWGkxWkVEdVJrTmpwMEgrWHdBbFxuRkZKZnBYeEZESE1iN2FoR3NVd0JXMW9mdjVFUmJ0S3U1ZjFBNy9CWEVFMnRWZHd3K0hzSnErUG00N1lWRUpBQ1xuLzAzMEpqUXcvUkZ0eTZ2K3NPVlV3TFJobTMrdWpmVzRyZmtOcHQrSnZLSHgzT3ZPVzAzTm44TytKUUtCZ1FDdVxuOGwwc0lBQWVnbUhGUDRUT3RsM3lTTHJLWnEydE9naEI1TkJwUU03RXJ6VjJuSkNlWWJKSlJTZ3lMOE5FRk1yYVxuY01aOEVYQmh3OFpkak5pMzkwS0xZMGFLQzF1ZUJDb1NTU3BkN2IvOFNXemJ2NmdGUkJtblFPZUJEU1dYdGdhNlxudUxmZlJ5MjdpdUlieS80dFlmMldteXNSQkd4dE5kSmY4N3JEcFAwWmJRS0JnSExiZWE0NlBhWVM5eTMyZXhvVVxuRkNKbDR4Z1JhVWxPa2RCZ0lwbkJwaEE5R3QvWnIxMitxTzE4c2Y1THRDSXUwRUJLd0lHcHRnbyszU0dFdy91YVxub1NEbWVHN0tnL0MyQ2F4akZOWktyemtoUmZqRWt6Z3pOeHBuTisyMkVpN0huZVdTYWxQeU92bHZKUzJsN2R6R1xuZk1FZzYxbmFFcXRtMEM5VFpGQXV3bVdwXG4tLS0tLUVORCBQUklWQVRFIEtFWS0tLS0tXG4iLAogICJjbGllbnRfZW1haWwiOiAibWl0ZXN0QHRvdGFsLXBsYXRmb3JtLTMyNDUxNy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsCiAgImNsaWVudF9pZCI6ICIxMDE0MjgzNTA3ODgzNzM2NDAxMTkiLAogICJhdXRoX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsCiAgInRva2VuX3VyaSI6ICJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbiIsCiAgImF1dGhfcHJvdmlkZXJfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLAogICJjbGllbnRfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L21pdGVzdCU0MHRvdGFsLXBsYXRmb3JtLTMyNDUxNy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIKfQo=',
  GraphApiRead: false,
  GraphApiSend: false,
  LoggedUserID: null,
  ManageAccessToken: 0,
  ManageUserEmailID: null,
  ManagerUserPassword: null,
  MicrosoftClientID: null,
  MicrosoftClientSecret: null,
  MicrosoftTenantID: null,
  SMTPHost: 'smtp.gmail.com',
  SMTPPort: '587',
  SMTPSSL: '4',
  TempFileStoreID: null,
  UserID: null
};

export const SUPERADMIN_VALIDATE_LOGI_PAYLOAD = {
  ClientID: 'c6abd469-464d-4a9f-8a5a-542100104eae',
  ClientSecret: 'KNW7XSJaqUjp70ap1MfNSxsRaOf9zoTvNizQ',
  LogiURL: 'https://analytics-sandbox.scimaxmi.com:8443/composer/',
  SupervisorPWD: 'Techsol@123',
  SupervisorUsername: 'supervisor'
};

export const SUPERADMIN_INSERT_ORG_PAYLOAD = {
  CODE: 'TestOr1003',
  NAME: 'Test Organization 1.0.0.3',
  CREATED_DATE: '2026-08-11',
  LAST_UPDATED_DATE: '2026-08-11',
  LICENCE_END_DATE: '2027-08-27T00:00:00.000Z',
  LICENCE_END_DATES: '2027-8-27',
  LICENCE_END_DATEO: {
    Day: 27,
    Month: 8,
    Year: 2027,
    Hours: 0,
    Minutes: 0,
    Seconds: 0,
    IsEndDate: true,
    HasValue: true,
    IsDateModified: true
  },
  EAP: true,
  GRANTS: true,
  IST: true,
  CME: true,
  CHARITY: true,
  SPONSERSHIP: true,
  ACTIVE_USERS_LIMIT: 10,
  SPACE_ALLOCATION_BG: 0,
  DATAPEROID_IN_YEARS: 0,
  AUTHTYPE: 'MED',
  TIMEZONE: 'UTC',
  IS_ANALYTICS_CONFIGURED: false,
  AUTHENTICATIONSLST: [],
  STATUS: '1',
  PROGENABLED: '1'
};

export const SUPERADMIN_UPDATE_ORG_PAYLOAD = {
  ID: '1',
  CODE: 'TEST_ORG_01',
  NAME: 'Test Organization Updated',
  STATUS: '1',
  PROGENABLED: '1',
  AUTHTYPE: 'MED',
  TIMEZONE: 'UTC',
  IS_ANALYTICS_CONFIGURED: false,
  AUTHENTICATIONSLST: [],
  LICENCE_END_DATEO: {
    Day: 27,
    Month: 8,
    Year: 2027,
    Hours: 0,
    Minutes: 0,
    Seconds: 0,
    IsEndDate: true,
    HasValue: true,
    IsDateModified: true
  },
  LICENCE_END_DATES: '2027-8-27'
};

export const SUPERADMIN_INSERT_SUPPORT_USER_PAYLOAD = {
  FIRST_NAME: 'Support',
  LAST_NAME: 'Tester',
  EMAIL: 'support.tester@scimaxglobal.com',
  USER_TYPE: 'S',
  Status: true,
  CreatedUserType: 'SUPERADMIN',
  ORGANIZATION_ID: '1',
  RECORD_STATE: 101
};

export const SUPERADMIN_INSERT_SAML_PAYLOAD = {
  AUTH_NAME: 'SAML SSO Test',
  AUTH_TYPE_CODE: 'SAML',
  ISSUER_URL: 'https://sts.windows.net/test-tenant/',
  METADATA_URL: 'https://login.microsoftonline.com/federationmetadata/2007-06/federationmetadata.xml'
};

export const SUPERADMIN_INSERT_LDAP_PAYLOAD = {
  AUTH_NAME: 'Corporate LDAP Test',
  AUTH_TYPE_CODE: 'LDAP',
  SERVER_NAME: 'ldap.example.com',
  PORT: '389'
};

export const SUPERADMIN_INSERT_EMAIL_AUTH_PAYLOAD = {
  AUTH_NAME: 'Direct Email Auth Test',
  AUTH_TYPE_CODE: 'EMAIL'
};

export const SUPERADMIN_DEPT_SEARCH_PAYLOAD = {
  CODE: '',
  NAME: '',
  STATUS: '-1'
};

export const SUPERADMIN_INSERT_DEPT_PAYLOAD = {
  CODE: 'TEST_DEPT',
  NAME: 'Test Department Auto',
  STATUS: 1,
  RECORD_STATE: 101,
  ORGANIZATION_ID: '1',
  CREATED_DATE: '2026-08-11T00:00:00.000Z',
  LAST_UPDATED_DATE: '2026-08-11T00:00:00.000Z'
};

export const SUPERADMIN_UPDATE_DEPT_PAYLOAD = {
  ID: '1',
  CODE: 'TEST_DEPT',
  NAME: 'Test Department Updated',
  STATUS: 1,
  RECORD_STATE: 101,
  ORGANIZATION_ID: '1',
  CREATED_DATE: '2026-08-11T00:00:00.000Z',
  LAST_UPDATED_DATE: '2026-08-11T00:00:00.000Z'
};

export const SUPERADMIN_ROLE_SEARCH_PAYLOAD = {
  Role_Name: '',
  Record_State: 101,
  HasStatus: true
};

export const SUPERADMIN_INSERT_ROLE_PAYLOAD = {
  Role_Name: 'Test Super Admin Role',
  Status: true,
  HasIST: true,
  HasEAP: true,
  HasGRANTS: true,
  HasCME: true,
  HasCharity: true,
  HasSponsership: true,
  HasAnalytics: false,
  lstGen: [],
  lstIST: [],
  lstEAP: [],
  lstGrants: [],
  lstAnalytics: []
};

export const SUPERADMIN_UPDATE_ROLE_PAYLOAD = {
  Role_ID: '1',
  Role_Name: 'Test Super Admin Role Updated',
  Status: true,
  HasIST: true,
  HasEAP: true,
  HasGRANTS: true,
  HasCME: true,
  HasCharity: true,
  HasSponsership: true,
  HasAnalytics: false,
  lstGen: [],
  lstIST: [],
  lstEAP: [],
  lstGrants: [],
  lstAnalytics: []
};

export const SUPERADMIN_ASSIGN_ROLE_PRIVILEGES_PAYLOAD = [
  {
    ROLE_ID: '1',
    FEATURE_ID: '102',
    PERMISSION_ID: 1,
    ACCESS_LEVEL: 1,
    RECORD_STATE: 101,
    ORGANIZATION_ID: '1',
    isExisting: false,
    CREATED_DATE: '2026-08-11T00:00:00.000Z',
    LAST_UPDATED_DATE: '2026-08-11T00:00:00.000Z'
  }
];

export const SUPERADMIN_USER_SEARCH_PAYLOAD = {
  CODE: '',
  TITLE: '',
  EMAIL: '',
  DEPARTMENT_ID: '',
  ROLEID: '',
  Status: true,
  RECORD_STATE: 101,
  ORGANIZATION_ID: '1'
};

export const SUPERADMIN_INSERT_USER_PAYLOAD = {
  FIRST_NAME: 'Test',
  LAST_NAME: 'User',
  EMAIL: 'test.user@scimaxglobal.com',
  CODE: 'dummy',
  USER_TYPE: 'I',
  Status: true,
  CreatedUserType: 'SUPERADMIN',
  ORGANIZATION_ID: '1',
  AUTH_ID: '0',
  RECORD_STATE: 1
};

export const SUPERADMIN_UPDATE_USER_PAYLOAD = {
  ID: '1',
  FIRST_NAME: 'Super',
  LAST_NAME: 'Admin',
  EMAIL: 'superadmin@scimaxglobal.com',
  Status: true,
  CreatedUserType: 'SUPERADMIN',
  ORGANIZATION_ID: '1',
  RECORD_STATE: 1
};

export function getSuperAdminTestItems(
  credentials = SUPERADMIN_CREDENTIALS,
  smtpPayload = SUPERADMIN_SMTP_PAYLOAD,
  validateLogiPayload = SUPERADMIN_VALIDATE_LOGI_PAYLOAD,
  insertOrgPayload = SUPERADMIN_INSERT_ORG_PAYLOAD,
  context: TestContextIds = {
    loggedInUserId: '1EA31513E4C24BD1B27F5DB4096655BC',
    firstOrgId: '1',
    firstAuthId: '1',
    firstDeptId: '1',
    firstRoleId: '1',
    firstUserId: '1',
    firstProgId: '1',
    firstProductId: '1'
  }
): DetailedTestItem[] {
  const items: DetailedTestItem[] = [
    // 1. AUTH & SESSION
    {
      id: 'SA-AUTH-1',
      category: 'AUTH',
      categoryLabel: 'Auth & Session',
      apiName: 'Get Application Configuration',
      endpoint: 'api/Login/GetConfigData?orgCode=',
      method: 'GET',
      payload: { orgCode: '' },
      expectedData: 'Configuration object containing apiURL, baseUrl, Themes',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTH-2',
      category: 'AUTH',
      categoryLabel: 'Auth & Session',
      apiName: 'Get IEG Build Version',
      endpoint: 'api/appuser/fetchiegbuildversion',
      method: 'GET',
      payload: null,
      expectedData: 'FrameworkResponse containing build version string in Data',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTH-3',
      category: 'AUTH',
      categoryLabel: 'Auth & Session',
      apiName: 'Check Email Address Exists & Auth Type',
      endpoint: 'api/Login/CheckEmailAddressExists',
      method: 'POST',
      payload: { EMAIL: credentials.username, ORGANIZATION_ID: null },
      expectedData: 'AUTHENTICATIONS object or null if standard auth',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTH-4',
      category: 'AUTH',
      categoryLabel: 'Auth & Session',
      apiName: 'Check User Type',
      endpoint: 'api/appuser/checkusertype',
      method: 'POST',
      payload: { CODE: credentials.username, ORGCODE: null },
      expectedData: 'User details with UserLoginType or USER_TYPE',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTH-5',
      category: 'AUTH',
      categoryLabel: 'Auth & Session',
      apiName: 'Multi-Browser Verification',
      endpoint: 'api/appuser/MultiBrowserVerification',
      method: 'POST',
      payload: {
        CODE: credentials.username,
        PASSWORD: credentials.password,
        ORGCODE: credentials.orgCode,
        Browser: credentials.browser,
        Version: credentials.version
      },
      expectedData: 'USERS verification object indicating active sessions or password validity',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTH-6',
      category: 'AUTH',
      categoryLabel: 'Auth & Session',
      apiName: 'Super Admin Login',
      endpoint: 'api/appuser/login',
      method: 'POST',
      payload: {
        CODE: credentials.username,
        PASSWORD: credentials.password,
        ORGCODE: credentials.orgCode,
        Browser: credentials.browser,
        Version: credentials.version
      },
      expectedData: 'User credentials response with Token, UserID, and Authenticated User',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTH-7',
      category: 'AUTH',
      categoryLabel: 'Auth & Session',
      apiName: 'Check Session Status',
      endpoint: 'api/appuser/checksession',
      method: 'GET',
      payload: null,
      expectedData: 'Session verification response with active status true/false',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTH-8',
      category: 'AUTH',
      categoryLabel: 'Auth & Session',
      apiName: 'Fetch System Timezones',
      endpoint: 'api/appuser/fetchtimezones',
      method: 'GET',
      payload: null,
      expectedData: 'Array of system timezone strings/objects',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTH-9',
      category: 'AUTH',
      categoryLabel: 'Auth & Session',
      apiName: 'Get User Preferred Currency',
      endpoint: 'api/appuser/getcurrency',
      method: 'GET',
      payload: null,
      expectedData: 'Currency configuration string / FrameworkResponse',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTH-10',
      category: 'AUTH',
      categoryLabel: 'Auth & Session',
      apiName: 'Get User Roles & Profile Details',
      endpoint: 'api/appuser/getur/{userId}',
      method: 'GET',
      payload: { userId: context.loggedInUserId },
      expectedData: 'Object with user roles list, profile details, and timezone',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTH-11',
      category: 'AUTH',
      categoryLabel: 'Auth & Session',
      apiName: 'Logout User in Other Browser',
      endpoint: 'api/appuser/LogoutUserInOtherBrowser/{id}/{browser}',
      method: 'GET',
      payload: { userId: context.loggedInUserId, browser: credentials.browser },
      expectedData: 'FrameworkResponse confirming remote session termination',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTH-12',
      category: 'AUTH',
      categoryLabel: 'Auth & Session',
      apiName: 'Super Admin Logout',
      endpoint: 'api/appuser/logout/',
      method: 'POST',
      payload: { Reason: 'Test execution complete', Browser: credentials.browser, Version: credentials.version, UserId: context.loggedInUserId },
      expectedData: 'FrameworkResponse confirming successful logout',
      status: 'IDLE',
      matched: false
    },

    // 2. ORGANIZATIONS MANAGEMENT
    {
      id: 'SA-ORG-1',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Organizations Advanced Search (Grid)',
      endpoint: 'api/organization/getadvsearch',
      method: 'POST',
      payload: { CODE: '', NAME: '', Status: '-1' },
      expectedData: 'Array of ORGANIZATION records with CODE, NAME, STATUS, PROGENABLED',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-2',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Fetch All Organizations List',
      endpoint: 'api/organization/getorganizatoins/-1',
      method: 'GET',
      payload: { name: '-1' },
      expectedData: 'Array of ORGANIZATION records',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-3',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Fetch Organizations from AppUser Endpoint',
      endpoint: 'api/appuser/getorganizatoins',
      method: 'GET',
      payload: null,
      expectedData: 'Array of user-accessible organizations',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-4',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Get Organization Details By ID',
      endpoint: 'api/organization/getorganizationbyid/{id}',
      method: 'GET',
      payload: { id: context.firstOrgId },
      expectedData: 'ORGANIZATION details with modules, currencies, licensing data',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-5',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Get Organization Master Screen Data',
      endpoint: 'api/organization/GetMasterScreenData/{id}',
      method: 'GET',
      payload: { id: context.firstOrgId },
      expectedData: 'MastersDataLists with currencies, account email lists (MasterData1..7)',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-6',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Get Logi Analytics Configuration Info',
      endpoint: 'api/organization/GetOrgAnlyticsInfo',
      method: 'GET',
      payload: null,
      expectedData: 'Object with LogiComposerURL, ClientID, ClientSecret, Username',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-7',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Get Default Authentication Providers',
      endpoint: 'api/configuration/GetDefaultAuthentication',
      method: 'GET',
      payload: null,
      expectedData: 'Array of AUTHENTICATIONS default providers',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-8',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Get User Search Master Dropdowns',
      endpoint: 'api/appuser/getusersearchmaster',
      method: 'GET',
      payload: null,
      expectedData: 'MastersDataLists with departments (MasterData1) and roles (MasterData2)',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-9',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Support Users Advanced Search for Org',
      endpoint: 'api/appuser/getadvsearch',
      method: 'POST',
      payload: { TITLE: '', EMAIL: '', DEPARTMENT_ID: '', ROLEID: '', RECORD_STATE: 101, Status: true, ORGANIZATION_ID: context.firstOrgId },
      expectedData: 'Array of USERS records associated with the organization',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-10',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Fetch Users By Type & Org ID',
      endpoint: 'api/appuser/getusersbyid/{type}/{orgid}',
      method: 'GET',
      payload: { type: 'S', orgId: context.firstOrgId },
      expectedData: 'Array of USERS entities filtered by type and organization',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-11',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Insert / Create Organization',
      endpoint: 'api/organization/InsertOrganization',
      method: 'POST',
      payload: insertOrgPayload,
      expectedData: 'FrameworkResponse confirming organization creation',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-12',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Update Organization',
      endpoint: 'api/organization/UpdateOrganization',
      method: 'POST',
      payload: { ID: context.firstOrgId, CODE: 'TEST_ORG_01', NAME: 'Test Organization Updated', STATUS: '1', PROGENABLED: '1', AUTHTYPE: 'MED', TIMEZONE: 'UTC' },
      expectedData: 'FrameworkResponse confirming organization update',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-13',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Insert Support User',
      endpoint: 'api/appuser/insert',
      method: 'POST',
      payload: { FIRST_NAME: 'Support', LAST_NAME: 'Tester', EMAIL: 'support.tester@scimaxglobal.com', USER_TYPE: 'S', Status: true, CreatedUserType: 'SUPERADMIN', ORGANIZATION_ID: context.firstOrgId, RECORD_STATE: 101 },
      expectedData: 'FrameworkResponse confirming support user creation',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-14',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Sync Organization Dashboards',
      endpoint: 'api/organization/SyncDashboards',
      method: 'POST',
      payload: { OrgId: context.firstOrgId, OrgName: 'Default Org' },
      expectedData: 'FrameworkResponse confirming dashboard sync trigger',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-15',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Refresh Logi Analytics Org',
      endpoint: 'api/organization/RefreshOrg',
      method: 'POST',
      payload: { OrgId: context.firstOrgId, OrgName: 'Default Org' },
      expectedData: 'FrameworkResponse confirming Logi refresh',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-16',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Validate Logi Analytics Configuration',
      endpoint: 'api/organization/ValidateLogiConf',
      method: 'POST',
      payload: validateLogiPayload,
      expectedData: 'FrameworkResponse or boolean validation output',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ORG-17',
      category: 'ORGANIZATION',
      categoryLabel: 'Organizations',
      apiName: 'Check Internal Users Limit',
      endpoint: 'api/appuser/checkinternalusers/{OrgID}',
      method: 'GET',
      payload: { orgId: context.firstOrgId },
      expectedData: 'Boolean response indicating if user limit is within quota',
      status: 'IDLE',
      matched: false
    },

    // 3. AUTHENTICATION CONFIGS
    {
      id: 'SA-AUTHCFG-1',
      category: 'AUTHENTICATION',
      categoryLabel: 'Auth Config',
      apiName: 'Get Available Authentication Types',
      endpoint: 'api/configuration/getauthtypes',
      method: 'GET',
      payload: null,
      expectedData: 'Array of AUTHENTICATIONS types (SAML, LDAP, EMAIL, etc.)',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTHCFG-2',
      category: 'AUTHENTICATION',
      categoryLabel: 'Auth Config',
      apiName: 'Search / List Authentication Configurations',
      endpoint: 'api/Configuration/GetAuthSearchSummary',
      method: 'POST',
      payload: { AuthName: '', AuthType: '-1', Status: '-1' },
      expectedData: 'Array of AUTHENTICATIONS summary records',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTHCFG-3',
      category: 'AUTHENTICATION',
      categoryLabel: 'Auth Config',
      apiName: 'Get Authentication Configuration Details By ID',
      endpoint: 'api/configuration/getauthbyid?AuthId={AuthId}',
      method: 'GET',
      payload: { AuthId: context.firstAuthId },
      expectedData: 'AUTHENTICATIONS detailed configuration object',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTHCFG-4',
      category: 'AUTHENTICATION',
      categoryLabel: 'Auth Config',
      apiName: 'Get Authentications Mapped By Org ID',
      endpoint: 'api/configuration/GetAuthenticationsByOrgId?orgId={orgId}',
      method: 'GET',
      payload: { orgId: context.firstOrgId },
      expectedData: 'Array of mapped AUTHENTICATIONS for organization',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTHCFG-5',
      category: 'AUTHENTICATION',
      categoryLabel: 'Auth Config',
      apiName: 'Insert / Save SAML Authentication',
      endpoint: 'api/configuration/insertsaml',
      method: 'POST',
      payload: { AUTH_NAME: 'SAML SSO Test', AUTH_TYPE_CODE: 'SAML', ISSUER_URL: 'https://sts.windows.net/test-tenant/', METADATA_URL: 'https://login.microsoftonline.com/federationmetadata/2007-06/federationmetadata.xml' },
      expectedData: 'FrameworkResponse confirming SAML configuration saved',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTHCFG-6',
      category: 'AUTHENTICATION',
      categoryLabel: 'Auth Config',
      apiName: 'Insert / Save LDAP Authentication',
      endpoint: 'api/configuration/insertldap',
      method: 'POST',
      payload: { AUTH_NAME: 'Corporate LDAP Test', AUTH_TYPE_CODE: 'LDAP', SERVER_NAME: 'ldap.example.com', PORT: '389' },
      expectedData: 'FrameworkResponse confirming LDAP configuration saved',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTHCFG-7',
      category: 'AUTHENTICATION',
      categoryLabel: 'Auth Config',
      apiName: 'Insert / Save Direct Email Authentication',
      endpoint: 'api/configuration/insertemail',
      method: 'POST',
      payload: { AUTH_NAME: 'Direct Email Auth Test', AUTH_TYPE_CODE: 'EMAIL' },
      expectedData: 'FrameworkResponse confirming Email authentication configuration saved',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUTHCFG-8',
      category: 'AUTHENTICATION',
      categoryLabel: 'Auth Config',
      apiName: 'Upload / Update Authentication Metadata',
      endpoint: 'api/configuration/upload?id={id}',
      method: 'POST',
      payload: { AuthId: context.firstAuthId, ConfigData: '<EntityDescriptor xmlns="urn:oasis:names:tc:SAML:2.0:metadata"></EntityDescriptor>' },
      expectedData: 'FrameworkResponse or object confirming metadata upload',
      status: 'IDLE',
      matched: false
    },

    // 4. EMAIL / SMTP CONFIG
    {
      id: 'SA-EMAIL-1',
      category: 'EMAIL',
      categoryLabel: 'SMTP Config',
      apiName: 'Fetch Current SMTP Configuration',
      endpoint: 'api/SMTPConfiguration/Fetch',
      method: 'GET',
      payload: null,
      expectedData: 'SmtpConfiguration object with EmailID, SMTPHost, SMTPPort',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-EMAIL-2',
      category: 'EMAIL',
      categoryLabel: 'SMTP Config',
      apiName: 'Get SMTP Version History List',
      endpoint: 'api/SMTPConfiguration/GetSMTPRecordList',
      method: 'GET',
      payload: null,
      expectedData: 'Array of SMTP configuration historical revisions',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-EMAIL-3',
      category: 'EMAIL',
      categoryLabel: 'SMTP Config',
      apiName: 'Fetch SMTP Record By ID',
      endpoint: 'api/SMTPConfiguration/FetchRecordByIDAsync/{id}',
      method: 'GET',
      payload: { EmailConfigID: 'C4F5E8A6-2A65-472B-AB7F-C5F39C057768' },
      expectedData: 'SMTP configuration object for specific revision',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-EMAIL-4',
      category: 'EMAIL',
      categoryLabel: 'SMTP Config',
      apiName: 'SMTP Connection Test',
      endpoint: 'api/SMTPConfiguration/SMTPTest',
      method: 'POST',
      payload: { EmailID: 'miqtesting12.gsuite@scimaxglobal123.com', EmailPwd: 'Techsol@321', SMTPHost: 'smtp.gmail.com', SMTPPort: '587', SMTPSSL: '4' },
      expectedData: 'FrameworkResponse with test connection result',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-EMAIL-5',
      category: 'EMAIL',
      categoryLabel: 'SMTP Config',
      apiName: 'Graph API Send Connection Test',
      endpoint: 'api/SMTPConfiguration/GraphAPISendTest',
      method: 'POST',
      payload: { MicrosoftClientID: 'sample-client-id', MicrosoftClientSecret: 'sample-secret', MicrosoftTenantID: 'sample-tenant-id', EmailID: 'admin@scimaxglobal.com' },
      expectedData: 'FrameworkResponse with Graph API connection test result',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-EMAIL-6',
      category: 'EMAIL',
      categoryLabel: 'SMTP Config',
      apiName: 'Insert / Add SMTP Configuration',
      endpoint: 'api/SMTPConfiguration/InsertSMTPConfiguration',
      method: 'POST',
      payload: smtpPayload,
      expectedData: 'FrameworkResponse or object confirming SMTP configuration insert',
      status: 'IDLE',
      matched: false
    },

    // 5. AUDIT LOG RECORDS
    {
      id: 'SA-AUDIT-1',
      category: 'AUDIT',
      categoryLabel: 'Audit Logs',
      apiName: 'Get Audit Log Records List',
      endpoint: 'api/SuperAdminAuditLog/GetAuditLogRecordList',
      method: 'POST',
      payload: { Category: 'Organization', Name: '', StartDate: '', EndDate: '' },
      expectedData: 'Array of audit log records with RevisionNum, category, UserName',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUDIT-2',
      category: 'AUDIT',
      categoryLabel: 'Audit Logs',
      apiName: 'Get Audit Log Revision History List',
      endpoint: 'api/SuperAdminAuditLog/GetAuditLogRevisionList',
      method: 'GET',
      payload: { RelatedPkId: context.firstOrgId, CatergoryType: 'Organization' },
      expectedData: 'Revision history list for specified audit log item',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-AUDIT-3',
      category: 'AUDIT',
      categoryLabel: 'Audit Logs',
      apiName: 'Get Audit Log Details List',
      endpoint: 'api/SuperAdminAuditLog/GetAuditLogDetailsList',
      method: 'POST',
      payload: { versionIDs: [], categories: 'Organization' },
      expectedData: 'Array of detailed audit field comparison values',
      status: 'IDLE',
      matched: false
    },

    // 6. DEPARTMENTS
    {
      id: 'SA-DEPT-1',
      category: 'DEPARTMENT',
      categoryLabel: 'Departments',
      apiName: 'Department Advanced Search (Grid)',
      endpoint: 'api/department/getadvsearch',
      method: 'POST',
      payload: { CODE: '', NAME: '', STATUS: '-1' },
      expectedData: 'Array of DEPARTMENT records with CODE, NAME, STATUS',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-DEPT-2',
      category: 'DEPARTMENT',
      categoryLabel: 'Departments',
      apiName: 'Fetch All Departments',
      endpoint: 'api/department/getdepartments/-1/-1',
      method: 'GET',
      payload: { name: '-1', id: '-1' },
      expectedData: 'Array of all system departments',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-DEPT-3',
      category: 'DEPARTMENT',
      categoryLabel: 'Departments',
      apiName: 'Fetch Department By ID',
      endpoint: 'api/department/getdepartmentbyid/{id}',
      method: 'GET',
      payload: { id: context.firstDeptId },
      expectedData: 'DEPARTMENT object with department details',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-DEPT-4',
      category: 'DEPARTMENT',
      categoryLabel: 'Departments',
      apiName: 'Insert Department',
      endpoint: 'api/department/insert',
      method: 'POST',
      payload: { CODE: 'TEST_DEPT', NAME: 'Test Department Auto', STATUS: 1, RECORD_STATE: 101, ORGANIZATION_ID: context.firstOrgId },
      expectedData: 'FrameworkResponse confirming department insert',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-DEPT-5',
      category: 'DEPARTMENT',
      categoryLabel: 'Departments',
      apiName: 'Update Department',
      endpoint: 'api/department/update',
      method: 'POST',
      payload: { ID: context.firstDeptId, CODE: 'TEST_DEPT', NAME: 'Test Department Updated', STATUS: 1, RECORD_STATE: 101, ORGANIZATION_ID: context.firstOrgId },
      expectedData: 'FrameworkResponse confirming department update',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-DEPT-6',
      category: 'DEPARTMENT',
      categoryLabel: 'Departments',
      apiName: 'Delete Department',
      endpoint: 'api/department/delete/{id}',
      method: 'GET',
      payload: { id: context.firstDeptId },
      expectedData: 'FrameworkResponse confirming department deletion',
      status: 'IDLE',
      matched: false
    },

    // 7. ROLES & PRIVILEGES
    {
      id: 'SA-ROLE-1',
      category: 'ROLE',
      categoryLabel: 'Roles & Privs',
      apiName: 'Role Advanced Search (Grid)',
      endpoint: 'api/role/getadvsearch',
      method: 'POST',
      payload: { Role_Name: '', Record_State: 101, HasStatus: true },
      expectedData: 'Array of ROLE records with ROLE_NAME, STATUS, CODE',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ROLE-2',
      category: 'ROLE',
      categoryLabel: 'Roles & Privs',
      apiName: 'Fetch All Roles',
      endpoint: 'api/role/getroles/-1',
      method: 'GET',
      payload: { name: '-1' },
      expectedData: 'Array of system roles',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ROLE-3',
      category: 'ROLE',
      categoryLabel: 'Roles & Privs',
      apiName: 'Fetch Active Roles',
      endpoint: 'api/appuser/getactiveroles',
      method: 'GET',
      payload: null,
      expectedData: 'Array of active role entities',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ROLE-4',
      category: 'ROLE',
      categoryLabel: 'Roles & Privs',
      apiName: 'Fetch Role By ID',
      endpoint: 'api/role/getrolebyid/{id}',
      method: 'GET',
      payload: { id: context.firstRoleId },
      expectedData: 'ROLE object with role attributes and permissions',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ROLE-5',
      category: 'ROLE',
      categoryLabel: 'Roles & Privs',
      apiName: 'Fetch System Modules',
      endpoint: 'api/role/getmodules',
      method: 'GET',
      payload: null,
      expectedData: 'Array of MODULE objects for permissions matrix',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ROLE-6',
      category: 'ROLE',
      categoryLabel: 'Roles & Privs',
      apiName: 'Fetch Role Privileges By Role ID',
      endpoint: 'api/role/getroleprivileges/{id}',
      method: 'GET',
      payload: { id: context.firstRoleId },
      expectedData: 'Array of ROLE_PRIVILEGE records',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ROLE-7',
      category: 'ROLE',
      categoryLabel: 'Roles & Privs',
      apiName: 'Insert Role',
      endpoint: 'api/role/insert',
      method: 'POST',
      payload: {
        Role_Name: 'Test Super Admin Role',
        Status: true,
        HasIST: true,
        HasEAP: true,
        HasGRANTS: true,
        HasCME: true,
        HasCharity: true,
        HasSponsership: true,
        HasAnalytics: false,
        lstGen: [],
        lstIST: [],
        lstEAP: [],
        lstGrants: [],
        lstAnalytics: []
      },
      expectedData: 'FrameworkResponse confirming role creation',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ROLE-8',
      category: 'ROLE',
      categoryLabel: 'Roles & Privs',
      apiName: 'Update Role',
      endpoint: 'api/role/update',
      method: 'POST',
      payload: {
        Role_ID: context.firstRoleId,
        Role_Name: 'Test Super Admin Role Updated',
        Status: true,
        HasIST: true,
        HasEAP: true,
        HasGRANTS: true,
        HasCME: true,
        HasCharity: true,
        HasSponsership: true,
        HasAnalytics: false,
        lstGen: [],
        lstIST: [],
        lstEAP: [],
        lstGrants: [],
        lstAnalytics: []
      },
      expectedData: 'FrameworkResponse confirming role update',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ROLE-9',
      category: 'ROLE',
      categoryLabel: 'Roles & Privs',
      apiName: 'Assign Role Privileges',
      endpoint: 'api/role/insertroleprivilege',
      method: 'POST',
      payload: [{ ROLE_ID: context.firstRoleId, FEATURE_ID: '102', PERMISSION_ID: 1, ACCESS_LEVEL: 1, RECORD_STATE: 101, ORGANIZATION_ID: context.firstOrgId, isExisting: false }],
      expectedData: 'FrameworkResponse confirming privilege assignment',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-ROLE-10',
      category: 'ROLE',
      categoryLabel: 'Roles & Privs',
      apiName: 'Delete Role',
      endpoint: 'api/role/delete/{id}',
      method: 'GET',
      payload: { id: context.firstRoleId },
      expectedData: 'FrameworkResponse confirming role deletion',
      status: 'IDLE',
      matched: false
    },

    // 8. USER MANAGEMENT
    {
      id: 'SA-USER-1',
      category: 'USER',
      categoryLabel: 'Users',
      apiName: 'Users Advanced Search (Grid)',
      endpoint: 'api/appuser/getadvsearch',
      method: 'POST',
      payload: { CODE: '', TITLE: '', EMAIL: '', DEPARTMENT_ID: '', ROLEID: '', Status: true, RECORD_STATE: 101, ORGANIZATION_ID: context.firstOrgId },
      expectedData: 'Array of user accounts',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-USER-2',
      category: 'USER',
      categoryLabel: 'Users',
      apiName: 'Fetch User By ID',
      endpoint: 'api/appuser/getuserbyid/{id}',
      method: 'GET',
      payload: { id: context.loggedInUserId },
      expectedData: 'USERS entity with user profile details',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-USER-3',
      category: 'USER',
      categoryLabel: 'Users',
      apiName: 'Fetch Support User By ID',
      endpoint: 'api/appuser/getsupportuserbyid/{id}',
      method: 'GET',
      payload: { id: context.firstUserId },
      expectedData: 'Support user details object',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-USER-4',
      category: 'USER',
      categoryLabel: 'Users',
      apiName: 'Fetch Internal Users',
      endpoint: 'api/appuser/getinternalusers',
      method: 'GET',
      payload: null,
      expectedData: 'Array of internal system USERS',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-USER-5',
      category: 'USER',
      categoryLabel: 'Users',
      apiName: 'Insert User',
      endpoint: 'api/appuser/insert',
      method: 'POST',
      payload: {
        FIRST_NAME: 'Test',
        LAST_NAME: 'User',
        EMAIL: 'test.user@scimaxglobal.com',
        CODE: 'dummy',
        USER_TYPE: 'I',
        Status: true,
        CreatedUserType: 'SUPERADMIN',
        ORGANIZATION_ID: context.firstOrgId,
        AUTH_ID: '0',
        RECORD_STATE: 1
      },
      expectedData: 'FrameworkResponse confirming user creation',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-USER-6',
      category: 'USER',
      categoryLabel: 'Users',
      apiName: 'Update User',
      endpoint: 'api/appuser/update',
      method: 'POST',
      payload: {
        ID: context.firstUserId,
        FIRST_NAME: 'Super',
        LAST_NAME: 'Admin',
        EMAIL: 'superadmin@scimaxglobal.com',
        Status: true,
        CreatedUserType: 'SUPERADMIN',
        ORGANIZATION_ID: context.firstOrgId,
        RECORD_STATE: 1
      },
      expectedData: 'FrameworkResponse confirming user update',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-USER-7',
      category: 'USER',
      categoryLabel: 'Users',
      apiName: 'Resend User Invitation Email',
      endpoint: 'api/appuser/resenduseremail/{userId}/{orgId}',
      method: 'GET',
      payload: { userId: context.loggedInUserId, orgId: context.firstOrgId },
      expectedData: 'FrameworkResponse confirming email dispatch',
      status: 'IDLE',
      matched: false
    },
    {
      id: 'SA-USER-8',
      category: 'USER',
      categoryLabel: 'Users',
      apiName: 'Delete User',
      endpoint: 'api/appuser/delete/{id}',
      method: 'GET',
      payload: { id: context.firstUserId },
      expectedData: 'FrameworkResponse confirming user deletion',
      status: 'IDLE',
      matched: false
    }
  ];

  items.forEach(item => {
    item.customPayloadJson = item.payload ? JSON.stringify(item.payload, null, 2) : '';
  });

  return items;
}
