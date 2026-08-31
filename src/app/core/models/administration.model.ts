export interface ProgramCategoryItem {
  ID: string;
  CODE?: string;
  NAME: string;
  PROGRAM_ID: string;
  PROGRAM_NAME: string;
  DESCRIPTION?: string;
  ACTIVECHECK: boolean;
  RECORD_STATE: number;
  IS_FUND_SUPPORT: boolean;
  IS_PRODUCT_SUPPORT: boolean;
  SUPPORTS: string;
  PRODUCT_ID: string[];
  MAPPED_PRODUCTS: string;
  MAPPEDPRODUCTNAME: string;
  ApplicationType: string[];
  MappedAppTypesIDs: string;
  MappedAppTypesNames: string;
  RecordStatus: 'Active' | 'Inactive';
}

export interface ProgramOption {
  value: string;
  label: string;
}

export interface ProductOption {
  value: string;
  label: string;
  customClass?: string;
}

export interface ApplicationTypeOption {
  value: string;
  label: string;
  programId: string;
  IsActive: boolean;
  customClass?: string;
}

export interface UserItem {
  id: string;
  username: string;
  email: string;
  phone: string;
  department: string;
  departments: string[];
  role: string;
  roleId?: string;
  authType: string;
  active: boolean;
  userType?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  designation?: string;
  raw?: any;
}

export interface DepartmentItem {
  id: string;
  code?: string;
  name: string;
  associatedDepartment: string;
  parentId?: string;
  inchargeId?: string;
  description?: string;
  active: boolean;
  raw?: any;
}

export interface UserRoleItem {
  id: string;
  code?: string;
  name: string;
  description: string;
  active: boolean;
  modulePermissions: {
    general: { name: string; enabled: boolean; code?: string }[];
    ist: { name: string; enabled: boolean; code?: string }[];
    eap: { name: string; enabled: boolean; code?: string }[];
    grants: { name: string; enabled: boolean; code?: string }[];
    analytics: { name: string; enabled: boolean; code?: string }[];
  };
  raw?: any;
}

export interface EmailAccountItem {
  id: string;
  email: string;
  displayName: string;
  smtpHost: string;
  port: number;
  username: string;
  password?: string;
  enableSsl: boolean;
  active: boolean;
  accountType?: string;
  rawConfig?: any;
}

export interface OrganizationSettings {
  accountActivity: string;
  correspondence: string;
  timeZone: string;
  currency: string;
  loginScreenText: string;
  activeFont: string;
  activeFontSize: string;
  activeFormat: string;
}

