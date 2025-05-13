
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

export function RegulationComparison() {
  const { t, isRTL } = useLanguage();
  const [region1, setRegion1] = useState('gcc');
  const [region2, setRegion2] = useState('eu');
  
  const regions = [
    { value: 'gcc', label: 'GCC', labelLoc: 'دول الخليج' },
    { value: 'eu', label: 'European Union', labelLoc: 'الاتحاد الأوروبي' },
    { value: 'usa', label: 'United States', labelLoc: 'الولايات المتحدة' },
    { value: 'asia', label: 'Asia Pacific', labelLoc: 'آسيا والمحيط الهادئ' },
  ];
  
  // Mock comparison data
  const comparisonData = [
    {
      aspect: 'Regulatory Framework',
      aspectLoc: 'الإطار التنظيمي',
      gcc: 'SFDA regulations',
      gccLoc: 'لوائح الهيئة العامة للغذاء والدواء',
      eu: 'MDR/IVDR',
      euLoc: 'لائحة الأجهزة الطبية/لائحة التشخيص في المختبر',
      usa: 'FDA CFR',
      usaLoc: 'إدارة الغذاء والدواء - اللوائح الفيدرالية',
      asia: 'Varies by country',
      asiaLoc: 'تختلف حسب البلد'
    },
    {
      aspect: 'Classification System',
      aspectLoc: 'نظام التصنيف',
      gcc: '4 Classes (I-IV)',
      gccLoc: '4 فئات (I-IV)',
      eu: 'Classes I, IIa, IIb, III',
      euLoc: 'الفئات I و IIa و IIb و III',
      usa: 'Classes I, II, III',
      usaLoc: 'الفئات I و II و III',
      asia: 'Varies by country',
      asiaLoc: 'تختلف حسب البلد'
    },
    {
      aspect: 'Conformity Assessment',
      aspectLoc: 'تقييم المطابقة',
      gcc: 'Notified Body',
      gccLoc: 'الهيئة المعينة',
      eu: 'Notified Body',
      euLoc: 'الهيئة المعينة',
      usa: 'FDA Review',
      usaLoc: 'مراجعة إدارة الغذاء والدواء',
      asia: 'Local review bodies',
      asiaLoc: 'هيئات المراجعة المحلية'
    },
    {
      aspect: 'Quality Management',
      aspectLoc: 'إدارة الجودة',
      gcc: 'ISO 13485',
      gccLoc: 'آيزو 13485',
      eu: 'ISO 13485',
      euLoc: 'آيزو 13485',
      usa: 'QSR (21 CFR 820)',
      usaLoc: 'لوائح نظام الجودة',
      asia: 'ISO 13485 or local',
      asiaLoc: 'آيزو 13485 أو محلي'
    },
    {
      aspect: 'Clinical Evidence',
      aspectLoc: 'الأدلة السريرية',
      gcc: 'Clinical Evaluation',
      gccLoc: 'التقييم السريري',
      eu: 'Clinical Evaluation/Investigation',
      euLoc: 'التقييم/التحقيق السريري',
      usa: 'Clinical Trials',
      usaLoc: 'التجارب السريرية',
      asia: 'Varies by country',
      asiaLoc: 'تختلف حسب البلد'
    },
    {
      aspect: 'Post-Market',
      aspectLoc: 'ما بعد التسويق',
      gcc: 'PMS Required',
      gccLoc: 'مراقبة ما بعد التسويق مطلوبة',
      eu: 'PMS & PMCF Required',
      euLoc: 'مراقبة ومتابعة ما بعد التسويق مطلوبة',
      usa: 'MDR & PMA Reports',
      usaLoc: 'تقارير الأحداث الضارة وما بعد التسويق',
      asia: 'Varies by country',
      asiaLoc: 'تختلف حسب البلد'
    }
  ];
  
  const getComparisonClass = (r1: string, r2: string, aspect: any) => {
    if (aspect[r1] === aspect[r2]) {
      return 'bg-green-50';
    }
    return '';
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'مقارنة اللوائح التنظيمية' : 'Regulation Comparison'}</CardTitle>
          <CardDescription>
            {isRTL 
              ? 'قارن المتطلبات التنظيمية بين المناطق المختلفة'
              : 'Compare regulatory requirements between different regions'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label>{isRTL ? 'المنطقة 1' : 'Region 1'}</Label>
              <Select value={region1} onValueChange={setRegion1}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {isRTL ? region.labelLoc : region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>{isRTL ? 'المنطقة 2' : 'Region 2'}</Label>
              <Select value={region2} onValueChange={setRegion2}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value} disabled={region.value === region1}>
                      {isRTL ? region.labelLoc : region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">{isRTL ? 'جانب التنظيم' : 'Regulatory Aspect'}</TableHead>
                  <TableHead>{isRTL ? regions.find(r => r.value === region1)?.labelLoc : regions.find(r => r.value === region1)?.label}</TableHead>
                  <TableHead>{isRTL ? regions.find(r => r.value === region2)?.labelLoc : regions.find(r => r.value === region2)?.label}</TableHead>
                  <TableHead className="text-center">{isRTL ? 'المقارنة' : 'Comparison'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {isRTL ? item.aspectLoc : item.aspect}
                    </TableCell>
                    <TableCell>
                      {isRTL ? item[`${region1}Loc`] : item[region1]}
                    </TableCell>
                    <TableCell>
                      {isRTL ? item[`${region2}Loc`] : item[region2]}
                    </TableCell>
                    <TableCell className="text-center">
                      {item[region1] === item[region2] ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          {isRTL ? 'متطابق' : 'Same'}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                          {isRTL ? 'مختلف' : 'Different'}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 text-center">
            <Button>
              {isRTL ? 'توليد تقرير مقارنة مفصل' : 'Generate Detailed Comparison Report'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
