import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface DiningExperience {
  id?: string;
  userId: string;
  name: string;
  restaurant: string;
  date: Date;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  rating?: number;
  notes?: string;
  cuisine?: string;
  priceRange?: string;
  guests?: number;
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION_NAME = 'eatopia';

// Get all experiences for a user
export const getUserExperiences = async (userId: string): Promise<DiningExperience[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const experiences: DiningExperience[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      experiences.push({
        id: doc.id,
        ...data,
        date: data.date.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as DiningExperience);
    });
    
    // Sort by date in JavaScript instead of Firestore
    return experiences.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error('Error fetching user experiences:', error);
    throw error;
  }
};

// Real-time subscription to user experiences
export const subscribeToUserExperiences = (
  userId: string, 
  callback: (experiences: DiningExperience[]) => void
) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('userId', '==', userId)
  );

  return onSnapshot(q, (querySnapshot) => {
    const experiences: DiningExperience[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      experiences.push({
        id: doc.id,
        ...data,
        date: data.date.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as DiningExperience);
    });
    // Sort by date in JavaScript instead of Firestore
    const sortedExperiences = experiences.sort((a, b) => b.date.getTime() - a.date.getTime());
    callback(sortedExperiences);
  });
};

// Get a single experience by ID
export const getExperience = async (experienceId: string): Promise<DiningExperience | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, experienceId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        date: data.date.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as DiningExperience;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching experience:', error);
    throw error;
  }
};

// Create a new experience
export const createExperience = async (experience: Omit<DiningExperience, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...experience,
      date: Timestamp.fromDate(experience.date),
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating experience:', error);
    throw error;
  }
};

// Update an experience
export const updateExperience = async (experienceId: string, updates: Partial<DiningExperience>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, experienceId);
    const updateData: any = {
      ...updates,
      updatedAt: Timestamp.now(),
    };
    
    // Convert date to Timestamp if it's being updated
    if (updates.date) {
      updateData.date = Timestamp.fromDate(updates.date);
    }
    
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating experience:', error);
    throw error;
  }
};

// Delete an experience
export const deleteExperience = async (experienceId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, experienceId));
  } catch (error) {
    console.error('Error deleting experience:', error);
    throw error;
  }
};

// Get experiences by status
export const getExperiencesByStatus = async (userId: string, status: string): Promise<DiningExperience[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      where('status', '==', status)
    );
    
    const querySnapshot = await getDocs(q);
    const experiences: DiningExperience[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      experiences.push({
        id: doc.id,
        ...data,
        date: data.date.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as DiningExperience);
    });
    
    // Sort by date in JavaScript instead of Firestore
    return experiences.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error('Error fetching experiences by status:', error);
    throw error;
  }
};

// Get upcoming experiences
export const getUpcomingExperiences = async (userId: string): Promise<DiningExperience[]> => {
  return getExperiencesByStatus(userId, 'upcoming');
};

// Get completed experiences
export const getCompletedExperiences = async (userId: string): Promise<DiningExperience[]> => {
  return getExperiencesByStatus(userId, 'completed');
};

// Get user statistics
export const getUserStats = async (userId: string) => {
  try {
    const experiences = await getUserExperiences(userId);
    
    const total = experiences.length;
    const completed = experiences.filter(exp => exp.status === 'completed').length;
    const upcoming = experiences.filter(exp => exp.status === 'upcoming').length;
    const cancelled = experiences.filter(exp => exp.status === 'cancelled').length;
    
    // Calculate average rating
    const ratedExperiences = experiences.filter(exp => exp.rating && exp.rating > 0);
    const avgRating = ratedExperiences.length > 0 
      ? ratedExperiences.reduce((sum, exp) => sum + (exp.rating || 0), 0) / ratedExperiences.length 
      : 0;
    
    return {
      total,
      completed,
      upcoming,
      cancelled,
      avgRating: Number(avgRating.toFixed(1))
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};
