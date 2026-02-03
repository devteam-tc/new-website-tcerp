"use client";
import Link from "next/link";
import { FaChevronDown, FaChevronUp, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const MenuItem = ({ 
  menu, 
  openSubmenuId, 
  openIndustrySection, 
  toggleSubmenu, 
  toggleIndustrySection, 
  closeMenu 
}) => {
  const router = useRouter();

  // For items with submenus (not industries)
  if (menu.submenu) {
    return (
      <li className="sub-mobile-menu">
        <div className="d-flex align-items-center">
          <Link 
            href={menu.link || '#'}
            className="flex-grow-1"
            onClick={(e) => {
              if (!menu.link || menu.link === '#') {
                e.preventDefault();
              } else {
                closeMenu();
              }
            }}
          >
            {menu.title}
          </Link>
          <button 
            className="border-0 bg-transparent btn-icon-one"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSubmenu(menu.id);
            }}
            aria-expanded={openSubmenuId === menu.id}
          >
            {openSubmenuId === menu.id ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        <ul className={`submenu ${openSubmenuId === menu.id ? "open" : ""}`}>
          {menu.submenu.map((submenu) => (
            <li key={submenu.id} className="sub-mobile-menu" >
              <Link 
                href={submenu.link} 
                onClick={(e) => {
                  e.stopPropagation();
                  closeMenu();
                }}
              >
                {submenu.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  // For Industries menu (has children)
  if (menu.children) {
    return (
      <li className="sub-mobile-menu">
        <div className="d-flex align-items-center">
          <Link 
            href={menu.link || '#'}
            className="flex-grow-1"
            onClick={(e) => {
              if (menu.id === 3) { // Industries menu
                e.preventDefault();
                router.push(menu.link);
                closeMenu();
              } else if (!menu.link || menu.link === '#') {
                e.preventDefault();
              } else {
                closeMenu();
              }
            }}
          >
            {menu.title}
          </Link>
          <button 
            className="border-0 bg-transparent btn-icon-one"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSubmenu(menu.id);
            }}
            aria-expanded={openSubmenuId === menu.id}
          >
            {openSubmenuId === menu.id ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        
        <ul className={`submenu ${openSubmenuId === menu.id ? "open" : ""}`}>
          {menu.children.map((category, catIndex) => (
            <li key={catIndex} className="sub-mobile-menu">
              <div 
                className="d-flex align-items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleIndustrySection(e, category.heading);
                }}
              >
                <a className="flex-grow-1">{category.heading}</a>
                <button 
                  className="border-0 bg-transparent btn-icon-one"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleIndustrySection(e, category.heading);
                  }}
                  aria-expanded={openIndustrySection === category.heading}
                >
                  {openIndustrySection === category.heading ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronRight />
                  )}
                </button>
              </div>
              <ul
                className={`nested-submenu ${
                  openIndustrySection === category.heading ? "open" : ""
                }`}
              >
                {category.submenu.map((item, idx) => (
                  <li key={idx} className="sub-mobile-menu">
                    <Link 
                      href={item.href} 
                      onClick={(e) => {
                        e.stopPropagation();
                        closeMenu();
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  // For regular menu items without submenus
  return (
    <li className="sub-mobile-menu">
      <Link 
        href={menu.link} 
        onClick={(e) => {
          e.stopPropagation();
          closeMenu();
        }}
      >
        {menu.title}
      </Link>
    </li>
  );
};

export default MenuItem;