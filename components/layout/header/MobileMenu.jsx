import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logo/logo.svg";
import { menus } from "../../../data/menuData";
import MobileMenuHeader from "./mobile-menu/MobileMenuHeader";
import MenuItem from "./mobile-menu/MenuItem";
import CallToAction from "./mobile-menu/CallToAction";
import { FaXmark } from "react-icons/fa6";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenuId, setOpenSubmenuId] = useState(null);
  const [openIndustrySection, setOpenIndustrySection] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenSubmenuId(null);
    setOpenIndustrySection(null);
  };

  const toggleSubmenu = (id) => {
    if (openSubmenuId === id) {
      setOpenSubmenuId(null);
      setOpenIndustrySection(null);
    } else {
      setOpenSubmenuId(id);
      setOpenIndustrySection(null);
    }
  };

  const toggleIndustrySection = (e, heading) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenIndustrySection(openIndustrySection === heading ? null : heading);
  };

  return (
    <div className="mobile-menu-area d-block d-xl-none">
      <div className="container">
        <MobileMenuHeader toggleMenu={toggleMenu} />
      </div>

      <div
        className={`mobile-menu-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>

      <div className={`mobile-menu-main ${isMenuOpen ? "active" : ""}`}>
        <div>
          <div className="logo">
            <Link href="/">
              <Image src={logo} alt="logo" width={200} height={100}  />
            </Link>
          </div>
          <div className="close-mobile-menu" onClick={closeMenu}>
            <FaXmark size={24} />
          </div>
          <style jsx>{`
            .close-mobile-menu {
              position: absolute;
              top: 20px;
              right: 20px;
              cursor: pointer;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              background: rgba(0, 0, 0, 0.05);
              transition: all 0.3s ease;
            }
            .close-mobile-menu:hover {
              background: rgba(0, 0, 0, 0.1);
              transform: rotate(90deg);
            }
            .close-mobile-menu svg {
              color: #333;
            }
          `}</style>
        </div>
        <div className="menu-body">
          <div className="menu-list">
            <ul className="list-unstyled">
              {menus.map((menu) => (
                <MenuItem
                  key={menu.id}
                  menu={menu}
                  openSubmenuId={openSubmenuId}
                  openIndustrySection={openIndustrySection}
                  toggleSubmenu={toggleSubmenu}
                  toggleIndustrySection={toggleIndustrySection}
                  closeMenu={closeMenu}
                />
              ))}
            </ul>
          </div>
        </div>
        <CallToAction />
      </div>
    </div>
  );
};

export default MobileMenu;
