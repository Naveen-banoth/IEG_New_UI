import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface ShortcutItem {
  title: string;
  route: string;
}

interface AdminSection {
  title: string;
  iconType: 'core' | 'product' | 'instructions' | 'platform' | 'ist' | 'eap' | 'grants' | 'budget';
  countText: string;
  subSections?: {
    header?: string;
    items: ShortcutItem[];
  }[];
  items?: ShortcutItem[];
}

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss'
})
export class AdministrationComponent {
  public searchQuery = '';

  public sections: AdminSection[] = [
    {
      title: 'Core Settings',
      iconType: 'core',
      countText: '5 SHORTCUTS',
      subSections: [
        {
          items: [
            { title: 'Settings', route: '/administration/settings' },
            { title: 'Email Setup', route: '/administration/email-setup' }
          ]
        },
        {
          header: 'USER MANAGEMENT',
          items: [
            { title: 'User Roles', route: '/administration/user-roles' },
            { title: 'Departments', route: '/administration/departments' },
            { title: 'Users', route: '/administration/users' }
          ]
        }
      ]
    },
    {
      title: 'Product Setup',
      iconType: 'product',
      countText: '6 SHORTCUTS',
      items: [
        { title: 'Product Network Locations', route: '/administration/settings' },
        { title: 'Products', route: '/administration/settings' },
        { title: 'Program Category', route: '/administration/program-category' },
        { title: 'List Values', route: '/administration/settings' },
        { title: 'Category and Sub-Category', route: '/administration/settings' },
        { title: 'Review & Approval Title', route: '/administration/settings' }
      ]
    },
    {
      title: 'User Instructions',
      iconType: 'instructions',
      countText: '7 SHORTCUTS',
      items: [
        { title: 'User Instructions', route: '/administration/settings' },
        { title: 'Frequently Asked Questions', route: '/administration/settings' },
        { title: 'Document Templates', route: '/administration/settings' },
        { title: 'Email Templates', route: '/administration/settings' },
        { title: 'ID Configurations', route: '/administration/settings' },
        { title: 'Registration Configuration', route: '/administration/settings' },
        { title: 'Application Types', route: '/administration/settings' }
      ]
    },
    {
      title: 'Platform & Logs',
      iconType: 'platform',
      countText: '4 SHORTCUTS',
      subSections: [
        {
          items: [
            { title: 'Theme Templates', route: '/administration/settings' }
          ]
        },
        {
          header: 'AUDIT LOGS',
          items: [
            { title: 'Administration Logs', route: '/administration/settings' },
            { title: 'Login Logs', route: '/administration/settings' }
          ]
        },
        {
          header: 'ANALYTICS',
          items: [
            { title: 'Dashboards', route: '/ist/dashboard' }
          ]
        }
      ]
    },
    {
      title: 'Investigator Sponsored Trial',
      iconType: 'ist',
      countText: '6 SHORTCUTS',
      items: [
        { title: 'Registrations', route: '/ist/projects' },
        { title: 'Alerts and Notifications', route: '/administration/settings' },
        { title: 'Workflow Setup', route: '/administration/settings' },
        { title: 'Screen Repository', route: '/administration/settings' }
      ]
    },
    {
      title: 'Expanded Access Program',
      iconType: 'eap',
      countText: '6 SHORTCUTS',
      items: [
        { title: 'Registrations', route: '/eap/applications' },
        { title: 'Alerts and Notifications', route: '/administration/settings' },
        { title: 'Workflow Setup', route: '/administration/settings' },
        { title: 'Screen Repository', route: '/administration/settings' }
      ]
    },
    {
      title: 'Grants',
      iconType: 'grants',
      countText: '8 SHORTCUTS',
      items: [
        { title: 'Registrations', route: '/grants/dashboard' },
        { title: 'Alerts and Notifications', route: '/administration/settings' },
        { title: 'Workflow Setup-Charitable', route: '/administration/settings' },
        { title: 'Workflow Setup-Sponsorship', route: '/administration/settings' }
      ]
    },
    {
      title: 'Budget',
      iconType: 'budget',
      countText: '2 SHORTCUTS',
      items: [
        { title: 'Timeline Configuration', route: '/administration/settings' },
        { title: 'Budget Assignment', route: '/administration/settings' }
      ]
    }
  ];
}
