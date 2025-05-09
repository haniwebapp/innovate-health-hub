
import { useState } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { SearchIcon, Plus, Filter } from "lucide-react";
import { Innovation } from "@/types/innovations";
import { mockInnovations } from "@/components/innovations/data/mockInnovations";

export default function DashboardInnovationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Filter innovations to show only user's own innovations
  // In a real app, this would filter based on the logged-in user
  const userInnovations = mockInnovations.slice(0, 3);
  
  // Apply filters
  const filteredInnovations = userInnovations.filter(innovation => {
    const matchesSearch = searchTerm === "" || 
      innovation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      innovation.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = filterCategory === "all" || innovation.category === filterCategory;
    const matchesStatus = filterStatus === "all" || innovation.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Extract unique categories and statuses for filters
  const categories = ["all", ...Array.from(new Set(userInnovations.map(i => i.category)))];
  const statuses = ["all", ...Array.from(new Set(userInnovations.map(i => i.status)))];
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="My Innovations" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Innovations</h1>
          <p className="text-muted-foreground">
            Manage and track your submitted innovations
          </p>
        </div>
        <Button asChild>
          <Link to="/innovations/submit">
            <Plus className="mr-2 h-4 w-4" /> Submit New Innovation
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search innovations..."
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" /> Category
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" /> Status
          </SelectTrigger>
          <SelectContent>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>
                {status === "all" ? "All Statuses" : status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {filteredInnovations.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-muted-foreground mb-4">No active innovations found.</p>
                <Button asChild>
                  <Link to="/innovations/submit">Submit New Innovation</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInnovations.map(innovation => (
                <InnovationCard key={innovation.id} innovation={innovation} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="draft" className="space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-muted-foreground mb-4">No draft innovations found.</p>
              <Button asChild>
                <Link to="/innovations/submit">Submit New Innovation</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="archived" className="space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-muted-foreground mb-4">No archived innovations found.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface InnovationCardProps {
  innovation: Innovation;
}

function InnovationCard({ innovation }: InnovationCardProps) {
  return (
    <Card>
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={innovation.imageUrl} 
          alt={innovation.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-1">{innovation.title}</CardTitle>
          <div className={`px-2 py-1 rounded text-xs font-medium ${innovation.status === "New" ? "bg-blue-100 text-blue-800" : innovation.status === "Validated" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"}`}>
            {innovation.status}
          </div>
        </div>
        <CardDescription className="line-clamp-2">{innovation.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm mb-4">
          <span className="text-muted-foreground">Views: {Math.floor(Math.random() * 100)}</span>
          <span className="text-muted-foreground">Rating: {innovation.rating}/5</span>
        </div>
        <Button asChild className="w-full">
          <Link to={`/dashboard/innovations/${innovation.id}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
