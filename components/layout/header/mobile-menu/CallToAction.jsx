import {  FaPhoneAlt } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <div className="call-us p-4">
      <a
        href="tel:+91 8919439603"
        className="call-us-btn d-flex align-items-center gap-1"
      >
        <span className="icon d-flex justify-content-center align-items-center">
          <FaPhoneAlt size={20} />
        </span>
        <div className="info">
          <span className="title">Need ERP?</span>
          <h5 className="number">+91 8919439603</h5>
          <h5 className="number">+91 7032803200</h5>
        </div>
      </a>
    </div>
  );
};

export default CallToAction; 