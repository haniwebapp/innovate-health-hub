
import { QueryClient } from '@tanstack/react-query';
import { AppProviders } from './providers/AppProviders';
import { routes } from './routes/AppRoutes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import './services/ai/AIServiceRegistry'; // Import the registry to ensure services get registered

const queryClient = new QueryClient();
const router = createBrowserRouter(routes);

function App() {
  return (
    <AppProviders queryClient={queryClient}>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
