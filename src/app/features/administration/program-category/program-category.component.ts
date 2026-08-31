import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminProgramCategoryService } from '../../../core/services/admin-program-category.service';
import { ProgramCategoryItem, ProgramOption, ProductOption, ApplicationTypeOption } from '../../../core/models/administration.model';

@Component({
  selector: 'app-program-category',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './program-category.component.html',
  styleUrl: './program-category.component.scss'
})
export class ProgramCategoryComponent {
  private fb = inject(FormBuilder);
  public categoryService = inject(AdminProgramCategoryService);

  // UI State Signals
  public isSearchExpanded = signal<boolean>(false);
  public isModalOpen = signal<boolean>(false);
  public modalMode = signal<'add' | 'edit' | 'view'>('add');
  public activeActionMenuId = signal<string | null>(null);
  public isDeleteModalOpen = signal<boolean>(false);
  public pendingDeleteItem = signal<ProgramCategoryItem | null>(null);
  public bannerMessage = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  // Dropdown Drawer Signals for Multi-Selects
  public showProductDropdown = signal<boolean>(false);
  public showAppTypeDropdown = signal<boolean>(false);
  public productSearchQuery = signal<string>('');
  public appTypeSearchQuery = signal<string>('');

  // Pagination Signals
  public currentPage = signal<number>(1);
  public pageSize = signal<number>(10);

  // Search Filter Form Model Signal
  public searchModel = signal({
    name: '',
    programId: '',
    supports: '',
    mappedProducts: '',
    status: ''
  });

  // Reactive Form for Add / Edit
  public programForm: FormGroup = this.fb.group({
    ID: [''],
    CODE: [''],
    NAME: ['', [Validators.required, Validators.maxLength(100)]],
    ACTIVECHECK: [true],
    PROGRAM_ID: ['', Validators.required],
    IS_PRODUCT_SUPPORT: [false],
    IS_FUND_SUPPORT: [false],
    PRODUCT_ID: [[]],
    ApplicationType: [[], Validators.required],
    DESCRIPTION: ['']
  });

  // Master Lists from Service
  public programOptions = this.categoryService.programOptions;
  public productOptions = this.categoryService.productOptions;
  public applicationTypeOptions = this.categoryService.applicationTypeOptions;

  // Filtered Categories Computed Signal
  public categories = this.categoryService.filteredCategories;
  public totalCount = this.categoryService.totalCount;

  public totalPages = computed(() => {
    return Math.ceil(this.totalCount() / this.pageSize()) || 1;
  });

  public paginatedCategories = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.categories().slice(start, start + this.pageSize());
  });

  // Filtered available application types based on selected program in the modal
  public modalApplicationTypes = computed(() => {
    const selectedProg = this.programForm.get('PROGRAM_ID')?.value;
    if (!selectedProg) return this.applicationTypeOptions;
    return this.applicationTypeOptions.filter(a => a.programId === selectedProg);
  });

  // Filtered products list for dropdown search
  public filteredProductOptions = computed(() => {
    const q = this.productSearchQuery().toLowerCase().trim();
    if (!q) return this.productOptions;
    return this.productOptions.filter(p => p.label.toLowerCase().includes(q));
  });

  // Filtered app types list for dropdown search
  public filteredAppTypeOptions = computed(() => {
    const q = this.appTypeSearchQuery().toLowerCase().trim();
    return this.modalApplicationTypes().filter(a => a.label.toLowerCase().includes(q));
  });

  // Helper method for updating search model signal
  public updateSearchField(field: 'name' | 'programId' | 'supports' | 'mappedProducts' | 'status', val: string): void {
    this.searchModel.update(m => ({ ...m, [field]: val }));
  }

  public toggleAppTypeDropdown(event: MouseEvent): void {
    event.stopPropagation();
    if (this.modalMode() !== 'view') {
      this.showAppTypeDropdown.update(v => !v);
    }
  }

  public toggleProductDropdown(event: MouseEvent): void {
    event.stopPropagation();
    if (this.modalMode() !== 'view') {
      this.showProductDropdown.update(v => !v);
    }
  }

  public updateProductSearch(val: string): void {
    this.productSearchQuery.set(val);
  }

  public updateAppTypeSearch(val: string): void {
    this.appTypeSearchQuery.set(val);
  }

  // Conditional flags for Program support types in modal
  get isIST(): boolean {
    return this.programForm.get('PROGRAM_ID')?.value === '2';
  }

  get isEAP(): boolean {
    return this.programForm.get('PROGRAM_ID')?.value === '5';
  }

  get isGrants(): boolean {
    return this.programForm.get('PROGRAM_ID')?.value === '4';
  }

  get showProductSupportCheckbox(): boolean {
    return this.isIST || this.isEAP;
  }

  get showFundSupportCheckbox(): boolean {
    return this.isIST || this.isGrants;
  }

  get showAvailableProductsField(): boolean {
    return !!this.programForm.get('IS_PRODUCT_SUPPORT')?.value;
  }

  // --- Search Criteria Operations ---
  public toggleSearchCriteria(): void {
    this.isSearchExpanded.update(v => !v);
  }

  public onSearch(): void {
    this.currentPage.set(1);
    this.categoryService.searchFilter.set({ ...this.searchModel() });
  }

  public onClearSearch(): void {
    this.searchModel.set({
      name: '',
      programId: '',
      supports: '',
      mappedProducts: '',
      status: ''
    });
    this.currentPage.set(1);
    this.categoryService.searchFilter.set({
      name: '',
      programId: '',
      supports: '',
      mappedProducts: '',
      status: ''
    });
  }

  public onViewAll(): void {
    this.onClearSearch();
  }

  // --- Modal Operations ---
  public openAddModal(): void {
    this.modalMode.set('add');
    this.programForm.reset({
      ID: '',
      CODE: '',
      NAME: '',
      ACTIVECHECK: true,
      PROGRAM_ID: '2', // Default IST
      IS_PRODUCT_SUPPORT: true,
      IS_FUND_SUPPORT: true,
      PRODUCT_ID: [],
      ApplicationType: [],
      DESCRIPTION: ''
    });
    this.programForm.enable();
    this.showProductDropdown.set(false);
    this.showAppTypeDropdown.set(false);
    this.isModalOpen.set(true);
  }

  public openEditModal(item: ProgramCategoryItem): void {
    this.modalMode.set('edit');
    this.programForm.reset({
      ID: item.ID,
      CODE: item.CODE,
      NAME: item.NAME,
      ACTIVECHECK: item.ACTIVECHECK,
      PROGRAM_ID: item.PROGRAM_ID,
      IS_PRODUCT_SUPPORT: item.IS_PRODUCT_SUPPORT,
      IS_FUND_SUPPORT: item.IS_FUND_SUPPORT,
      PRODUCT_ID: [...item.PRODUCT_ID],
      ApplicationType: [...item.ApplicationType],
      DESCRIPTION: item.DESCRIPTION || ''
    });
    this.programForm.enable();
    this.showProductDropdown.set(false);
    this.showAppTypeDropdown.set(false);
    this.isModalOpen.set(true);
    this.activeActionMenuId.set(null);
  }

  public openViewModal(item: ProgramCategoryItem): void {
    this.modalMode.set('view');
    this.programForm.reset({
      ID: item.ID,
      CODE: item.CODE,
      NAME: item.NAME,
      ACTIVECHECK: item.ACTIVECHECK,
      PROGRAM_ID: item.PROGRAM_ID,
      IS_PRODUCT_SUPPORT: item.IS_PRODUCT_SUPPORT,
      IS_FUND_SUPPORT: item.IS_FUND_SUPPORT,
      PRODUCT_ID: [...item.PRODUCT_ID],
      ApplicationType: [...item.ApplicationType],
      DESCRIPTION: item.DESCRIPTION || ''
    });
    this.programForm.disable();
    this.isModalOpen.set(true);
    this.activeActionMenuId.set(null);
  }

  public onProgramChange(): void {
    const prog = this.programForm.get('PROGRAM_ID')?.value;
    if (prog === '5') {
      // EAP only product support
      this.programForm.patchValue({
        IS_PRODUCT_SUPPORT: true,
        IS_FUND_SUPPORT: false,
        ApplicationType: []
      });
    } else if (prog === '4') {
      // Grants only fund support
      this.programForm.patchValue({
        IS_PRODUCT_SUPPORT: false,
        IS_FUND_SUPPORT: true,
        PRODUCT_ID: [],
        ApplicationType: []
      });
    } else {
      // IST supports both
      this.programForm.patchValue({
        IS_PRODUCT_SUPPORT: true,
        IS_FUND_SUPPORT: true,
        ApplicationType: []
      });
    }
  }

  public onProductSupportToggle(): void {
    const isProd = this.programForm.get('IS_PRODUCT_SUPPORT')?.value;
    if (!isProd) {
      this.programForm.patchValue({ PRODUCT_ID: [] });
    }
  }

  // --- Multi-Select Checkbox Handlers ---
  public toggleProductSelection(prodId: string): void {
    const current: string[] = this.programForm.get('PRODUCT_ID')?.value || [];
    const idx = current.indexOf(prodId);
    if (idx > -1) {
      current.splice(idx, 1);
    } else {
      current.push(prodId);
    }
    this.programForm.patchValue({ PRODUCT_ID: [...current] });
  }

  public isProductSelected(prodId: string): boolean {
    const current: string[] = this.programForm.get('PRODUCT_ID')?.value || [];
    return current.includes(prodId);
  }

  public selectAllProducts(): void {
    const current: string[] = this.programForm.get('PRODUCT_ID')?.value || [];
    if (current.length === this.productOptions.length) {
      this.programForm.patchValue({ PRODUCT_ID: [] });
    } else {
      this.programForm.patchValue({ PRODUCT_ID: this.productOptions.map(p => p.value) });
    }
  }

  public toggleAppTypeSelection(typeId: string): void {
    const current: string[] = this.programForm.get('ApplicationType')?.value || [];
    const idx = current.indexOf(typeId);
    if (idx > -1) {
      current.splice(idx, 1);
    } else {
      current.push(typeId);
    }
    this.programForm.patchValue({ ApplicationType: [...current] });
  }

  public isAppTypeSelected(typeId: string): boolean {
    const current: string[] = this.programForm.get('ApplicationType')?.value || [];
    return current.includes(typeId);
  }

  public selectAllAppTypes(): void {
    const current: string[] = this.programForm.get('ApplicationType')?.value || [];
    const available = this.modalApplicationTypes();
    if (current.length === available.length) {
      this.programForm.patchValue({ ApplicationType: [] });
    } else {
      this.programForm.patchValue({ ApplicationType: available.map(a => a.value) });
    }
  }

  public getSelectedProductsDisplay(): string {
    const ids: string[] = this.programForm.get('PRODUCT_ID')?.value || [];
    if (ids.length === 0) return 'None selected';
    const names = this.productOptions
      .filter(p => ids.includes(p.value))
      .map(p => p.label);
    return names.join(', ');
  }

  public getSelectedAppTypesDisplay(): string {
    const ids: string[] = this.programForm.get('ApplicationType')?.value || [];
    if (ids.length === 0) return 'None selected';
    const names = this.applicationTypeOptions
      .filter(a => ids.includes(a.value))
      .map(a => a.label);
    return names.join(', ');
  }

  // --- Save / Delete / Status Actions ---
  public saveProgramCategory(): void {
    if (this.programForm.invalid) {
      this.programForm.markAllAsTouched();
      this.showBanner('error', 'Please fill all required fields marked with *');
      return;
    }

    const raw = this.programForm.getRawValue();

    // Custom validations from old UI
    if (!raw.IS_PRODUCT_SUPPORT && !raw.IS_FUND_SUPPORT) {
      this.showBanner('error', 'Please select at least one Support Type (Product or Fund)');
      return;
    }

    if (raw.IS_PRODUCT_SUPPORT && (!raw.PRODUCT_ID || raw.PRODUCT_ID.length === 0)) {
      this.showBanner('error', 'Please select at least one Available Product');
      return;
    }

    const res = this.categoryService.saveCategory(raw);
    if (res.status === 0) {
      this.showBanner('success', res.message);
      this.isModalOpen.set(false);
    } else {
      this.showBanner('error', res.message);
    }
  }

  public promptDelete(item: ProgramCategoryItem): void {
    this.pendingDeleteItem.set(item);
    this.isDeleteModalOpen.set(true);
    this.activeActionMenuId.set(null);
  }

  public confirmDelete(): void {
    const item = this.pendingDeleteItem();
    if (item) {
      const res = this.categoryService.deleteCategory(item.ID);
      this.showBanner('success', res.message);
    }
    this.isDeleteModalOpen.set(false);
    this.pendingDeleteItem.set(null);
  }

  public toggleStatus(item: ProgramCategoryItem): void {
    const res = this.categoryService.toggleStatus(item.ID);
    this.showBanner('success', res.message);
    this.activeActionMenuId.set(null);
  }

  public toggleActionMenu(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.activeActionMenuId.update(curr => (curr === id ? null : id));
  }

  private showBanner(type: 'success' | 'error', text: string): void {
    this.bannerMessage.set({ type, text });
    setTimeout(() => {
      this.bannerMessage.set(null);
    }, 3500);
  }
}
