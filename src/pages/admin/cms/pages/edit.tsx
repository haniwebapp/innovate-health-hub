
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { PageEditor } from '@/components/cms/pages/PageEditor';

export default function EditPagePage() {
  return (
    <AdminLayout
      title="Edit Page"
      description="Edit website page content"
    >
      <PageEditor />
    </AdminLayout>
  );
}
