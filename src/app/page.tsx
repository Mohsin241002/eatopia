import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { PixabayBackground } from '@/components/PixabayBackground';
import { ParallaxSection } from '@/components/ParallaxSection';
import { ScrollAnimatedSection } from '@/components/ScrollAnimatedSection';
import { MouseTracker, FloatingElement } from '@/components/MouseTracker';
import { SimpleMouseTracker } from '@/components/SimpleMouseTracker';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-x-hidden">
      {/* Simple Mouse Tracker */}
      <SimpleMouseTracker />
      
      {/* Mouse Tracker */}
      <MouseTracker />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section with Parallax */}
        <ParallaxSection 
          pixabayQuery="elegant restaurant fine dining minimalist"
          speed={0.3}
          overlay="none"
          className="min-h-screen"
        >
          <div className="min-h-screen flex flex-col items-center justify-center px-4 text-white dark:text-gray-100">
            {/* Floating Logo */}
            <ScrollAnimatedSection animation="zoomIn" delay={200}>
              <FloatingElement speed={0.02}>
                <div className="mb-8">
                  <Image
                    src="/logo.svg"
                    alt="Eatopia Logo"
                    width={200}
                    height={120}
                    className="text-white filter brightness-0 invert"
                    priority
                  />
                </div>
              </FloatingElement>
            </ScrollAnimatedSection>
            
            {/* Main Headline with Animation */}
            <ScrollAnimatedSection animation="slideUp" delay={400}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-cream-black text-white dark:text-gray-100 text-center mb-6 max-w-4xl">
                Discover Extraordinary <span className="text-orange-400">Dining Experiences</span>
              </h1>
            </ScrollAnimatedSection>
            
            {/* Subtitle with Animation */}
            <ScrollAnimatedSection animation="slideUp" delay={600}>
              <p className="text-lg md:text-xl font-cream text-gray-200 dark:text-gray-300 text-center mb-12 max-w-2xl">
                Connect with curated restaurants, explore unique culinary journeys, and create unforgettable dining memories
              </p>
            </ScrollAnimatedSection>
            
            {/* CTA Button with Animation */}
            <ScrollAnimatedSection animation="slideUp" delay={800}>
              <Link 
                href="/create-experience"
                className="bg-orange-500 hover:bg-orange-600 text-white font-cream-bold px-8 py-4 rounded-full text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-lg group"
              >
                <span className="group-hover:tracking-wider transition-all duration-300">
                  Start Your Culinary Journey
                </span>
              </Link>
            </ScrollAnimatedSection>
          </div>
        </ParallaxSection>

        {/* Features Section with Parallax Background */}
        <ParallaxSection 
          pixabayQuery="modern restaurant interior design"
          speed={0.2}
          overlay="light"
          className="py-20"
        >
          <div className="max-w-6xl mx-auto px-4">
            {/* Section Header */}
            <ScrollAnimatedSection animation="slideUp" delay={200}>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-cream-bold text-black dark:text-black mb-4">
                  Why Choose <span className="text-orange-500">Eatopia</span>
                </h2>
                <p className="text-lg font-cream text-gray-600 dark:text-black-300 dark:text-black-300 max-w-2xl mx-auto">
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
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-8 mb-4 hover:border-orange-500 hover:shadow-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors duration-300">
                        <svg className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-cream-bold text-black dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-300">Explore</h3>
                      <p className="font-cream text-gray-600 dark:text-gray-300 dark:text-gray-300 text-sm">
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
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-8 mb-4 hover:border-orange-500 hover:shadow-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors duration-300">
                        <svg className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-cream-bold text-black dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-300">Discover</h3>
                      <p className="font-cream text-gray-600 dark:text-gray-300 dark:text-gray-300 text-sm">
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
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-8 mb-4 hover:border-orange-500 hover:shadow-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors duration-300">
                        <svg className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-cream-bold text-black dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-300">Connect</h3>
                      <p className="font-cream text-gray-600 dark:text-gray-300 dark:text-gray-300 text-sm">
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
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-8 mb-4 hover:border-orange-500 hover:shadow-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors duration-300">
                        <svg className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-cream-bold text-black dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-300">Experience</h3>
                      <p className="font-cream text-gray-600 dark:text-gray-300 dark:text-gray-300 text-sm">
                        Create and share memorable dining experiences that last a lifetime
                      </p>
                    </div>
                  </div>
                </FloatingElement>
              </ScrollAnimatedSection>
            </div>
          </div>
        </ParallaxSection>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                   backgroundSize: '60px 60px'
                 }} 
            />
          </div>
          
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <ScrollAnimatedSection animation="slideUp" delay={200}>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-cream-bold text-black dark:text-white mb-4">
                  How It <span className="text-orange-500">Works</span>
                </h2>
                <p className="text-lg font-cream text-gray-600 dark:text-gray-300 dark:text-gray-300 max-w-2xl mx-auto">
                  Your journey to extraordinary dining experiences starts here
                </p>
              </div>
            </ScrollAnimatedSection>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <ScrollAnimatedSection animation="slideInLeft" delay={300}>
                <FloatingElement speed={0.005}>
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                      <span className="text-white font-cream-bold text-2xl group-hover:scale-110 transition-transform duration-300">1</span>
                    </div>
                    <h3 className="text-xl font-cream-bold text-black dark:text-white mb-4 group-hover:text-orange-600 transition-colors duration-300">Browse & Search</h3>
                    <p className="font-cream text-gray-600 dark:text-gray-300">
                      Explore our curated collection of exceptional restaurants and dining experiences worldwide
                    </p>
                  </div>
                </FloatingElement>
              </ScrollAnimatedSection>

              {/* Step 2 */}
              <ScrollAnimatedSection animation="slideUp" delay={400}>
                <FloatingElement speed={0.008}>
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                      <span className="text-white font-cream-bold text-2xl group-hover:scale-110 transition-transform duration-300">2</span>
                    </div>
                    <h3 className="text-xl font-cream-bold text-black dark:text-white mb-4 group-hover:text-orange-600 transition-colors duration-300">Book & Connect</h3>
                    <p className="font-cream text-gray-600 dark:text-gray-300">
                      Reserve your table and connect with other food enthusiasts for shared dining experiences
                    </p>
                  </div>
                </FloatingElement>
              </ScrollAnimatedSection>

              {/* Step 3 */}
              <ScrollAnimatedSection animation="slideInRight" delay={500}>
                <FloatingElement speed={0.006}>
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                      <span className="text-white font-cream-bold text-2xl group-hover:scale-110 transition-transform duration-300">3</span>
                    </div>
                    <h3 className="text-xl font-cream-bold text-black dark:text-white mb-4 group-hover:text-orange-600 transition-colors duration-300">Enjoy & Share</h3>
                    <p className="font-cream text-gray-600 dark:text-gray-300">
                      Savor extraordinary moments and share your experiences with our vibrant community
                    </p>
                  </div>
                </FloatingElement>
              </ScrollAnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section with Parallax */}
        <ParallaxSection 
          pixabayQuery="luxury restaurant dining table candles"
          speed={0.4}
          overlay="dark"
          className="py-20"
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <ScrollAnimatedSection animation="zoomIn" delay={200}>
              <h2 className="text-3xl md:text-5xl font-cream-bold text-white mb-6">
                Ready to Discover Your Next <span className="text-orange-400">Culinary Adventure?</span>
              </h2>
            </ScrollAnimatedSection>
            
            <ScrollAnimatedSection animation="slideUp" delay={400}>
              <p className="text-lg font-cream text-gray-200 mb-8 max-w-2xl mx-auto">
                Join thousands of food lovers who are already experiencing the extraordinary
              </p>
            </ScrollAnimatedSection>
            
            <ScrollAnimatedSection animation="slideUp" delay={600}>
              <FloatingElement speed={0.01}>
                <Link 
                  href="/create-experience"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-cream-bold px-8 py-4 rounded-full text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-lg group relative overflow-hidden"
                >
                  <span className="relative z-10 group-hover:tracking-widest transition-all duration-300">
                    Get Started Today
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Link>
              </FloatingElement>
            </ScrollAnimatedSection>
          </div>
        </ParallaxSection>
      </main>
    </div>
  );
}