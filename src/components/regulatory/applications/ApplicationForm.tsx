
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApplicationFormData } from "./types";
import { useState } from "react";

interface ApplicationFormProps {
  onSubmit: (data: ApplicationFormData) => void;
  onSaveDraft: (data: ApplicationFormData) => void;
  initialData?: Partial<ApplicationFormData>;
  isSubmitting?: boolean;
}

export function ApplicationForm({ 
  onSubmit, 
  onSaveDraft, 
  initialData = {}, 
  isSubmitting = false 
}: ApplicationFormProps) {
  const [formData, setFormData] = useState<Partial<ApplicationFormData>>({
    name: '',
    description: '',
    innovationType: '',
    framework: '',
    regulatoryChallenges: '',
    testingDuration: '',
    organizationType: '',
    ...initialData
  });

  const handleChange = (field: keyof ApplicationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as ApplicationFormData);
  };

  const handleSaveDraft = () => {
    onSaveDraft(formData as ApplicationFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 block mb-1">
            Innovation Name
          </Label>
          <Input 
            placeholder="Enter the name of your innovation" 
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700 block mb-1">
            Innovation Category
          </Label>
          <Select 
            value={formData.innovationType} 
            onValueChange={(value) => handleChange('innovationType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medical-device">Medical Device</SelectItem>
              <SelectItem value="digital-health">Digital Health Solution</SelectItem>
              <SelectItem value="diagnostic">Diagnostic Tool</SelectItem>
              <SelectItem value="therapeutic">Therapeutic Solution</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium text-gray-700 block mb-1">
          Innovation Description
        </Label>
        <Textarea 
          placeholder="Provide a detailed description of your innovation..." 
          rows={5}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium text-gray-700 block mb-1">
          Current Regulatory Status
        </Label>
        <Select 
          value={formData.framework} 
          onValueChange={(value) => handleChange('framework', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="not-started">Not Started</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="submitted">Submitted for Approval</SelectItem>
            <SelectItem value="approved">Partially Approved</SelectItem>
            <SelectItem value="rejected">Previously Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium text-gray-700 block mb-1">
          Regulatory Challenges
        </Label>
        <Textarea 
          placeholder="Describe any specific regulatory challenges or questions..." 
          rows={3}
          value={formData.regulatoryChallenges}
          onChange={(e) => handleChange('regulatoryChallenges', e.target.value)}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 block mb-1">
            Preferred Testing Duration
          </Label>
          <Select 
            value={formData.testingDuration} 
            onValueChange={(value) => handleChange('testingDuration', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-month">1 Month</SelectItem>
              <SelectItem value="3-months">3 Months</SelectItem>
              <SelectItem value="6-months">6 Months</SelectItem>
              <SelectItem value="custom">Custom Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700 block mb-1">
            Organization Type
          </Label>
          <Select 
            value={formData.organizationType} 
            onValueChange={(value) => handleChange('organizationType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select organization type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="startup">Startup</SelectItem>
              <SelectItem value="sme">Small/Medium Enterprise</SelectItem>
              <SelectItem value="large">Large Corporation</SelectItem>
              <SelectItem value="academic">Academic Institution</SelectItem>
              <SelectItem value="nonprofit">Nonprofit Organization</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={handleSaveDraft}>
          Save Draft
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </form>
  );
}
