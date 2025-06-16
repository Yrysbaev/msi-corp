'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="py-20 bg-deep-blue">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              About MSI Corporation
            </h2>
            <p className="text-light-blue mb-6 text-lg">
              We are a multi-service creative company dedicated to bringing your vision to life. 
              From custom merchandise to capturing unforgettable moments, we combine creativity 
              with professionalism to deliver exceptional results.
            </p>
            <div className="bg-strong-blue p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-white">Our Vision</h3>
              <p className="text-light-blue italic">
                "Visionary Works that Connect, Express, and Inspire."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Placeholder for team/founder photo */}
            <div className="aspect-square bg-rich-navy rounded-lg flex items-center justify-center">
              <p className="text-light-blue text-lg">Team Photo Placeholder</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 