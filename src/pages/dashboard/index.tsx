
import React from 'react';
import { Helmet } from 'react-helmet';
import DashboardWelcome from '@/components/dashboard/DashboardWelcome';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import DashboardActivity from '@/components/dashboard/DashboardActivity';
import DashboardSuggestions from '@/components/dashboard/DashboardSuggestions';
import DashboardInnovations from '@/components/dashboard/DashboardInnovations';

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Healthcare Innovation Platform</title>
      </Helmet>
      
      <div className="space-y-8">
        <DashboardWelcome />
        
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
