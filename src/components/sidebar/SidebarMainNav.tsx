
import { NavLink } from "react-router-dom";
import {
  Blocks,
  Home,
  Settings,
  Users,
  BookOpen,
  BadgeCheck,
  LucideIcon,
  MessageCircle,
  Lightbulb,
  BarChart,
  Flag,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarNavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

export default function SidebarMainNav() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const isAdmin = user?.userType === "admin";

  const mainNavItems = [
    {
      href: "/dashboard",
      label: t("nav.dashboard"),
      icon: Home,
    },
    {
      href: "/dashboard/innovations",
      label: t("nav.innovations"),
      icon: Lightbulb,
    },
    {
      href: "/dashboard/investment",
      label: t("nav.investment"),
      icon: BarChart,
    },
    {
      href: "/dashboard/regulatory",
      label: t("nav.regulatory"),
      icon: BadgeCheck,
    },
    {
      href: "/dashboard/knowledge",
      label: t("nav.knowledge"),
      icon: BookOpen,
    },
    {
      href: "/dashboard/strategy",
      label: t("nav.strategy"),
      icon: FileText,
    },
    {
      href: "/dashboard/collaboration",
      label: t("nav.collaboration"),
      icon: MessageCircle,
    },
    ...(isAdmin
      ? [
          {
            href: "/admin",
            label: t("nav.admin"),
            icon: Settings,
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col gap-1">
      {mainNavItems.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </div>
  );
}

function NavItem({ href, label, icon: Icon }: SidebarNavItemProps) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      asChild
    >
      <NavLink
        to={href}
        className={({ isActive }) =>
          isActive ? "bg-accent text-accent-foreground" : ""
        }
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </NavLink>
    </Button>
  );
}
