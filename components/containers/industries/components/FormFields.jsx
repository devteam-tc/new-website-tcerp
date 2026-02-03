import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { INDUSTRIES } from '../../../features/pricing-form/constants';

const FormFields = ({ formData, handleChange, handlePhoneChange }) => (
  <>
    <Row>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Enter your first name"
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Email <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </Form.Group>
      </Col>
    </Row>

    <Row>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Company Name <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            placeholder="Enter your company name"
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Industry <span className="text-danger">*</span></Form.Label>
          <Form.Select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
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
              className="mt-2"
            />
          )}
        </Form.Group>
      </Col>
    </Row>

    <Row>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
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
      <Form.Label>Message</Form.Label>
      <Form.Control
        as="textarea"
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows={3}
        placeholder="Tell us about your requirements"
      />
    </Form.Group>
  </>
);

export default FormFields; 