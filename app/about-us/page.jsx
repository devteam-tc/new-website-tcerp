import About from "../../components/containers/home-two/About";
import WhoWeAre from "../../components/containers/home-two/WhoWeAre";
import CustomCursor from "../../components/layout/CustomCursor";
import Footer from "../../components/layout/footer/Footer"
import Header from "../../components/layout/header/Header"
import PageHeader from "../../components/layout/PageHeader"
import { FaHome } from 'react-icons/fa';
import UniqueFeatures from "../../components/containers/home-two/UniqueFeatures";
import CeoComponent from "../../components/containers/home/modern-ceo-section"
import OurVisionSection from '../../components/containers/home-two/OurVisionSection'
import CtaSection from "../../components/containers/modules/CtaSection";
import WhyTechCloud from '../about-us/WhyTechCloud';
import OurPartnerSection from "../../components/containers/home/OurPartnerSection";

// Generate static metadata
export async function generateMetadata() {
  return {
    title: 'About Tech Cloud ERP | Best ERP Software Provider in India',
    description: 'Tech Cloud ERP – the best ERP software provider in India, delivering innovative, customized solutions that streamline operations and support diverse industry needs.',
    keywords: 'ERP software solution in hyderabad, Best ERP Solutions Provider in India, cloud-based ERP solutions provider in India, Manufacturing ERP, Manufacturing Software, Production ERP, Production Software, Manufacturing ERP software, Production ERP software',
  };
}

const page = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/', icon: FaHome },
    { label: 'About Us', link: null }
  ];
  return (
    <>
      <Header/>
      <PageHeader title="About Us" breadcrumbs={breadcrumbs}/>
      {/* <About /> */}
      <OurVisionSection />
      <WhoWeAre/>
      <WhyTechCloud />
      <CeoComponent/>
      <OurPartnerSection/>
      <UniqueFeatures/>
      <CtaSection />
      <Footer/>
      <CustomCursor/>
    </>
  )
}

export default page;
