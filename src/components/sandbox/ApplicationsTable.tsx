
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SandboxApplication } from "@/types/sandboxTypes";
import { formatDistanceToNow } from "date-fns";
import { StatusBadge } from "./StatusBadge";
import { RiskLevelBadge } from "./RiskLevelBadge";

interface ApplicationsTableProps {
  applications: SandboxApplication[];
  onViewApplication: (id: string) => void;
}

export function ApplicationsTable({ applications, onViewApplication }: ApplicationsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Innovator</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead>Submitted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No applications found
              </TableCell>
            </TableRow>
          ) : (
            applications.map((app) => (
              <TableRow 
                key={app.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onViewApplication(app.id)}
              >
                <TableCell className="font-medium">{app.name}</TableCell>
                <TableCell>{app.innovator}</TableCell>
                <TableCell>{app.innovationType}</TableCell>
                <TableCell>
                  <StatusBadge status={app.status} />
                </TableCell>
                <TableCell>
                  <RiskLevelBadge level={app.riskLevel} />
                </TableCell>
                <TableCell>{formatDistanceToNow(new Date(app.submittedAt), { addSuffix: true })}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
