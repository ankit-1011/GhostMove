import { useState, useEffect } from 'react'
import { AleoProvider } from './contexts/AleoContext'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import TrustSignals from './components/TrustSignals'
import HowItWorks from './components/HowItWorks'
import CoreFeatures from './components/CoreFeatures'
import Architecture from './components/Architecture'
import RequestRidePage from './pages/RequestRide'
import DriverModePage from './pages/DriverMode'
import MyRidesPage from './pages/MyRides'
import Footer from './components/Footer'
import './App.css'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home'
      setCurrentPage(hash.substring(1) || 'home')
    }

    // Set initial page
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'request-ride':
        return <RequestRidePage />
      case 'driver-mode':
        return <DriverModePage />
      case 'my-rides':
        return <MyRidesPage />
      case 'home':
      default:
        return (
          <>
            <Hero />
            <TrustSignals />
            <HowItWorks />
            <CoreFeatures />
            <Architecture />
          </>
        )
    }
  }

  return (
    <AleoProvider>
      <div className="bg-black text-white">
        <Navigation />
        {renderPage()}
        <Footer />
      </div>
    </AleoProvider>
  )
}

export default App
