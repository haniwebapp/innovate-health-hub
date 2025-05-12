
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { SandboxApplication } from '@/types/sandboxTypes';

interface DashboardSummaryCardsProps {
  applications: SandboxApplication[];
}

export function DashboardSummaryCards({ applications }: DashboardSummaryCardsProps) {
  return (
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
            {applications.filter(app => app.status === 'pending').length}
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
            {applications.filter(app => app.status === 'approved').length}
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
            {applications.filter(app => {
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
  );
}
