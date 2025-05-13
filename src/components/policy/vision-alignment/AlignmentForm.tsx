
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PolicyData } from "@/services/ai/policy/types";

const formSchema = z.object({
  policyName: z.string().optional(),
  policyText: z.string().min(100, {
    message: "Policy text must be at least 100 characters.",
  }),
});

interface AlignmentFormProps {
  onSubmit: (data: PolicyData & { policyText: string }) => void;
  isLoading: boolean;
}

export function AlignmentForm({ onSubmit, isLoading }: AlignmentFormProps) {
  const [policyText, setPolicyText] = useState("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policyName: "",
      policyText: "",
    },
  });

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPolicyText(e.target.value);
  }

  function onSubmitForm(values: z.infer<typeof formSchema>) {
    onSubmit({
      name: values.policyName || "Unnamed Policy",
      description: "",
      sector: "healthcare",
      policyText: policyText
    });
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
            <FormField
              control={form.control}
              name="policyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Policy Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., National Healthcare Strategy 2030" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="policyText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Policy Text</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Paste the policy text here..." 
                      className="min-h-[150px]"
                      value={policyText}
                      onChange={handleTextChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Analyzing..." : "Check Alignment"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
