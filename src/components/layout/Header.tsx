'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo or Title */}
        <Link href="/">
          <span className="text-xl font-bold text-blue-600">MSI Corp</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-gray-700">
          <Link href="#services">Services</Link>
          <Link href="#solutions">Solutions</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4 text-gray-700">
          <Link href="#services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="#solutions" onClick={() => setMenuOpen(false)}>Solutions</Link>
          <Link href="#about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}
