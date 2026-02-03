import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { MODULES, CURRENCY_SYMBOLS } from './constants';
import { moduleTableStyles, mediaQueries } from './styles/ModuleTable.styles';

const ModuleTable = ({ formData, handleModuleChange, handleUserIncrement, exchangeRates }) => {
  const formatPrice = (price, currency) => {
    const symbol = CURRENCY_SYMBOLS[currency];
    return `${symbol}${price.toFixed(2)}`;
  };

  return (
    <div className="table-responsive" style={moduleTableStyles.tableContainer}>
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th className="module-name" style={moduleTableStyles.tableHeader}>Module Name</th>
            <th className="module-price" style={moduleTableStyles.tableHeader}>Pricing</th>
            <th className="module-users" style={moduleTableStyles.tableHeader}>Users</th>
            <th className="module-total" style={moduleTableStyles.tableHeader}>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(MODULES).map(([moduleId, module]) => {
            const userCount = formData.selectedModules[moduleId] || 0;
            let basePrice = module.basePrice;
            let moduleTotal = basePrice * userCount;

            if (formData.currency !== 'INR') {
              basePrice = basePrice * exchangeRates[formData.currency];
              moduleTotal = moduleTotal * exchangeRates[formData.currency];
            }

            return (
              <tr key={moduleId}>
                <td className="module-name text-break" style={moduleTableStyles.tableCell}>{module.name}</td>
                <td className="module-price" style={moduleTableStyles.tableCell}>
                  <div className="d-flex flex-column">
                    <span>{formatPrice(basePrice, formData.currency)}</span>
                    {formData.currency !== 'INR' && (
                      <small className="text-muted">
                        (₹{module.basePrice} INR)
                      </small>
                    )}
                  </div>
                </td>
                <td className="module-users" style={moduleTableStyles.tableCell}>
                  <div style={moduleTableStyles.userControls}>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleUserIncrement(moduleId, -1)}
                      className="px-2 py-1"
                    >
                      -
                    </Button>
                    <Form.Control
                      type="number"
                      min="0"
                      value={userCount}
                      onChange={(e) => handleModuleChange(moduleId, e.target.value)}
                      placeholder="0"
                      style={moduleTableStyles.userInput}
                      className="text-center"
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleUserIncrement(moduleId, 1)}
                      className="px-2 py-1"
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td className="module-total" style={moduleTableStyles.tableCell}>
                  <div className="d-flex flex-column">
                    <span>{formatPrice(moduleTotal, formData.currency)}</span>
                    {formData.currency !== 'INR' && (
                      <small className="text-muted">
                        (₹{module.basePrice * userCount} INR)
                      </small>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <style jsx>{mediaQueries}</style>
    </div>
  );
};

export default ModuleTable; 