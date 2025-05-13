
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, Clock, Globe } from 'lucide-react';

export function GlobalEvents() {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock events data
  const events = [
    {
      id: 1,
      title: 'Global Healthcare Innovation Summit',
      titleLoc: 'قمة الابتكار في الرعاية الصحية العالمية',
      location: 'Dubai, UAE',
      locationLoc: 'دبي، الإمارات العربية المتحدة',
      date: '2025-06-15',
      dateFormatted: 'June 15-17, 2025',
      dateFormattedLoc: '15-17 يونيو 2025',
      description: 'Connect with healthcare innovators from around the world to discuss cutting-edge technologies and cross-border collaboration opportunities.',
      descriptionLoc: 'تواصل مع مبتكري الرعاية الصحية من جميع أنحاء العالم لمناقشة التقنيات المتطورة وفرص التعاون عبر الحدود.',
      attendees: 1200,
      type: 'conference',
      status: 'upcoming',
      languages: ['English', 'Arabic', 'French'],
      languagesLoc: ['الإنجليزية', 'العربية', 'الفرنسية'],
      image: '/event-summit.jpg'
    },
    {
      id: 2,
      title: 'International MedTech Regulatory Workshop',
      titleLoc: 'ورشة عمل التنظيم الدولي للتكنولوجيا الطبية',
      location: 'Singapore',
      locationLoc: 'سنغافورة',
      date: '2025-08-22',
      dateFormatted: 'August 22-23, 2025',
      dateFormattedLoc: '22-23 أغسطس 2025',
      description: 'A focused workshop on navigating regulatory frameworks across Asian markets, featuring experts from major regulatory bodies.',
      descriptionLoc: 'ورشة عمل مركزة حول التنقل في الأطر التنظيمية عبر الأسواق الآسيوية، بمشاركة خبراء من الهيئات التنظيمية الرئيسية.',
      attendees: 450,
      type: 'workshop',
      status: 'upcoming',
      languages: ['English', 'Mandarin', 'Japanese'],
      languagesLoc: ['الإنجليزية', 'الماندرين', 'اليابانية'],
      image: '/event-workshop.jpg'
    },
    {
      id: 3,
      title: 'EU-GCC Healthcare Innovation Exchange',
      titleLoc: 'تبادل الابتكار في الرعاية الصحية بين الاتحاد الأوروبي ودول مجلس التعاون الخليجي',
      location: 'Riyadh, Saudi Arabia',
      locationLoc: 'الرياض، المملكة العربية السعودية',
      date: '2025-04-10',
      dateFormatted: 'April 10-12, 2025',
      dateFormattedLoc: '10-12 أبريل 2025',
      description: 'Bilateral exchange program focusing on fostering innovation partnerships between European and Gulf healthcare ecosystems.',
      descriptionLoc: 'برنامج تبادل ثنائي يركز على تعزيز شراكات الابتكار بين أنظمة الرعاية الصحية الأوروبية والخليجية.',
      attendees: 350,
      type: 'exchange',
      status: 'upcoming',
      languages: ['English', 'Arabic', 'German'],
      languagesLoc: ['الإنجليزية', 'العربية', 'الألمانية'],
      image: '/event-exchange.jpg'
    },
    {
      id: 4,
      title: 'Global Digital Health Symposium',
      titleLoc: 'ندوة الصحة الرقمية العالمية',
      location: 'Virtual',
      locationLoc: 'افتراضي',
      date: '2025-05-05',
      dateFormatted: 'May 5-7, 2025',
      dateFormattedLoc: '5-7 مايو 2025',
      description: 'A virtual symposium bringing together digital health entrepreneurs, investors, and policymakers from across continents.',
      descriptionLoc: 'ندوة افتراضية تجمع بين رواد الأعمال في مجال الصحة الرقمية والمستثمرين وصانعي السياسات من مختلف القارات.',
      attendees: 2000,
      type: 'virtual',
      status: 'upcoming',
      languages: ['English', 'Spanish', 'Arabic', 'French', 'Portuguese'],
      languagesLoc: ['الإنجليزية', 'الإسبانية', 'العربية', 'الفرنسية', 'البرتغالية'],
      image: '/event-virtual.jpg'
    }
  ];
  
  const filteredEvents = events.filter(event => event.status === activeTab);
  
  const getEventTypeBadge = (type: string) => {
    switch(type) {
      case 'conference':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{isRTL ? 'مؤتمر' : 'Conference'}</Badge>;
      case 'workshop':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">{isRTL ? 'ورشة عمل' : 'Workshop'}</Badge>;
      case 'exchange':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">{isRTL ? 'تبادل' : 'Exchange'}</Badge>;
      case 'virtual':
        return <Badge className="bg-green-100 text-green-800 border-green-200">{isRTL ? 'افتراضي' : 'Virtual'}</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'الفعاليات العالمية' : 'Global Events'}</CardTitle>
          <CardDescription>
            {isRTL 
              ? 'اكتشف فعاليات الرعاية الصحية الدولية وفرص التواصل'
              : 'Discover international healthcare events and networking opportunities'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">{isRTL ? 'القادمة' : 'Upcoming'}</TabsTrigger>
              <TabsTrigger value="registered">{isRTL ? 'مسجل' : 'Registered'}</TabsTrigger>
              <TabsTrigger value="past">{isRTL ? 'سابقة' : 'Past'}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <div className="space-y-6">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3 h-48 md:h-auto bg-gray-200 relative">
                          {event.image ? (
                            <img 
                              src={event.image} 
                              alt={isRTL ? event.titleLoc : event.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Calendar className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="md:w-2/3 p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                            <div>
                              <h3 className="text-xl font-medium mb-1">
                                {isRTL ? event.titleLoc : event.title}
                              </h3>
                              <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-y-1 gap-x-4">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{isRTL ? event.dateFormattedLoc : event.dateFormatted}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{isRTL ? event.locationLoc : event.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  <span>{event.attendees}+ {isRTL ? 'مشارك' : 'Attendees'}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              {getEventTypeBadge(event.type)}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4">
                            {isRTL ? event.descriptionLoc : event.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Globe className="h-4 w-4 text-gray-500" />
                            {(isRTL ? event.languagesLoc : event.languages).map((lang, idx) => (
                              <Badge key={idx} variant="outline" className="bg-gray-50">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Button>
                              {isRTL ? 'التسجيل' : 'Register'}
                            </Button>
                            <Button variant="outline">
                              {isRTL ? 'مزيد من التفاصيل' : 'More Details'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 border border-dashed rounded-md">
                    <div className="text-moh-green mb-2">
                      <Calendar className="h-10 w-10 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      {isRTL ? 'لا توجد فعاليات قادمة' : 'No upcoming events'}
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      {isRTL 
                        ? 'تحقق مرة أخرى قريبًا للاطلاع على الفعاليات العالمية القادمة في مجال ابتكارات الرعاية الصحية.'
                        : 'Check back soon for upcoming global events in healthcare innovation.'}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="registered">
              <div className="text-center py-12 border border-dashed rounded-md">
                <div className="text-moh-green mb-2">
                  <Clock className="h-10 w-10 mx-auto" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {isRTL ? 'لم تسجل في أي فعاليات بعد' : 'You haven\'t registered for any events yet'}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  {isRTL 
                    ? 'تصفح الفعاليات القادمة وسجل للمشاركة في الفعاليات العالمية.'
                    : 'Browse upcoming events and register to participate in global events.'}
                </p>
                <Button onClick={() => setActiveTab('upcoming')}>
                  {isRTL ? 'استعراض الفعاليات القادمة' : 'Browse Upcoming Events'}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              <div className="text-center py-12 border border-dashed rounded-md">
                <div className="text-moh-green mb-2">
                  <Clock className="h-10 w-10 mx-auto" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {isRTL ? 'لا توجد فعاليات سابقة' : 'No past events'}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {isRTL 
                    ? 'ستظهر الفعاليات السابقة التي شاركت فيها هنا.'
                    : 'Past events you\'ve participated in will appear here.'}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
