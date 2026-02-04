"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase12";
import Link from "next/link";
import { serverTimestamp } from "firebase/firestore";
import Headers from "../../components/layout/header/Header";
import PageHeader from "../../components/layout/PageHeader";
import Footer from "../../components/layout/footer/Footer";
import CustomCursor from "../../components/layout/CustomCursor";



export default function Home() {
  const [blogs, setBlogs] = useState([]);
const formatDate = (createdAt) => {
  if (!createdAt) return 'No date';
  
  if (typeof createdAt.toDate === 'function') {
    return new Date(createdAt.toDate()).toLocaleDateString();
  } else if (typeof createdAt === 'string') {
    return new Date(createdAt).toLocaleDateString();
  } else if (createdAt instanceof Date) {
    return createdAt.toLocaleDateString();
  }
  
  return 'Invalid date';
};

  useEffect(() => {
  let isMounted = true;
  
  const fetchBlogs = async () => {
    try {
      console.log("Fetching blogs from Firebase...");
      const querySnapshot = await getDocs(collection(db, "blog"));
      
      if (isMounted) {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched blogs data:", data);
        setBlogs(data);
      }
    } catch (error) {
      if (isMounted) {
        console.error("Error fetching blogs:", error);
      }
    }
  };
 
  fetchBlogs();
  
  return () => {
    isMounted = false;
  };
}, []);


  return (
    <div >
      <Headers />
      <PageHeader />
      <CustomCursor />
      {/* Hero Section */}
      <div style={{ 
        position: 'relative', 
        height: '24rem', 
        background: 'linear-gradient(to right, #2563eb, #9333ea)' 
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundColor: 'rgba(0,0,0,0.4)' 
        }}></div>
        <div style={{ 
          position: 'relative', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 1rem', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Welcome to Our Blog
            </h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
              Discover amazing stories and insights
            </p>
            {/* <Link 
              href="/blogs/create-blog" 
              style={{
                backgroundColor: 'white',
                color: '#2563eb',
                padding: '0.75rem 2rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              Create New Blog
            </Link> */}
            <button
  onClick={() => window.location.href = '/blogs2/blogs/create-blog/'}
  style={{
    backgroundColor: 'white',
    color: '#2563eb',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    textDecoration: 'none',
    border: '2px solid #2563eb',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = '#2563eb';
    e.target.style.color = 'white';
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#2563eb';
  }}
>
  Create New Blog
</button>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#1f2937' }}>
          Latest Blog Posts
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {blogs.map((blog) => (
            <div key={blog.id} style={{ 
              backgroundColor: 'white', 
              borderRadius: '0.5rem', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
              overflow: 'hidden',
              transition: 'box-shadow 0.3s ease'
            }}>
              <div style={{ 
                height: '12rem', 
                background: 'linear-gradient(to right, #60a5fa, #a78bfa)' 
              }}></div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#1f2937' }}>
                <Link 
                  href={`/blogs2/blog-detail?slug=${blog.slug}`} 
                  style={{ color: '#1f2937', textDecoration: 'none' }}
                >
                  {blog.title}
                </Link>
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.875rem', lineHeight: '1.5' }}>
                  {blog.content ? blog.content.substring(0, 150) + '...' : 'No content available...'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                   {blog.createdAt ? 
                      (typeof blog.createdAt.toDate === 'function' 
                        ? new Date(blog.createdAt.toDate()).toLocaleDateString()
                        : new Date(blog.createdAt).toLocaleDateString())
                      : 'No date'
                    }
                  </span>
                 <Link 
                    href={`/blogs2/blog-detail?slug=${blog.slug}`} 
                    style={{
                      backgroundColor: '#2563eb',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      textDecoration: 'none',
                      fontSize: '0.875rem'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Clicked blog:", blog);
                      console.log("Blog slug:", blog.slug);
                      console.log("Generated URL:", `/blogs2/blog-detail?slug=${blog.slug}`);
                      window.location.href = `/blogs2/blog-detail?slug=${blog.slug}`;
                    }}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button style={{ 
              padding: '0.5rem 1rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.375rem', 
              backgroundColor: 'white',
              cursor: 'pointer'
            }}>
              Previous
            </button>
            <button style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}>
              1
            </button>
            <button style={{ 
              padding: '0.5rem 1rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.375rem', 
              backgroundColor: 'white',
              cursor: 'pointer'
            }}>
              2
            </button>
            <button style={{ 
              padding: '0.5rem 1rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.375rem', 
              backgroundColor: 'white',
              cursor: 'pointer'
            }}>
              3
            </button>
            <button style={{ 
              padding: '0.5rem 1rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.375rem', 
              backgroundColor: 'white',
              cursor: 'pointer'
            }}>
              Next
            </button>
          </nav>
        </div>
      </div>
      <Footer />
      <CustomCursor />
    </div>
    
  );
}