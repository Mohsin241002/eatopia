// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, Timestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe9O00Ttk8eo8rnOaTY_wQRRyTgsIWY6I",
  authDomain: "eatopia-723d1.firebaseapp.com",
  databaseURL: "https://eatopia-723d1-default-rtdb.firebaseio.com",
  projectId: "eatopia-723d1",
  storageBucket: "eatopia-723d1.firebasestorage.app",
  messagingSenderId: "746181935140",
  appId: "1:746181935140:web:4046aedebfbe4df5f718b1",
  measurementId: "G-DSHK81TFHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Types for reservations
export interface RestaurantRecommendation {
  name: string;
  cuisine: string;
  priceRange: string;
  atmosphere: string;
  specialFeatures?: string[];
  specialties?: string;
  location?: string;
  rating: number;
  description: string;
}

export interface DiningReservation {
  id?: string;
  userId: string;
  location: string;
  guests: number;
  vibe: string;
  occasion: string;
  date: string;
  timestamp: Date | Timestamp;
  restaurants: RestaurantRecommendation[];
  status: 'upcoming' | 'completed' | 'planning';
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

// Firebase Firestore functions for reservations

/**
 * Save a dining reservation with restaurant recommendations to Firebase
 */
export async function saveReservationToFirebase(
  userId: string,
  preferences: {
    location: string;
    guests: number;
    vibe: string;
    occasion: string;
    date?: string;
  },
  recommendations: RestaurantRecommendation[]
): Promise<string> {
  try {
    const reservationData: Omit<DiningReservation, 'id'> = {
      userId,
      location: preferences.location,
      guests: preferences.guests,
      vibe: preferences.vibe,
      occasion: preferences.occasion,
      date: preferences.date || new Date().toISOString().split('T')[0],
      timestamp: Timestamp.now(),
      restaurants: recommendations,
      status: 'planning',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'reservations'), reservationData);
    console.log('Reservation saved to Firebase with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving reservation to Firebase:', error);
    throw error;
  }
}

/**
 * Get all reservations for a specific user
 */
export async function getUserReservations(userId: string): Promise<DiningReservation[]> {
  try {
    const q = query(
      collection(db, 'reservations'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const reservations: DiningReservation[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reservations.push({
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as DiningReservation);
    });
    
    return reservations;
  } catch (error) {
    console.error('Error fetching user reservations:', error);
    throw error;
  }
}

/**
 * Get a specific reservation by ID
 */
export async function getReservationById(reservationId: string): Promise<DiningReservation | null> {
  try {
    const docRef = doc(db, 'reservations', reservationId);
    const docSnap = await getDocs(query(collection(db, 'reservations'), where('__name__', '==', reservationId)));
    
    if (!docSnap.empty) {
      const data = docSnap.docs[0].data();
      return {
        id: docSnap.docs[0].id,
        ...data,
        timestamp: data.timestamp?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as DiningReservation;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching reservation:', error);
    throw error;
  }
}

/**
 * Update a reservation's status
 */
export async function updateReservationStatus(
  reservationId: string,
  status: 'upcoming' | 'completed' | 'planning'
): Promise<void> {
  try {
    const docRef = doc(db, 'reservations', reservationId);
    await updateDoc(docRef, {
      status,
      updatedAt: Timestamp.now(),
    });
    console.log('Reservation status updated');
  } catch (error) {
    console.error('Error updating reservation status:', error);
    throw error;
  }
}

/**
 * Delete a reservation
 */
export async function deleteReservation(reservationId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'reservations', reservationId));
    console.log('Reservation deleted');
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw error;
  }
}

export default app;
