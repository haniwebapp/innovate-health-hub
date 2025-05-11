
import { useState } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, UserPlus, UserX, UsersRound, Building, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function ConnectionsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const connections = [
    {
      id: "1",
      name: "Dr. Sarah Ahmed",
      role: "Healthcare Researcher",
      organization: "King Faisal Hospital",
      avatar: "",
      category: "Healthcare Professional",
      status: "connected"
    },
    {
      id: "2",
      name: "Mohammed Khalid",
      role: "Health Tech Investor",
      organization: "Saudi Venture Capital",
      avatar: "",
      category: "Investor",
      status: "connected"
    },
    {
      id: "3",
      name: "Fatima Al-Ghamdi",
      role: "Medical Device Specialist",
      organization: "MedTech Arabia",
      avatar: "",
      category: "Industry",
      status: "connected"
    },
    {
      id: "4",
      name: "Abdullah Al-Otaibi",
      role: "Policy Advisor",
      organization: "Ministry of Health",
      avatar: "",
      category: "Government",
      status: "connected"
    },
    {
      id: "5",
      name: "Noura Al-Saud",
      role: "Healthcare Startup Founder",
      organization: "HealthTech Solutions",
      avatar: "",
      category: "Entrepreneur",
      status: "pending"
    },
    {
      id: "6",
      name: "Hassan Ibrahim",
      role: "AI Healthcare Researcher",
      organization: "KAUST",
      avatar: "",
      category: "Academic",
      status: "pending"
    }
  ];
  
  // Filter connections based on search query and active tab
  const filteredConnections = connections.filter(connection => {
    // Filter by search query
    const matchesSearch = connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          connection.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          connection.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by active tab
    const matchesTab = activeTab === "all" || 
                      (activeTab === "pending" && connection.status === "pending") ||
                      (activeTab === "connected" && connection.status === "connected");
    
    return matchesSearch && matchesTab;
  });
  
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BreadcrumbNav 
          currentPage="Connections" 
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Collaboration", href: "/dashboard/collaboration" },
          ]}
        />
        
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Find Connections
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Professional Network</CardTitle>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="connected">Connected</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative w-full md:w-64">
              <Input
                placeholder="Search connections..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConnections.map((connection) => (
              <div key={connection.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    {connection.avatar ? (
                      <AvatarImage src={connection.avatar} alt={connection.name} />
                    ) : (
                      <AvatarFallback>{getInitials(connection.name)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{connection.name}</h3>
                    <p className="text-sm text-muted-foreground">{connection.role}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Building className="h-3 w-3" />
                      <span>{connection.organization}</span>
                    </div>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {connection.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-2 border-t">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/dashboard/collaboration/messages?user=${connection.id}`}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Link>
                  </Button>
                  
                  {connection.status === "pending" ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <UserPlus className="h-3 w-3 mr-1" />
                        Accept
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8">
                        <UserX className="h-3 w-3 mr-1" />
                        Decline
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-1" />
                      Profile
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {filteredConnections.length === 0 && (
            <div className="text-center py-8">
              <UsersRound className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-30" />
              <h3 className="font-medium text-lg mb-1">No connections found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? "Try adjusting your search terms"
                  : "Start building your professional network"}
              </p>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Find Healthcare Professionals
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
