
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import InnovationSubmitPage from '@/pages/innovations/submit/index';
import BasicInfoPage from '@/pages/innovations/submit/basic-info';
import DetailsPage from '@/pages/innovations/submit/details';
import MediaPage from '@/pages/innovations/submit/media';
import TechnicalPage from '@/pages/innovations/submit/technical';
import RegulatoryPage from '@/pages/innovations/submit/regulatory';
import ContactInformationPage from '@/pages/innovations/submit/contact';
import ReviewPage from '@/pages/innovations/submit/review';

export const InnovationSubmissionRoutes = (
  <Route path="/innovations/submit" element={
    <ProtectedRoute>
      <InnovationSubmitPage />
    </ProtectedRoute>
  }>
    <Route index element={<div className="flex justify-center items-center p-8">
      <p className="text-gray-600">
        Select an option from the right to begin your innovation submission.
      </p>
    </div>} />
    <Route path="basic-info" element={<BasicInfoPage />} />
    <Route path="details" element={<DetailsPage />} />
    <Route path="media" element={<MediaPage />} />
    <Route path="technical" element={<TechnicalPage />} />
    <Route path="regulatory" element={<RegulatoryPage />} />
    <Route path="contact" element={<ContactInformationPage />} />
    <Route path="review" element={<ReviewPage />} />
  </Route>
);
