
import { Sparkles, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function InnovationCallToAction() {
  return (
    <section className="py-16 bg-gradient-to-r from-moh-lightGreen to-moh-lightGold">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl border border-white/40 shadow-lg">
            <div className="text-center mb-6">
              <div className="inline-flex mb-4 p-3 bg-white/40 backdrop-blur-sm rounded-full">
                <Sparkles size={28} className="text-moh-darkGreen" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">
                Have an innovative healthcare solution?
              </h2>
              <p className="text-gray-700 mb-8">
                Submit your innovation to be featured on our platform and connect with investors, 
                regulators, and potential partners across Saudi Arabia's healthcare ecosystem.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-moh-green hover:bg-moh-darkGreen text-white"
                  asChild
                >
                  <Link to="/innovations/submit">
                    Submit Your Innovation
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-moh-darkGreen text-moh-darkGreen hover:bg-white/50"
                >
                  Learn About the Process
                </Button>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-moh-darkGreen/10 rounded-lg">
              <div className="flex items-center mb-3">
                <Lightbulb size={18} className="text-moh-gold mr-2" />
                <h3 className="text-lg font-medium text-moh-darkGreen">
                  AI-Powered Innovation Marketplace
                </h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Our platform uses advanced AI to match your healthcare innovations with the right investors,
                regulatory pathways, and implementation opportunities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white/60 p-3 rounded-md">
                  <p className="text-xs text-gray-600 mb-1">Investor Matching</p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-moh-green" style={{ width: "85%" }} />
                  </div>
                </div>
                <div className="bg-white/60 p-3 rounded-md">
                  <p className="text-xs text-gray-600 mb-1">Regulatory Guidance</p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-moh-gold" style={{ width: "92%" }} />
                  </div>
                </div>
                <div className="bg-white/60 p-3 rounded-md">
                  <p className="text-xs text-gray-600 mb-1">Market Analysis</p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-moh-darkGreen" style={{ width: "78%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
