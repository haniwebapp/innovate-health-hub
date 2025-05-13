
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollFadeIn } from '@/components/animations/ScrollFadeIn';
import { DollarSign, Coins, LineChart, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const FundingOpportunitiesSection = () => {
  const navigate = useNavigate();

  const fundingTypes = [
    {
      title: "Government Grants",
      description: "Access non-dilutive funding from Saudi government initiatives supporting healthcare innovation",
      icon: <Landmark className="h-8 w-8 text-white" />,
      color: "bg-moh-darkGreen",
      amount: "Up to SAR 2M"
    },
    {
      title: "Venture Capital",
      description: "Connect with leading VC firms specializing in healthcare and digital health innovations",
      icon: <LineChart className="h-8 w-8 text-white" />,
      color: "bg-moh-green",
      amount: "Series A-C"
    },
    {
      title: "Angel Investment",
      description: "Pitch to our network of angel investors interested in early-stage healthcare startups",
      icon: <Coins className="h-8 w-8 text-white" />,
      color: "bg-moh-gold",
      amount: "SAR 100K-500K"
    },
    {
      title: "Innovation Challenges",
      description: "Participate in funded challenges with prizes and implementation opportunities",
      icon: <DollarSign className="h-8 w-8 text-white" />,
      color: "bg-moh-darkGold",
      amount: "Prizes + Support"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="container mx-auto px-4">
        <ScrollFadeIn>
          <div className="text-center mb-12">
            <span className="text-moh-green font-semibold text-sm uppercase tracking-wider">Financial Support</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Funding Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the right funding sources to accelerate your healthcare innovation journey, from seed funding to growth capital.
            </p>
          </div>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {fundingTypes.map((item, index) => (
            <motion.div
              key={index}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-t-4" style={{ borderTopColor: item.color.replace('bg-', '') === 'bg-moh-green' ? '#10B981' : 
                                                          item.color.replace('bg-', '') === 'bg-moh-darkGreen' ? '#047857' :
                                                          item.color.replace('bg-', '') === 'bg-moh-gold' ? '#F59E0B' : '#C3A86B' }}>
                <CardContent className="pt-6 pb-4 px-5 h-full flex flex-col">
                  <div className={`${item.color} p-3 rounded-full inline-flex w-14 h-14 items-center justify-center mb-4`}>
                    {item.icon}
                  </div>
                  
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-600 mb-3 flex-grow">{item.description}</p>
                  </div>
                  
                  <div className="bg-gray-50 py-2 px-3 rounded-md inline-block self-start mt-2">
                    <span className="text-gray-700 font-medium">{item.amount}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Funding Readiness Program</h3>
              <p className="text-gray-600 mb-6">
                Our step-by-step program helps healthcare innovators become investment-ready with pitch coaching, financial planning, and direct introductions to potential investors aligned with your healthcare innovation.
              </p>
              <Button 
                onClick={() => navigate("/investment")} 
                className="bg-moh-green hover:bg-moh-darkGreen"
              >
                Join the Program
              </Button>
            </div>
            
            <motion.div
              className="bg-gray-50 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-lg mb-4">Success Metrics</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Startups Funded</span>
                    <span className="font-medium">78+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-moh-green h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Total Investment</span>
                    <span className="font-medium">SAR 120M+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-moh-gold h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Investment Readiness</span>
                    <span className="font-medium">92% Success</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-moh-darkGold h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingOpportunitiesSection;
