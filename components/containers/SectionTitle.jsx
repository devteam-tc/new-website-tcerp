import React from 'react'

const SectionTitle = ({ subTitle, title, extraClass, titleClass }) => {
  return (
    <div className={`section-title-block ${extraClass}`}>
      {subTitle && (
        <h6
          className="section-sub-title position-relative d-inline-block text-uppercase">
          {subTitle}
        </h6>
      )}
      <h2
        className={`section-title title-anim ${titleClass}`}>
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle
