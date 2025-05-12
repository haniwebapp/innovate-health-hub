
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { DynamicPageLoader } from '@/components/common/DynamicPageLoader';

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
    <Route 
      path="/" 
      element={<DynamicPageLoader><HomePage /></DynamicPageLoader>} 
    />
    <Route 
      path="/about" 
      element={<DynamicPageLoader><AboutPage /></DynamicPageLoader>} 
    />
    <Route 
      path="/innovations" 
      element={<DynamicPageLoader><InnovationsPage /></DynamicPageLoader>} 
    />
    <Route 
      path="/innovations/:id" 
      element={<DynamicPageLoader><InnovationDetailPage /></DynamicPageLoader>} 
    />
    <Route 
      path="/knowledge-hub" 
      element={<DynamicPageLoader><KnowledgeHubPage /></DynamicPageLoader>} 
    />
    <Route 
      path="/investment" 
      element={<DynamicPageLoader><InvestmentPage /></DynamicPageLoader>} 
    />
    <Route 
      path="/regulatory" 
      element={<DynamicPageLoader><RegulatoryPage /></DynamicPageLoader>} 
    />
    <Route 
      path="/pages/:slug" 
      element={<DynamicPageLoader><DynamicPage /></DynamicPageLoader>} 
    />
  </>
);
