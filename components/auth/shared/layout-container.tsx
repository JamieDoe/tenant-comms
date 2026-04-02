'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    src: '/assets/tenant-comms-auth-layout-image.jpg',
    heading: 'Streamline Tenant Communications',
    description:
      'Unify all tenant interactions in one place — fast, organised, reliable.',
  },
  {
    src: '/assets/tenant-comms-auth-layout-image-2.webp',
    heading: 'Stay On Top of Maintenance',
    description:
      'Track repairs from report to resolution with full visibility for everyone.',
  },
  {
    src: '/assets/tenant-comms-auth-layout-image-3.jpg',
    heading: 'Compliance Without the Headache',
    description:
      'Never miss a certificate expiry or regulatory deadline again.',
  },
];

export function AuthLayoutImageContainer() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative hidden overflow-hidden lg:block lg:w-1/2">
      {/* Images */}
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.heading}
          fill
          className={`z-0 object-cover transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          priority={index === 0}
        />
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/40 via-50% to-transparent backdrop-blur-lg"
        style={{
          maskImage: 'linear-gradient(to top, black 0%, transparent 50%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 50%)',
        }}
      />

      {/* Blur layer that fades in from bottom */}
      <div
        className="absolute inset-0 z-10 backdrop-blur-md"
        style={{
          maskImage: 'linear-gradient(to top, black 0%, transparent 35%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 35%)',
        }}
      />

      {/* Text content */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-10">
        <h2
          key={`heading-${currentIndex}`}
          className="animate-fade-in text-2xl font-bold tracking-tight text-white xl:text-3xl"
        >
          {slides[currentIndex].heading}
        </h2>
        <p
          key={`desc-${currentIndex}`}
          className="animate-fade-in mt-2 max-w-md text-sm text-white/80 xl:text-base"
        >
          {slides[currentIndex].description}
        </p>

        {/* Carousel indicators */}
        <div className="mt-6 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-3 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
