import React from 'react';

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="step-indicator mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-label">Basic Details</div>
        </div>
        <div className="step-connector"></div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-label">Module Selection</div>
        </div>
      </div>

      <style jsx>{`
        .step-indicator {
          padding: 20px 0;
        }
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .step-number {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #e9ecef;
          color: #6c757d;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-bottom: 8px;
          transition: all 0.3s ease;
        }
        .step.active .step-number {
          background-color: #0d6efd;
          color: white;
        }
        .step-label {
          font-size: 0.9rem;
          color: #6c757d;
          transition: all 0.3s ease;
        }
        .step.active .step-label {
          color: #0d6efd;
          font-weight: 500;
        }
        .step-connector {
          flex: 1;
          height: 2px;
          background-color: #e9ecef;
          margin: 0 15px;
          position: relative;
          top: -15px;
        }
      `}</style>
    </div>
  );
};

export default StepIndicator; 