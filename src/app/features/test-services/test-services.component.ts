import { Component, OnInit, ChangeDetectorRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {
  SuperAdminTestRunnerService,
  AdminTestRunnerService,
  CommonTestRunnerService,
  EapTestRunnerService,
  IstTestRunnerService,
  GrantsTestRunnerService,
  UmTestRunnerService
} from '../../TestServices';

import {
  CategoryTab,
  ConsoleLogEntry,
  DetailedTestItem,
  ExecutionMode,
  TestContextIds,
  TestModuleType
} from './test-services.types';

import {
  SUPERADMIN_CATEGORIES,
  SUPERADMIN_CREDENTIALS,
  SUPERADMIN_INSERT_ORG_PAYLOAD,
  SUPERADMIN_SMTP_PAYLOAD,
  SUPERADMIN_VALIDATE_LOGI_PAYLOAD,
  getSuperAdminTestItems
} from './test-services-superadmin.data';

import { ADMIN_CATEGORIES, getAdministrationTestItems } from './test-services-admin.data';
import { COMMON_CATEGORIES, getCommonTestItems } from './test-services-common.data';
import { EAP_CATEGORIES, getEapTestItems } from './test-services-eap.data';
import { IST_CATEGORIES, getIstTestItems } from './test-services-ist.data';
import { GRANTS_CATEGORIES, getGrantsTestItems } from './test-services-grants.data';
import { UM_CATEGORIES, getUmTestItems } from './test-services-um.data';

// Re-export types so consumers importing from this file directly continue working
export * from './test-services.types';

import { TopUserToolbarComponent } from '../../layout/top-user-toolbar/top-user-toolbar.component';

@Component({
  selector: 'app-test-services',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TopUserToolbarComponent],
  templateUrl: './test-services.component.html',
  styleUrl: './test-services.component.scss'
})
export class TestServicesComponent implements OnInit {
  public activeModule: TestModuleType = 'SUPERADMIN';

  // ==================== REACTIVE ANGULAR SIGNALS ====================
  public testItemsSignal = signal<DetailedTestItem[]>([]);
  public isRunningAllSignal = signal<boolean>(false);
  public isRunningSelectedSignal = signal<boolean>(false);
  public isStoppingSignal = signal<boolean>(false);
  public selectedCategorySignal = signal<string>('ALL');
  public filterStatusSignal = signal<string>('ALL');
  public searchQuerySignal = signal<string>('');
  public activeTabSignal = signal<'cards' | 'logs'>('cards');
  public autoRunOnLoadSignal = signal<boolean>(localStorage.getItem('test_autorun_enabled') === 'true');
  public executionModeSignal = signal<ExecutionMode>((localStorage.getItem('test_execution_mode') as ExecutionMode) || 'sequential');
  public totalDurationSignal = signal<number>(0);
  public consoleLogsSignal = signal<ConsoleLogEntry[]>([]);

  private cancelRequested = false;

  // ==================== COMPUTED SIGNALS ====================
  public filteredItemsSignal = computed(() => {
    const items = this.testItemsSignal();
    const cat = this.selectedCategorySignal();
    const status = this.filterStatusSignal();
    const query = this.searchQuerySignal().toLowerCase().trim();

    return items.filter(item => {
      const matchCat = cat === 'ALL' || item.category === cat;
      const matchStatus =
        status === 'ALL' ||
        (status === 'SUCCESS' && item.status === 'SUCCESS' && item.matched) ||
        (status === 'FAILED' && (item.status === 'FAILED' || (item.status === 'SUCCESS' && !item.matched))) ||
        (status === 'PENDING' && (item.status === 'PENDING' || item.status === 'RUNNING')) ||
        (status === 'IDLE' && item.status === 'IDLE');

      const matchSearch =
        !query ||
        item.apiName.toLowerCase().includes(query) ||
        item.endpoint.toLowerCase().includes(query) ||
        item.method.toLowerCase().includes(query);

      return matchCat && matchStatus && matchSearch;
    });
  });

  public totalCountSignal = computed(() => this.testItemsSignal().length);
  public successCountSignal = computed(() => this.testItemsSignal().filter(t => t.status === 'SUCCESS' && t.matched).length);
  public failedCountSignal = computed(() => this.testItemsSignal().filter(t => t.status === 'FAILED' || (t.status === 'SUCCESS' && !t.matched)).length);
  public pendingCountSignal = computed(() => this.testItemsSignal().filter(t => t.status === 'PENDING' || t.status === 'RUNNING').length);
  public successRateSignal = computed(() => {
    const total = this.totalCountSignal();
    return total === 0 ? 0 : Math.round((this.successCountSignal() / total) * 100);
  });
  public selectedItemsSignal = computed(() => this.testItemsSignal().filter(t => t.selected));
  public selectedCountSignal = computed(() => this.selectedItemsSignal().length);
  public allFilteredSelectedSignal = computed(() => {
    const list = this.filteredItemsSignal();
    return list.length > 0 && list.every(item => item.selected);
  });
  public isSomeFilteredSelectedSignal = computed(() => {
    const list = this.filteredItemsSignal();
    const selCount = list.filter(item => item.selected).length;
    return selCount > 0 && selCount < list.length;
  });

  public activeCategoryLabelSignal = computed(() => {
    const key = this.selectedCategorySignal();
    if (key === 'ALL') return 'All Services';
    const found = this.dynamicCategories.find(c => c.key === key);
    return found ? found.label : key;
  });
  public get activeCategoryLabel(): string {
    return this.activeCategoryLabelSignal();
  }

  // ==================== GETTERS & SETTERS FOR TEMPLATES & BINDINGS ====================
  public get testItems(): DetailedTestItem[] { return this.testItemsSignal(); }
  public set testItems(val: DetailedTestItem[]) { this.testItemsSignal.set(val); this.notifyStateChange(); }

  public get filteredItems(): DetailedTestItem[] { return this.filteredItemsSignal(); }
  public get totalCount(): number { return this.totalCountSignal(); }
  public get successCount(): number { return this.successCountSignal(); }
  public get failedCount(): number { return this.failedCountSignal(); }
  public get pendingCount(): number { return this.pendingCountSignal(); }
  public get successRate(): number { return this.successRateSignal(); }
  public get selectedItems(): DetailedTestItem[] { return this.selectedItemsSignal(); }
  public get selectedCount(): number { return this.selectedCountSignal(); }
  public get allFilteredSelected(): boolean { return this.allFilteredSelectedSignal(); }
  public get isSomeFilteredSelected(): boolean { return this.isSomeFilteredSelectedSignal(); }

  public get isRunningAll(): boolean { return this.isRunningAllSignal(); }
  public set isRunningAll(v: boolean) { this.isRunningAllSignal.set(v); this.cdr.markForCheck(); }

  public get isRunningSelected(): boolean { return this.isRunningSelectedSignal(); }
  public set isRunningSelected(v: boolean) { this.isRunningSelectedSignal.set(v); this.cdr.markForCheck(); }

  public get isStopping(): boolean { return this.isStoppingSignal(); }
  public set isStopping(v: boolean) { this.isStoppingSignal.set(v); this.cdr.markForCheck(); }

  public get selectedCategory(): string { return this.selectedCategorySignal(); }
  public set selectedCategory(v: string) { this.selectedCategorySignal.set(v); this.cdr.markForCheck(); }

  public get filterStatus(): string { return this.filterStatusSignal(); }
  public set filterStatus(v: string) { this.filterStatusSignal.set(v); this.cdr.markForCheck(); }

  public get searchQuery(): string { return this.searchQuerySignal(); }
  public set searchQuery(v: string) { this.searchQuerySignal.set(v); this.cdr.markForCheck(); }

  public get activeTab(): 'cards' | 'logs' { return this.activeTabSignal(); }
  public set activeTab(v: 'cards' | 'logs') { this.activeTabSignal.set(v); this.cdr.markForCheck(); }

  public get autoRunOnLoad(): boolean { return this.autoRunOnLoadSignal(); }
  public set autoRunOnLoad(v: boolean) { this.autoRunOnLoadSignal.set(v); }

  public get executionMode(): ExecutionMode { return this.executionModeSignal(); }
  public set executionMode(v: ExecutionMode) { this.executionModeSignal.set(v); }

  public get totalDuration(): number { return this.totalDurationSignal(); }
  public set totalDuration(v: number) { this.totalDurationSignal.set(v); this.cdr.markForCheck(); }

  public get consoleLogs(): ConsoleLogEntry[] { return this.consoleLogsSignal(); }
  public set consoleLogs(v: ConsoleLogEntry[]) { this.consoleLogsSignal.set(v); this.cdr.markForCheck(); }

  /**
   * Triggers an immediate reactive state update and forces Angular change detection
   */
  public notifyStateChange(): void {
    this.testItemsSignal.update(items => [...items]);
    this.cdr.detectChanges();
  }

  // Swagger Global Auth State
  public isAuthModalOpen: boolean = false;
  public authTokenInput: string = '';
  public authSuccessMessage: string = '';

  public get currentAuthToken(): string {
    return (
      localStorage.getItem('token') ||
      localStorage.getItem('_auth_') ||
      sessionStorage.getItem('token') ||
      sessionStorage.getItem('_auth_') ||
      localStorage.getItem('jwt_token') ||
      sessionStorage.getItem('jwt_token') ||
      ''
    );
  }

  public get isAuthorized(): boolean {
    return !!this.currentAuthToken && this.currentAuthToken.trim().length > 0;
  }

  public openAuthModal(): void {
    this.authTokenInput = this.currentAuthToken;
    this.authSuccessMessage = '';
    this.isAuthModalOpen = true;
  }

  public closeAuthModal(): void {
    this.isAuthModalOpen = false;
    this.authSuccessMessage = '';
  }

  public saveAuthorization(): void {
    let cleanToken = (this.authTokenInput || '').trim();
    if (cleanToken.toLowerCase().startsWith('bearer ')) {
      cleanToken = cleanToken.substring(7).trim();
    }

    if (cleanToken) {
      localStorage.setItem('token', cleanToken);
      localStorage.setItem('_auth_', cleanToken);
      localStorage.setItem('jwt_token', cleanToken);
      localStorage.setItem('app_is_authenticated', 'true');
      sessionStorage.setItem('token', cleanToken);
      sessionStorage.setItem('_auth_', cleanToken);
      sessionStorage.setItem('jwt_token', cleanToken);
      sessionStorage.setItem('app_is_authenticated', 'true');
      this.authSuccessMessage = 'Authorization token saved! Passed to all subsequent API requests.';
      this.addLog('success', `Swagger Global Auth updated: Bearer ${cleanToken.substring(0, 15)}...`);
    } else {
      this.clearAuthorization();
    }
  }

  public clearAuthorization(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('_auth_');
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('app_is_authenticated');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('_auth_');
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('app_is_authenticated');
    this.authTokenInput = '';
    this.authSuccessMessage = 'Authorization token cleared.';
    this.addLog('info', 'Swagger Global Auth cleared.');
  }

  public autoGenerateToken(): void {
    // Generate valid mock JWT for development/testing if no backend session
    const mockPayload = {
      sub: this.contextIds.loggedInUserId,
      name: 'Super Admin',
      role: 'Super Admin',
      orgCode: 'DEFAULT',
      exp: Math.floor(Date.now() / 1000) + 86400
    };
    const generated = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + btoa(JSON.stringify(mockPayload)) + '.mock_signature_' + Date.now();
    this.authTokenInput = generated;
    this.saveAuthorization();
  }

  // Super Admin Default Test Payloads & Credentials
  public readonly testCredentials = SUPERADMIN_CREDENTIALS;
  public readonly testSmtpPayload = SUPERADMIN_SMTP_PAYLOAD;
  public readonly testValidateLogiPayload = SUPERADMIN_VALIDATE_LOGI_PAYLOAD;
  public readonly testInsertOrgPayload = SUPERADMIN_INSERT_ORG_PAYLOAD;

  // Shared Context / State IDs for dynamic test chained data
  public contextIds: TestContextIds = {
    loggedInUserId: '1EA31513E4C24BD1B27F5DB4096655BC',
    firstOrgId: '1',
    firstAuthId: '1',
    firstDeptId: '1',
    firstRoleId: '1',
    firstUserId: '1',
    firstProgId: '1',
    firstProductId: '1'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private superTestRunner: SuperAdminTestRunnerService,
    private adminTestRunner: AdminTestRunnerService,
    private commonTestRunner: CommonTestRunnerService,
    private eapTestRunner: EapTestRunnerService,
    private istTestRunner: IstTestRunnerService,
    private grantsTestRunner: GrantsTestRunnerService,
    private umTestRunner: UmTestRunnerService
  ) {}

  ngOnInit(): void {
    // Check route URL segments
    this.route.url.subscribe(segments => {
      const path = segments.map(s => s.path).join('/').toLowerCase();
      if (path.includes('superadmin')) {
        this.selectModule('SUPERADMIN', false);
      } else if (path.includes('administration') || path.includes('admin')) {
        this.selectModule('ADMINISTRATION', false);
      } else if (path.includes('common')) {
        this.selectModule('COMMON', false);
      } else if (path.includes('eap')) {
        this.selectModule('EAP', false);
      } else if (path.includes('ist')) {
        this.selectModule('IST', false);
      } else if (path.includes('grants') || path.includes('grant') || path.includes('gm')) {
        this.selectModule('GRANTS', false);
      } else if (path.includes('um') || path.includes('user-mgmt') || path.includes('usermanagement')) {
        this.selectModule('UM', false);
      } else {
        this.selectModule('SUPERADMIN', false);
      }
    });

    // Check query params if specified
    this.route.queryParams.subscribe(params => {
      const mod = (params['module'] || '').toUpperCase();
      if (mod === 'ADMINISTRATION' || mod === 'ADMIN') {
        this.selectModule('ADMINISTRATION', false);
      } else if (mod === 'SUPERADMIN' || mod === 'SUPER_ADMIN') {
        this.selectModule('SUPERADMIN', false);
      } else if (mod === 'COMMON') {
        this.selectModule('COMMON', false);
      } else if (mod === 'EAP') {
        this.selectModule('EAP', false);
      } else if (mod === 'IST') {
        this.selectModule('IST', false);
      } else if (mod === 'GRANTS' || mod === 'GM') {
        this.selectModule('GRANTS', false);
      } else if (mod === 'UM') {
        this.selectModule('UM', false);
      }
    });

    this.addLog('info', `Test Services initialized in ${this.activeModule} mode.`);

    if (this.autoRunOnLoad) {
      setTimeout(() => {
        this.runAllTests();
      }, 400);
    }
  }

  /**
   * Switch between any of the 7 modules dynamically
   */
  public selectModule(module: TestModuleType, triggerAutoRun: boolean = true): void {
    if (this.activeModule === module && this.testItems.length > 0) return;
    this.activeModule = module;
    this.selectedCategory = 'ALL';
    this.filterStatus = 'ALL';
    this.searchQuery = '';
    this.consoleLogs = [];

    switch (module) {
      case 'SUPERADMIN':
        this.initSuperAdminTestItems();
        this.addLog('info', 'Switched to Superadmin Test Suite.');
        console.log('%c[TEST-SERVICES] Switched to SUPERADMIN Test Runner.', 'color: #06b6d4; font-weight: bold;');
        break;

      case 'ADMINISTRATION':
        this.initAdministrationTestItems();
        this.addLog('info', 'Switched to Administration Test Suite.');
        console.log('%c[TEST-SERVICES] Switched to ADMINISTRATION Test Runner.', 'color: #2563eb; font-weight: bold;');
        break;

      case 'COMMON':
        this.initCommonTestItems();
        this.addLog('info', 'Switched to Common Services Test Suite.');
        console.log('%c[TEST-SERVICES] Switched to COMMON Services Test Runner.', 'color: #8b5cf6; font-weight: bold;');
        break;

      case 'EAP':
        this.initEapTestItems();
        this.addLog('info', 'Switched to EAP Test Suite.');
        console.log('%c[TEST-SERVICES] Switched to EAP Test Runner.', 'color: #059669; font-weight: bold;');
        break;

      case 'IST':
        this.initIstTestItems();
        this.addLog('info', 'Switched to IST Test Suite.');
        console.log('%c[TEST-SERVICES] Switched to IST Test Runner.', 'color: #3b82f6; font-weight: bold;');
        break;

      case 'GRANTS':
        this.initGrantsTestItems();
        this.addLog('info', 'Switched to Grants Test Suite.');
        console.log('%c[TEST-SERVICES] Switched to GRANTS Test Runner.', 'color: #f59e0b; font-weight: bold;');
        break;

      case 'UM':
        this.initUmTestItems();
        this.addLog('info', 'Switched to User Management (UM) Test Suite.');
        console.log('%c[TEST-SERVICES] Switched to UM Test Runner.', 'color: #ec4899; font-weight: bold;');
        break;
    }

    if (triggerAutoRun && this.autoRunOnLoad) {
      setTimeout(() => {
        this.runAllTests();
      }, 250);
    }
  }

  /**
   * Return dynamic category tabs based on active module
   */
  public get dynamicCategories(): CategoryTab[] {
    switch (this.activeModule) {
      case 'SUPERADMIN':
        return SUPERADMIN_CATEGORIES;
      case 'ADMINISTRATION':
        return ADMIN_CATEGORIES;
      case 'COMMON':
        return COMMON_CATEGORIES;
      case 'EAP':
        return EAP_CATEGORIES;
      case 'IST':
        return IST_CATEGORIES;
      case 'GRANTS':
        return GRANTS_CATEGORIES;
      case 'UM':
        return UM_CATEGORIES;
      default:
        return SUPERADMIN_CATEGORIES;
    }
  }

  public get moduleDisplayName(): string {
    switch (this.activeModule) {
      case 'SUPERADMIN': return 'Superadmin';
      case 'ADMINISTRATION': return 'Administration';
      case 'COMMON': return 'Common Services';
      case 'EAP': return 'EAP Services';
      case 'IST': return 'IST Services';
      case 'GRANTS': return 'Grants Services';
      case 'UM': return 'User Management & Activity';
    }
  }

  public get moduleFolderPath(): string {
    switch (this.activeModule) {
      case 'SUPERADMIN': return 'src/app/TestServices/Superadmin';
      case 'ADMINISTRATION': return 'src/app/TestServices/Administration';
      case 'COMMON': return 'src/app/TestServices/Common';
      case 'EAP': return 'src/app/TestServices/Eap';
      case 'IST': return 'src/app/TestServices/Ist';
      case 'GRANTS': return 'src/app/TestServices/Grants';
      case 'UM': return 'src/app/TestServices/Um';
    }
  }

  public get moduleIcon(): string {
    switch (this.activeModule) {
      case 'SUPERADMIN': return 'ph-crown';
      case 'ADMINISTRATION': return 'ph-sliders';
      case 'COMMON': return 'ph-squares-four';
      case 'EAP': return 'ph-first-aid';
      case 'IST': return 'ph-dna';
      case 'GRANTS': return 'ph-currency-circle-dollar';
      case 'UM': return 'ph-users-three';
    }
  }

  // ==================== TEST SUITE INITIALIZERS ====================
  private initSuperAdminTestItems(): void {
    this.testItems = getSuperAdminTestItems(
      this.testCredentials,
      this.testSmtpPayload,
      this.testValidateLogiPayload,
      this.testInsertOrgPayload,
      this.contextIds
    );
  }

  private initAdministrationTestItems(): void {
    this.testItems = getAdministrationTestItems(this.contextIds);
  }

  private initCommonTestItems(): void {
    this.testItems = getCommonTestItems(this.contextIds);
  }

  private initEapTestItems(): void {
    this.testItems = getEapTestItems(this.contextIds);
  }

  private initIstTestItems(): void {
    this.testItems = getIstTestItems(this.contextIds);
  }

  private initGrantsTestItems(): void {
    this.testItems = getGrantsTestItems(this.contextIds);
  }

  private initUmTestItems(): void {
    this.testItems = getUmTestItems(this.contextIds);
  }

  // ==================== TOGGLE & CONFIGURATION HANDLERS ====================
  public toggleAutoRunOnLoad(): void {
    this.autoRunOnLoad = !this.autoRunOnLoad;
    localStorage.setItem('test_autorun_enabled', String(this.autoRunOnLoad));
    this.addLog(
      'info',
      `Auto-Run on Suite Load is now ${this.autoRunOnLoad ? 'ENABLED' : 'DISABLED (Manual Start)'}.`
    );
  }

  public setExecutionMode(mode: ExecutionMode): void {
    this.executionMode = mode;
    localStorage.setItem('test_execution_mode', mode);
    this.addLog(
      'info',
      `Execution Mode set to: ${mode === 'parallel' ? 'PARALLEL (Test multiple at a time)' : 'SEQUENTIAL (One by one)'}.`
    );
  }

  public toggleExecutionMode(): void {
    const nextMode: ExecutionMode = this.executionMode === 'sequential' ? 'parallel' : 'sequential';
    this.setExecutionMode(nextMode);
  }

  // ==================== MULTI-SELECTION & BATCH HELPERS ====================
  public toggleItemSelection(item: DetailedTestItem, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    item.selected = !item.selected;
    this.notifyStateChange();
  }

  public toggleSelectAllFiltered(): void {
    const target = !this.allFilteredSelected;
    this.filteredItems.forEach(item => {
      item.selected = target;
    });
    this.notifyStateChange();
  }

  public selectAllFiltered(): void {
    this.filteredItems.forEach(item => {
      item.selected = true;
    });
    this.notifyStateChange();
    this.addLog('info', `Selected all ${this.filteredItems.length} filtered APIs.`);
  }

  public selectFailedOnly(): void {
    let count = 0;
    this.filteredItems.forEach(item => {
      const isFailed = item.status === 'FAILED' || (item.status === 'SUCCESS' && !item.matched);
      item.selected = isFailed;
      if (isFailed) count++;
    });
    this.notifyStateChange();
    this.addLog('info', `Selected ${count} failed / issue APIs.`);
  }

  public deselectAll(): void {
    this.testItems.forEach(item => {
      item.selected = false;
    });
    this.notifyStateChange();
    this.addLog('info', 'Cleared all selections.');
  }

  public invertSelection(): void {
    this.filteredItems.forEach(item => {
      item.selected = !item.selected;
    });
    this.notifyStateChange();
    this.addLog('info', 'Inverted API selection.');
  }

  // ==================== URL COPY HANDLERS ====================
  public copyApiUrl(item: DetailedTestItem, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const cleanEndpoint = item.endpoint.startsWith('/') ? item.endpoint.substring(1) : item.endpoint;
    navigator.clipboard.writeText(cleanEndpoint);
    item.copiedUrl = true;
    setTimeout(() => {
      item.copiedUrl = false;
    }, 2000);
    this.addLog('info', `Copied API URL: ${cleanEndpoint}`);
  }

  public copyFullApiUrl(item: DetailedTestItem, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const cleanEndpoint = item.endpoint.startsWith('/') ? item.endpoint.substring(1) : item.endpoint;
    const fullUrl = `http://localhost:4074/${cleanEndpoint}`;
    navigator.clipboard.writeText(fullUrl);
    item.copiedUrl = true;
    setTimeout(() => {
      item.copiedUrl = false;
    }, 2000);
    this.addLog('info', `Copied Full API URL: ${fullUrl}`);
  }

  // ==================== STOP / CANCEL EXECUTION ====================
  public stopExecution(): void {
    if (!this.isRunningAll && !this.isRunningSelected) return;
    this.cancelRequested = true;
    this.isStopping = true;
    this.addLog('warn', '🛑 Stop execution requested! Halting remaining API calls...');

    // Revert any pending queued items back to IDLE
    this.testItems.forEach(item => {
      if (item.status === 'PENDING') {
        item.status = 'IDLE';
      }
    });
  }

  // ==================== TEST SUITE EXECUTION ====================
  public async runAllTests(): Promise<void> {
    if (this.isRunningAll || this.isRunningSelected) return;
    const targetItems = this.selectedCategory === 'ALL' ? this.testItems : this.filteredItems;
    if (targetItems.length === 0) {
      this.addLog('warn', 'No API endpoints available in the active category to execute.');
      return;
    }

    this.isRunningAll = true;
    this.cancelRequested = false;
    this.isStopping = false;
    const startTime = performance.now();

    const scopeLabel = this.selectedCategory === 'ALL' ? `${this.activeModule} SUITE` : `${this.activeModule} - ${this.activeCategoryLabel}`;

    this.addLog('info', '=======================================================');
    this.addLog(
      'info',
      `STARTING ${scopeLabel} (${this.executionMode.toUpperCase()} MODE - ${targetItems.length} APIs)`
    );
    this.addLog('info', '=======================================================');

    console.log(
      `%c=======================================================\n` +
      `  STARTING ${scopeLabel} EXECUTION (${this.executionMode.toUpperCase()})\n` +
      `=======================================================`,
      'color: #06b6d4; font-weight: bold; font-size: 15px;'
    );

    // Set all target items to PENDING as they enter the run queue
    targetItems.forEach(t => {
      t.status = 'PENDING';
      t.response = undefined;
      t.error = undefined;
      t.matched = false;
      t.durationMs = undefined;
    });
    this.notifyStateChange();

    if (this.executionMode === 'parallel') {
      // Parallel execution: If Superadmin, ensure login first for session tokens
      if (this.activeModule === 'SUPERADMIN' && !this.cancelRequested) {
        const loginItem = this.testItems.find(t => t.id === 'SA-AUTH-6');
        if (loginItem && (targetItems.includes(loginItem) || !sessionStorage.getItem('token'))) {
          await this.executeSingleTest(loginItem);
        }
      }

      if (!this.cancelRequested) {
        // Execute all other endpoints concurrently at the same time
        const concurrentItems = targetItems.filter(item => {
          if (this.activeModule === 'SUPERADMIN' && (item.id === 'SA-AUTH-6' || item.id === 'SA-AUTH-12')) {
            return false;
          }
          return true;
        });

        await Promise.all(
          concurrentItems.map(item =>
            this.cancelRequested ? Promise.resolve() : this.executeSingleTest(item)
          )
        );
      }

      // Execute logout at the end if Superadmin and in scope
      if (this.activeModule === 'SUPERADMIN' && !this.cancelRequested) {
        const logoutItem = targetItems.find(t => t.id === 'SA-AUTH-12');
        if (logoutItem) {
          await this.executeSingleTest(logoutItem);
        }
      }
    } else {
      // Sequential execution: One after another in order
      if (this.activeModule === 'SUPERADMIN' && !this.cancelRequested) {
        const loginItem = this.testItems.find(t => t.id === 'SA-AUTH-6');
        if (loginItem && (targetItems.includes(loginItem) || !sessionStorage.getItem('token'))) {
          await this.executeSingleTest(loginItem);
        }
      }

      for (const item of targetItems) {
        if (this.cancelRequested) {
          this.addLog('warn', 'Execution halted by user request.');
          break;
        }
        if (this.activeModule === 'SUPERADMIN' && (item.id === 'SA-AUTH-6' || item.id === 'SA-AUTH-12')) continue;
        await this.executeSingleTest(item);
      }

      if (this.activeModule === 'SUPERADMIN' && !this.cancelRequested) {
        const logoutItem = targetItems.find(t => t.id === 'SA-AUTH-12');
        if (logoutItem) {
          await this.executeSingleTest(logoutItem);
        }
      }
    }

    // Clean up any remaining PENDING items back to IDLE if execution was stopped
    if (this.cancelRequested) {
      targetItems.forEach(t => {
        if (t.status === 'PENDING') {
          t.status = 'IDLE';
        }
      });
    }

    this.totalDuration = Math.round(performance.now() - startTime);
    this.isRunningAll = false;
    this.isStopping = false;
    this.notifyStateChange();

    const total = targetItems.length;
    const passed = targetItems.filter(t => t.status === 'SUCCESS' && t.matched).length;
    const failed = targetItems.filter(t => t.status === 'FAILED' || (t.status === 'SUCCESS' && !t.matched)).length;

    const summaryMsg = `${scopeLabel} ${this.cancelRequested ? 'STOPPED' : 'COMPLETE'}: Total ${total} | Passed: ${passed} | Failed/Issues: ${failed} | Time: ${this.totalDuration}ms`;
    this.addLog(failed === 0 && !this.cancelRequested ? 'success' : 'warn', summaryMsg);

    console.log(
      `%c=======================================================\n` +
      `  ${scopeLabel} SUMMARY REPORT\n` +
      `  Total APIs Tested: ${total}\n` +
      `  Passed / Matched:  ${passed}\n` +
      `  Failed / Issues:   ${failed}\n` +
      `  Total Duration:    ${this.totalDuration}ms\n` +
      `  Suite Status:      ${this.cancelRequested ? 'STOPPED BY USER' : (failed === 0 ? 'ALL PASSED' : 'COMPLETED WITH ' + failed + ' ISSUES')}\n` +
      `=======================================================`,
      failed === 0 && !this.cancelRequested
        ? 'color: #10b981; font-weight: bold; font-size: 14px;'
        : 'color: #f59e0b; font-weight: bold; font-size: 14px;'
    );

    console.table(
      targetItems.map(t => ({
        ID: t.id,
        API_Name: t.apiName,
        Method: t.method,
        Endpoint: t.endpoint,
        Status: t.status,
        Matched: t.matched ? 'YES' : 'NO',
        Duration: `${t.durationMs || 0}ms`
      }))
    );
  }

  // ==================== BATCH / SELECTED APIS EXECUTION ====================
  public async runSelectedTests(): Promise<void> {
    if (this.isRunningAll || this.isRunningSelected) return;
    const targets = this.selectedItems;
    if (targets.length === 0) {
      this.addLog('warn', 'No APIs selected. Please check at least one API checkbox to run.');
      return;
    }

    this.isRunningSelected = true;
    this.cancelRequested = false;
    this.isStopping = false;
    const startTime = performance.now();

    this.addLog('info', '=======================================================');
    this.addLog(
      'info',
      `RUNNING ${targets.length} SELECTED APIs (${this.executionMode.toUpperCase()} MODE)`
    );
    this.addLog('info', '=======================================================');

    // Set targets to PENDING
    targets.forEach(t => {
      t.status = 'PENDING';
      t.response = undefined;
      t.error = undefined;
      t.matched = false;
      t.durationMs = undefined;
    });
    this.notifyStateChange();

    if (this.executionMode === 'parallel') {
      // Parallel batch: Run all selected at the same time
      await Promise.all(
        targets.map(item =>
          this.cancelRequested ? Promise.resolve() : this.executeSingleTest(item)
        )
      );
    } else {
      // Sequential batch: Run one by one
      for (const item of targets) {
        if (this.cancelRequested) {
          this.addLog('warn', 'Batch execution halted by user request.');
          break;
        }
        await this.executeSingleTest(item);
      }
    }

    // Clean up any remaining PENDING items back to IDLE if stopped
    if (this.cancelRequested) {
      targets.forEach(t => {
        if (t.status === 'PENDING') {
          t.status = 'IDLE';
        }
      });
    }

    const batchDuration = Math.round(performance.now() - startTime);
    this.isRunningSelected = false;
    this.isStopping = false;
    this.notifyStateChange();

    const total = targets.length;
    const passed = targets.filter(t => t.status === 'SUCCESS' && t.matched).length;
    const failed = targets.filter(t => t.status === 'FAILED' || (t.status === 'SUCCESS' && !t.matched)).length;

    this.addLog(
      failed === 0 && !this.cancelRequested ? 'success' : 'warn',
      `Selected Batch ${this.cancelRequested ? 'Stopped' : 'Finished'}: ${total} APIs | Passed: ${passed} | Failed: ${failed} | Duration: ${batchDuration}ms`
    );
  }

  // ==================== SINGLE API EXECUTION ====================
  public async executeSingleTest(item: DetailedTestItem): Promise<void> {
    item.status = 'RUNNING';
    this.notifyStateChange();
    const start = performance.now();

    try {
      let res: any;
      const effective = this.getEffectivePayload(item);

      switch (this.activeModule) {
        case 'SUPERADMIN':
          res = await this.superTestRunner.executeApiCall(item, effective, this.contextIds);
          break;
        case 'ADMINISTRATION':
          res = await this.adminTestRunner.executeApiCall(item, effective, this.contextIds);
          break;
        case 'COMMON':
          res = await this.commonTestRunner.executeApiCall(item, effective, this.contextIds);
          break;
        case 'EAP':
          res = await this.eapTestRunner.executeApiCall(item, effective, this.contextIds);
          break;
        case 'IST':
          res = await this.istTestRunner.executeApiCall(item, effective, this.contextIds);
          break;
        case 'GRANTS':
          res = await this.grantsTestRunner.executeApiCall(item, effective, this.contextIds);
          break;
        case 'UM':
          res = await this.umTestRunner.executeApiCall(item, effective, this.contextIds);
          break;
      }

      item.durationMs = Math.round(performance.now() - start);
      item.statusCode = 200;
      item.status = 'SUCCESS';
      item.matched = true;
      item.response = res;

      this.logToConsole(item);
      this.addLog('success', `[${item.category}] ${item.apiName} => 200 OK (${item.durationMs}ms)`);
      this.notifyStateChange();

    } catch (err: any) {
      item.durationMs = Math.round(performance.now() - start);
      item.statusCode = err?.status || 'ERR';
      item.status = 'FAILED';
      item.error = err;
      item.response = err?.error || err?.message;
      item.matched = false;

      this.logToConsole(item);
      this.addLog('error', `[${item.category}] ${item.apiName} => FAILED (${item.statusCode}): ${err?.message || 'Unknown error'}`);
      this.notifyStateChange();
    }
  }

  // ==================== LOGGING & HELPERS ====================
  private logToConsole(item: DetailedTestItem): void {
    if (item.status === 'SUCCESS' && item.matched) {
      console.log(
`===== API TEST [${item.categoryLabel}] =====
API Name: ${item.apiName}
Endpoint: ${item.endpoint}
Method: ${item.method}
Payload: ${JSON.stringify(item.payload, null, 2)}
Status: SUCCESS (200 OK)
Duration: ${item.durationMs}ms
Response:`, item.response,
`
Expected Data: ${item.expectedData}
Matched: YES
============================================`
      );
    } else {
      console.error(
`===== API TEST FAILED [${item.categoryLabel}] =====
API Name: ${item.apiName}
Endpoint: ${item.endpoint}
Method: ${item.method}
Status: FAILED (${item.statusCode})
Error:`, item.error || item.response,
`
Expected Data: ${item.expectedData}
Matched: NO
===================================================`
      );
    }
  }

  public toggleExpand(item: DetailedTestItem): void {
    item.expanded = !item.expanded;
    this.notifyStateChange();
  }

  public toggleEditPayload(item: DetailedTestItem): void {
    item.isEditingPayload = !item.isEditingPayload;
    if (item.isEditingPayload && !item.customPayloadJson && item.payload) {
      item.customPayloadJson = JSON.stringify(item.payload, null, 2);
    }
  }

  public formatPayloadJson(item: DetailedTestItem): void {
    try {
      if (item.customPayloadJson && item.customPayloadJson.trim()) {
        const parsed = JSON.parse(item.customPayloadJson);
        item.customPayloadJson = JSON.stringify(parsed, null, 2);
        item.jsonValidationError = null;
      }
    } catch (e: any) {
      item.jsonValidationError = 'Invalid JSON: ' + e.message;
    }
  }

  public resetPayloadJson(item: DetailedTestItem): void {
    item.customPayloadJson = item.payload ? JSON.stringify(item.payload, null, 2) : '';
    item.jsonValidationError = null;
    this.addLog('info', `Reset payload for ${item.apiName} to original defaults.`);
  }

  public validateJson(item: DetailedTestItem): void {
    if (!item.customPayloadJson || !item.customPayloadJson.trim()) {
      item.jsonValidationError = null;
      return;
    }
    try {
      JSON.parse(item.customPayloadJson);
      item.jsonValidationError = null;
    } catch (e: any) {
      item.jsonValidationError = 'Invalid JSON: ' + e.message;
    }
  }

  public getEffectivePayload(item: DetailedTestItem): any {
    if (item.customPayloadJson && item.customPayloadJson.trim()) {
      try {
        return JSON.parse(item.customPayloadJson);
      } catch (e) {
        return item.payload;
      }
    }
    return item.payload;
  }

  public copyJson(data: any): void {
    const json = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(json);
    this.addLog('info', 'Copied JSON to clipboard.');
  }

  public clearLogs(): void {
    this.consoleLogs = [];
    console.clear();
    this.addLog('info', 'Console logs cleared.');
  }

  private addLog(level: 'info' | 'success' | 'warn' | 'error', message: string, data?: any): void {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    this.consoleLogs.unshift({ timestamp, level, message, data });
    if (this.consoleLogs.length > 300) {
      this.consoleLogs.pop();
    }
  }
}
