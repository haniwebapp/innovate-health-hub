
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Dashboard as DashboardIcon } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <AdminLayout 
      title="Admin Dashboard" 
      description="Manage platform settings and users"
    >
      <div className="space-y-6">
        <p>Welcome to the admin dashboard. Select a section from the sidebar to manage different aspects of the platform.</p>
      </div>
    </AdminLayout>
  );
}
