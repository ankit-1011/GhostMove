import Hero from './components/Hero'
import TrustSignals from './components/TrustSignals'
import HowItWorks from './components/HowItWorks'
import CoreFeatures from './components/CoreFeatures'
import Architecture from './components/Architecture'
import Footer from './components/Footer'
import './App.css'

const App = () => {
  return (
    <div className=" bg-black text-white">
      <Hero />
      <TrustSignals />
      <HowItWorks />
      <CoreFeatures />
      <Architecture />
      <Footer />
    </div>
  )
}

export default App
