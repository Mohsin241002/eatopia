'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DiningExperience, 
  getUserExperiences, 
  getUserStats,
  subscribeToUserExperiences
} from '@/lib/experiences';

export function useDiningExperiences() {
  const { user } = useAuth();
  const [experiences, setExperiences] = useState<DiningExperience[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    upcoming: 0,
    cancelled: 0,
    avgRating: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setExperiences([]);
      setStats({ total: 0, completed: 0, upcoming: 0, cancelled: 0, avgRating: 0 });
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch experiences and stats
        const [userExperiences, userStats] = await Promise.all([
          getUserExperiences(user.uid),
          getUserStats(user.uid)
        ]);
        
        setExperiences(userExperiences);
        setStats(userStats);
      } catch (err) {
        console.error('Error fetching experiences:', err);
        setError('Failed to load experiences');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscription
    const unsubscribe = subscribeToUserExperiences(user.uid, (updatedExperiences) => {
      setExperiences(updatedExperiences);
      
      // Update stats when experiences change
      getUserStats(user.uid).then(setStats).catch(console.error);
    });

    return () => unsubscribe();
  }, [user]);

  const refreshExperiences = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const [userExperiences, userStats] = await Promise.all([
        getUserExperiences(user.uid),
        getUserStats(user.uid)
      ]);
      
      setExperiences(userExperiences);
      setStats(userStats);
    } catch (err) {
      console.error('Error refreshing experiences:', err);
      setError('Failed to refresh experiences');
    } finally {
      setLoading(false);
    }
  };

  return {
    experiences,
    stats,
    loading,
    error,
    refreshExperiences
  };
}
