export const dynamic = "force-static"; // Ensures this page is statically generated
import Industries from "../../components/containers/industries/industries";
import CustomCursor from "../../components/layout/CustomCursor";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import PageHeader from "../../components/layout/PageHeader";
import { FaHome } from 'react-icons/fa';
import { getAllCategories } from '../utils/industryUtils';

export const metadata = {
  title: "Tech Cloud ERP | All-in-One Business Solutions",
  description: "Explore Tech Cloud ERP industries to streamline operations, boost efficiency, and drive business growth effectively.",
};

export default async function IndustriesPage() {
  const categories = getAllCategories();
  const breadcrumbs = [
    { label: 'Home', link: '/', icon: FaHome },
    { label: 'All Industries', link: null }
  ];

  return (
    <>
      <Header/>
      <PageHeader title="Industries" breadcrumbs={breadcrumbs}/>
      <Industries categories={categories} />
      <Footer/>
      <CustomCursor/>
    </>
  );
}
