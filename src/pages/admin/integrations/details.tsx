
import React from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';

export default function AdminIntegrationDetails() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <AdminLayout
      title="Integration Details"
      description={`Details for integration ID: ${id}`}
    >
      <div className="space-y-6">
        <p>Integration details page will be implemented in a future update.</p>
      </div>
    </AdminLayout>
  );
}
