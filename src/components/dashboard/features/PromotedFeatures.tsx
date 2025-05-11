
import { Beaker, Lightbulb } from "lucide-react";
import ActionCard from "./ActionCard";

export default function PromotedFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ActionCard
        title="Regulatory Sandbox Application"
        description="Test your innovations in a controlled regulatory environment"
        content="Apply for the sandbox testing program to validate your healthcare innovation against regulatory requirements with expert guidance."
        badges={["Regulatory", "Testing"]}
        link="/dashboard/regulatory/applications/new"
        linkText="Apply for Sandbox"
        icon={Beaker}
        variant="green"
        delay={0.1}
      />
      
      <ActionCard
        title="Submit Your Innovation"
        description="Share your healthcare solution with our ecosystem"
        content="Submit your innovation to be featured on our platform and connect with investors, regulators, and potential partners across Saudi Arabia's healthcare ecosystem."
        badges={["Innovation", "Showcase"]}
        link="/innovations/submit"
        linkText="Submit Innovation"
        icon={Lightbulb}
        variant="gold"
        delay={0.2}
      />
    </div>
  );
}
