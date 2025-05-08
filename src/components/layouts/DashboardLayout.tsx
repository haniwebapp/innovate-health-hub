
import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar isCollapsed={isCollapsed} onToggleCollapse={handleToggleCollapse} />
      <main
        className={`flex-1 transition-all duration-300 ease-in-out overflow-auto ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
