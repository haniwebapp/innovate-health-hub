
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import SandboxApplicationDetail from '@/components/regulatory/sandbox/SandboxApplicationDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AdminSandboxDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  return (
    <AdminLayout
      title="Sandbox Application Details"
      description="View and manage sandbox application details"
    >
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/admin/sandbox')}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sandbox Dashboard
        </Button>
      </div>
      
      <SandboxApplicationDetail />
    </AdminLayout>
  );
}
