import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/images/logo/logo.svg";
import { FaBars } from "react-icons/fa";

const MobileMenuHeader = ({ toggleMenu }) => {
  return (
    <div className="mobile-topbar">
      <div className="d-flex justify-content-between align-items-center">
        <div className="logo">
          <Link href="/">
            <Image src={logo} alt="logo" priority width={200} height={100} />
          </Link>
        </div>
        <div className="bars" onClick={toggleMenu}>
          <FaBars size={24} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenuHeader; 