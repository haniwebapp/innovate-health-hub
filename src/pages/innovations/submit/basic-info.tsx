
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

// Form schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(20, "Description must be at least 20 characters").max(300),
  category: z.string().min(1, "Please select a category"),
  tags: z.array(z.string()).optional(),
});

export default function BasicInfoPage() {
  const navigate = useNavigate();
  const { formData, updateFormData, updateProgress } = useSubmissionForm();
  const [tags, setTags] = useState<string[]>(formData.tags || []);
  const [tagInput, setTagInput] = useState('');
  
  // Categories for healthcare innovations
  const categories = [
    "Medical Devices",
    "Digital Health",
    "Pharmaceuticals",
    "Healthcare Services",
    "Diagnostic Tools",
    "Telehealth",
    "AI & Machine Learning",
    "Biotechnology",
    "Public Health",
    "Medical Education"
  ];
  
  // Initialize form with existing data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: formData.title || "",
      description: formData.description || "",
      category: formData.category || "",
      tags: formData.tags || [],
    }
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Update form data in context
    updateFormData({
      ...data,
      tags: tags
    });
    
    // Mark this step as completed
    updateProgress('basicInfo', true);
    
    // Save progress in local storage
    const currentProgress = JSON.parse(localStorage.getItem('innovationFormProgress') || '{}');
    localStorage.setItem('innovationFormProgress', JSON.stringify({
      ...currentProgress,
      basicInfo: true
    }));
    
    // Show success message
    toast({
      title: "Basic information saved",
      description: "Your innovation's basic information has been saved.",
    });
    
    // Navigate to next step
    navigate('/innovations/submit/details');
  };
  
  // Handle tag input
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput) && tags.length < 8) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleNext = (): boolean => {
    // Trigger form validation and submission
    form.handleSubmit(onSubmit)();
    return form.formState.isValid;
  };

  // Animation variants
  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <SubmissionLayout onNext={handleNext} nextButtonText="Continue to Details">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-moh-darkGreen mb-2 bg-gradient-to-r from-moh-darkGreen to-moh-green bg-clip-text text-transparent">
          Basic Information
        </h2>
        <p className="text-gray-600 mb-8">
          Provide essential information about your healthcare innovation.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <motion.div 
              variants={formItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-moh-darkGreen">Innovation Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter the title of your innovation" 
                        {...field}
                        className="border-moh-green/20 focus-visible:ring-moh-green/30 focus-visible:border-moh-green/50 transition-all" 
                      />
                    </FormControl>
                    <FormDescription>
                      A clear and concise title for your healthcare innovation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            
            <motion.div 
              variants={formItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-moh-darkGreen">Short Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Briefly describe your innovation (300 characters max)" 
                        {...field}
                        rows={4}
                        className="border-moh-green/20 focus-visible:ring-moh-green/30 focus-visible:border-moh-green/50 transition-all" 
                      />
                    </FormControl>
                    <FormDescription>
                      Write a short summary that clearly explains what your innovation does.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            
            <motion.div 
              variants={formItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-moh-darkGreen">Category</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-moh-green/20 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moh-green/30 focus-visible:border-moh-green/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all"
                        {...field}
                      >
                        <option value="" disabled>Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormDescription>
                      Select the category that best describes your innovation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            
            <motion.div 
              className="space-y-2"
              variants={formItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <FormLabel className="text-moh-darkGreen">Tags</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tags (e.g., preventive, chronic, pediatric)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border-moh-green/20 focus-visible:ring-moh-green/30 focus-visible:border-moh-green/50 transition-all flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleAddTag} 
                  className="bg-gradient-to-r from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green text-white flex items-center gap-1"
                >
                  <PlusCircle size={16} /> Add
                </Button>
              </div>
              <FormDescription>
                Add up to 8 tags to help categorize your innovation. Press Enter to add a tag.
              </FormDescription>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="py-1.5 px-3 flex items-center gap-1 bg-moh-lightGreen/20 hover:bg-moh-lightGreen/30 text-moh-darkGreen border border-moh-green/10"
                    >
                      {tag}
                      <X 
                        size={14} 
                        className="cursor-pointer hover:text-red-500 ml-1" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  </motion.div>
                ))}
                
                {tags.length === 0 && (
                  <p className="text-sm text-gray-400 italic">No tags added yet</p>
                )}
              </div>
            </motion.div>
            
            {/* Hidden submit button for form validation */}
            <button type="submit" className="hidden"></button>
          </form>
        </Form>
      </motion.div>
    </SubmissionLayout>
  );
}
