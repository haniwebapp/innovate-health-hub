import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";
import { AIService } from '@/services/ai/AIService';

interface AIMonitoringMetric {
  id: string;
  service: string;
  endpoint: string;
  requests: number;
  errorRate: number;
  latency: number;
  status: 'healthy' | 'warning' | 'critical';
  lastChecked: string;
}

export function AIMonitoring() {
  const [metrics, setMetrics] = useState<AIMonitoringMetric[]>([]);
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('day');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      setLoading(true);
      try {
        // This would normally call a real API
        // For now, we'll simulate with mock data
        const mockMetrics: AIMonitoringMetric[] = [
          {
            id: '1',
            service: 'ClinicalAI',
            endpoint: 'autoTagRecord',
            requests: 1243,
            errorRate: 0.8,
            latency: 245,
            status: 'healthy',
            lastChecked: new Date().toISOString()
          },
          {
            id: '2',
            service: 'InvestmentAI',
            endpoint: 'generateMatches',
            requests: 856,
            errorRate: 1.2,
            latency: 310,
            status: 'healthy',
            lastChecked: new Date().toISOString()
          },
          {
            id: '3',
            service: 'RegulatoryAI',
            endpoint: 'complianceCheck',
            requests: 532,
            errorRate: 3.7,
            latency: 420,
            status: 'warning',
            lastChecked: new Date().toISOString()
          },
          {
            id: '4',
            service: 'SupportAI',
            endpoint: 'ticketClassification',
            requests: 1876,
            errorRate: 0.5,
            latency: 120,
            status: 'healthy',
            lastChecked: new Date().toISOString()
          },
          {
            id: '5',
            service: 'PolicyAI',
            endpoint: 'impactSimulation',
            requests: 245,
            errorRate: 6.2,
            latency: 780,
            status: 'critical',
            lastChecked: new Date().toISOString()
          }
        ];
        
        setMetrics(mockMetrics);
      } catch (error) {
        console.error('Error fetching AI monitoring metrics:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
    
    // In a real app, this would check the health of all AI services
    AIService.checkAIServices()
      .then(() => console.log('AI services health check completed'))
      .catch(err => console.error('Error checking AI services:', err));
  }, [timeframe]);

  const getStatusBadge = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-500">Healthy</Badge>;
      case 'warning':
        return <Badge variant="destructive" className="bg-amber-500">Warning</Badge>;
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Calculate aggregate metrics
  const totalRequests = metrics.reduce((sum, metric) => sum + metric.requests, 0);
  const avgErrorRate = metrics.length > 0
    ? metrics.reduce((sum, metric) => sum + metric.errorRate, 0) / metrics.length
    : 0;
  const avgLatency = metrics.length > 0
    ? metrics.reduce((sum, metric) => sum + metric.latency, 0) / metrics.length
    : 0;
  
  const healthyServices = metrics.filter(m => m.status === 'healthy').length;
  const healthPercentage = metrics.length > 0 ? (healthyServices / metrics.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI Platform Health</h2>
          <p className="text-muted-foreground">Real-time monitoring of AI services</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeframe} onValueChange={(value: any) => setTimeframe(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setTimeframe(timeframe)}>Refresh</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all AI services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgErrorRate.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">
              {avgErrorRate < 1 ? 'Excellent' : avgErrorRate < 5 ? 'Acceptable' : 'Needs attention'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Latency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgLatency.toFixed(0)}ms</div>
            <p className="text-xs text-muted-foreground">
              {avgLatency < 200 ? 'Fast' : avgLatency < 500 ? 'Acceptable' : 'Slow'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {healthPercentage >= 80 ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500" />
              )}
              <span className="text-2xl font-bold">{healthPercentage.toFixed(0)}%</span>
            </div>
            <Progress 
              value={healthPercentage} 
              className="h-2 mt-2" 
              indicatorClassName={healthPercentage >= 80 ? "bg-green-500" : "bg-amber-500"}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Services Status</CardTitle>
          <CardDescription>
            Real-time monitoring of all AI services and endpoints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead className="text-right">Requests</TableHead>
                <TableHead className="text-right">Error Rate</TableHead>
                <TableHead className="text-right">Latency</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.map(metric => (
                <TableRow key={metric.id}>
                  <TableCell className="font-medium">{metric.service}</TableCell>
                  <TableCell>{metric.endpoint}</TableCell>
                  <TableCell className="text-right">{metric.requests}</TableCell>
                  <TableCell className="text-right">{metric.errorRate}%</TableCell>
                  <TableCell className="text-right">{metric.latency}ms</TableCell>
                  <TableCell>{getStatusBadge(metric.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Responsible AI Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ethics Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">95%</p>
                  <p className="text-xs text-muted-foreground">Across all AI models</p>
                </div>
                <Progress value={95} className="w-1/2 h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Bias Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Potential issues detected</p>
                </div>
                <Badge variant={3 > 5 ? "destructive" : "outline"}>Low Risk</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
