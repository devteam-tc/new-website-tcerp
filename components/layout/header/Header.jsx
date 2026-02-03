"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Menu from "./Menu";
import logo from "../../../public/images/logo/logo.svg";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { FaPhoneAlt } from 'react-icons/fa';

const Header = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("sticky-header");
      if (window.scrollY > 120) {
        header.classList.add("sticky-menu");
      } else {
        header.classList.remove("sticky-menu");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="ep-header-section w-100" id="sticky-header">
      <nav className="navbar p-0 navbar-expand-xl d-none d-xl-flex">
        <div className="container header-one-container">
          <Link className="navbar-brand" href="/">
          <Image src={logo} alt="logo" priority width={200} height={80} style={{ maxWidth: '90%'}} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Menu />
            <div className="call-us">
              <a href="tel:+91 8919439603" className="call-us-btn d-flex align-items-center gap-1">
                <span className="icon d-flex justify-content-center align-items-center">
                  <FaPhoneAlt size={28} />
                </span>
                <div className="info">
                  <h5 className="number mb-3">+91 89194 39603</h5>
                  <h5 className="number">+91 70328 03200</h5>
                </div>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* mobile navbar part start */}
      <MobileMenu/>
      {/* mobile navbar part end */}
    </header>
  )
}

export default Header
