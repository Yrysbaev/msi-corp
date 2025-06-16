'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
}

const sizes = {
  small: { width: 120, height: 36 },
  medium: { width: 160, height: 48 },
  large: { width: 200, height: 60 },
}

export default function Logo({ className = '', size = 'medium' }: LogoProps) {
  const dimensions = sizes[size]

  return (
    <Link href="/">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative ${className}`}
      >
        <Image
          src="/images/logos/msi-logo.png"
          alt="MSI Corporation Logo"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="object-contain"
        />
      </motion.div>
    </Link>
  )
} 