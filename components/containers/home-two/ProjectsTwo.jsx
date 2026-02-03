"use client"
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import SectionTitle from "../SectionTitle";
import { projectsTwo } from "../../../data/projects";
import Image from "next/image";
import Link from "next/link";

const ProjectsTwo = () => {
  return (
    <section className="ep-project-section-two pt-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <SectionTitle
              subTitle="latest projects"
              title="Simplifying IT Complexity Amplifying Business Success"
              extraClass="text-center"
            />
          </div>
        </div>
      </div>
      <div className="projects-main overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          loop={true}
          speed={1200}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true, el: ".project-custom-pagination" }}
          breakpoints={{

            1400: { slidesPerView: 4 },
            1200: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {projectsTwo.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="project-item-two" key={project.id}>
                <div className="img overflow-hidden rounded-20 position-relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="img-fluid w-100"
                  />
                  <div className="overlay position-absolute top-0 start-0 w-100 h-100">
                    <div className="text text-center rounded-20 w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                      <h4 className="title">
                        <Link href="/project-details">{project.title}</Link>
                      </h4>
                      <p>{project.description}</p>
                      <Link
                        href="/project-details"
                        className="read-more icon-box rounded-pill icon-box-tertiary d-flex justify-content-center align-items-center"
                      >
                        <i className="fa-solid fa-arrow-up-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Pagination */}
        <div className="project-custom-pagination text-center mt-5"></div>
      </div>
    </section>
  );
};

export default ProjectsTwo;