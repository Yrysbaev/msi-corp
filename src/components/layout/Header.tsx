'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top shadow-sm px-4">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand fw-bold text-primary">
          MSI Corp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="#services" className="nav-link">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#solutions" className="nav-link">
                Solutions
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
