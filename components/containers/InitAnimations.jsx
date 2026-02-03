"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation"; // Import usePathname for route changes
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";

const InitAnimations = () => {
  const pathname = usePathname(); // Get current route

  // aos animation
  useEffect(() => {
    AOS.init({ once: true });
  }, [pathname]); // Reinitialize on route change

  // parallax animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const imageParallax = document.querySelectorAll(".parallax-image");
    if (imageParallax.length > 0) {
      imageParallax.forEach((element) => {
        const aipWrap = element.closest(".parallax-image-wrap");
        const aipInner = aipWrap?.querySelector(".parallax-image-inner");

        if (aipWrap && aipInner) {
          const tl_ImageParallax = gsap.timeline({
            scrollTrigger: {
              trigger: aipWrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

          tl_ImageParallax.to(element, {
            yPercent: 30,
            ease: "none",
          });
          gsap.fromTo(
            aipInner,
            { scale: 1.2, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.5,
              scrollTrigger: {
                trigger: aipWrap,
                start: "top 99%",
                markers: false,
              },
            }
          );
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Clean up GSAP triggers
    };
  }, [pathname]); // Reinitialize animations on route change

  // split text animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    new SplitType(".title-anim", { types: ["chars", "words"] });

    const titleAnims = document.querySelectorAll(".title-anim");
    titleAnims.forEach((titleAnim) => {
      const charElements = titleAnim.querySelectorAll(".char");
      charElements.forEach((char, index) => {
        gsap.from(char, {
          duration: 0.6,
          x: 70,
          delay: index * 0.03,
          autoAlpha: 0,
          scrollTrigger: {
            trigger: char,
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]); // Reinitialize on route change

  // reveal image animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let revealContainers = document.querySelectorAll(".reveal");
    revealContainers.forEach((container) => {
      let image = container.querySelector("img");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          toggleActions: "play none none none",
        },
      });

      tl.set(container, { autoAlpha: 1 });

      if (container.classList.contains("zoom-out")) {
        tl.from(image, {
          duration: 1.5,
          // scale: 1.4,
          ease: "power2.out",
        });
      } else if (container.classList.contains("left") || container.classList.contains("right")) {
        let xPercent = container.classList.contains("left") ? -100 : 100;
        tl.from(container, {
          duration: 1.5,
          xPercent,
          ease: "power2.out",
        });
        tl.from(image, {
          duration: 1.5,
          xPercent: -xPercent,
          scale: 1,
          delay: -1.5,
          ease: "power2.out",
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]); // Reinitialize on route change

  return null;
};

export default InitAnimations;
