import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import BillingOptions from './BillingOptions';
import ModuleTable from './ModuleTable';
import CustomizationSection from './CustomizationSection';
import { CURRENCY_SYMBOLS } from './constants';
import { moduleSelectionStyles } from './styles/ModuleSelection.styles';
import './styles/global.css';

const ModuleSelection = ({
  formData,
  handleChange,
  handleModuleChange,
  handleUserIncrement,
  totalPrice,
  exchangeRates,
  loadingRates,
  onPrev,
  onSubmit,
  loading
}) => {
  const formatPrice = (price, currency) => {
    const symbol = CURRENCY_SYMBOLS[currency];
    return `${symbol}${price.toFixed(2)}`;
  };

  return (
    <div className="module-selection" style={moduleSelectionStyles.container}>
      <div className="text-center mb-4">
        {/* <h5 className="mb-3">Select Modules and Users</h5> */}
        <h6 style={moduleSelectionStyles.description}>
          Choose the features that align perfectly with your business goals and experience the flexibility of a customizable ERP system. Whether you're scaling operations or streamlining workflows, our ERP adapts to your unique needs.
        </h6>
      </div>

      <BillingOptions 
        formData={formData}
        handleChange={handleChange}
        loadingRates={loadingRates}
      />

      <ModuleTable 
        formData={formData}
        handleModuleChange={handleModuleChange}
        handleUserIncrement={handleUserIncrement}
        exchangeRates={exchangeRates}
      />

      <div className="mt-4">
        <Row className="justify-content-center">
          <Col md={6} className="order-md-2">
            <div style={moduleSelectionStyles.totalPrice}>
              <div style={moduleSelectionStyles.priceRow}>
                <span >Base Price:</span>
                <span>{formatPrice(totalPrice.base, formData.currency)}</span>
              </div>
              <div style={moduleSelectionStyles.priceRow}>
                <span>Customization ({totalPrice.percentage}%):</span>
                <span>{formatPrice(totalPrice.customization, formData.currency)}</span>
              </div>
              <div style={moduleSelectionStyles.priceRow}>
                <span>Special Discount (20%):</span>
                <span style={moduleSelectionStyles.discountText}>-{formatPrice(totalPrice.total * 0.2, formData.currency)}</span>
              </div>
              <div style={moduleSelectionStyles.totalRow}>
                <strong>Total Price:</strong>
                <strong>{formatPrice(totalPrice.total * 0.8, formData.currency)}{formData.billingCycle === 'yearly' ? '/Year' : '/Month'}</strong>
              </div>
             
              {formData.currency !== 'INR' && (
                <small className="text-muted d-block">
                  (₹{(totalPrice.total * 0.8 / exchangeRates[formData.currency]).toFixed(2)} INR)
                </small>
              )}
              
            </div>
            <div className="mt-2">
                <small style={{ fontSize: '12px' }}>
                  * Taxes and other applicable charges will be added as per your local regulations
                </small>
              </div>
          </Col>
          <Col md={6} className="order-md-1">
            <CustomizationSection 
              formData={formData}
              handleChange={handleChange}
            />
          </Col>
        </Row>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Button 
          variant="primary" 
          onClick={onSubmit}
          disabled={loading || loadingRates}
        >
          {loading ? 'Submitting...' : 'Get Quotation'}
        </Button>
      </div>
    </div>
  );
};

export default ModuleSelection; 