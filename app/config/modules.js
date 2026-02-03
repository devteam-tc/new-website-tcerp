/**
 * Valid service slugs that can be used in the application
 * @type {string[]}
 */
export const VALID_MODULE_SLUGS = [
    'pos',
    'inventory',
    'accounting',
    'hr',
    'crm',
    'project-management',
    'design',
    'import-export',
    'manufacturing',
    'quality-control',
    'maintenance',
    'sales',
    'purchase',
    'warehouse',
    'production'
];

/**
 * Company name used throughout the application
 * @type {string}
 */
export const COMPANY_NAME = 'Your Company Name';

/**
 * Default metadata for modules pages
 * @type {{title: string, description: string}}
 */
export const DEFAULT_META = {
  title: `modules - ${COMPANY_NAME}`,
  description: 'Our professional modules to help your business grow'
};

// Module categories
export const MODULE_CATEGORIES = {
  CORE: 'core',
  FINANCE: 'finance',
  OPERATIONS: 'operations',
  SALES: 'sales',
  HR: 'hr',
  MANUFACTURING: 'manufacturing'
};

// Module data structure
export const MODULE_DATA_STRUCTURE = {
  title: '',
  description: '',
  banner: '',
  icon: '',
  category: '',
  features: [],
  faqs: [],
  videosection: {
    title: '',
    description: '',
    videoUrl: ''
  },
  info: {
    industry: '',
    solution: '',
    modules: [],
    result: []
  },
  downloadWidget: {
    title: '',
    description: '',
    downloadUrl: ''
  }
};

// Module metadata for SEO
export const MODULE_METADATA = {
  pos: {
    title: 'Point of Sale (POS)',
    description: 'Streamline your sales operations with our comprehensive POS system',
    keywords: 'pos, point of sale, sales management, retail software'
  },
  inventory: {
    title: 'Inventory Management',
    description: 'Efficiently manage your inventory with real-time tracking and control',
    keywords: 'inventory, stock management, warehouse, tracking'
  },
  accounting: {
    title: 'Accounting & Finance',
    description: 'Complete financial management solution for your business',
    keywords: 'accounting, finance, bookkeeping, financial management'
  },
  hr: {
    title: 'Human Resources',
    description: 'Comprehensive HR management system for your workforce',
    keywords: 'hr, human resources, employee management, payroll'
  },
  crm: {
    title: 'Customer Relationship Management',
    description: 'Build and maintain strong customer relationships',
    keywords: 'crm, customer management, client relations, sales'
  },
  'project-management': {
    title: 'Project Management',
    description: 'Efficiently manage projects and track progress',
    keywords: 'project management, task tracking, team collaboration'
  },
  design: {
    title: 'Design & Engineering',
    description: 'Advanced design and engineering tools for manufacturing',
    keywords: 'design, engineering, cad, product development'
  },
  'import-export': {
    title: 'Import/Export Management',
    description: 'Streamline your international trade operations',
    keywords: 'import, export, international trade, customs'
  },
  manufacturing: {
    title: 'Manufacturing Management',
    description: 'Comprehensive manufacturing process management',
    keywords: 'manufacturing, production, process management'
  },
  'quality-control': {
    title: 'Quality Control',
    description: 'Ensure product quality with comprehensive QC tools',
    keywords: 'quality control, qc, inspection, standards'
  },
  maintenance: {
    title: 'Maintenance Management',
    description: 'Efficient equipment and facility maintenance',
    keywords: 'maintenance, equipment, facility management'
  },
  sales: {
    title: 'Sales Management',
    description: 'Comprehensive sales tracking and management',
    keywords: 'sales, order management, customer orders'
  },
  purchase: {
    title: 'Purchase Management',
    description: 'Streamline your procurement processes',
    keywords: 'purchase, procurement, vendor management'
  },
  warehouse: {
    title: 'Warehouse Management',
    description: 'Efficient warehouse operations management',
    keywords: 'warehouse, storage, inventory, logistics'
  },
  production: {
    title: 'Production Management',
    description: 'Comprehensive production planning and control',
    keywords: 'production, manufacturing, planning, control'
  }
}; 