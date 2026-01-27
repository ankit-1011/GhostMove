import { useState, useEffect } from 'react'
import { useAleo } from '../contexts/AleoContext'
import WalletConnection from './WalletConnection'

const Navigation = () => {
  const { isConnected } = useAleo()
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
    { id: 'request-ride', label: 'Request Ride', icon: 'fa-car', href: '#request-ride' },
    { id: 'driver-mode', label: 'Driver Mode', icon: 'fa-user-tie', href: '#driver-mode' },
    { id: 'my-rides', label: 'My Rides', icon: 'fa-list', href: '#my-rides' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="#" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              GhostMove
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
                        ? 'text-cyan-400 bg-cyan-400/10'
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
          <WalletConnection />
        </div>
      </div>
    </nav>
  )
}

export default Navigation
