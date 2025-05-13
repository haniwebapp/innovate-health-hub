
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export function RegulatoryFAQ() {
  // FAQ data
  const faqs = [
    {
      question: "What is a Regulatory Sandbox?",
      answer: "A regulatory sandbox is a controlled environment that allows healthcare innovators to test new products, services, or business models under relaxed regulatory requirements but with appropriate safeguards and supervision."
    },
    {
      question: "Who can apply for the Regulatory Sandbox program?",
      answer: "The program is open to healthcare startups, established companies, research institutions, and individual innovators with technologies that address healthcare challenges and require regulatory guidance."
    },
    {
      question: "What types of innovations qualify for the Sandbox?",
      answer: "Medical devices, digital health applications, AI-based diagnostic tools, telemedicine platforms, health monitoring systems, and other healthcare innovations that may require regulatory approval."
    },
    {
      question: "How long does the Sandbox program last?",
      answer: "The standard testing period is 6-12 months, depending on the complexity of the innovation and the regulatory pathway required."
    },
    {
      question: "What support will I receive during the program?",
      answer: "Participants receive regulatory guidance, compliance assistance, access to expert advisors, expedited review processes, and feedback on documentation requirements."
    },
    {
      question: "Will my data and intellectual property be protected?",
      answer: "Yes, all applications and associated information are kept confidential. Participants retain full ownership of their intellectual property rights."
    }
  ];

  return (
    <Card className="p-6 mt-8 border-moh-gold/30">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="h-5 w-5 text-moh-green" />
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}
