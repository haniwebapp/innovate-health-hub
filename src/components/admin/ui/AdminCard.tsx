
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AdminCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  children: ReactNode;
  action?: ReactNode;
}

export function AdminCard({
  title,
  description,
  icon,
  className,
  headerClassName,
  contentClassName,
  children,
  action
}: AdminCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className={cn("bg-slate-50 border-b flex-row justify-between items-start", headerClassName)}>
        <div className="flex items-center gap-2">
          {icon && <div className="text-moh-green">{icon}</div>}
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className={cn("p-5", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
