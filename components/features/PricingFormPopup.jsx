"use client";
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { auth, db } from '../../firebaseConfig';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';

// Import sub-components
import AuthStep from './pricing-form/AuthStep';
import ModuleSelection from './pricing-form/ModuleSelection';
import ThankYouPage from './pricing-form/ThankYouPage';
import { MODULES, CUSTOMIZATION_LEVELS } from './pricing-form/constants';

const PricingFormPopup = ({ 
  show, 
  onHide, 
  isAuthenticated, 
  showDetailsForm,
  onAuthSuccess 
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    phoneNumber: '',
    countryCode: '',
    email: '',
    companyName: '',
    industry: '',
    customIndustry: '',
    businessType: '',
    message: '',
    selectedModules: {},
    customizationLevel: 1,
    billingCycle: 'monthly',
    currency: 'INR'
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [totalPrice, setTotalPrice] = useState({
    base: 0,
    customization: 0,
    total: 0,
    percentage: 10
  });
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loadingRates, setLoadingRates] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const router = useRouter();

  // Add effect to handle body overflow and prevent auto-show
  useEffect(() => {
    if (show) {
      // Check if we're returning to the page
      const hasSubmitted = localStorage.getItem('formSubmitted');
      if (hasSubmitted) {
        onHide();
        return;
      }
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (show) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [show, onHide]);

  // Reset states when component unmounts or show changes
  useEffect(() => {
    if (!show) {
      setShowThankYou(false);
      setHasSubmitted(false);
    }
  }, [show]);

  // Fetch exchange rates
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchExchangeRates = async () => {
      try {
        setLoadingRates(true);
        
        const response = await axios.get('https://open.er-api.com/v6/latest/INR', {
          signal: controller.signal,
          timeout: 5000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (response.data && response.data.result === 'success' && response.data.rates) {
          const exchangeRates = {
            ...response.data.rates,
            INR: 1 // Add INR as base currency
          };
          
          if (isMounted) {
            setExchangeRates(exchangeRates);
            // Store rates in localStorage with timestamp
            localStorage.setItem('exchangeRates', JSON.stringify({
              rates: exchangeRates,
              timestamp: Date.now(),
              date: response.data.time_last_update_utc
            }));
          }
        } else {
          throw new Error('Invalid response from exchange rate API');
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
        } else {
          console.error('Error fetching exchange rates:', error);
          
          // Try to get cached rates from localStorage
          const cachedRates = localStorage.getItem('exchangeRates');
          if (cachedRates) {
            const { rates, timestamp } = JSON.parse(cachedRates);
            // Use cached rates if they're less than 1 hour old
            if (Date.now() - timestamp < 3600000) {
              setExchangeRates(rates);
              toast.warning('Using cached exchange rates. Please refresh the page to get latest rates.');
              return;
            }
          }

          toast.error('Failed to fetch exchange rates. Using default rates.');
          setExchangeRates({
            INR: 1,
            USD: 0.011705 // Current rate from the API
          });
        }
      } finally {
        if (isMounted) {
          setLoadingRates(false);
        }
      }
    };

    fetchExchangeRates();
    // Refresh rates every 5 minutes
    const interval = setInterval(fetchExchangeRates, 300000);

    return () => {
      isMounted = false;
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setFormData(prev => ({ ...prev, email: user.email }));
        // Check if we have stored form data
        const storedData = localStorage.getItem('pricingFormData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setFormData(prev => ({
            ...prev,
            ...parsedData,
            email: user.email // Keep the current user's email
          }));
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Calculate total price whenever relevant fields change
  useEffect(() => {
    if (!exchangeRates) return;

    let baseTotal = 0;
    
    // Calculate module costs
    Object.entries(formData.selectedModules).forEach(([moduleId, userCount]) => {
      if (userCount > 0) {
        const modulePrice = MODULES[moduleId].basePrice * userCount;
        baseTotal += modulePrice;
      }
    });

    // Get customization percentage based on selected level
    const selectedLevel = CUSTOMIZATION_LEVELS.find(level => level.level === parseInt(formData.customizationLevel));
    const customizationPercentage = selectedLevel ? selectedLevel.percentage : 10;

    // Calculate customization amount
    let customizationAmount = baseTotal * (customizationPercentage / 100);
    
    // Calculate total before yearly discount
    let total = baseTotal + customizationAmount;

    // Apply yearly discount if yearly billing
    if (formData.billingCycle === 'yearly') {
      total = total * 12 * 0.8; // 20% discount for yearly billing
      baseTotal = baseTotal * 12; // Base price for yearly billing
      customizationAmount = customizationAmount * 12; // Customization for yearly billing
    }

    // Convert to selected currency
    if (formData.currency !== 'INR') {
      // Convert from INR to selected currency
      total = total * exchangeRates[formData.currency];
      baseTotal = baseTotal * exchangeRates[formData.currency];
      customizationAmount = customizationAmount * exchangeRates[formData.currency];
    }

    setTotalPrice({
      base: baseTotal,
      customization: customizationAmount,
      total: total,
      percentage: customizationPercentage
    });
  }, [formData.selectedModules, formData.customizationLevel, 
      formData.billingCycle, formData.currency, exchangeRates]);

  // Add useEffect for auto-closing the thank you popup
  useEffect(() => {
    let timer;
    if (showThankYou) {
      timer = setTimeout(() => {
        setShowThankYou(false);
        localStorage.removeItem('formSubmitted');
      }, 5000); // Show thank you for 5 seconds
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [showThankYou]);

  // Add effect to prevent thank you popup from showing when form is shown
  useEffect(() => {
    if (show) {
      setShowThankYou(false);
    }
  }, [show]);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userDoc = await getDoc(doc(db, 'pricing_form_submissions', user.uid));
      if (userDoc.exists()) {
        toast.success('Welcome back!');
        onHide();
      } else {
        // Just update the form data with email, don't proceed to next step
        setFormData(prev => ({ ...prev, email: user.email }));
      }
    } catch (error) {
      toast.error('Error signing in with Google: ' + error.message);
    }
  };

  // Email configuration
  const emailConfig = {
    // User Acknowledgment
    user: {
      service_id: "service_qj3f93o",
      template_id: "template_z9alfmz",
      public_key: "-CuhfwvgeA0D1IAeZ"
    },
    // Admin Notification
    admin: {
      service_id: "service_qj3f93o",
      template_id: "template_fcjozeu",
      public_key: "-CuhfwvgeA0D1IAeZ"
    }
  };

  const sendEmail = async (quotationData) => {
    try {
      // Get currency symbol
      const currencySymbols = {
        'INR': '₹',
        'USD': '$',
        'EUR': '€',
        'GBP': '£'
      };
      const currencySymbol = currencySymbols[formData.currency] || '₹';

      // Create complete HTML table for modules
      const moduleTable = `
        <table class="module-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; background: #fff; border: 1px solid #ddd;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; font-weight: 600;">Module</th>
              <th style="padding: 12px 15px; text-align: right; border-bottom: 1px solid #eee; font-weight: 600;">Users</th>
              <th style="padding: 12px 15px; text-align: right; border-bottom: 1px solid #eee; font-weight: 600;">Price per User</th>
              <th style="padding: 12px 15px; text-align: right; border-bottom: 1px solid #eee; font-weight: 600;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(formData.selectedModules)
              .filter(([_, count]) => count > 0)
              .map(([moduleId, count]) => {
                const module = MODULES[moduleId];
                const perUser = `${currencySymbol}${module.basePrice.toFixed(2)}`;
                const total = `${currencySymbol}${(module.basePrice * count).toFixed(2)}`;
                return `
                  <tr>
                    <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee;">${module.name}</td>
                    <td style="padding: 12px 15px; text-align: right; border-bottom: 1px solid #eee;">${count}</td>
                    <td style="padding: 12px 15px; text-align: right; border-bottom: 1px solid #eee;">${perUser}</td>
                    <td style="padding: 12px 15px; text-align: right; border-bottom: 1px solid #eee;">${total}</td>
                  </tr>
                `;
              })
              .join('')}
            <tr style="font-weight: bold; background-color: #f8f9fa;">
              <td colspan="3" style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee;">Base Price</td>
              <td style="padding: 12px 15px; text-align: right; border-bottom: 1px solid #eee;">${currencySymbol}${totalPrice.base.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      `;

      // Common template parameters for both emails
      const commonParams = {
        company_name: formData.companyName || 'N/A',
        industry: formData.industry || 'N/A',
        billing_cycle: formData.billingCycle || 'N/A',
        customization_level: CUSTOMIZATION_LEVELS.find(level => level.level === parseInt(formData.customizationLevel))?.name || 'Standard',
        first_name: formData.firstName || 'N/A',
        phone_number: formData.phoneNumber || 'N/A',
        email: formData.email || 'N/A',
        submitted_at: new Date().toLocaleString(),
        status: 'pending',
        modules_table: moduleTable,
        base_price: `${currencySymbol}${totalPrice.base.toFixed(2)}`,
        customization_price: `${currencySymbol}${totalPrice.customization.toFixed(2)}`,
        discount_percentage: totalPrice.percentage.toString(),
        discount_amount: `${currencySymbol}${(totalPrice.total * 0.2).toFixed(2)}`,
        total_price: `${currencySymbol}${(totalPrice.total * 0.8).toFixed(2)}`,
        currency: formData.currency,
        // Add any additional fields that might be needed in the templates
        message: formData.message || 'No additional message provided',
        business_type: formData.businessType || 'N/A',
        custom_industry: formData.customIndustry || 'N/A'
      };

      // Send user acknowledgment email
      await emailjs.send(
        emailConfig.user.service_id,
        emailConfig.user.template_id,
        {
          ...commonParams,
          to_email: formData.email, // Send to the user's email
          subject: `Your Quotation Request - ${formData.companyName || 'New Lead'}`
        },
        emailConfig.user.public_key
      );

      // Send admin notification email
      await emailjs.send(
        emailConfig.admin.service_id,
        emailConfig.admin.template_id,
        {
          ...commonParams,
          to_email: 'admin@techclouderp.com', // Replace with actual admin email
          subject: `New Quotation Request - ${formData.companyName || 'New Lead'}`
        },
        emailConfig.admin.public_key
      );

      toast.success('Quotation emails sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      console.error('Error details:', error.message);
      toast.error('Failed to send quotation emails');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in with Google first');
      return;
    }

    setLoading(true);
    try {
      // Get the lead ID from localStorage
      const leadId = localStorage.getItem('currentLeadId');
      if (!leadId) {
        throw new Error('Lead information not found');
      }

      // Get the lead document
      const leadDoc = await getDoc(doc(db, 'leads', leadId));
      if (!leadDoc.exists()) {
        throw new Error('Lead information not found');
      }

      const leadData = leadDoc.data();

      // Prepare the quotation data
      const quotationData = {
        ...leadData,
        selectedModules: formData.selectedModules,
        customizationLevel: formData.customizationLevel,
        billingCycle: formData.billingCycle,
        currency: formData.currency,
        totalPrice: {
          ...totalPrice,
          total: totalPrice.total * 0.8,
          discount: totalPrice.total * 0.2
        },
        exchangeRates,
        submittedAt: new Date(),
        userId: user.uid,
        status: 'pending',
        updatedAt: new Date()
      };

      // Store in quotations collection
      await setDoc(doc(db, 'quotations', leadId), quotationData);

      // Update lead status
      await setDoc(doc(db, 'leads', leadId), {
        ...leadData,
        status: 'quoted',
        updatedAt: new Date()
      }, { merge: true });

      // Store submission in user's document
      await setDoc(doc(db, 'pricing_form_submissions', user.uid), {
        submittedAt: new Date(),
        leadId: leadId
      });

      // Send email with quotation details
      await sendEmail(quotationData);

      // Set form submitted flag in localStorage
      localStorage.setItem('formSubmitted', 'true');

      // Clear all stored data
      localStorage.removeItem('currentLeadId');
      localStorage.removeItem('pricingFormData');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('showDetailsForm');
      
      // Close the main form
      onHide();
      // Redirect to thank you page
      router.push('/thank-you');
    } catch (error) {
      console.error('Error submitting quotation:', error);
      toast.error('Error submitting form: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value, country) => {
    setFormData(prev => ({
      ...prev,
      phoneNumber: value,
      countryCode: `+${country.dialCode}`
    }));
  };

  const handleModuleChange = (moduleId, userCount) => {
    setFormData(prev => ({
      ...prev,
      selectedModules: {
        ...prev.selectedModules,
        [moduleId]: parseInt(userCount) || 0
      }
    }));
  };

  const handleUserIncrement = (moduleId, increment) => {
    const currentCount = formData.selectedModules[moduleId] || 0;
    const newCount = Math.max(0, currentCount + increment);
    handleModuleChange(moduleId, newCount);
  };

  return (
    <>
      <Modal 
        show={show} 
        onHide={onHide} 
        backdrop="static" 
        keyboard={false} 
        centered
        className="pricing-form-popup"
        size="xl"
      >
        <Modal.Header className='mt-5'>
          <Modal.Title className="w-100 text-center">
            {!isAuthenticated ? 'Sign In & Details Required' : 'Select Modules & Users'}
            <h6 className="mb-2 text-center" style={{ fontWeight: '500', color: '#2c3e50' }}>
              {!isAuthenticated 
                ? 'Please sign in with Google to access our pricing plans and get started with your ERP journey'
                : ''
              }
            </h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isAuthenticated ? (
            <AuthStep 
              onGoogleSignIn={handleGoogleSignIn}
              formData={formData}
              handleChange={handleChange}
              handlePhoneChange={handlePhoneChange}
              onNextStep={onAuthSuccess}
            />
          ) : (
            <ModuleSelection
              formData={formData}
              handleChange={handleChange}
              handleModuleChange={handleModuleChange}
              handleUserIncrement={handleUserIncrement}
              totalPrice={totalPrice}
              exchangeRates={exchangeRates}
              loadingRates={loadingRates}
              onSubmit={handleSubmit}
              loading={loading}
            />
          )}
        </Modal.Body>
      </Modal>
      {showThankYou && <ThankYouPage />}
    </>
  );
};

export default PricingFormPopup; 