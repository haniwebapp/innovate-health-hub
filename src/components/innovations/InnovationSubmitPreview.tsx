
import React from 'react';
import { motion } from 'framer-motion';
import { useSubmissionForm } from '@/contexts/SubmissionFormContext';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ChevronRight, FileText, Check, Image, AlertCircle, CheckCircle } from "lucide-react";

// Define steps array that was missing
const steps = [
  { name: 'Basic Info', path: '/innovations/submit/basic-info', key: 'basicInfo' },
  { name: 'Details', path: '/innovations/submit/details', key: 'details' },
  { name: 'Media', path: '/innovations/submit/media', key: 'media' },
  { name: 'Technical', path: '/innovations/submit/technical', key: 'technical' },
  { name: 'Regulatory', path: '/innovations/submit/regulatory', key: 'regulatory' },
  { name: 'Contact', path: '/innovations/submit/contact', key: 'contact' },
  { name: 'Review', path: '/innovations/submit/review', key: 'review' }
];

export default function InnovationSubmitPreview() {
  const { formData, formProgress, activeStep, totalSteps } = useSubmissionForm();
  
  // Calculate completion percentage
  const completedSteps = Object.values(formProgress).filter(Boolean).length;
  const completionPercentage = Math.round((completedSteps / totalSteps) * 100);
  
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="border-moh-green/20 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-moh-lightGreen/40 to-moh-lightGold/20 border-b">
          <CardTitle className="text-moh-darkGreen flex items-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-moh-darkGreen to-moh-green">
              Submission Preview
            </span>
          </CardTitle>
          <CardDescription>Your innovation submission progress</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 relative">
          {/* Circular Progress */}
          <motion.div 
            className="absolute top-6 right-6"
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-16 w-16">
              {/* Background circle */}
              <div className="h-16 w-16 rounded-full border-2 border-gray-200 absolute" />
              
              {/* Progress circle with stroke-dashoffset animation */}
              <svg className="h-16 w-16 absolute top-0 left-0 transform -rotate-90" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  strokeWidth="8"
                  stroke="url(#gradient)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: completionPercentage / 100 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="drop-shadow"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00814A" />
                    <stop offset="100%" stopColor="#C3A86B" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Percentage text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-moh-darkGreen">{completionPercentage}%</span>
              </div>
            </div>
          </motion.div>
          
          {/* Preview Content */}
          {formData.title ? (
            <motion.div
              className="space-y-4 pr-20"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { 
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.div variants={itemVariants}>
                <h3 className="font-semibold text-xl text-moh-darkGreen">{formData.title}</h3>
                {formData.description && (
                  <p className="text-sm text-gray-600 mt-1">{formData.description}</p>
                )}
              </motion.div>
              
              {formData.category && (
                <motion.div variants={itemVariants}>
                  <Badge className="bg-gradient-to-r from-moh-lightGreen to-moh-lightGold/70 text-moh-darkGreen">
                    {formData.category}
                  </Badge>
                </motion.div>
              )}
              
              {formData.tags && formData.tags.length > 0 && (
                <motion.div variants={itemVariants} className="flex flex-wrap gap-1">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-moh-green/30 bg-moh-lightGreen/10">
                      {tag}
                    </Badge>
                  ))}
                </motion.div>
              )}
              
              {/* Summary Items */}
              <motion.div variants={itemVariants} className="space-y-2 pt-2 border-t">
                {formData.implementationStatus && (
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant={formData.implementationStatus === 'Concept' ? 'outline' : 'default'} className="bg-moh-green text-white">
                      {formData.implementationStatus}
                    </Badge>
                    <span className="text-gray-500">Status</span>
                  </div>
                )}
                
                {(formData.hasAI || formData.hasConnectedDevices || formData.hasMobileApp) && (
                  <div className="flex flex-wrap gap-1 text-xs">
                    {formData.hasAI && <Badge variant="secondary" className="bg-moh-lightGold/20 text-moh-darkGreen border-moh-gold/30">AI/ML</Badge>}
                    {formData.hasConnectedDevices && <Badge variant="secondary" className="bg-moh-lightGold/20 text-moh-darkGreen border-moh-gold/30">IoT</Badge>}
                    {formData.hasMobileApp && <Badge variant="secondary" className="bg-moh-lightGold/20 text-moh-darkGreen border-moh-gold/30">Mobile App</Badge>}
                  </div>
                )}
                
                {formData.regulatoryStatusType && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Regulatory:</span>
                    <Badge variant="outline" className="text-xs border-moh-green/30">
                      {formData.regulatoryStatusType === 'notStarted' && "Not Started"}
                      {formData.regulatoryStatusType === 'inProgress' && "In Progress"}
                      {formData.regulatoryStatusType === 'approved' && "Approved"}
                      {formData.regulatoryStatusType === 'notApplicable' && "N/A"}
                    </Badge>
                  </div>
                )}
                
                {formData.imageUrls && formData.imageUrls.length > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <Image size={14} className="text-moh-green" />
                    <span className="text-gray-500">{formData.imageUrls.length} image(s)</span>
                  </div>
                )}
                
                {formData.documentNames && formData.documentNames.length > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <FileText size={14} className="text-moh-green" />
                    <span className="text-gray-500">{formData.documentNames.length} document(s)</span>
                  </div>
                )}
              </motion.div>

              {/* Image Previews (if images exist) */}
              {formData.imageUrls && formData.imageUrls.length > 0 && (
                <motion.div 
                  variants={itemVariants}
                  className="pt-3 border-t border-dashed border-moh-green/20"
                >
                  <p className="text-xs text-moh-darkGreen font-medium mb-2">Innovation Previews</p>
                  <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-none">
                    {formData.imageUrls.slice(0, 3).map((url, index) => (
                      <div key={index} className="h-14 w-20 rounded-md overflow-hidden flex-shrink-0 border border-moh-gold/20">
                        <img src={url} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                    ))}
                    {formData.imageUrls.length > 3 && (
                      <div className="h-14 w-20 rounded-md overflow-hidden flex-shrink-0 bg-moh-lightGreen/20 flex items-center justify-center text-xs text-moh-darkGreen font-medium">
                        +{formData.imageUrls.length - 3} more
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-8 text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AlertCircle className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>Complete the first step to see your innovation preview</p>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between items-center bg-gradient-to-r from-white to-moh-lightGreen/10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-xs bg-moh-lightGreen/30 text-moh-darkGreen px-2 py-1 rounded-full">
                  Step {activeStep + 1} of {totalSteps}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-xs">
                  {completedSteps} of {totalSteps} steps completed
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {activeStep === totalSteps - 1 && completedSteps === totalSteps ? (
            <Button className="bg-gradient-to-r from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green shadow-sm" size="sm" asChild>
              <Link to="/innovations/submit/review">
                Submit
                <ChevronRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild className="border-moh-green/30 hover:bg-moh-lightGreen/20 transition-colors">
              <Link to={`/innovations/submit/${
                activeStep < totalSteps - 1 
                ? ['basic-info', 'details', 'media', 'technical', 'regulatory', 'contact', 'review'][activeStep + 1] 
                : 'review'
              }`}>
                Next Step
                <ChevronRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <motion.div 
        className="mt-4"
        variants={itemVariants} 
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        <Card className="border-moh-green/20 overflow-hidden">
          <CardHeader className="py-3 bg-gradient-to-r from-moh-lightGreen/20 to-white">
            <CardTitle className="text-sm text-moh-darkGreen">Form Completion</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <ul className="space-y-2">
              {steps.map((step, index) => (
                <motion.li 
                  key={step.key}
                  className={`flex items-center justify-between text-sm p-2 rounded-md ${formProgress[step.key as keyof typeof formProgress] ? 'bg-moh-lightGreen/10' : 'hover:bg-gray-50'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className={index === activeStep ? 'text-moh-darkGreen font-medium' : ''}>
                    {step.name}
                  </span>
                  {formProgress[step.key as keyof typeof formProgress] ? (
                    <CheckCircle size={16} className="text-moh-green" />
                  ) : (
                    <motion.span 
                      className={`h-4 w-4 rounded-full ${index === activeStep ? 'bg-moh-lightGreen/50' : 'bg-gray-200'}`}
                      animate={index === activeStep ? { 
                        scale: [1, 1.2, 1], 
                        backgroundColor: ['rgb(229 231 235)', 'rgb(134 239 172 / 0.5)', 'rgb(134 239 172 / 0.5)'] 
                      } : {}}
                      transition={{ 
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        duration: 2
                      }}
                    ></motion.span>
                  )}
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
