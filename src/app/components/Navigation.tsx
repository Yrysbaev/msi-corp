'use client'

import Link from 'next/link'
import Logo from './Logo'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top shadow py-2">
      <div className="container-fluid align-items-center">
        <Link href="/" legacyBehavior>
          <a className="navbar-brand d-flex align-items-center p-0 m-0">
            <Logo size="large" />
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-md-0 align-items-center">
            {navigation.map((item) => (
              <li className="nav-item" key={item.name}>
                <a className="nav-link fw-bold text-uppercase px-3 py-0" href={item.href}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
} 