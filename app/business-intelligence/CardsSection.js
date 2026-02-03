import Link from 'next/link';
import   './bi.scss';

const services = [
  {
    icon: 'flaticon-big-data',
    title: 'Advanced Analytical Tools',
    description: 'Leverage sophisticated analytical capabilities, including predictive modeling and trend analysis, directly within your ERP system. These tools help anticipate market shifts, optimize operations and identify new business opportunities.',
  },
  {
    icon: 'flaticon-data-analytics',
    title: 'Centralized Information Management',
    description: 'Break down data silos by consolidating information from various departments into a single, unified system. This centralization ensures consistency, reduces redundancy and enhances data accuracy across the organization.',
  },
  {
    icon: 'flaticon-document',
    title: 'Managed Analytics',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.',
  },
  {
    icon: 'flaticon-chart',
    title: 'Enhanced Collaboration Across Teams',
    description: 'Facilitate seamless collaboration by providing a unified platform where teams can access shared insights. BI within ERP systems promotes transparency and aligns departmental goals, fostering a cohesive work environment.',
  },
  {
    icon: 'flaticon-science',
    title: 'Scalable and Flexible Solutions',
    description: 'Adapt to changing business needs with scalable BI-ERP integrations. Whether expanding operations or adjusting to market dynamics, these systems offer the flexibility required to support growth and innovation.',
  },
  {
    icon: 'flaticon-data-management',
    title: 'Improved Decision-Making Accuracy',
    description: 'With BI integrated into ERP, decision-makers gain access to clear, visualized data that highlights key trends, KPIs and exceptions. This clarity reduces guesswork and helps leaders make faster, more confident strategic decisions.',
  }
];

const CardsSection = () => {
  return (
    <section className="servicesSection pt-100 pb-70">
      <div className="container">
        <div className="sectionTitle">
          {/* <span>Our Services</span> */}
          <h2>Explore Our Data Services</h2>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="singleServicesBox">
                <div className="icon">
                  <i className="icon"></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link href="/services/details/" className="serviceBtn">
                  Read More <i className="flaticon-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardsSection;
