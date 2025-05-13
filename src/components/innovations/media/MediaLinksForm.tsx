
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
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
import { Video } from "lucide-react";

// Form schema
export const mediaLinksSchema = z.object({
  videoUrl: z.string().url("Please enter a valid URL").or(z.string().length(0)).optional(),
  website: z.string().url("Please enter a valid URL").or(z.string().length(0)).optional(),
});

export type MediaLinksFormValues = z.infer<typeof mediaLinksSchema>;

interface MediaLinksFormProps {
  defaultValues: MediaLinksFormValues;
  onValuesChange: (values: MediaLinksFormValues) => void;
}

export function MediaLinksForm({ defaultValues, onValuesChange }: MediaLinksFormProps) {
  // Initialize form with existing data
  const form = useForm<MediaLinksFormValues>({
    resolver: zodResolver(mediaLinksSchema),
    defaultValues,
  });
  
  // Watch for changes and notify parent
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onValuesChange(value as MediaLinksFormValues);
    });
    return () => subscription.unsubscribe();
  }, [form, onValuesChange]);

  return (
    <Form {...form}>
      <form className="space-y-8">
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
      </form>
    </Form>
  );
}
