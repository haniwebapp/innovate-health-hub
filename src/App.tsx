
import { QueryClient } from '@tanstack/react-query';
import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routes/AppRoutes';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <AppProviders queryClient={queryClient}>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
