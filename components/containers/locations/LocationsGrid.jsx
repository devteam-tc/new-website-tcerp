'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './LocationsGrid.scss';

const locations = [
  {
    title: 'Hyderabad',
    image: '/images/contact/hyderabad.webp',
    description: 'Hyderabad businesses benefit from seamless integration across finance, inventory and CRM. As a provider of manufacturing ERP India, we offer scalable tools through our ERP partner branches.',
    link: '/locations/techcloud-erp-software-in-hyderabad',
  },  
  {
    title: 'Coimbatore',
    image: '/images/contact/coimbatore.webp',
    description: 'We support Coimbatore\'s textile and engineering firms with flexible ERP systems. Discover reliable manufacturing ERP software in India designed to boost compliance and efficiency.',
    link: '/locations/techcloud-erp-software-in-coimbatore',
  },    
  {
    title: 'Chennai',
    image: '/images/contact/chennai.webp',
    description: 'Our ERP in Chennai supports high-volume manufacturing and trading businesses with real-time visibility. Experience the best ERP software in India powered by advanced cloud-based ERP software in India.',
    link: '/locations/techcloud-erp-software-in-chennai',
  } ,    
  {
    title: 'Kolkata',
    image: '/images/contact/kolkata.webp',
    description: 'Kolkata’s businesses, from trading houses to logistics and manufacturing units, need smart ways to stay efficient. Our ERP in Kolkata helps streamline daily operations, manage resources better and give real-time insights so businesses can focus on growth.',
    link: '/locations/techcloud-erp-software-in-kolkata',
  },
  {
    title: 'Mumbai',
    image: '/images/contact/mumbai.webp',
    description: 'Mumbai is India’s financial and commercial hub, where speed and accuracy matter most. Our ERP in Mumbai helps businesses in finance, trading and manufacturing stay ahead with real-time data, smooth workflows and smarter decision-making all in one platform.',
    link: '/locations/techcloud-erp-software-in-mumbai',
  },
  {
    title: 'Kochi',
    image: '/images/contact/kochin.webp',
    description: 'Our ERP in Kochi supports trade, logistics and manufacturing businesses with seamless integration. From finance to inventory, gain real-time visibility and efficiency. Experience reliable ERP software in India built to drive growth in Kerala’s commercial hub.',
    link: '/locations/techcloud-erp-software-in-kochi',
  },
  {
    title: 'Delhi',
    image: '/images/contact/delhi.webp',
    description: 'Our ERP in Delhi supports trading, manufacturing and service firms with seamless cloud integration and real-time visibility. From finance to inventory and operations, drive automation and smarter decisions. Experience Tech Cloud ERP’s scalable solutions tailored for the capital’s fast-paced business ecosystem.',
    link: '/locations/techcloud-erp-software-in-delhi',
  },
  {
    title: 'Ahmedabad',
    image: '/images/contact/ahmedabad.webp',
    description: 'Ahmedabad is a leading hub for textiles, trading and manufacturing. Our ERP in Ahmedabad helps businesses streamline processes, from finance to inventory, while boosting efficiency and scalability. A smarter way to manage growth in a competitive market.',
    link: '/locations/techcloud-erp-software-in-ahmedabad',
  },
  {
    title: 'Vizag',
    image: '/images/contact/vizag.webp',
    description: 'Vizag is building its name in shipping, steel, and growing industries. Our ERP in Vizag helps businesses manage finance, supply chain, and operations in one place, making it easier to handle challenges and focus on steady growth.',
    link: '/locations/techcloud-erp-software-in-vizag',
  }, 
  {
    title: 'Bangalore',
    image: '/images/contact/bangalore.webp',
    description: 'We empower Bangalore’s IT, startup and manufacturing industries with agile ERP solutions. Our ERP in Bangalore ensures seamless integration across finance, HR and operations, driving business efficiency and scalability.',
    link: '/locations/techcloud-erp-software-in-bangalore',
  },
  {
    title: 'UAE',
    image: '/images/contact/uae.webp',
    description: 'UAE’s businesses thrive on efficiency and innovation. Our ERP helps streamline operations, manage resources, and make smarter decisions.',
    link: '/locations/techcloud-erp-software-in-uae',
  },
  // {
  //   title: 'Dubai',
  //   image: '/images/contact/dubai.webp',
  //   description: 'Dubai is a hub for growth and enterprise. Our ERP empowers businesses to manage operations efficiently and scale with real-time insights.',
  //   link: '/locations/techcloud-erp-software-in-dubai',
  // },
  {
    title: 'Bahrain',
    image: '/images/contact/bahrain.webp',
    description: 'Bahrain’s growing business landscape demands flexibility. Our ERP helps companies automate processes, improve productivity, and make informed decisions.',
    link: '/locations/techcloud-erp-software-in-bahrain',
  },
  {
    title: 'Kuwait',
    image: '/images/contact/kuwait.webp',
    description: 'Kuwait’s industries need seamless operations. Our ERP unifies finance, supply chain, and workflows to boost efficiency and drive growth.',
    link: '/locations/techcloud-erp-software-in-kuwait',
  },
 
  
  {
    title: 'Oman',
    image: '/images/contact/oman.webp',
    description: 'Oman’s evolving business environment requires smarter management. Our ERP helps streamline operations and optimize resources for success.',
    link: '/locations/techcloud-erp-software-in-oman',
  }, 
  {
    title: 'Qatar',
    image: '/images/contact/qatar.webp',
    description: 'Qatar’s enterprises need precision and efficiency. Our ERP integrates finance and operations, providing insights to drive growth confidently.',
    link: '/locations/techcloud-erp-software-in-qatar',
  },
  {
    title: 'USA',
    image: '/images/contact/usa.webp',
    description: 'The USA’s dynamic industries require efficient solutions. Our ERP centralises operations, delivers real-time insights, and supports business growth.',
    link: '/locations/techcloud-erp-software-in-usa',
  },
    
  
]; 

// List of Indian cities for filtering
const indianCities = ['Hyderabad', 'Coimbatore', 'Chennai', 'Kolkata', 'Mumbai', 'Kochi', 'Delhi', 'Ahmedabad', 'Vizag', 'Bangalore'];

export default function LocationsGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedLocations, setLoadedLocations] = useState([]);
  const [activeFilter, setActiveFilter] = useState('india'); // 'all', 'india', 'international'
  const [showUAECities, setShowUAECities] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoadedLocations(locations);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Filter locations based on active filter
  const filteredLocations = loadedLocations.filter(loc => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'india') return indianCities.includes(loc.title);
    return !indianCities.includes(loc.title);
  });

  return (
    <div className="locations-container">
      <div className="location-filters">
        <div className="filter-buttons-container">
          <button
            className={`filter-btn ${activeFilter === 'india' ? 'active' : ''}`}
            onClick={() => setActiveFilter('india')}
          >
            India
          </button>
          <button
            className={`filter-btn ${activeFilter === 'international' ? 'active' : ''}`}
            onClick={() => setActiveFilter('international')}
          >
              Middle East & USA
          </button>
        </div>
      </div>
      <div className="locations-page__grid">
      {isLoading ? (
        // Shimmer loading state
        Array(5).fill(0).map((_, idx) => (
          <div className="locations-page__card shimmer" key={idx}>
            <div className="shimmer-image"></div>
            <div className="shimmer-title"></div>
            <div className="shimmer-description"></div>
            <div className="shimmer-button"></div>
          </div>
        ))
      ) : (
        // Actual content
        filteredLocations.map((loc, idx) => (
          <div className="locations-page__card" key={idx}>
            <Image
              src={loc.image}
              alt={loc.title}
              width={300}
              height={200}
              className="locations-page__card-image"
              style={{ objectFit: 'cover' }}
            />
            <h3>{loc.title}</h3>
            <p>{loc.description}</p>
            {/* <Link href={loc.link} className="locations-page__card-button">
              Visit this page
            </Link> */}
            {loc.title === 'UAE' ? (
              <Link href="/locations/techcloud-erp-software-in-uae" className="locations-page__card-button">
                Visit this page
              </Link>
            ) : (
              <Link href={loc.link} className="locations-page__card-button">
                Visit this page
              </Link>
            )}
          </div>
        ))
      )}
      </div>
    </div>
  );
}