import { useAleo } from '../contexts/AleoContext'

const WalletConnection = () => {
  const { wallet, isConnected, connectWallet, disconnectWallet } = useAleo()

  const handleConnect = async () => {
    try {
      await connectWallet()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      alert('Failed to connect wallet. Please ensure Leo Wallet is installed.')
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
  }

  if (isConnected && wallet) {
    return (
      <div className="flex items-center gap-4">
        <div className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 rounded-lg">
          <p className="text-sm text-cyan-400 font-semibold">
            <i className="fas fa-wallet mr-2"></i>
            {wallet.substring(0, 8)}...{wallet.substring(wallet.length - 6)}
          </p>
        </div>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 text-sm font-semibold"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleConnect}
      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold rounded-lg hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 shadow-lg shadow-cyan-500/50"
    >
      <i className="fas fa-wallet mr-2"></i>
      Connect Wallet
    </button>
  )
}

export default WalletConnection
