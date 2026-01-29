import { useState, useEffect } from 'react'
import logo from '../assets/Logo.png'

const Navigation = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#home')

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#home')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home', icon: 'fa-home', href: '#' },
    { id: 'request-ride', label: 'Order Pizza', icon: 'fa-pizza-slice', href: '#request-ride' },
    { id: 'driver-mode', label: 'Delivery Mode', icon: 'fa-motorcycle', href: '#driver-mode' },
    { id: 'my-rides', label: 'My Orders', icon: 'fa-list', href: '#my-rides' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-0 py-0">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-0 hover:opacity-80 transition-opacity group">
            <img 
              src={logo} 
              alt="GhostMove Logo" 
              className="h-20 w-20 sm:h-24 sm:w-24 object-contain transition-transform group-hover:scale-105 drop-shadow-lg" 
            />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl bg-gradient-to-r from-orange-400 via-amber-400 to-violet-400 bg-clip-text text-transparent" style={{ fontFamily: "'Bitcount Single', sans-serif", fontWeight: 322 }}>
              GhostMove
            </span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.href || (item.href === '#' && (currentPath === '#home' || currentPath === ''))
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    isActive
                      ? 'text-orange-400 bg-orange-400/10'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <i className={`fas ${item.icon} mr-2`}></i>
                  {item.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
