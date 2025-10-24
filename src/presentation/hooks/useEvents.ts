import { useState, useEffect } from 'react';
import { EventViewModel } from '../view-models/EventViewModel';
import { EventController } from '../controllers/EventController';
import { CreateEventDTO } from '../../application/dto/CreateEventDTO';

/**
 * useEvents Hook - Presentation Layer
 * Hook React para gerenciar eventos
 */
export function useEvents(eventController: EventController, userId: string | undefined) {
  const [events, setEvents] = useState<EventViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Observa eventos em tempo real
  useEffect(() => {
    if (!userId) {
      setEvents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = eventController.observeUserEvents(userId, (userEvents) => {
      setEvents(userEvents);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [eventController, userId]);

  /**
   * Cria um novo evento
   */
  const createEvent = async (dto: CreateEventDTO): Promise<boolean> => {
    try {
      setError(null);
      await eventController.createEvent(dto);
      return true;
    } catch (err) {
      const errorMessage = (err as Error).message || 'Erro ao criar evento';
      setError(errorMessage);
      return false;
    }
  };

  /**
   * Atualiza um evento
   */
  const updateEvent = async (
    eventId: string,
    updates: Record<string, unknown>
  ): Promise<boolean> => {
    try {
      if (!userId) {
        setError('Usuário não autenticado');
        return false;
      }

      setError(null);
      await eventController.updateEvent(eventId, userId, updates);
      return true;
    } catch (err) {
      setError((err as Error).message || 'Erro ao atualizar evento');
      return false;
    }
  };

  /**
   * Deleta um evento
   */
  const deleteEvent = async (eventId: string): Promise<boolean> => {
    try {
      if (!userId) {
        setError('Usuário não autenticado');
        return false;
      }

      setError(null);
      await eventController.deleteEvent(eventId, userId);
      return true;
    } catch (err) {
      setError((err as Error).message || 'Erro ao deletar evento');
      return false;
    }
  };

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent
  };
}
