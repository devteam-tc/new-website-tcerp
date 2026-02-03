import React from 'react';
import { Form } from 'react-bootstrap';
import { CUSTOMIZATION_LEVELS } from './constants';
import { customizationStyles } from './styles/CustomizationSection.styles';

const CustomizationSection = ({ formData, handleChange }) => {
  return (
    <div style={customizationStyles.customizationSection}>
      <h6 className="mb-3" style={{ fontSize: '20px', fontWeight: '600' }}>Customization Level</h6>
      <Form.Select
        name="customizationLevel"
        value={formData.customizationLevel}
        onChange={handleChange}
        className="mb-3"
      >
        {CUSTOMIZATION_LEVELS.map(level => (
          <option key={level.level} value={level.level}>
            {level.name} (+{level.percentage}%)
          </option>
        ))}
      </Form.Select>
      <div className="customization-info">
        {(formData.customizationLevel === 1 || formData.customizationLevel === '1') && (
          <div style={customizationStyles.levelDescription}>
            <p style={customizationStyles.levelTitle}>Level 1 - Basic Customization</p>
            <p style={customizationStyles.levelInfo}>
              <small>
              Start with the essential tools to manage your core operations. This plan includes key modules, basic analytics and guided setup to get you moving quickly and efficiently.
              </small>
            </p>
          </div>
        )}
        {(formData.customizationLevel === 2 || formData.customizationLevel === '2') && (
          <div style={customizationStyles.levelDescription}>
            <p style={customizationStyles.levelTitle}>Level 2 - Standard Customization</p>
            <p style={customizationStyles.levelInfo}>
              <small>
              Gain access to a broader set of business modules and enhanced reporting features designed to help you operate smarter and grow faster.
              </small>
            </p>
          </div>
        )}
        {(formData.customizationLevel === 3 || formData.customizationLevel === '3') && (
          <div style={customizationStyles.levelDescription}>
            <p style={customizationStyles.levelTitle}>Level 3 - Advanced Customization</p>
            <p style={customizationStyles.levelInfo}>
              <small>
              unlock full platform capabilities with complete access to all modules, advanced customization options and support for complex business needs.
              </small>
            </p>
          </div>
        )}

        {/* <p className="mb-2">
          <small>
            <i className="bi bi-info-circle me-1"></i>
            {(formData.customizationLevel === 1 || formData.customizationLevel === '1') && 'Level 1 customization adds 10% to the base price'}
            {(formData.customizationLevel === 2 || formData.customizationLevel === '2') && 'Level 2 customization adds 20% to the base price'}
            {(formData.customizationLevel === 3 || formData.customizationLevel === '3') && 'Level 3 customization adds 30% to the base price'}
            {(formData.customizationLevel === 4 || formData.customizationLevel === '4') && 'Level 4 customization adds 40% to the base price'}
            {(formData.customizationLevel === 5 || formData.customizationLevel === '5') && 'Level 5 customization adds 50% to the base price'}
          </small>
        </p> */}
      </div>
    </div>
  );
};

export default CustomizationSection; 