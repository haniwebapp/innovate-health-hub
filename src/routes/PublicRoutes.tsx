
import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { PageLoader } from '@/components/ui/page-loader'; // Assuming there's a PageLoader component

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/Index'));
const AboutPage = lazy(() => import('@/pages/about/index'));
const InnovationsPage = lazy(() => import('@/pages/innovations/index'));
const InnovationDetailPage = lazy(() => import('@/pages/innovations/[id]'));
const KnowledgeHubPage = lazy(() => import('@/pages/knowledge-hub/index'));
const InvestmentPage = lazy(() => import('@/pages/investment/index'));
const RegulatoryPage = lazy(() => import('@/pages/regulatory/index'));
const DynamicPage = lazy(() => import('@/pages/DynamicPage'));

// Create the public routes
export const PublicRoutes = (
  <>
    <Route path="/" element={
      <Suspense fallback={<PageLoader />}>
        <HomePage />
      </Suspense>
    } />
    <Route path="/about" element={
      <Suspense fallback={<PageLoader />}>
        <AboutPage />
      </Suspense>
    } />
    <Route path="/innovations" element={
      <Suspense fallback={<PageLoader />}>
        <InnovationsPage />
      </Suspense>
    } />
    <Route path="/innovations/:id" element={
      <Suspense fallback={<PageLoader />}>
        <InnovationDetailPage />
      </Suspense>
    } />
    <Route path="/knowledge-hub" element={
      <Suspense fallback={<PageLoader />}>
        <KnowledgeHubPage />
      </Suspense>
    } />
    <Route path="/investment" element={
      <Suspense fallback={<PageLoader />}>
        <InvestmentPage />
      </Suspense>
    } />
    <Route path="/regulatory" element={
      <Suspense fallback={<PageLoader />}>
        <RegulatoryPage />
      </Suspense>
    } />
    <Route path="/pages/:slug" element={
      <Suspense fallback={<PageLoader />}>
        <DynamicPage />
      </Suspense>
    } />
  </>
);
