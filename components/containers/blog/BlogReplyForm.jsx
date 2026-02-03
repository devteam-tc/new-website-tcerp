import { BsArrowRight } from "react-icons/bs";

const BlogReplyForm = () => (
  <div className="details-contact-area">
    <div className="heading1">
      <h3>Leave A Reply Now</h3>
    </div>
    <div className="space30"></div>
    <div className="faq-contact-form">
      <h4>Send Us A Message</h4>
      <form action="#">
        <div className="row">
          <div className="col-md-6">
            <div className="single-input">
              <input type="text" placeholder="First Name" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="single-input">
              <input type="text" placeholder="Last Name" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="single-input">
              <input type="number" placeholder="Phone Number" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="single-input">
              <input type="email" placeholder="Email Address" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <input type="url" placeholder="Website URL" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <textarea rows="5" placeholder="Your Message"></textarea>
            </div>
            <div className="space30"></div>
            <div className="button">
              <button className="theme-btn1">Start Your Free Audit <span><BsArrowRight /></span></button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default BlogReplyForm; 