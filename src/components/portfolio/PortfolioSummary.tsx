
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, ChevronRight } from "lucide-react";

export function PortfolioSummary({ portfolioItems }: { portfolioItems: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border-moh-green/10 overflow-hidden shadow-md">
        <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-white pb-2">
          <CardTitle className="text-xl font-playfair text-moh-darkGreen">Portfolio Summary</CardTitle>
          <CardDescription>Total investments: {portfolioItems.length}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-moh-lightGreen/20 p-4 rounded-lg border border-moh-green/10">
              <div className="text-sm text-muted-foreground">Total Invested</div>
              <div className="text-2xl font-bold text-moh-darkGreen mt-1">$12.55M</div>
            </div>
            
            <div className="bg-moh-lightGold/20 p-4 rounded-lg border border-moh-gold/10">
              <div className="text-sm text-muted-foreground">Average ROI</div>
              <div className="text-2xl font-bold text-moh-darkGreen mt-1">+21.3%</div>
            </div>
            
            <div className="bg-moh-lightGreen/20 p-4 rounded-lg border border-moh-green/10">
              <div className="text-sm text-muted-foreground">Leading Sector</div>
              <div className="text-2xl font-bold text-moh-darkGreen mt-1">Digital Health</div>
            </div>
            
            <div className="bg-moh-lightGold/20 p-4 rounded-lg border border-moh-gold/10">
              <div className="text-sm text-muted-foreground">Top Performing</div>
              <div className="text-2xl font-bold text-moh-darkGreen mt-1">SmartDiagnosis</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2 pb-4">
          <Button variant="outline" className="w-full border-moh-green/20 text-moh-darkGreen">
            <BarChart3 className="h-4 w-4 mr-2 text-moh-green" />
            View Detailed Analytics
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
