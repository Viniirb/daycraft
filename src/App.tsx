import { AppProvider } from './main/config/AppContext';
import AppRouter from './presentation/routes/AppRouter';

/**
 * App Component - Entry Point
 * Fornece o contexto da aplicação e renderiza as rotas
 */
function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;