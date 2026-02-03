"use client";
import Image from 'next/image';
import PropTypes from 'prop-types';

// Import static download guide data
import downloadGuideData from '../../../data/services/downloadGuide.json';

// Feature List Component
const FeatureList = ({ features }) => (
  <ul className="list-item mb_30" style={{ paddingLeft: '20px' }}>
    {features.map((feature, index) => (
      <li key={index} style={{ marginBottom: '12px' }}>
        <p className=" black" style={{ 
          fontSize: 'clamp(13px, 1.5vw, 16px)',
          lineHeight: '1.4',
          margin: 0
        }}>{feature}</p>
      </li>
    ))}
  </ul>
);

FeatureList.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Content Box Component
const ContentBox = ({ title, features, buttonText, onDownload }) => (
  <div className="content-box" style={{ maxWidth: '100%' }}>
    <h2 style={{
      fontSize: 'clamp(20px, 2.5vw, 28px)',
      lineHeight: '1.3',
      marginBottom: '12px',
    
    }}>
      {title} 
    </h2>
    <FeatureList features={features} />
    {/* <div style={{
      marginTop: '20px',
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    }}>
      <p style={{
        fontSize: 'clamp(14px, 1.2vw, 16px)',
        lineHeight: '1.5',
        color: '#495057',
        marginBottom: '12px',
        fontWeight: '500'
      }}>
        Curious about how it works?
      </p>
      <p style={{
        fontSize: 'clamp(13px, 1.1vw, 15px)',
        lineHeight: '1.5',
        color: '#6c757d',
        margin: 0
      }}>
        Download the guide and get a complete picture of how Tech Cloud ERP transforms ideas into high-performing digital solutions.
      </p>
    </div> */}
    <button 
      type="button" 
      className="theme-btn btn-one" 
      onClick={onDownload}
      disabled={!onDownload}
      style={{ 
        color: '#fff !important',
        fontSize: 'clamp(13px, 1.2vw, 15px)',
        padding: '10px 20px',
        marginTop: '10px', 
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      {buttonText}
    </button>
  </div>
);

ContentBox.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttonText: PropTypes.string.isRequired,
  onDownload: PropTypes.func,
};

// Image Box Component
const ImageBox = ({ src, alt, width, height }) => (
  <div className="image-box" style={{
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    position: 'relative',
    paddingTop: '100%', // 4:3 aspect ratio
    '@media (max-width: 768px)': {
      maxWidth: '100%'
    }
  }}>
    <figure className="image" style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      background: 'transparent',
      boxShadow: 'none'
    }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        style={{
          objectFit: 'contain',
          objectPosition: 'center',
          width: '100%',
          height: '100%',
          boxShadow: 'none'
        }}
      />
    </figure>
  </div>
);

ImageBox.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

// Main Download Section Component
const DownloadSection = ({ onDownload }) => {
  return (
    <section className="download-section alternat-2 pb_120 pt_120">
      <div className="auto-container">
        <div className="inner-container" style={{ boxShadow: 'none' }}>
          <div 
            className="pattern-layer" 
            style={{ 
              backgroundImage: `url('${downloadGuideData.backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'none'
            }} 
          />
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 content-column" 
              style={{ 
                paddingLeft: 'clamp(15px, 2vw, 25px)', 
                paddingRight: 'clamp(15px, 2vw, 25px)',
                marginBottom: '30px'
              }}
            >
              <ContentBox
                title={downloadGuideData.title}
                subtitle={downloadGuideData.subtitle}
                features={downloadGuideData.features}
                buttonText={downloadGuideData.buttonText}
                onDownload={onDownload}
              />
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 image-column" 
              style={{ 
                paddingLeft: 'clamp(15px, 2vw, 25px)', 
                paddingRight: 'clamp(15px, 2vw, 25px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 'none'
              }}
            >
              <ImageBox
                src={downloadGuideData.image.src}
                alt={downloadGuideData.image.alt}
                width={downloadGuideData.image.width}
                height={downloadGuideData.image.height}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

DownloadSection.propTypes = {
  onDownload: PropTypes.func,
};

DownloadSection.defaultProps = {
  onDownload: null,
};

export default DownloadSection;