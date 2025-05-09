
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus } from 'lucide-react';
import { UserProfile } from '@/types/admin';
import AdminUsersTable from '@/components/admin/AdminUsersTable';
import AdminUserStats from '@/components/admin/AdminUserStats';

// Mock user data for the admin user management page
const mockUsers: UserProfile[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    status: "active",
    lastSignIn: "2023-04-12",
    userType: "Innovator",
    organization: "Health Tech Solutions"
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    status: "active",
    lastSignIn: "2023-04-10",
    userType: "Investor",
    organization: "Medical Ventures Capital"
  },
  {
    id: "3",
    firstName: "Admin",
    lastName: "User",
    email: "admin@moh.gov.sa",
    status: "active",
    lastSignIn: "2023-04-15",
    userType: "Administrator",
    organization: "Ministry of Health"
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Brown",
    email: "sarah@example.com",
    status: "inactive",
    lastSignIn: "2023-03-20",
    userType: "Healthcare Provider",
    organization: "General Hospital"
  },
  {
    id: "5",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael@example.com",
    status: "active",
    lastSignIn: "2023-04-05",
    userType: "Innovator",
    organization: "MedTech Innovations"
  },
  {
    id: "6",
    firstName: "David",
    lastName: "Wilson",
    email: "david@example.com",
    status: "inactive",
    lastSignIn: "2023-03-15",
    userType: "Researcher",
    organization: "Health Research Institute"
  }
];

export default function AdminUserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Filter users based on search query and active tab
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.organization?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && user.status === 'active';
    if (activeTab === 'inactive') return matchesSearch && user.status === 'inactive';
    
    return false;
  });

  return (
    <AdminLayout
      title="User Management"
      description="View and manage platform users"
      actions={
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      }
    >
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search users..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <Card>
          <CardContent className="p-0">
            <AdminUsersTable users={filteredUsers} isLoading={isLoading} />
          </CardContent>
        </Card>
      </Tabs>
      
      <div className="mt-6">
        <AdminUserStats users={mockUsers} />
      </div>
    </AdminLayout>
  );
}
