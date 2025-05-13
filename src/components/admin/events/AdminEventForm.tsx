
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Form schema validation
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  eventType: z.string().min(1, { message: 'Event type is required' }),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().min(1, { message: 'End date is required' }),
  location: z.string().optional(),
  isVirtual: z.boolean().default(false),
  eventUrl: z.string().optional(),
  registrationUrl: z.string().optional(),
  presenter: z.string().optional(),
  presenterTitle: z.string().optional(),
  presenterOrganization: z.string().optional(),
  featured: z.boolean().default(false),
  category: z.string().min(1, { message: 'Category is required' }),
  maxAttendees: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AdminEventFormProps {
  onEventAdded: () => void;
}

export default function AdminEventForm({ onEventAdded }: AdminEventFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      eventType: '',
      startDate: '',
      endDate: '',
      location: '',
      isVirtual: false,
      eventUrl: '',
      registrationUrl: '',
      presenter: '',
      presenterTitle: '',
      presenterOrganization: '',
      featured: false,
      category: '',
      maxAttendees: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Format the data for the database - map camelCase to snake_case for Supabase
      const eventData = {
        title: data.title,
        description: data.description,
        event_type: data.eventType,
        start_date: new Date(data.startDate).toISOString(),
        end_date: new Date(data.endDate).toISOString(),
        location: data.location || null,
        is_virtual: data.isVirtual,
        event_url: data.eventUrl || null,
        registration_url: data.registrationUrl || null,
        presenter: data.presenter || null,
        presenter_title: data.presenterTitle || null,
        presenter_organization: data.presenterOrganization || null,
        featured: data.featured,
        category: data.category,
        max_attendees: data.maxAttendees ? parseInt(data.maxAttendees) : null,
        status: 'upcoming', // Default status
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Insert directly using Supabase client
      const { error } = await supabase
        .from('events')
        .insert(eventData);
      
      if (error) throw error;
      
      toast.success('Event created successfully!');
      form.reset();
      onEventAdded();
    } catch (error: any) {
      console.error('Error creating event:', error);
      toast.error(`Failed to create event: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="innovation">Innovation</SelectItem>
                          <SelectItem value="research">Research</SelectItem>
                          <SelectItem value="policy">Policy</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter event description" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="webinar">Webinar</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="panel">Panel</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxAttendees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Attendees (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter max attendees" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex items-end space-x-4">
                <FormField
                  control={form.control}
                  name="isVirtual"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0 mt-8">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0">Virtual Event</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="eventUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="registrationUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter registration URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="presenter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Presenter Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter presenter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="presenterTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Presenter Title (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter presenter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="presenterOrganization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter organization" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div>
                    <FormLabel className="mt-0">Featured Event</FormLabel>
                    <FormDescription>
                      Featured events will be highlighted on the events page
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="px-0 pt-6">
              <Button type="submit" disabled={isSubmitting} className="bg-moh-green hover:bg-moh-darkGreen">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Event'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
