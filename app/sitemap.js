export default function sitemap() {
  const baseUrl = 'https://techclouderp.com';
  
  // Define location slugs (matching your location page)
  const locationSlugs = [
    "techcloud-erp-software-in-hyderabad",
    "techcloud-erp-software-in-chennai",
    "techcloud-erp-software-in-coimbatore",
    "techcloud-erp-software-in-bangalore",
    "techcloud-erp-software-in-kolkata",
    "techcloud-erp-software-in-mumbai",
    "techcloud-erp-software-in-kochi",
    "techcloud-erp-software-in-delhi",
    "techcloud-erp-software-in-ahmedabad",
    "techcloud-erp-software-in-vizag",
    "techcloud-erp-software-in-uae",
    "techcloud-erp-software-in-dubai",
    "techcloud-erp-software-in-bahrain",
    "techcloud-erp-software-in-oman",
    "techcloud-erp-software-in-qatar",
    "techcloud-erp-software-in-kuwait",
    "techcloud-erp-software-in-usa",
  ];

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/all-modules`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/business-intelligence`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/demo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacypolicy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Industry pages
  const industries = [
    'automotive-erp-software',
    'foundry-erp-solution',
    'chemical-erp-software',
    'construction-erp-software',
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
    'logistics-erp-software',
    'medicalequipmentmanufacturing-industry',
    'microfinance-software',
    'oilandgas-industry',
    'pharma-erp-software',
    'printing-erp-software',
    'publishing-erp-software',
    'sign-manufacturing-erp',
    'telecom-erp-software',
    'textile-erp-software',
    'wood-manufacturing-erp',
  ];

  const industryPages = industries.map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Module pages
  const modules = [
    'crm',
    'sales',
    'purchase',
    'inventory',
    'production',
    'job-work',
    'qc-qa',
    'fixed-assets',
    'plant-maintenance',
    'hrms',
    'finance-accounting',
    'imports-exports',
    'project',
    'design',
    'installation',
    'service',
    'pos',
  ];

  const modulePages = modules.map((slug) => ({
    url: `${baseUrl}/all-modules/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Service pages
  const services = [
    'digital-marketing',
    'web-development',
    'app-development',
    'e-commerce-development',
  ];

  const servicePages = services.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Location pages - This is what was missing!
  const locationPages = locationSlugs.map((slug) => ({
    url: `${baseUrl}/locations/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...industryPages,
    ...modulePages,
    ...servicePages,
    ...locationPages, // Now location pages will be included
  ];
}
