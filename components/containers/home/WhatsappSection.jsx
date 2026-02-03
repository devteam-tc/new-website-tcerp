import React from "react";
import Image from "next/image";
import "./WhatsappSection.scss";

const WhatsappSection = () => {
  return (
    <a
      className="whatsappButton"
      href="https://api.whatsapp.com/send?phone=+918886606458&text=Hi"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <Image
        className="whatsappIcon"
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        width={55}
        height={55}
        priority
      />
    </a>
  );
};

export default WhatsappSection;