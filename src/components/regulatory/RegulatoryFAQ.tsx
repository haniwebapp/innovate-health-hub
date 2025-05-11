
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function RegulatoryFAQ() {
  return (
    <Accordion type="single" collapsible className="mt-8">
      <AccordionItem value="faq-1">
        <AccordionTrigger className="text-lg font-medium">How does AI improve regulatory compliance?</AccordionTrigger>
        <AccordionContent className="text-gray-600">
          Our AI system analyzes your innovation against thousands of regulatory requirements, standards, and previous approvals to create a customized compliance pathway. It identifies gaps in documentation, suggests improvements, and continually updates recommendations based on regulatory changes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-2">
        <AccordionTrigger className="text-lg font-medium">What types of innovations can be evaluated?</AccordionTrigger>
        <AccordionContent className="text-gray-600">
          Our system can analyze medical devices, digital health applications, AI/ML-based health solutions, telehealth platforms, diagnostics tools, and therapeutic interventions. The AI adapts recommendations based on the specific characteristics of your innovation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-3">
        <AccordionTrigger className="text-lg font-medium">How accurate are the AI compliance recommendations?</AccordionTrigger>
        <AccordionContent className="text-gray-600">
          Our AI compliance engine has been trained on thousands of regulatory submissions and outcomes, achieving an accuracy rate of over 92% in identifying relevant requirements. All AI recommendations are reviewed by regulatory experts to ensure quality and correctness.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
