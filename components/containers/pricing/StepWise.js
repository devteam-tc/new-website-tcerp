'use client';
import Image from 'next/image';
import stepData from '../../../data/pricing/stepWise.json';

export default function StepWise() {
  const { steps, header } = stepData;

  return (
    <section className="howItWorks">
      <div className="container">
        <div className="left">
          <h4 className="textheading">
            {header.title.split(' ')[0]} <br /> {header.title.split(' ').slice(1).join(' ')}
          </h4>
          <p>{header.description}</p>
        </div>
        <div className="right">
          {steps.map((step, idx) => (
            <div key={idx} className="stepCard">
              <div className="iconWrapper">
                <Image 
                  src={step.img} 
                  alt={step.title} 
                  width={150} 
                  height={150} 
                  priority={idx === 0} 
                />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="underline"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}