
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { toast } from '@/hooks/use-toast';
import { FileText, X } from "lucide-react";

interface DocumentUploaderProps {
  initialDocumentNames?: string[];
  onDocumentsChange: (documents: File[], documentNames: string[]) => void;
}

export function DocumentUploader({ initialDocumentNames = [], onDocumentsChange }: DocumentUploaderProps) {
  const [documents, setDocuments] = useState<File[]>([]);
  const [documentNames, setDocumentNames] = useState<string[]>(initialDocumentNames);

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Limit to 3 documents
      if (documents.length + e.target.files.length > 3) {
        toast({
          title: "Maximum documents reached",
          description: "You can upload a maximum of 3 documents.",
          variant: "destructive"
        });
        return;
      }
      
      const newFiles = Array.from(e.target.files);
      const updatedDocuments = [...documents, ...newFiles];
      setDocuments(updatedDocuments);
      
      // Store document names
      const newDocumentNames = newFiles.map(file => file.name);
      const updatedDocumentNames = [...documentNames, ...newDocumentNames];
      setDocumentNames(updatedDocumentNames);
      
      // Notify parent component
      onDocumentsChange(updatedDocuments, updatedDocumentNames);
    }
  };
  
  const removeDocument = (index: number) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
    
    const newDocumentNames = [...documentNames];
    newDocumentNames.splice(index, 1);
    setDocumentNames(newDocumentNames);
    
    // Notify parent component
    onDocumentsChange(newDocuments, newDocumentNames);
  };

  return (
    <div className="space-y-3">
      <FormLabel>Supporting Documents</FormLabel>
      <div className="border-2 border-dashed rounded-lg border-gray-300 p-6 text-center">
        <label className="cursor-pointer">
          <Input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            multiple
            className="hidden"
            onChange={handleDocumentChange}
          />
          <div className="flex flex-col items-center">
            <FileText className="h-10 w-10 text-moh-green mb-2" />
            <span className="font-medium">Click to upload documents</span>
            <span className="text-sm text-gray-500">
              Upload up to 3 documents (PDF, DOC, PPT)
            </span>
          </div>
        </label>
      </div>
      
      {/* Document List */}
      {documentNames.length > 0 && (
        <div className="space-y-2 mt-4">
          {documentNames.map((name, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-moh-darkGreen mr-2" />
                <span className="truncate max-w-[250px]">{name}</span>
              </div>
              <button
                type="button"
                onClick={() => removeDocument(index)}
                className="text-red-500 hover:text-red-600"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
