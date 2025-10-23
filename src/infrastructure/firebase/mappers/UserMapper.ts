import { User as FirebaseUser } from 'firebase/auth';
import { User } from '../../../domain/entities/User';

/**
 * UserMapper - Infrastructure Layer
 * Mapeia entre Firebase User e Domain User
 */
export class UserMapper {
  /**
   * Converte Firebase User para Domain User
   */
  static toDomain(firebaseUser: FirebaseUser): User {
    return new User(
      firebaseUser.uid,
      firebaseUser.email || '',
      firebaseUser.displayName || undefined,
      firebaseUser.photoURL || undefined,
      firebaseUser.metadata.creationTime
        ? new Date(firebaseUser.metadata.creationTime)
        : undefined
    );
  }

  /**
   * Converte Domain User para formato Firebase (para persistência)
   */
  static toFirestore(user: User) {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
      createdAt: user.createdAt?.toISOString() || new Date().toISOString()
    };
  }

  /**
   * Converte documento Firestore para Domain User
   */
  static fromFirestore(data: Record<string, unknown>, id: string): User {
    return new User(
      id,
      String(data.email || ''),
      data.displayName ? String(data.displayName) : undefined,
      data.photoURL ? String(data.photoURL) : undefined,
      data.createdAt ? new Date(String(data.createdAt)) : undefined
    );
  }
}
