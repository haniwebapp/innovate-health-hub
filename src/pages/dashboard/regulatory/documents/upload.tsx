
import { useState } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Upload, X, File, Loader2 } from "lucide-react";

type UploadedFile = {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
};

export default function DocumentUploadPage() {
  const [documentType, setDocumentType] = useState("");
  const [isConfidential, setIsConfidential] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;
    
    const newFiles: UploadedFile[] = Array.from(e.target.files).map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      progress: 0
    }));
    
    setUploadedFiles([...uploadedFiles, ...newFiles]);
    
    // Simulate upload progress
    setIsUploading(true);
    simulateFileUpload(newFiles);
  };
  
  const simulateFileUpload = (files: UploadedFile[]) => {
    const interval = setInterval(() => {
      setUploadedFiles(prevFiles => {
        const allComplete = prevFiles.every(file => file.progress === 100);
        
        if (allComplete) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload complete",
            description: "All documents have been uploaded successfully",
          });
          return prevFiles;
        }
        
        return prevFiles.map(file => {
          if (files.find(f => f.id === file.id) && file.progress < 100) {
            return {
              ...file,
              progress: file.progress + 10
            };
          }
          return file;
        });
      });
    }, 300);
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  const removeFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!documentType) {
      toast({
        title: "Required field missing",
        description: "Please select a document type",
        variant: "destructive"
      });
      return;
    }
    
    if (!uploadedFiles.length) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload",
        variant: "destructive"
      });
      return;
    }
    
    // Check if all files are completely uploaded
    if (uploadedFiles.some(file => file.progress < 100)) {
      toast({
        title: "Upload in progress",
        description: "Please wait for all files to finish uploading",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Documents submitted",
      description: "Your documents have been submitted successfully",
    });
  };
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Upload Documents" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Regulatory Sandbox", href: "/dashboard/regulatory" },
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Document Upload</h1>
        <p className="text-muted-foreground">
          Upload regulatory and compliance documents
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Add required documentation for your regulatory sandbox application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Select 
                value={documentType} 
                onValueChange={setDocumentType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="privacy">Data Privacy Assessment</SelectItem>
                  <SelectItem value="security">Security Testing Report</SelectItem>
                  <SelectItem value="clinical">Clinical Validation Documentation</SelectItem>
                  <SelectItem value="user">User Experience Analysis</SelectItem>
                  <SelectItem value="technical">Technical Specifications</SelectItem>
                  <SelectItem value="risk">Risk Assessment</SelectItem>
                  <SelectItem value="other">Other Documentation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="confidential" 
                checked={isConfidential} 
                onCheckedChange={setIsConfidential} 
              />
              <Label htmlFor="confidential">This document contains confidential information</Label>
            </div>
            
            <div className="space-y-2">
              <Label>Upload Files</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOC, XLS, JPG, PNG (max 10MB per file)
                </p>
                <Input 
                  type="file" 
                  className="hidden" 
                  id="file-upload" 
                  multiple
                  onChange={handleFileSelection}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  className="mt-4"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Select Files
                </Button>
              </div>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Files</Label>
                <div className="space-y-2">
                  {uploadedFiles.map(file => (
                    <div 
                      key={file.id}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div className="flex items-center space-x-3">
                        <File className="h-6 w-6 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {file.progress < 100 ? (
                          <div className="flex items-center">
                            <Loader2 className="animate-spin h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{file.progress}%</span>
                          </div>
                        ) : (
                          <span className="text-xs text-green-500">Uploaded</span>
                        )}
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isUploading || !uploadedFiles.length}
              >
                Submit Documents
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
