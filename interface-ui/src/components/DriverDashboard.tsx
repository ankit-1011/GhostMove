import { useState } from 'react'
import { useAleo } from '../contexts/AleoContext'

const DriverDashboard = () => {
  const { isConnected, proveProximity, mintIdentity } = useAleo()
  const [rideId, setRideId] = useState('')
  const [driverLat, setDriverLat] = useState('')
  const [driverLon, setDriverLon] = useState('')
  const [loading, setLoading] = useState(false)
  const [proximityProven, setProximityProven] = useState(false)
  const [identityMinted, setIdentityMinted] = useState(false)

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDriverLat(position.coords.latitude.toFixed(6))
          setDriverLon(position.coords.longitude.toFixed(6))
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

  const handleProveProximity = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    setLoading(true)
    try {
      const success = await proveProximity(rideId, {
        lat: parseFloat(driverLat),
        lon: parseFloat(driverLon),
      })

      if (success) {
        setProximityProven(true)
        alert('Proximity proof successful! You are within range.')
      } else {
        alert('You are not within the required distance.')
      }
    } catch (error) {
      console.error('Failed to prove proximity:', error)
      alert('Failed to prove proximity. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleMintIdentity = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    setLoading(true)
    try {
      const identityId = await mintIdentity(rideId, 'driver_address')
      setIdentityMinted(true)
      alert(`Temporary identity minted! Identity ID: ${identityId}`)
    } catch (error) {
      console.error('Failed to mint identity:', error)
      alert('Failed to mint identity. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">
          Driver Dashboard
        </h2>
        <p className="text-gray-400">
          Prove your proximity to pickup locations without revealing your exact coordinates.
        </p>
      </div>

      {!proximityProven ? (
        <form onSubmit={handleProveProximity} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Ride ID
            </label>
            <input
              type="text"
              placeholder="Enter ride ID"
              value={rideId}
              onChange={(e) => setRideId(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Your Location
            </label>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <input
                  type="number"
                  step="any"
                  placeholder="Latitude"
                  value={driverLat}
                  onChange={(e) => setDriverLat(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  step="any"
                  placeholder="Longitude"
                  value={driverLon}
                  onChange={(e) => setDriverLon(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50"
                  required
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              className="text-sm text-teal-400 hover:text-teal-300 flex items-center gap-2"
            >
              <i className="fas fa-map-marker-alt"></i>
              Use Current Location
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !isConnected}
            className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-violet-500 text-white font-bold rounded-lg hover:from-teal-400 hover:to-violet-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fas fa-spinner fa-spin"></i>
                Generating ZK Proof...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <i className="fas fa-shield-alt"></i>
                Prove Proximity (Zero-Knowledge)
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
      ) : (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-lg p-6 text-center">
            <i className="fas fa-check-circle text-4xl text-green-400 mb-3"></i>
            <h3 className="text-xl font-bold mb-2 text-white">Proximity Proof Successful!</h3>
            <p className="text-gray-300 text-sm">
              You've proven you're within range without revealing your exact location.
            </p>
          </div>

          {!identityMinted ? (
            <button
              onClick={handleMintIdentity}
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-spinner fa-spin"></i>
                  Minting Identity...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-id-card"></i>
                  Mint Temporary Identity
                </span>
              )}
            </button>
          ) : (
            <div className="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 rounded-lg p-6 text-center">
              <i className="fas fa-id-card text-4xl text-cyan-400 mb-3"></i>
              <h3 className="text-xl font-bold mb-2 text-white">Identity Minted!</h3>
              <p className="text-gray-300 text-sm">
                Temporary identity created for this ride. It will auto-expire after completion.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DriverDashboard
