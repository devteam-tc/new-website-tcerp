import { notFound } from 'next/navigation';
import { FaHome } from 'react-icons/fa';
import servicesData from '../../data/services.json';
import { VALID_SERVICE_SLUGS } from '../config/services';

/**
 * Normalize a service slug by converting spaces to hyphens and lowercasing
 * @param {string} slug - The slug to normalize
 * @returns {string} The normalized slug
 */
export function normalizeSlug(slug) {
  return slug.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Check if a slug is a valid service slug
 * @param {string} slug - The slug to validate
 * @returns {boolean} Whether the slug is valid
 */
export function isValidServiceSlug(slug) {
  const normalizedSlug = normalizeSlug(slug);
  return VALID_SERVICE_SLUGS.includes(normalizedSlug);
}

/**
 * Get service data for a given slug
 * @param {string} slug - The service slug
 * @returns {Object|null} The service data or null if not found
 */
export function getServiceData(slug) {
  const normalizedSlug = normalizeSlug(slug);
  
  if (!isValidServiceSlug(normalizedSlug)) {
    return null;
  }

  const service = servicesData.servicesBySlug[normalizedSlug];
  
  if (!service) {
    return null;
  }

  return service;
}

/**
 * Get service content data for a given slug
 * @param {string} slug - The service slug
 * @returns {Object|null} The service content data or null if not found
 */
export async function getServiceContent(slug) {
  const normalizedSlug = normalizeSlug(slug);
  const baseSlug = normalizedSlug.replace('-services', '');
  
  try {
    const content = await import(`../../data/services/${baseSlug}.json`);
    return content.default;
  } catch (error) {
    console.error(`Failed to load content for slug: ${slug}`, error);
    return null;
  }
}

/**
 * Generate breadcrumbs for service pages
 * @param {string} slug - The service slug
 * @param {string} serviceTitle - The service title
 * @returns {Array<{label: string, link: string|null, icon?: Function}>} Breadcrumb items
 */
export function getServiceBreadcrumbs(slug, serviceTitle) {
  return [
    { label: 'Home', link: '/', icon: FaHome },
    { label: 'All Services', link: '/services' },
    { label: serviceTitle, link: null },
  ];
} 