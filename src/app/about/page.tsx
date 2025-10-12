'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Header from '@/components/layout/Navbar';
import BackButton from '@/components/layout/BackButton';

export default function About() {
  const teamMembers = [
    {
      name: 'Joel Thannikal',
      role: 'Full Stack Developer',
      image: '/team/joel.jpg',
      linkedin: 'https://www.linkedin.com/in/joelthnkl/',
      github: 'https://www.linkedin.com/in/joelthnkl/',
      description: 'Passionate about creating seamless user experiences and innovative solutions.'
    },
    {
      name: 'Amandeep Singh',
      role: 'Backend Developer',
      image: '/team/aman.jpg',
      linkedin: 'https://www.linkedin.com/in/amandeep-singh-171560260/',
      github: 'https://github.com/aman5911-deep',
      description: 'Specialized in building robust and scalable backend architectures.'
    },
    {
      name: 'Abdul Ahad Arif',
      role: 'Frontend Developer',
      image: '/team/ahad.jpg',
      linkedin: 'https://www.linkedin.com/in/ahad-arif-b1b832262/',
      github: 'https://github.com/AhadArif',
      description: 'Focused on creating beautiful and responsive user interfaces.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <BackButton />
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 relative pt-16">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-roboto mb-4 text-gray-900 dark:text-white relative z-10">
            About EATOPIA
          </h1>
          <p className="text-lg md:text-xl font-roboto text-gray-700 dark:text-gray-200 max-w-3xl mx-auto relative z-10">
            Revolutionizing the way people discover and experience dining
          </p>
        </section>

        {/* Project Story */}
        <section className="mb-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-3xl md:text-5xl font-roboto mb-6 text-gray-900 dark:text-white">Our Story</h2>
            <p className="text-lg font-roboto text-gray-700 dark:text-gray-200">
              EATOPIA was born from a shared vision of transforming the restaurant discovery experience. 
              In today's fast-paced world, we recognized that dining isn't just about food—it's about 
              finding the perfect atmosphere that matches your mood and occasion. Our team came together 
              during our academic journey, combining our diverse skills and passion for technology to 
              create a platform that makes finding your ideal dining spot both intuitive and enjoyable.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-5xl font-roboto mb-8 text-center text-gray-900 dark:text-white">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {teamMembers.map((member) => (
              <div 
                key={member.name}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300"
              >
                <div className="h-80 relative bg-gradient-to-br from-orange-400 to-orange-600 overflow-hidden">
                  {/* Fallback gradient background with initials */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-6xl font-roboto">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  {/* Actual image (if available) */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover object-center relative z-10"
                    onError={(e) => {
                      // Hide image on error, showing the gradient background
                      const target = e.target as HTMLImageElement;
                      target.style.opacity = '0';
                    }}
                    onLoad={(e) => {
                      // Show image when successfully loaded
                      const target = e.target as HTMLImageElement;
                      target.style.opacity = '1';
                    }}
                    style={{ transition: 'opacity 0.3s ease' }}
                  />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-roboto mb-3 text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-orange-500 dark:text-orange-400 mb-6 font-roboto text-lg">{member.role}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-8 font-roboto text-base leading-relaxed">
                    {member.description}
                  </p>
                  <div className="flex justify-center space-x-6">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    >
                      <FaLinkedin size={28} />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      <FaGithub size={28} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center p-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl">
          <h2 className="text-3xl md:text-5xl font-roboto mb-4 text-white">
            Ready to Start Your Food Journey?
          </h2>
          <p className="text-white/90 mb-8 text-lg font-roboto">
            Join EATOPIA today and discover your perfect dining experience.
          </p>
          <Link 
            href="/login"
            className="inline-block bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 rounded-full font-roboto transition-colors shadow-md hover:shadow-lg"
          >
            Get Started
          </Link>
        </section>
      </div>
    </div>
  );
}
