
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { User, Mail, Building, CheckCircle, Upload, AlertTriangle, RefreshCw } from "lucide-react";
import { ProfileData } from "@/types/admin";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  userType: z.string(),
  organization: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function UserProfileForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userType: "individual",
      organization: "",
    },
  });

  const loadUserProfile = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    setLoadError(null);
    
    try {
      // Direct query to avoid recursion
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, user_type, organization, avatar_url')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      
      if (data) {
        form.reset({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          userType: data.user_type || "individual",
          organization: data.organization || "",
        });
        
        // Check if avatar_url exists in the data and handle it
        if (data.avatar_url) {
          try {
            const { data: avatarData } = await supabase.storage
              .from('avatars')
              .getPublicUrl(data.avatar_url);
            
            if (avatarData) {
              setAvatarUrl(avatarData.publicUrl);
            }
          } catch (avatarError) {
            console.error("Error retrieving avatar:", avatarError);
          }
        }
      }
      setLoadError(null);
    } catch (error: any) {
      console.error("Error loading user profile:", error);
      setLoadError(error.message || t('profile.loadError'));
    } finally {
      setIsLoading(false);
    }
  }, [user, form, t]);
  
  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile, retryCount]);

  async function onSubmit(values: FormValues) {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: values.firstName,
          last_name: values.lastName,
          user_type: values.userType,
          organization: values.organization,
          updated_at: new Date().toISOString(),
        } as ProfileData)
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast({
        title: t('notification.success'),
        description: t('profile.updated'),
        className: "bg-moh-lightGreen border-moh-green/20 text-moh-darkGreen",
      });
      
      // Show success animation
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
      
    } catch (error: any) {
      console.error("Update error:", error);
      toast({
        title: t('notification.error'),
        description: "Failed to update profile: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${user?.id}.${fileExt}`;
    
    setIsUploading(true);
    
    try {
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });
      
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = await supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      // Update user profile with avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: filePath } as ProfileData)
        .eq('id', user?.id);
      
      if (updateError) throw updateError;
      
      setAvatarUrl(data.publicUrl);
      
      toast({
        title: t('notification.success'),
        description: "Your profile picture has been updated.",
        className: "bg-moh-lightGreen border-moh-green/20 text-moh-darkGreen",
      });
      
    } catch (error: any) {
      console.error("Avatar upload error:", error);
      toast({
        title: t('notification.error'),
        description: "Failed to upload avatar: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getInitials = () => {
    const firstName = form.watch("firstName");
    const lastName = form.watch("lastName");
    
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    
    return "U";
  };
  
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-moh-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (loadError) {
    return (
      <Card className="border-moh-green/10 shadow-md overflow-hidden bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2 text-red-700">{t('profile.loadError')}</h3>
            <p className="text-sm text-muted-foreground mb-6">{loadError}</p>
            <Button 
              onClick={handleRetry}
              className="bg-moh-green hover:bg-moh-darkGreen"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {t('profile.retryLoading')}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-moh-green/10 shadow-md overflow-hidden bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-white">
        <CardTitle className="text-2xl font-playfair text-moh-darkGreen">{t('profile.profileInfo')}</CardTitle>
        <CardDescription>{t('profile.profileInfoDesc')}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Avatar section */}
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24 border-2 border-moh-green/20">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt="Profile" />
                ) : null}
                <AvatarFallback className="bg-moh-lightGreen text-moh-darkGreen text-xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              
              <div className="relative">
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleAvatarChange}
                  disabled={isUploading}
                />
                <label
                  htmlFor="avatar"
                  className={`flex items-center justify-center px-3 py-1.5 text-xs rounded-full cursor-pointer 
                  ${isUploading ? 
                    "bg-moh-lightGreen text-moh-darkGreen opacity-70" : 
                    "bg-moh-lightGreen text-moh-darkGreen hover:bg-moh-green/20"}`}
                >
                  {isUploading ? (
                    <>
                      <span className="mr-1 h-3 w-3 animate-spin rounded-full border-2 border-b-transparent"></span>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-3 w-3 mr-1" />
                      Upload Photo
                    </>
                  )}
                </label>
              </div>
            </div>
            
            {/* User info */}
            <div className="flex-1">
              <div className="mb-3">
                <h3 className="text-lg font-medium text-moh-darkGreen">{user?.email}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('profile.memberSince')} {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-moh-darkGreen">First Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            {...field} 
                            disabled={isLoading} 
                            className="pl-10 border-moh-green/20 focus-visible:ring-moh-green/30"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-moh-darkGreen">Last Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            {...field} 
                            disabled={isLoading} 
                            className="pl-10 border-moh-green/20 focus-visible:ring-moh-green/30"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-moh-darkGreen">User Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value} 
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="border-moh-green/20 focus:ring-moh-green/30">
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="healthcare_professional">Healthcare Professional</SelectItem>
                        <SelectItem value="innovator">Innovator</SelectItem>
                        <SelectItem value="investor">Investor</SelectItem>
                        <SelectItem value="organization">Organization</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {form.watch("userType") === "organization" && (
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-moh-darkGreen">Organization Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            {...field} 
                            disabled={isLoading} 
                            className="pl-10 border-moh-green/20 focus-visible:ring-moh-green/30"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isLoading || saveSuccess} 
                  className={`relative ${saveSuccess ? "bg-green-500 hover:bg-green-600" : "bg-moh-green hover:bg-moh-darkGreen"}`}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                      Updating...
                    </>
                  ) : saveSuccess ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Saved!
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </CardContent>
    </Card>
  );
}
