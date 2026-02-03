// components/CanalDesign.js
import React from 'react';
import './certi.module.scss';
import Image from 'next/image';

const Certifications = () => {
  return (
    <div className="contents mt-3">
      {/* <Image 
        src="/images/certifications/iso.png" 
        alt="ISO Certification" 
        width={50}  
        height={50} 
      /> */}
      <Image 
        src="/images/certifications/msme.png" 
        alt="MSME Certification" 
        width={50}  
        height={50} 
      />
    </div>
  );
};

export default Certifications;