import { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpDown, 
  Eye, 
  Calendar,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

// Mock data for sandbox applications
const mockApplications = [
  {
    id: '1',
    name: 'Telemedicine Remote Diagnosis Platform',
    innovator: 'MediTech Solutions',
    innovationType: 'Digital Health',
    submittedAt: '2023-12-15T10:30:00Z',
    status: 'approved',
    riskLevel: 'medium',
  },
  {
    id: '2',
    name: 'Wearable Blood Glucose Monitor',
    innovator: 'DiabCare Innovations',
    innovationType: 'Medical Device',
    submittedAt: '2023-11-28T14:20:00Z',
    status: 'pending',
    riskLevel: 'high',
  },
  {
    id: '3',
    name: 'AI-Powered Medical Image Analysis',
    innovator: 'ImageDiagnostics AI',
    innovationType: 'Software as Medical Device',
    submittedAt: '2024-01-05T09:15:00Z',
    status: 'pending',
    riskLevel: 'high',
  },
  {
    id: '4',
    name: 'Mobile Mental Health Therapy App',
    innovator: 'MindWell Health',
    innovationType: 'Mobile Health App',
    submittedAt: '2023-12-10T16:45:00Z',
    status: 'in-review',
    riskLevel: 'low',
  },
  {
    id: '5',
    name: 'Smart Medication Dispenser',
    innovator: 'MediTrack',
    innovationType: 'Medical Device',
    submittedAt: '2023-10-22T11:10:00Z',
    status: 'approved',
    riskLevel: 'medium',
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-review': 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const style = statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  
  return (
    <Badge className={style} variant="outline">
      {status === 'in-review' ? 'In Review' : status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

// Risk level badge component
const RiskLevelBadge = ({ level }: { level: string }) => {
  const riskStyles = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const style = riskStyles[level as keyof typeof riskStyles] || 'bg-gray-100 text-gray-800';
  
  return (
    <Badge className={style} variant="outline">
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </Badge>
  );
};

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
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="pending">
              Pending Review
              <Badge className="ml-2 bg-yellow-500" variant="secondary">
                {mockApplications.filter(app => app.status === 'pending').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="high-risk">
              High Risk
              <Badge className="ml-2 bg-red-500" variant="secondary">
                {mockApplications.filter(app => app.riskLevel === 'high').length}
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          <Button
            onClick={handleDownloadCSV}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export to CSV
          </Button>
        </div>
        
        {/* Filter and search section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search applications or innovators..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="min-w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={typeFilter}
                  onValueChange={setTypeFilter}
                >
                  <SelectTrigger className="min-w-[180px]">
                    <SelectValue placeholder="Innovation Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Medical Device">Medical Device</SelectItem>
                    <SelectItem value="Digital Health">Digital Health</SelectItem>
                    <SelectItem value="Mobile Health App">Mobile Health App</SelectItem>
                    <SelectItem value="Software as Medical Device">Software as Medical Device</SelectItem>
                  </SelectContent>
                </Select>
                
                <DateRangePicker
                  dateRange={date}
                  onDateRangeChange={setDate}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <TabsContent value="all" className="mt-0 space-y-4">
          <ApplicationsTable applications={filteredApplications} onViewApplication={viewApplication} />
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0 space-y-4">
          <ApplicationsTable applications={filteredApplications} onViewApplication={viewApplication} />
        </TabsContent>
        
        <TabsContent value="high-risk" className="mt-0 space-y-4">
          <ApplicationsTable applications={filteredApplications} onViewApplication={viewApplication} />
        </TabsContent>
      </Tabs>
      
      {/* Dashboard summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
              Pending Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">
              {mockApplications.filter(app => app.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Requiring initial review
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
              Approved Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">
              {mockApplications.filter(app => app.status === 'approved').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently active in sandbox
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 text-blue-500 mr-2" />
              Applications This Month
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">
              {mockApplications.filter(app => {
                const date = new Date(app.submittedAt);
                const now = new Date();
                return date.getMonth() === now.getMonth() && 
                       date.getFullYear() === now.getFullYear();
              }).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Since {format(new Date(), 'MMMM 1, yyyy')}
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

function ApplicationsTable({ 
  applications, 
  onViewApplication 
}: { 
  applications: typeof mockApplications,
  onViewApplication: (id: string) => void
}) {
  return (
    <Card>
      <CardHeader className="px-6 py-4">
        <CardTitle>Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Application Name</TableHead>
              <TableHead>Innovator</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length > 0 ? (
              applications.map(application => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.name}</TableCell>
                  <TableCell>{application.innovator}</TableCell>
                  <TableCell>{application.innovationType}</TableCell>
                  <TableCell>{format(new Date(application.submittedAt), 'MMM d, yyyy')}</TableCell>
                  <TableCell>
                    <StatusBadge status={application.status} />
                  </TableCell>
                  <TableCell>
                    <RiskLevelBadge level={application.riskLevel} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewApplication(application.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No applications match your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
