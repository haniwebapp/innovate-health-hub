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
import { ChevronRight, FileText, Check, Image, AlertCircle } from "lucide-react";

export default function InnovationSubmitPreview() {
  const { formData, formProgress, activeStep, totalSteps } = useSubmissionForm();
  
  // Calculate completion percentage
  const completedSteps = Object.values(formProgress).filter(Boolean).length;
  const completionPercentage = Math.round((completedSteps / totalSteps) * 100);
  
  return (
    <div className="sticky top-24">
      <Card className="border-moh-green/20 shadow-md">
        <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-moh-lightGold/20 border-b">
          <CardTitle className="text-moh-darkGreen">Submission Preview</CardTitle>
          <CardDescription>Your innovation submission progress</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between mb-1 text-sm">
              <span>Completion</span>
              <span className="font-medium">{completionPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-moh-green"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>
          
          {/* Preview Content */}
          {formData.title ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-xl text-moh-darkGreen">{formData.title}</h3>
                {formData.description && (
                  <p className="text-sm text-gray-600 mt-1">{formData.description}</p>
                )}
              </div>
              
              {formData.category && (
                <div>
                  <Badge className="bg-moh-lightGreen text-moh-darkGreen">
                    {formData.category}
                  </Badge>
                </div>
              )}
              
              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Summary Items */}
              <div className="space-y-2 pt-2 border-t">
                {formData.implementationStatus && (
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant={formData.implementationStatus === 'Concept' ? 'outline' : 'default'}>
                      {formData.implementationStatus}
                    </Badge>
                    <span className="text-gray-500">Status</span>
                  </div>
                )}
                
                {(formData.hasAI || formData.hasConnectedDevices || formData.hasMobileApp) && (
                  <div className="flex flex-wrap gap-1 text-xs">
                    {formData.hasAI && <Badge variant="secondary">AI/ML</Badge>}
                    {formData.hasConnectedDevices && <Badge variant="secondary">IoT</Badge>}
                    {formData.hasMobileApp && <Badge variant="secondary">Mobile App</Badge>}
                  </div>
                )}
                
                {formData.regulatoryStatusType && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Regulatory:</span>
                    <Badge variant="outline" className="text-xs">
                      {formData.regulatoryStatusType === 'notStarted' && "Not Started"}
                      {formData.regulatoryStatusType === 'inProgress' && "In Progress"}
                      {formData.regulatoryStatusType === 'approved' && "Approved"}
                      {formData.regulatoryStatusType === 'notApplicable' && "N/A"}
                    </Badge>
                  </div>
                )}
                
                {formData.imageUrls && formData.imageUrls.length > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <Image size={14} className="text-gray-500" />
                    <span className="text-gray-500">{formData.imageUrls.length} image(s)</span>
                  </div>
                )}
                
                {formData.documentNames && formData.documentNames.length > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <FileText size={14} className="text-gray-500" />
                    <span className="text-gray-500">{formData.documentNames.length} document(s)</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>Complete the first step to see your innovation preview</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-xs">
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
            <Button className="bg-moh-green hover:bg-moh-darkGreen" size="sm" asChild>
              <Link to="/innovations/submit/review">
                Submit
                <ChevronRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild>
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
      
      <div className="mt-4">
        <Card className="border-moh-green/20">
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Form Completion</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <ul className="space-y-1">
              <li className="flex items-center justify-between text-sm">
                <span>Basic Information</span>
                {formProgress.basicInfo ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <span className="h-4 w-4 rounded-full bg-gray-200"></span>
                )}
              </li>
              <li className="flex items-center justify-between text-sm">
                <span>Details</span>
                {formProgress.details ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <span className="h-4 w-4 rounded-full bg-gray-200"></span>
                )}
              </li>
              <li className="flex items-center justify-between text-sm">
                <span>Media</span>
                {formProgress.media ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <span className="h-4 w-4 rounded-full bg-gray-200"></span>
                )}
              </li>
              <li className="flex items-center justify-between text-sm">
                <span>Technical</span>
                {formProgress.technical ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <span className="h-4 w-4 rounded-full bg-gray-200"></span>
                )}
              </li>
              <li className="flex items-center justify-between text-sm">
                <span>Regulatory</span>
                {formProgress.regulatory ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <span className="h-4 w-4 rounded-full bg-gray-200"></span>
                )}
              </li>
              <li className="flex items-center justify-between text-sm">
                <span>Contact</span>
                {formProgress.contact ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <span className="h-4 w-4 rounded-full bg-gray-200"></span>
                )}
              </li>
              <li className="flex items-center justify-between text-sm">
                <span>Review</span>
                {formProgress.review ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <span className="h-4 w-4 rounded-full bg-gray-200"></span>
                )}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
