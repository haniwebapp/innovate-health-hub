
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Mail, User, Building, KeyIcon, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
  userType: z.string(),
  organization: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { t } = useLanguage();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "individual",
      organization: "",
    },
    mode: "onChange"
  });

  // Watch password to calculate strength
  const password = form.watch("password");
  
  // Calculate password strength
  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (!password) return 0;
    
    // Length
    if (password.length > 8) score += 25;
    else if (password.length >= 6) score += 15;
    
    // Complexity
    if (/[A-Z]/.test(password)) score += 25; // uppercase
    if (/[0-9]/.test(password)) score += 25; // number
    if (/[^A-Za-z0-9]/.test(password)) score += 25; // special char
    
    return score;
  };
  
  // Update password strength when password changes
  useState(() => {
    if (password) {
      setPasswordStrength(calculatePasswordStrength(password));
    }
  });

  const nextStep = async () => {
    let fieldsToValidate: ("firstName" | "lastName" | "email" | "password" | "confirmPassword" | "userType" | "organization")[] = [];
    
    switch(currentStep) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "email"];
        break;
      case 2:
        fieldsToValidate = ["password", "confirmPassword"];
        break;
    }
    
    const result = await form.trigger(fieldsToValidate as any);
    if (result) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      const { confirmPassword, ...userData } = values;
      await signUp(values.email, values.password, userData);
      navigate("/auth/verification");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const getPasswordStrengthText = () => {
    if (!password) return "";
    if (passwordStrength < 25) return "Weak";
    if (passwordStrength < 50) return "Fair";
    if (passwordStrength < 75) return "Good";
    return "Strong";
  };
  
  const getPasswordStrengthColor = () => {
    if (!password) return "bg-gray-200";
    if (passwordStrength < 25) return "bg-red-500";
    if (passwordStrength < 50) return "bg-orange-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-moh-darkGreen/50 mb-2">
            <span>{t('register.personalInfo')}</span>
            <span>{t('register.security')}</span>
            <span>{t('register.profile')}</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div 
              className="h-2 bg-moh-green rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-moh-darkGreen">{t('register.firstName')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder={t('register.firstName')} 
                          {...field} 
                          className="pl-10 border-moh-green/20 focus-visible:ring-moh-green/30" 
                          disabled={isLoading} 
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
                    <FormLabel className="text-moh-darkGreen">{t('register.lastName')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder={t('register.lastName')} 
                          {...field} 
                          className="pl-10 border-moh-green/20 focus-visible:ring-moh-green/30" 
                          disabled={isLoading} 
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
                        className="pl-10 border-moh-green/20 focus-visible:ring-moh-green/30" 
                        disabled={isLoading} 
                        autoComplete="email" 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end pt-4">
              <Button 
                type="button"
                onClick={nextStep}
                className="bg-moh-green hover:bg-moh-darkGreen"
                disabled={isLoading}
              >
                {t('register.next')}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Password */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
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
                        className="pl-10 border-moh-green/20 focus-visible:ring-moh-green/30" 
                        disabled={isLoading} 
                        autoComplete="new-password" 
                      />
                    </div>
                  </FormControl>
                  
                  {/* Password strength meter */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">
                          {t('register.passwordStrength')}
                        </span>
                        <span className={`text-xs font-medium
                          ${passwordStrength < 25 ? 'text-red-500' : 
                          passwordStrength < 50 ? 'text-orange-500' :
                          passwordStrength < 75 ? 'text-yellow-600' : 'text-green-600'}
                        `}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <Progress value={passwordStrength} className="h-1" indicatorClassName={getPasswordStrengthColor()} />
                    </div>
                  )}
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-moh-darkGreen">{t('register.confirmPassword')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field} 
                        className="pl-10 border-moh-green/20 focus-visible:ring-moh-green/30" 
                        disabled={isLoading} 
                        autoComplete="new-password" 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button"
                onClick={prevStep}
                variant="outline"
                className="border-moh-green text-moh-green hover:bg-moh-lightGreen hover:text-moh-darkGreen"
                disabled={isLoading}
              >
                {t('register.back')}
              </Button>
              
              <Button 
                type="button"
                onClick={nextStep}
                className="bg-moh-green hover:bg-moh-darkGreen"
                disabled={isLoading}
              >
                {t('register.next')}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: User Type and Organization */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-moh-darkGreen">{t('register.userType')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="border-moh-green/20 focus:ring-moh-green/30">
                        <SelectValue placeholder={t('register.selectUserType')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="individual">{t('register.individual')}</SelectItem>
                      <SelectItem value="healthcare_professional">{t('register.healthcareProfessional')}</SelectItem>
                      <SelectItem value="innovator">{t('register.innovator')}</SelectItem>
                      <SelectItem value="investor">{t('register.investor')}</SelectItem>
                      <SelectItem value="organization">{t('register.organization')}</SelectItem>
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
                    <FormLabel className="text-moh-darkGreen">{t('register.organizationName')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder={t('register.organizationName')} 
                          {...field} 
                          className="pl-10 border-moh-green/20 focus-visible:ring-moh-green/30" 
                          disabled={isLoading} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <div className="pt-4 space-y-6">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="h-4 w-4 rounded border-gray-300 text-moh-green focus:ring-moh-green" 
                  required
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  {t('register.agreeTerms')}
                </label>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="border-moh-green text-moh-green hover:bg-moh-lightGreen hover:text-moh-darkGreen"
                  disabled={isLoading}
                >
                  {t('register.back')}
                </Button>
                
                <Button 
                  type="submit" 
                  className="bg-moh-green hover:bg-moh-darkGreen" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                      {t('register.creatingAccount')}
                    </>
                  ) : (
                    t('register.createAccount')
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        
        {currentStep === 1 && (
          <div className="text-center text-sm pt-4">
            {t('register.alreadyHaveAccount')}{" "}
            <Link to="/auth/login" className="text-moh-green hover:underline font-medium">
              {t('login.signIn')}
            </Link>
          </div>
        )}
      </form>
    </Form>
  );
}
