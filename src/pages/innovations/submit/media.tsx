
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { useSubmissionForm } from '@/contexts/SubmissionFormContext';
import SubmissionLayout from '@/components/innovations/SubmissionLayout';
import { ImageUploader } from '@/components/innovations/media/ImageUploader';
import { DocumentUploader } from '@/components/innovations/media/DocumentUploader';
import { MediaLinksForm, mediaLinksSchema, MediaLinksFormValues } from '@/components/innovations/media/MediaLinksForm';

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
  const [mediaLinks, setMediaLinks] = useState<MediaLinksFormValues>({
    videoUrl: formData.videoUrl || "",
    website: formData.website || "",
  });
  
  const form = useForm<z.infer<typeof mediaLinksSchema>>({
    resolver: zodResolver(mediaLinksSchema),
    defaultValues: {
      videoUrl: formData.videoUrl || "",
      website: formData.website || "",
    },
  });
  
  const handleImagesChange = (_images: File[], previewUrls: string[]) => {
    setImages(_images);
    setImagePreviewUrls(previewUrls);
  };
  
  const handleDocumentsChange = (_documents: File[], _documentNames: string[]) => {
    setDocuments(_documents);
    setDocumentNames(_documentNames);
  };
  
  const handleMediaLinksChange = (values: MediaLinksFormValues) => {
    setMediaLinks(values);
  };
  
  const onSubmit = () => {
    // In a real application, you would upload the files to a server and get URLs
    // For now, we're just storing the preview URLs and document names
    updateFormData({
      ...mediaLinks,
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
    
    // Validate media links form
    const isValid = form.formState.isValid;
    
    if (isValid) {
      onSubmit();
    }
    
    return isValid;
  };

  return (
    <SubmissionLayout onNext={handleNext} nextButtonText="Continue to Technical Details">
      <div>
        <h2 className="text-2xl font-bold text-moh-darkGreen mb-2">Media & Files</h2>
        <p className="text-gray-600 mb-6">
          Upload images and supporting documents to showcase your innovation.
        </p>
        
        <div className="space-y-8">
          {/* Image Upload Section */}
          <ImageUploader
            initialImages={imagePreviewUrls}
            onImagesChange={handleImagesChange}
          />
          
          {/* Document Upload Section */}
          <DocumentUploader
            initialDocumentNames={documentNames}
            onDocumentsChange={handleDocumentsChange}
          />
          
          {/* Media Links Form */}
          <MediaLinksForm
            defaultValues={{
              videoUrl: formData.videoUrl || "",
              website: formData.website || "",
            }}
            onValuesChange={handleMediaLinksChange}
          />
          
          {/* Hidden submit button for form validation */}
          <button type="submit" className="hidden" />
        </div>
      </div>
    </SubmissionLayout>
  );
}
