
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useSubmissionForm } from '@/contexts/SubmissionFormContext';
import SubmissionLayout from '@/components/innovations/SubmissionLayout';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle, ChevronRight, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function ReviewPage() {
  const navigate = useNavigate();
  const { formData, formProgress, updateProgress, resetForm } = useSubmissionForm();
  
  // Check if all required steps are completed
  const isFormComplete = Object.values(formProgress).every(step => step === true);
  
  const handleSubmission = async () => {
    if (!isFormComplete) {
      toast({
        title: "Incomplete submission",
        description: "Please complete all required sections before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // In a real app, you would send the form data to a backend API
      console.log("Submitting innovation:", formData);
      
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update progress
      updateProgress('review', true);
      
      // Show success message
      toast({
        title: "Innovation submitted successfully",
        description: "Your innovation has been submitted for review.",
      });
      
      // Clear form data
      // resetForm();
      
      // Navigate to success page
      navigate('/innovations');
    } catch (error) {
      console.error("Error submitting innovation:", error);
      toast({
        title: "Submission failed",
        description: "An error occurred while submitting your innovation. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Helper function to navigate to specific form sections for editing
  const navigateToSection = (section: string) => {
    navigate(`/innovations/submit/${section}`);
  };

  // Helper function to determine regulatory status display
  const getRegultatoryStatusDisplay = () => {
    if (!formData.regulatoryStatusType) return "Not specified";
    
    switch (formData.regulatoryStatusType) {
      case 'notStarted': return "Not Started";
      case 'inProgress': return "In Progress";
      case 'approved': return "Approved";
      case 'notApplicable': return "Not Applicable";
      default: return "Not specified";
    }
  };

  return (
    <SubmissionLayout showNext={false} showPrevious={true}>
      <div>
        <h2 className="text-2xl font-bold text-moh-darkGreen mb-2">Review Your Submission</h2>
        <p className="text-gray-600 mb-6">
          Review all information before submitting your healthcare innovation.
        </p>
        
        {!isFormComplete && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h3 className="text-amber-800 font-medium">Incomplete submission</h3>
              <p className="text-amber-700 text-sm">
                Please complete all required sections before submitting your innovation.
              </p>
            </div>
          </div>
        )}
        
        <Accordion type="single" collapsible className="w-full mb-8">
          <AccordionItem value="basic-info">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center space-x-2">
                {formProgress.basicInfo ? (
                  <Badge variant="default" className="bg-green-500">
                    <Check className="h-3 w-3 mr-1" />Complete
                  </Badge>
                ) : (
                  <Badge variant="outline">Incomplete</Badge>
                )}
                <span>Basic Information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pl-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2">
                  <div className="text-sm font-medium text-gray-500">Title:</div>
                  <div className="md:col-span-3">{formData.title || "Not provided"}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Short Description:</div>
                  <div className="md:col-span-3">{formData.description || "Not provided"}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Category:</div>
                  <div className="md:col-span-3">{formData.category || "Not selected"}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Tags:</div>
                  <div className="md:col-span-3">
                    {formData.tags && formData.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {formData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="mr-1 mb-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    ) : "No tags provided"}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateToSection('basic-info')}
                  className="mt-2"
                >
                  Edit Basic Information
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="details">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center space-x-2">
                {formProgress.details ? (
                  <Badge variant="default" className="bg-green-500">
                    <Check className="h-3 w-3 mr-1" />Complete
                  </Badge>
                ) : (
                  <Badge variant="outline">Incomplete</Badge>
                )}
                <span>Innovation Details</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pl-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2">
                  <div className="text-sm font-medium text-gray-500">Implementation Status:</div>
                  <div className="md:col-span-3">
                    {formData.implementationStatus ? (
                      <Badge>
                        {formData.implementationStatus}
                      </Badge>
                    ) : "Not selected"}
                  </div>
                  
                  <div className="text-sm font-medium text-gray-500">Problem Statement:</div>
                  <div className="md:col-span-3">{formData.problem || "Not provided"}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Solution Description:</div>
                  <div className="md:col-span-3">{formData.solution || "Not provided"}</div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateToSection('details')}
                  className="mt-2"
                >
                  Edit Details
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="media">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center space-x-2">
                {formProgress.media ? (
                  <Badge variant="default" className="bg-green-500">
                    <Check className="h-3 w-3 mr-1" />Complete
                  </Badge>
                ) : (
                  <Badge variant="outline">Incomplete</Badge>
                )}
                <span>Media Files</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pl-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2">
                  <div className="text-sm font-medium text-gray-500">Images:</div>
                  <div className="md:col-span-3">
                    {formData.imageUrls && formData.imageUrls.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {formData.imageUrls.map((url, index) => (
                          <div key={index} className="relative rounded-md overflow-hidden h-20">
                            <img 
                              src={url} 
                              alt={`Innovation preview ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : "No images provided"}
                  </div>
                  
                  <div className="text-sm font-medium text-gray-500">Documents:</div>
                  <div className="md:col-span-3">
                    {formData.documentNames && formData.documentNames.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {formData.documentNames.map((name, index) => (
                          <li key={index}>{name}</li>
                        ))}
                      </ul>
                    ) : "No documents provided"}
                  </div>
                  
                  <div className="text-sm font-medium text-gray-500">Video URL:</div>
                  <div className="md:col-span-3">
                    {formData.videoUrl ? (
                      <a href={formData.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {formData.videoUrl}
                      </a>
                    ) : "Not provided"}
                  </div>
                  
                  <div className="text-sm font-medium text-gray-500">Website:</div>
                  <div className="md:col-span-3">
                    {formData.website ? (
                      <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {formData.website}
                      </a>
                    ) : "Not provided"}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateToSection('media')}
                  className="mt-2"
                >
                  Edit Media
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="technical">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center space-x-2">
                {formProgress.technical ? (
                  <Badge variant="default" className="bg-green-500">
                    <Check className="h-3 w-3 mr-1" />Complete
                  </Badge>
                ) : (
                  <Badge variant="outline">Incomplete</Badge>
                )}
                <span>Technical Specifications</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pl-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2">
                  <div className="text-sm font-medium text-gray-500">Features:</div>
                  <div className="md:col-span-3">
                    <ul className="list-disc list-inside">
                      {formData.hasAI && <li>Uses AI/ML</li>}
                      {formData.hasConnectedDevices && <li>Uses Connected Devices/IoT</li>}
                      {formData.hasMobileApp && <li>Includes Mobile Application</li>}
                    </ul>
                  </div>
                  
                  <div className="text-sm font-medium text-gray-500">Compatible Systems:</div>
                  <div className="md:col-span-3">{formData.compatibleSystems || "Not specified"}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Target Users:</div>
                  <div className="md:col-span-3">{formData.targetUsers || "Not specified"}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Patent Status:</div>
                  <div className="md:col-span-3">
                    {formData.patentStatus === 'none' && "No Patent"}
                    {formData.patentStatus === 'pending' && "Patent Pending"}
                    {formData.patentStatus === 'granted' && "Patent Granted"}
                    {!formData.patentStatus && "Not specified"}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateToSection('technical')}
                  className="mt-2"
                >
                  Edit Technical Specifications
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="regulatory">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center space-x-2">
                {formProgress.regulatory ? (
                  <Badge variant="default" className="bg-green-500">
                    <Check className="h-3 w-3 mr-1" />Complete
                  </Badge>
                ) : (
                  <Badge variant="outline">Incomplete</Badge>
                )}
                <span>Regulatory Information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pl-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2">
                  <div className="text-sm font-medium text-gray-500">Regulatory Status:</div>
                  <div className="md:col-span-3">
                    {getRegultatoryStatusDisplay()}
                  </div>
                  
                  {(formData.regulatoryStatusType === 'inProgress' || formData.regulatoryStatusType === 'approved') && (
                    <>
                      <div className="text-sm font-medium text-gray-500">Approval Type:</div>
                      <div className="md:col-span-3">{formData.approvalType || "Not specified"}</div>
                      
                      <div className="text-sm font-medium text-gray-500">Approval Details:</div>
                      <div className="md:col-span-3">{formData.approvalDetails || "Not provided"}</div>
                    </>
                  )}
                  
                  <div className="text-sm font-medium text-gray-500">Compliance Activities:</div>
                  <div className="md:col-span-3">
                    <ul className="list-disc list-inside">
                      {formData.hasRiskAssessment && <li>Risk Assessment Completed</li>}
                      {formData.hasClinicalTrials && <li>Clinical Trials Conducted</li>}
                      {formData.hasEthicalReview && <li>Ethical Review Completed</li>}
                    </ul>
                  </div>
                  
                  <div className="text-sm font-medium text-gray-500">Compliance Standards:</div>
                  <div className="md:col-span-3">{formData.complianceStandards || "Not specified"}</div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateToSection('regulatory')}
                  className="mt-2"
                >
                  Edit Regulatory Information
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="contact">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center space-x-2">
                {formProgress.contact ? (
                  <Badge variant="default" className="bg-green-500">
                    <Check className="h-3 w-3 mr-1" />Complete
                  </Badge>
                ) : (
                  <Badge variant="outline">Incomplete</Badge>
                )}
                <span>Contact Information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pl-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2">
                  <div className="text-sm font-medium text-gray-500">Contact Name:</div>
                  <div className="md:col-span-3">{formData.contactName || "Not provided"}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Contact Email:</div>
                  <div className="md:col-span-3">{formData.contactEmail || "Not provided"}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Organization:</div>
                  <div className="md:col-span-3">{formData.organization || "Not provided"}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Phone Number:</div>
                  <div className="md:col-span-3">{formData.phoneNumber || "Not provided"}</div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateToSection('contact')}
                  className="mt-2"
                >
                  Edit Contact Information
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleSubmission} 
            disabled={!isFormComplete} 
            size="lg"
            className="bg-moh-green hover:bg-moh-darkGreen text-white px-8"
          >
            Submit Innovation
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        {!isFormComplete && (
          <p className="text-center text-sm text-amber-600 mt-4">
            Please complete all required sections before submitting.
          </p>
        )}
      </div>
    </SubmissionLayout>
  );
}
