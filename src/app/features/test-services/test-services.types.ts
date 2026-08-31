export type TestModuleType = 'SUPERADMIN' | 'ADMINISTRATION' | 'COMMON' | 'EAP' | 'IST' | 'GRANTS' | 'UM';

export interface DetailedTestItem {
  id: string;
  category: string;
  categoryLabel: string;
  apiName: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload: any;
  expectedData: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED';
  statusCode?: number | string;
  response?: any;
  error?: any;
  matched: boolean;
  durationMs?: number;
  expanded?: boolean;
  customPayloadJson?: string;
  isEditingPayload?: boolean;
  jsonValidationError?: string | null;
}

export interface ConsoleLogEntry {
  timestamp: string;
  level: 'info' | 'success' | 'warn' | 'error';
  message: string;
  data?: any;
}

export interface CategoryTab {
  key: string;
  label: string;
  icon: string;
}

export interface TestContextIds {
  loggedInUserId: string;
  firstOrgId: string;
  firstAuthId: string;
  firstDeptId: string;
  firstRoleId: string;
  firstUserId: string;
  firstProgId: string;
  firstProductId: string;
}
