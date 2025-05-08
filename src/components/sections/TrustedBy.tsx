import React from 'react';

export default function TrustedBy() {
  return (
    <section className="py-16 bg-white/5">
      <div className="container">
        <h2 className="text-2xl font-bold text-center mb-12">Trusted By Industry Leaders</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="w-32 h-12 bg-white/10 rounded flex items-center justify-center">
              Logo {index}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}