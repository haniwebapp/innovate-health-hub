
import React, { useEffect, useState } from 'react';
import { InnovationGuideService } from '@/services/ai/innovation/InnovationGuideService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lightbulb, ArrowRight, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

interface SavedGuide {
  id: string;
  title: string;
  description: string;
  created_at: string;
  innovation_type: string;
  innovation_stage: string;
}

export default function SavedGuidesPage() {
  const [guides, setGuides] = useState<SavedGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const data = await InnovationGuideService.listGuides();
        setGuides(data);
      } catch (error) {
        console.error("Failed to fetch guides:", error);
        toast({
          title: "Error",
          description: "Failed to load saved guides",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, [toast]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Unknown date';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-moh-darkGreen">Saved Innovation Guides</h1>
            <p className="text-gray-600 mt-2">Access your previously generated innovation guidance</p>
          </div>
          <Button asChild className="bg-moh-green hover:bg-moh-darkGreen">
            <Link to="/innovations/guide">Generate New Guide</Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-moh-green"></div>
          </div>
        ) : guides.length === 0 ? (
          <motion.div 
            className="text-center py-16 bg-white rounded-lg border border-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-moh-lightGreen/30 text-moh-green">
              <Lightbulb size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No guides saved yet</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Generate your first innovation guide to get personalized guidance for your healthcare innovation.
            </p>
            <Button asChild className="bg-moh-green hover:bg-moh-darkGreen">
              <Link to="/innovations/guide">Create Your First Guide</Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {guides.map((guide) => (
              <motion.div key={guide.id} variants={itemVariants}>
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-300 border-moh-green/10">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="bg-moh-lightGreen/20 text-moh-green px-3 py-1 rounded-full text-xs font-medium">
                        {guide.innovation_stage}
                      </div>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock size={14} className="mr-1" />
                        {formatDate(guide.created_at)}
                      </div>
                    </div>
                    <CardTitle className="mt-3 text-xl text-moh-darkGreen">
                      {guide.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="bg-moh-lightGold/10 text-moh-darkGold px-2 py-1 rounded text-xs inline-flex">
                      {guide.innovation_type}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 border-t">
                    <Button variant="ghost" className="ml-auto text-moh-green hover:text-moh-darkGreen group" asChild>
                      <Link to={`/innovations/guides/${guide.id}`}>
                        View Guide
                        <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
