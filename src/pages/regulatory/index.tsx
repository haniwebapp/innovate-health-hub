
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck, Search, Shield } from 'lucide-react';

export default function RegulatoryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-moh-darkGreen mb-6">
              Regulatory Sandbox
            </h1>
            <p className="text-xl text-slate-700 mb-8">
              Test your healthcare innovations in a controlled environment with real-time regulatory guidance and support.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-moh-green hover:bg-moh-darkGreen">
                <Link to="/register">Apply for Sandbox</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Sign In to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use Our Regulatory Sandbox?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="bg-moh-lightGreen p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileCheck className="text-moh-darkGreen h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Streamlined Compliance</h3>
              <p className="text-slate-600">
                Navigate regulatory requirements with ease using our guided compliance process and expert support.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="bg-moh-lightGreen p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="text-moh-darkGreen h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe Testing Environment</h3>
              <p className="text-slate-600">
                Test your innovations in a controlled environment with appropriate safeguards and guidelines.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="bg-moh-lightGreen p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Search className="text-moh-darkGreen h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Market Insights</h3>
              <p className="text-slate-600">
                Gain valuable insights on how your innovation performs in real-world healthcare settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">The Sandbox Process</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Process steps with connecting line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-moh-green/30 -translate-x-1/2"></div>
              
              <div className="grid grid-cols-1 gap-12">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 md:w-1/2">
                    <span className="inline-block bg-moh-green text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center mb-2">1</span>
                    <h3 className="text-xl font-semibold mb-2">Application</h3>
                    <p className="text-slate-600">Submit your application with details about your innovation and testing goals.</p>
                  </div>
                  <div className="hidden md:block w-1/2"></div>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="hidden md:block w-1/2"></div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 md:w-1/2">
                    <span className="inline-block bg-moh-green text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center mb-2">2</span>
                    <h3 className="text-xl font-semibold mb-2">Assessment</h3>
                    <p className="text-slate-600">Our regulatory experts review your application and provide tailored guidance.</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 md:w-1/2">
                    <span className="inline-block bg-moh-green text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center mb-2">3</span>
                    <h3 className="text-xl font-semibold mb-2">Testing Phase</h3>
                    <p className="text-slate-600">Test your innovation in a controlled environment with regulatory oversight.</p>
                  </div>
                  <div className="hidden md:block w-1/2"></div>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="hidden md:block w-1/2"></div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 md:w-1/2">
                    <span className="inline-block bg-moh-green text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center mb-2">4</span>
                    <h3 className="text-xl font-semibold mb-2">Evaluation</h3>
                    <p className="text-slate-600">Receive comprehensive evaluation and guidance for full market deployment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-moh-green text-white p-8 md:p-12 rounded-lg text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Innovate with Confidence?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join our regulatory sandbox and accelerate your path to market approval.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/register" className="flex items-center">
                Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
