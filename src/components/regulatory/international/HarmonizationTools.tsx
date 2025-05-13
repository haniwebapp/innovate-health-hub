
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Calendar, CheckCircle, ArrowRightLeft, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function HarmonizationTools() {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'أدوات توافق اللوائح' : 'Regulatory Harmonization Tools'}</CardTitle>
          <CardDescription>
            {isRTL 
              ? 'خطط لمسارات الموافقة عبر الأسواق المتعددة وحدد أوجه التشابه في المتطلبات'
              : 'Plan approval pathways across multiple markets and identify requirement similarities'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pathways">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="pathways">{isRTL ? 'مخطط المسار' : 'Pathway Planner'}</TabsTrigger>
              <TabsTrigger value="converter">{isRTL ? 'محول المستندات' : 'Document Converter'}</TabsTrigger>
              <TabsTrigger value="standards">{isRTL ? 'مواءمة المعايير' : 'Standards Mapping'}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pathways">
              <PathwayPlanner />
            </TabsContent>
            
            <TabsContent value="converter">
              <DocumentConverter />
            </TabsContent>
            
            <TabsContent value="standards">
              <StandardsMapping />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function PathwayPlanner() {
  const { isRTL } = useLanguage();
  const [selectedMarkets] = useState(['gcc', 'eu', 'usa']);
  
  const pathwaySteps = [
    {
      id: 1, 
      title: 'Quality Management System Implementation',
      titleLoc: 'تنفيذ نظام إدارة الجودة',
      description: 'Implement ISO 13485:2016 quality management system',
      descriptionLoc: 'تنفيذ نظام إدارة الجودة آيزو 13485:2016',
      duration: '6-9 months',
      durationLoc: '6-9 أشهر',
      shared: ['gcc', 'eu', 'usa']
    },
    {
      id: 2, 
      title: 'Technical Documentation',
      titleLoc: 'الوثائق الفنية',
      description: 'Create comprehensive technical file/design dossier',
      descriptionLoc: 'إنشاء ملف فني/ملف تصميم شامل',
      duration: '3-6 months',
      durationLoc: '3-6 أشهر',
      shared: ['gcc', 'eu']
    },
    {
      id: 3, 
      title: 'Clinical Evaluation',
      titleLoc: 'التقييم السريري',
      description: 'Conduct clinical evaluation/investigation',
      descriptionLoc: 'إجراء تقييم/تحقيق سريري',
      duration: '6-12 months',
      durationLoc: '6-12 شهر',
      shared: ['gcc', 'eu', 'usa']
    },
    {
      id: 4, 
      title: 'Risk Management',
      titleLoc: 'إدارة المخاطر',
      description: 'Document risk analysis and risk management',
      descriptionLoc: 'توثيق تحليل المخاطر وإدارة المخاطر',
      duration: '2-3 months',
      durationLoc: '2-3 أشهر',
      shared: ['gcc', 'eu', 'usa']
    },
    {
      id: 5, 
      title: 'EU MDR-Specific Requirements',
      titleLoc: 'متطلبات خاصة بلائحة الأجهزة الطبية الأوروبية',
      description: 'EUDAMED registration, UDI, GSPR',
      descriptionLoc: 'تسجيل EUDAMED، معرف الجهاز الفريد، متطلبات السلامة العامة والأداء',
      duration: '1-2 months',
      durationLoc: '1-2 أشهر',
      shared: ['eu']
    },
    {
      id: 6, 
      title: 'FDA 510(k) Submission',
      titleLoc: 'تقديم FDA 510(k)',
      description: 'Prepare and submit 510(k) application',
      descriptionLoc: 'إعداد وتقديم طلب 510(k)',
      duration: '3-6 months',
      durationLoc: '3-6 أشهر',
      shared: ['usa']
    },
    {
      id: 7, 
      title: 'MDMA Registration (GCC)',
      titleLoc: 'تسجيل MDMA (دول الخليج)',
      description: 'Medical Devices Marketing Authorization application',
      descriptionLoc: 'طلب ترخيص تسويق الأجهزة الطبية',
      duration: '2-3 months',
      durationLoc: '2-3 أشهر',
      shared: ['gcc']
    },
    {
      id: 8, 
      title: 'Post-Market Surveillance Plan',
      titleLoc: 'خطة المراقبة بعد التسويق',
      description: 'Develop comprehensive PMS plan',
      descriptionLoc: 'تطوير خطة شاملة للمراقبة بعد التسويق',
      duration: '1-2 months',
      durationLoc: '1-2 أشهر',
      shared: ['gcc', 'eu', 'usa']
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-md">
        <h3 className="text-lg font-medium mb-2">
          {isRTL ? 'مخطط التنسيق' : 'Harmonization Plan'}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {isRTL 
            ? 'تخطيط مسار موحد للموافقة على المنتجات عبر أسواق متعددة'
            : 'Planning a unified product approval pathway across multiple markets'}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            {isRTL ? 'دول الخليج' : 'GCC'}
          </Badge>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            {isRTL ? 'الاتحاد الأوروبي' : 'EU'}
          </Badge>
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            {isRTL ? 'الولايات المتحدة' : 'USA'}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-4">
        {pathwaySteps.map((step) => {
          const isShared = step.shared.length > 1;
          const isAllMarkets = step.shared.length === selectedMarkets.length;
          
          return (
            <div key={step.id} className={`border rounded-md p-4 ${
              isAllMarkets ? 'border-green-300 bg-green-50' : 
              isShared ? 'border-amber-300 bg-amber-50' : 'border-gray-200'
            }`}>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">
                    {isRTL ? step.titleLoc : step.title}
                    {isAllMarkets && (
                      <span className="ml-2 text-green-600 text-sm">
                        {isRTL ? '(مشترك عبر جميع الأسواق)' : '(Shared across all markets)'}
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {isRTL ? step.descriptionLoc : step.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {isRTL ? step.durationLoc : step.duration}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {step.shared.map((market) => {
                  let badgeClass = '';
                  switch(market) {
                    case 'gcc':
                      badgeClass = 'bg-green-100 text-green-800 border-green-200';
                      break;
                    case 'eu':
                      badgeClass = 'bg-blue-100 text-blue-800 border-blue-200';
                      break;
                    case 'usa':
                      badgeClass = 'bg-red-100 text-red-800 border-red-200';
                      break;
                  }
                  
                  return (
                    <Badge key={market} variant="outline" className={badgeClass}>
                      {market === 'gcc' ? (isRTL ? 'دول الخليج' : 'GCC') : 
                       market === 'eu' ? (isRTL ? 'الاتحاد الأوروبي' : 'EU') : 
                       (isRTL ? 'الولايات المتحدة' : 'USA')}
                    </Badge>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      <Button className="mt-6 w-full">
        {isRTL ? 'إنشاء مخطط زمني مفصل' : 'Generate Detailed Timeline'}
      </Button>
    </div>
  );
}

function DocumentConverter() {
  const { isRTL } = useLanguage();
  
  const documentTypes = [
    {
      name: 'Technical Documentation', 
      nameLoc: 'الوثائق الفنية',
      conversionMap: [
        { from: 'EU Technical File', to: 'FDA 510(k)', fromLoc: 'الملف الفني الأوروبي', toLoc: 'FDA 510(k)', completion: 75 },
        { from: 'EU Technical File', to: 'GCC MDMA', fromLoc: 'الملف الفني الأوروبي', toLoc: 'ترخيص الخليج', completion: 90 }
      ]
    },
    {
      name: 'Clinical Evidence', 
      nameLoc: 'الأدلة السريرية',
      conversionMap: [
        { from: 'EU Clinical Evaluation', to: 'FDA Clinical Data', fromLoc: 'التقييم السريري الأوروبي', toLoc: 'البيانات السريرية لـ FDA', completion: 80 },
        { from: 'EU Clinical Evaluation', to: 'GCC Clinical Evaluation', fromLoc: 'التقييم السريري الأوروبي', toLoc: 'التقييم السريري الخليجي', completion: 95 }
      ]
    },
    {
      name: 'Risk Management', 
      nameLoc: 'إدارة المخاطر',
      conversionMap: [
        { from: 'ISO 14971 Documentation', to: 'FDA Risk Analysis', fromLoc: 'وثائق آيزو 14971', toLoc: 'تحليل المخاطر لـ FDA', completion: 85 },
        { from: 'ISO 14971 Documentation', to: 'GCC Risk Management', fromLoc: 'وثائق آيزو 14971', toLoc: 'إدارة المخاطر الخليجية', completion: 100 }
      ]
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-md mb-6">
        <h3 className="text-lg font-medium mb-2">
          {isRTL ? 'محول الوثائق التنظيمية' : 'Regulatory Document Converter'}
        </h3>
        <p className="text-sm text-gray-600">
          {isRTL 
            ? 'تحويل الوثائق التنظيمية من تنسيق منطقة إلى أخرى لتسريع وقت الطرح في السوق'
            : 'Convert regulatory documents from one region format to another to accelerate time to market'}
        </p>
      </div>
      
      <div className="space-y-8">
        {documentTypes.map((docType, index) => (
          <div key={index} className="space-y-4">
            <h4 className="font-medium text-lg border-b pb-2">
              {isRTL ? docType.nameLoc : docType.name}
            </h4>
            
            <div className="space-y-4">
              {docType.conversionMap.map((mapping, idx) => (
                <div key={idx} className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">
                        {isRTL ? mapping.fromLoc : mapping.from}
                      </div>
                      <ArrowRightLeft className="h-4 w-4 mx-2" />
                      <div className="font-medium">
                        {isRTL ? mapping.toLoc : mapping.to}
                      </div>
                    </div>
                    <Badge className={mapping.completion === 100 
                      ? "bg-green-100 text-green-800" 
                      : "bg-amber-100 text-amber-800"}>
                      {mapping.completion}% {isRTL ? 'متوافق' : 'Compatible'}
                    </Badge>
                  </div>
                  
                  <Progress value={mapping.completion} className="h-2 mb-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{isRTL ? 'نسبة التوافق' : 'Compatibility'}</span>
                    <div className="flex items-center gap-1">
                      {mapping.completion < 80 && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                      {mapping.completion >= 80 && <CheckCircle className="h-4 w-4 text-green-500" />}
                      <span>{mapping.completion}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <Button className="mt-6 w-full">
        {isRTL ? 'تحويل وثائقي' : 'Convert My Documents'}
      </Button>
    </div>
  );
}

function StandardsMapping() {
  const { isRTL } = useLanguage();
  
  const standards = [
    {
      id: 'qms',
      name: 'Quality Management',
      nameLoc: 'إدارة الجودة',
      mappings: [
        { standard: 'ISO 13485:2016', regions: ['EU', 'GCC', 'USA', 'Canada', 'Japan', 'Australia'] },
        { standard: 'FDA 21 CFR 820', regions: ['USA'] },
      ]
    },
    {
      id: 'risk',
      name: 'Risk Management',
      nameLoc: 'إدارة المخاطر',
      mappings: [
        { standard: 'ISO 14971:2019', regions: ['EU', 'GCC', 'USA', 'Canada', 'Japan', 'Brazil'] },
      ]
    },
    {
      id: 'safety',
      name: 'Electrical Safety',
      nameLoc: 'السلامة الكهربائية',
      mappings: [
        { standard: 'IEC 60601-1', regions: ['EU', 'USA', 'GCC', 'Japan', 'Canada'] },
        { standard: 'UL 2601-1', regions: ['USA'] },
      ]
    },
    {
      id: 'software',
      name: 'Software',
      nameLoc: 'البرمجيات',
      mappings: [
        { standard: 'IEC 62304', regions: ['EU', 'USA', 'GCC', 'Japan'] },
        { standard: 'FDA Software Guidance', regions: ['USA'] },
      ]
    },
    {
      id: 'biocomp',
      name: 'Biocompatibility',
      nameLoc: 'التوافق البيولوجي',
      mappings: [
        { standard: 'ISO 10993', regions: ['EU', 'USA', 'GCC', 'Japan', 'Australia', 'Brazil'] },
      ]
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-md mb-6">
        <h3 className="text-lg font-medium mb-2">
          {isRTL ? 'خريطة المعايير العالمية' : 'Global Standards Map'}
        </h3>
        <p className="text-sm text-gray-600">
          {isRTL 
            ? 'استكشف قبول المعايير المختلفة عبر الأسواق العالمية'
            : 'Explore acceptance of different standards across global markets'}
        </p>
      </div>
      
      <div className="space-y-6">
        {standards.map((category) => (
          <Card key={category.id}>
            <CardHeader className="py-3">
              <CardTitle className="text-base">
                {isRTL ? category.nameLoc : category.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3">
              {category.mappings.map((mapping, idx) => (
                <div key={idx} className="mb-4 last:mb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{mapping.standard}</div>
                    <div>
                      {mapping.regions.length > 3 ? (
                        <Badge className="bg-green-100 text-green-800">
                          {isRTL ? 'معيار عالمي' : 'Global Standard'}
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          {isRTL ? 'معيار إقليمي' : 'Regional Standard'}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mapping.regions.map((region) => (
                      <Badge key={region} variant="outline" className="bg-gray-50">
                        {region}
                      </Badge>
                    ))}
                  </div>
                  
                  {idx < category.mappings.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button className="mt-6 w-full">
        {isRTL ? 'البحث عن معايير محددة' : 'Search for Specific Standards'}
      </Button>
    </div>
  );
}
