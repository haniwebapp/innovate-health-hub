
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ApplicationsTable } from './ApplicationsTable';
import { SandboxApplication } from '@/types/sandboxTypes';

interface SandboxTabsProps {
  applications: SandboxApplication[];
  filteredApplications: SandboxApplication[];
  currentTab: string;
  onTabChange: (tab: string) => void;
  onViewApplication: (id: string) => void;
  onDownloadCSV: () => void;
}

export function SandboxTabs({
  applications,
  filteredApplications,
  currentTab,
  onTabChange,
  onViewApplication,
  onDownloadCSV
}: SandboxTabsProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="all" onClick={() => onTabChange('all')}>All Applications</TabsTrigger>
          <TabsTrigger value="pending" onClick={() => onTabChange('pending')}>
            Pending Review
            <Badge className="ml-2 bg-yellow-500" variant="secondary">
              {applications.filter(app => app.status === 'pending').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="high-risk" onClick={() => onTabChange('high-risk')}>
            High Risk
            <Badge className="ml-2 bg-red-500" variant="secondary">
              {applications.filter(app => app.riskLevel === 'high').length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        
        <Button
          onClick={onDownloadCSV}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          Export to CSV
        </Button>
      </div>
      
      <TabsContent value="all" className="mt-0 space-y-4">
        <ApplicationsTable applications={filteredApplications} onViewApplication={onViewApplication} />
      </TabsContent>
      
      <TabsContent value="pending" className="mt-0 space-y-4">
        <ApplicationsTable applications={filteredApplications} onViewApplication={onViewApplication} />
      </TabsContent>
      
      <TabsContent value="high-risk" className="mt-0 space-y-4">
        <ApplicationsTable applications={filteredApplications} onViewApplication={onViewApplication} />
      </TabsContent>
    </>
  );
}
