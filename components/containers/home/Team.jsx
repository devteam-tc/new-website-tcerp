"use client";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import SectionTitle from "../SectionTitle";
import { teams } from '../../../data/team';
import Link from 'next/link';
import { gsap } from 'gsap';

const Team = () => {
  const [activeTeam, setActiveTeam] = useState(
    teams.find((team) => team.isActive) ? teams.find((team) => team.isActive).name : teams[0].name
  );

  const teamItemsRef = useRef([]);
  const hoverImagesRef = useRef([]);

  useEffect(() => {
    // Function to move the service image on mouse move
    const ServiceImageMove = (event, item) => {
      const contentBox = item.getBoundingClientRect();
      const dx = (event.clientX - contentBox.x - contentBox.width / 1) / 3;
      const dy = (event.clientY - contentBox.y - contentBox.height / 1) / 10;

      hoverImagesRef.current.forEach((img) => {
        gsap.to(img, {
          x: dx,
          y: dy,
        });
      });
    };

    // Add hover effect only for screens larger than 768px
    if (window.innerWidth > 767) {
      teamItemsRef.current.forEach((item, i) => {
        item.addEventListener("mousemove", (event) => {
          ServiceImageMove(event, item);
        });

        item.addEventListener("mouseleave", () => {
          hoverImagesRef.current.forEach((img) => {
            gsap.to(img, {
              x: 0,
              y: 0
            });
          });
        });
      });

      // Add active team class on hover
      teamItemsRef.current.forEach((item) => {
        item.addEventListener('mouseenter', () => {
          teamItemsRef.current.forEach((el) => el.classList.remove('active-team'));
          item.classList.add('active-team');
        });
      });
    }
  }, []);

  const handleMouseEnter = (teamName) => {
    setActiveTeam(teamName);
  };

  return (
    <section className="ep-team-section py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 mx-auto">
            <SectionTitle subTitle="Creative Members" title="Technology that Moves You Forward" extraClass="text-center" />
          </div>
        </div>
        <div
          data-aos-duration="800"
          data-aos="fade-up"
          data-aos-delay="100"
          className="row">
          {teams.map((team) => (
            <div
              key={team.id}
              className={`team-item rounded-20 position-relative ${activeTeam === team.name ? "active-team" : ""}`}
              ref={(el) => (teamItemsRef.current[team.id] = el)}
              onMouseEnter={() => handleMouseEnter(team.name)}
            >
              <div className="row g-4">
                <div className="col-lg-6 col-md-6 align-self-center">
                  <div className="team-name-info">
                    <h4 className="name">{team.name}</h4>
                    <p style={{ textAlign: 'justify' }}>{team.description}</p>
                  </div>
                </div> 
                <div className="col-lg-6 col-md-1 align-self-center">
                  <div className="hover-image position-absolute overflow-hidden rounded-20" ref={(el) => (hoverImagesRef.current[team.id] = el)}>
                    <div className="team-image">
                      <Image
                        src={team.image}
                        alt={team.name}
                        className="img-fluid w-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
};

export default Team;
