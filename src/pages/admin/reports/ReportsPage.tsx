
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col space-y-1.5">
            <CardTitle>Reports Dashboard</CardTitle>
            <CardDescription>View and generate reports for the healthcare innovation platform</CardDescription>
          </div>
          <BarChart3 className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p>Access and generate comprehensive reports about platform activities, user engagement, and innovation metrics.</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 border border-muted">
              <h3 className="font-medium mb-2">User Activity Reports</h3>
              <p className="text-sm text-muted-foreground">Detailed analytics on user engagement and activities</p>
            </Card>
            <Card className="p-4 border border-muted">
              <h3 className="font-medium mb-2">Innovation Performance</h3>
              <p className="text-sm text-muted-foreground">Metrics on innovation performance and impact</p>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
