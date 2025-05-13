
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Search, FolderPlus, MessageCircle, UserPlus } from 'lucide-react';

export function CrossBorderTeams() {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock teams data
  const teams = [
    {
      id: 1,
      name: 'Global AI Diagnostics Initiative',
      nameLoc: 'مبادرة التشخيص بالذكاء الاصطناعي العالمية',
      focus: 'Medical Imaging AI',
      focusLoc: 'الذكاء الاصطناعي للتصوير الطبي',
      members: 8,
      countries: ['Saudi Arabia', 'Germany', 'Singapore', 'USA'],
      countriesLoc: ['المملكة العربية السعودية', 'ألمانيا', 'سنغافورة', 'الولايات المتحدة'],
      description: 'Developing AI algorithms for diagnostic imaging that work across diverse populations and healthcare systems.',
      descriptionLoc: 'تطوير خوارزميات الذكاء الاصطناعي للتصوير التشخيصي التي تعمل عبر مختلف السكان وأنظمة الرعاية الصحية.',
      status: 'active',
      openRoles: true
    },
    {
      id: 2,
      name: 'Connected Care Standards Group',
      nameLoc: 'مجموعة معايير الرعاية المتصلة',
      focus: 'Telehealth Standards',
      focusLoc: 'معايير الرعاية الصحية عن بعد',
      members: 12,
      countries: ['Saudi Arabia', 'UK', 'Japan', 'Canada', 'Australia'],
      countriesLoc: ['المملكة العربية السعودية', 'المملكة المتحدة', 'اليابان', 'كندا', 'أستراليا'],
      description: 'Working on global interoperability standards for telehealth solutions across different regulatory frameworks.',
      descriptionLoc: 'العمل على معايير التشغيل البيني العالمية لحلول الرعاية الصحية عن بعد عبر أطر تنظيمية مختلفة.',
      status: 'active',
      openRoles: false
    },
    {
      id: 3,
      name: 'Medical Device Global Access Initiative',
      nameLoc: 'مبادرة الوصول العالمي للأجهزة الطبية',
      focus: 'Regulatory Harmonization',
      focusLoc: 'تنسيق اللوائح التنظيمية',
      members: 15,
      countries: ['Saudi Arabia', 'Switzerland', 'Brazil', 'South Africa', 'India', 'China'],
      countriesLoc: ['المملكة العربية السعودية', 'سويسرا', 'البرازيل', 'جنوب أفريقيا', 'الهند', 'الصين'],
      description: 'Collaborating to reduce regulatory barriers for medical devices across emerging and developed markets.',
      descriptionLoc: 'التعاون لتقليل الحواجز التنظيمية للأجهزة الطبية عبر الأسواق الناشئة والمتطورة.',
      status: 'recruiting',
      openRoles: true
    }
  ];
  
  // Filter teams based on search query
  const filteredTeams = teams.filter(team => 
    searchQuery === '' || 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'فرق التعاون عبر الحدود' : 'Cross-Border Teams'}</CardTitle>
          <CardDescription>
            {isRTL 
              ? 'انضم إلى فرق دولية تعمل على ابتكارات وتحديات الرعاية الصحية العالمية'
              : 'Join international teams working on global healthcare innovations and challenges'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4`} />
                <Input
                  placeholder={isRTL ? 'ابحث في الفرق حسب الموضوع أو الاسم...' : 'Search teams by topic or name...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${isRTL ? 'pr-10 text-right' : 'pl-10'}`}
                />
              </div>
              
              <Button>
                <FolderPlus className="h-4 w-4 mr-2" />
                {isRTL ? 'إنشاء فريق' : 'Create Team'}
              </Button>
            </div>
            
            <div className="text-sm text-gray-500 mb-4">
              {isRTL 
                ? `${filteredTeams.length} فرق وجدت`
                : `${filteredTeams.length} teams found`}
            </div>
            
            {filteredTeams.map((team) => (
              <Card key={team.id} className="mb-6 last:mb-0 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium">
                          {isRTL ? team.nameLoc : team.name}
                        </h3>
                        <Badge className={team.status === 'recruiting' 
                          ? "bg-green-100 text-green-800" 
                          : "bg-blue-100 text-blue-800"}>
                          {team.status === 'recruiting' 
                            ? (isRTL ? 'يوظف' : 'Recruiting') 
                            : (isRTL ? 'نشط' : 'Active')}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        <span className="font-medium">{isRTL ? 'التركيز: ' : 'Focus: '}</span>
                        {isRTL ? team.focusLoc : team.focus}
                      </p>
                      
                      <p className="text-gray-600 mb-4">
                        {isRTL ? team.descriptionLoc : team.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-1 mb-4">
                        <Users className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600 mr-2">
                          {team.members} {isRTL ? 'أعضاء' : 'members'}
                        </span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-sm text-gray-600">
                          {isRTL ? 'من' : 'From'}{' '}
                          {(isRTL ? team.countriesLoc : team.countries).length} {isRTL ? 'دول' : 'countries'}
                        </span>
                      </div>
                      
                      <div className="flex -space-x-2 rtl:space-x-reverse overflow-hidden mb-4">
                        {Array.from({ length: Math.min(5, team.members) }).map((_, idx) => (
                          <Avatar key={idx} className="border-2 border-white h-8 w-8">
                            <AvatarFallback className="text-xs bg-moh-green text-white">
                              {idx + 1}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {team.members > 5 && (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 border-2 border-white text-xs font-medium">
                            +{team.members - 5}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {(isRTL ? team.countriesLoc : team.countries).map((country, idx) => (
                          <Badge key={idx} variant="outline" className="bg-gray-50">
                            {country}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 flex flex-col gap-3">
                      <Button>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {isRTL ? 'تواصل مع الفريق' : 'Contact Team'}
                      </Button>
                      
                      {team.openRoles && (
                        <Button variant="outline">
                          <UserPlus className="h-4 w-4 mr-2" />
                          {isRTL ? 'عرض الأدوار المفتوحة' : 'View Open Roles'}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredTeams.length === 0 && (
              <div className="text-center py-12 border border-dashed rounded-md">
                <div className="text-moh-green mb-2">
                  <Users className="h-10 w-10 mx-auto" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {isRTL ? 'لم يتم العثور على فرق' : 'No teams found'}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {isRTL 
                    ? 'حاول تعديل معايير البحث أو إنشاء فريق جديد.'
                    : 'Try adjusting your search criteria or create a new team.'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
