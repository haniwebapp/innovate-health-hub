
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to the Innovation Hub Dashboard
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Dashboard cards would go here */}
      </div>
    </div>
  );
}
