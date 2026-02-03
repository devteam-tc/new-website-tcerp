"use client";

import React from 'react';
import WhoImg from '../../../public/images/img/who-we-are.webp';
import Image from 'next/image';

const WhoWeAre = () => {
  return (
    <section className="who-we-are-section pt-60 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="who-we-are-title text-center">Who We Are</div>
            <div className="who-we-are-subtitle text-center">What Sets Us Apart
            </div>
            <div className="image-container mt-5">
              <Image
                src={WhoImg}
                alt="Tech Cloud ERP"
                className="main-image"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="who-we-are-description">
              <p>
               With over <b>25+ years of experience,</b> we create ERP systems tailored to your industry and workflow. Our
solutions are easy to adopt, quick to implement, and more cost-effective than generic platforms.
                </p>
            <p>
We support manufacturers and growing businesses by improving task clarity, team coordination, and
control over inventory, production, and costs. With flexible pricing and personalized features, Tech Cloud
ERP grows with your business and adapts as your needs change.            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
