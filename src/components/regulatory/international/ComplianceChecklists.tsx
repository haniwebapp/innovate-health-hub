
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

export function ComplianceChecklists() {
  const { t, isRTL } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState('gcc');
  const [selectedProduct, setSelectedProduct] = useState('medical-device');
  const [progress, setProgress] = useState(0);
  
  // Mock checklist items
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, title: 'Quality Management System', titleLoc: 'نظام إدارة الجودة', completed: false },
    { id: 2, title: 'Technical Documentation', titleLoc: 'الوثائق الفنية', completed: false },
    { id: 3, title: 'Risk Analysis', titleLoc: 'تحليل المخاطر', completed: false },
    { id: 4, title: 'Clinical Evaluation', titleLoc: 'التقييم السريري', completed: false },
    { id: 5, title: 'Labeling Requirements', titleLoc: 'متطلبات وضع العلامات', completed: false },
    { id: 6, title: 'Performance Testing', titleLoc: 'اختبار الأداء', completed: false },
    { id: 7, title: 'Manufacturing Controls', titleLoc: 'ضوابط التصنيع', completed: false },
    { id: 8, title: 'Post-Market Surveillance Plan', titleLoc: 'خطة المراقبة بعد التسويق', completed: false },
  ]);
  
  const toggleItem = (id: number) => {
    const updatedItems = checklistItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklistItems(updatedItems);
    
    // Update progress
    const completedCount = updatedItems.filter(item => item.completed).length;
    setProgress((completedCount / updatedItems.length) * 100);
  };
  
  const regions = [
    { value: 'gcc', label: 'GCC', labelLoc: 'دول الخليج' },
    { value: 'eu', label: 'European Union', labelLoc: 'الاتحاد الأوروبي' },
    { value: 'usa', label: 'United States', labelLoc: 'الولايات المتحدة' },
    { value: 'asia', label: 'Asia Pacific', labelLoc: 'آسيا والمحيط الهادئ' },
  ];
  
  const productTypes = [
    { value: 'medical-device', label: 'Medical Device', labelLoc: 'جهاز طبي' },
    { value: 'digital-health', label: 'Digital Health', labelLoc: 'الصحة الرقمية' },
    { value: 'pharma', label: 'Pharmaceutical', labelLoc: 'دوائي' },
    { value: 'ivd', label: 'In-Vitro Diagnostic', labelLoc: 'تشخيص في المختبر' },
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'قوائم التحقق من الامتثال' : 'Compliance Checklists'}</CardTitle>
          <CardDescription>
            {isRTL 
              ? 'تتبع متطلبات الامتثال لمنتجك عبر الأسواق العالمية'
              : 'Track compliance requirements for your product across global markets'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label>{isRTL ? 'المنطقة' : 'Region'}</Label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
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
              <Label>{isRTL ? 'نوع المنتج' : 'Product Type'}</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((product) => (
                    <SelectItem key={product.value} value={product.value}>
                      {isRTL ? product.labelLoc : product.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-500">
              {isRTL ? 'التقدم' : 'Progress'}: {Math.round(progress)}%
            </div>
            <Button variant="outline" size="sm" onClick={() => {
              setChecklistItems(checklistItems.map(item => ({ ...item, completed: false })));
              setProgress(0);
            }}>
              {isRTL ? 'إعادة ضبط' : 'Reset'}
            </Button>
          </div>
          
          <Progress value={progress} className="h-2 mb-6" />
          
          <div className="space-y-4">
            {checklistItems.map((item) => (
              <div 
                key={item.id} 
                className={`flex items-start space-x-3 p-3 rounded-md transition-colors ${
                  item.completed ? 'bg-green-50' : 'bg-gray-50'
                } ${isRTL ? 'space-x-reverse' : ''}`}
              >
                <Checkbox 
                  id={`item-${item.id}`} 
                  checked={item.completed}
                  onCheckedChange={() => toggleItem(item.id)}
                  className="mt-1"
                />
                <div className="space-y-1 flex-1">
                  <label
                    htmlFor={`item-${item.id}`}
                    className={`font-medium ${
                      item.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {isRTL ? item.titleLoc : item.title}
                  </label>
                  <p className="text-sm text-gray-500">
                    {isRTL ? 'نص وصفي لهذا العنصر في قائمة التحقق سيظهر هنا.' : 'Descriptive text for this checklist item will appear here.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button disabled={progress < 100}>
              {isRTL ? 'توليد تقرير الامتثال' : 'Generate Compliance Report'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
