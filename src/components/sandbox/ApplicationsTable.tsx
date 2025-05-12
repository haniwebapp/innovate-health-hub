
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { StatusBadge } from './StatusBadge';
import { RiskLevelBadge } from './RiskLevelBadge';
import { SandboxApplication } from '@/types/sandboxTypes';

interface ApplicationsTableProps {
  applications: SandboxApplication[];
  onViewApplication: (id: string) => void;
}

export function ApplicationsTable({ applications, onViewApplication }: ApplicationsTableProps) {
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
