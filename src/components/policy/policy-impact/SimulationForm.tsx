import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PolicyData } from "@/services/ai/policy/types";
import { initialPolicyData } from "./utils";

interface SimulationFormProps {
  policyData: PolicyData;
  simulationParams: {
    timeframe: string;
    region: string;
  };
  isSimulating: boolean;
  onPolicyChange: (field: keyof PolicyData, value: any) => void;
  onParamChange: (field: string, value: string) => void;
  onStakeholderInput: (value: string) => void;
  onRemoveStakeholder: (stakeholder: string) => void;
  onRunSimulation: () => void;
}

export function SimulationForm({
  policyData,
  simulationParams,
  isSimulating,
  onPolicyChange,
  onParamChange,
  onStakeholderInput,
  onRemoveStakeholder,
  onRunSimulation
}: SimulationFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="policy-name">Policy Name</Label>
        <Input
          id="policy-name"
          value={policyData.name}
          onChange={(e) => onPolicyChange('name', e.target.value)}
          placeholder="Enter name of policy"
        />
      </div>
      
      <div>
        <Label htmlFor="policy-sector">Sector</Label>
        <Select 
          value={policyData.sector} 
          onValueChange={(value) => onPolicyChange('sector', value)}
        >
          <SelectTrigger id="policy-sector">
            <SelectValue placeholder="Select sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="environment">Environment</SelectItem>
            <SelectItem value="infrastructure">Infrastructure</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="policy-description">Description</Label>
        <Textarea
          id="policy-description"
          value={policyData.description}
          onChange={(e) => onPolicyChange('description', e.target.value)}
          placeholder="Describe the policy in detail"
          rows={4}
        />
      </div>
      
      <div>
        <Label htmlFor="policy-stakeholders">Stakeholders (Optional)</Label>
        <div className="flex space-x-2">
          <Input
            id="policy-stakeholders"
            placeholder="Add a stakeholder and press Enter"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onStakeholderInput((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
          <Button 
            variant="outline" 
            onClick={(e) => {
              const input = document.getElementById('policy-stakeholders') as HTMLInputElement;
              onStakeholderInput(input.value);
              input.value = '';
            }}
          >
            Add
          </Button>
        </div>
        
        {policyData.stakeholders && policyData.stakeholders.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {policyData.stakeholders.map((stakeholder, index) => (
              <Badge key={index} variant="secondary" className="px-2 py-1">
                {stakeholder}
                <button 
                  className="ml-1 text-muted-foreground hover:text-destructive"
                  onClick={() => onRemoveStakeholder(stakeholder)}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="timeframe">Timeframe</Label>
          <Select 
            value={simulationParams.timeframe} 
            onValueChange={(value) => onParamChange('timeframe', value)}
          >
            <SelectTrigger id="timeframe">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 year">1 year</SelectItem>
              <SelectItem value="3 years">3 years</SelectItem>
              <SelectItem value="5 years">5 years</SelectItem>
              <SelectItem value="10 years">10 years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="region">Region</Label>
          <Select 
            value={simulationParams.region} 
            onValueChange={(value) => onParamChange('region', value)}
          >
            <SelectTrigger id="region">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
              <SelectItem value="GCC">Gulf Cooperation Council</SelectItem>
              <SelectItem value="Middle East">Middle East</SelectItem>
              <SelectItem value="Global">Global</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        onClick={onRunSimulation} 
        disabled={isSimulating || !policyData.name || !policyData.description}
        className="w-full"
      >
        {isSimulating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Running Simulation...
          </>
        ) : (
          'Run Impact Simulation'
        )}
      </Button>
    </div>
  );
}
