import PrivacyPage from "../../components/containers/privacypolicy/PrivacyPage";
import CustomCursor from "../../components/layout/CustomCursor";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import PageHeader from "../../components/layout/PageHeader";
import { FaHome } from 'react-icons/fa';




export const metadata = {
  title: "Tech Cloud ERP - Privacy Policy",
  description: "Learn how Tech Cloud ERP collects, uses & protects your data. Understand our privacy practices, user rights & commitment to data security.",
  keywords: "what is privacy policy, privacy policy, top privacy policy software, ERP and privacy policy",
};

const page = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/', icon: FaHome },
    { label: 'Privacy Policy', link: null }
  ];
  return (
    <>
      <Header/>
      <PageHeader title="Privacy Policy" breadcrumbs={breadcrumbs}/>
      <PrivacyPage />
      <Footer/>

      <CustomCursor/>
    </>
  )
}

export default page;