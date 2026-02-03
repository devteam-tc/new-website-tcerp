import Image from "next/image";
import { FaReply } from "react-icons/fa";

const BlogComments = () => (
  <div className="comment-boxs">
    <div className="heading1">
      <h3>Blog Comments (2)</h3>
    </div>
    <div className="comment-box">
      <div className="outhor-area-all">
        <div className="author-area">
          <div className="image">
            <Image src="/assets/img/blog/comment-img1.png" alt="img" width={80} height={80} />
          </div>   
          <div className="heading">
            <a href="#" className="date"><Image src="/assets/img/icons/date.svg" alt="img" width={20} height={20} />8 December 2024</a>
            <h4><a href="#">Alex Robertson</a></h4>
          </div>
        </div>
        <div className="reply-btn">
          <a href="#"><FaReply /> Reply</a>
        </div>
      </div>
      <p>SEO and digital marketing are crucial components of a successful online strategy. SEO, or Search Engine Optimization, involves optimizing your website to improve its visibility on search engines like Google. </p>
    </div>
    <div className="comment-box">
      <div className="outhor-area-all">
        <div className="author-area">
          <div className="image">
            <Image src="/assets/img/blog/comment-img1.png" alt="img" width={80} height={80} />
          </div>
          <div className="heading">
            <a href="#" className="date"><Image src="/assets/img/icons/date.svg" alt="img" width={20} height={20} /> 8 December 2024</a>
            <h4><a href="#">Alex Robertson</a></h4>
          </div>
        </div>
        <div className="reply-btn">
          <a href="#"><FaReply /> Reply</a>
        </div>
      </div>
      <p>SEO and digital marketing are crucial components of a successful online strategy. SEO, or Search Engine Optimization, involves optimizing your website to improve its visibility on search engines like Google. </p>
    </div>
  </div>
);

export default BlogComments; 