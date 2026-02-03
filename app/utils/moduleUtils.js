import { notFound } from 'next/navigation';
import { FaHome } from 'react-icons/fa';
import modulesData from '../../data/modules.json';
import { 
  VALID_MODULE_SLUGS, 
  MODULE_CATEGORIES, 
  MODULE_DATA_STRUCTURE,
  MODULE_METADATA 
} from '../config/modules';

/**
 * Normalize a module slug by converting spaces to hyphens and lowercasing
 * @param {string} slug - The slug to normalize
 * @returns {string} The normalized slug
 */
export function normalizeSlug(slug) {
  return slug.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Check if a slug is a valid module slug
 * @param {string} slug - The slug to validate
 * @returns {boolean} Whether the slug is valid
 */
export function isValidModuleSlug(slug) {
  const normalizedSlug = normalizeSlug(slug);
  return VALID_MODULE_SLUGS.includes(normalizedSlug);
}

/**
 * Get module data for a given slug
 * @param {string} slug - The module slug
 * @returns {Object|null} The module data or null if not found
 */
export function getModuleData(slug) {
  const normalizedSlug = normalizeSlug(slug);
  
  if (!isValidModuleSlug(normalizedSlug)) {
    return null;
  }

  const module = modulesData.modulesBySlug[normalizedSlug];
  
  if (!module) {
    return null;
  }

  return {
    ...MODULE_DATA_STRUCTURE,
    ...module,
    metadata: MODULE_METADATA[normalizedSlug] || {}
  };
}

/**
 * Get module content data for a given slug
 * @param {string} slug - The module slug
 * @returns {Object|null} The module content data or null if not found
 */
export async function getModuleContent(slug) {
  const normalizedSlug = normalizeSlug(slug);
  
  try {
    const content = await import(`../../data/modules/${normalizedSlug}.json`);
    return {
      ...MODULE_DATA_STRUCTURE,
      ...content.default,
      metadata: MODULE_METADATA[normalizedSlug] || {}
    };
  } catch (error) {
    console.error(`Failed to load content for slug: ${slug}`, error);
    return null;
  }
}

/**
 * Get all module slugs for static generation
 * @returns {Array<{params: {slug: string}}>} Array of module slugs
 */
export async function getAllModuleSlugs() {
  return VALID_MODULE_SLUGS.map(slug => ({
    params: { slug }
  }));
}

/**
 * Generate breadcrumbs for module pages
 * @param {string} slug - The module slug
 * @param {string} moduleTitle - The module title
 * @returns {Array<{label: string, link: string|null, icon?: Function}>} Breadcrumb items
 */
export function getModuleBreadcrumbs(slug, moduleTitle) {
  return [
    { label: 'Home', link: '/', icon: FaHome },
    { label: 'All Modules', link: '/modules' },
    { label: moduleTitle, link: null },
  ];
}

/**
 * Get module features for a given slug
 * @param {string} slug - The module slug
 * @returns {Array|null} The module features or null if not found
 */
export async function getModuleFeatures(slug) {
  const content = await getModuleContent(slug);
  return content?.features || null;
}

/**
 * Get module FAQs for a given slug
 * @param {string} slug - The module slug
 * @returns {Array|null} The module FAQs or null if not found
 */
export async function getModuleFAQs(slug) {
  const content = await getModuleContent(slug);
  return content?.faqs || null;
}

/**
 * Get module video section for a given slug
 * @param {string} slug - The module slug
 * @returns {Object|null} The module video section or null if not found
 */
export async function getModuleVideoSection(slug) {
  const content = await getModuleContent(slug);
  return content?.videosection || null;
}

/**
 * Get module information for a given slug
 * @param {string} slug - The module slug
 * @returns {Object|null} The module information or null if not found
 */
export async function getModuleInfo(slug) {
  const content = await getModuleContent(slug);
  return content?.info || null;
}

/**
 * Get module download widget for a given slug
 * @param {string} slug - The module slug
 * @returns {Object|null} The module download widget or null if not found
 */
export async function getModuleDownloadWidget(slug) {
  const content = await getModuleContent(slug);
  return content?.downloadWidget || null;
}

/**
 * Get module metadata for SEO
 * @param {string} slug - The module slug
 * @returns {Object|null} The module metadata or null if not found
 */
export function getModuleMetadata(slug) {
  const normalizedSlug = normalizeSlug(slug);
  return MODULE_METADATA[normalizedSlug] || null;
}

/**
 * Get all modules by category
 * @param {string} category - The module category
 * @returns {Array} Array of modules in the specified category
 */
export function getModulesByCategory(category) {
  if (!Object.values(MODULE_CATEGORIES).includes(category)) {
    return [];
  }

  return VALID_MODULE_SLUGS
    .map(slug => getModuleData(slug))
    .filter(module => module?.category === category);
}

/**
 * Get all modules with their metadata
 * @returns {Array} Array of all modules with their metadata
 */
export function getAllModulesWithMetadata() {
  return VALID_MODULE_SLUGS.map(slug => ({
    ...getModuleData(slug),
    metadata: MODULE_METADATA[slug] || {}
  }));
} 