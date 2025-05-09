
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InvestmentTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export function InvestmentTabs({ activeTab, setActiveTab }: InvestmentTabsProps) {
  return (
    <Tabs defaultValue={activeTab} className="mb-12" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="startups">For Startups</TabsTrigger>
        <TabsTrigger value="investors">For Investors</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
      </TabsList>
      
      <TabsContent value="startups" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 border-l-4 border-l-moh-green">
            <h3 className="text-xl font-semibold mb-3">Funding Opportunities</h3>
            <p className="mb-4">Access targeted funding opportunities aligned with your healthcare innovation stage and domain.</p>
            <Button className="bg-moh-green hover:bg-moh-darkGreen">Find Opportunities</Button>
          </Card>
          
          <Card className="p-6 border-l-4 border-l-moh-green">
            <h3 className="text-xl font-semibold mb-3">Investor Matching</h3>
            <p className="mb-4">Get matched with investors who specialize in your area of healthcare innovation.</p>
            <Button className="bg-moh-green hover:bg-moh-darkGreen">Connect with Investors</Button>
          </Card>
          
          <Card className="p-6 border-l-4 border-l-moh-green">
            <h3 className="text-xl font-semibold mb-3">Pitch Resources</h3>
            <p className="mb-4">Access tools and templates to create compelling investment pitches.</p>
            <Button className="bg-moh-green hover:bg-moh-darkGreen">View Resources</Button>
          </Card>
          
          <Card className="p-6 border-l-4 border-l-moh-green">
            <h3 className="text-xl font-semibold mb-3">Growth Guidance</h3>
            <p className="mb-4">Receive tailored guidance on scaling your healthcare startup.</p>
            <Button className="bg-moh-green hover:bg-moh-darkGreen">Get Guidance</Button>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="investors" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 border-l-4 border-l-blue-500">
            <h3 className="text-xl font-semibold mb-3">Deal Flow</h3>
            <p className="mb-4">Access a curated pipeline of vetted healthcare innovations ready for investment.</p>
            <Button className="bg-moh-green hover:bg-moh-darkGreen">View Opportunities</Button>
          </Card>
          
          <Card className="p-6 border-l-4 border-l-blue-500">
            <h3 className="text-xl font-semibold mb-3">Due Diligence Support</h3>
            <p className="mb-4">Get comprehensive due diligence resources for healthcare innovation investments.</p>
            <Button className="bg-moh-green hover:bg-moh-darkGreen">Access Tools</Button>
          </Card>
          
          <Card className="p-6 border-l-4 border-l-blue-500">
            <h3 className="text-xl font-semibold mb-3">Market Intelligence</h3>
            <p className="mb-4">Stay informed with the latest trends and opportunities in healthcare innovation.</p>
            <Button className="bg-moh-green hover:bg-moh-darkGreen">View Reports</Button>
          </Card>
          
          <Card className="p-6 border-l-4 border-l-blue-500">
            <h3 className="text-xl font-semibold mb-3">Co-Investment Network</h3>
            <p className="mb-4">Connect with other investors for healthcare innovation co-investment opportunities.</p>
            <Button className="bg-moh-green hover:bg-moh-darkGreen">Join Network</Button>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="resources" className="mt-6">
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">Investment Guides</h3>
            <p className="mb-4">Comprehensive guides for healthcare innovation investment strategies.</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Early-stage Investment Guide</li>
              <li>Digital Health Investment Framework</li>
              <li>Medical Device Investment Strategy</li>
              <li>Biotech Investment Risk Assessment</li>
            </ul>
            <Button className="bg-moh-green hover:bg-moh-darkGreen">Access Guides</Button>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">Funding Events</h3>
            <p className="mb-4">Upcoming pitch events, investor meetings and funding workshops.</p>
            <div className="space-y-3 mb-4">
              <div className="border-b pb-2">
                <p className="font-medium">Healthcare Investment Summit</p>
                <p className="text-sm text-gray-500">June 15-16, 2025 • Riyadh</p>
              </div>
              <div className="border-b pb-2">
                <p className="font-medium">Digital Health Investor Showcase</p>
                <p className="text-sm text-gray-500">July 23, 2025 • Virtual</p>
              </div>
              <div className="border-b pb-2">
                <p className="font-medium">Medical Innovation Funding Workshop</p>
                <p className="text-sm text-gray-500">August 10, 2025 • Jeddah</p>
              </div>
            </div>
            <Button className="bg-moh-green hover:bg-moh-darkGreen">View All Events</Button>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
