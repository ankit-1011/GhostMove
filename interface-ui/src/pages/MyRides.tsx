import { useAleo } from '../contexts/AleoContext'
import OrderManagement from '../components/RideManagement'

const MyOrdersPage = () => {
  const { isConnected } = useAleo()

  return (
    <section className="py-20 px-6 min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">
            My Orders
          </h1>
          <p className="text-gray-400 text-lg">
            View and manage your active pizza orders. Temporary identities auto-expire after delivery completion.
          </p>
        </div>

        {!isConnected ? (
          <div className="glass-card p-12 text-center">
            <i className="fas fa-wallet text-5xl text-gray-600 mb-4"></i>
            <h2 className="text-2xl font-bold mb-4 text-white">Wallet Not Connected</h2>
            <p className="text-gray-400 mb-6">
              Please connect your wallet from the home page to view your orders.
            </p>
            <a
              href="#"
              className="inline-block px-6 py-3 bg-gradient-to-r from-violet-500 to-orange-500 text-white font-semibold rounded-lg hover:from-violet-400 hover:to-orange-400 transition-all"
            >
              Go to Home
            </a>
          </div>
        ) : (
          <OrderManagement />
        )}
      </div>
    </section>
  )
}

export default MyOrdersPage
