
import { QueryClient } from '@tanstack/react-query';
import { AppProviders } from './providers/AppProviders';
import { appRoutes } from './routes/AppRoutes'; // Changed AppRoutes to appRoutes
import './App.css';
import './services/ai/AIServiceRegistry'; // Import the registry to ensure services get registered

const queryClient = new QueryClient();

function App() {
  return (
    <AppProviders queryClient={queryClient}>
      {appRoutes}
    </AppProviders>
  );
}

export default App;
