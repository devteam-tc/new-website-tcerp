import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

const PageHeader = ({ title = '', breadcrumbs = [] }) => {
  return (
    <section className="ep-page-header-section position-relative">
      {/* ✅ Hero Background Image with fetchPriority */}
      {/* <Image
        src="/images/Banner_bg.webp"
        alt="Hero background"
        fill
        priority
        fetchPriority="high"
        quality={85}
        sizes="100vw"
        style={{
          objectFit: '100% 100%',  
          objectPosition: 'center', 
          zIndex: -1,
        }}
      /> */}
      <div className="container">
        <div className="row">
          <div className="col-md-12 ms-auto">
            <div className="bread-crumb text-center">
            <h3 className="page-title">
              {title || ''}
            </h3>
              <ul className="list-unstyled d-flex flex-wrap align-items-center justify-content-center mt-30">
                {breadcrumbs.length > 0 && breadcrumbs.map((item, index) => (
                  <li key={index} className="d-flex align-items-center">
                    {item.link ? (
                      <Link href={item.link} className="d-flex align-items-center">
                        {item.icon && <item.icon className="me-1" />}
                        {item.label}
                      </Link>
                    ) : (
                      <span className="d-flex align-items-center">
                        {item.icon && <item.icon className="me-1" />}
                        {item.label}
                      </span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                      <FaChevronRight className="ms-2 me-2" style={{ color: 'var(--bs-white-color)' }} />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;