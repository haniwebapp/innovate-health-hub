
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import AdminUserStats from '@/components/admin/AdminUserStats';

// Mock user data for demo
const mockUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    status: "active" as "active" | "inactive",
    lastSignIn: "2023-04-12",
    userType: "Innovator"
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    status: "active" as "active" | "inactive",
    lastSignIn: "2023-04-10",
    userType: "Investor"
  },
  {
    id: "3",
    firstName: "Admin",
    lastName: "User",
    email: "admin@moh.gov.sa",
    status: "active" as "active" | "inactive",
    lastSignIn: "2023-04-15",
    userType: "Administrator"
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Brown",
    email: "sarah@example.com",
    status: "inactive" as "active" | "inactive",
    lastSignIn: "2023-03-20",
    userType: "Healthcare Provider"
  }
];

export default function AdminDashboardPage() {
  return (
    <div className="max-w-[1400px] mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your platform settings and users</p>
        </div>
        <Button asChild>
          <Link to="/admin/users">Manage Users</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Users</CardTitle>
            <CardDescription>Platform registration statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockUsers.length}</div>
            <div className="text-xs text-muted-foreground mt-1">
              +2 since last week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Challenges</CardTitle>
            <CardDescription>Open challenges on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <div className="text-xs text-muted-foreground mt-1">
              2 closing soon
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Innovation Submissions</CardTitle>
            <CardDescription>Recent innovation uploads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <div className="text-xs text-muted-foreground mt-1">
              3 pending review
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <AdminUserStats users={mockUsers} />
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage website content and pages</CardDescription>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                Content management tools will be implemented in Phase 3.
              </p>
              <Button asChild variant="outline">
                <Link to="/admin/cms">Go to CMS</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
              <CardDescription>View detailed platform metrics and reports</CardDescription>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                Advanced analytics will be implemented in Phase 3.
              </p>
              <Button asChild variant="outline">
                <Link to="/admin/reports">View Reports</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure platform settings and integrations</CardDescription>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                System settings will be implemented in Phase 3.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild variant="outline">
                  <Link to="/admin/settings">General Settings</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/admin/integrations">Integration Settings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
