"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <Link href="/" className="logo" onClick={closeMenu}>
        DANNYMOORE <span>AUTOS</span>
      </Link>

      <nav className={open ? "navLinks open" : "navLinks"}>
        <Link href="/#home" onClick={closeMenu}>
          Home
        </Link>

        <Link href="/#inventory" onClick={closeMenu}>
          Inventory
        </Link>

        <Link href="/#financing" onClick={closeMenu}>
          Financing
        </Link>

        <Link href="/#about" onClick={closeMenu}>
          About
        </Link>

        <Link href="/#contact" onClick={closeMenu}>
          Contact
        </Link>
      </nav>

      <div className="navbarRight">
        <a
          className="whatsappButton"
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>

        <button
          className="mobileMenuButton"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
    </header>
  );
}