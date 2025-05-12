
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { PageEditor } from '@/components/cms/pages/PageEditor';

export default function NewPagePage() {
  return (
    <AdminLayout
      title="Create New Page"
      description="Create a new website page"
    >
      <PageEditor />
    </AdminLayout>
  );
}
