'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { GridBackgroundDemo } from '@/components/background/GridBackground';
import { ScrollAnimatedSection } from '@/components/animation/AnimatedSection';
import { SimpleMouseTracker } from '@/components/animation/SimpleMouseTracker';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import BackButton from '@/components/layout/BackButton';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const { login, resetPassword } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      router.push('/main');
    } catch (error: any) {
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await resetPassword(email);
      setError('Password reset email sent! Check your inbox.');
      setShowForgotPassword(false);
    } catch (error: any) {
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-x-hidden">
      <BackButton />
      <SimpleMouseTracker />
      
      {/* Grid Background */}
      <div className="relative min-h-screen">
        <GridBackgroundDemo className="min-h-screen" />
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            {/* Logo */}
            <ScrollAnimatedSection animation="zoomIn" delay={200}>
              <Link href="/" className="flex justify-center mb-8">
                <Image
                  src="/icons/logo.svg"
                  alt="Eatopia Logo"
                  width={150}
                  height={90}
                  className="text-black dark:text-white filter dark:brightness-0 dark:invert"
                  priority
                />
              </Link>
            </ScrollAnimatedSection>

            {/* Header */}
            <ScrollAnimatedSection animation="slideUp" delay={400}>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-roboto text-white mb-4">
                  {showForgotPassword ? 'Reset Password' : 'Welcome Back'}
                </h2>
                {!showForgotPassword && (
                  <p className="text-lg font-roboto text-gray-300">
                    Sign in to access your culinary journey
                  </p>
                )}
              </div>
            </ScrollAnimatedSection>

            {/* Form Container */}
            <ScrollAnimatedSection animation="slideUp" delay={600}>
              <div className="bg-black/90 backdrop-blur-xl border border-gray-800 rounded-3xl py-12 px-8 shadow-2xl">
                
                {/* Error/Success Message */}
                {error && (
                  <div className={`mb-6 p-4 rounded-2xl text-sm font-roboto ${
                    error.includes('sent') 
                      ? 'bg-green-900/20 text-green-400 border border-green-800' 
                      : 'bg-red-900/20 text-red-400 border border-red-800'
                  }`}>
                    {error}
                  </div>
                )}

                <form onSubmit={showForgotPassword ? handleForgotPassword : handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email" className="mb-3 block">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  {!showForgotPassword && (
                    <div>
                      <Label htmlFor="password" className="mb-3 block">
                        Password
                      </Label>
                      <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-2xl font-roboto text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Please wait...
                      </div>
                    ) : (
                      showForgotPassword ? 'Send Reset Email' : 'Sign In'
                    )}
                  </button>
                </form>

                {/* Footer Links */}
                <div className="mt-8 text-center space-y-4">
                  {showForgotPassword ? (
                    <button
                      onClick={() => setShowForgotPassword(false)}
                      className="text-sm font-roboto text-orange-400 hover:text-orange-300 transition-colors duration-200"
                    >
                      ← Back to Sign In
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowForgotPassword(true)}
                        className="block w-full text-sm font-roboto text-gray-300 hover:text-orange-400 transition-colors duration-200"
                      >
                        Forgot your password?
                      </button>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-sm font-roboto text-gray-300">
                          Don't have an account?
                        </span>
                        <Link
                          href="/signup"
                          className="text-sm font-roboto text-orange-400 hover:text-orange-300 transition-colors duration-200"
                        >
                          Sign up
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
