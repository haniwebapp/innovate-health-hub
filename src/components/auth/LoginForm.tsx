
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Info, Mail, KeyIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { t, language } = useLanguage();
  
  // Get the location they were trying to access
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const result = await signIn(values.email, values.password);
      if (result.error) {
        throw result.error;
      }
      navigate(from);
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.message === "Invalid login credentials") {
        setErrorMessage(t('login.invalidCredentials'));
      } else {
        setErrorMessage(error.message || t('login.genericError'));
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive" className="text-sm bg-red-50 border border-red-200">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          </motion.div>
        )}
        
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="text-sm bg-green-50 border border-green-200 text-green-800">
              <Info className="h-4 w-4 mr-2 text-green-600" />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          </motion.div>
        )}
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-moh-darkGreen">{t('register.email')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder={t('footer.emailPlaceholder')} 
                    {...field} 
                    disabled={isLoading}
                    autoComplete="email"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-moh-darkGreen">{t('register.password')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <KeyIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    {...field} 
                    disabled={isLoading}
                    autoComplete="current-password"
                    className="pl-10 border-moh-green/20 focus-visible:ring-moh-green/30"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Link to="/auth/forgot-password" className="text-sm text-moh-green hover:underline hover:text-moh-darkGreen">
            {t('login.forgotPassword')}
          </Link>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-moh-green hover:bg-moh-darkGreen transition-colors" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
              {t('login.signingIn')}
            </>
          ) : (
            t('login.signIn')
          )}
        </Button>
        
        <div className="text-center text-sm">
          {t('login.dontHaveAccount')}{" "}
          <Link to="/auth/register" className="text-moh-green hover:underline font-medium">
            {t('nav.register')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
