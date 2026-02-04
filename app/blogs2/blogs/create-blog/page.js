"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase12";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Headers from "../../../../components/layout/header/Header";
import PageHeader from "../../../../components/layout/PageHeader";
import Footer from "../../../../components/layout/footer/Footer";
import CustomCursor from "../../../../components/layout/CustomCursor";

export default function CreateBlog() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [heading1, setHeading1] = useState("");
  const [heading2, setHeading2] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

  const createSlug = (text) =>
    text.toLowerCase().trim().replace(/\s+/g, "-");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "blog"), {
        title,
        content,
        heading1,
        heading2,
        description1,
        description2,
        image1,
        image2,
        slug: createSlug(title),
        createdAt: serverTimestamp(),
      });

      router.push("/blogs2/");
    } catch (error) {
      console.error("Error creating blog:", error);
      setIsSubmitting(false);
    }
  };

  return (
  
    <div >
      <Headers />
      <PageHeader />
      <div style={{ maxWidth: '4xl', margin: '0 auto' }}>
        <Link
          href="/blogs2/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: '#2563eb',
            textDecoration: 'none',
            marginBottom: '2rem'
          }}
        >
          ← Back to Blogs
        </Link>

        <div style={{ maxWidth: '2xl', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1f2937' }}>
            Create New Blog Post
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />

            <textarea
              placeholder="Main Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={5}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />

            <input
              type="text"
              placeholder="Heading 1"
              value={heading1}
              onChange={(e) => setHeading1(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />

            <textarea
              placeholder="Description 1"
              value={description1}
              onChange={(e) => setDescription1(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />

            <input
              type="text"
              placeholder="Heading 2"
              value={heading2}
              onChange={(e) => setHeading2(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />

            <textarea
              placeholder="Description 2"
              value={description2}
              onChange={(e) => setDescription2(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />

            <input
              type="url"
              placeholder="Image 1 URL"
              value={image1}
              onChange={(e) => setImage1(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />

            <input
              type="url"
              placeholder="Image 2 URL"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.375rem',
                fontWeight: '600',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.5 : 1
              }}
            >
              {isSubmitting ? "Creating..." : "Create Blog Post"}
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
      <CustomCursor />
    </div>
  );
}