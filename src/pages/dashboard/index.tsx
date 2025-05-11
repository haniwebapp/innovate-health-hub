
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardWelcome from '@/components/dashboard/DashboardWelcome';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import DashboardActivity from '@/components/dashboard/DashboardActivity';
import DashboardSuggestions from '@/components/dashboard/DashboardSuggestions';
import DashboardInnovations from '@/components/dashboard/DashboardInnovations';

export default function Dashboard() {
  // Mock user data for DashboardWelcome component
  const mockUser = {
    email: 'user@example.com',
    first_name: 'John',
    last_name: 'Doe',
    user_type: 'Innovator',
    organization: 'Healthcare Innovations Inc.',
    user_metadata: {
      firstName: 'John',
      lastName: 'Doe',
      userType: 'Innovator'
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Healthcare Innovation Platform</title>
      </Helmet>
      
      <div className="space-y-8">
        <DashboardWelcome user={mockUser} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardMetrics />
          <DashboardInnovations />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <DashboardActivity />
          </div>
          <div className="md:col-span-1">
            <DashboardSuggestions />
          </div>
        </div>
      </div>
    </>
  );
}
