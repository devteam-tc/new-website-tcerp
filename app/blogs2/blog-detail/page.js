"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
// import { db } from '../../firebase12';
import { blogDb } from '../../../firebaseConfig';
import Headers from "../../../components/layout/header/Header";
import PageHeader from "../../../components/layout/PageHeader";
import Footer from "../../../components/layout/footer/Footer";
import CustomCursor from "../../../components/layout/CustomCursor";
import { FaCalendarAlt, FaUser, FaArrowRight, FaClock } from 'react-icons/fa';
import facebook from "../../../public/assets/images/blogs/facebook.png";
import linkedin from "../../../public/assets/images/blogs/linkedin.png"; 
import twitter from "../../../public/assets/images/blogs/twitter.png";
import Image from "next/image";

function BlogDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format Date
  const formatDate = (createdAt) => {
    if (!createdAt) return "No date";

    if (typeof createdAt.toDate === "function") {
      return new Date(createdAt.toDate()).toLocaleDateString();
    } else if (typeof createdAt === "string") {
      return new Date(createdAt).toLocaleDateString();
    } else if (createdAt instanceof Date) {
      return createdAt.toLocaleDateString();
    }

    return "Invalid date";
  };

  // Calculate reading time
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const text = content || '';
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  useEffect(() => {
    const fetchBlog = async () => {
      const slug = searchParams.get('slug');
      
      if (!slug) {
        setLoading(false);
        return;
      }
      
      try {
        // Try by slug first
        const blogQuery = query(
          // collection(db, "blog"),
          collection(blogDb, "blog"),
          where("slug", "==", slug)
        );
        const querySnapshot = await getDocs(blogQuery);
        
        if (!querySnapshot.empty) {
          const blogData = {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data()
          };
          setBlog(blogData);
          
          // Fetch related blogs (excluding current blog)
          const allBlogsQuery = await getDocs(collection(db, "blog"));
          const allBlogs = allBlogsQuery.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(b => b.id !== blogData.id)
            .slice(0, 3); // Get 3 related blogs
          setRelatedBlogs(allBlogs);
        } else {
          // Try by document ID
          // const docRef = doc(db, "blog", slug);
          const docRef = doc(blogDb, "blog", slug); 
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const blogData = {
              id: docSnap.id,
              ...docSnap.data()
            };
            setBlog(blogData);
            
            // Fetch related blogs
            const allBlogsQuery = await getDocs(collection(db, "blog"));
            const allBlogs = allBlogsQuery.docs
              .map(doc => ({ id: doc.id, ...doc.data() }))
              .filter(b => b.id !== blogData.id)
              .slice(0, 3);
            setRelatedBlogs(allBlogs);
          }
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        console.error("Error details:", error.message);
        console.error("Error code:", error.code);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [searchParams]);

  if (loading) {
    return (
      <div>
        <Headers />
        <PageHeader />
 
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #2563eb',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <p>Loading...</p>
          </div>
        </div>
        <Footer />
        
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Headers />
        <PageHeader />
        
        <div style={{ minHeight: '60vh', backgroundColor: '#f9fafb', padding: '2rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1>Blog Post Not Found</h1>
            <button 
              onClick={() => router.push('/blogs2/')}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              ← Back to Blogs
            </button>
          </div>
        </div>
        <Footer />
         
      </div>
    );
  }

  return (
    
    <div >
      <Headers />
      <PageHeader />
      <CustomCursor />
      <style jsx>{` 
        .hero {
             background: transparent;
            -webkit-border-radius: 1.5rem;
            -moz-border-radius: 1.5rem;
            border-radius: 1.5rem;
            padding-bottom: 20px;
            margin-bottom: 3rem;
            text-align: center;
            color: #ff5834;
            position: relative;
            overflow: hidden;
            -webkit-box-shadow: 0 25px 50px -12px rgba(0, 0, 0, .25);
            -moz-box-shadow: 0 25px 50px -12px rgba(0,0,0,.25);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, .25);
        }
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          z-index: 1;
        }
        .hero::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          animation: float 20s ease-in-out infinite;
          z-index: 1;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
       
          .hero{
          margin-bottom:20px;
          }
        .hero-title{
        font-family: Inter;
        font-weight: 700;
        font-style: Bold;
        font-size: 24px;
        leading-trim: NONE;
        line-height: 100%;
        letter-spacing: 0%;
        vertical-align: middle; 
        } 
        .img-fluid{
          width: 100%;
          height: 375px;
          object-fit: cover;
        }
        .section-card {
          background: white;
          border-radius: 1.5rem;
          padding: 3rem;
          border: 1px solid rgba(226, 232, 240, 0.5);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .section-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .section-card:hover::before {
          transform: scaleX(1);
        }
        .section-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .section-icon {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        .block-heading{
        font-family: Inter;
        font-weight: 600;
        font-style: Semi Bold;
        font-size: 20px; 
        line-height: 100%;
        letter-spacing: 0%;
        vertical-align: middle;
        color: #000000;
        margin-bottom:10px; 
        margin-top:10px;
        }
        .section-title {
           
          font-weight: 700;
          font-style: 500;
          font-size: 25px; 
          line-height: 100%;
          letter-spacing: 0%;
          vertical-align: middle;
          color: #D94B23;
          margin-bottom:10px;
        }
        .section-description {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #475569;
          
          white-space: pre-wrap;
          
          margin-bottom:0px;
        }
        .content-section{
          margin-bottom:20px;
        }
        .content-sectiontwo{
          color:#047791; 
          font-weight: 600;
          font-style: Semi Bold;
          font-size: 25px;
          leading-trim: NONE;
          line-height: 100%;
          letter-spacing: 0%;
          vertical-align: middle; 
        }
        .section-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 1rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .challenge-item {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-left: 4px solid #3b82f6;
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
          .toc-card{ 
            width: 390px;
            height: auto;
            opacity: 1;
            gap: 15px;
            border-radius: 20px;
            border-width: 2px;
            padding-top: 25px;
            padding-right: 10px;
            padding-bottom: 10px;
            padding-left: 25px;
            border: 2px solid #F8AF9B;
            box-shadow: 0px 0px 15px 0px #EF522633;
            box-shadow: 0px 0px 15px 0px #EF522626 inset;
          }
         .toc-title{
          border-bottom: 3px solid #F48B6E;
          width: 75%;
          }
         .toc-list{
            padding:5px;
            margin:10px 0px;
             color:#000000;
             list-style: none;
         } 
         .toc-list a{
             color: #ff6b00;
             text-decoration: none;
             font-weight: 500;
         }
         .toc-list a:hover{
             text-decoration: underline;
         } 
             .share-section{
                 display: flex;
                  margin: 10px 0px;
                  flex-direction: row;
                  align-content: center;
                  align-items: center;
                  gap:10px;
             }

             .share-title{
             font-family: Inter;
            font-weight: 500;
            font-style: Medium;
            font-size: 14px;
            leading-trim: NONE;
            line-height: 100%;
            letter-spacing: 0%;
            }
            .share-icons{
            display:flex;
            gap:10px;
            }
       .author-content {
        width: 390px;
         }

         .author-info{
          display: flex;
          align-items: center;
          gap: 1rem;
          padding:2px;
           border-radius: 20px;
            border-width: 2px;
            padding-top: 25px; 
         }
         .author-info-img{
         width:100%;
         height:100%;
         }
        .challenge-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .challenge-item:hover::before {
          opacity: 1;
        }
        .challenge-item:hover {
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
          transform: translateX(8px);
        }
        .challenge-heading {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }
        .challenge-text {
          color: #475569;
          line-height: 1.7;
          font-size: 1rem;
        }
        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          position: relative;
        }
        .benefit-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .benefit-item:hover::before {
          opacity: 1;
        }
        .benefit-item:hover {
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.15);
          transform: translateY(-4px);
        }
        .benefit-number {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 1.25rem;
          flex-shrink: 0;
          box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
        }
        .benefit-content {
          flex: 1;
        }
        .benefit-heading {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.75rem;
        }
        .benefit-text {
          color: #475569;
          line-height: 1.7;
          font-size: 1rem;
        }
         
        
        .faq-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 2;
        }
        .faq-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
         
        .faq-grid {
          display: grid;
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
       
        .faq-question { 
          margin-top:10px;
          font-weight: 700; 
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.125rem;
        }
        .faq-answer {
         
          color: #475569;
          line-height: 1.7;
           font-size: 1rem;
        }
        .related-section {
          margin-top: 4rem;
          padding-top: 4rem;
          border-top: 2px solid rgba(226, 232, 240, 0.5);
        }
        .related-title {
          font-size: 2rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 3rem;
          text-align: center;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }
        .related-card {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
        }
        .related-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .related-card:hover::before {
          transform: scaleX(1);
        }
        .related-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        .related-image {
          width: 100%;
          height: 250px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .related-placeholder {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
          border-radius: 1rem;
        }
        .related-content {
          padding: 2rem;
        }
        .related-title-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          line-height: 1.4;
          margin-bottom: 1rem;
        }
        .related-date {
          font-size: 0.875rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 1rem;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.3s ease;
          margin-bottom: 2rem;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
        }
        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #f3f4f6;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 2rem;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
         
          .blog-hero {
            padding: 2rem 1.5rem;
            margin-bottom: 2rem;
          }
          
          .blog-hero-meta {
            flex-direction: column;
            gap: 0.75rem;
            align-items: center;
          }
          .section-card {
            padding: 2rem;
            margin-bottom: 1.5rem;
          }
          .section-title {
            font-size: 1.5rem;
          }
          .faq-section {
            padding: 2rem 1.5rem;
            margin: 2rem 0;
          }
          .faq-title {
            font-size: 2rem;
          }
          .related-grid {
            grid-template-columns: 1fr;
          }
          .challenge-item, .benefit-item {
            padding: 1.5rem;
          }
          .img-fluid{ 
            height: auto; 
          }
        }
      `}</style>
      <div className='container'>
      <div className="blog-layout row">
        {/* Left Column - Main Content */}
        <div className="main-content col-md-8">
          {/* Hero Section */}
          <div className="hero">
            {blog.brocher?.imageUrl ? (
              <img src={blog.brocher.imageUrl} alt={blog.title} className="img-fluid" />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}></div>
            )}
            <div className="hero-overlay"></div>
            <h1 className="hero-title">{blog.title}</h1>
          </div>

          {/* Main Heading + Intro */}
          {blog.contentSection && Object.keys(blog.contentSection).map((sectionKey) => {
            const section = blog.contentSection[sectionKey];
            return (
              <div key={sectionKey} className="content-section" id={`content-section-${sectionKey}`}>
                <h2 className="section-title">{section.title}</h2>
                {section.description && Object.keys(section.description).map((descKey) => (
                  <p key={descKey} className="section-description">
                    {section.description[descKey]}
                  </p>
                ))}
              </div>
            );
          })}

          {/* Challenges Section */}
          {blog.contentSection2 && blog.contentSection2['1'] && (
            <div className="content-section" id="content-section2-1">
              <h2 className="section-title content-sectiontwo">{blog.contentSection2['1'].title}</h2>
              <p className="section-description">{blog.contentSection2['1'].shortDescription}</p>
              {blog.contentSection2['1'].description && Object.keys(blog.contentSection2['1'].description).map((itemKey) => {
                const item = blog.contentSection2['1'].description[itemKey];
                return (
                  <div key={itemKey} className="challenge-block">
                    <h3 className="block-heading">{item.heading}</h3>
                    <p className="block-text">{item.text}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Transform Section */}
          {blog.contentSection2 && blog.contentSection2['2'] && (
            <div className="content-section" id="content-section2-2">
              <h2 className="section-title content-sectiontwo">{blog.contentSection2['2'].title}</h2>
              <p className="section-description">{blog.contentSection2['2'].shortDescription}</p>
              {blog.contentSection2['2'].description && Object.keys(blog.contentSection2['2'].description).map((itemKey) => {
                const item = blog.contentSection2['2'].description[itemKey];
                return (
                  <div key={itemKey} className="transform-block">
                    <h3 className="block-heading">{item.heading}</h3>
                    <p className="block-text">{item.text}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Benefits Section */}
          {blog.contentSection2 && blog.contentSection2['3'] && (
            <div className="content-section" id="content-section2-3">
              <h2 className="section-title">{blog.contentSection2['3'].title}</h2>
              <p className="section-description">{blog.contentSection2['3'].shortDescription}</p>
              {blog.contentSection2['3'].description && Object.keys(blog.contentSection2['3'].description).map((itemKey) => {
                const item = blog.contentSection2['3'].description[itemKey];
                return (
                  <div key={itemKey} className="benefit-block">
                    <h3 className="block-heading">{item.heading}</h3>
                    <p className="block-text">{item.text}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Conclusion */}
          {blog.Conclusion && (
            <div className="conclusion" id="conclusion">
              <h3 className='section-title'>Conclusion</h3>
              <p>{blog.Conclusion}</p>
            </div>
          )}

          {/* FAQ Section */}
          {blog.faqSection && (
            <div className="faq-section" id="faq-section">
              <h2 className="section-title">{blog.faqSection.title}</h2>
              {/* {blog.faqSection.description && (
                <p className="section-description">{blog.faqSection.description}</p>
              )} */}
              {blog.faqSection.faqs && Object.keys(blog.faqSection.faqs).map((faqKey) => {
                const faq = blog.faqSection.faqs[faqKey];
                return (
                  <div key={faqKey} className="faq-item">
                    <div className="faq-question">
                      {faq.question}
                     
                    </div>
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="sidebar col-md-4">
          {/* Table of Contents */}
          <div className="toc-card">
            <h3 className="toc-title">Table of Contents</h3>
            <ol className="toc-list">
              {blog.contentSection && Object.keys(blog.contentSection).map((sectionKey) => (
                <li key={sectionKey}>
                  <a href={`#content-section-${sectionKey}`}>{blog.contentSection[sectionKey].title}</a>
                </li>
              ))}
              {blog.contentSection2 && blog.contentSection2['1'] && (
                <li>
                  <a href={`#content-section2-1`}>{blog.contentSection2['1'].title}</a>
                </li>
              )}
              {blog.contentSection2 && blog.contentSection2['2'] && (
                <li>
                  <a href={`#content-section2-2`}>{blog.contentSection2['2'].title}</a>
                </li>
              )}
              {blog.contentSection2 && blog.contentSection2['3'] && (
                <li>
                  <a href={`#content-section2-3`}>{blog.contentSection2['3'].title}</a>
                </li>
              )}
              {blog.Conclusion && (
                <li>
                  <a href="#conclusion">Conclusion</a>
                </li>
              )}
              {blog.faqSection && (
                <li>
                  <a href="#faq-section">FAQ</a>
                </li>
              )}
            </ol>
          </div>

          {/* Author Card */}
          <div className="author-card">
            <div className="author-content">
              
              <div className="author-info">
                <img 
                  src="https://res.cloudinary.com/techclouderp/image/upload/v1770289281/blogimg_mhjwse.png" 
                  alt="Author" 
                  className='author-info-img'
                  
                />
              </div>
            </div>
          </div>

          {/* Share Icons */}
          <div className="share-section">
            <h3 className="share-title">Share this post</h3>
            <div className="share-icons">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-icon"
              >
                <Image
                  src={facebook}
                  alt="Share on Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-icon"
              >
                <Image
                  src={linkedin}
                  alt="Share on LinkedIn"
                  width={24}
                  height={24}
                />
              </a>
               
              <a 
                href={`https://twitter.com/intent/tweet?text=${blog.title ? encodeURIComponent(blog.title) : encodeURIComponent('Check out this blog post')}&url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-icon"
              >
                <Image
                  src={twitter}
                  alt="Share on Twitter"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>

      <Footer />
      <CustomCursor />
    </div>
  );
}

export default function BlogDetail() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <BlogDetailContent />
    </Suspense>
  );
}
