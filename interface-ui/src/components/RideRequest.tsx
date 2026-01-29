import { useState } from 'react'
import { useAleo } from '../contexts/AleoContext'
import PizzaCart from './PizzaCart'

interface CartItem {
  pizza: {
    id: string
    name: string
    description: string
    price: number
  }
  quantity: number
}

const OrderRequest = () => {
  const { isConnected, createRideRequest } = useAleo()
  const [deliveryLat, setDeliveryLat] = useState('')
  const [deliveryLon, setDeliveryLon] = useState('')
  const [maxDistance, setMaxDistance] = useState('5')
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartTotal, setCartTotal] = useState(0)

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

  const handleCartUpdate = (items: CartItem[], total: number) => {
    setCartItems(items)
    setCartTotal(total)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    if (cartItems.length === 0) {
      alert('Please add at least one pizza to your cart')
      return
    }

    setLoading(true)
    try {
      const id = await createRideRequest({
        pickupLat: parseFloat(deliveryLat),
        pickupLon: parseFloat(deliveryLon),
        maxDistanceKm: parseFloat(maxDistance),
      })
      setOrderId(id)
      alert(`Pizza order created! Order ID: ${id}`)
      // Reset form
      setDeliveryLat('')
      setDeliveryLon('')
      setMaxDistance('5')
      setCartItems([])
      setCartTotal(0)
    } catch (error) {
      console.error('Failed to create ride request:', error)
      alert('Failed to create order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (orderId) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="mb-6">
          <i className="fas fa-pizza-slice text-5xl text-green-400 mb-4"></i>
          <h3 className="text-2xl font-bold mb-2 text-white">Order Placed!</h3>
          <p className="text-gray-300 mb-4">Your pizza order has been submitted with encrypted delivery address.</p>
          <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-400 mb-1">Order ID</p>
            <p className="text-lg font-mono text-orange-400">{orderId}</p>
          </div>
          {cartItems.length > 0 && (
            <div className="bg-white/5 rounded-lg p-4 mb-4 text-left">
              <p className="text-sm font-semibold text-gray-300 mb-2">Order Summary</p>
              {cartItems.map((item) => (
                <div key={item.pizza.id} className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{item.pizza.name} x{item.quantity}</span>
                  <span className="text-orange-400">{item.pizza.price * item.quantity} Leo</span>
                </div>
              ))}
              <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t border-white/10">
                <span className="text-white">Total</span>
                <span className="text-orange-400">{cartTotal} Leo</span>
              </div>
            </div>
          )}
          <p className="text-sm text-gray-400">
            Waiting for delivery person to prove proximity... Your address remains encrypted.
          </p>
        </div>
        <button
          onClick={() => {
            setOrderId(null)
            setCartItems([])
            setCartTotal(0)
          }}
          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold rounded-lg hover:from-orange-400 hover:to-amber-400 transition-all"
        >
          Place Another Order
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Pizza Cart Section */}
      <div className="glass-card p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-violet-400 bg-clip-text text-transparent">
            Select Your Pizzas
          </h2>
          <p className="text-gray-400">
            Choose your favorite pizzas and add them to your cart.
          </p>
        </div>
        <PizzaCart onCartUpdate={handleCartUpdate} />
      </div>

      {/* Delivery Information */}
      <div className="glass-card p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-violet-400 bg-clip-text text-transparent">
            Delivery Information
          </h2>
          <p className="text-gray-400">
            Enter your delivery address. Your location will remain encrypted and private.
          </p>
        </div>

        {cartItems.length > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Items in Cart</p>
              <p className="text-lg font-bold text-orange-400">{cartItems.length} item(s)</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Total Amount</p>
              <p className="text-xl font-bold text-white">{cartTotal} Leo</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Delivery Address
          </label>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <input
                type="number"
                step="any"
                placeholder="Latitude"
                value={deliveryLat}
                onChange={(e) => setDeliveryLat(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                required
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-2"
          >
            <i className="fas fa-map-marker-alt"></i>
            Use Current Location
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Maximum Delivery Distance (km)
          </label>
          <input
            type="number"
            step="0.1"
            min="1"
            max="20"
            value={maxDistance}
            onChange={(e) => setMaxDistance(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Delivery person must be within this distance to accept your order
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !isConnected || cartItems.length === 0}
          className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold rounded-lg hover:from-orange-400 hover:to-amber-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <i className="fas fa-spinner fa-spin"></i>
              Placing Order...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <i className="fas fa-pizza-slice"></i>
              Place Encrypted Order ({cartTotal} Leo)
            </span>
          )}
        </button>

        {!isConnected && (
          <p className="text-sm text-yellow-400 text-center">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Please connect your wallet first
          </p>
        )}
        {cartItems.length === 0 && (
          <p className="text-sm text-yellow-400 text-center">
            <i className="fas fa-shopping-cart mr-2"></i>
            Please add pizzas to your cart first
          </p>
        )}
      </form>
      </div>
    </div>
  )
}

export default OrderRequest
