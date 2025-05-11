
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function RegulatoryFAQ() {
  const faqs = [
    {
      question: "What is a regulatory sandbox?",
      answer: "A regulatory sandbox is a controlled environment that allows healthcare innovators to test their products, services, or business models with temporary regulatory flexibility under close supervision. It helps streamline the regulatory process while ensuring patient safety and data protection."
    },
    {
      question: "Who is eligible to apply for the sandbox program?",
      answer: "Healthcare innovators, startups, SMEs, and established companies with novel healthcare solutions that face specific regulatory challenges are eligible. The innovation should address a clear healthcare need and demonstrate potential benefits to patients or healthcare systems."
    },
    {
      question: "How long does the sandbox program last?",
      answer: "The standard testing period is 3-6 months, depending on the complexity of your innovation and the regulatory challenges involved. Extensions may be granted based on progress and specific needs."
    },
    {
      question: "What support will I receive during the sandbox program?",
      answer: "Participants receive personalized regulatory guidance, access to experts, streamlined testing processes, and a clear pathway to full compliance. You'll also benefit from regular feedback sessions and simplified documentation requirements."
    },
    {
      question: "Does participation guarantee regulatory approval?",
      answer: "No, participation in the sandbox does not guarantee regulatory approval, but it significantly improves your chances by helping you address compliance issues early and develop a strong regulatory strategy."
    },
  ];

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold text-moh-darkGreen mb-6">
        Frequently Asked Questions
      </h2>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
