import React from 'react';
import { FaInstagramSquare , FaFacebookF, FaLinkedinIn, FaPinterest, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './SocialMediaIcons.scss';

const SocialMediaIcons = () => {
  return (
    <div className="social-icons-container">
      <a
        href="https://www.instagram.com/techclouderp/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <FaInstagramSquare  />
      </a>
      <a
        href="https://www.facebook.com/TechCloudERPSoftwareSolutions"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <FaFacebookF />
      </a>
      <a
        href="https://www.linkedin.com/company/13619340/admin/dashboard/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <FaLinkedinIn />
      </a>
      <a
        href="https://in.pinterest.com/techclouderp/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <FaPinterest />
      </a>
      <a
        href="https://www.youtube.com/channel/UChUCWRHTzZkYEPRR-AauNkA"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <FaYoutube />
      </a>
      <a
        href="https://twitter.com/TechCloudERP"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <FaXTwitter />
      </a>
    </div>
  );
};

export default SocialMediaIcons;