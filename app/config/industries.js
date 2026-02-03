/**
 * Company name used in metadata
 */
export const COMPANY_NAME = 'Tech Cloud ERP';

/**
 * Valid industry slugs that can be used in the application
 * @type {string[]}
 */
export const VALID_INDUSTRY_SLUGS = [
  'automotive-erp-software',
  'foundry-erp-solution',
  'chemical-erp-software',
  'solar-erp-software',
  'electronics-manufacturing-erp',
  'food-industry',
  'furniture-manufacturing-erp',
  'hydraulic-erp-software',
  'leather-erp-software',
  'metal-fabrication-erp',
  'packaging-management-software',
  'paper-industry',
  'plastic-erp-software',
  'pre-engineering-industry',
  'rubber-manufacturing-erp',
  'steel-manufacturing-erp',
  'apparel-erp-software',
  'food-and-beverage-erp',
  'fmcg-erp-software',
  'garment-erp-software',
  'jewellery-erp-software',
  'restaurant-industry',
  'retail-erp-software',
  'wholesale-distribution-software',
  'agriculture-industry',
  'school-management-system',
  'medicalequipmentmanufacturing-industry',
  'microfinance-software',
  'oilandgas-industry',
  'pharma-erp-software',
  'printing-erp-software',
  'publishing-erp-software',
  'sign-manufacturing-erp',
  'telecom-erp-software',
  'textile-erp-software',
  'wood-manufacturing-erp'
];

/**
 * Default metadata for industries pages
 * @type {{title: string, description: string}}
 */
export const DEFAULT_META = {
  title: `Industries - ${COMPANY_NAME}`,
  description: 'Explore our industry-specific ERP solutions designed to meet your unique business needs'
}; 