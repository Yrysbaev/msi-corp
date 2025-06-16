'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section className="py-20 bg-rich-navy">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Get in Touch
            </h2>
            <p className="text-light-blue text-lg">
              Ready to start your next project? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-light-blue mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg bg-deep-navy border border-strong-blue text-white focus:outline-none focus:border-light-blue"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-light-blue mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg bg-deep-navy border border-strong-blue text-white focus:outline-none focus:border-light-blue"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-light-blue mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-deep-navy border border-strong-blue text-white focus:outline-none focus:border-light-blue"
                  placeholder="Tell us about your project"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-strong-blue hover:bg-deep-blue text-white font-bold py-3 px-8 rounded-full 
                         transition-colors duration-300 text-lg"
              >
                Send Message
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
                  <div className="space-y-4">
                    <a
                      href="#"
                      className="flex items-center text-light-blue hover:text-white transition-colors duration-300"
                    >
                      <span className="mr-2">📸</span>
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="flex items-center text-light-blue hover:text-white transition-colors duration-300"
                    >
                      <span className="mr-2">💬</span>
                      WhatsApp
                    </a>
                    <a
                      href="mailto:contact@msicorp.com"
                      className="flex items-center text-light-blue hover:text-white transition-colors duration-300"
                    >
                      <span className="mr-2">✉️</span>
                      contact@msicorp.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 