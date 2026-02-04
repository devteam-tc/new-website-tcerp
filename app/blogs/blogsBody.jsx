"use client";
import { useState } from 'react';

const BlogsBody = () => {
  const [showIframe, setShowIframe] = useState(true); // Show iframe by default

  return (
    <section className="blog-section py-5">
      <div className="">
        <div className="ro">
          <div className="">
            <div className="blog-content"> 
              
              {/* Iframe displayed by default */}
              <div className="blog-iframe-container">
                <iframe 
                  src="https://blogtcerp.web.app/"
                  title="Tech Cloud ERP Blog"
                  width="100%"
                  height="800px"
                   style={{ 
                    border: 'none',
                    background: 'transparent',
                    overflow: 'hidden'
                  }}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  scrolling="no"
                />
              </div>
              
              {/* Alternative: Link to blog */}
              <div className="text-center mt-4">
                <p className="text-muted">
                  Can't see the content? Visit our blog directly: 
                  <a 
                    href="https://blogtcerp.web.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary ms-2"
                  >
                    Visit Blog
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsBody;