'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-deep-navy overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-navy via-rich-navy to-deep-blue opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block text-light-blue">We Create.</span>
            <span className="block text-white">We Capture.</span>
            <span className="block text-light-blue">We Customize.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-light-blue mb-8 max-w-2xl mx-auto">
            Transforming ideas into extraordinary experiences through custom products, 
            stunning visuals, and unforgettable moments.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-strong-blue hover:bg-deep-blue text-white font-bold py-3 px-8 rounded-full 
                     transition-colors duration-300 text-lg"
          >
            View Our Services
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 