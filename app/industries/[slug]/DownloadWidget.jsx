import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { IoMdDownload } from "react-icons/io";
import { downloadBrochureFile } from "../../utils/brochureOperations";

// Dynamically import the popup to avoid SSR issues
const DownloadFormPopup = dynamic(() => import('./DownloadFormPopup'), {
  ssr: false
});

// Storage key for tracking first submission
const FIRST_SUBMISSION_KEY = 'tcerp_first_submission_done';

const DownloadWidget = ({ bgShape, image, title, spanTitle, buttonText }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  // Check if user has submitted before
  useEffect(() => {
    try {
      const hasSubmitted = localStorage.getItem(FIRST_SUBMISSION_KEY) === 'true';
      setHasSubmittedBefore(hasSubmitted);
    } catch (error) {
      console.error('Error checking submission status:', error);
    }
  }, []);

  const handleDownloadClick = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDownloadError('');

    // Clean up the title to match our brochure mapping
    let industryTitle = spanTitle?.replace(" Solutions Brochure", "") || title;
    
    // Special handling for Packaging
    if (industryTitle.includes('Packaging')) {
      // If the title is exactly 'Packaging Solutions Guide', keep it as is
      // Otherwise, default to 'Packaging Industry'
      industryTitle = industryTitle === 'Packaging' ? 'Packaging Industry' : industryTitle;
    }

    if (hasSubmittedBefore) {
      // If user has submitted before, download directly
      try {
        await downloadBrochure(industryTitle);
      } catch (error) {
        console.error('Download failed:', error);
        setDownloadError('Unable to download the brochure. Please try again later.');
      }
    } else {
      // Show popup only for first-time users
      setShowPopup(true);
    }
  }, [hasSubmittedBefore, spanTitle, title]);

  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
    setDownloadError('');
  }, []);

  return (
    <div className="download-widget mt-5 mb-5">
      <div
        className="shape"
        style={{
          backgroundImage: `url(${bgShape})`,
        }}
      ></div>
      <div className="inner-box">
        <figure className="image-box">
          <Image
            src={image || ""}
            alt={`${title} ${spanTitle} preview`}
            width={300}
            height={300}
          />
        </figure>
        {downloadError && (
          <div className="alert alert-danger mb-3" role="alert" style={{ fontSize: '0.9rem' }}>
            {downloadError}
          </div>
        )}
        <button 
          type="button"
          onClick={handleDownloadClick}
          style={{
            background: "linear-gradient(45deg, var(--bs-primary-500), var(--bs-primary-700))",
            color: "white",
            border: "2px solid var(--bs-primary-50)",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontWeight: "500",
            position: "relative",
            zIndex: 1,
            width: "-webkit-fill-available",
          }}
          onMouseOver={(e) => e.target.style.opacity = "0.9"}
          onMouseOut={(e) => e.target.style.opacity = "1"}
        >
          <IoMdDownload style={{ marginRight: 8, verticalAlign: 'middle' }} />
          {buttonText}
        </button>
      </div>

      {showPopup && !hasSubmittedBefore && (
        <DownloadFormPopup 
          show={showPopup}
          onHide={handleClosePopup}
          industryTitle={spanTitle?.replace(" Solutions Brochure", "") || title}
        />
      )}
    </div>
  );
};

export default DownloadWidget; 