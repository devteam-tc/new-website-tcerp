import Link from 'next/link';
import Image from 'next/image';
import Header from '../../../components/layout/header/Header';
import PageHeader from '../../../components/layout/PageHeader';
import { FaHome } from 'react-icons/fa';
import { BsCheckCircle } from 'react-icons/bs';
import WhyChooseUs from '../../../components/containers/locations/WhyChooseUs';
import Footer from '../../../components/layout/footer/Footer';
import metaInfo from '../../utils/metaInfo.json';
import CustomCursor from '../../../components/layout/CustomCursor';
import { locationData } from '../../../data/location';



const urlToDataMap = {
  // Hyderabad URLs
  'techcloud-erp-software-in-hyderabad': 'hyderabad',
  'hyderabad': 'hyderabad',
  
  // Chennai URLs
  'techcloud-erp-software-in-chennai': 'chennai',
  'chennai': 'chennai',
  
  // Coimbatore URLs
  'techcloud-erp-software-in-coimbatore': 'coimbatore',
  'coimbatore': 'coimbatore',

  // Bangalore URLs
  'techcloud-erp-software-in-bangalore': 'bangalore',
  'bangalore': 'bangalore',
  
  // Kolkata URLs
  'techcloud-erp-software-in-kolkata': 'kolkata',
  'kolkata': 'kolkata',

  // Mumbai URLs
  'techcloud-erp-software-in-mumbai': 'mumbai',
  'mumbai': 'mumbai',

  // Kochi URLs
  'techcloud-erp-software-in-kochi': 'kochi',
  'kochi': 'kochi',

  // Delhi URLs
  'techcloud-erp-software-in-delhi': 'delhi',
  'delhi': 'delhi',

  // Ahmedabad URLs
  'techcloud-erp-software-in-ahmedabad': 'ahmedabad',
  'ahmedabad': 'ahmedabad',

  // Vizag URLs
  'techcloud-erp-software-in-vizag': 'vizag',
  'vizag': 'vizag',

  // UAE URLs
  'techcloud-erp-software-in-uae': 'uae',
  'uae': 'uae',
 
  // dubai URLs
  'techcloud-erp-software-in-dubai': 'dubai',
  'dubai': 'dubai', 

  // bahrain URLs
  'techcloud-erp-software-in-bahrain': 'bahrain',
  'bahrain': 'bahrain',

  // Oman URLs
  'techcloud-erp-software-in-oman': 'oman',
  'oman': 'oman',

  // Qatar URLs
  'techcloud-erp-software-in-qatar': 'qatar',
  'qatar': 'qatar',

  // kuwait URLs (all lowercase)
  'techcloud-erp-software-in-kuwait': 'kuwait',
  'kuwait': 'kuwait',
 
  // USA URLs (all lowercase)
  'techcloud-erp-software-in-usa': 'usa',
  'usa': 'usa',
  
  // Additional emirates
  'techcloud-erp-software-in-abu-dhabi': 'abu-dhabi',
  'abu-dhabi': 'abu-dhabi',
  'techcloud-erp-software-in-sharjah': 'sharjah',
  'sharjah': 'sharjah',
  'techcloud-erp-software-in-ajman': 'ajman',
  'ajman': 'ajman'
};

// Location data is now imported from data/location directory


// This function tells Next.js which dynamic routes to pre-render
export async function generateStaticParams() {
  // Get all possible slugs from urlToDataMap and locationData
  const allSlugs = [
    // Add all keys from urlToDataMap
    ...Object.keys(urlToDataMap),
    
    // Add all location keys from locationData in both formats
    ...Object.keys(locationData).map(key => `techcloud-erp-software-in-${key}`),
    ...Object.keys(locationData)
  ];
  
  // Remove duplicates and create params array
  const uniqueSlugs = [...new Set(allSlugs)];
  
  // Return the params in the required format
  return uniqueSlugs.map(slug => ({
    slug: slug.toLowerCase() // Ensure all slugs are lowercase for consistency
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const dataKey = urlToDataMap[slug];
  const location = locationData[dataKey];
  const meta = metaInfo.locations?.[slug];
  if (meta) {
    return {
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
      openGraph: {
        title: meta.title,
        description: meta.description,
        type: 'website',
        images: location ? [
          {
            url: location.image,
            width: 1200,
            height: 630,
            alt: meta.title,
            type: 'image/webp'
          }
        ] : []
      },
      twitter: {
        card: 'summary_large_image',
        title: meta.title,
        description: meta.description,
        images: location ? [location.image] : []
      }
    };
  }
  if (!location) {
    return {
      title: 'Location Not Found | Tech Cloud ERP',
      description: 'Requested location page could not be found.',
    };
  }
  return {
    title: `${location.title} | Tech Cloud ERP`,
    description: location.description,
    keywords: `ERP ${dataKey}, ERP software ${dataKey}, Tech Cloud ERP ${dataKey}, ERP in ${dataKey}`,
    openGraph: {
      title: `${location.title} | Tech Cloud ERP`,
      description: location.description,
      type: 'website',
      images: [
        {
          url: location.image,
          width: 1200,
          height: 630,
          alt: location.title,
          type: 'image/webp'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${location.title} | Tech Cloud ERP`,
      description: location.description,
      images: [location.image]
    }
  };
}

export default function LocationPage({ params }) {
  const { slug } = params;
  
  // Normalize the slug for consistent matching
  const normalizedSlug = slug.toLowerCase();
  let dataKey = null;
  
  // Create a case-insensitive version of the urlToDataMap
  const lowerCaseUrlMap = Object.entries(urlToDataMap).reduce((acc, [key, value]) => {
    acc[key.toLowerCase()] = value;
    return acc;
  }, {});
  
  // Try exact match first (case-insensitive)
  if (lowerCaseUrlMap[normalizedSlug]) {
    dataKey = lowerCaseUrlMap[normalizedSlug];
  }
  // Try with full prefix if not found
  else if (normalizedSlug.startsWith('techcloud-erp-software-in-')) {
    // Extract the location part from the full URL
    const locationKey = normalizedSlug.replace('techcloud-erp-software-in-', '');
    dataKey = lowerCaseUrlMap[locationKey] || locationKey; // Try both with and without mapping
  }
  // Try with simple slug
  else {
    dataKey = normalizedSlug;
  }
  
  // If we have a data key, try to get the location data
  const location = locationData[dataKey];

  // If location not found, try to find a matching location in the data
  if (!location) {
    // Try to find a matching location in the data
    const locationKeys = Object.keys(locationData);
    const matchingKey = locationKeys.find(key => 
      key.toLowerCase() === dataKey?.toLowerCase() ||
      `techcloud-erp-software-in-${key}`.toLowerCase() === normalizedSlug
    );
    
    if (matchingKey) {
      if (typeof window !== 'undefined') {
        window.location.href = `/locations/techcloud-erp-software-in-${matchingKey}`;
        return <div>Redirecting to correct URL...</div>;
      }
    }
    
    return <div>Location not found. Please check the URL and try again.</div>;
  }

  const breadcrumbs = [
    { label: 'Home', link: '/', icon: FaHome },
    { label: 'Locations', link: '/locations' },
    { label: location.heading, link: null }
  ];

  return (
    <main>
      <Header />
      <PageHeader title={location.heading} breadcrumbs={breadcrumbs} />
      
      <div className="location-detail-page">
        <div className="location-detail-page__hero">
          <Image
            src={location.image}
            alt={location.title}
            width={800}
            height={400}
            className="location-detail-page__hero-image"
          />
        </div>

        <div className="location-detail-page__content">
          <div className="location-detail-page__description">
            <h1> {location.title}</h1>
            <p>{location.description}</p>
          </div> 
          {/* <div className="location-detail-page__features">
            <h3>Key Features</h3>
            <ul>
              {location.features.map((feature, index) => (
                <li key={index}>
                  <BsCheckCircle style={{ marginRight: '8px', color: '#ef5226' }} />
                  {feature}
                </li>
              ))}
            </ul>
          </div> */}
      <div className="location-detail-page__features">
          <h3>Key Features</h3>
          <ul className="features-list">
            {location.features && location.features.map((feature, index) => (
              <li key={index}>
                <BsCheckCircle style={{ marginRight: '8px', color: '#ef5226' }} />
                {feature}
              </li>
            ))}
          </ul>
      </div>
        </div>
      </div>
      {dataKey.toLowerCase() === 'uae' && (
        <div className="emirates-section" style={{ padding: '4rem 1rem', background: '#f8fafc' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem', color: '#1a365d' }}>
              Our Presence in the UAE
            </h2>
            <div className="locations-page__grid">
              {location.emirates && location.emirates.map((emirate, index) => (
                <div key={index} className="locations-page__card">
                  <div className="locations-page__card-image">
                    <Image
                      src={emirate.image}
                      alt={emirate.name}
                      width={300}
                      height={200}
                      className="locations-page__card-img"
                    />
                  </div>
                 <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{
                    margin: '0 0 1rem 0',
                    color: '#2d3748',
                    fontSize: '1.5rem',
                    fontWeight: '600'
                  }}>{emirate.name}</h3>
                    <p style={{
                    color: '#4a5568',
                    marginBottom: '1.25rem',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    flex: 1
                  }}>{emirate.description}</p>
                    <Link 
                      href={`/locations/techcloud-erp-software-in-${emirate.slug}`}
                      className="locations-page__card-button"
                    >
                      Visit This Page
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {dataKey.toLowerCase() === 'uae' ? (
  <section className="uae-features">
    <div className="container">
      <div className="row">
        {location.cities?.slice(0, 4).map((city, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="card h-100">
              <img 
                src={city.image} 
                className="card-img-top" 
                alt={city.name} 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{city.name}</h5>
                <p className="card-text">{city.description}</p>
                <a href={city.link} className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
) : (
  <WhyChooseUs locationKey={dataKey} />
)}
      <Footer />
      <CustomCursor />
    </main>
  );

  
} 