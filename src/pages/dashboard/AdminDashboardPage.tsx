
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";
import { AdminStatCards } from "@/components/admin/dashboard/AdminStatCards";
import { AdminDashboardTabs } from "@/components/admin/dashboard/AdminDashboardTabs";
import { AccessDeniedSection } from "@/components/admin/dashboard/AccessDeniedSection";
import { UserProfile } from "@/types/admin";

// Demo data for the dashboard
const mockUsers: UserProfile[] = [
  {
    id: "1",
    email: "john@mohplatform.sa",
    firstName: "John",
    lastName: "Ahmed",
    userType: "Healthcare Provider",
    organization: "King Fahad Medical City",
    lastSignIn: "2025-05-09",
    status: "active"
  },
  {
    id: "2",
    email: "sarah@mohplatform.sa",
    firstName: "Sarah",
    lastName: "Al-Otaibi",
    userType: "Innovator",
    organization: "Saudi Health Council",
    lastSignIn: "2025-05-08",
    status: "active"
  },
  {
    id: "3",
    email: "admin@moh.gov.sa",
    firstName: "Mohammed",
    lastName: "Al-Faisal",
    userType: "Administrator",
    organization: "Ministry of Health",
    lastSignIn: "2025-05-10",
    status: "active"
  },
  {
    id: "4",
    email: "reem@healthcare.sa",
    firstName: "Reem",
    lastName: "Abdullah",
    userType: "Researcher",
    organization: "King Abdullah Medical Research Center",
    lastSignIn: "2025-05-01",
    status: "inactive"
  }
];

export default function AdminDashboardPage() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  if (!isAdmin) {
    return <AccessDeniedSection />;
  }

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6">
      <AdminDashboardHeader />
      <AdminStatCards userCount={mockUsers.length} />
      <AdminDashboardTabs users={mockUsers} />
    </div>
  );
}
