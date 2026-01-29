import { useState, useEffect } from 'react'
import { useAleo } from '../contexts/AleoContext'
import { detectWallets } from '../utils/walletDetection'

const WalletConnection = () => {
  const { wallet, isConnected, connectWallet, disconnectWallet, checkWalletsInstalled } = useAleo()
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [wallets, setWallets] = useState(detectWallets())

  // Re-check wallets periodically and when window focus changes
  useEffect(() => {
    const checkWallets = () => {
      setWallets(detectWallets())
    }

    // Check on mount
    checkWallets()

    // Check when window regains focus (user might have installed wallet)
    window.addEventListener('focus', checkWallets)
    
    // Check periodically
    const interval = setInterval(checkWallets, 2000)

    return () => {
      window.removeEventListener('focus', checkWallets)
      clearInterval(interval)
    }
  }, [])

  const handleConnect = async () => {
    try {
      // Check if wallets are installed
      const { installed } = checkWalletsInstalled()
      
      if (!installed) {
        setShowWalletModal(true)
        return
      }

      await connectWallet()
    } catch (error: any) {
      console.error('Failed to connect wallet:', error)
      if (error.message === 'NO_WALLET_INSTALLED') {
        setShowWalletModal(true)
      } else {
        alert('Failed to connect wallet. Please try again.')
      }
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
  }

  if (isConnected && wallet) {
    return (
      <div className="flex items-center gap-4">
        <div className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-lg">
          <p className="text-sm text-orange-400 font-semibold">
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

  const missingWallets = wallets.filter(w => !w.installed)

  return (
    <>
      <button
        onClick={handleConnect}
        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold rounded-lg hover:from-orange-400 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-orange-500/50"
      >
        <i className="fas fa-wallet mr-2"></i>
        Connect Wallet
      </button>

      {/* Wallet Installation Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="glass-card p-8 max-w-md w-full mx-4 border border-orange-500/30">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                Install Aleo Wallet
              </h3>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <p className="text-gray-300 mb-6">
              To connect your wallet, please install one of the following Aleo-compatible wallets:
            </p>

            <div className="space-y-4 mb-6">
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`p-4 rounded-lg border ${
                    wallet.installed
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <i className={`fas ${wallet.icon} text-2xl ${wallet.installed ? 'text-green-400' : 'text-gray-400'}`}></i>
                      <div>
                        <p className="font-semibold text-white">{wallet.name}</p>
                        {wallet.installed && (
                          <p className="text-xs text-green-400">Installed ✓</p>
                        )}
                      </div>
                    </div>
                    {!wallet.installed && (
                      <a
                        href={wallet.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold rounded-lg hover:from-orange-400 hover:to-amber-400 transition-all text-sm"
                      >
                        Install
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowWalletModal(false)}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-sm font-semibold"
              >
                Cancel
              </button>
              {missingWallets.length > 0 && (
                <a
                  href={missingWallets[0].downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold rounded-lg hover:from-orange-400 hover:to-amber-400 transition-all text-sm text-center"
                >
                  Install {missingWallets[0].name}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WalletConnection
