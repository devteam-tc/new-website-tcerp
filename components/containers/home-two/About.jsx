import aboutImg from "../../../public/images/about-us/about-img.webp";
import aboutShape from "../../../public/images/about-us/about-shape.svg";
import userIcon from "../../../public/images/icons/group-user.svg";
import Image from "next/image";
import OdometerCounter from "../Odometer";
import Link from "next/link";
import SectionTitle from "../SectionTitle";
import aboutContent from "../../../data/about/aboutContent.json";

const About = ({extraClassName = ''}) => {
  return (
    <section className={`ep-about-section pt-30 pb-60 ${extraClassName}`}>
      <div className="container">
        <div className="row">
          <div
            data-aos-duration="600"
            data-aos="fade-left"
            className="col-xl-6 col-lg-7 col-md-10 mx-auto">
            <div className="about-image position-relative">
              <Image src={aboutImg} alt="Business handshake showing trust & partnership in skyline view" className="img-fluid w-100" />
            
            </div>
          </div>
          <div
            data-aos-duration="600"
            data-aos="fade-left"
            data-aos-delay="300"
            className="col-xl-6 col-lg-9 m-auto">
            <div className="about-text">
              <SectionTitle subTitle="about us" className="section-title-custom" />
              <h3>{aboutContent.vision.title}</h3>
              <p>{aboutContent.vision.description}</p>
              <h3 className="mt-20">{aboutContent.mission.title}</h3>
              <p>{aboutContent.mission.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
