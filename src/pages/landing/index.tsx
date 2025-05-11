
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-moh-darkGreen">
            Healthcare Innovation Platform
          </h1>
          
          <p className="text-xl max-w-3xl mx-auto text-slate-600">
            Accelerating healthcare innovation through collaboration, investment, and regulatory support.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button asChild size="lg">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/register">Create Account</Link>
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-medium mb-2">Regulatory Sandbox</h3>
              <p className="text-slate-500">Test innovations in a controlled environment with regulatory guidance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-medium mb-2">Investment Hub</h3>
              <p className="text-slate-500">Connect with investors and secure funding for your healthcare innovation.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-medium mb-2">Knowledge Center</h3>
              <p className="text-slate-500">Access resources and expertise to accelerate your innovation journey.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
