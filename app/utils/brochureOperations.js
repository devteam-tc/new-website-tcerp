// Brochure filename mapping
const brochureMap = {
    // Retail
    'Retail Solutions': 'retail-solutions',
    'Fashion Industry Solutions Guide': 'retail-solutions',
    
    // Packaging
    'Packaging Industry': 'packaging-industry',
    'Packaging': 'packaging-industry',
    'Packaging': 'packaging-industry',
    
    // Agriculture
    'Agricultural Industry': 'agricultural-industry',
    'Agriculture': 'agricultural-industry',
    'Farming': 'agricultural-industry',
    
    // Other industries
    'Casting & Foundry': 'casting-foundry-industry',
    'Foundry': 'casting-foundry-industry',
    'Construction': 'construction-industry',
    'Garment': 'garment-industry',
    'Apparel': 'garment-industry',
    'Textile': 'garment-industry',
    'HRMS': 'HRMS',
    'Human Resource': 'HRMS',
    'Jewellery': 'jewellery-industry',
    'Jewelry': 'jewellery-industry',
    'Medical Equipment': 'medicalequipment-industry',
    'Medical': 'medicalequipment-industry',
    'Healthcare': 'medicalequipment-industry',
    'Paper': 'paper-industry',
    'POS': 'POS-industry',
    'Point of Sale': 'POS-industry',
    'Publishing': 'publishing-industry',
    'School': 'school-management',
    'Education': 'school-management',
    'Signage': 'signage-industry',
    'Steel Manufacturing': 'steel-industry',
    'Metal': 'steel-industry'
  };
  
  // Available brochures list
  const AVAILABLE_BROCHURES = [
    'retail-solutions',
    'packaging-industry',
    'agricultural-industry',
    'casting-foundry-industry',
    'construction-industry',
    'garment-industry',
    'HRMS',
    'jewellery-industry',
    'medicalequipment-industry',
    'paper-industry',
    'POS-industry',
    'publishing-industry',
    'school-management',
    'signage-industry',
    'steel-industry'
  ];
  
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
  
  export const getBrochureStatus = (title) => {
    console.log('Getting brochure status for:', title);
    
    // First, clean up the title
    const cleanTitle = title.replace(/\s*\(.*?\)\s*/g, '').trim();
    console.log('Cleaned title:', cleanTitle);
    
    // 1. Try exact match in brochureMap first
    if (brochureMap[cleanTitle]) {
      const filename = brochureMap[cleanTitle];
      console.log('Exact match found in brochureMap:', { title: cleanTitle, filename });
      return {
        available: true,
        message: null,
        fallbackBrochure: null,
        filename: filename
      };
    }
    
    // 2. Try to match by industry name in the title (case insensitive)
    const titleLower = cleanTitle.toLowerCase();
    
    // Special handling for Paper industry
    if (titleLower.includes('paper')) {
      console.log('Matched Paper industry');
      return {
        available: true,
        message: null,
        fallbackBrochure: null,
        filename: 'paper-industry'
      };
    }
    
    // Check for other industries
    for (const [brochureTitle, filename] of Object.entries(brochureMap)) {
      const brochureLower = brochureTitle.toLowerCase();
      
      // Check if the brochure title is contained within the page title
      if (titleLower.includes(brochureLower) || 
          brochureLower.includes(titleLower) ||
          titleLower.split(/\s+/).some(word => 
            word.length > 3 && brochureLower.split(/\s+/).some(bw => 
              bw.startsWith(word) || word.startsWith(bw)
            )
          )) {
        console.log('Matched industry:', { brochureTitle, filename });
        return {
          available: true,
          message: null,
          fallbackBrochure: null,
          filename: filename
        };
      }
    }
    
    // 3. Try the generated filename as a last resort
    const generatedFilename = getBrochureFilename(cleanTitle);
    if (AVAILABLE_BROCHURES.includes(generatedFilename)) {
      console.log('Using generated filename:', generatedFilename);
      return {
        available: true,
        message: null,
        fallbackBrochure: null,
        filename: generatedFilename
      };
    }
    
    // If we get here, no matching brochure was found
    console.log('No matching brochure found for:', cleanTitle);
    return {
      available: false,
      message: `The brochure for "${cleanTitle}" is coming soon.`,
      fallbackBrochure: null
    };
  };
  
  export const isBrochureAvailable = (title) => {
    const status = getBrochureStatus(title);
    return status.available;
  };
  
  export const downloadBrochureFile = async (industryTitle) => {
    const status = getBrochureStatus(industryTitle);
    const filename = status.available ? status.filename : 'retail-solutions';
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