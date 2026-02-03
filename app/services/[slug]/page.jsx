import { notFound } from 'next/navigation';
import Header from "../../../components/layout/header/Header"
import PageHeader from "../../../components/layout/PageHeader";
import Footer from "../../../components/layout/footer/Footer";
import CustomCursor from "../../../components/layout/CustomCursor";
import AboutSection from '../../../components/containers/service-details/AboutSection';
import FAQSection from '../../../components/containers/service-details/FAQSection';
import Specifications from '../../../components/containers/service-details/Specifications';
import { getServiceData, getServiceBreadcrumbs, getServiceContent } from '../../utils/serviceUtils';
import { VALID_SERVICE_SLUGS, COMPANY_NAME, DEFAULT_META } from '../../config/services';
import metaInfo from '../../utils/metaInfo.json';
import { serviceFaqs } from '../../../data/serviceFaqs';

export function generateStaticParams() {
  return VALID_SERVICE_SLUGS.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  try {
    const service = getServiceData(params.slug);
    
    if (!service) {
      return {
        title: 'Service Not Found - ' + COMPANY_NAME,
        description: 'The requested service page could not be found.',
      };
    }
    
    // Get meta info for the service from metaInfo.json
    const serviceMeta = metaInfo.services[params.slug];
    
    if (serviceMeta) {
      const ogImage = serviceMeta.image || '/default-og-image.jpg';
      return {
        title: serviceMeta.title,
        description: serviceMeta.description,
        keywords: serviceMeta.keywords,
        openGraph: {
          title: serviceMeta.title,
          description: serviceMeta.description,
          type: 'website',
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: serviceMeta.title,
              type: 'image/jpeg'
            }
          ]
        },
        twitter: {
          card: 'summary_large_image',
          title: serviceMeta.title,
          description: serviceMeta.description,
          images: [ogImage]
        }
      };
    }
    
    // Fallback to service data if metaInfo not available
    return {
      title: `${service.title} - ${COMPANY_NAME}`,
      description: service.description || DEFAULT_META.description,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return DEFAULT_META;
  }
}

export default async function ServicePage({ params }) {
  try {
    const service = getServiceData(params.slug);
    
    if (!service) {
      notFound();
    }
    
    const breadcrumbs = getServiceBreadcrumbs(params.slug, service.title);
    const content = await getServiceContent(params.slug);

    if (!content) {
      notFound();
    }

    // FAQ Schema
    const faqs = serviceFaqs[params.slug] || [];
    const faqSchema = faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "url": `https://techclouderp.com/services/${params.slug}`,
      "mainEntity": faqs.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    } : null;

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
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
          "name": "Services",
          "item": "https://techclouderp.com/services/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": service.title,
          "item": `https://techclouderp.com/services/${params.slug}`
        }
      ]
    };

    // Meta Info (OG/Twitter)
    const serviceMeta = metaInfo.services[params.slug];
    const ogImage = serviceMeta?.image || '/default-og-image.jpg'; // Add image field in metaInfo if needed

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
        <PageHeader title={service.title} breadcrumbs={breadcrumbs} />
        <div className="container">
          <AboutSection slug={params.slug} content={content} />
        </div>
        <Specifications slug={params.slug} />
        <FAQSection service={params.slug} />
        <Footer />
        <CustomCursor />
      </>
    );
  } catch (error) {
    notFound();
  }
} 