
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart2, 
  Download, 
  FileText, 
  Calendar, 
  ChevronDown, 
  Filter, 
  Printer,
  Share2,
  ArrowDownToLine,
  AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("last-30");
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-moh-darkGreen">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and performance metrics for the healthcare innovation platform
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </Button>
          <Button className="bg-moh-green hover:bg-moh-darkGreen">
            <Share2 className="h-4 w-4 mr-2" />
            <span>Share</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Report Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7">Last 7 days</SelectItem>
                    <SelectItem value="last-30">Last 30 days</SelectItem>
                    <SelectItem value="last-90">Last 90 days</SelectItem>
                    <SelectItem value="year-to-date">Year to date</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="digital-health">Digital Health</SelectItem>
                    <SelectItem value="medtech">MedTech</SelectItem>
                    <SelectItem value="telehealth">Telehealth</SelectItem>
                    <SelectItem value="ai-health">AI Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Report Type</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="innovation">Innovation Reports</SelectItem>
                    <SelectItem value="user">User Activity Reports</SelectItem>
                    <SelectItem value="challenge">Challenge Reports</SelectItem>
                    <SelectItem value="regulatory">Regulatory Reports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full mt-2 bg-moh-green hover:bg-moh-darkGreen">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Saved Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-moh-green" />
                    <span className="text-sm">Q2 Innovation Summary</span>
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </li>
                <li className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-moh-green" />
                    <span className="text-sm">Monthly User Activity</span>
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </li>
                <li className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-moh-green" />
                    <span className="text-sm">Regulatory Compliance</span>
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-3 text-sm">
                View All Saved Reports
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-9 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle>Platform Performance</CardTitle>
                  <CardDescription>Last 30 days statistics</CardDescription>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <Badge variant="outline" className="bg-moh-lightGreen/50 text-moh-darkGreen">
                    <ArrowDownToLine className="h-3 w-3 mr-1" />
                    Export
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full flex items-center justify-center bg-muted/20 rounded-lg">
                <p className="text-muted-foreground">Performance chart visualization placeholder</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <Card className="bg-moh-lightGreen/10">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-2xl font-bold text-moh-darkGreen">1,247</span>
                      <span className="text-xs text-muted-foreground mt-1">Active Users</span>
                      <span className="text-xs text-green-600 mt-1">+12.5% ↑</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-moh-lightGreen/10">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-2xl font-bold text-moh-darkGreen">328</span>
                      <span className="text-xs text-muted-foreground mt-1">New Innovations</span>
                      <span className="text-xs text-green-600 mt-1">+8.2% ↑</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-moh-lightGreen/10">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-2xl font-bold text-moh-darkGreen">64</span>
                      <span className="text-xs text-muted-foreground mt-1">Active Challenges</span>
                      <span className="text-xs text-amber-600 mt-1">-2.3% ↓</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-moh-lightGreen/10">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-2xl font-bold text-moh-darkGreen">91%</span>
                      <span className="text-xs text-muted-foreground mt-1">User Satisfaction</span>
                      <span className="text-xs text-green-600 mt-1">+4.6% ↑</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="innovations">Innovations</TabsTrigger>
              <TabsTrigger value="users">User Activity</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BarChart2 className="h-5 w-5 mr-2 text-moh-green" />
                      Activity by Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 flex items-center justify-center bg-muted/20 rounded-lg">
                      <p className="text-muted-foreground">Category chart placeholder</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-moh-green" />
                      Daily Activity Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 flex items-center justify-center bg-muted/20 rounded-lg">
                      <p className="text-muted-foreground">Daily trends chart placeholder</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Reports</CardTitle>
                  <CardDescription>Reports generated in the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="pb-2 pr-4 font-medium text-sm">Report Name</th>
                          <th className="pb-2 px-4 font-medium text-sm">Type</th>
                          <th className="pb-2 px-4 font-medium text-sm">Generated</th>
                          <th className="pb-2 px-4 font-medium text-sm">Status</th>
                          <th className="pb-2 pl-4 font-medium text-sm text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 pr-4">Q2 Innovation Summary</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-moh-lightGreen/30 text-moh-darkGreen">
                              Innovation
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">May 12, 2025</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          </td>
                          <td className="py-3 pl-4 text-right">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 pr-4">User Activity Analysis</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">
                              Users
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">May 10, 2025</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          </td>
                          <td className="py-3 pl-4 text-right">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 pr-4">Regulatory Compliance Report</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-amber-100 text-amber-800">
                              Compliance
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">May 8, 2025</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          </td>
                          <td className="py-3 pl-4 text-right">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4">Challenge Performance Metrics</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-purple-100 text-purple-800">
                              Challenges
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">May 5, 2025</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-amber-100 text-amber-800 flex items-center w-fit">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Incomplete
                            </Badge>
                          </td>
                          <td className="py-3 pl-4 text-right">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">View All Reports</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="innovations" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Innovation Performance</CardTitle>
                  <CardDescription>Key metrics for innovation submissions and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-3/5">
                      <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
                        <p className="text-muted-foreground">Innovation metrics chart placeholder</p>
                      </div>
                    </div>
                    
                    <div className="md:w-2/5 space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Digital Health</span>
                          <span className="text-sm">42%</span>
                        </div>
                        <div className="w-full bg-moh-lightGreen/30 rounded-full h-2">
                          <div className="bg-moh-green h-2 rounded-full" style={{ width: "42%" }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">MedTech</span>
                          <span className="text-sm">28%</span>
                        </div>
                        <div className="w-full bg-blue-100 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Telehealth</span>
                          <span className="text-sm">18%</span>
                        </div>
                        <div className="w-full bg-amber-100 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "18%" }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">AI Health</span>
                          <span className="text-sm">12%</span>
                        </div>
                        <div className="w-full bg-purple-100 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                        </div>
                      </div>
                      
                      <Separator className="my-2" />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-moh-lightGreen/10 p-3 rounded-lg">
                          <div className="text-xl font-bold text-moh-darkGreen">328</div>
                          <div className="text-xs text-muted-foreground">New Innovations</div>
                        </div>
                        <div className="bg-moh-lightGreen/10 p-3 rounded-lg">
                          <div className="text-xl font-bold text-moh-darkGreen">84%</div>
                          <div className="text-xs text-muted-foreground">Approval Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Innovation Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Status distribution chart placeholder</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-moh-lightGreen/10 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-moh-darkGreen">185</div>
                      <div className="text-xs text-muted-foreground">New</div>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-amber-700">92</div>
                      <div className="text-xs text-muted-foreground">Validated</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-blue-700">42</div>
                      <div className="text-xs text-muted-foreground">Scaling</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-purple-700">9</div>
                      <div className="text-xs text-muted-foreground">Established</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-green-50 border-green-100">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-green-700">1,247</div>
                      <div className="text-sm text-muted-foreground mt-1">Monthly Active Users</div>
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-green-600">+12.5% ↑</span>
                        <span className="text-xs text-muted-foreground ml-2">vs last month</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-blue-50 border-blue-100">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-blue-700">248</div>
                      <div className="text-sm text-muted-foreground mt-1">New Registrations</div>
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-blue-600">+8.3% ↑</span>
                        <span className="text-xs text-muted-foreground ml-2">vs last month</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-amber-50 border-amber-100">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-amber-700">87%</div>
                      <div className="text-sm text-muted-foreground mt-1">Engagement Rate</div>
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-amber-600">-2.1% ↓</span>
                        <span className="text-xs text-muted-foreground ml-2">vs last month</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>User Activity Timeline</CardTitle>
                    <CardDescription>Daily active users over the past 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
                      <p className="text-muted-foreground">User activity timeline chart placeholder</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>User Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-1/2">
                        <div className="h-60 flex items-center justify-center bg-muted/20 rounded-lg">
                          <p className="text-muted-foreground">User type distribution chart placeholder</p>
                        </div>
                      </div>
                      <div className="lg:w-1/2">
                        <div className="h-60 flex items-center justify-center bg-muted/20 rounded-lg">
                          <p className="text-muted-foreground">Geographic distribution chart placeholder</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="compliance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Compliance Overview</CardTitle>
                    <CardDescription>Regulatory compliance status across the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 flex items-center justify-center bg-muted/20 rounded-lg">
                      <p className="text-muted-foreground">Compliance chart placeholder</p>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Fully Compliant</span>
                        </div>
                        <span className="font-medium">68%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                          <span className="text-sm">Partially Compliant</span>
                        </div>
                        <span className="font-medium">24%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-rose-500 mr-2"></div>
                          <span className="text-sm">Non-Compliant</span>
                        </div>
                        <span className="font-medium">8%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Compliance by Sector</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Digital Health</span>
                          <span className="text-sm text-green-600">92%</span>
                        </div>
                        <div className="w-full bg-green-100 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">High compliance with digital regulations</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Medical Devices</span>
                          <span className="text-sm text-amber-600">78%</span>
                        </div>
                        <div className="w-full bg-amber-100 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">Documentation issues for some device categories</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">AI-Based Solutions</span>
                          <span className="text-sm text-amber-600">64%</span>
                        </div>
                        <div className="w-full bg-amber-100 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "64%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">New AI regulations not fully implemented</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Therapeutics</span>
                          <span className="text-sm text-rose-600">56%</span>
                        </div>
                        <div className="w-full bg-rose-100 rounded-full h-2">
                          <div className="bg-rose-500 h-2 rounded-full" style={{ width: "56%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">Clinical validation data incomplete</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Compliance Alerts</CardTitle>
                  <CardDescription>Recent compliance issues requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg flex items-start">
                      <AlertTriangle className="text-rose-500 h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">AI Diagnostic Tool Compliance</h4>
                        <p className="text-sm text-muted-foreground">Missing required documentation for clinical validation. 12 innovations affected.</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="outline" className="bg-rose-50 text-rose-700">High Priority</Badge>
                          <span className="text-xs text-muted-foreground">Added May 10, 2025</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start">
                      <AlertTriangle className="text-amber-500 h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Medical Device Registration Updates</h4>
                        <p className="text-sm text-muted-foreground">New registration requirements for wearable devices. 8 innovations requiring updates.</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="outline" className="bg-amber-50 text-amber-700">Medium Priority</Badge>
                          <span className="text-xs text-muted-foreground">Added May 8, 2025</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start">
                      <AlertTriangle className="text-blue-500 h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Data Privacy Documentation</h4>
                        <p className="text-sm text-muted-foreground">Updated privacy requirements for telehealth applications. 15 innovations affected.</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">Standard Priority</Badge>
                          <span className="text-xs text-muted-foreground">Added May 5, 2025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
