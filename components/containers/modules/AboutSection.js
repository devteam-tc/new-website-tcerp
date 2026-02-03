// components/AboutSection/AboutSection.js
// import './AboutSection.scss';
import Image from 'next/image';
import Link from 'next/link';
import productAboutData from '../../../data/modules/productAboutData.json'; // ✅ Corrected path to JSON

const AboutSection = ({ slug }) => {
  const data = productAboutData[slug];

  if (!data) return null;

  return (
    <div className="aboutSection">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="aboutThumb">
              <Image
                src={data.image}
                alt="thumb"
                width={500}
                height={400}
                className="img-fluid"
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="aboutContact">
              <div className="sectionTitle text-left">
                <h6 className="sectionSubTitle">{data.subTitle}</h6>
                <h1 className="sectionMainTitle">{data.titleLine1}</h1>
                <h1 className="sectionMainTitle">
                  {data.titleLine2} <span>{data.highlight}</span>
                </h1>
                <p className="sectionDescr">{data.description}</p>
              </div>

              <div className="aboutBoxItem">
                {data.features.map((feature, idx) => (
                  <div className="aboutBox d-flex align-items-center" key={idx}>
                    <div className="aboutIcon">
                      <Image src={feature.icon} alt="icon" width={50} height={50} />
                    </div>
                    <div className="aboutTitle">
                      <h3>{feature.title}</h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="aboutItemList">
                <ul>
                  {data.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
