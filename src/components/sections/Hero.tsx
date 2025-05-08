import React from 'react';

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Bring Your Vision to Life with MSI Corporation
            </h1>
            <p className="text-xl mb-8">
              Custom Products, Photography & Videography, and Live Cooking Services – all in one place.
            </p>
            <button className="btn btn-primary">Get a Quote</button>
          </div>
          <div className="relative h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-r from-royal-blue/50 to-royal-blue rounded-lg">
              {/* Placeholder for hero image */}
              <div className="w-full h-full flex items-center justify-center text-white/50">
                Image Placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}