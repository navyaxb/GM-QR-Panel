import React, { useEffect } from 'react';

const ContactUs = () => {
  useEffect(() => {
    // Open the Contact Us page in a new tab
    window.open('https://www.gmmodular.com/contact-us', '_blank');
    
    // Optionally, redirect to /dashboard if needed
    window.location.href = '/dashboard';
  }, []);

  return (
    <div className="redirecting-message">
      You are being redirected to the Contact Us page...
    </div>
  );
};

export default ContactUs;
