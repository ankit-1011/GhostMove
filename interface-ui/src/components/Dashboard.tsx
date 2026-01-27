import { useState } from 'react'
import WalletConnection from './WalletConnection'
import RideRequest from './RideRequest'
import DriverDashboard from './DriverDashboard'
import RideManagement from './RideManagement'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'rider' | 'driver' | 'rides'>('rider')

  return (
    <section className="py-20 px-6 min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              GhostMove Dashboard
            </h1>
            <p className="text-gray-400">Privacy-first ride sharing on Aleo</p>
          </div>
          <WalletConnection />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('rider')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'rider'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <i className="fas fa-car mr-2"></i>
            Request Ride
          </button>
          <button
            onClick={() => setActiveTab('driver')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'driver'
                ? 'text-teal-400 border-b-2 border-teal-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <i className="fas fa-user-tie mr-2"></i>
            Driver Mode
          </button>
          <button
            onClick={() => setActiveTab('rides')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'rides'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <i className="fas fa-list mr-2"></i>
            My Rides
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'rider' && <RideRequest />}
          {activeTab === 'driver' && <DriverDashboard />}
          {activeTab === 'rides' && <RideManagement />}
        </div>
      </div>
    </section>
  )
}

export default Dashboard
