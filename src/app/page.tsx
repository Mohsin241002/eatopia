import Header from '@/components/layout/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollAnimatedSection } from '@/components/animation/AnimatedSection';
import { MouseTracker, FloatingElement } from '@/components/animation/MouseTracker';
import { SimpleMouseTracker } from '@/components/animation/SimpleMouseTracker';
import { GridBackgroundDemo } from '@/components/background/GridBackground';
import { CreateExperienceButton } from '@/components/CreateExperienceButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black/90 relative overflow-x-hidden">
      {/* Simple Mouse Tracker */}
      <SimpleMouseTracker />
      
      {/* Mouse Tracker */}
      <MouseTracker />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative z-10 pt-16">
        {/* Hero Section with Grid Background */}
        <div className="relative">
          <GridBackgroundDemo className="h-screen" />
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white dark:text-gray-100">
            {/* Logo */}
            <ScrollAnimatedSection animation="zoomIn" delay={200}>
              <div className="mb-8">
                <Image
                  src="/icons/logo.svg"
                  alt="Eatopia Logo"
                  width={200}
                  height={120}
                  className="text-white filter brightness-0 invert"
                  priority
                />
              </div>
            </ScrollAnimatedSection>
            
            {/* Main Headline with Animation */}
            <ScrollAnimatedSection animation="slideUp" delay={400}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-roboto text-black dark:text-gray-100 text-center mb-6 max-w-4xl">
                Discover Extraordinary <span className="text-orange-400">Dining Experiences</span>
              </h1>
            </ScrollAnimatedSection>
            
            {/* Subtitle with Animation */}
            <ScrollAnimatedSection animation="slideUp" delay={600}>
              <p className="text-lg md:text-xl font-roboto text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl">
                Connect with curated restaurants, explore unique culinary journeys, and create unforgettable dining memories
              </p>
            </ScrollAnimatedSection>
            
            {/* CTA Button with Animation */}
            <ScrollAnimatedSection animation="slideUp" delay={800}>
              <CreateExperienceButton />
            </ScrollAnimatedSection>
          </div>
        </div>

        {/* How It Works Section */}
        <GridBackgroundDemo>
          <div className="w-full py-20">
            <div className="max-w-7xl mx-auto px-4">
              {/* Section Header */}
              <ScrollAnimatedSection animation="slideUp" delay={200}>
                <div className="text-center mb-20">
                  <p className="text-gray-600 dark:text-gray-400 font-roboto mb-4 text-lg">
                    Three simple steps to your perfect dining experience
                  </p>
                  <h2 className="text-4xl md:text-6xl font-roboto text-black dark:text-white">
                    How It <span className="text-orange-500">Works</span>
                  </h2>
                </div>
              </ScrollAnimatedSection>

            {/* Step 1 - Text Left, Image Right */}
            <ScrollAnimatedSection animation="slideUp" delay={300}>
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-roboto text-xl">
                      01
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-roboto text-black dark:text-white">
                    Choose Group Size
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 font-roboto leading-relaxed">
                    Tell us how many people will be dining. Whether it's a romantic dinner for two or a celebration for 20, we've got you covered.
                  </p>
                </div>
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/how-it-works-step1.jpg"
                      alt="Choose Group Size - Dining table setup"
                      width={600}
                      height={400}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </ScrollAnimatedSection>

            {/* Step 2 - Image Left, Text Right */}
            <ScrollAnimatedSection animation="slideUp" delay={400}>
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                <div className="relative order-2 lg:order-1">
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/how-it-works-step2.jpg"
                      alt="Pick Restaurant - Restaurant interior"
                      width={600}
                      height={400}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6 order-1 lg:order-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-roboto text-xl">
                      02
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-roboto text-black dark:text-white">
                    Pick Restaurant
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 font-roboto leading-relaxed">
                    Browse our curated selection of restaurants based on your preferences, cuisine type, location, and budget to find your perfect match.
                  </p>
                </div>
              </div>
            </ScrollAnimatedSection>

            {/* Step 3 - Text Left, Image Right */}
            <ScrollAnimatedSection animation="slideUp" delay={500}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-roboto text-xl">
                      03
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-roboto text-black dark:text-white">
                    Enjoy & Share
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 font-roboto leading-relaxed">
                    Book your table, enjoy an extraordinary dining experience, and share your memories with our vibrant community of food lovers.
                  </p>
                </div>
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/how-it-works-step3.jpg"
                      alt="Enjoy & Share - Dining experience"
                      width={600}
                      height={400}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>
          </div>
        </GridBackgroundDemo>

        {/* Why Choose Eatopia Section with Grid Background */}
        <GridBackgroundDemo>
          <div className="w-full py-20">
            <div className="max-w-6xl mx-auto px-4">
              {/* Section Header */}
              <ScrollAnimatedSection animation="slideUp" delay={200}>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-roboto text-black dark:text-white mb-4">
                    Why Choose <span className="text-orange-500">Eatopia</span>
                  </h2>
                  <p className="text-lg font-roboto text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    Experience dining like never before with our innovative platform
                  </p>
                </div>
              </ScrollAnimatedSection>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1: Explore */}
              <ScrollAnimatedSection animation="slideUp" delay={300}>
                <FloatingElement speed={0.01}>
                  <div className="text-center group cursor-pointer">
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-8 mb-4 hover:border-orange-500 hover:shadow-2xl hover:bg-white dark:hover:bg-black/80 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors duration-300">
                        <svg className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-roboto text-black dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-300">Explore</h3>
                      <p className="font-roboto dark:text-gray-300 dark:text-gray-300 text-sm">
                        Discover exceptional dining venues and curated restaurants from around the world
                      </p>
                    </div>
                  </div>
                </FloatingElement>
              </ScrollAnimatedSection>

              {/* Feature 2: Discover */}
              <ScrollAnimatedSection animation="slideUp" delay={400}>
                <FloatingElement speed={0.015}>
                  <div className="text-center group cursor-pointer">
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-8 mb-4 hover:border-orange-500 hover:shadow-2xl hover:bg-white dark:hover:bg-black/80 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors duration-300">
                        <svg className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-roboto text-black dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-300">Discover</h3>
                      <p className="font-roboto dark:text-gray-300 dark:text-gray-300 text-sm">
                        Uncover hidden gems and unique culinary experiences tailored to your taste
                      </p>
                    </div>
                  </div>
                </FloatingElement>
              </ScrollAnimatedSection>

              {/* Feature 3: Connect */}
              <ScrollAnimatedSection animation="slideUp" delay={500}>
                <FloatingElement speed={0.012}>
                  <div className="text-center group cursor-pointer">
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-8 mb-4 hover:border-orange-500 hover:shadow-2xl hover:bg-white dark:hover:bg-black/80 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors duration-300">
                        <svg className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-roboto text-black dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-300">Connect</h3>
                      <p className="font-roboto dark:text-gray-300 dark:text-gray-300 text-sm">
                        Build meaningful connections with fellow food enthusiasts and dining communities
                      </p>
                    </div>
                  </div>
                </FloatingElement>
              </ScrollAnimatedSection>

              {/* Feature 4: Experience */}
              <ScrollAnimatedSection animation="slideUp" delay={600}>
                <FloatingElement speed={0.008}>
                  <div className="text-center group cursor-pointer">
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-8 mb-4 hover:border-orange-500 hover:shadow-2xl hover:bg-white dark:hover:bg-black/80 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors duration-300">
                        <svg className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-roboto text-black dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-300">Experience</h3>
                      <p className="font-roboto dark:text-gray-300 dark:text-gray-300 text-sm">
                        Create and share memorable dining experiences that last a lifetime
                      </p>
                    </div>
                  </div>
                </FloatingElement>
              </ScrollAnimatedSection>
            </div>
          </div>
          </div>
        </GridBackgroundDemo>

        {/* CTA Section with Grid Background */}
        <GridBackgroundDemo>
          <div className="w-full py-20">
            <div className="max-w-4xl mx-auto text-center px-4">
              <ScrollAnimatedSection animation="zoomIn" delay={200}>
                <h2 className="text-3xl md:text-5xl font-roboto text-black dark:text-white mb-6">
                  Ready to Discover Your Next <span className="text-orange-500">Culinary Adventure?</span>
                </h2>
              </ScrollAnimatedSection>
            
            <ScrollAnimatedSection animation="slideUp" delay={400}>
              <p className="text-lg font-roboto text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of food lovers who are already experiencing the extraordinary
              </p>
            </ScrollAnimatedSection>
            
            <ScrollAnimatedSection animation="slideUp" delay={600}>
              <FloatingElement speed={0.01}>
                <button 
                  disabled
                  className="bg-gray-400 cursor-not-allowed text-white font-roboto px-8 py-4 rounded-full text-lg shadow-lg relative"
                  title="Coming Soon"
                >
                  <span className="transition-all duration-300">
                    Get Started Today (Coming Soon)
                  </span>
                </button>
              </FloatingElement>
            </ScrollAnimatedSection>
          </div>
          </div>
        </GridBackgroundDemo>
      </main>
    </div>
  );
}
