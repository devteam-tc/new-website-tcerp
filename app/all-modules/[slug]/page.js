import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import PageHeader from '../../../components/layout/PageHeader';
import Footer from '../../../components/layout/footer/Footer';
import Header from '../../../components/layout/header/Header';
import CustomCursor from '../../../components/layout/CustomCursor';
import FaqSection from '../../../components/containers/modules/FaqSection';
import { FaHome } from 'react-icons/fa';
import VideoSection from '../../../components/containers/modules/VideoSection';
import CtaSection from '../../../components/containers/modules/CtaSection';
import WorkProcessSection from '../../../components/containers/modules/WorkProcessSection';
import metaInfo from '../../utils/metaInfo.json';
import { moduleFaqs } from '../../../data/moduleFaqs';
// import NewVideoSection from '../../../components/containers/modules/NewVideoSection';

const moduleSlugs = [
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

// Function to check all modules metadata
function checkAllModulesMetadata() {
  console.log('=== Checking All Modules Metadata ===');
  const availableModules = Object.keys(metaInfo.modules);
  console.log('Available modules in metaInfo:', availableModules);
  
  moduleSlugs.forEach(slug => {
    const metaKey = slug === 'pos' ? 'POS' : slug;
    const hasMetadata = metaInfo.modules[metaKey];
    const hasTitle = hasMetadata?.title;
    const hasDescription = hasMetadata?.description;
    
    console.log(`${slug}: ${hasMetadata ? '✅' : '❌'} Metadata, ${hasTitle ? '✅' : '❌'} Title, ${hasDescription ? '✅' : '❌'} Description`);
  });
  console.log('=== End Check ===');
}

export async function generateStaticParams() {
  return moduleSlugs.map((slug) => ({ slug }));
}

// Add metadata generation
export async function generateMetadata({ params }) {
  try {
    // Check all modules metadata on first load
    if (params.slug === 'crm') {
      checkAllModulesMetadata();
    }
    
    // Get module data (for fallback)
    const data = await getModuleData(params.slug);
    
    if (!data) {
      throw new Error('Module data not found');
    }
    
    // Handle case sensitivity for POS/pos
    const metaKey = params.slug === 'pos' ? 'POS' : params.slug;
    
    // Get meta info for the module
    const moduleMeta = metaInfo.modules[metaKey];
    
    console.log(`Module: ${params.slug}, MetaKey: ${metaKey}, Has Metadata: ${!!moduleMeta}, Has Title: ${!!moduleMeta?.title}`);
    
    if (moduleMeta && moduleMeta.title && moduleMeta.description) {
      const ogImage = moduleMeta.image || '/default-og-image.jpg';
      return {
        title: moduleMeta.title,
        description: moduleMeta.description,
        keywords: moduleMeta.keywords,
        openGraph: {
          title: moduleMeta.title,
          description: moduleMeta.description,
          type: 'website',
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: moduleMeta.title,
              type: 'image/jpeg'
            }
          ]
        },
        twitter: {
          card: 'summary_large_image',
          title: moduleMeta.title,
          description: moduleMeta.description,
          images: [ogImage]
        }
      };
    }
    
    console.log(`❌ No metadata found for ${metaKey}, using fallback`);
    
    // Fallback to module data if metaInfo not available
    const title = data?.mainHeaderSection?.heading || params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return {
      title: `${title} - Tech Cloud ERP`,
      description: `Explore ${title} module features and benefits. Optimize your business operations with Tech Cloud ERP solutions.`,
      keywords: `${params.slug.replace(/-/g, ' ')}, ERP module, business software`,
      openGraph: {
        title: `${title} - Tech Cloud ERP`,
        description: `Explore ${title} module features and benefits.`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} - Tech Cloud ERP`,
        description: `Explore ${title} module features and benefits.`,
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Module Not Found - Tech Cloud ERP',
      description: 'The requested module page could not be found.',
    };
  }
}
 
async function getModuleData(slug) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'modules', `${slug}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading module data for ${slug}:`, error);
    return null;
  }
}

export default async function ModulePage({ params }) {
  const { slug } = params;

  if (!moduleSlugs.includes(slug)) {
    notFound();
    return null;
  }

  const moduleData = await getModuleData(slug);
  
  if (!moduleData) {
    notFound();
    return null;
  }
// Create FAQ schema
const modulefaq = moduleFaqs[slug] || [];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "url": `https://techclouderp.com/all-modules/${slug}`,
  "mainEntity": modulefaq.map(item => ({
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
      "name": "Modules",
      "item": "https://techclouderp.com/all-modules/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": moduleData?.mainHeaderSection?.heading || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      "item": `https://techclouderp.com/all-modules/${slug}`
    }
  ]
};

  const breadcrumbs = [
    { label: 'Home', link: '/', icon: FaHome },
    { label: 'All Modules', link: '/all-modules' },
    { label: moduleData?.mainHeaderSection?.heading || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), link: null },
  ];

  return (
    <>
       {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <PageHeader 
        title={moduleData?.mainHeaderSection?.heading || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} 
        breadcrumbs={breadcrumbs} 
      />
      <main>
        <WorkProcessSection moduleData={moduleData} />

        {moduleData.videosection && (
          <VideoSection moduleData={moduleData} />
        )}
        {/* <NewVideoSection /> */}

        {moduleData.faqs && (
          <FaqSection faqData={moduleData.faqs} />
        )}

        <CtaSection />
      </main>
      <Footer />
      <CustomCursor />
    </>
  );
}
