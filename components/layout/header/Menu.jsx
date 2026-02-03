"use client";
import Link from "next/link";
import { menus } from "../../../data/menuData";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const Menu = () => {
  return (
    <ul className="navbar-nav mx-auto mb-lg-0">
      {menus.map((item, index) => (
        <li key={index} className="nav-item">
          {/* <Link className="nav-link" href={item.link}>
            {item.title}
            {(item.submenu || item.children) && <FaChevronDown className="ms-1" />}
          </Link> */}
          <Link 
            className="nav-link" 
            href={item.link}
            onClick={(e) => {
              // Only prevent default if we're clicking the dropdown arrow
              if (e.target.closest('.dropdown-arrow')) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            {item.title}
            {(item.submenu || item.children) && (
              <span 
                className="dropdown-arrow" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Toggle dropdown logic would go here if needed
                }}
              >
                <FaChevronDown className="ms-1" />
              </span>
            )}
          </Link>
          {/* Handle Industries Menu */}
          {item.children && (
            <ul className="sub-menu list-unstyled">
              {item.children.map((category, catIndex) => (
                <li key={catIndex}>
                  <Link href="#">
                    {category.heading} <FaChevronRight className="ms-1" />
                  </Link>
                  <ul className="nested-submenu list-unstyled">
                    {category.submenu.map((subItem, subIdx) => (
                      <li key={subIdx}>
                        <Link href={subItem.href}>{subItem.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}

          {/* Handle Regular Submenus */}
          {item.submenu && (
            <ul className="sub-menu list-unstyled">
              {item.submenu.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <Link href={subItem.link}>{subItem.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
