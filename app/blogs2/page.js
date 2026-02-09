// "use client";

// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase12";
// import Link from "next/link";
// import { serverTimestamp } from "firebase/firestore";
// import Headers from "../../components/layout/header/Header";
// import PageHeader from "../../components/layout/PageHeader";
// import Footer from "../../components/layout/footer/Footer";
// import CustomCursor from "../../components/layout/CustomCursor";



// export default function Home() {
//   const [blogs, setBlogs] = useState([]);
// const formatDate = (createdAt) => {
//   if (!createdAt) return 'No date';
  
//   if (typeof createdAt.toDate === 'function') {
//     return new Date(createdAt.toDate()).toLocaleDateString();
//   } else if (typeof createdAt === 'string') {
//     return new Date(createdAt).toLocaleDateString();
//   } else if (createdAt instanceof Date) {
//     return createdAt.toLocaleDateString();
//   }
  
//   return 'Invalid date';
// };

//   useEffect(() => {
//   let isMounted = true;
  
//   const fetchBlogs = async () => {
//     try {
//       console.log("Fetching blogs from Firebase...");
//       const querySnapshot = await getDocs(collection(blogDb, "blog"));
      
//       if (isMounted) {
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         console.log("Fetched blogs data:", data);
//         setBlogs(data);
//       }
//     } catch (error) {
//       if (isMounted) {
//         console.error("Error fetching blogs:", error);
//       }
//     }
//   };
 
//   fetchBlogs();
  
//   return () => {
//     isMounted = false;
//   };
// }, []);


//   return (
//     <div >
//       <Headers />
//       <PageHeader />
//       <CustomCursor />
//       {/* Blog Grid */}
//       <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
//         <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#1f2937' }}>
//           Latest Blog Posts
//         </h2>
        
//         <div style={{ 
//           display: 'grid', 
//           gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
//           gap: '2rem' 
//         }}>
//           {blogs.map((blog) => (
//             <div key={blog.id} style={{ 
//               backgroundColor: 'white', 
//               borderRadius: '0.5rem', 
//               boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
//               overflow: 'hidden',
//               transition: 'box-shadow 0.3s ease'
//             }}>
//               <div style={{ 
//                 height: '12rem', 
//                 background: 'linear-gradient(to right, #60a5fa, #a78bfa)' 
//               }}></div>
//               <div style={{ padding: '1.5rem' }}>
//                 <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#1f2937' }}>
//                 <Link 
//                   href={`/blogs2/blog-detail?slug=${blog.slug}`} 
//                   style={{ color: '#1f2937', textDecoration: 'none' }}
//                 >
//                   {blog.title}
//                 </Link>
//                 </h3>
//                 <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.875rem', lineHeight: '1.5' }}>
//                   {blog.content ? blog.content.substring(0, 150) + '...' : 'No content available...'}
//                 </p>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
//                    {blog.createdAt ? 
//                       (typeof blog.createdAt.toDate === 'function' 
//                         ? new Date(blog.createdAt.toDate()).toLocaleDateString()
//                         : new Date(blog.createdAt).toLocaleDateString())
//                       : 'No date'
//                     }
//                   </span>
//                  <Link 
//                     href={`/blogs2/blog-detail?slug=${blog.slug}`} 
//                     style={{
//                       backgroundColor: '#2563eb',
//                       color: 'white',
//                       padding: '0.5rem 1rem',
//                       borderRadius: '0.375rem',
//                       textDecoration: 'none',
//                       fontSize: '0.875rem'
//                     }}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       console.log("Clicked blog:", blog);
//                       console.log("Blog slug:", blog.slug);
//                       console.log("Generated URL:", `/blogs2/blog-detail?slug=${blog.slug}`);
//                       window.location.href = `/blogs2/blog-detail?slug=${blog.slug}`;
//                     }}
//                   >
//                     Read More
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
//           <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//             <button style={{ 
//               padding: '0.5rem 1rem', 
//               border: '1px solid #d1d5db', 
//               borderRadius: '0.375rem', 
//               backgroundColor: 'white',
//               cursor: 'pointer'
//             }}>
//               Previous
//             </button>
//             <button style={{ 
//               padding: '0.5rem 1rem', 
//               backgroundColor: '#2563eb', 
//               color: 'white', 
//               borderRadius: '0.375rem',
//               cursor: 'pointer'
//             }}>
//               1
//             </button>
//             <button style={{ 
//               padding: '0.5rem 1rem', 
//               border: '1px solid #d1d5db', 
//               borderRadius: '0.375rem', 
//               backgroundColor: 'white',
//               cursor: 'pointer'
//             }}>
//               2
//             </button>
//             <button style={{ 
//               padding: '0.5rem 1rem', 
//               border: '1px solid #d1d5db', 
//               borderRadius: '0.375rem', 
//               backgroundColor: 'white',
//               cursor: 'pointer'
//             }}>
//               3
//             </button>
//             <button style={{ 
//               padding: '0.5rem 1rem', 
//               border: '1px solid #d1d5db', 
//               borderRadius: '0.375rem', 
//               backgroundColor: 'white',
//               cursor: 'pointer'
//             }}>
//               Next
//             </button>
//           </nav>
//         </div>
//       </div>
//       <Footer />
//       <CustomCursor />
//     </div>
    
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { blogDb } from "../../firebaseConfig";
import Link from "next/link";
import Headers from "../../components/layout/header/Header";
import PageHeader from "../../components/layout/PageHeader";
import Footer from "../../components/layout/footer/Footer";
import CustomCursor from "../../components/layout/CustomCursor";
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6; // Changed to 12 for 3x4 grid

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

  // Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(blogDb, "blog"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div>
      <Headers />
      <PageHeader />
      <CustomCursor />

      {/* Hero Section */}
      <div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 className="hero-title" style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              marginBottom: '1rem', 
              color: '#1e293b',
              lineHeight: '1.2'
            }}>
              Blog
            </h1>
            <p className="hero-subtitle" style={{ 
              fontSize: '1.125rem', 
              color: '#64748b', 
              maxWidth: '500px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem ipsum est.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="blog-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <style jsx>{`
          .blog-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
          @media (max-width: 1024px) {
            .blog-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1.5rem;
            }
          }
          @media (max-width: 640px) {
            .blog-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
            }
          }
          .blog-card {
            background-color: white;
            border-radius: 0.75rem;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
          }
          .blog-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }
          .blog-image {
            height: 240px;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .blog-placeholder {
            width: 60px;
            height: 60px;
            background-color: #cbd5e1;
            border-radius: 0.5rem;
          }
          .blog-content {
            padding: 1.5rem;
          }
          .blog-date {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
            color: #64748b;
            font-size: 0.875rem;
          }
          .blog-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #1e293b;
            line-height: 1.4;
          }
          .blog-description {
            color: #64748b;
            margin-bottom: 1.5rem;
            font-size: 0.875rem;
            line-height: 1.6;
          }
          .blog-read-more {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #3b82f6;
            font-weight: 500;
            font-size: 0.875rem;
          }
          @media (max-width: 1024px) {
            .blog-container {
              padding: 3rem 1.5rem;
            }
          }
          @media (max-width: 640px) {
            .hero-title {
              font-size: 2rem !important;
            }
            .hero-subtitle {
              font-size: 1rem !important;
            }
            .blog-container {
              padding: 2rem 1rem;
            }
            .blog-image {
              height: 200px;
            }
            .blog-content {
              padding: 1rem;
            }
            .blog-title {
              font-size: 1.125rem;
            }
            .blog-description {
              font-size: 0.8rem;
            }
          }
        `}</style>
        
        <div className="blog-grid">
          {currentBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <Link href={`/blogs2/blog-detail?slug=${blog.slug}`} style={{ textDecoration: 'none', color: 'inherit' , width: '100%'}}>
                <div className="blog-image">
                  {blog.image1 ? (
                    <img 
                      src={blog.image1} 
                      alt={blog.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div className="blog-placeholder"></div>
                  )}
                </div>
                <div className="blog-content">
                  <div className="blog-date">
                    <FaCalendarAlt />
                    {formatDate(blog.createdAt)}
                  </div>
                  <h3 className="blog-title">
                    {blog.title}
                  </h3>
                  <div className="blog-content">
                    <p>
                      {blog.brocher?.text || 
                       (blog.content ? blog.content.substring(0, 150) + '...' : 
                       'Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem ipsum est.')}
                    </p>
                  </div>
                  <div className="blog-read-more">
                    View More
                    <FaArrowRight />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {/* Previous */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  backgroundColor: currentPage === 1 ? "#f8fafc" : "white",
                  color: currentPage === 1 ? "#a0aec0" : "#4a5568",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "all 0.2s ease"
                }}
              >
                Previous
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #e2e8f0",
                    backgroundColor:
                      currentPage === index + 1 ? "#3b82f6" : "white",
                    color:
                      currentPage === index + 1 ? "white" : "#4a5568",
                    cursor: "pointer",
                    fontWeight: "500",
                    transition: "all 0.2s ease"
                  }}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < totalPages ? prev + 1 : prev
                  )
                }
                disabled={currentPage === totalPages}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  backgroundColor:
                    currentPage === totalPages ? "#f8fafc" : "white",
                  color: currentPage === totalPages ? "#a0aec0" : "#4a5568",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "all 0.2s ease"
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
      <CustomCursor />
    </div>
  );
}
