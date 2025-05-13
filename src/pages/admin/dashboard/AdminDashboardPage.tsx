
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard } from 'lucide-react';

const AdminDashboardPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col space-y-1.5">
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>Manage your healthcare innovation platform</CardDescription>
          </div>
          <LayoutDashboard className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p>Welcome to the admin dashboard. Use the navigation to manage platform settings and content.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
