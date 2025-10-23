import { createContext } from 'react';
import { AuthController } from '../../presentation/controllers/AuthController';
import { EventController } from '../../presentation/controllers/EventController';

export interface AppContextType {
  authController: AuthController;
  eventController: EventController;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
