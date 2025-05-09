
import React from 'react';
import { Navigate } from 'react-router-dom';

// This is just a redirect component since we're using Index.tsx now
export default function HomePage() {
  return <Navigate to="/" replace />;
}
