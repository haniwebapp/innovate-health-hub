
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function RegulatoryMap() {
  const { t, isRTL } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  const regions = [
    { id: 'gcc', name: 'GCC', nameLoc: 'دول الخليج', complexity: 'medium' },
    { id: 'eu', name: 'European Union', nameLoc: 'الاتحاد الأوروبي', complexity: 'high' },
    { id: 'usa', name: 'United States', nameLoc: 'الولايات المتحدة', complexity: 'high' },
    { id: 'asia', name: 'Asia Pacific', nameLoc: 'آسيا والمحيط الهادئ', complexity: 'medium' },
    { id: 'africa', name: 'Africa', nameLoc: 'أفريقيا', complexity: 'low' },
    { id: 'latam', name: 'Latin America', nameLoc: 'أمريكا اللاتينية', complexity: 'medium' }
  ];
  
  const getComplexityBadge = (complexity: string) => {
    switch (complexity) {
      case 'high':
        return <Badge variant="destructive">{isRTL ? 'عالي' : 'High'}</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">{isRTL ? 'متوسط' : 'Medium'}</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-200">{isRTL ? 'منخفض' : 'Low'}</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>{isRTL ? 'خريطة اللوائح التنظيمية العالمية' : 'Global Regulatory Map'}</CardTitle>
            <CardDescription>
              {isRTL 
                ? 'استكشف متطلبات التنظيم والامتثال في مختلف المناطق حول العالم'
                : 'Explore regulatory requirements and compliance across different regions around the world'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] bg-gray-100 rounded-md mb-4 flex items-center justify-center">
              <p className="text-gray-500">{isRTL ? 'خريطة تفاعلية ستظهر هنا' : 'Interactive map will be displayed here'}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion === region.id ? "default" : "outline"}
                  className={`h-auto py-3 justify-start ${isRTL ? 'text-right' : 'text-left'}`}
                  onClick={() => setSelectedRegion(region.id)}
                >
                  <div className="flex flex-col items-start gap-2">
                    <span>{isRTL ? region.nameLoc : region.name}</span>
                    <div>{getComplexityBadge(region.complexity)}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {selectedRegion && (
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>
                {isRTL ? 'نظرة عامة على المنطقة' : 'Region Overview'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">{isRTL ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
                  <TabsTrigger value="authorities">{isRTL ? 'الهيئات التنظيمية' : 'Authorities'}</TabsTrigger>
                  <TabsTrigger value="requirements">{isRTL ? 'المتطلبات' : 'Requirements'}</TabsTrigger>
                  <TabsTrigger value="timelines">{isRTL ? 'الجداول الزمنية' : 'Timelines'}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-4">
                  <p>{isRTL ? 'معلومات تفصيلية عن المنطقة المختارة ستظهر هنا' : 'Detailed information about the selected region will appear here'}</p>
                </TabsContent>
                
                <TabsContent value="authorities" className="mt-4">
                  <p>{isRTL ? 'معلومات عن الهيئات التنظيمية ستظهر هنا' : 'Information about regulatory authorities will appear here'}</p>
                </TabsContent>
                
                <TabsContent value="requirements" className="mt-4">
                  <p>{isRTL ? 'متطلبات الامتثال التفصيلية ستظهر هنا' : 'Detailed compliance requirements will appear here'}</p>
                </TabsContent>
                
                <TabsContent value="timelines" className="mt-4">
                  <p>{isRTL ? 'الجداول الزمنية للموافقات ستظهر هنا' : 'Approval timelines will appear here'}</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
