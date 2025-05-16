import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link href="/" className="navbar-brand">
          MSI Corporation
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/services" className="nav-link">Services</Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">About Us</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">Contact</Link>
            </li>
          </ul>
          
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary">Login</button>
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
}