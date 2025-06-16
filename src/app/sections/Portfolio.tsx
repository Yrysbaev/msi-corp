'use client'

import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Branded Merchandise',
    category: 'Custom Products',
    image: '/placeholder-1.jpg',
  },
  {
    title: 'Event Photography',
    category: 'Photography',
    image: '/placeholder-2.jpg',
  },
  {
    title: 'Cooking Showcase',
    category: 'Live Events',
    image: '/placeholder-3.jpg',
  },
]

export default function Portfolio() {
  return (
    <section className="py-20 bg-deep-navy">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Our Work
          </h2>
          <p className="text-light-blue text-lg max-w-2xl mx-auto">
            Take a look at some of our recent projects and creative endeavors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg bg-rich-navy"
            >
              <div className="aspect-square bg-deep-blue flex items-center justify-center">
                <p className="text-light-blue text-lg">Project Image Placeholder</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-light-blue">{project.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-strong-blue hover:bg-deep-blue text-white font-bold py-3 px-8 rounded-full 
                           transition-colors duration-300 text-lg">
            View Full Gallery
          </button>
        </motion.div>
      </div>
    </section>
  )
} 