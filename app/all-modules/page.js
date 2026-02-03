import React from "react";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import { FaHome } from "react-icons/fa";
import PageHeader from "../../components/layout/PageHeader";
import ModulePage from "./ModulePage";
import CustomCursor from "../../components/layout/CustomCursor";

// Generate static metadata
export async function generateMetadata() {
  return {
    title: "All-in-One ERP Modules for Smarter Operations",
    description: "Manage all aspects of your business with our flexible ERP modules, built to enhance decision-making, simplify manual tasks and increase efficiency.",
    keywords: "ERP modules, business management, automation, real-time insights, ERP software, business operations",
  };
}

const AllModulesSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const breadcrumbs = [
    { label: 'Home', link: '/', icon: FaHome },
    { label: 'All Modules', link: null }
  ];
  return (
    <>
      <Header />
      <PageHeader title="All Modules" breadcrumbs={breadcrumbs} />
      <ModulePage />
      <Footer />
      <CustomCursor/>
    </>
  );
};

export default AllModulesSection;