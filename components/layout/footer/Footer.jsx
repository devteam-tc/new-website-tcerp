import Link from 'next/link'
import logo2 from '../../../public/images/logo/logo.svg';
import Image from 'next/image';
import ScrollProgressButton from '../ScrollProgressButton';
import SocialMediaIcons from './SocialMediaIcons';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      {/* scroll to top start */}
      <ScrollProgressButton />
      {/* scroll to top end */}
      <footer className="ep-footer-section">
        <div className="footer-bg">
          <div className="container">
            <div className="footer-main">
              <div className="row g-4">
                <div className="col-xl-3 col-lg-3 col-md-6">
                  <div className="footer-widget footer-about">
                    <div className="logo">
                      <Link href="/">
                        <Image priority src={logo2} alt="logo2" width={200} height={100} />
                      </Link>
                    </div>
                    <div className="short-info mt-3">
                      <p>Tech Cloud ERP delivers top-notch solutions tailored for any business comprehensive features.</p>
                    </div>
                    <div className="contact-info">
                      <ul className="list-unstyled">
                        <li>
                          <div className="d-flex align-items-center gap-2">
                            <div className="icon">
                              <FaMapMarkerAlt size={20} style={{ color: 'var(--bs-primary-500)' }} />
                            </div>
                            <h4 className="title">Address </h4>
                          </div>
                          <p>Plot No. 241, 4th Floor, VVG Elite, Kavuri Hills, Madhapur, Hyderabad, Telangana - 500081.</p>
                        </li>
                        <li>
                          <div className="d-flex align-items-center gap-2">
                            <div className="icon">
                              <FaEnvelope size={20} style={{ color: 'var(--bs-primary-500)' }} />
                            </div>
                            <h4 className="title">Email </h4>
                          </div>
                          <p> <a href="mailto:sales@techclouderp.com">sales@techclouderp.com</a></p>
                        </li>
                        <li>
                          <div className="d-flex align-items-center gap-2">
                            <div className="icon">
                              <FaPhoneAlt size={20} style={{ color: 'var(--bs-primary-500)' }} />
                            </div>
                            <h4 className="title">Phone</h4>
                          </div>
                          <p>
                            <a href="tel:+918919439603">+91 8919439603</a>, <a href="tel:+917032803200">+91 7032803200</a>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="footer-widget footer-links services-widget">
                    <h4 className="footer-title">Useful Links</h4>
                    <ul className="list-unstyled">
                    {/* <i className="fas fa-chevron-right"></i>  */}
                      <li><Link href="/">Home</Link></li>
                      <li><Link href="/about-us"> About Us</Link></li>
                      <li><Link href="/contact-us"> Contact Us</Link></li>
                      <li><Link href="/features"> Our Features</Link></li>
                      <li><Link href="/"> Our Blogs</Link></li>
                      <li><Link href="/locations"> Our Locations</Link></li>
                      <li><Link href="/all-modules"> All Modules</Link></li>
                      <li><Link href="/"> Careers</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-2 col-md-6">
                  <div className="footer-widget footer-links links-widget">
                    <h4 className="footer-title">Industries</h4>
                    <ul className="list-unstyled">
                      <li><Link href="/industries">All Industries</Link></li>
                      <li><Link href="/industries/jewellery-erp-software">Jewellery</Link></li>
                      <li><Link href="/industries/food-and-beverage-erp">Food & Beverage</Link></li>
                      <li><Link href="/industries/pharma-erp-software">Pharma</Link></li>
                      <li><Link href="/industries/plastic-erp-software">Plastic</Link></li>
                      <li><Link href="/industries/sign-manufacturing-erp">Signage</Link></li>
                      <li><Link href="/industries/textile-erp-software">Textile</Link></li>
                      <li><Link href="/industries/foundry-erp-solution">Casting </Link></li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6">
                  <div className="footer-widget footer-links links-widget">
                    <h4 className="footer-title">Others</h4>
                    <ul className="list-unstyled">
                      <li><Link href="/services">All Services </Link></li>
                      <li><Link href="/services/web-development/">Web Development</Link></li>
                      <li><Link href="/services/e-commerce-development/">E-Commerce </Link></li>
                      <li><Link href="/services/app-development/">Mobile App Development</Link></li>
                      <li><Link href="/services/digital-marketing/">Digital Marketing</Link></li>
                      {/* <li><Link href="/all-modules/inventory/">Trading Software</Link></li> */}
                      <li><Link href="/business-intelligence/">Business Intelligence</Link></li>
                      <li><Link href="/all-modules/pos/">POS</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <div className="row align-items-center">
                  <div className="col-lg-4">
                    <div className="footer-copyright text-center text-lg-start">
                      <p>© 2026 Tech Cloud ERP | All Rights Reserved.</p>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="social-icons-container text-center">
                      <SocialMediaIcons />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="footer-menu text-center text-lg-end">
                      <ul className="list-unstyled">
                        <li className="d-inline-block"><Link href="/terms-and-conditions">Terms & Conditions </Link></li>
                        <li className="d-inline-block"><Link href="/terms-and-conditions">|</Link></li>
                        <li className="d-inline-block"><Link href="/privacypolicy">Privacy Policy</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer