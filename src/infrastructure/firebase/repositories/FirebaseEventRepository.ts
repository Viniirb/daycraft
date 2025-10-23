import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { firestore } from '../config/firebase.config';
import { Event } from '../../../domain/entities/Event';
import { IEventRepository } from '../../../domain/repositories/IEventRepository';
import { EventMapper, FirestoreEventData } from '../mappers/EventMapper';
import { NotFoundError } from '../../../shared/errors';

/**
 * FirebaseEventRepository - Infrastructure Layer
 * Implementação do repositório de eventos usando Firestore
 */
export class FirebaseEventRepository implements IEventRepository {
  private readonly collectionName = 'events';

  async create(event: Event): Promise<Event> {
    try {
      console.log('FirebaseEventRepository.create - Iniciando criação do evento:', event);
      const eventData = EventMapper.toFirestore(event);
      console.log('FirebaseEventRepository.create - Dados convertidos:', eventData);

      const docRef = await addDoc(collection(firestore, this.collectionName), eventData);
      console.log('FirebaseEventRepository.create - Documento criado com ID:', docRef.id);

      // Buscar o evento criado para retornar com ID
      const createdEvent = await this.findById(docRef.id);
      if (!createdEvent) {
        throw new Error('Erro ao criar evento');
      }

      console.log('FirebaseEventRepository.create - Evento criado com sucesso:', createdEvent);
      return createdEvent;
    } catch (error: unknown) {
      console.error('FirebaseEventRepository.create - Erro:', error);
      throw new Error(`Erro ao criar evento: ${(error as Error).message}`);
    }
  }

  async findById(id: string): Promise<Event | null> {
    try {
      const docRef = doc(firestore, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      return EventMapper.fromFirestore(docSnap.data() as FirestoreEventData, docSnap.id);
    } catch (error: unknown) {
      throw new Error(`Erro ao buscar evento: ${(error as Error).message}`);
    }
  }

  async findByUserId(userId: string): Promise<Event[]> {
    try {
      const q = query(
        collection(firestore, this.collectionName),
        where('userId', '==', userId)
      );

      const querySnapshot = await getDocs(q);
      const events: Event[] = [];

      querySnapshot.forEach((doc) => {
        events.push(EventMapper.fromFirestore(doc.data() as FirestoreEventData, doc.id));
      });

      return events;
    } catch (error: unknown) {
      throw new Error(`Erro ao buscar eventos do usuário: ${(error as Error).message}`);
    }
  }

  async update(event: Event): Promise<Event> {
    try {
      const docRef = doc(firestore, this.collectionName, event.id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new NotFoundError('Evento', event.id);
      }

      const eventData = EventMapper.toFirestore(event);
      await updateDoc(docRef, eventData as unknown as Record<string, unknown>);

      const updatedEvent = await this.findById(event.id);
      if (!updatedEvent) {
        throw new Error('Erro ao atualizar evento');
      }

      return updatedEvent;
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Erro ao atualizar evento: ${(error as Error).message}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(firestore, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new NotFoundError('Evento', id);
      }

      await deleteDoc(docRef);
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Erro ao deletar evento: ${(error as Error).message}`);
    }
  }

  observeByUserId(userId: string, callback: (events: Event[]) => void): () => void {
    const q = query(
      collection(firestore, this.collectionName),
      where('userId', '==', userId)
    );

    const unsubscribe: Unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const events: Event[] = [];
        querySnapshot.forEach((doc) => {
          try {
            events.push(EventMapper.fromFirestore(doc.data() as FirestoreEventData, doc.id));
          } catch (error: unknown) {
            console.error(`Erro ao mapear evento ${doc.id}:`, error);
          }
        });
        callback(events);
      },
      (error) => {
        console.error('Erro ao observar eventos:', error);
        callback([]);
      }
    );

    return unsubscribe;
  }
}
