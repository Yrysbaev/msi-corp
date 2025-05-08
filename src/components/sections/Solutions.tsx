import React from 'react';

export default function Solutions() {
  return (
    <section className="py-20 bg-white/5">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8">How We Make Your Events & Projects Shine</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="text-crimson">✓</span>
                Customization that matches your vision
              </li>
              <li className="flex items-center gap-3">
                <span className="text-crimson">✓</span>
                Professional service from start to finish
              </li>
              <li className="flex items-center gap-3">
                <span className="text-crimson">✓</span>
                Quality guaranteed on every project
              </li>
            </ul>
          </div>
          <div className="relative h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-r from-royal-blue/50 to-royal-blue rounded-lg">
              {/* Placeholder for solutions image */}
              <div className="w-full h-full flex items-center justify-center text-white/50">
                Solutions Image
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}