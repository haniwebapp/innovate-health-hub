
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { PageList } from '@/components/cms/pages/PageList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PagesListPage() {
  const navigate = useNavigate();
  
  return (
    <AdminLayout
      title="Website Pages"
      description="Manage website content pages"
      actions={
        <Button onClick={() => navigate('/dashboard/admin/cms/pages/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Page
        </Button>
      }
    >
      <PageList />
    </AdminLayout>
  );
}
