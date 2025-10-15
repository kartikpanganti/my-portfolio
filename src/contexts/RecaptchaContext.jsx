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
    if (!RECAPTCHA_SITE_KEY) return;

    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src^="https://www.google.com/recaptcha/enterprise.js"]`);
    if (existingScript) {
      setRecaptchaLoaded(true);
      // Hide badge initially
      setTimeout(() => toggleRecaptchaBadge(false), 100);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setRecaptchaLoaded(true);
      // Hide badge initially after script loads
      setTimeout(() => toggleRecaptchaBadge(false), 100);
    };
    document.head.appendChild(script);

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
      throw new Error('reCAPTCHA Enterprise not loaded. Please refresh the page.');
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, { action });
          resolve(token);
        } catch (error) {
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