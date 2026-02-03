// import { textSlider } from '@/data/textSlider'
// import Image from 'next/image'

// const TextSlider = () => {
//   return (
//     <section className="ep-text-slider-section overflow-hidden pt-120">
//       <div className="slider-main d-flex align-items-center">
//         <div className="slider-item d-flex align-items-center">
//           {textSlider.map((item) => (
//             <h2 key={item.id} className="title">
//               <Image src={item.image} alt="globe-icon" />
//               {item.title}
//             </h2>
//           ))}
//         </div>
//         <div className="slider-item d-flex align-items-center">
//           {textSlider.map((item) => (
//             <h2 key={item.id} className="title">
//               <Image src={item.image} alt="globe-icon" />
//               {item.title}
//             </h2>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default TextSlider
import React from 'react';
import { partnerData } from '../../../data/textSlider'
import { Col } from 'react-bootstrap';
import Link from 'next/link'; // Use Next.js Link
import styles from './TextSlider.module.css'; // Import CSS module

const TextSlider = () => {
  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.slideTrack}>
        {partnerData.map((partner, index) => (
          <div key={index} className={styles.slide}>
            <Col xs={6} sm={4} md={3} lg={6} className={styles.partnerItem}>
              <Link href={partner.link}>
                <img src={partner.imgSrc} alt={partner.alt} />
              </Link>
            </Col>
          </div>
        ))}
        {/* Duplicate for infinite scrolling effect */}
        {partnerData.map((partner, index) => (
          <div key={index + partnerData.length} className={styles.slide}>
            <Col xs={6} sm={4} md={3} lg={6} className={styles.partnerItem}>
              <Link href={partner.link}>
                <img src={partner.imgSrc} alt={partner.alt} />
              </Link>
            </Col>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextSlider;
