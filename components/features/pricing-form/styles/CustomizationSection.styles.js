export const customizationStyles = {
  section: {
    backgroundColor: '#f8f9fa',
    height: '100%'
  },
  title: {
    color: '#2c3e50',
    fontWeight: '600'
  },
  info: {
    fontSize: '0.9rem'
  },
  infoIcon: {
    color: '#0d6efd'
  },
  customizationSection: {
    padding: '1rem',
    border: '1px solid #dee2e6',
    backgroundColor: '#fff',
    boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
    borderRadius: '0.25rem'
  },
  levelDescription: {
    marginBottom: '1rem',
    padding: '0.75rem',
    backgroundColor: 'var(--bs-secondary-50)',
    borderRadius: '0.25rem'
  },
  levelTitle: {
    color: 'var(--bs-black-color)',
    fontWeight: '600',
    marginBottom: '0.5rem',
    fontSize: '18px',
  },
  levelInfo: {
    fontSize: '0.875rem',
    color: 'var(--bs-black-color)',
    lineHeight: '1.5',
    fontSize: '16px',
  },
  infoText: {
    fontSize: '0.875rem',
    color: '#6c757d',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  select: {
    marginBottom: '1rem',
    border: '1px solid #ced4da',
    borderRadius: '0.25rem',
    padding: '0.375rem 0.75rem'
  }
};

export const mediaQueries = `
  @media (max-width: 768px) {
    .customization-section {
      margin-top: 1rem;
    }
    .level-description {
      padding: 0.5rem;
    }
  }
`; 