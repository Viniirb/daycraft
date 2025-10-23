import { useMemo } from 'react';
import { EventController } from '../controllers/EventController';
import { AuthController } from '../controllers/AuthController';
import { IEventRepository } from '../../domain/repositories/IEventRepository';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';

/**
 * useController Hook - Presentation Layer
 * Hook para criar instâncias de controllers (singleton por componente)
 */
export function useEventController(eventRepository: IEventRepository): EventController {
  return useMemo(() => new EventController(eventRepository), [eventRepository]);
}

export function useAuthController(authRepository: IAuthRepository): AuthController {
  return useMemo(() => new AuthController(authRepository), [authRepository]);
}
