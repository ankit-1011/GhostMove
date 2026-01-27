import { useState } from 'react'
import { useAleo } from '../contexts/AleoContext'

const RideRequest = () => {
  const { isConnected, createRideRequest } = useAleo()
  const [pickupLat, setPickupLat] = useState('')
  const [pickupLon, setPickupLon] = useState('')
  const [maxDistance, setMaxDistance] = useState('2')
  const [loading, setLoading] = useState(false)
  const [rideId, setRideId] = useState<string | null>(null)

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPickupLat(position.coords.latitude.toFixed(6))
          setPickupLon(position.coords.longitude.toFixed(6))
        },
        (error) => {
          console.error('Error getting location:', error)
          alert('Failed to get location. Please enter manually.')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    setLoading(true)
    try {
      const id = await createRideRequest({
        pickupLat: parseFloat(pickupLat),
        pickupLon: parseFloat(pickupLon),
        maxDistanceKm: parseFloat(maxDistance),
      })
      setRideId(id)
      alert(`Ride request created! Ride ID: ${id}`)
      // Reset form
      setPickupLat('')
      setPickupLon('')
      setMaxDistance('2')
    } catch (error) {
      console.error('Failed to create ride request:', error)
      alert('Failed to create ride request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (rideId) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="mb-6">
          <i className="fas fa-check-circle text-5xl text-green-400 mb-4"></i>
          <h3 className="text-2xl font-bold mb-2 text-white">Ride Request Created!</h3>
          <p className="text-gray-300 mb-4">Your ride request has been submitted with encrypted location.</p>
          <div className="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-400 mb-1">Ride ID</p>
            <p className="text-lg font-mono text-cyan-400">{rideId}</p>
          </div>
          <p className="text-sm text-gray-400">
            Waiting for drivers to prove proximity... Your location remains encrypted.
          </p>
        </div>
        <button
          onClick={() => setRideId(null)}
          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold rounded-lg hover:from-cyan-400 hover:to-teal-400 transition-all"
        >
          Create Another Ride
        </button>
      </div>
    )
  }

  return (
    <div className="glass-card p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          Request a Ride
        </h2>
        <p className="text-gray-400">
          Create an encrypted ride request. Your location will remain private.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Pickup Location
          </label>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <input
                type="number"
                step="any"
                placeholder="Latitude"
                value={pickupLat}
                onChange={(e) => setPickupLat(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                required
              />
            </div>
            <div>
              <input
                type="number"
                step="any"
                placeholder="Longitude"
                value={pickupLon}
                onChange={(e) => setPickupLon(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                required
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
          >
            <i className="fas fa-map-marker-alt"></i>
            Use Current Location
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Maximum Distance (km)
          </label>
          <input
            type="number"
            step="0.1"
            min="0.5"
            max="10"
            value={maxDistance}
            onChange={(e) => setMaxDistance(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Drivers must be within this distance to accept your ride
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !isConnected}
          className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <i className="fas fa-spinner fa-spin"></i>
              Creating Ride Request...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <i className="fas fa-car"></i>
              Create Encrypted Ride Request
            </span>
          )}
        </button>

        {!isConnected && (
          <p className="text-sm text-yellow-400 text-center">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Please connect your wallet first
          </p>
        )}
      </form>
    </div>
  )
}

export default RideRequest
