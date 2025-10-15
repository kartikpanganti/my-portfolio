import React, { createContext, useContext, useState, useEffect } from 'react';

const RecaptchaContext = createContext();

export const useRecaptcha = () => {
  const context = useContext(RecaptchaContext);
  if (!context) {
    throw new Error('useRecaptcha must be used within a RecaptchaProvider');
  }
  return context;
};

export const RecaptchaProvider = ({ children }) => {
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [showRecaptchaBadge, setShowRecaptchaBadge] = useState(false);
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  // Debug logging for environment variables (only in actual development)
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('reCAPTCHA Environment Check:', {
        RECAPTCHA_SITE_KEY: RECAPTCHA_SITE_KEY ? `${RECAPTCHA_SITE_KEY.substring(0, 10)}...` : 'MISSING',
        hasKey: !!RECAPTCHA_SITE_KEY,
        env: import.meta.env.MODE,
        allViteEnvs: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
      });
    }
  }, [RECAPTCHA_SITE_KEY]);

  // Function to hide/show reCAPTCHA badge
  const toggleRecaptchaBadge = (show) => {
    const badge = document.querySelector('.grecaptcha-badge');
    if (badge) {
      badge.style.visibility = show ? 'visible' : 'hidden';
      badge.style.opacity = show ? '1' : '0';
      badge.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    }
    setShowRecaptchaBadge(show);
  };

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      if (import.meta.env.DEV) {
        console.warn('reCAPTCHA: Site key not found. reCAPTCHA will not be loaded.');
      }
      return;
    }

    // Force production mode check for Netlify
    const isProduction = import.meta.env.PROD || window.location.hostname.includes('netlify.app') || window.location.hostname.includes('vercel.app');
    
    if (!isProduction) {
      console.log('reCAPTCHA: Loading script...');
    }

    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src^="https://www.google.com/recaptcha/enterprise.js"]`);
    if (existingScript) {
      if (!isProduction) {
        console.log('reCAPTCHA: Script already exists, setting loaded state');
      }
      setRecaptchaLoaded(true);
      // Hide badge initially
      setTimeout(() => toggleRecaptchaBadge(false), 100);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      if (!isProduction) {
        console.log('reCAPTCHA: Script loaded successfully');
      }
      setRecaptchaLoaded(true);
      // Hide badge initially after script loads
      setTimeout(() => toggleRecaptchaBadge(false), 100);
    };
    script.onerror = (error) => {
      console.error('reCAPTCHA: Failed to load script', error);
      console.error('reCAPTCHA: Check if domain is added to reCAPTCHA console');
    };
    document.head.appendChild(script);

    if (!isProduction) {
      console.log('reCAPTCHA: Script element added to document head');
    }

    return () => {
      // Clean up script and badges on unmount
      const scripts = document.querySelectorAll(`script[src^="https://www.google.com/recaptcha"]`);
      scripts.forEach(script => script.remove());
      const badges = document.querySelectorAll('.grecaptcha-badge');
      badges.forEach(badge => badge.remove());
    };
  }, [RECAPTCHA_SITE_KEY]);

  const executeRecaptcha = async (action = 'submit') => {
    if (!recaptchaLoaded || !window.grecaptcha || !window.grecaptcha.enterprise) {
      // Check if we're on Netlify and reCAPTCHA failed to load
      const isNetlify = window.location.hostname.includes('netlify.app');
      const errorMessage = isNetlify 
        ? 'reCAPTCHA service temporarily unavailable. Please try again in a moment.'
        : 'reCAPTCHA Enterprise not loaded. Please refresh the page.';
      
      throw new Error(errorMessage);
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, { action });
          resolve(token);
        } catch (error) {
          console.error('reCAPTCHA execution failed:', error);
          reject(error);
        }
      });
    });
  };

  const value = {
    recaptchaLoaded,
    RECAPTCHA_SITE_KEY,
    executeRecaptcha,
    showRecaptchaBadge,
    toggleRecaptchaBadge
  };

  return (
    <RecaptchaContext.Provider value={value}>
      {children}
    </RecaptchaContext.Provider>
  );
};