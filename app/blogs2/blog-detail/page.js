"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase12';
import Headers from "../../../components/layout/header/Header";
import PageHeader from "../../../components/layout/PageHeader";
import Footer from "../../../components/layout/footer/Footer";
import CustomCursor from "../../../components/layout/CustomCursor";
function BlogDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const slug = searchParams.get('slug');
      console.log("Searching for slug:", slug);
      
      if (!slug) {
        setLoading(false);
        return;
      }
      
      try {
        // Try by slug first
        const blogQuery = query(
          collection(db, "blog"),
          where("slug", "==", slug)
        );
        const querySnapshot = await getDocs(blogQuery);
        
        if (!querySnapshot.empty) {
          const blogData = {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data()
          };
          console.log("Found blog by slug:", blogData);
          setBlog(blogData);
        } else {
          // Try by document ID
          const docRef = doc(db, "blog", slug);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const blogData = {
              id: docSnap.id,
              ...docSnap.data()
            };
            console.log("Found blog by ID:", blogData);
            setBlog(blogData);
          } else {
            console.log("No blog found");
          }
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [searchParams]);

  if (loading) {
    return (
      
      <div  >
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2rem' }}>
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
    );
  }

  return (
    <div >
        <Headers />
      <PageHeader />
      <CustomCursor />
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1f2937' }}>
          {blog.title}
        </h1>
        
        {blog.image1 && (
          <img 
            src={blog.image1} 
            alt={blog.title}
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '2rem' }}
          />
        )}
        
        <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '2rem' }}>
          <p>{blog.content}</p>
        </div>
        
        {blog.heading1 && (
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
            {blog.heading1}
          </h2>
        )}
        
        {blog.description1 && (
          <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#4b5563', marginBottom: '2rem' }}>
            {blog.description1}
          </p>
        )}
        
        {blog.heading2 && (
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
            {blog.heading2}
          </h2>
        )}
        
        {blog.description2 && (
          <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#4b5563', marginBottom: '2rem' }}>
            {blog.description2}
          </p>
        )}
        
        {blog.image2 && (
          <img 
            src={blog.image2} 
            alt={blog.title}
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '2rem' }}
          />
        )}
        
        <div style={{ marginTop: '3rem' }}>
          <button 
            onClick={() => router.push('/blogs2')}
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