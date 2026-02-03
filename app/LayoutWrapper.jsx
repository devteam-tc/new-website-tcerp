"use client";
import { usePathname } from "next/navigation";

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname();
  
  // Add "section-bg" only for /home and /home-two
  const bodyClass = pathname === "/" || pathname === "/home-two" ? "section-bg" : "";

  return <div className={bodyClass}>{children}</div>;
};

export default LayoutWrapper;
