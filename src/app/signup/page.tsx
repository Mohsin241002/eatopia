'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ParallaxSection } from '@/components/ParallaxSection';
import { ScrollAnimatedSection } from '@/components/ScrollAnimatedSection';
import { SimpleMouseTracker } from '@/components/SimpleMouseTracker';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signup(formData.email, formData.password, formData.name);
      router.push('/dashboard');
    } catch (error: any) {
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      default:
        return 'An error occurred while creating your account. Please try again.';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-x-hidden">
      <SimpleMouseTracker />
      
      {/* Background */}
      <ParallaxSection 
        pixabayQuery="modern restaurant interior design"
        speed={0.2}
        overlay="dark"
        className="min-h-screen"
      >
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 pt-24">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* Logo */}
            <ScrollAnimatedSection animation="zoomIn" delay={200}>
              <Link href="/" className="flex justify-center mb-8">
                <Image
                  src="/logo.svg"
                  alt="Eatopia Logo"
                  width={150}
                  height={90}
                  className="text-white filter brightness-0 invert"
                  priority
                />
              </Link>
            </ScrollAnimatedSection>

            {/* Header */}
            <ScrollAnimatedSection animation="slideUp" delay={400}>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-riveta-medium text-white mb-4">
                  Join EATOPIA
                </h2>
                <p className="text-lg font-riveta text-gray-200">"
                  Create your account to discover extraordinary dining experiences
                </p>
              </div>
            </ScrollAnimatedSection>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <ScrollAnimatedSection animation="slideUp" delay={600}>
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl py-12 px-8 shadow-2xl">
                
                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 rounded-2xl text-sm font-riveta bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name Field */}
                  <div>
                    <Label htmlFor="name" className="mb-3 block">
                      Full Name
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email" className="mb-3 block">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <Label htmlFor="password" className="mb-3 block">
                      Password
                    </Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      minLength={6}
                    />
                    <p className="text-xs font-riveta text-gray-500 dark:text-gray-400 mt-2 ml-1">
                      Must be at least 6 characters long
                    </p>
                  </div>

                  {/* Confirm Password Field */}
                  {/* Confirm Password Field */}
                  <div>
                    <Label htmlFor="confirmPassword" className="mb-3 block">
                      Confirm Password
                    </Label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-2xl font-riveta-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-sm font-riveta text-gray-600 dark:text-gray-400">
                      Already have an account?
                    </span>
                    <Link
                      href="/login"
                      className="text-sm font-riveta-medium text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 transition-colors duration-200"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
}
