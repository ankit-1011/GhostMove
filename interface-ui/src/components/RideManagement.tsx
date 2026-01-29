import { useState } from 'react'
import { useAleo } from '../contexts/AleoContext'

interface ActiveOrder {
  id: string
  status: 'pending' | 'matched' | 'in-progress' | 'completed'
  createdAt: string
  deliveryAddress: string
  deliveryPersonAddress?: string
  identityId?: string
  identityVerified?: boolean
}

const OrderManagement = () => {
  const { isConnected, completeRide, verifyIdentity } = useAleo()
  const [activeOrders] = useState<ActiveOrder[]>([
    // Mock data - in production, fetch from Aleo
    {
      id: 'order_1234567890',
      status: 'in-progress',
      createdAt: new Date().toISOString(),
      deliveryAddress: '37.7749, -122.4194',
      deliveryPersonAddress: 'aleo1...delivery',
      identityId: 'identity_order_1234567890',
      identityVerified: false,
    },
  ])
  const [loading, setLoading] = useState<string | null>(null)
  const [verifying, setVerifying] = useState<string | null>(null)

  const handleVerifyIdentity = async (orderId: string) => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    setVerifying(orderId)
    try {
      const isValid = await verifyIdentity(orderId)
      if (isValid) {
        // Update order to show identity is verified
        const order = activeOrders.find(o => o.id === orderId)
        if (order) {
          order.identityVerified = true
        }
        alert('✅ Identity verified! You can now complete the delivery.')
      } else {
        alert('❌ Identity verification failed. The identity may be expired or invalid.')
      }
    } catch (error) {
      console.error('Failed to verify identity:', error)
      alert('Failed to verify identity. Please try again.')
    } finally {
      setVerifying(null)
    }
  }

  const handleCompleteOrder = async (orderId: string) => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    // First verify identity before completing
    setVerifying(orderId)
    try {
      const isValid = await verifyIdentity(orderId)
      if (!isValid) {
        alert('❌ Cannot complete delivery: Identity verification failed. The identity may be expired or invalid.')
        setVerifying(null)
        return
      }
    } catch (error) {
      console.error('Failed to verify identity:', error)
      alert('Failed to verify identity. Cannot complete delivery.')
      setVerifying(null)
      return
    }

    // If identity is valid, proceed with completion
    setVerifying(null)
    setLoading(orderId)
    try {
      const success = await completeRide(orderId)
      if (success) {
        alert('✅ Delivery completed! Temporary identity has been burned.')
        // In production, update state to remove completed order
      }
    } catch (error) {
      console.error('Failed to complete delivery:', error)
      alert('Failed to complete delivery. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30'
      case 'matched':
        return 'text-orange-400 bg-orange-400/20 border-orange-400/30'
      case 'in-progress':
        return 'text-orange-400 bg-orange-400/20 border-orange-400/30'
      case 'completed':
        return 'text-green-400 bg-green-400/20 border-green-400/30'
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30'
    }
  }

  return (
    <div className="glass-card p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">
          My Orders
        </h2>
        <p className="text-gray-400">
          Manage your pizza orders and view temporary identities.
        </p>
      </div>

      {activeOrders.length === 0 ? (
        <div className="text-center py-12">
          <i className="fas fa-pizza-slice text-5xl text-gray-600 mb-4"></i>
          <p className="text-gray-400">No active orders</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-orange-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">Order {order.id.substring(6)}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Created: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
                  <p className="text-sm text-gray-300 font-mono">{order.deliveryAddress}</p>
                </div>
                {order.deliveryPersonAddress && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Delivery Person</p>
                    <p className="text-sm text-orange-400 font-mono">
                      {order.deliveryPersonAddress.substring(0, 12)}...
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-id-card text-orange-400"></i>
                    <p className="text-sm font-semibold text-gray-300">Temporary Identity</p>
                  </div>
                  {order.identityVerified ? (
                    <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400">
                      <i className="fas fa-check-circle mr-1"></i>Verified
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs text-yellow-400">
                      <i className="fas fa-exclamation-circle mr-1"></i>Not Verified
                    </span>
                  )}
                </div>
                {order.identityId && (
                  <p className="text-xs text-gray-400 font-mono mb-2">ID: {order.identityId}</p>
                )}
                <p className="text-xs text-gray-400 mb-2">
                  This identity will automatically burn after delivery completion. No permanent record
                  will remain.
                </p>
                {!order.identityVerified && order.status === 'in-progress' && (
                  <button
                    onClick={() => handleVerifyIdentity(order.id)}
                    disabled={verifying === order.id || !isConnected}
                    className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-lg hover:from-blue-400 hover:to-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {verifying === order.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <i className="fas fa-spinner fa-spin"></i>
                        Verifying Identity...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <i className="fas fa-shield-alt"></i>
                        Verify Identity
                      </span>
                    )}
                  </button>
                )}
              </div>

              {order.status === 'in-progress' && (
                <button
                  onClick={() => handleCompleteOrder(order.id)}
                  disabled={loading === order.id || verifying === order.id || !isConnected}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-lg hover:from-green-400 hover:to-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading === order.id || verifying === order.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-spinner fa-spin"></i>
                      {verifying === order.id ? 'Verifying Identity...' : 'Completing Delivery...'}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-check-circle"></i>
                      Complete Delivery & Burn Identity
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

export default OrderManagement
