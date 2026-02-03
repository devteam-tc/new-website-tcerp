import { notFound } from 'next/navigation';
import { FaHome } from 'react-icons/fa';
import industriesData from '../../data/industries.json';
import { VALID_INDUSTRY_SLUGS } from '../config/industries';

/**
 * Normalize an industry slug by converting spaces to hyphens and lowercasing
 * @param {string} slug - The slug to normalize
 * @returns {string} The normalized slug
 */
export function normalizeSlug(slug) {
  return slug.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Check if a slug is a valid industry slug
 * @param {string} slug - The slug to check
 * @returns {boolean} Whether the slug is valid
 */
export function isValidIndustrySlug(slug) {
  return VALID_INDUSTRY_SLUGS.includes(slug);
}

/**
 * Get industry data for a given slug
 * @param {string} slug - The industry slug
 * @returns {Object|null} The industry data or null if not found
 */
export function getIndustryData(slug) {
  const normalizedSlug = normalizeSlug(slug);
  
  if (!isValidIndustrySlug(normalizedSlug)) {
    return null;
  }

  const industry = industriesData.industriesBySlug[normalizedSlug];
  
  if (!industry) {
    return null;
  }

  return industry;
}

/**
 * Get breadcrumbs for an industry page
 * @param {string} slug - The industry slug
 * @param {string} title - The industry title
 * @returns {Array} Array of breadcrumb objects
 */
export function getIndustryBreadcrumbs(slug, title) {
  return [
    { label: 'Home', link: '/', icon: FaHome },
    { label: 'All Industries', link: '/industries' },
    { label: title, link: null }
  ];
}

/**
 * Get all industries for a specific category
 * @param {string} category - The category to get industries for
 * @returns {Array} Array of industry objects
 */
export function getIndustriesByCategory(category) {
  return industriesData.categories[category]?.industries || [];
}

/**
 * Get all categories with their industries
 * @returns {Object} Object containing all categories and their industries
 */
export function getAllCategories() {
  return industriesData.categories;
} 