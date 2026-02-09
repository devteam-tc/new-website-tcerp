"use client";

import { useState, useEffect, Suspense } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase12";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "../../../../components/layout/header/Header";
import PageHeader from "../../../../components/layout/PageHeader";
import Footer from "../../../../components/layout/footer/Footer";
import CustomCursor from "../../../../components/layout/CustomCursor";
import { FaHome } from 'react-icons/fa';

function EditBlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get('id');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [heading1, setHeading1] = useState("");
  const [heading2, setHeading2] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

  const breadcrumbs = [
    { label: 'Home', link: '/', icon: FaHome },
    { label: 'Blogs', link: '/blogs2' },
    { label: 'Blog List', link: '/blogs2/blogs/blog-list' },
    { label: 'Edit Blog', link: null }
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchBlog = async () => {
      if (!blogId) {
        if (isMounted) {
          setError("Blog ID not provided");
          setLoading(false);
        }
        return;
      }

      try {
        const docRef = doc(db, "blog", blogId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const blogData = docSnap.data();
          if (isMounted) {
            setTitle(blogData.title || "");
            setContent(blogData.content || "");
            setHeading1(blogData.heading1 || "");
            setHeading2(blogData.heading2 || "");
            setDescription1(blogData.description1 || "");
            setDescription2(blogData.description2 || "");
            setImage1(blogData.image1 || "");
            setImage2(blogData.image2 || "");
            setError(null);
          }
        } else {
          if (isMounted) {
            setError("Blog not found");
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching blog:", error);
          setError("Failed to load blog data");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlog();
    
    return () => {
      isMounted = false;
    };
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blogId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const blogRef = doc(db, "blog", blogId);
      await updateDoc(blogRef, {
        title,
        content,
        heading1,
        heading2,
        description1,
        description2,
        image1,
        image2,
        updatedAt: new Date(),
      });

      router.push("/blogs2/blogs/blog-list");
    } catch (error) {
      console.error("Error updating blog:", error);
      setError("Failed to update blog. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header/>
        <PageHeader title="Edit Blog" breadcrumbs={breadcrumbs}/>
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
            <p>Loading blog data...</p>
          </div>
        </div>
        <Footer/>
        <CustomCursor/>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header/>
        <PageHeader title="Edit Blog" breadcrumbs={breadcrumbs}/>
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <div style={{ 
              backgroundColor: '#fef2f2', 
              border: '1px solid #fecaca', 
              borderRadius: '0.5rem', 
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: '#dc2626', marginBottom: '1rem' }}>Error</h3>
              <p style={{ color: '#7f1d1d', marginBottom: '1.5rem' }}>{error}</p>
              <Link
                href="/blogs2/blogs/blog-list"
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.375rem',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-block'
                }}
              >
                ← Back to Blog List
              </Link>
            </div>
          </div>
        </div>
        <Footer/>
        <CustomCursor/>
      </>
    );
  }

  return (
    <>
      <Header/>
      <PageHeader title="Edit Blog" breadcrumbs={breadcrumbs}/>
      
      <div style={{ minHeight: '60vh', backgroundColor: '#f9fafb', padding: '2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link
            href="/blogs2/blogs/blog-list"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#2563eb',
              textDecoration: 'none',
              marginBottom: '2rem',
              fontWeight: '500'
            }}
          >
            ← Back to Blog List
          </Link>

          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.5rem', 
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
            padding: '2rem' 
          }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1f2937' }}>
              Edit Blog Post
            </h1>

            {error && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '0.375rem',
                padding: '1rem',
                marginBottom: '1.5rem',
                color: '#dc2626'
              }}>
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  Blog Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  Main Content *
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                  placeholder="Enter main blog content"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  Heading 1
                </label>
                <input
                  type="text"
                  value={heading1}
                  onChange={(e) => setHeading1(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                  placeholder="Enter first heading"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  Description 1
                </label>
                <textarea
                  value={description1}
                  onChange={(e) => setDescription1(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                  placeholder="Enter first description"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  Heading 2
                </label>
                <input
                  type="text"
                  value={heading2}
                  onChange={(e) => setHeading2(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                  placeholder="Enter second heading"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  Description 2
                </label>
                <textarea
                  value={description2}
                  onChange={(e) => setDescription2(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                  placeholder="Enter second description"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  Image 1 URL
                </label>
                <input
                  type="url"
                  value={image1}
                  onChange={(e) => setImage1(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                  placeholder="https://example.com/image1.jpg"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  Image 2 URL
                </label>
                <input
                  type="url"
                  value={image2}
                  onChange={(e) => setImage2(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                  placeholder="https://example.com/image2.jpg"
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    flex: 1,
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.5 : 1,
                    fontSize: '1rem'
                  }}
                >
                  {isSubmitting ? "Updating..." : "Update Blog Post"}
                </button>
                
                <Link
                  href="/blogs2/blogs/blog-list"
                  style={{
                    flex: 1,
                    backgroundColor: '#6b7280',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    textAlign: 'center',
                    display: 'inline-block',
                    fontSize: '1rem'
                  }}
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer/>
      <CustomCursor/>
    </>
  );
}

export default function EditBlog() {
  return (
    <Suspense fallback={
      <>
        <Header/>
        <PageHeader title="Edit Blog" breadcrumbs={[]}/>
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
        <Footer/>
        <CustomCursor/>
      </>
    }>
      <EditBlogContent />
    </Suspense>
  );
}