
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { useSubmissionForm } from '@/contexts/SubmissionFormContext';
import SubmissionLayout from '@/components/innovations/SubmissionLayout';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, Image, Video } from "lucide-react";

// Form schema
const formSchema = z.object({
  videoUrl: z.string().url("Please enter a valid URL").or(z.string().length(0)).optional(),
  website: z.string().url("Please enter a valid URL").or(z.string().length(0)).optional(),
});

export default function MediaPage() {
  const navigate = useNavigate();
  const { formData, updateFormData, updateProgress } = useSubmissionForm();
  const [images, setImages] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>(
    formData.imageUrls ? formData.imageUrls : []
  );
  const [documentNames, setDocumentNames] = useState<string[]>(
    formData.documentNames ? formData.documentNames : []
  );
  
  // Initialize form with existing data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: formData.videoUrl || "",
      website: formData.website || "",
    },
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Limit to 5 images
      if (images.length + e.target.files.length > 5) {
        toast({
          title: "Maximum images reached",
          description: "You can upload a maximum of 5 images.",
          variant: "destructive"
        });
        return;
      }
      
      const newFiles = Array.from(e.target.files);
      setImages([...images, ...newFiles]);
      
      // Create preview URLs
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
    }
  };
  
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
      setDocuments([...documents, ...newFiles]);
      
      // Store document names
      const newDocumentNames = newFiles.map(file => file.name);
      setDocumentNames([...documentNames, ...newDocumentNames]);
    }
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    const newPreviewUrls = [...imagePreviewUrls];
    URL.revokeObjectURL(newPreviewUrls[index]); // Clean up the URL object
    newPreviewUrls.splice(index, 1);
    setImagePreviewUrls(newPreviewUrls);
  };
  
  const removeDocument = (index: number) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
    
    const newDocumentNames = [...documentNames];
    newDocumentNames.splice(index, 1);
    setDocumentNames(newDocumentNames);
  };
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // In a real application, you would upload the files to a server and get URLs
    // For now, we're just storing the file objects
    updateFormData({
      ...data,
      images,
      documentFiles: documents,
      imageUrls: imagePreviewUrls,
      documentNames
    });
    
    // Mark this step as completed
    updateProgress('media', true);
    
    // Save progress in local storage
    const currentProgress = JSON.parse(localStorage.getItem('innovationFormProgress') || '{}');
    localStorage.setItem('innovationFormProgress', JSON.stringify({
      ...currentProgress,
      media: true
    }));
    
    // Show success message
    toast({
      title: "Media saved",
      description: "Your innovation's media files have been saved.",
    });
    
    // Navigate to next step
    navigate('/innovations/submit/technical');
  };
  
  const handleNext = (): boolean => {
    // Make sure at least one image is uploaded
    if (images.length === 0 && imagePreviewUrls.length === 0) {
      toast({
        title: "Image required",
        description: "Please upload at least one image of your innovation.",
        variant: "destructive"
      });
      return false;
    }
    
    // Trigger form validation and submission
    form.handleSubmit(onSubmit)();
    return form.formState.isValid;
  };

  return (
    <SubmissionLayout onNext={handleNext} nextButtonText="Continue to Technical Details">
      <div>
        <h2 className="text-2xl font-bold text-moh-darkGreen mb-2">Media & Files</h2>
        <p className="text-gray-600 mb-6">
          Upload images and supporting documents to showcase your innovation.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Image Upload */}
            <div className="space-y-3">
              <FormLabel>Innovation Images</FormLabel>
              <div className="border-2 border-dashed rounded-lg border-gray-300 p-6 text-center">
                <label className="cursor-pointer">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-moh-green mb-2" />
                    <span className="font-medium">Click to upload images</span>
                    <span className="text-sm text-gray-500">
                      Upload up to 5 images (PNG, JPG, WEBP)
                    </span>
                  </div>
                </label>
              </div>
              
              {/* Image Previews */}
              {imagePreviewUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden h-40">
                      <img 
                        src={url} 
                        alt={`Innovation preview ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Document Upload */}
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
            
            {/* Video URL */}
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Video className="h-5 w-5 text-muted-foreground" />
                      <Input 
                        placeholder="https://www.youtube.com/example" 
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Provide a link to a video demonstrating your innovation (YouTube, Vimeo, etc.)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Website URL */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://yourinnovation.com" 
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    If available, provide a link to your innovation's website
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Hidden submit button for form validation */}
            <button type="submit" className="hidden"></button>
          </form>
        </Form>
      </div>
    </SubmissionLayout>
  );
}
