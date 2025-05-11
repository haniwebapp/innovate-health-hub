
import React from 'react';
import { Card } from '@/components/ui/card';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function BenefitCard({ title, description, icon }: BenefitCardProps) {
  return (
    <Card className="p-6 border border-gray-200 hover:border-moh-green/40 transition-colors">
      <div className="flex items-start gap-4">
        <div className="bg-moh-green/10 p-3 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Card>
  );
}
