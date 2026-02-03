// This is a SERVER component
import { notFound } from 'next/navigation';
import IndustryPageClient from './IndustryPageClient';
import metaInfo from '../../../app/utils/metaInfo.json';
import { industryFaqs } from '../../../data/industryFaqs';

// Static list of industry slugs
const industrySlugs = [
  "agriculture-industry",
  "apparel-erp-software",
  "automotive-erp-software",
  "food-and-beverage-erp",
  "chemical-erp-software",
  "school-management-system",
  "solar-erp-software",
  "electronics-manufacturing-erp",
  "electrical-and-electronics-trading",
  "fmcg-erp-software",
  "food-industry",
  "furniture-manufacturing-erp",
  "garment-erp-software",
  "grocery-erp-software",
  "general-trading",
  "hardware-and-building-material-trading",
  "hydraulic-erp-software",
  "jewellery-erp-software",
  "leather-erp-software",
  "logistics-erp-software",
  "medicalequipmentmanufacturing-industry",
  "wood-manufacturing-erp",
  "wholesale-distribution-software",
  "metal-fabrication-erp",
  "microfinance-software",
  "oilandgas-industry",
  "packaging-management-software",
  "paper-industry",
  "plastic-erp-software",
  "pharma-erp-software",
  "publishing-erp-software",
  "printing-erp-software",
  "pre-engineering-industry",
  "rubber-manufacturing-erp",
  "restaurant-industry",
  "retail-erp-software",
  "steel-manufacturing-erp",
  "telecom-erp-software",
  "textile-erp-software",
  "sign-manufacturing-erp",
  "foundry-erp-solution",
  "construction-erp-software",
  "imports-and-exports", 
];

// Generate static paths
export async function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

// Function to get base URL based on environment
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  // For production, use the actual domain
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://techclouderp.com/';
};

// Add metadata generation
export async function generateMetadata({ params }) {
  try {
    // Get industry data
    const data = await import(`../../../data/industries/${params.slug}.json`);
    
    // Get meta info for the industry
    const industryMeta = metaInfo.industries[params.slug];
    
    if (!industryMeta) {
      throw new Error('Meta information not found for industry');
    }

    // Map industry slug to image name
    const getImagePath = (slug) => {
      const imageMap = {
        'agriculture-industry': 'agriculture_banner_img.webp',
        'apparel-erp-software': 'apparel-banner_img.webp',
        'imports-and-exports': 'imports-banner-img.webp', 
        'automotive-erp-software': 'automotive_banner_img.webp',
        'electrical-and-electronics-trading': 'electrical-banner-img.webp',
        'general-trading': 'general-trading-banner-img.webp',
        'hardware-and-building-material-trading': 'hardware-banner-img.webp',
        'grocery-erp-software': 'grocery-banner-img.webp',
        "foundry-erp-solution": "casting-banner-img.webp",
        'chemical-erp-software': 'chemical_banner_img.webp',
        'construction-erp-software': 'construction_banner_img.webp',
        'electronics-manufacturing-erp': 'electronics_banner_img.webp',
        'fmcg-erp-software': 'fmcg_banner_img.webp',
        'food-and-beverage-erp': 'beverage_banner_img.webp',
        'furniture-manufacturing-erp': 'furniture_banner_img.webp',
        'garment-erp-software': 'garment_banner_img.webp',
        'hydraulic-erp-software': 'hydraulic_banner_img.webp',
        'jewellery-erp-software': 'jewellery_banner_img.webp',
        'leather-erp-software': 'leather_banner_img.webp',
        'logistics-erp-software': 'logistics-banner_img.webp',
        'medicalequipmentmanufacturing-industry': 'medical_equipment_banner_img.webp',
        'metal-fabrication-erp': 'metal_fabrication_banner_img.webp',
        'microfinance-software': 'microfinance_banner_img.webp',
        'oilandgas-industry': 'oilandgas_banner_img.webp',
        'packaging-management-software': 'packaging_banner_img.webp',
        'paper-industry': 'paper_banner_img.webp',
        'pharma-erp-software': 'pharmaceutical_banner_img.webp',
        'plastic-erp-software': 'plastic_banner_img.webp',
        'pre-engineering-industry': 'preengineering_banner_img.webp',
        'printing-erp-software': 'printing_banner_img.webp',
        'publishing-erp-software': 'publishing_banner_img.webp',
        'restaurant-industry': 'restaurant_banner_img.webp',
        'retail-erp-software': 'retail_banner_img.webp',
        'rubber-manufacturing-erp': 'rubber_banner_img.webp',
        'school-management-system': 'educational_banner_img.webp',
        'solar-erp-software': 'solar_banner_img.webp',
        'steel-manufacturing-erp': 'steel_banner_img.webp',
        'telecom-erp-software': 'telecom_banner_img.webp',
        'textile-erp-software': 'textile_banner_img.webp',
        'sign-manufacturing-erp': 'signage_banner_img.webp',
        'wood-manufacturing-erp': 'wood_banner_img.webp',
        'wholesale-distribution-software': 'wholesale_banner_img.webp'
      };

      return `/images/industries/${imageMap[slug] || 'default-card-image.png'}`;
    };

    const baseUrl = getBaseUrl();
    const imagePath = getImagePath(params.slug);
    const ogImageUrl = `${baseUrl}${imagePath}`;
    const pageUrl = `${baseUrl}/industries/${params.slug}/`;

    return {
      title: industryMeta.title,
      description: industryMeta.description,
      keywords: industryMeta.keywords,
      openGraph: {
        title: industryMeta.title,
        description: industryMeta.description,
        type: 'website',
        url: pageUrl,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: industryMeta.title,
            type: 'image/webp'
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: industryMeta.title,
        description: industryMeta.description,
        images: [ogImageUrl]
      },
      alternates: {
        canonical: pageUrl
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Industry Not Found - Tech Cloud ERP',
      description: 'The requested industry page could not be found.',
    };
  }
}

// Force static rendering
export const dynamic = 'force-static';
export const revalidate = false;

// Add JSON-LD script component
function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function IndustryPage({ params }) {
  try {
    const data = await import(`../../../data/industries/${params.slug}.json`);
    const industryData = data.default;

    if (!industryData) {
      throw new Error('No data found');
    }

    // Get industry-specific FAQs
    const industryFaq = industryFaqs[params.slug] || [];

    // Create FAQ schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "url": `https://techclouderp.com/industries/${params.slug}/`,
      "mainEntity": industryFaq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    // Create BreadcrumbList schema
    const breadcrumbSchema = {
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://techclouderp.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Industries",
          "item": "https://techclouderp.com/industries/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": industryData.title || params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          "item": `https://techclouderp.com/industries/${params.slug}/`
        }
      ]
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />
        <IndustryPageClient industryData={industryData} />
      </>
    );
  } catch (error) {
    console.error('Error loading industry data:', error);
    notFound();
  }
}
