
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Clock, Users, Star } from "lucide-react";
import { cn } from '@/lib/utils';

export function FeaturedCourseCarousel() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const featuredCourses = [
    {
      id: '1',
      title: 'Healthcare Innovation Accelerator',
      description: 'Master the skills to rapidly develop and test healthcare innovations from concept to prototype.',
      image: 'https://source.unsplash.com/random/800x600/?medical,innovation',
      students: 324,
      rating: 4.8,
      duration: '4 weeks',
      category: 'Innovation',
      instructor: 'Dr. Sarah Ahmed'
    },
    {
      id: '2',
      title: 'Digital Health Strategy',
      description: 'Learn how to develop and implement a comprehensive digital health strategy for your organization.',
      image: 'https://source.unsplash.com/random/800x600/?technology,healthcare',
      students: 187,
      rating: 4.6,
      duration: '6 weeks',
      category: 'Digital Health',
      instructor: 'Eng. Mohammed Al-Farsi'
    },
    {
      id: '3',
      title: 'Healthcare Regulatory Mastery',
      description: 'Navigate the complex regulatory landscape for healthcare innovations in Saudi Arabia and the GCC.',
      image: 'https://source.unsplash.com/random/800x600/?government,healthcare',
      students: 209,
      rating: 4.7,
      duration: '5 weeks',
      category: 'Regulatory',
      instructor: 'Dr. Norah Al-Qahtani'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredCourses.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredCourses.length - 1 : prevIndex - 1
    );
  };

  const course = featuredCourses[currentIndex];

  return (
    <div className="relative my-8">
      <h2 className="text-2xl font-bold mb-4">{t('learning.featuredCourses')}</h2>
      
      <Card className="overflow-hidden">
        <div className="relative h-80 w-full">
          <img 
            src={course.image} 
            alt={course.title} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
            <Badge className="w-fit mb-2 bg-moh-green hover:bg-moh-green text-white">
              {course.category}
            </Badge>
            <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
            <p className="mb-4 text-gray-200">{course.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{course.students} {t('learning.students')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{course.rating}</span>
                </div>
              </div>
              <Button className="bg-moh-green hover:bg-moh-darkGreen text-white">
                {t('learning.enrollNow')}
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4 z-10">
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-full bg-white/80 hover:bg-white shadow-md"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-full bg-white/80 hover:bg-white shadow-md"
          onClick={nextSlide}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex justify-center mt-4 gap-1">
        {featuredCourses.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-colors",
              index === currentIndex ? "bg-moh-green" : "bg-gray-300"
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
