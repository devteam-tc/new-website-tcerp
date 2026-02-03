import React from 'react';
import './NewVideoSection.scss';

const NewVideoSection = () => {
  return (
    <div className="video-section-browser-frame">
      <div className="video-section-browser-bar">
        <span className="video-section-dot red" />
        <span className="video-section-dot yellow" />
        <span className="video-section-dot green" />
      </div>
      <div className="video-section-content">
      <video
          className="banner-video"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            objectFit: 'cover',
            boxShadow: 'none',
            zIndex: 0,
          }}
        //   poster="/images/Banner_bg.webp"
        >
          <source src="/video/banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default NewVideoSection;
