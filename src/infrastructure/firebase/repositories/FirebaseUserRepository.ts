import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { firestore } from '../config/firebase.config';
import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { UserMapper } from '../mappers/UserMapper';
import { NotFoundError } from '../../../shared/errors';

/**
 * FirebaseUserRepository - Infrastructure Layer
 * Implementação do repositório de usuários usando Firestore
 */
export class FirebaseUserRepository implements IUserRepository {
  private readonly collectionName = 'users';

  async findById(id: string): Promise<User | null> {
    try {
      const docRef = doc(firestore, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      return UserMapper.fromFirestore(docSnap.data(), docSnap.id);
    } catch (error: unknown) {
      throw new Error(`Erro ao buscar usuário: ${(error as Error).message}`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const q = query(
        collection(firestore, this.collectionName),
        where('email', '==', email)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return null;
      }

      const docSnap = querySnapshot.docs[0];
      return UserMapper.fromFirestore(docSnap.data(), docSnap.id);
    } catch (error: unknown) {
      throw new Error(`Erro ao buscar usuário por email: ${(error as Error).message}`);
    }
  }

  async save(user: User): Promise<User> {
    try {
      const docRef = doc(firestore, this.collectionName, user.id);
      const userData = UserMapper.toFirestore(user);

      await setDoc(docRef, userData);

      const savedUser = await this.findById(user.id);
      if (!savedUser) {
        throw new Error('Erro ao salvar usuário');
      }

      return savedUser;
    } catch (error: unknown) {
      throw new Error(`Erro ao salvar usuário: ${(error as Error).message}`);
    }
  }

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    try {
      const docRef = doc(firestore, this.collectionName, userId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new NotFoundError('Usuário', userId);
      }

      const updateData: Record<string, unknown> = {};
      if (data.displayName !== undefined) updateData.displayName = data.displayName;
      if (data.photoURL !== undefined) updateData.photoURL = data.photoURL;

      await updateDoc(docRef, updateData);

      const updatedUser = await this.findById(userId);
      if (!updatedUser) {
        throw new Error('Erro ao atualizar usuário');
      }

      return updatedUser;
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Erro ao atualizar usuário: ${(error as Error).message}`);
    }
  }

  async delete(userId: string): Promise<void> {
    try {
      const docRef = doc(firestore, this.collectionName, userId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new NotFoundError('Usuário', userId);
      }

      await deleteDoc(docRef);
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Erro ao deletar usuário: ${(error as Error).message}`);
    }
  }
}
