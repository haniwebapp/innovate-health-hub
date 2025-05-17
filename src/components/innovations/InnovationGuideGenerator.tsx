
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { InnovationGuideService } from '@/services/ai/innovation/InnovationGuideService';
import { InnovationGuideResult, InnovationGuideInput } from '@/services/ai/policy/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle, FileText, Book, ChevronRight, LightbulbIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const formSchema = z.object({
  innovationType: z.string().min(3, { message: "Please specify your innovation type" }),
  innovationStage: z.string().min(1, { message: "Please select an innovation stage" }),
  challenges: z.string().optional(),
  goals: z.string().min(10, { message: "Please describe your innovation goals" })
});

type FormValues = z.infer<typeof formSchema>;

export const InnovationGuideGenerator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [guideResult, setGuideResult] = useState<InnovationGuideResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      innovationType: '',
      innovationStage: '',
      challenges: '',
      goals: ''
    }
  });
  
  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);
    setGuideResult(null);
    
    try {
      const input: InnovationGuideInput = {
        innovationType: values.innovationType,
        innovationStage: values.innovationStage,
        challenges: values.challenges,
        goals: values.goals
      };
      
      const result = await InnovationGuideService.generateGuide(input);
      setGuideResult(result);
    } catch (err: any) {
      console.error("Error generating innovation guide:", err);
      setError(err.message || 'Failed to generate innovation guide');
      toast({
        title: "Error",
        description: "Failed to generate innovation guide. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-moh-darkGreen">Innovation Guide Generator</h2>
        <p className="text-gray-600">Get personalized guidance for your healthcare innovation journey</p>
      </div>
      
      {!guideResult ? (
        <Card className="border-moh-green/20">
          <CardHeader>
            <CardTitle className="text-moh-darkGreen flex items-center gap-2">
              <LightbulbIcon className="h-5 w-5 text-moh-green" /> Innovation Details
            </CardTitle>
            <CardDescription>
              Provide information about your healthcare innovation to receive tailored guidance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="innovationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Innovation Type</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Diagnostic device, Digital health app, Telehealth service" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Specify the type of healthcare innovation you're developing
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="innovationStage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Innovation Stage</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your current stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="concept">Concept/Ideation</SelectItem>
                          <SelectItem value="research">Research & Development</SelectItem>
                          <SelectItem value="prototype">Prototype</SelectItem>
                          <SelectItem value="testing">Testing & Validation</SelectItem>
                          <SelectItem value="regulatory">Regulatory Approval</SelectItem>
                          <SelectItem value="market">Market Entry</SelectItem>
                          <SelectItem value="scaling">Scaling & Growth</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the current stage of your innovation's development
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Innovation Goals</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what you aim to achieve with your innovation"
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Explain your innovation's purpose, target outcomes, and expected impact
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="challenges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Challenges (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe any challenges or barriers you're facing" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Share specific obstacles or questions you need guidance with
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-moh-green to-moh-darkGreen"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Guide...
                    </>
                  ) : (
                    <>
                      Generate Innovation Guide
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-moh-green/20 overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-moh-green to-moh-lightGreen" />
              <CardHeader>
                <CardTitle className="text-moh-darkGreen">
                  {guideResult.stageSpecificGuidance.title}
                </CardTitle>
                <CardDescription>
                  {guideResult.stageSpecificGuidance.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-moh-darkGreen">Key Steps</h3>
                  <ul className="space-y-2">
                    {guideResult.stageSpecificGuidance.steps.map((step, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 bg-moh-lightGreen/10 p-3 rounded-md border border-moh-green/10"
                      >
                        <CheckCircle className="h-5 w-5 text-moh-green mt-0.5 shrink-0" />
                        <span>{step}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-moh-darkGreen">Recommendations</h3>
                    <ul className="space-y-1">
                      {guideResult.recommendations.map((rec, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <ChevronRight className="h-4 w-4 text-moh-green shrink-0" />
                          <span>{rec}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-moh-darkGreen">Market Insights</h3>
                    <ul className="space-y-1">
                      {guideResult.marketInsights.map((insight, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <ChevronRight className="h-4 w-4 text-moh-green shrink-0" />
                          <span>{insight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {guideResult.resources.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-moh-darkGreen">Helpful Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {guideResult.resources.map((resource, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-start gap-2 p-3 rounded-md border bg-white hover:shadow-sm transition-shadow"
                        >
                          <Book className="h-5 w-5 text-moh-green mt-0.5 shrink-0" />
                          <div>
                            <div className="font-medium">{resource.title}</div>
                            <div className="text-sm text-gray-500">{resource.description}</div>
                            {resource.url && (
                              <a 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-moh-green hover:underline flex items-center mt-1"
                              >
                                Access resource <ChevronRight className="h-3 w-3 ml-1" />
                              </a>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-4">
                <div className="bg-moh-lightGreen/20 p-4 rounded-md border border-moh-green/10">
                  <h3 className="text-lg font-medium mb-2 text-moh-darkGreen">Next Steps</h3>
                  <ul className="space-y-2">
                    {guideResult.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="bg-moh-green text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">{index + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  onClick={() => setGuideResult(null)}
                  variant="outline" 
                  className="border-moh-green text-moh-darkGreen hover:bg-moh-lightGreen/20"
                >
                  Create New Guide
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200">
          {error}
        </div>
      )}
    </div>
  );
};
