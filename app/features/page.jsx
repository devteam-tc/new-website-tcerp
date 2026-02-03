
import CustomCursor from "../../components/layout/CustomCursor";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import PageHeader from "../../components/layout/PageHeader";
import FeaturePage from "./FeaturePage";
import { FaHome } from 'react-icons/fa';


export const metadata = {
  title: "Top Features That Simplify Your Business Operations | Tech Cloud ERP",
  description: "Discover key features of our software that automate workflows, enhance decision-making and drive efficiency for businesses of all sizes and industries.",
  keywords: "what is features, features, top features software, ERP and features",
};

const page = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/' , icon: FaHome  },
    { label: 'Features', link: null }
  ];
  return (
    <>
      <Header/>
      <PageHeader title="Features" breadcrumbs={breadcrumbs}/>
    <FeaturePage />
      <Footer/>
      <CustomCursor/>
    </>
  )
}

export default page;
