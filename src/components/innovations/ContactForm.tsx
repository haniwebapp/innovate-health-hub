
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Phone, Mail, Globe, Building2, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useSubmissionForm } from '@/contexts/SubmissionFormContext';
import { motion } from 'framer-motion';

interface ContactFormData {
  organization: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  address: string;
}

interface ContactFormProps {
  onComplete: () => void;
}

export default function ContactForm({ onComplete }: ContactFormProps) {
  const { formData, updateFormData, updateProgress } = useSubmissionForm();
  
  const form = useForm<ContactFormData>({
    defaultValues: {
      organization: formData.organization || '',
      contactName: formData.contactName || '',
      contactEmail: formData.contactEmail || '',
      contactPhone: formData.contactPhone || '',
      website: formData.website || '',
      address: formData.address || '',
    }
  });

  const onSubmit = (data: ContactFormData) => {
    // Update form data in context
    updateFormData({
      organization: data.organization,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      website: data.website,
      address: data.address,
    });
    
    // Mark this step as completed
    updateProgress('contact', true);
    
    toast({
      title: "Contact information saved",
      description: "Your contact details have been saved successfully."
    });
    
    // Call the onComplete callback
    onComplete();
  };

  const inputVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            custom={0} 
            initial="initial" 
            animate="animate" 
            variants={inputVariants}
          >
            <FormField
              control={form.control}
              name="organization"
              rules={{ required: "Organization name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Building2 size={16} className="mr-2 text-moh-green" />
                    Organization
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your organization name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of your company or organization
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            custom={1} 
            initial="initial" 
            animate="animate" 
            variants={inputVariants}
          >
            <FormField
              control={form.control}
              name="contactName"
              rules={{ required: "Contact name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <User size={16} className="mr-2 text-moh-green" />
                    Contact Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact person's name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The primary contact person for this innovation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            custom={2} 
            initial="initial" 
            animate="animate" 
            variants={inputVariants}
          >
            <FormField
              control={form.control}
              name="contactEmail"
              rules={{ 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Mail size={16} className="mr-2 text-moh-green" />
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Business email address for communication
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            custom={3} 
            initial="initial" 
            animate="animate" 
            variants={inputVariants}
          >
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Phone size={16} className="mr-2 text-moh-green" />
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact phone number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional phone number for direct contact
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            custom={4} 
            initial="initial" 
            animate="animate" 
            variants={inputVariants}
          >
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Globe size={16} className="mr-2 text-moh-green" />
                    Website
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional website URL for your organization
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            custom={5} 
            initial="initial" 
            animate="animate" 
            variants={inputVariants}
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <MapPin size={16} className="mr-2 text-moh-green" />
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your organization's address" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional physical address of your organization
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-end"
        >
          <Button 
            type="submit" 
            className="bg-moh-green hover:bg-moh-darkGreen"
          >
            Save Contact Information
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
