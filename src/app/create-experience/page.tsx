'use client';

import { useAuth } from '@/contexts/AuthContext';
import MainPage from '@/components/pages/MainPage';

export default function CreateExperiencePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <MainPage />
    </div>
  );
}