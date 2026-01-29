import { useState } from 'react'
import { useAleo } from '../contexts/AleoContext'

const DeliveryDashboard = () => {
  const { isConnected, proveProximity, mintIdentity, wallet } = useAleo()
  const [orderId, setOrderId] = useState('')
  const [deliveryLat, setDeliveryLat] = useState('')
  const [deliveryLon, setDeliveryLon] = useState('')
  const [riderAddress, setRiderAddress] = useState('') // Rider address from order
  const [loading, setLoading] = useState(false)
  const [proximityProven, setProximityProven] = useState(false)
  const [identityMinted, setIdentityMinted] = useState(false)
  const [identityId, setIdentityId] = useState<string | null>(null)

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDeliveryLat(position.coords.latitude.toFixed(6))
          setDeliveryLon(position.coords.longitude.toFixed(6))
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
      const success = await proveProximity(orderId, {
        lat: parseFloat(deliveryLat),
        lon: parseFloat(deliveryLon),
      })

      if (success) {
        setProximityProven(true)
        alert('Proximity proof successful! You are within range.')
        
        // Automatically mint identity after successful proximity proof
        // Note: In production, riderAddress should be fetched from the order request
        if (riderAddress && wallet) {
          try {
            console.log('🔄 Automatically minting identity after proximity proof...')
            const mintedIdentityId = await mintIdentity(orderId, riderAddress, wallet)
            setIdentityMinted(true)
            setIdentityId(mintedIdentityId)
            console.log('✅ Identity automatically minted:', mintedIdentityId)
          } catch (identityError) {
            console.error('Failed to auto-mint identity:', identityError)
            // Don't block the flow if identity minting fails - user can retry manually
            alert('Proximity proven, but identity minting failed. You can mint manually below.')
          }
        } else {
          console.warn('⚠️ Cannot auto-mint identity: Missing rider address or wallet')
          // Show message that rider address is needed
        }
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
    if (!isConnected || !wallet) {
      alert('Please connect your wallet first')
      return
    }

    if (!riderAddress) {
      alert('Please enter the rider address from the order')
      return
    }

    setLoading(true)
    try {
      const mintedIdentityId = await mintIdentity(orderId, riderAddress, wallet)
      setIdentityMinted(true)
      setIdentityId(mintedIdentityId)
      alert(`Temporary identity minted! Identity ID: ${mintedIdentityId}`)
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
          Delivery Dashboard
        </h2>
        <p className="text-gray-400">
          Prove your proximity to delivery addresses without revealing your exact coordinates.
        </p>
      </div>

      {!proximityProven ? (
        <form onSubmit={handleProveProximity} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Order ID
            </label>
            <input
              type="text"
              placeholder="Enter order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Rider Address (from order)
            </label>
            <input
              type="text"
              placeholder="Enter rider's wallet address"
              value={riderAddress}
              onChange={(e) => setRiderAddress(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              This should be the address of the customer who placed the order
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Your Current Location
            </label>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <input
                  type="number"
                  step="any"
                  placeholder="Latitude"
                  value={deliveryLat}
                  onChange={(e) => setDeliveryLat(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  step="any"
                  placeholder="Longitude"
                  value={deliveryLon}
                  onChange={(e) => setDeliveryLon(e.target.value)}
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
            <div className="space-y-4">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-sm text-yellow-400 text-center">
                  <i className="fas fa-info-circle mr-2"></i>
                  {riderAddress 
                    ? 'Identity will be minted automatically after proximity proof.'
                    : 'Enter rider address above to enable automatic identity minting.'}
                </p>
              </div>
              <button
                onClick={handleMintIdentity}
                disabled={loading || !riderAddress}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold rounded-lg hover:from-orange-400 hover:to-amber-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-spinner fa-spin"></i>
                    Minting Identity...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-id-card"></i>
                    Mint Temporary Identity (Manual)
                  </span>
                )}
              </button>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-lg p-6 text-center">
              <i className="fas fa-id-card text-4xl text-orange-400 mb-3"></i>
              <h3 className="text-xl font-bold mb-2 text-white">Identity Minted!</h3>
              {identityId && (
                <p className="text-xs text-gray-400 font-mono mb-2">ID: {identityId}</p>
              )}
              <p className="text-gray-300 text-sm">
                Temporary identity created for this delivery. It will auto-expire after completion.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DeliveryDashboard
