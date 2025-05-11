
import { Route } from 'react-router-dom';
import RegisterPage from '@/pages/auth/RegisterPage';
import LoginPage from '@/pages/auth/LoginPage';
import VerificationPage from '@/pages/auth/VerificationPage';

export const AuthRoutes = (
  <>
    {/* Auth Routes */}
    <Route path="/auth/register" element={<RegisterPage />} />
    <Route path="/auth/login" element={<LoginPage />} />
    <Route path="/auth/verify" element={<VerificationPage />} />
  </>
);
