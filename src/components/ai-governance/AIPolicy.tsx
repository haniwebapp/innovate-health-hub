
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, FileCheck, Download, ExternalLink } from "lucide-react";

export function AIPolicy() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">AI Ethics & Policy</h2>
          <p className="text-muted-foreground">Governance frameworks and ethical guidelines</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Documents
        </Button>
      </div>

      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertDescription>
          All AI systems are currently operating within the approved policy framework. Last reviewed: May 10, 2025.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>AI Governance Framework</CardTitle>
          <CardDescription>
            Comprehensive guidelines for responsible AI development and deployment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Key Principles</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Transparency in AI decision making processes</li>
              <li>Fairness across demographic groups and healthcare contexts</li>
              <li>Privacy protection and data minimization</li>
              <li>Human oversight of critical AI decisions</li>
              <li>Ongoing monitoring and evaluation of AI systems</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Governance Structure</h3>
            <p className="text-muted-foreground">
              Our AI governance is overseen by a cross-functional committee including clinical, 
              technical, legal, and ethics experts who review AI systems and policies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Ethics Committee</h4>
              <p className="text-sm text-muted-foreground">
                Reviews and approves AI systems for ethical considerations and alignment with values
              </p>
              <Badge className="mt-2">Active</Badge>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Technical Oversight</h4>
              <p className="text-sm text-muted-foreground">
                Evaluates technical implementation, bias detection, and monitoring systems
              </p>
              <Badge className="mt-2">Active</Badge>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Compliance Review</h4>
              <p className="text-sm text-muted-foreground">
                Ensures alignment with regulatory requirements and industry standards
              </p>
              <Badge className="mt-2">Active</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <FileCheck className="mr-2 h-4 w-4" />
            View Complete Framework
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Policy Documents</CardTitle>
            <CardDescription>
              Official guidelines and policies governing AI usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">AI Ethics Guidelines</TableCell>
                  <TableCell>May 1, 2025</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">Current</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Responsible AI Development</TableCell>
                  <TableCell>April 15, 2025</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">Current</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">AI Risk Management</TableCell>
                  <TableCell>March 22, 2025</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">Current</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Data Governance for AI</TableCell>
                  <TableCell>February 10, 2025</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Review Due</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">AI Incident Response</TableCell>
                  <TableCell>May 5, 2025</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">Current</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regulatory Compliance</CardTitle>
            <CardDescription>
              Alignment with healthcare AI regulations and standards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">GDPR Compliance</h4>
                <Badge className="bg-green-500">Compliant</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                All AI systems comply with GDPR requirements for data processing, consent, and data subject rights.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">FDA AI/ML Guidelines</h4>
                <Badge className="bg-green-500">Compliant</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Clinical AI systems follow FDA guidance for software as medical device (SaMD) and machine learning.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">EU AI Act</h4>
                <Badge variant="secondary">In Progress</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Implementation of requirements aligned with upcoming European Union AI Act regulations.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">ISO/IEC 42001</h4>
                <Badge className="bg-green-500">Certified</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Certified compliance with ISO standards for artificial intelligence management systems.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div>
        <h3 className="text-xl font-bold mb-4">Resources & Training</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">AI Ethics Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Comprehensive training program on ethical considerations in healthcare AI.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="px-0 h-auto">
                Access Training <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Policy Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Complete library of AI governance policies and procedures.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="px-0 h-auto">
                View Documents <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Governance Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Tools and templates for AI governance implementation.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="px-0 h-auto">
                Access Tools <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
