
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { OverviewTab } from "./tabs/OverviewTab";
import { UsersTab } from "./tabs/UsersTab";
import { ContentTab } from "./tabs/ContentTab";
import { AnalyticsTab } from "./tabs/AnalyticsTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { IntegrationsTab } from "./tabs/IntegrationsTab";
import { UserProfile } from "@/types/admin";

interface AdminDashboardTabsProps {
  users: UserProfile[];
}

export function AdminDashboardTabs({ users }: AdminDashboardTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <Tabs 
      defaultValue={activeTab} 
      onValueChange={setActiveTab}
      className="space-y-6"
    >
      <TabsList className="bg-muted/30 p-1 overflow-x-auto flex flex-nowrap whitespace-nowrap max-w-full">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>

      {/* Overview Tab Content */}
      <TabsContent value="overview">
        <OverviewTab />
      </TabsContent>

      {/* Users Tab Content */}
      <TabsContent value="users">
        <UsersTab users={users} />
      </TabsContent>

      {/* Content Tab */}
      <TabsContent value="content">
        <ContentTab />
      </TabsContent>

      {/* Analytics Tab */}
      <TabsContent value="analytics">
        <AnalyticsTab />
      </TabsContent>

      {/* Settings Tab */}
      <TabsContent value="settings">
        <SettingsTab />
      </TabsContent>

      {/* Integrations Tab */}
      <TabsContent value="integrations">
        <IntegrationsTab />
      </TabsContent>
    </Tabs>
  );
}
