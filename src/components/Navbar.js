'use client';
import { useState } from 'react';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'My Words', href: '/my-words' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Help', href: '/help' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-orange-500/20 bg-black/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link href="/" prefetch={false} className="group flex items-center gap-2">
              <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                <span className="text-black font-black text-xl">L</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                LANG<span className="text-orange-500">STER</span>
              </span>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                prefetch={false}
                className="text-sm font-bold text-gray-400 hover:text-orange-500 transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* DESKTOP AUTH */}
          <div className="hidden md:flex items-center space-x-6">
            <SignedOut>
              <Link href="/sign-in" prefetch={false} className="text-sm font-bold text-gray-300 hover:text-white transition-all">
                Sign In
              </Link>
              <Link href="/sign-up" prefetch={false}>
                <button className="bg-orange-500 hover:bg-orange-600 text-black text-sm font-black py-3 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                  TRY FREE
                </button>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard" prefetch={false} className="text-sm font-bold text-gray-300 hover:text-orange-500 transition-all mr-2">
                Dashboard
              </Link>
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 border-2 border-orange-500"
                  }
                }}
              />
            </SignedIn>
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-orange-500/20 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-8 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                prefetch={false}
                onClick={() => setIsMenuOpen(false)}
                className="block text-xl font-bold text-gray-300 px-4 py-2 hover:text-orange-500"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-white/5 space-y-4 px-4">
              <SignedOut>
                <Link href="/sign-in" prefetch={false} onClick={() => setIsMenuOpen(false)} className="block text-gray-400 font-bold">
                  Sign In
                </Link>
                <Link href="/sign-up" prefetch={false} onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full bg-orange-500 text-black font-black py-4 rounded-xl mt-2">
                    TRY FREE
                  </button>
                </Link>
              </SignedOut>

              <SignedIn>
                <Link href="/dashboard" prefetch={false} onClick={() => setIsMenuOpen(false)} className="block text-gray-300 font-bold mb-4">
                  Dashboard
                </Link>
                <div className="flex items-center gap-3 py-2">
                   <UserButton afterSignOutUrl="/" />
                   <span className="text-gray-400 text-sm">Account Settings</span>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
