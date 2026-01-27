import { useState } from 'react'
import { useAleo } from '../contexts/AleoContext'

interface ActiveRide {
  id: string
  status: 'pending' | 'matched' | 'in-progress' | 'completed'
  createdAt: string
  pickupLocation: string
  driverAddress?: string
}

const RideManagement = () => {
  const { isConnected, completeRide } = useAleo()
  const [activeRides] = useState<ActiveRide[]>([
    // Mock data - in production, fetch from Aleo
    {
      id: 'ride_1234567890',
      status: 'in-progress',
      createdAt: new Date().toISOString(),
      pickupLocation: '37.7749, -122.4194',
      driverAddress: 'aleo1...driver',
    },
  ])
  const [loading, setLoading] = useState<string | null>(null)

  const handleCompleteRide = async (rideId: string) => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    setLoading(rideId)
    try {
      const success = await completeRide(rideId)
      if (success) {
        alert('Ride completed! Temporary identity has been burned.')
        // In production, update state to remove completed ride
      }
    } catch (error) {
      console.error('Failed to complete ride:', error)
      alert('Failed to complete ride. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30'
      case 'matched':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/30'
      case 'in-progress':
        return 'text-cyan-400 bg-cyan-400/20 border-cyan-400/30'
      case 'completed':
        return 'text-green-400 bg-green-400/20 border-green-400/30'
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30'
    }
  }

  return (
    <div className="glass-card p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Active Rides
        </h2>
        <p className="text-gray-400">
          Manage your rides and view temporary identities.
        </p>
      </div>

      {activeRides.length === 0 ? (
        <div className="text-center py-12">
          <i className="fas fa-car text-5xl text-gray-600 mb-4"></i>
          <p className="text-gray-400">No active rides</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeRides.map((ride) => (
            <div
              key={ride.id}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">Ride {ride.id.substring(5)}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        ride.status
                      )}`}
                    >
                      {ride.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Created: {new Date(ride.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Pickup Location</p>
                  <p className="text-sm text-gray-300 font-mono">{ride.pickupLocation}</p>
                </div>
                {ride.driverAddress && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Driver</p>
                    <p className="text-sm text-cyan-400 font-mono">
                      {ride.driverAddress.substring(0, 12)}...
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <i className="fas fa-id-card text-cyan-400"></i>
                  <p className="text-sm font-semibold text-gray-300">Temporary Identity</p>
                </div>
                <p className="text-xs text-gray-400">
                  This identity will automatically burn after ride completion. No permanent record
                  will remain.
                </p>
              </div>

              {ride.status === 'in-progress' && (
                <button
                  onClick={() => handleCompleteRide(ride.id)}
                  disabled={loading === ride.id || !isConnected}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-lg hover:from-green-400 hover:to-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading === ride.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-spinner fa-spin"></i>
                      Completing Ride...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-check-circle"></i>
                      Complete Ride & Burn Identity
                    </span>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RideManagement
