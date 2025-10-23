import { ReactNode } from 'react';
import { AppContext } from './context';
import { container } from './di-container';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const authController = container.getAuthController();
  const eventController = container.getEventController();

  return (
    <AppContext.Provider value={{ authController, eventController }}>
      {children}
    </AppContext.Provider>
  );
}
