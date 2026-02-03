import Image from "next/image";
import Link from "next/link";
import introSection from "../../data/bi/intro-section.json"; 

const BusinessSection = () => {
  return (
    <section className="businessSection fix pt-60 pb-60">
      <div className="container">
        <div className="section-title-block undefined mb-lg-4 mb-0 pb-lg-2 text-center mb-3">
          <h1 className="section-title title-anim undefined" data-wow-delay=".3s">
            {introSection.heading}
          </h1>
        </div>
        <div className="row g-4 justify-content-between">
          <div className="col-lg-5 order-lg-0 order-1">
            <div className="businessThumbnail">
            <Image src="/bi/business-thumb.webp" alt="Business intelligence concepts and tools" width={500} height={500} className="mimg" style={{borderRadius: '5px'}} />
            {/* <Image src="/bi/line-card.png" alt="line" className="lineCard" width={300} height={200} /> */}
              {/* <Image src="/bi/box-card.png" alt="box" className="boxCard" width={300} height={200} /> */}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="businessContent">
              <p className="pra">{introSection.description}</p>
              <div className="row g-4">
                {introSection.features.map((item, index) => (
                  <div key={index} className="col-sm-6">
                    <div className="businessItems">
                      <Image 
                        src={item.img} 
                        alt="image"
                        width={40} 
                        height={40} 
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'contain'
                        }}
                      />
                      <h5>
                        <Link href="/" className="black">
                          {item.title}
                        </Link>
                      </h5>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
