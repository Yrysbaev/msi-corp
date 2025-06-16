'use client'

import { motion } from 'framer-motion'

const services = [
  {
    title: 'Custom Products',
    description: 'T-shirts, mugs, gifts with unique branding',
    icon: '🧢',
  },
  {
    title: 'Photography & Video',
    description: 'For events, content, and brand storytelling',
    icon: '📷',
  },
  {
    title: 'Live Cooking',
    description: 'On-site chef services for special events',
    icon: '🍳',
  },
]

export default function Services() {
  return (
    <section className="py-20 bg-rich-navy">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Our Services
          </h2>
          <p className="text-light-blue text-lg max-w-2xl mx-auto">
            Discover our range of creative services designed to bring your vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-deep-navy p-8 rounded-lg hover:bg-deep-blue transition-colors duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-light-blue">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 