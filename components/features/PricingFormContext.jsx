"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import PricingFormPopup from './PricingFormPopup';
import { usePathname } from 'next/navigation';
import { auth, db } from '../../firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

const PricingFormContext = createContext();

export const usePricingForm = () => {
  const context = useContext(PricingFormContext);
  if (!context) {
    throw new Error('usePricingForm must be used within a PricingFormProvider');
  }
  return context;
};

export const PricingFormProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const pathname = usePathname();

  // Check for existing form submission on mount
  useEffect(() => {
    const checkExistingSubmission = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'pricing_form_submissions', user.uid));
          if (userDoc.exists()) {
            setHasSubmittedForm(true);
            localStorage.setItem('hasSubmittedForm', 'true');
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
          }
        }
      } catch (error) {
        console.error('Error checking form submission:', error);
      }
    };

    checkExistingSubmission();
  }, []);

  // Initialize state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedFormState = localStorage.getItem('showDetailsForm');
    const storedSubmissionState = localStorage.getItem('hasSubmittedForm');
    
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    if (storedFormState === 'true') {
      setShowDetailsForm(true);
    }
    if (storedSubmissionState === 'true') {
      setHasSubmittedForm(true);
    }
  }, []);

  // Handle popup visibility based on pathname and form state
  useEffect(() => {
    if (pathname && pathname.includes('/pricing')) {
      const storedLeadId = localStorage.getItem('currentLeadId');
      const storedSubmissionState = localStorage.getItem('hasSubmittedForm');
      
      if (!storedSubmissionState && storedLeadId) {
        setShowPopup(true);
        setIsAuthenticated(true);
      } else if (!storedSubmissionState) {
        setShowPopup(true);
      }
    } else {
      setShowPopup(false);
    }
  }, [pathname]);

  const handleHide = () => {
    setShowPopup(false);
    setShowDetailsForm(false);
    localStorage.removeItem('showDetailsForm');
  };

  const handleAuthSuccess = async () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    
    // Check if user has already submitted the form
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'pricing_form_submissions', user.uid));
        if (userDoc.exists()) {
          setHasSubmittedForm(true);
          localStorage.setItem('hasSubmittedForm', 'true');
          handleHide();
          return;
        }
      }
    } catch (error) {
      console.error('Error checking form submission:', error);
    }
  };

  return (
    <PricingFormContext.Provider 
      value={{ 
        showPopup, 
        setShowPopup, 
        isAuthenticated, 
        showDetailsForm,
        hasSubmittedForm,
        handleAuthSuccess,
        handleHide 
      }}
    >
      {children}
      <PricingFormPopup 
        show={showPopup && !hasSubmittedForm} 
        onHide={handleHide}
        isAuthenticated={isAuthenticated}
        showDetailsForm={showDetailsForm}
        onAuthSuccess={handleAuthSuccess}
      />
    </PricingFormContext.Provider>
  );
}; 