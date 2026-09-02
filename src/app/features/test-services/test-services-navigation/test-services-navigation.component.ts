import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CategoryTab, TestContextIds } from '../test-services.types';
import { getSuperAdminTestItems, SUPERADMIN_CATEGORIES } from '../test-services-superadmin.data';
import { getAdministrationTestItems, ADMIN_CATEGORIES } from '../test-services-admin.data';
import { getCommonTestItems, COMMON_CATEGORIES } from '../test-services-common.data';
import { getEapTestItems, EAP_CATEGORIES } from '../test-services-eap.data';
import { getIstTestItems, IST_CATEGORIES } from '../test-services-ist.data';
import { getGrantsTestItems, GRANTS_CATEGORIES } from '../test-services-grants.data';
import { getUmTestItems, UM_CATEGORIES } from '../test-services-um.data';

export interface TestSuiteSummary {
  moduleCount: number;
  moduleLabel: string;
  apiCount: number;
}

import { TopUserToolbarComponent } from '../../../layout/top-user-toolbar/top-user-toolbar.component';

@Component({
  selector: 'app-test-services-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, TopUserToolbarComponent],
  templateUrl: './test-services-navigation.component.html',
  styleUrl: './test-services-navigation.component.scss'
})
export class TestServicesNavigationComponent {

  private dummyContext: TestContextIds = {
    loggedInUserId: '1EA31513E4C24BD1B27F5DB4096655BC',
    firstOrgId: 'ae16f95d-494f-4937-ab44-2e05bf736ee4',
    firstAuthId: '1',
    firstDeptId: '1',
    firstRoleId: '1',
    firstUserId: '1',
    firstProgId: '1',
    firstProductId: '1'
  };

  // Dynamic accurate metrics for Superadmin test suite
  public superadminMetrics: TestSuiteSummary = {
    moduleCount: SUPERADMIN_CATEGORIES.filter((c: CategoryTab) => c.key !== 'ALL').length,
    moduleLabel: 'Modules',
    apiCount: getSuperAdminTestItems(undefined, undefined, undefined, undefined, this.dummyContext).length
  };

  // Dynamic accurate metrics for Administration test suite
  public administrationMetrics: TestSuiteSummary = {
    moduleCount: ADMIN_CATEGORIES.filter((c: CategoryTab) => c.key !== 'ALL').length,
    moduleLabel: 'Domains',
    apiCount: getAdministrationTestItems(this.dummyContext).length
  };

  // Dynamic accurate metrics for Common test suite
  public commonMetrics: TestSuiteSummary = {
    moduleCount: COMMON_CATEGORIES.filter((c: CategoryTab) => c.key !== 'ALL').length,
    moduleLabel: 'Domains',
    apiCount: getCommonTestItems(this.dummyContext).length
  };

  // Dynamic accurate metrics for EAP test suite
  public eapMetrics: TestSuiteSummary = {
    moduleCount: EAP_CATEGORIES.filter((c: CategoryTab) => c.key !== 'ALL').length,
    moduleLabel: 'Domains',
    apiCount: getEapTestItems(this.dummyContext).length
  };

  // Dynamic accurate metrics for IST test suite
  public istMetrics: TestSuiteSummary = {
    moduleCount: IST_CATEGORIES.filter((c: CategoryTab) => c.key !== 'ALL').length,
    moduleLabel: 'Domains',
    apiCount: getIstTestItems(this.dummyContext).length
  };

  // Dynamic accurate metrics for Grants test suite
  public grantsMetrics: TestSuiteSummary = {
    moduleCount: GRANTS_CATEGORIES.filter((c: CategoryTab) => c.key !== 'ALL').length,
    moduleLabel: 'Domains',
    apiCount: getGrantsTestItems(this.dummyContext).length
  };

  // Dynamic accurate metrics for UM test suite
  public umMetrics: TestSuiteSummary = {
    moduleCount: UM_CATEGORIES.filter((c: CategoryTab) => c.key !== 'ALL').length,
    moduleLabel: 'Domains',
    apiCount: getUmTestItems(this.dummyContext).length
  };

  constructor(private router: Router) {}

  public get superadminCountText(): string {
    return `${this.superadminMetrics.moduleCount} ${this.superadminMetrics.moduleLabel} • ${this.superadminMetrics.apiCount} APIs`;
  }

  public get administrationCountText(): string {
    return `${this.administrationMetrics.moduleCount} ${this.administrationMetrics.moduleLabel} • ${this.administrationMetrics.apiCount} APIs`;
  }

  public get commonCountText(): string {
    return `${this.commonMetrics.moduleCount} ${this.commonMetrics.moduleLabel} • ${this.commonMetrics.apiCount} APIs`;
  }

  public get eapCountText(): string {
    return `${this.eapMetrics.moduleCount} ${this.eapMetrics.moduleLabel} • ${this.eapMetrics.apiCount} APIs`;
  }

  public get istCountText(): string {
    return `${this.istMetrics.moduleCount} ${this.istMetrics.moduleLabel} • ${this.istMetrics.apiCount} APIs`;
  }

  public get grantsCountText(): string {
    return `${this.grantsMetrics.moduleCount} ${this.grantsMetrics.moduleLabel} • ${this.grantsMetrics.apiCount} APIs`;
  }

  public get umCountText(): string {
    return `${this.umMetrics.moduleCount} ${this.umMetrics.moduleLabel} • ${this.umMetrics.apiCount} APIs`;
  }

  public navigateTo(target: string): void {
    this.router.navigate(['/test-services', target]);
  }
}
