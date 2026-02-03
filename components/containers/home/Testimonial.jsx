"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import SectionTitle from "../SectionTitle";
import { testimonials } from "../../../data/testmonial";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";

const Testimonial = () => {
  return (
    <section className="ep-testimonial-section pt-60 pb-60">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="testimonial-info">
              <SectionTitle subTitle="Clients Testimonials" title="Success Stories from Our Valued Clients
            " extraClass="mb-20" />
              <div className="short-info">
                <p>
                Our clients have transformed their operations with our ERP solutions. Don't just take our word for 
                it, read their stories and discover how our system has made a significant impact on their businesses.
                </p>
              </div>
              <div className="call-us">
                <a
                  href="tel:+918919439603"
                  className="call-us-btn style2 d-flex align-items-center gap-3"
                >
                  <span className="icon d-flex justify-content-center align-items-center">
                    <FaPhoneAlt size={20} color="white" />
                  </span>
                  <div className="info">
                    <span className="title">Call Us Anytime</span>
                    <div className="numbers d-flex flex-column flex-sm-row">
                      <h4 className="number mb-1 mb-sm-0 me-sm-2">+91 8919439603</h4>
                      <h4 className="number">+91 7032803200</h4>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="testimonial-area testimonial-slider rounded-30">
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                speed={1000}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                navigation={false}
                modules={[Autoplay, Navigation]}
                className="swiper-container"
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <div className="testimonial-item d-flex flex-column">
                      <div className="rating">
                        {[...Array(5)].map((_, index) => (
                          <i
                            key={index}
                            className={`fas fa-star ${index >= testimonial.rating ? "no-rate" : ""
                              }`}
                          ></i>
                        ))}
                      </div>
                      <div className="details">
                        <p>{testimonial.text}</p>
                      </div>
                      <div className="user-info d-flex align-items-center justify-content-between gap-4">
                        <div className="user d-flex align-items-center">
                          
                          <div className="text">
                            <h4 className="name">{testimonial.name}</h4>
                            <p className="designation">{testimonial.designation}</p>
                          </div>
                        </div>
                        <div className="quote">
                          <Image
                            src={testimonial.quoteIcon}
                            alt="quote-icon"
                          />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
