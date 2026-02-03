// page.js
import IntroSection from './Introsection';
import Footer from '../../components/layout/footer/Footer';
import CustomCursor from "../../components/layout/CustomCursor";
import AuditPage from '../../components/containers/modules/AuditPage';
import Faq from '../../components/containers/home/Faq';
import Header from '../../components/layout/header/Header';
import PageHeader from '../../components/layout/PageHeader';
import BusinessCards from './BusinessCards';
import { FaHome } from 'react-icons/fa';

const breadcrumbs = [
  { label: 'Home', link: '/', icon: FaHome },
  { label: 'Business Intelligence', link: null }
];
export const metadata = {
  title: "Maximize Efficiency with ERP Business Intelligence Systems | Tech Cloud ERP",
  description: "Unlock powerful insights with ERP business intelligence to drive smarter decisions, improve efficiency, and boost your company’s growth and performance.",
  keywords: "what is business intelligence, business intelligence, top business intelligence software, ERP and Business Intelligence",
};
// Function to generate FAQ structured data
const generateFAQSchema = (faqs) => {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
      <PageHeader title="Business Intelligence" breadcrumbs={breadcrumbs} />
      <IntroSection />
     <AuditPage />
     <BusinessCards />
     <Faq />
    </main>
      <Footer />
      <CustomCursor/>
    </div>
  );
}
