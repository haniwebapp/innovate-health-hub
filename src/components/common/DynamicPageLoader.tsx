
import React, { Suspense } from 'react';
import { PageLoader } from '@/components/ui/page-loader';

interface DynamicPageLoaderProps {
  children: React.ReactNode;
}

export const DynamicPageLoader = ({ children }: DynamicPageLoaderProps) => {
  return (
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  );
};
