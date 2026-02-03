import React from 'react';
import './Howitworks.scss';
import SectionTitle from '../SectionTitle';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Discussion & Planning',
      description:
        'We start with in-depth discussions to understand your goals, target audience and market needs, then develop a plan that is unique to your business vision.',
    },
    {
      number: '02',
      title: 'Strategy & Design',
      description:
        'Based on research, we create a strategy and create intuitive designs that match your brand while providing a smooth user experience.',
    },
    {
      number: '03',
      title: 'Build & Optimize',
      description:
        'Our team of experts use the latest technologies to create your solution, which is constantly optimised for speed, SEO and performance.',
    },
    {
      number: '04',
      title: 'Launch & Support',
      description:
        'We implement the final solution, monitor performance and offer post-launch support to ensure that your platform runs properly.',
    },
  ];

  return (
    <section className="how-it-works-section">
      <div className="container">
        <div className="text-center">
        <SectionTitle subTitle="work process" title="WORKS IN 4 EASY STEPS" />

          {/* <p className="section-description">
            We make your spending <span className="highlight">stress-free</span> for you to have the perfect control.
          </p> */}
        </div>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <div className={`step-number-circle step-number-${index + 1}`}>
                <span>{step.number}</span>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
