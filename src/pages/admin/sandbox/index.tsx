
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Tabs } from '@/components/ui/tabs';
import { DateRange } from 'react-day-picker';

import { ApplicationsTable } from '@/components/sandbox/ApplicationsTable';
import { SearchAndFilterSection } from '@/components/sandbox/SearchAndFilterSection';
import { DashboardSummaryCards } from '@/components/sandbox/DashboardSummaryCards';
import { SandboxTabs } from '@/components/sandbox/SandboxTabs';
import { mockApplications } from '@/components/sandbox/mockData';

export default function AdminSandboxPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentTab, setCurrentTab] = useState('all');
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  // Filter applications based on search, status, type, and date
  const filteredApplications = mockApplications.filter(app => {
    // Search filter
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      app.innovator.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    // Type filter
    const matchesType = typeFilter === 'all' || app.innovationType === typeFilter;
    
    // Tab filter
    const matchesTab = currentTab === 'all' || 
                      (currentTab === 'high-risk' && app.riskLevel === 'high') ||
                      (currentTab === 'pending' && app.status === 'pending');
    
    // Date filter
    const submittedDate = new Date(app.submittedAt);
    const matchesDate = 
      !date?.from || 
      !date?.to || 
      (submittedDate >= date.from && submittedDate <= date.to);
    
    return matchesSearch && matchesStatus && matchesType && matchesTab && matchesDate;
  });

  const viewApplication = (id: string) => {
    navigate(`/dashboard/admin/sandbox/${id}`);
  };

  const handleDownloadCSV = () => {
    // Implementation for downloading CSV would go here
    console.log('Downloading applications as CSV');
  };

  return (
    <AdminLayout
      title="Regulatory Sandbox Applications"
      description="Manage and review healthcare innovation sandbox applications"
    >
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
        <SandboxTabs 
          applications={mockApplications}
          filteredApplications={filteredApplications}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          onViewApplication={viewApplication}
          onDownloadCSV={handleDownloadCSV}
        />
        
        {/* Filter and search section */}
        <SearchAndFilterSection 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          date={date}
          setDate={setDate}
        />
        
        {/* Applications table */}
        <ApplicationsTable 
          applications={filteredApplications}
          onViewApplication={viewApplication}
        />
        
        {/* Dashboard summary cards */}
        <DashboardSummaryCards applications={mockApplications} />
      </Tabs>
    </AdminLayout>
  );
}
