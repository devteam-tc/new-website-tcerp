// Module configuration with base prices (in INR)
export const MODULES = {
    CRM: { name: 'CRM', basePrice: 1500 },
    Sales: { name: 'Sales', basePrice: 1500 },
    Purchase: { name: 'Purchase', basePrice: 1500 },
    Inventory: { name: 'Inventory', basePrice: 1500 },
    Production: { name: 'Production', basePrice: 1500 },
    Jobwork: { name: 'Job Work', basePrice: 1500 },
    QAandQC: { name: 'QC & QA', basePrice: 1500 },
    FixedAssets: { name: 'Fixed Assets', basePrice: 1500 },
    PlantMaintenance: { name: 'Plant Maintenance', basePrice: 1500 },
    HRM: { name: 'HRM', basePrice: 1500 },
    FinanceandAccounting: { name: 'Finance & Accounting', basePrice: 1500 },
    ImportsAndExports: { name: 'Imports & Exports', basePrice: 1500 },
    ProjectManagement: { name: 'Project Management', basePrice: 1500 },
    Design: { name: 'Design', basePrice: 1500 },
    POS: { name: 'POS', basePrice: 1500 },
    
};

export const CUSTOMIZATION_LEVELS = [
  { level: 1, name: 'Level 1 - Basic Customization', percentage: 10 },
  { level: 2, name: 'Level 2 - Standard Customization', percentage: 20 },
  { level: 3, name: 'Level 3 - Advanced Customization', percentage: 30 },

];

export const CURRENCY_SYMBOLS = {
   INR: '₹',
  USD: '$'
 
};

export const INDUSTRIES = [
  'Manufacturing',
  'Retail',
  'Healthcare',
  'Education',
  'Technology',
  'Finance',
  'Construction',
  'Transportation',
  'Hospitality',
  'Agriculture',
  'Energy',
  'Media & Entertainment',
  'Real Estate',
  'Telecommunications',
  'Other'
]; 