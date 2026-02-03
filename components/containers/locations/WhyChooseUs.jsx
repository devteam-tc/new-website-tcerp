
// components/locations/WhyChooseUs.js
import { Col, Container, Row } from 'react-bootstrap';
import { FaUserTie, FaUsers, FaLightbulb, FaCheckCircle, FaStar, FaDollarSign } from 'react-icons/fa';
import Image from 'next/image';
import { locationData } from '../../../data/location';

const defaultData = [
  { icon: <FaUserTie />, title: 'All-in-One ERP Platform', description: 'Manage crm, scales, purchase, inventory, hrm , accounting from a single, unified system to boost business efficiency.' },
  { icon: <FaUsers />, title: 'Customizable Modules', description: 'Tailor the ERP software to suit your industry-specific needs with flexible and scalable module configurations.' },
  { icon: <FaLightbulb />, title: 'Seamless Integration', description: 'Easily connect with eCommerce platforms, POS systems and third-party applications to ensure smooth data flow across your business.' },
  { icon: <FaCheckCircle />, title: 'User-Friendly Interface', description: 'Intuitive dashboards and role-based access simplify operations and reduce the learning curve for your team.' },
  { icon: <FaStar />, title: 'Data Security & Cloud Access', description: 'Enjoy secure, cloud-based access to your business data with regular backups and advanced encryption standards.' },
  { icon: <FaDollarSign />, title: 'Dedicated Support & Training', description: 'Get access to expert assistance, onboarding and training to ensure a successful implementation and smooth day-to-day use.' },
];


export default function WhyChooseUs({ locationKey }) {
  // First try to get data from JSON files, then fall back to hardcoded data, then default
  let data = defaultData;
  
  if (locationData[locationKey]?.items) {
    // Use items from JSON file and transform to match expected format
    data = locationData[locationKey].items.map(item => ({
      imgSrc: item.icon,
      title: item.title,
      description: item.description,
      alt: item.alt
    }));
  } else if (cardsByLocation[locationKey]) {
    // Fall back to hardcoded data if JSON doesn't exist
    data = cardsByLocation[locationKey];
  }

  return (
    <section className="whyChooseUs">
       <Container>
             <Row>
               <Col>
                 {/* <h2 className="heading">Why Choose Tech Cloud ERP?</h2> */}
                 <div className="grid">
                   {data.map((item, index) => (
                     <div
                       key={item.title || index}
                       className="card"
                       style={{ animationDelay: `${index * 0.2}s` }}
                     >
                       <div className="icon">
                         {item.imgSrc ? (
                           <Image 
                             src={item.imgSrc} 
                             alt={item.alt || item.title} 
                             width={50} 
                             height={50}
                             loading="lazy"
                             quality={85}
                           />
                         ) : (
                           item.icon
                         )}
                       </div>
     
                       <h3>{item.title}</h3>
                       <p>{item.description}</p>
                     </div>
                   ))}
                 </div>
               </Col>
             </Row>
           </Container>
    </section>
  );
}