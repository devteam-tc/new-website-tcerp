// Storage Keys
const STORAGE_KEYS = {
    USER_DATA: 'brochure_user_data',
    DOWNLOADED_BROCHURES: 'tcerp_downloaded_brochures',
    FIRST_SUBMISSION: 'brochure_first_submission_done'
  };
  
  // Storage Operations
  export const storageOperations = {
    getUserData: () => {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error('Error getting user data:', error);
        return null;
      }
    },
  
    saveUserData: (data) => {
      try {
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
      } catch (error) {
        console.error('Error saving user data:', error);
        throw error;
      }
    },
  
    getDownloadedBrochures: () => {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.DOWNLOADED_BROCHURES);
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error('Error reading downloaded brochures from localStorage:', error);
        return [];
      }
    },
  
    addDownloadedBrochure: (brochureTitle) => {
      try {
        const downloaded = storageOperations.getDownloadedBrochures();
        if (!downloaded.includes(brochureTitle)) {
          downloaded.push(brochureTitle);
          localStorage.setItem(STORAGE_KEYS.DOWNLOADED_BROCHURES, JSON.stringify(downloaded));
        }
      } catch (error) {
        console.error('Error saving downloaded brochure to localStorage:', error);
      }
    },
  
    markFirstSubmissionDone: () => {
      try {
        localStorage.setItem(STORAGE_KEYS.FIRST_SUBMISSION, 'true');
      } catch (error) {
        console.error('Error marking first submission:', error);
        throw error;
      }
    },
  
    hasSubmittedBefore: () => {
      try {
        return localStorage.getItem(STORAGE_KEYS.FIRST_SUBMISSION) === 'true';
      } catch (error) {
        console.error('Error checking submission status:', error);
        return false;
      }
    },
  
    clearUserData: () => {
      try {
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        localStorage.removeItem(STORAGE_KEYS.FIRST_SUBMISSION);
      } catch (error) {
        console.error('Error clearing user data:', error);
        throw error;
      }
    }
  }; 