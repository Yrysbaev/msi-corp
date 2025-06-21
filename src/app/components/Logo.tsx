'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
  withText?: boolean // Optional: include text like "MSI Corporation"
}

const sizes = {
  small: { width: 32, height: 32 },
  medium: { width: 40, height: 40 },
  large: { width: 56, height: 56 },
}

export default function Logo({ className = '', size = 'medium', withText = false }: LogoProps) {
  const dimensions = sizes[size]

  return (
    <Link href="/" aria-label="Go to homepage">
      
        <Image
          src="/images/logos/msi-logo.png"
          alt="MSI Corporation Logo"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="object-contain"
        />
    
    </Link>
  )
}
