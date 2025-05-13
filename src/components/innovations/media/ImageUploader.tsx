
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { toast } from '@/hooks/use-toast';
import { Upload, X, Image } from "lucide-react";

interface ImageUploaderProps {
  initialImages?: string[];
  onImagesChange: (images: File[], previewUrls: string[]) => void;
}

export function ImageUploader({ initialImages = [], onImagesChange }: ImageUploaderProps) {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>(initialImages);

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
      const updatedImages = [...images, ...newFiles];
      setImages(updatedImages);
      
      // Create preview URLs
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
      const updatedPreviewUrls = [...imagePreviewUrls, ...newPreviewUrls];
      setImagePreviewUrls(updatedPreviewUrls);
      
      // Notify parent component
      onImagesChange(updatedImages, updatedPreviewUrls);
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
    
    // Notify parent component
    onImagesChange(newImages, newPreviewUrls);
  };

  return (
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
  );
}
