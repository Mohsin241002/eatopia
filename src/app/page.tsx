import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import UnsplashBackground from '@/components/UnsplashBackground';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <main className="relative min-h-screen">
        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-normal text-gray-900 leading-tight tracking-tight">
              Find amazing restaurants
              <br />
              to dine
            </h1>
            <p className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto font-normal">
              Your insider guide to discovering the finest dining experiences.
            </p>
          </div>
          
          {/* Search Form */}
          <div className="mt-20">
            <SearchForm />
          </div>
        </div>

        {/* Background Restaurant */}
        <div className="absolute bottom-0 left-0 right-0 h-80 overflow-hidden">
          <UnsplashBackground
            query="restaurant interior elegant dining"
            className="w-full h-full"
            fallbackSrc="/restaurant-background.svg"
          />
        </div>
      </main>
    </div>
  );
}
