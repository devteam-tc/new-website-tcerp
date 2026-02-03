import React from 'react';
import { Button } from 'react-bootstrap';

const SuccessView = ({ downloadError, onRetry, onClose, onDownloadAgain, industryTitle }) => (
  <div className="text-center py-4">
    <div className="mb-4">
      <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
    </div>
    <h4 className="mb-3">Thank You!</h4>
    <p className="mb-4">Your information has been submitted successfully.</p>
    
    {downloadError ? (
      <div className="alert alert-warning mb-3" role="alert">
        {downloadError}
        <div className="mt-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={onRetry}
          >
            <i className="fas fa-redo me-2"></i>
            Try Download Again
          </Button>
        </div>
      </div>
    ) : (
      <>
        <p className="text-success mb-4">
          <i className="fas fa-download me-2"></i>
          Your brochure is downloading...
        </p>
        <div className="mt-3">
          <Button
            variant="outline-primary"
            onClick={onDownloadAgain}
            className="me-2"
          >
            <i className="fas fa-download me-2"></i>
            Download Again
          </Button>
          <Button
            variant="outline-secondary"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </>
    )}
  </div>
);

export default SuccessView; 