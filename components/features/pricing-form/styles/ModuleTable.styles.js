export const moduleTableStyles = {
  tableContainer: {
    margin: '0 -15px',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    border: '1px solid var(--techcloud-Secondary-secondary-100, #B2E4EF)'
  },
  tableHeader: {
    whiteSpace: 'nowrap',
    background: 'linear-gradient(180deg, #F5F4F4 5.77%, #FFF 50.48%, #DFDDDD 100%)',
    borderBottom: '2px solid #dee2e6',
    color: 'var(--Primary-Primary1000, #5B1907)',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: '140%'
  },
  tableCell: {
    border: '1px solid var(--techcloud-Secondary-secondary-100, #B2E4EF)',
    background: '#F6FDFF',
    fontSize: '15px',
    textAlign: 'center',
    lineHeight: '140%'
  },
  userInput: {
    width: '50px',
    minWidth: '100px',
    maxWidth: '50px',
    height: '35px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #B2E4EF',
    borderRadius: '6px',
    fontWeight: '500',
    color: '#2C3E50',
    boxShadow: '0 2px 4px rgba(178, 228, 239, 0.2)',
    textAlign: 'center',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    WebkitAppearance: 'none',
    MozAppearance: 'textfield'
  },
  userControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  }
};

export const mediaQueries = `
  @media (min-width: 992px) {
    .table-responsive {
      margin: 0;
      max-width: 85%;
      margin: 0 auto !important;
      display: block !important;   
    }
    .module-name { width: 30%; }
    .module-price { width: 20%; }
    .module-users { width: 30%; }
    .module-total { width: 25%; }
  }

  @media (max-width: 991px) {
    .table th, .table td {
      padding: 0.75rem;
      font-size: 0.95rem;
    }
    .module-name { min-width: 120px; }
    .module-price { min-width: 100px; }
    .module-users { min-width: 120px; }
    .module-total { min-width: 100px; }
  }

  @media (max-width: 768px) {
    .table th, .table td {
      padding: 0.5rem;
      font-size: 0.9rem;
    }
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }
    .form-control {
      font-size: 0.875rem;
      width: 45px !important;
    }
    .module-name { min-width: 110px; }
    .module-price { min-width: 90px; }
    .module-users { min-width: 110px; }
    .module-total { min-width: 90px; }
  }

  @media (max-width: 576px) {
    .table th, .table td {
      padding: 0.4rem;
      font-size: 0.85rem;
    }
    .btn-sm {
      padding: 0.2rem 0.4rem;
      font-size: 0.8rem;
    }
    .form-control {
      font-size: 0.8rem;
      width: 40px !important;
    }
    .module-name { min-width: 100px; }
    .module-price { min-width: 80px; }
    .module-users { min-width: 100px; }
    .module-total { min-width: 80px; }
  }
`; 