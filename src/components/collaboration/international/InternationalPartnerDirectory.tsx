
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Globe, Users, Handshake } from 'lucide-react';

export function InternationalPartnerDirectory() {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  // Mock partner data
  const partners = [
    {
      id: 1,
      name: 'MedTech Innovations GmbH',
      nameLoc: 'ميدتك للابتكارات',
      country: 'Germany',
      countryLoc: 'ألمانيا',
      region: 'europe',
      type: 'innovation',
      expertise: ['Medical Devices', 'Digital Health'],
      expertiseLoc: ['الأجهزة الطبية', 'الصحة الرقمية'],
      description: 'A leading innovator in medical device development with expertise in regulatory compliance for EU markets.',
      descriptionLoc: 'شركة رائدة في تطوير الأجهزة الطبية مع خبرة في الامتثال التنظيمي لأسواق الاتحاد الأوروبي.',
      avatar: '/company-1.png'
    },
    {
      id: 2,
      name: 'Global Health Partners',
      nameLoc: 'شركاء الصحة العالمية',
      country: 'United States',
      countryLoc: 'الولايات المتحدة',
      region: 'north-america',
      type: 'research',
      expertise: ['Clinical Research', 'Regulatory Affairs'],
      expertiseLoc: ['البحث السريري', 'الشؤون التنظيمية'],
      description: 'Research organization specializing in clinical trials and regulatory submissions for healthcare innovations.',
      descriptionLoc: 'منظمة بحثية متخصصة في التجارب السريرية وتقديم الطلبات التنظيمية لابتكارات الرعاية الصحية.',
      avatar: '/company-2.png'
    },
    {
      id: 3,
      name: 'Singapore Health Technologies',
      nameLoc: 'تقنيات الصحة السنغافورية',
      country: 'Singapore',
      countryLoc: 'سنغافورة',
      region: 'asia-pacific',
      type: 'accelerator',
      expertise: ['Healthcare AI', 'Telemedicine'],
      expertiseLoc: ['الذكاء الاصطناعي للرعاية الصحية', 'التطبيب عن بعد'],
      description: 'Accelerator program helping healthcare startups scale across Asian markets with regulatory support.',
      descriptionLoc: 'برنامج مسرع يساعد الشركات الناشئة في مجال الرعاية الصحية على التوسع في الأسواق الآسيوية مع الدعم التنظيمي.',
      avatar: '/company-3.png'
    },
    {
      id: 4,
      name: 'Middle East Medical Ventures',
      nameLoc: 'مشاريع الطبية الشرق أوسطية',
      country: 'United Arab Emirates',
      countryLoc: 'الإمارات العربية المتحدة',
      region: 'middle-east',
      type: 'investor',
      expertise: ['Healthcare Investment', 'Market Access'],
      expertiseLoc: ['الاستثمار في الرعاية الصحية', 'الوصول إلى السوق'],
      description: 'Investment firm focused on healthcare innovations with strong connections throughout the Middle East.',
      descriptionLoc: 'شركة استثمارية تركز على ابتكارات الرعاية الصحية مع روابط قوية في جميع أنحاء الشرق الأوسط.',
      avatar: '/company-4.png'
    }
  ];
  
  // Filter partners based on search query and filters
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = searchQuery === '' || 
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRegion = selectedRegion === 'all' || partner.region === selectedRegion;
    const matchesType = selectedType === 'all' || partner.type === selectedType;
    
    return matchesSearch && matchesRegion && matchesType;
  });
  
  const regionOptions = [
    { value: 'all', label: 'All Regions', labelLoc: 'جميع المناطق' },
    { value: 'europe', label: 'Europe', labelLoc: 'أوروبا' },
    { value: 'north-america', label: 'North America', labelLoc: 'أمريكا الشمالية' },
    { value: 'asia-pacific', label: 'Asia Pacific', labelLoc: 'آسيا والمحيط الهادئ' },
    { value: 'middle-east', label: 'Middle East', labelLoc: 'الشرق الأوسط' },
    { value: 'africa', label: 'Africa', labelLoc: 'أفريقيا' },
    { value: 'south-america', label: 'South America', labelLoc: 'أمريكا الجنوبية' },
  ];
  
  const typeOptions = [
    { value: 'all', label: 'All Types', labelLoc: 'جميع الأنواع' },
    { value: 'innovation', label: 'Innovation Partners', labelLoc: 'شركاء الابتكار' },
    { value: 'research', label: 'Research Organizations', labelLoc: 'منظمات البحث' },
    { value: 'investor', label: 'Investors', labelLoc: 'المستثمرون' },
    { value: 'accelerator', label: 'Accelerators/Incubators', labelLoc: 'المسرعات/الحاضنات' },
    { value: 'regulatory', label: 'Regulatory Consultants', labelLoc: 'مستشارو التنظيم' },
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'دليل الشركاء الدوليين' : 'International Partner Directory'}</CardTitle>
          <CardDescription>
            {isRTL 
              ? 'ابحث عن شركاء للتعاون عبر الحدود في مجال ابتكارات الرعاية الصحية'
              : 'Find partners for cross-border collaboration in healthcare innovation'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4`} />
                <Input
                  placeholder={isRTL ? 'ابحث عن شركاء حسب الاسم أو الخبرة...' : 'Search partners by name or expertise...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${isRTL ? 'pr-10 text-right' : 'pl-10'}`}
                />
              </div>
              
              <div className="w-full md:w-48">
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? 'المنطقة' : 'Region'} />
                  </SelectTrigger>
                  <SelectContent>
                    {regionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {isRTL ? option.labelLoc : option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-56">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? 'نوع الشريك' : 'Partner Type'} />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {isRTL ? option.labelLoc : option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mb-4">
              {isRTL 
                ? `${filteredPartners.length} شركاء وجدوا`
                : `${filteredPartners.length} partners found`}
            </div>
            
            <div className="space-y-4">
              {filteredPartners.map((partner) => (
                <Card key={partner.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <Avatar className="h-16 w-16 rounded-md">
                          {partner.avatar ? (
                            <AvatarImage src={partner.avatar} alt={partner.name} />
                          ) : (
                            <AvatarFallback className="text-xl rounded-md">
                              {partner.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-1">
                            {isRTL ? partner.nameLoc : partner.name}
                          </h3>
                          
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{isRTL ? partner.countryLoc : partner.country}</span>
                            <span className="mx-2">•</span>
                            <Globe className="h-4 w-4 mr-1" />
                            <span>
                              {isRTL 
                                ? regionOptions.find(r => r.value === partner.region)?.labelLoc 
                                : regionOptions.find(r => r.value === partner.region)?.label}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3">
                            {isRTL ? partner.descriptionLoc : partner.description}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {(isRTL ? partner.expertiseLoc : partner.expertise).map((exp, idx) => (
                            <Badge key={idx} variant="outline" className="bg-moh-lightGreen/20">
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 flex flex-col gap-2">
                        <Button className="whitespace-nowrap">
                          <Handshake className="h-4 w-4 mr-2" />
                          {isRTL ? 'طلب تعاون' : 'Request Collaboration'}
                        </Button>
                        <Button variant="outline" className="whitespace-nowrap">
                          <Users className="h-4 w-4 mr-2" />
                          {isRTL ? 'عرض الملف الكامل' : 'View Full Profile'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredPartners.length === 0 && (
                <div className="text-center py-12 border border-dashed rounded-md">
                  <div className="text-moh-green mb-2">
                    <Search className="h-10 w-10 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    {isRTL ? 'لم يتم العثور على شركاء' : 'No partners found'}
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {isRTL 
                      ? 'حاول تعديل معايير البحث أو إزالة الفلاتر للعثور على المزيد من الشركاء.'
                      : 'Try adjusting your search criteria or removing filters to find more partners.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
