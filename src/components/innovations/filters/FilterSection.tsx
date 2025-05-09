
import { useState } from "react";
import { Search, X, Filter, Clock, Scale, Tags, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FilterSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  regulatoryFilter: string;
  setRegulatoryFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (value: "grid" | "list") => void;
  showAIMatches: boolean;
  setShowAIMatches: (value: boolean) => void;
  tagFilter: string | null;
  setTagFilter: (value: string | null) => void;
  filteredCount: number;
  categories: string[];
  statuses: string[];
  resetFilters: () => void;
}

export default function FilterSection({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  regulatoryFilter,
  setRegulatoryFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  showAIMatches,
  setShowAIMatches,
  tagFilter,
  setTagFilter,
  filteredCount,
  categories,
  statuses,
  resetFilters,
}: FilterSectionProps) {
  return (
    <section className="py-8 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full md:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                placeholder="Search innovations..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[160px] bg-white">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category === "all" ? "All Categories" : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter by innovation category</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[160px] bg-white">
                        <SelectValue placeholder="Status" />
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
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter by implementation status</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Select value={regulatoryFilter} onValueChange={setRegulatoryFilter}>
                      <SelectTrigger className="w-[160px] bg-white">
                        <SelectValue placeholder="Regulatory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Compliance</SelectItem>
                        <SelectItem value="compliant">Compliant</SelectItem>
                        <SelectItem value="pending">Pending Approval</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter by regulatory compliance</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[160px] bg-white">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="highest_rated">Highest Rated</SelectItem>
                        <SelectItem value="ai_match">Best AI Match</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sort innovations by different criteria</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="flex rounded-md overflow-hidden border border-gray-200">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                className={`rounded-none ${viewMode === "grid" ? "bg-moh-green hover:bg-moh-darkGreen" : ""}`}
                onClick={() => setViewMode("grid")}
                size="icon"
              >
                <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                </div>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                className={`rounded-none ${viewMode === "list" ? "bg-moh-green hover:bg-moh-darkGreen" : ""}`}
                onClick={() => setViewMode("list")}
                size="icon"
              >
                <div className="flex flex-col gap-0.5 w-4 h-4">
                  <div className="h-1 w-full bg-current"></div>
                  <div className="h-1 w-full bg-current"></div>
                  <div className="h-1 w-full bg-current"></div>
                </div>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Active filters display */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredCount} innovation{filteredCount !== 1 ? 's' : ''}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="outline" className="bg-white flex gap-1 items-center">
                <Search size={12} />
                {searchTerm}
                <button 
                  className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                  onClick={() => setSearchTerm("")}
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
            
            {categoryFilter !== "all" && (
              <Badge variant="outline" className="bg-white flex gap-1 items-center">
                <Filter size={12} />
                {categoryFilter}
                <button 
                  className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                  onClick={() => setCategoryFilter("all")}
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
            
            {statusFilter !== "all" && (
              <Badge variant="outline" className="bg-white flex gap-1 items-center">
                <Clock size={12} />
                {statusFilter}
                <button 
                  className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                  onClick={() => setStatusFilter("all")}
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
            
            {regulatoryFilter !== "all" && (
              <Badge variant="outline" className="bg-white flex gap-1 items-center">
                <Scale size={12} />
                {regulatoryFilter === "compliant" ? "Compliant" : "Pending Approval"}
                <button 
                  className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                  onClick={() => setRegulatoryFilter("all")}
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
            
            {tagFilter && (
              <Badge variant="outline" className="bg-white flex gap-1 items-center">
                <Tags size={12} />
                {tagFilter}
                <button 
                  className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                  onClick={() => setTagFilter(null)}
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
            
            {showAIMatches && (
              <Badge variant="outline" className="bg-white flex gap-1 items-center">
                <Lightbulb size={12} className="text-yellow-500" />
                AI Matches
                <button 
                  className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                  onClick={() => setShowAIMatches(false)}
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
