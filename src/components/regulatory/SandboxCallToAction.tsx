
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SandboxCallToAction() {
  return (
    <div className="bg-moh-darkGreen rounded-xl p-6 md:p-8 text-white mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            Healthcare Regulatory Sandbox Program
          </h3>
          <p className="mt-2 text-white/80 max-w-2xl">
            Apply to test your healthcare innovation in our regulatory sandbox environment. 
            Benefit from expedited regulatory guidance, expert support, and a clear pathway to compliance.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button 
            asChild
            size="lg" 
            className="bg-white text-moh-darkGreen hover:bg-white/90"
          >
            <Link to="/dashboard/regulatory/applications/new">
              Apply for Sandbox
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
