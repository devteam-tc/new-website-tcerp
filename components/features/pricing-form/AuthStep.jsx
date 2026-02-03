import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { INDUSTRIES } from './constants';
import { db, auth } from '../../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const AuthStep = ({ onGoogleSignIn, formData, handleChange, handlePhoneChange, onNextStep }) => {
  const [storingLead, setStoringLead] = useState(false);
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  // Check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = {
      firstName: formData.firstName.trim(),
      companyName: formData.companyName.trim(),
      industry: formData.industry,
      phoneNumber: formData.phoneNumber,
      countryCode: formData.countryCode
    };

    // If industry is "Other", check customIndustry as well
    if (formData.industry === 'Other') {
      requiredFields.customIndustry = formData.customIndustry.trim();
    }

    return Object.values(requiredFields).every(value => value);
  };

  // Update form completion status whenever form data changes
  useEffect(() => {
    setIsFormComplete(isFormValid());
  }, [formData]);

  const handleGoogleSignIn = async () => {
    try {
      await onGoogleSignIn();
      setIsGoogleSignedIn(true);
      toast.success('Successfully signed in with Google');
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      toast.error('Error signing in with Google. Please try again.');
    }
  };

  const handleLeadStorage = async () => {
    if (!isFormValid() || !isGoogleSignedIn) {
      if (!isFormValid()) {
        toast.error('Please complete all required fields');
      }
      if (!isGoogleSignedIn) {
        toast.error('Please sign in with Google first');
      }
      return;
    }

    setStoringLead(true);
    try {
      // Get current user
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create a unique ID for the lead
      const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Prepare lead data
      const leadData = {
        firstName: formData.firstName.trim(),
        companyName: formData.companyName.trim(),
        industry: formData.industry === 'Other' ? formData.customIndustry.trim() : formData.industry,
        phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
        message: formData.message.trim(),
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        // Add user information
        userId: user.uid,
        userEmail: user.email
      };

      // Store in leads collection
      await setDoc(doc(db, 'leads', leadId), leadData);

      // Store leadId in localStorage for later use
      localStorage.setItem('currentLeadId', leadId);

      // Store form data in localStorage
      const formDataToStore = {
        ...formData,
        leadId: leadId
      };
      localStorage.setItem('pricingFormData', JSON.stringify(formDataToStore));

      // Proceed to next step only after successful storage
      onNextStep();
    } catch (error) {
      console.error('Error storing lead:', error);
      toast.error('Error saving your details. Please try again.');
    } finally {
      setStoringLead(false);
    }
  };

  return (
    <div className="auth-step">
      <div className="text-center mb-4">
        <Button 
          variant="light" 
          onClick={handleGoogleSignIn}
          className="google-signin-btn w-100"
          disabled={storingLead}
        >
          <img 
            src="/images/google-icon.svg" 
            alt="Google" 
            width={18} 
            height={18}
            className="me-2"
          />
          {isGoogleSignedIn ? 'Signed in with Google ✓' : 'Sign in with Google'}
        </Button>
      </div>

      <div className="basic-details">
        <Form>
          <Row className="g-2">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontSize: '14px', marginBottom: '0' }}>First Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your first name"
                  disabled={storingLead}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontSize: '14px', marginBottom: '0' }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-2">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontSize: '14px', marginBottom: '0' }}>Company Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your company name"
                  disabled={storingLead}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontSize: '14px', marginBottom: '0' }}>Industry <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  disabled={storingLead}
                >
                  <option value="">Select your industry</option>
                  {INDUSTRIES.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </Form.Select>
                {formData.industry === 'Other' && (
                  <Form.Control
                    type="text"
                    name="customIndustry"
                    value={formData.customIndustry}
                    onChange={handleChange}
                    required
                    placeholder="Please specify your industry"
                    className="mt-1"
                    disabled={storingLead}
                  />
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-2">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontSize: '14px', marginBottom: '0' }}>Phone Number <span className="text-danger">*</span></Form.Label>
                <PhoneInput
                  country={'in'}
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  inputClass="form-control"
                  containerClass="phone-input-container"
                  buttonClass="phone-input-button"
                  dropdownClass="phone-input-dropdown"
                  searchClass="phone-input-search"
                  preferredCountries={['in', 'us', 'gb', 'ae', 'sa']}
                  enableSearch={true}
                  searchPlaceholder="Search country..."
                  disabled={storingLead}
                  inputProps={{
                    name: 'phoneNumber',
                    required: true,
                    placeholder: 'Enter phone number'
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: '14px', marginBottom: '0' }}>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us about your requirements"
              disabled={storingLead}
            />
          </Form.Group>
        </Form>
      </div>

      <div className="text-center">
        <Button
          variant="primary"
          onClick={handleLeadStorage}
          disabled={!isFormComplete || !isGoogleSignedIn || storingLead}
          className="proceed-btn"
        >
          {storingLead ? 'Saving Details...' : 'Proceed to Module Selection'}
        </Button>
        {(!isFormComplete || !isGoogleSignedIn) && (
          <p className="text-danger mt-2">
            {!isGoogleSignedIn ? 'Please sign in with Google first!' : 
             !isFormComplete ? 'Please complete all required fields' : ''}
          </p>
        )}
      </div>

      <style jsx global>{`
        .auth-step {
          max-width: 800px;
          margin: 0 auto;
        }
        .google-signin-btn {
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        .google-signin-btn:hover:not(:disabled) {
          background-color: #f8f9fa;
          border-color: #ccc;
        }
        .google-signin-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .basic-details {
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
        }
        .basic-details h5 {
          color: #2c3e50;
          font-weight: 600;
        }
        .text-danger {
          color: #dc3545;
        }
        .proceed-btn {
          min-width: 200px;
          padding: 10px 30px;
        }
        .basic-details .form-label {
          font-size: 14px !important;
          margin-bottom: 0 !important;
        }
        .basic-details .form-group {
          margin-bottom: 0 !important;
        }
        .basic-details .mb-1 {
          margin-bottom: 0 !important;
        }
        .basic-details label {
          margin-bottom: 0 !important;
        }
        .form-control::placeholder {
          color: #919191 !important;
        }
        .form-control::-webkit-input-placeholder {
          color: #919191 !important;
        }
        .form-control:-moz-placeholder {
          color: #919191 !important;
        }
        .form-control::-moz-placeholder {
          color: #919191 !important;
        }
        .form-control:-ms-input-placeholder {
          color: #919191 !important;
        }
        .form-select::placeholder {
          color: #919191 !important;
        }
        .form-select::-webkit-input-placeholder {
          color: #919191 !important;
        }
        .form-select:-moz-placeholder {
          color: #919191 !important;
        }
        .form-select::-moz-placeholder {
          color: #919191 !important;
        }
        .form-select:-ms-input-placeholder {
          color: #919191 !important;
        }
      `}</style>
    </div>
  );
};

export default AuthStep;