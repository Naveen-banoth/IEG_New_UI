import { Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { UsersComponent } from './users/users.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { DepartmentsComponent } from './departments/departments.component';
import { ProgramCategoryComponent } from './program-category/program-category.component';
import { EmailSetupComponent } from './email-setup/email-setup.component';
import { SettingsComponent } from './settings/settings.component';

export const ADMINISTRATION_ROUTES: Routes = [
  {
    path: '',
    component: AdministrationComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'user-roles',
    component: UserRolesComponent
  },
  {
    path: 'departments',
    component: DepartmentsComponent
  },
  {
    path: 'program-category',
    component: ProgramCategoryComponent
  },
  {
    path: 'email-setup',
    component: EmailSetupComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];
