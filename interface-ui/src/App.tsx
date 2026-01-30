import { useState, useEffect } from 'react'
import { AleoProvider } from './contexts/AleoContext'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import TrustSignals from './components/TrustSignals'
import HowItWorks from './components/HowItWorks'
import CoreFeatures from './components/CoreFeatures'
// import Architecture from './components/Architecture'
import OrderPizzaPage from './pages/RequestRide'
import DeliveryModePage from './pages/DriverMode'
import MyOrdersPage from './pages/MyRides'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import './App.css'

// Aleo Wallet Adapter
import { WalletProvider } from '@demox-labs/aleo-wallet-adapter-react'
import { WalletModalProvider } from '@demox-labs/aleo-wallet-adapter-reactui'
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo'
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base'
import '@demox-labs/aleo-wallet-adapter-reactui/styles.css'

const wallets = [
  new LeoWalletAdapter({
    appName: 'GhostMove',
  }),
]

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
        return <OrderPizzaPage />
      case 'driver-mode':
        return <DeliveryModePage />
      case 'my-rides':
        return <MyOrdersPage />
      case 'home':
      default:
        return (
          <>
            <Hero />
            <TrustSignals />
            <HowItWorks />
            <CoreFeatures />
            {/* <Architecture /> */}
            <FAQ />
          </>
        )
    }
  }

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.TestnetBeta}
      autoConnect
    >
      <WalletModalProvider>
        <AleoProvider>
          <div className="bg-black text-white">
            <Navigation />
            {renderPage()}
            <Footer />
          </div>
        </AleoProvider>
      </WalletModalProvider>
    </WalletProvider>
  )
}

export default App
