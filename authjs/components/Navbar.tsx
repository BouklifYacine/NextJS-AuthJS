import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className='text-xl font-bold transition-colors hover:text-primary'
          >
            Salut
          </Link>

          {/* Navigation Links */}
          <div className='hidden md:flex items-center space-x-6'>
            <Link 
              href="/middleware" 
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              Middleware
            </Link>
            <Link 
              href="/server" 
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              Server
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className='flex items-center space-x-4'>
            <Link 
              href="/sign-in" 
              className='inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar