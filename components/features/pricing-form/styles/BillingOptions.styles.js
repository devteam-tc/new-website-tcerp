export const billingOptionsStyles = {
  monthlyText: {
    fontSize: '24px',
    fontWeight: '600'
  },
  yearlyText: {
    fontSize: '24px',
    fontWeight: '600'
  },
  currencyLabel: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#000'
  },
  switchContainer: {
    margin: '0 5px'
  }
};

export const globalStyles = `
  .form-check-input[type="checkbox"] {
    background-color: #e9ecef !important;
    border-color: #ced4da !important;
  }

  .form-check-input[type="checkbox"]:checked {
    background-color: rgb(216, 58, 15) !important;
    border-color: #ef5226 !important;
  }

  .form-check-input[type="checkbox"]:focus {
    border-color: #ef5226 !important;
    box-shadow: 0 0 0 0.25rem rgba(239, 82, 38, 0.25) !important;
  }

  .form-check-input[type="radio"] {
    background-color: #fff !important;
    border-color: #ced4da !important;
  }

  .form-check-input[type="radio"]:checked {
    background-color: rgb(216, 58, 15) !important;
    border-color: rgb(216, 58, 15) !important;
  }

  .form-check-input[type="radio"]:focus {
    border-color: rgb(216, 58, 15) !important;
    box-shadow: 0 0 0 0.25rem rgba(216, 58, 15, 0.25) !important;
  }

  .form-check-input[type="radio"]:checked + .form-check-label {
    color: rgb(216, 58, 15) !important;
  }

  .custom-switch .form-check-input {
    width: 3.5rem !important;
    height: 1.4rem !important;
    // margin-top: 0;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba(255, 255, 255, 1)'/%3e%3c/svg%3e");
    background-position: left center;
    border-radius: 0.8rem !important;
    transition: background-position .15s ease-in-out;
    background-size: 1.4rem !important;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  }

  .custom-switch .form-check-input:checked {
    background-position: right center;
    background-color: rgb(216, 58, 15) !important;
    border-color: rgb(216, 58, 15) !important;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2) !important;
  }

  .custom-switch .form-check-input:focus {
    border-color: rgb(216, 58, 15) !important;
    box-shadow: 0 0 0 0.25rem rgba(216, 58, 15, 0.25), inset 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  }

  .custom-radio {
    margin: 0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .custom-radio input[type="radio"] {
    margin-right: 0.5rem;
  }

  .custom-radio input[type="radio"]:checked + label {
    color: rgb(216, 58, 15) !important;
  }

  .custom-radio input[type="radio"] {
    accent-color: rgb(216, 58, 15) !important;
  }

  .custom-radio input[type="radio"]:checked {
    background-color: rgb(216, 58, 15) !important;
    border-color: rgb(216, 58, 15) !important;
  }

  .custom-radio input[type="radio"]:focus {
    box-shadow: 0 0 0 0.25rem rgba(216, 58, 15, 0.25) !important;
  }
`; 