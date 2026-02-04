import CustomCursor from "../../components/layout/CustomCursor";
import Footer from "../../components/layout/footer/Footer"
import Header from "../../components/layout/header/Header"
import PageHeader from "../../components/layout/PageHeader"
import { FaHome } from 'react-icons/fa';
import BlogsBody from "./blogsBody";
 

// Generate static metadata
export async function generateMetadata() {
  return {
    title: 'Blogs | Tech Cloud ERP - Latest Insights & Updates',
    description: 'Read the latest blogs from Tech Cloud ERP. Discover insights, updates, and expert opinions on ERP solutions, business management, and industry trends.',
    keywords: 'Tech Cloud ERP blogs, ERP insights, business management blogs, cloud ERP updates, industry trends, expert opinions',
  };
}

const page = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/', icon: FaHome },
    { label: 'Blogs', link: null }
  ];
  return (
    <>
      <Header/>
      <PageHeader title="Blogs" breadcrumbs={breadcrumbs}/>
       <BlogsBody/>
      <Footer/>
      <CustomCursor/>
    </>
  )
}

export default page;