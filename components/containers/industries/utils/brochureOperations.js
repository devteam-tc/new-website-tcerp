// Brochure filename mapping
const brochureMap = {
  'Retail Solutions': 'retail-solutions',
  'Fashion Industry Solutions Guide': 'retail-solutions', // Map to existing brochure temporarily
  // Add more mappings as brochures are added
};

// Available brochures list
const AVAILABLE_BROCHURES = ['retail-solutions'];

export const getBrochureFilename = (title) => {
  // First try to get the mapped filename
  const mappedFilename = brochureMap[title];
  if (mappedFilename) {
    return mappedFilename;
  }

  // Fallback to generating filename from title
  return title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const isBrochureAvailable = (title) => {
  const filename = getBrochureFilename(title);
  return AVAILABLE_BROCHURES.includes(filename);
};

export const getBrochureStatus = (title) => {
  const filename = getBrochureFilename(title);
  
  if (!AVAILABLE_BROCHURES.includes(filename)) {
    return {
      available: false,
      message: `The brochure for "${title}" is coming soon. For now, you can download our Retail Solutions brochure.`,
      fallbackBrochure: 'retail-solutions'
    };
  }

  return {
    available: true,
    message: null,
    fallbackBrochure: null
  };
};

export const downloadBrochureFile = async (industryTitle) => {
  const status = getBrochureStatus(industryTitle);
  const filename = status.available ? getBrochureFilename(industryTitle) : status.fallbackBrochure;
  const brochurePath = `/brochures/${filename}.pdf`;
  
  console.log('Attempting to download brochure:', {
    title: industryTitle,
    filename: filename,
    path: brochurePath,
    availableBrochures: AVAILABLE_BROCHURES,
    status
  });

  try {
    const checkResponse = await fetch(brochurePath, { 
      method: 'HEAD',
      cache: 'no-cache'
    });

    if (!checkResponse.ok) {
      console.error('Brochure file check failed:', {
        status: checkResponse.status,
        statusText: checkResponse.statusText,
        path: brochurePath,
        title: industryTitle
      });

      throw new Error('The brochure file is temporarily unavailable. Please contact support.');
    }

    const response = await fetch(brochurePath, {
      cache: 'no-cache'
    });

    if (!response.ok) {
      throw new Error('Failed to download brochure. Please try again.');
    }

    const blob = await response.blob();
    if (blob.size === 0) {
      throw new Error('Downloaded file is empty. Please try again.');
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    
    // Use appropriate title based on availability
    const downloadTitle = status.available ? 
      `${industryTitle} Brochure.pdf` : 
      'Retail Solutions Brochure.pdf';
    
    link.download = downloadTitle;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    console.log('Brochure download successful:', {
      title: industryTitle,
      downloadedAs: downloadTitle,
      size: blob.size,
      path: brochurePath
    });

    // If using fallback brochure, show a message
    if (!status.available) {
      return {
        success: true,
        message: status.message
      };
    }

    return {
      success: true,
      message: null
    };
  } catch (error) {
    console.error('Error during brochure download:', {
      error: error.message,
      title: industryTitle,
      path: brochurePath
    });
    throw error;
  }
}; 