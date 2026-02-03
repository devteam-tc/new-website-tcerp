import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

// Import utilities
import { downloadBrochureFile } from './utils/brochureOperations';
import { storageOperations } from './utils/storageOperations';

// Import components
import FormFields from './components/FormFields';
import SuccessView from './components/SuccessView';

// Import styles
import './styles/DownloadFormPopup.css';

// Dynamically import Modal to avoid SSR issues
const BootstrapModal = dynamic(() => Promise.resolve(Modal), { ssr: false });

// Initial form state
const initialFormState = {
  firstName: '',
  email: '',
  companyName: '',
  phoneNumber: '',
  industry: '',
  customIndustry: '',
  message: ''
};

// Form validation
const validateForm = (formData) => {
  if (!formData.firstName.trim()) return 'First name is required';
  if (!formData.email.trim()) return 'Email is required';
  if (!formData.companyName.trim()) return 'Company name is required';
  if (!formData.phoneNumber) return 'Phone number is required';
  if (!formData.industry) return 'Industry is required';
  if (formData.industry === 'Other' && !formData.customIndustry.trim()) {
    return 'Please specify your industry';
  }
  return null;
};

// Firebase operations
const saveToFirebase = async (formData, industryTitle) => {
  try {
    const docRef = await addDoc(collection(db, 'industry_applications'), {
      ...formData,
      submittedAt: serverTimestamp(),
      brochureTitle: industryTitle,
      source: 'brochure_download',
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

// Main Component
const DownloadFormPopup = ({ show, industryTitle, onHide }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);

  // Check if user has submitted before
  useEffect(() => {
    const hasSubmitted = storageOperations.hasSubmittedBefore();
    setHasSubmittedBefore(hasSubmitted);
    if (hasSubmitted) {
      setIsFormSubmitted(true);
    }
  }, []);

  const handleClose = useCallback(() => {
    if (!hasSubmittedBefore) {
      setFormData(initialFormState);
      setError('');
      setDownloadError('');
      setIsFormSubmitted(false);
    }
    setIsSubmitting(false);
    onHide();
  }, [onHide, hasSubmittedBefore]);

  // Update form when modal is shown/hidden
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (show) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [show]);

  // Load saved user data if available
  useEffect(() => {
    const savedUserData = storageOperations.getUserData();
    if (savedUserData) {
      setFormData(prev => ({
        ...prev,
        ...savedUserData,
        industry: industryTitle || savedUserData.industry
      }));
    }
  }, [industryTitle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({ ...prev, phoneNumber: value }));
    setError('');
  };

  const handleDirectDownload = async () => {
    setDownloadError('');
    setIsSubmitting(true);
    try {
      const result = await downloadBrochureFile(industryTitle);
      if (result.message) {
        setDownloadError(result.message);
      }
    } catch (error) {
      console.error('Download error:', error);
      setDownloadError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDownloadError('');
    setIsSubmitting(true);

    try {
      // Step 1: Validate form
      const validationError = validateForm(formData);
      if (validationError) {
        throw new Error(validationError);
      }

      // Step 2: Prepare data - only include customIndustry if "Other" is selected
      const finalIndustry = formData.industry === 'Other' ? formData.customIndustry : formData.industry;
      const submitData = {
        firstName: formData.firstName,
        email: formData.email,
        companyName: formData.companyName,
        phoneNumber: formData.phoneNumber,
        industry: finalIndustry,
        message: formData.message || ''
      };

      // Only add customIndustry if "Other" was selected
      if (formData.industry === 'Other') {
        submitData.customIndustry = formData.customIndustry;
      }

      // Step 3: Save to Firebase
      try {
        await saveToFirebase(submitData, industryTitle);
        console.log('Data saved to Firebase successfully');
      } catch (firebaseError) {
        console.error('Firebase error:', firebaseError);
        throw new Error('Failed to save your information. Please try again.');
      }

      // Step 4: Save user data to localStorage
      try {
        const { message, ...userDataToSave } = submitData;
        storageOperations.saveUserData(userDataToSave);
        storageOperations.markFirstSubmissionDone();
        setHasSubmittedBefore(true);
        console.log('User data saved to localStorage');
      } catch (storageError) {
        console.error('Storage error:', storageError);
      }

      // Step 5: Mark form as submitted
      setIsFormSubmitted(true);

      // Step 6: Download brochure
      try {
        const result = await downloadBrochureFile(industryTitle);
        if (result.message) {
          setDownloadError(result.message);
        }
      } catch (downloadError) {
        console.error('Download error:', downloadError);
        setDownloadError(downloadError.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setError(error.message || 'Unable to process your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BootstrapModal 
      show={show} 
      centered
      backdrop="static"
      keyboard={false}
      className="download-form-popup"
      size="lg"
      onHide={handleClose}
    >
      <Modal.Header>
        <Modal.Title>
          Download {industryTitle} Brochure
        </Modal.Title>
        <button 
          type="button" 
          className="btn-close" 
          onClick={handleClose}
          aria-label="Close"
        ></button>
      </Modal.Header>
      <Modal.Body>
        {!isFormSubmitted ? (
          <Form onSubmit={handleSubmit}>
            <FormFields 
              formData={formData}
              handleChange={handleChange}
              handlePhoneChange={handlePhoneChange}
            />

            {error && (
              <div className="alert alert-danger mb-3" role="alert">
                {error}
              </div>
            )}

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button 
                variant="primary" 
                type="submit"
                className="proceed-btn"
                disabled={isSubmitting}
                style={{
                  background: "linear-gradient(45deg, var(--bs-primary-500), var(--bs-primary-700))",
                  border: "none"
                }}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Processing...
                  </>
                ) : (
                  'Download'
                )}
              </Button>
            </div>
          </Form>
        ) : (
          <SuccessView 
            downloadError={downloadError}
            onRetry={handleDirectDownload}
            onClose={handleClose}
            onDownloadAgain={handleDirectDownload}
            industryTitle={industryTitle}
          />
        )}
      </Modal.Body>
    </BootstrapModal>
  );
};

export default DownloadFormPopup; 