import React, { useEffect } from 'react';

const AboutUs = () => {
  useEffect(() => {
    // Open the About Us page in a new tab
    window.open('https://www.gmmodular.com/about-us', '_blank');
    
    // Redirect to /dashboard
    window.location.href = '/dashboard';
  }, []);

  return (
    <div className="redirecting-message">
      You are being redirected to the About Us page...
    </div>
  );
};

export default AboutUs;
