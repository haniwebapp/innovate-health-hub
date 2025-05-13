
import React from 'react';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, Users } from 'lucide-react';

export default function TeamManagementPage() {
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Team Management" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Team Management</h2>
          <p className="text-gray-500 mt-1">Manage your team members and their access permissions</p>
        </div>
      </div>
      
      <Card className="border-dashed border-2">
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-moh-lightGreen/20 p-3 rounded-full">
              <Clock className="h-6 w-6 text-moh-green" />
            </div>
            <div>
              <CardTitle className="text-xl">Coming in Phase 2</CardTitle>
              <CardDescription>Team management features will be available soon</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 border rounded-lg bg-slate-50/50">
            <h3 className="font-medium text-lg mb-3 flex items-center">
              <Users className="mr-2 h-5 w-5 text-moh-green" />
              Planned Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="bg-moh-green/20 text-moh-green p-1 rounded-full mr-3 mt-0.5">
                  <Clock className="h-3 w-3" />
                </span>
                Invite team members by email
              </li>
              <li className="flex items-start">
                <span className="bg-moh-green/20 text-moh-green p-1 rounded-full mr-3 mt-0.5">
                  <Clock className="h-3 w-3" />
                </span>
                Assign and manage member roles and permissions
              </li>
              <li className="flex items-start">
                <span className="bg-moh-green/20 text-moh-green p-1 rounded-full mr-3 mt-0.5">
                  <Clock className="h-3 w-3" />
                </span>
                Track activity and contributions by team members
              </li>
              <li className="flex items-start">
                <span className="bg-moh-green/20 text-moh-green p-1 rounded-full mr-3 mt-0.5">
                  <Clock className="h-3 w-3" />
                </span>
                Collaborate on innovations and challenges
              </li>
            </ul>
          </div>
          
          <div className="flex items-center justify-center p-4">
            <p className="text-sm text-muted-foreground text-center">
              We're working hard to bring you comprehensive team management tools.
              <br />Check back soon for updates on this feature.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
