'use client'

import { motion } from 'framer-motion'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Store', href: '#' },
  { name: 'About Us', href: '#' },
  { name: 'Contact', href: '#' },
]

const socialLinks = [
  { name: 'Instagram', href: '#', icon: '📸' },
  { name: 'WhatsApp', href: '#', icon: '💬' },
  { name: 'Email', href: 'mailto:contact@msicorp.com', icon: '✉️' },
]

export default function Footer() {
  return (
    <footer className="bg-deep-navy py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <h3 className="text-2xl font-bold text-white mb-4">MSI Corporation</h3>
            <p className="text-light-blue mb-4">
              Creating visionary works that connect, express, and inspire.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-light-blue hover:text-white transition-colors duration-300"
                >
                  <span className="text-xl">{link.icon}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-light-blue hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@msicorp.com"
                  className="text-light-blue hover:text-white transition-colors duration-300"
                >
                  contact@msicorp.com
                </a>
              </li>
              <li className="text-light-blue">
                Available for projects worldwide
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-strong-blue mt-12 pt-8 text-center"
        >
          <p className="text-light-blue">
            © {new Date().getFullYear()} MSI Corporation. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
} 