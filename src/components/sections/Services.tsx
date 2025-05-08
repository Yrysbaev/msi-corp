import React from 'react';

export default function Services() {
  const services = [
    {
      icon: '🛍',
      title: 'Custom Products',
      description: 'Unique merchandise tailored to your brand identity.'
    },
    {
      icon: '📸',
      title: 'Photography & Videography',
      description: 'Professional visual content creation services.'
    },
    {
      icon: '🍽',
      title: 'Live Cooking Service',
      description: 'Expert chefs for your special events.'
    }
  ];

  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white/5 p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="mb-6">{service.description}</p>
              <button className="btn btn-outline">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}