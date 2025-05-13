
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reports Dashboard</CardTitle>
          <CardDescription>View and generate system reports</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Reports functionality will be implemented in a future update.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
