
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, Download, Globe, BookOpen, UserCheck, FileUp } from 'lucide-react';

export function KnowledgeExchange() {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('resources');
  
  // Mock resources data
  const resources = [
    {
      id: 1,
      title: 'Global Regulatory Harmonization Guide',
      titleLoc: 'دليل توافق اللوائح التنظيمية العالمية',
      type: 'guide',
      languages: ['English', 'Arabic', 'French'],
      languagesLoc: ['الإنجليزية', 'العربية', 'الفرنسية'],
      author: 'International Medical Device Regulators Forum',
      authorLoc: 'منتدى منظمي الأجهزة الطبية الدولي',
      description: 'Comprehensive guide on navigating regulatory differences and similarities across major global markets.',
      descriptionLoc: 'دليل شامل حول التنقل بين الاختلافات والتشابهات التنظيمية عبر الأسواق العالمية الرئيسية.',
      downloads: 3240,
      dateAdded: '2025-03-15'
    },
    {
      id: 2,
      title: 'Cross-Border Clinical Trial Design',
      titleLoc: 'تصميم التجارب السريرية عبر الحدود',
      type: 'whitepaper',
      languages: ['English', 'Spanish', 'Chinese', 'Arabic'],
      languagesLoc: ['الإنجليزية', 'الإسبانية', 'الصينية', 'العربية'],
      author: 'Global Health Research Consortium',
      authorLoc: 'اتحاد أبحاث الصحة العالمية',
      description: 'Best practices for designing and implementing clinical trials across multiple countries and regulatory jurisdictions.',
      descriptionLoc: 'أفضل الممارسات لتصميم وتنفيذ التجارب السريرية عبر العديد من البلدان والولايات التنظيمية.',
      downloads: 1850,
      dateAdded: '2025-02-22'
    },
    {
      id: 3,
      title: 'International Reimbursement Pathways',
      titleLoc: 'مسارات السداد الدولية',
      type: 'report',
      languages: ['English', 'German', 'Japanese', 'Arabic'],
      languagesLoc: ['الإنجليزية', 'الألمانية', 'اليابانية', 'العربية'],
      author: 'Healthcare Economics Institute',
      authorLoc: 'معهد اقتصاديات الرعاية الصحية',
      description: 'Analysis of reimbursement mechanisms for medical innovations across different healthcare systems worldwide.',
      descriptionLoc: 'تحليل آليات السداد لابتكارات الرعاية الصحية عبر أنظمة الرعاية الصحية المختلفة في جميع أنحاء العالم.',
      downloads: 2105,
      dateAdded: '2025-01-30'
    },
    {
      id: 4,
      title: 'Global Digital Health Standards Framework',
      titleLoc: 'إطار معايير الصحة الرقمية العالمية',
      type: 'framework',
      languages: ['English', 'Arabic', 'Korean', 'Portuguese'],
      languagesLoc: ['الإنجليزية', 'العربية', 'الكورية', 'البرتغالية'],
      author: 'Digital Health Coalition',
      authorLoc: 'تحالف الصحة الرقمية',
      description: 'Framework for interoperability and security standards for digital health solutions operating across borders.',
      descriptionLoc: 'إطار لمعايير التشغيل البيني والأمان لحلول الصحة الرقمية التي تعمل عبر الحدود.',
      downloads: 4320,
      dateAdded: '2025-04-10'
    }
  ];
  
  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Ahmed',
      nameLoc: 'د. سارة أحمد',
      title: 'Global Regulatory Advisor',
      titleLoc: 'مستشارة التنظيم العالمية',
      expertise: ['Medical Devices', 'EU MDR', 'GCC Regulations'],
      expertiseLoc: ['الأجهزة الطبية', 'لائحة الأجهزة الطبية الأوروبية', 'لوائح دول الخليج'],
      languages: ['English', 'Arabic', 'French'],
      languagesLoc: ['الإنجليزية', 'العربية', 'الفرنسية'],
      availableHours: 4,
      description: 'Specialized in helping companies navigate regulatory pathways across EU and Middle East markets.',
      descriptionLoc: 'متخصصة في مساعدة الشركات على التنقل في المسارات التنظيمية عبر أسواق الاتحاد الأوروبي والشرق الأوسط.'
    },
    {
      id: 2,
      name: 'John Lee, PhD',
      nameLoc: 'جون لي، دكتوراه',
      title: 'Global Market Access Expert',
      titleLoc: 'خبير الوصول إلى السوق العالمية',
      expertise: ['Market Entry Strategy', 'Asian Markets', 'Reimbursement'],
      expertiseLoc: ['استراتيجية دخول السوق', 'الأسواق الآسيوية', 'السداد'],
      languages: ['English', 'Mandarin', 'Korean'],
      languagesLoc: ['الإنجليزية', 'الماندرين', 'الكورية'],
      availableHours: 2,
      description: 'Helps healthcare innovators develop strategies for entering Asian markets with focus on Japan, Korea, and China.',
      descriptionLoc: 'يساعد مبتكري الرعاية الصحية على تطوير استراتيجيات لدخول الأسواق الآسيوية مع التركيز على اليابان وكوريا والصين.'
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      nameLoc: 'ماريا رودريغيز',
      title: 'Clinical Research Coordinator',
      titleLoc: 'منسقة الأبحاث السريرية',
      expertise: ['Global Clinical Trials', 'FDA Submissions', 'Latin American Markets'],
      expertiseLoc: ['التجارب السريرية العالمية', 'تقديمات إدارة الغذاء والدواء', 'أسواق أمريكا اللاتينية'],
      languages: ['English', 'Spanish', 'Portuguese'],
      languagesLoc: ['الإنجليزية', 'الإسبانية', 'البرتغالية'],
      availableHours: 3,
      description: 'Expert in designing and running clinical trials that meet requirements across multiple regulatory jurisdictions.',
      descriptionLoc: 'خبيرة في تصميم وإدارة التجارب السريرية التي تلبي المتطلبات عبر العديد من الولايات التنظيمية.'
    }
  ];
  
  // Filter resources or mentors based on search query and active tab
  const filteredResources = resources.filter(resource => 
    searchQuery === '' || 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredMentors = mentors.filter(mentor => 
    searchQuery === '' || 
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase())) ||
    mentor.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'guide':
        return <BookOpen className="h-6 w-6 text-blue-500" />;
      case 'whitepaper':
        return <FileText className="h-6 w-6 text-purple-500" />;
      case 'report':
        return <FileText className="h-6 w-6 text-amber-500" />;
      case 'framework':
        return <FileText className="h-6 w-6 text-green-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'تبادل المعرفة العالمي' : 'Global Knowledge Exchange'}</CardTitle>
          <CardDescription>
            {isRTL 
              ? 'تبادل المعرفة والخبرات مع شركاء دوليين والوصول إلى موارد متعددة اللغات'
              : 'Exchange knowledge and expertise with international partners and access multilingual resources'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="resources" onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="resources">{isRTL ? 'الموارد' : 'Resources'}</TabsTrigger>
                <TabsTrigger value="mentors">{isRTL ? 'المرشدون العالميون' : 'Global Mentors'}</TabsTrigger>
                <TabsTrigger value="contribute">{isRTL ? 'ساهم' : 'Contribute'}</TabsTrigger>
              </TabsList>
              
              <div className="relative">
                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4`} />
                <Input
                  placeholder={isRTL ? 'بحث...' : 'Search...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${isRTL ? 'pr-10 text-right' : 'pl-10'} w-full md:w-60`}
                />
              </div>
            </div>
            
            <TabsContent value="resources">
              <div className="space-y-6">
                {filteredResources.length > 0 ? (
                  filteredResources.map((resource) => (
                    <Card key={resource.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="md:flex-1 flex gap-4">
                            <div className="flex-shrink-0 flex items-start pt-1">
                              {getResourceIcon(resource.type)}
                            </div>
                            
                            <div className="space-y-2">
                              <h3 className="font-medium text-lg">
                                {isRTL ? resource.titleLoc : resource.title}
                              </h3>
                              
                              <div className="flex items-center text-sm text-gray-500">
                                <span>{isRTL ? resource.authorLoc : resource.author}</span>
                                <span className="mx-2">•</span>
                                <span>{new Date(resource.dateAdded).toLocaleDateString()}</span>
                              </div>
                              
                              <p className="text-gray-600">
                                {isRTL ? resource.descriptionLoc : resource.description}
                              </p>
                              
                              <div className="flex items-center gap-2 flex-wrap">
                                <Globe className="h-4 w-4 text-gray-500" />
                                {(isRTL ? resource.languagesLoc : resource.languages).map((lang, idx) => (
                                  <Badge key={idx} variant="outline" className="bg-gray-50">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-shrink-0 flex flex-col md:items-end gap-2">
                            <Button className="w-full md:w-auto">
                              <Download className="h-4 w-4 mr-2" />
                              {isRTL ? 'تنزيل' : 'Download'}
                            </Button>
                            <div className="text-sm text-gray-500">
                              {resource.downloads.toLocaleString()} {isRTL ? 'تنزيلات' : 'downloads'}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 border border-dashed rounded-md">
                    <div className="text-moh-green mb-2">
                      <FileText className="h-10 w-10 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      {isRTL ? 'لم يتم العثور على موارد' : 'No resources found'}
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      {isRTL 
                        ? 'حاول تعديل معايير البحث أو استعراض موارد أخرى.'
                        : 'Try adjusting your search criteria or browse other resources.'}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="mentors">
              <div className="space-y-6">
                {filteredMentors.length > 0 ? (
                  filteredMentors.map((mentor) => (
                    <Card key={mentor.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="md:flex-1">
                            <h3 className="font-medium text-lg mb-1">
                              {isRTL ? mentor.nameLoc : mentor.name}
                            </h3>
                            
                            <p className="text-moh-green mb-3">
                              {isRTL ? mentor.titleLoc : mentor.title}
                            </p>
                            
                            <p className="text-gray-600 mb-3">
                              {isRTL ? mentor.descriptionLoc : mentor.description}
                            </p>
                            
                            <div className="space-y-2">
                              <div className="flex gap-2 flex-wrap">
                                <span className="text-sm font-medium text-gray-600">
                                  {isRTL ? 'الخبرة:' : 'Expertise:'}
                                </span>
                                {(isRTL ? mentor.expertiseLoc : mentor.expertise).map((exp, idx) => (
                                  <Badge key={idx} variant="outline" className="bg-moh-lightGreen/20">
                                    {exp}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex gap-2 flex-wrap">
                                <span className="text-sm font-medium text-gray-600">
                                  {isRTL ? 'اللغات:' : 'Languages:'}
                                </span>
                                {(isRTL ? mentor.languagesLoc : mentor.languages).map((lang, idx) => (
                                  <Badge key={idx} variant="outline" className="bg-gray-50">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                              
                              <p className="text-sm text-gray-500">
                                <span className="font-medium">{isRTL ? 'الساعات المتاحة:' : 'Available hours:'}</span> {mentor.availableHours} {isRTL ? 'ساعات/أسبوع' : 'hours/week'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex-shrink-0 flex flex-col md:items-end gap-2">
                            <Button>
                              <UserCheck className="h-4 w-4 mr-2" />
                              {isRTL ? 'طلب إرشاد' : 'Request Mentoring'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 border border-dashed rounded-md">
                    <div className="text-moh-green mb-2">
                      <UserCheck className="h-10 w-10 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      {isRTL ? 'لم يتم العثور على مرشدين' : 'No mentors found'}
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      {isRTL 
                        ? 'حاول تعديل معايير البحث أو استعراض المرشدين المتاحين.'
                        : 'Try adjusting your search criteria or browse available mentors.'}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="contribute">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <div className="text-moh-green mb-4">
                      <FileUp className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">
                      {isRTL ? 'ساهم بالمعرفة' : 'Contribute Knowledge'}
                    </h3>
                    <p className="text-gray-500 max-w-lg mx-auto mb-6">
                      {isRTL 
                        ? 'شارك الموارد والخبرات مع المجتمع العالمي. يمكن تقديم المساهمات بأي لغة وستتم ترجمتها.'
                        : 'Share resources and expertise with the global community. Contributions can be made in any language and will be translated.'}
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                      <Button>
                        <FileUp className="h-4 w-4 mr-2" />
                        {isRTL ? 'تحميل مورد' : 'Upload Resource'}
                      </Button>
                      <Button variant="outline">
                        <UserCheck className="h-4 w-4 mr-2" />
                        {isRTL ? 'سجل كمرشد عالمي' : 'Register as Global Mentor'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
