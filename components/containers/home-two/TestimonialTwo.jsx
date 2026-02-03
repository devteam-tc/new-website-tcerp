// "use client"
// import "swiper/swiper-bundle.css";
// import { testimonialsTwo } from "../../../data/testmonial";
// import testimonialImg from "../../../public/images/testimonial/testimonial-img-2.png";
// import Image from "next/image";
// import { Autoplay, Navigation } from "swiper/modules";
// import { Swiper, SwiperSlide } from 'swiper/react';

// const TestimonialTwo = () => {
//   return (
//     <section className="ep-testimonial-section ep-testimonial-section-two position-relative z-1">
//       <div className="container">
//         <div className="testimonial-main rounded-30">
//           <div className="row">
//             <div className="col-lg-4 col-md-5">
//               <div className="image flex-shrink-0 rounded-30 overflow-hidden">
//                 <Image
//                   src={testimonialImg}
//                   alt="testimonial-img"
//                   className="img-fluid w-100"
//                 />
//               </div>
//             </div>
//             <div className="col-lg-8 col-md-7 ms-auto">
//               <div className="testimonial-two-slider">
//                 <Swiper
//                   spaceBetween={30}
//                   slidesPerView={1}
//                   loop={true}
//                   speed={1000}
//                   autoplay={{ delay: 2500, disableOnInteraction: false }}
//                   navigation={false}
//                   modules={[Autoplay, Navigation]}
//                   className="swiper-container"
//                 >
//                   {testimonialsTwo.map((testimonial) => (
//                     <SwiperSlide key={testimonial.id}>
//                       <div className="slider-item">
//                         <div className="user-info">
//                           <div className="user d-flex align-items-center">
//                             <div className="img overflow-hidden rounded-pill flex-shrink-0">
//                               <Image
//                                 src={testimonial.img}
//                                 alt="testimonial-img"
//                                 className="w-100 h-100 object-fit-cover"
//                               />
//                             </div>
//                             <div className="text">
//                               <h4 className="name">{testimonial.name}</h4>
//                               <span className="designation">{testimonial.designation}</span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="info mt-40">
//                           <p>{testimonial.testimonial}</p>
//                         </div>
//                         <div className="rating">
//                           {[...Array(5)].map((_, index) => (
//                             <i
//                               key={index}
//                               className={`fa-solid fa-star ${index < testimonial.rating ? '' : 'no-rate'}`}
//                             ></i>
//                           ))}
//                         </div>
//                       </div>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // export default TestimonialTwo;
