import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="fixed w-full top-0 z-50 bg-royal-blue/95 backdrop-blur-sm">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            MSI Corporation
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="text-white hover:text-crimson transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-crimson transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-crimson transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-crimson transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="btn btn-outline hidden sm:inline-block">
              Login
            </button>
            <button className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}