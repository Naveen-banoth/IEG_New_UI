import { Injectable, signal, computed, inject } from '@angular/core';
import { ProgramCategoryItem, ProgramOption, ProductOption, ApplicationTypeOption } from '../models/administration.model';
import { AdminProductSetupService } from '../../TestServices/Administration/admin-product-setup.service';

const STORAGE_KEY = 'scimax_admin_program_categories';

@Injectable({
  providedIn: 'root'
})
export class AdminProgramCategoryService {
  private productSetupService = inject(AdminProductSetupService);

  // Master options
  public readonly programOptions: ProgramOption[] = [
    { value: '2', label: 'Investigator Sponsored Trial' },
    { value: '5', label: 'Expanded Access Program' },
    { value: '4', label: 'Grants' }
  ];

  public readonly productOptions: ProductOption[] = [
    { value: 'PRD-101', label: 'Compound Alpha-9 (Oncology)' },
    { value: 'PRD-102', label: 'Biosimilar Beta-X (Immunology)' },
    { value: 'PRD-103', label: 'CardioShield FX (Cardiovascular)' },
    { value: 'PRD-104', label: 'NeuroVance 250mg (Neurology)' },
    { value: 'PRD-105', label: 'PulmoCare Inhaler (Respiratory)' },
    { value: 'PRD-106', label: 'GeneThera RareDx (Gene Therapy)' }
  ];

  public readonly applicationTypeOptions: ApplicationTypeOption[] = [
    { value: 'APP-1', label: 'Clinical Study (Phase I-IV)', programId: '2', IsActive: true },
    { value: 'APP-2', label: 'Observational / Registry Study', programId: '2', IsActive: true },
    { value: 'APP-3', label: 'Pre-Clinical / Translational Research', programId: '2', IsActive: true },
    { value: 'APP-4', label: 'Single Patient Compassionate Use (IND)', programId: '5', IsActive: true },
    { value: 'APP-5', label: 'Intermediate / Treatment Cohort Protocol', programId: '5', IsActive: true },
    { value: 'APP-6', label: 'Emergency Access Authorization', programId: '5', IsActive: true },
    { value: 'APP-7', label: 'Investigator Educational Grant', programId: '4', IsActive: true },
    { value: 'APP-8', label: 'Scientific Sponsorship & Fellowship', programId: '4', IsActive: true },
    { value: 'APP-9', label: 'Community Healthcare Charitable Support', programId: '4', IsActive: true }
  ];

  // Primary State Signal
  private _categories = signal<ProgramCategoryItem[]>(this.loadInitialData());
  public readonly categories = this._categories.asReadonly();

  // Search Filter Signal
  public searchFilter = signal<{
    name: string;
    programId: string;
    supports: string;
    mappedProducts: string;
    status: string;
  }>({
    name: '',
    programId: '',
    supports: '',
    mappedProducts: '',
    status: ''
  });

  // Filtered Categories Computed Signal
  public filteredCategories = computed(() => {
    const list = this._categories();
    const filter = this.searchFilter();

    return list.filter(item => {
      const matchName = !filter.name || item.NAME.toLowerCase().includes(filter.name.toLowerCase().trim());
      const matchProg = !filter.programId || item.PROGRAM_ID === filter.programId;
      const matchSupports = !filter.supports || filter.supports === 'All' || item.SUPPORTS.toLowerCase().includes(filter.supports.toLowerCase());
      const matchProduct = !filter.mappedProducts || item.MAPPED_PRODUCTS.includes(filter.mappedProducts);
      const matchStatus = !filter.status || filter.status === 'All' || item.RecordStatus === filter.status;

      return matchName && matchProg && matchSupports && matchProduct && matchStatus;
    });
  });

  // Total counts computed signal
  public totalCount = computed(() => this.filteredCategories().length);

  constructor() {
    this.syncFromBackend();
  }

  public syncFromBackend(): void {
    this.productSetupService.getProgramSummary().subscribe({
      next: (res: any) => {
        const records = Array.isArray(res) ? res : (res?.Data && Array.isArray(res.Data) ? res.Data : []);
        if (records.length > 0) {
          const apiItems: ProgramCategoryItem[] = records.map((r: any) => ({
            ID: String(r.ID || r.RecordID || r.PROGRAM_ID),
            CODE: r.CODE || 'PC-' + (r.ID || '001'),
            NAME: r.NAME || r.PROGRAM_NAME || '',
            PROGRAM_ID: String(r.PROGRAM_ID || '2'),
            PROGRAM_NAME: r.PROGRAM_NAME || 'Investigator Sponsored Trial',
            DESCRIPTION: r.DESCRIPTION || '',
            ACTIVECHECK: r.RECORD_STATE === 1 || r.STATUS === 1 || r.ACTIVECHECK === true,
            RECORD_STATE: r.RECORD_STATE ?? (r.STATUS === 1 ? 1 : 0),
            IS_FUND_SUPPORT: !!r.IS_FUND_SUPPORT,
            IS_PRODUCT_SUPPORT: !!r.IS_PRODUCT_SUPPORT,
            SUPPORTS: r.SUPPORTS || (r.IS_PRODUCT_SUPPORT && r.IS_FUND_SUPPORT ? 'Product, Fund' : r.IS_PRODUCT_SUPPORT ? 'Product' : 'Fund'),
            PRODUCT_ID: Array.isArray(r.PRODUCT_ID) ? r.PRODUCT_ID : (r.MAPPED_PRODUCTS ? r.MAPPED_PRODUCTS.split('|') : []),
            MAPPED_PRODUCTS: r.MAPPED_PRODUCTS || '',
            MAPPEDPRODUCTNAME: r.MAPPEDPRODUCTNAME || '—',
            ApplicationType: Array.isArray(r.ApplicationType) ? r.ApplicationType : (r.MappedAppTypesIDs ? r.MappedAppTypesIDs.split('|') : []),
            MappedAppTypesIDs: r.MappedAppTypesIDs || '',
            MappedAppTypesNames: r.MappedAppTypesNames || '—',
            RecordStatus: (r.RECORD_STATE === 1 || r.STATUS === 1) ? 'Active' : 'Inactive'
          }));
          this._categories.set(apiItems);
          this.persist(apiItems);
        }
      },
      error: () => {}
    });
  }


  private loadInitialData(): ProgramCategoryItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse stored program categories', e);
    }

    const defaultItems: ProgramCategoryItem[] = [
      {
        ID: '101',
        CODE: 'PC-IST-001',
        NAME: 'Oncology Interventional Research',
        PROGRAM_ID: '2',
        PROGRAM_NAME: 'Investigator Sponsored Trial',
        DESCRIPTION: 'Phase II/III interventional oncology clinical trials with product & fund grant support.',
        ACTIVECHECK: true,
        RECORD_STATE: 1,
        IS_FUND_SUPPORT: true,
        IS_PRODUCT_SUPPORT: true,
        SUPPORTS: 'Product, Fund',
        PRODUCT_ID: ['PRD-101', 'PRD-102'],
        MAPPED_PRODUCTS: 'PRD-101|PRD-102',
        MAPPEDPRODUCTNAME: 'Compound Alpha-9 (Oncology), Biosimilar Beta-X (Immunology)',
        ApplicationType: ['APP-1', 'APP-3'],
        MappedAppTypesIDs: 'APP-1|APP-3',
        MappedAppTypesNames: 'Clinical Study (Phase I-IV), Pre-Clinical / Translational Research',
        RecordStatus: 'Active'
      },
      {
        ID: '102',
        CODE: 'PC-EAP-002',
        NAME: 'Compassionate Named Patient Access',
        PROGRAM_ID: '5',
        PROGRAM_NAME: 'Expanded Access Program',
        DESCRIPTION: 'Single patient compassionate use protocol for investigational therapy supply.',
        ACTIVECHECK: true,
        RECORD_STATE: 1,
        IS_FUND_SUPPORT: false,
        IS_PRODUCT_SUPPORT: true,
        SUPPORTS: 'Product',
        PRODUCT_ID: ['PRD-104', 'PRD-106'],
        MAPPED_PRODUCTS: 'PRD-104|PRD-106',
        MAPPEDPRODUCTNAME: 'NeuroVance 250mg (Neurology), GeneThera RareDx (Gene Therapy)',
        ApplicationType: ['APP-4', 'APP-6'],
        MappedAppTypesIDs: 'APP-4|APP-6',
        MappedAppTypesNames: 'Single Patient Compassionate Use (IND), Emergency Access Authorization',
        RecordStatus: 'Active'
      },
      {
        ID: '103',
        CODE: 'PC-GRN-003',
        NAME: 'Academic Medical Educational Grants',
        PROGRAM_ID: '4',
        PROGRAM_NAME: 'Grants',
        DESCRIPTION: 'Charitable funding for continuing medical education and fellow research stipends.',
        ACTIVECHECK: true,
        RECORD_STATE: 1,
        IS_FUND_SUPPORT: true,
        IS_PRODUCT_SUPPORT: false,
        SUPPORTS: 'Fund',
        PRODUCT_ID: [],
        MAPPED_PRODUCTS: '',
        MAPPEDPRODUCTNAME: '—',
        ApplicationType: ['APP-7', 'APP-8'],
        MappedAppTypesIDs: 'APP-7|APP-8',
        MappedAppTypesNames: 'Investigator Educational Grant, Scientific Sponsorship & Fellowship',
        RecordStatus: 'Active'
      },
      {
        ID: '104',
        CODE: 'PC-IST-004',
        NAME: 'Cardiovascular Observational Registry',
        PROGRAM_ID: '2',
        PROGRAM_NAME: 'Investigator Sponsored Trial',
        DESCRIPTION: 'Non-interventional patient outcome tracking for cardiovascular therapy.',
        ACTIVECHECK: true,
        RECORD_STATE: 1,
        IS_FUND_SUPPORT: true,
        IS_PRODUCT_SUPPORT: true,
        SUPPORTS: 'Product, Fund',
        PRODUCT_ID: ['PRD-103'],
        MAPPED_PRODUCTS: 'PRD-103',
        MAPPEDPRODUCTNAME: 'CardioShield FX (Cardiovascular)',
        ApplicationType: ['APP-2'],
        MappedAppTypesIDs: 'APP-2',
        MappedAppTypesNames: 'Observational / Registry Study',
        RecordStatus: 'Active'
      },
      {
        ID: '105',
        CODE: 'PC-EAP-005',
        NAME: 'Intermediate Cohort Rare Disease Protocol',
        PROGRAM_ID: '5',
        PROGRAM_NAME: 'Expanded Access Program',
        DESCRIPTION: 'Group treatment protocols for rare diseases lacking standard options.',
        ACTIVECHECK: false,
        RECORD_STATE: 0,
        IS_FUND_SUPPORT: false,
        IS_PRODUCT_SUPPORT: true,
        SUPPORTS: 'Product',
        PRODUCT_ID: ['PRD-106'],
        MAPPED_PRODUCTS: 'PRD-106',
        MAPPEDPRODUCTNAME: 'GeneThera RareDx (Gene Therapy)',
        ApplicationType: ['APP-5'],
        MappedAppTypesIDs: 'APP-5',
        MappedAppTypesNames: 'Intermediate / Treatment Cohort Protocol',
        RecordStatus: 'Inactive'
      }
    ];

    this.persist(defaultItems);
    return defaultItems;
  }

  private persist(items: ProgramCategoryItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving program categories to localStorage', e);
    }
  }

  public getCategoryById(id: string): ProgramCategoryItem | undefined {
    return this._categories().find(c => c.ID === id);
  }

  public saveCategory(payload: Partial<ProgramCategoryItem>): { status: number; message: string } {
    const rawName = (payload.NAME || '').trim();
    if (!rawName) {
      return { status: 1, message: 'Please enter Program Category Name' };
    }
    if (!payload.PROGRAM_ID) {
      return { status: 1, message: 'Please select Program' };
    }

    const progOption = this.programOptions.find(p => p.value === payload.PROGRAM_ID);
    const progName = progOption ? progOption.label : 'Investigator Sponsored Trial';

    // Calculate supports type string
    let supportsText = 'None';
    if (payload.IS_PRODUCT_SUPPORT && payload.IS_FUND_SUPPORT) {
      supportsText = 'Product, Fund';
    } else if (payload.IS_PRODUCT_SUPPORT) {
      supportsText = 'Product';
    } else if (payload.IS_FUND_SUPPORT) {
      supportsText = 'Fund';
    }

    // Map Product Names
    const productIds = payload.PRODUCT_ID || [];
    const mappedProductsStr = productIds.join('|');
    const matchedProducts = this.productOptions.filter(p => productIds.includes(p.value));
    const mappedProductNamesStr = matchedProducts.length > 0 
      ? matchedProducts.map(p => p.label).join(', ') 
      : '—';

    // Map Application Types
    const appTypeIds = payload.ApplicationType || [];
    const mappedAppTypesStr = appTypeIds.join('|');
    const matchedAppTypes = this.applicationTypeOptions.filter(a => appTypeIds.includes(a.value));
    const mappedAppTypeNamesStr = matchedAppTypes.length > 0 
      ? matchedAppTypes.map(a => a.label).join(', ') 
      : '—';

    const isRecordActive = payload.ACTIVECHECK ?? true;

    const fullItem: ProgramCategoryItem = {
      ID: payload.ID || ('PC-' + Date.now()),
      CODE: payload.CODE || ('PC-' + Math.floor(100 + Math.random() * 900)),
      NAME: rawName,
      PROGRAM_ID: payload.PROGRAM_ID,
      PROGRAM_NAME: progName,
      DESCRIPTION: payload.DESCRIPTION || '',
      ACTIVECHECK: isRecordActive,
      RECORD_STATE: isRecordActive ? 1 : 0,
      IS_FUND_SUPPORT: !!payload.IS_FUND_SUPPORT,
      IS_PRODUCT_SUPPORT: !!payload.IS_PRODUCT_SUPPORT,
      SUPPORTS: supportsText,
      PRODUCT_ID: productIds,
      MAPPED_PRODUCTS: mappedProductsStr,
      MAPPEDPRODUCTNAME: mappedProductNamesStr,
      ApplicationType: appTypeIds,
      MappedAppTypesIDs: mappedAppTypesStr,
      MappedAppTypesNames: mappedAppTypeNamesStr,
      RecordStatus: isRecordActive ? 'Active' : 'Inactive'
    };

    const current = [...this._categories()];
    const existingIndex = current.findIndex(c => c.ID === fullItem.ID);

    if (existingIndex > -1) {
      current[existingIndex] = fullItem;
      this.productSetupService.updateProgramCategory(fullItem).subscribe({ next: () => {}, error: () => {} });
    } else {
      current.unshift(fullItem);
      this.productSetupService.insertProgramCategory(fullItem).subscribe({ next: () => {}, error: () => {} });
    }

    this._categories.set(current);
    this.persist(current);

    return { 
      status: 0, 
      message: existingIndex > -1 
        ? 'Program Category has been updated successfully' 
        : 'Program Category has been created successfully' 
    };
  }

  public deleteCategory(id: string): { status: number; message: string } {
    const current = this._categories().filter(c => c.ID !== id);
    this._categories.set(current);
    this.persist(current);

    this.productSetupService.deleteProgramCategory(id).subscribe({ next: () => {}, error: () => {} });
    return { status: 0, message: 'Program Category has been deleted successfully' };
  }

  public toggleStatus(id: string): { status: number; message: string } {
    let isNowActive = false;
    const current = this._categories().map(c => {
      if (c.ID === id) {
        const nextActive = !c.ACTIVECHECK;
        isNowActive = nextActive;
        return {
          ...c,
          ACTIVECHECK: nextActive,
          RECORD_STATE: nextActive ? 1 : 0,
          RecordStatus: (nextActive ? 'Active' : 'Inactive') as 'Active' | 'Inactive'
        };
      }
      return c;
    });

    this._categories.set(current);
    this.persist(current);

    if (isNowActive) {
      this.productSetupService.activateProgramCategory(id).subscribe({ next: () => {}, error: () => {} });
    } else {
      this.productSetupService.deactivateProgramCategory(id).subscribe({ next: () => {}, error: () => {} });
    }

    return { status: 0, message: 'Status updated successfully' };
  }
}

