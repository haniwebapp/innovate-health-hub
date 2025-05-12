
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    const trackPageView = () => {
      // In a real application, you would implement actual analytics tracking here
      // For example, with Google Analytics, Mixpanel, or a custom solution
      console.log('Analytics: Page view', {
        path: location.pathname,
        title: document.title,
        timestamp: new Date().toISOString()
      });
    };

    trackPageView();
  }, [location]);

  return null; // This component doesn't render anything
};
