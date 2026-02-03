'use client'; // only needed if using inside a Next.js App Router (app directory)
import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '../SectionTitle';

const WorkingSteps = () => {
  return (
    <section>
      <div className="working-proces-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="feature-text section-title text-center">
                <SectionTitle subTitle="OUR APPROACH TO BUILDING SUCCESS" title="From Idea to Execution" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="working-process-box card-1 after-transprent">
                <div className="process-thumb">
                  <Image
                    src="/images/services/process-1.png"
                    alt="Process 1"
                    width={200}
                    height={200}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    layout="responsive"
                  />
                  <div className="process-number">
                    <span>01</span>
                  </div>
                </div>
                <div className="process-content">
                  <h4 className='mt-2'>Discussion & Planning</h4>
                  <p>We start with in-depth discussions to understand your goals, target audience and market needs, then develop a plan that is unique to your business vision.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="working-process-box card-2 after-transprent">
                <div className="process-thumb">
                  <Image
                    src="/images/services/process-2.png"
                    alt="Process 2"
                    width={200}
                    height={200}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    layout="responsive"
                  />
                  <div className="process-number">
                    <span>02</span>
                  </div>
                </div>
                <div className="process-content">
                  <h4 className='mt-2'>Strategy & Design</h4>
                  <p>Based on research, we create a strategy and create intuitive designs that match your brand while providing a smooth user experience.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="working-process-box card-3 after-transprent">
                <div className="process-thumb">
                  <Image
                    src="/images/services/process-3.png"
                    alt="Process 3"
                    width={200}
                    height={200}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    layout="responsive"
                  />
                  <div className="process-number">
                    <span>03</span>
                  </div>
                </div>
                <div className="process-content">
                  <h4 className='mt-2'>Build & Optimize</h4>
                  <p>Our team of experts use the latest technologies to create your solution, which is constantly optimised for speed, SEO and performance.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="working-process-box card-4 after-transprent">
                <div className="process-thumb">
                  <Image
                    src="/images/services/process-4.jpg"
                    alt="Process 4"
                    width={200}
                    height={200}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    layout="responsive"
                  />
                  <div className="process-number">
                    <span>04</span>
                  </div>
                </div>
                <div className="process-content">
                  <h4 className='mt-2'>Launch & Support</h4>
                  <p>We implement the final solution, monitor performance and offer post-launch support to ensure that your platform runs properly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingSteps;
