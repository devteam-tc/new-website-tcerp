import Pricing from "../../components/containers/home-two/Pricing";
import CustomCursor from "../../components/layout/CustomCursor";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import PageHeader from "../../components/layout/PageHeader";
import { FaHome } from 'react-icons/fa';
import TermsPage from '../../components/containers/terms-and-conditions/TermsPage';


export const metadata = {
  title: "Tech Cloud ERP - Terms & Conditions",
  description: "Review the Terms & Conditions for using Tech Cloud ERP: legal terms, user responsibilities, service use, limitations & policies governing the platform.",
  keywords: "what is terms and conditions, terms and conditions, top terms and conditions software, ERP and terms and conditions",
};

const page = () => {
  
  const breadcrumbs = [
    { label: 'Home', link: '/', icon: FaHome },
    { label: 'Terms & Conditions', link: null }
  ];
  return (
    <>
      <Header/>
      <PageHeader title="Terms & Conditions" breadcrumbs={breadcrumbs}/>
      <TermsPage />
      <Footer/> 
      <CustomCursor/>
    </>
  )
}

export default page;