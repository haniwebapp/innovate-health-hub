
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportsPage() {
  return (
    <AdminLayout
      title="Reports"
      description="View and export platform reports"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The reports section will be implemented in a future update. Check back soon!</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
