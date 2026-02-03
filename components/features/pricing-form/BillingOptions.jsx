import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { CURRENCY_SYMBOLS } from './constants';
import { billingOptionsStyles, globalStyles } from './styles/BillingOptions.styles';

const BillingOptions = ({ formData, handleChange, loadingRates }) => {
  return (
    <div className="mb-4">
      <style>{globalStyles}</style>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="d-flex flex-column align-items-center gap-3">
            <div className="text-center">
              <div className="d-flex align-items-center gap-3">
                <span style={{
                  ...billingOptionsStyles.monthlyText,
                  color: formData.billingCycle === 'monthly' ? 'hsl(13, 87.00%, 45.30%)' : '#000000'
                }}>
                  Monthly
                </span>
                <Form.Check
                  type="switch"
                  id="billingCycle"
                  name="billingCycle"
                  checked={formData.billingCycle === 'yearly'}
                  onChange={(e) => handleChange({
                    target: {
                      name: 'billingCycle',
                      value: e.target.checked ? 'yearly' : 'monthly'
                    }
                  })}
                  className="custom-switch"
                  style={billingOptionsStyles.switchContainer}
                />
                <span style={{
                  ...billingOptionsStyles.yearlyText,
                  color: formData.billingCycle === 'yearly' ? 'hsl(13, 87.00%, 45.30%)' : '#000000'
                }}>
                  Yearly
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="d-flex gap-3">
                <Form.Label 
                  className="d-block mb-2" 
                  style={billingOptionsStyles.currencyLabel}
                >
                  Select Your Currency :
                </Form.Label>
                {Object.entries(CURRENCY_SYMBOLS).map(([code, symbol]) => (
                  <Form.Check
                    key={code}
                    type="radio"
                    id={`currency-${code}`}
                    name="currency"
                    label={`${code} (${symbol})`}
                    value={code}
                    checked={formData.currency === code}
                    onChange={handleChange}
                    className="custom-radio"
                    disabled={loadingRates}
                  />
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BillingOptions; 