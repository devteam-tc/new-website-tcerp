"use client";
import Image from 'next/image';
import PropTypes from 'prop-types';
import downloadwidget from '../../../data/modules/downloadwidget.json';

// Feature List Component
const FeatureList = ({ features }) => (
  <ul className="list-item mb_30">
    {features.map((feature, index) => (
      <li key={index}>{feature}</li>
    ))}
  </ul>
);

FeatureList.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const ContentBox = ({ title, subtitle, features, buttonText, onDownload }) => (
  <div className="content-box">
    <h2>
      {title} <span>{subtitle}</span>
    </h2>
    <FeatureList features={features} />
    <button 
      type="button" 
      className="theme-btn btn-one" 
      onClick={onDownload}
      disabled={!onDownload}
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

const ImageBox = ({ src, alt, width, height }) => (
  <div className="image-box">
    <figure className="image">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
      />
    </figure>
  </div>
);

ImageBox.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const DownloadWidget = ({ 
  customData,
  onDownload
}) => {
  const data = customData || downloadwidget;

  return (
    <section className="download-section alternat-2 pb-120 pt-120">
      <div className="auto-container">
        <div className="inner-container">
          <div 
            className="pattern-layer" 
            style={{ backgroundImage: `url('${data.backgroundImage}')` }} 
          />
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-12 col-sm-12 content-column">
              <ContentBox
                title={data.title}
                subtitle={data.subtitle}
                features={data.features}
                buttonText={data.buttonText}
                onDownload={onDownload}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 image-column">
              <ImageBox
                src={data.image.src}
                alt={data.image.alt}
                width={data.image.width}
                height={data.image.height}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

DownloadWidget.propTypes = {
  customData: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    buttonText: PropTypes.string,
    image: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    backgroundImage: PropTypes.string,
  }),
  onDownload: PropTypes.func,
};

DownloadWidget.defaultProps = {
  customData: null,
  onDownload: null,
};

export default DownloadWidget;
