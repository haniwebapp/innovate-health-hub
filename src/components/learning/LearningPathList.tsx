
import React, { useEffect, useState } from 'react';
import { LearningPath } from '@/types/learning';
import { LearningPathCard } from '@/components/knowledge/LearningPathCard';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { fetchLearningPaths } from '@/services/learningService';

interface LearningPathListProps {
  query: string;
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export function LearningPathList({ query, category, level }: LearningPathListProps) {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadPaths = async () => {
      try {
        setLoading(true);
        // In a real implementation, we'd call the API
        const data = await fetchLearningPaths({ query, category, level });
        setPaths(data);
      } catch (error) {
        console.error("Error loading learning paths:", error);
        toast({
          title: "Error",
          description: "Failed to load learning paths. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadPaths();
  }, [query, category, level, toast]);

  // For now, use mock data for demonstration
  useEffect(() => {
    if (loading) {
      const mockPaths: LearningPath[] = [
        {
          id: "1",
          title: "Healthcare Innovation Fundamentals",
          description: "Learn the basics of innovation in the healthcare sector, including ideation, validation, and implementation.",
          level: "beginner",
          category: "Innovation",
          estimatedHours: 8,
          totalModules: 6,
          completedModules: 2,
          isEnrolled: true,
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "2",
          title: "Regulatory Pathways for Medical Devices",
          description: "Navigate the complex regulatory landscape for medical devices in Saudi Arabia and globally.",
          level: "intermediate",
          category: "Regulatory",
          estimatedHours: 12,
          totalModules: 8,
          completedModules: 0,
          isEnrolled: false,
          featured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "3",
          title: "Healthcare Investment Fundamentals",
          description: "Learn how to attract investment for your healthcare innovation and understand the funding landscape.",
          level: "beginner",
          category: "Investment",
          estimatedHours: 6,
          totalModules: 5,
          completedModules: 0,
          isEnrolled: false,
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "4",
          title: "Advanced AI in Healthcare",
          description: "Explore advanced applications of artificial intelligence in healthcare diagnostics and treatment.",
          level: "advanced",
          category: "Technology",
          estimatedHours: 15,
          totalModules: 10,
          completedModules: 0,
          isEnrolled: false,
          featured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "5",
          title: "Digital Health Solution Development",
          description: "A comprehensive guide to developing, testing, and scaling digital health solutions.",
          level: "intermediate",
          category: "Technology",
          estimatedHours: 10,
          totalModules: 7,
          completedModules: 0,
          isEnrolled: false,
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "6",
          title: "Vision 2030 and Healthcare Innovation",
          description: "Understand how healthcare innovation aligns with Saudi Arabia's Vision 2030 goals.",
          level: "beginner",
          category: "Policy",
          estimatedHours: 4,
          totalModules: 3,
          completedModules: 1,
          isEnrolled: true,
          featured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      // Filter based on search query
      const filtered = query 
        ? mockPaths.filter(path => 
            path.title.toLowerCase().includes(query.toLowerCase()) || 
            path.description.toLowerCase().includes(query.toLowerCase()) ||
            path.category.toLowerCase().includes(query.toLowerCase())
          )
        : mockPaths;
      
      setPaths(filtered);
      setLoading(false);
    }
  }, [loading, query]);

  const handleEnroll = (pathId: string) => {
    toast({
      title: "Enrolled Successfully",
      description: "You have been enrolled in the learning path.",
    });
    
    // Update the paths to mark this one as enrolled
    setPaths(paths.map(path => 
      path.id === pathId 
        ? { ...path, isEnrolled: true, completedModules: 0 } 
        : path
    ));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (paths.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <p className="text-muted-foreground">No learning paths found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paths.map((path) => (
        <LearningPathCard 
          key={path.id} 
          path={path} 
          onEnroll={() => handleEnroll(path.id)}
        />
      ))}
    </div>
  );
}
