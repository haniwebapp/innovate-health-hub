
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BarChart2, 
  Plug, 
  FileText,
  BrainCircuit
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function SidebarAdminNav({ className }: { className?: string }) {
  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      <NavLink
        to="/dashboard/admin"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
            isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          )
        }
      >
        <LayoutDashboard className="h-4 w-4" />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/dashboard/admin/analytics"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
            isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          )
        }
      >
        <BarChart2 className="h-4 w-4" />
        <span>Analytics</span>
      </NavLink>

      <NavLink
        to="/dashboard/admin/users"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
            isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          )
        }
      >
        <Users className="h-4 w-4" />
        <span>Users</span>
      </NavLink>

      <NavLink
        to="/dashboard/admin/settings"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
            isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          )
        }
      >
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </NavLink>

      <NavLink
        to="/dashboard/admin/integrations"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
            isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          )
        }
      >
        <Plug className="h-4 w-4" />
        <span>Integrations</span>
      </NavLink>

      <NavLink
        to="/dashboard/admin/logs"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
            isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          )
        }
      >
        <FileText className="h-4 w-4" />
        <span>Logs</span>
      </NavLink>
      
      <NavLink
        to="/dashboard/admin/ai-governance"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
            isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          )
        }
      >
        <BrainCircuit className="h-4 w-4" />
        <span>AI Governance</span>
      </NavLink>
    </nav>
  );
}
