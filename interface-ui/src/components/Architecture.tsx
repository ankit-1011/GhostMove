const Architecture = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-purple-950/10 to-black mb-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Architecture
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center border border-cyan-500/30">
              <i className="fas fa-globe text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Frontend</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">Client-side location only. No server tracking.</p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-1">Problem Solved:</p>
              <p className="text-gray-300 text-xs leading-relaxed">Eliminates server-side tracking and data collection, ensuring user location privacy is maintained entirely on the client side.</p>
            </div>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-gradient-to-br from-teal-500/20 to-violet-500/20 flex items-center justify-center border border-teal-500/30">
              <i className="fas fa-bolt-lightning text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Aleo ZK Program</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">Private computation with zero-knowledge proofs.</p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-1">Problem Solved:</p>
              <p className="text-gray-300 text-xs leading-relaxed">Enables private matching and verification without revealing sensitive user data or location coordinates.</p>
            </div>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center border border-violet-500/30">
              <i className="fas fa-lock text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Encrypted State</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">All data encrypted by default on-chain.</p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-1">Problem Solved:</p>
              <p className="text-gray-300 text-xs leading-relaxed">Prevents on-chain data leakage and ensures all transaction data remains encrypted and private.</p>
            </div>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center border border-cyan-500/30">
              <i className="fas fa-wallet text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Wallet Integration</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">Seamless wallet connection for private transactions.</p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-1">Problem Solved:</p>
              <p className="text-gray-300 text-xs leading-relaxed">Enables secure, private payments without exposing wallet addresses or transaction history to third parties.</p>
            </div>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-gradient-to-br from-teal-500/20 to-violet-500/20 flex items-center justify-center border border-teal-500/30">
              <i className="fas fa-user-shield text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Identity Management</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">Temporary ZK identities that auto-expire after rides.</p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-1">Problem Solved:</p>
              <p className="text-gray-300 text-xs leading-relaxed">Eliminates permanent identity tracking by using disposable identities that burn after each transaction.</p>
            </div>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center border border-violet-500/30">
              <i className="fas fa-project-diagram text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Private Matching Algorithm</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">ZK-based proximity matching without revealing locations.</p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-1">Problem Solved:</p>
              <p className="text-gray-300 text-xs leading-relaxed">Matches riders and drivers based on proximity without exposing exact coordinates or user identities.</p>
            </div>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center border border-cyan-500/30">
              <i className="fas fa-shield-alt text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Zero-Knowledge Proofs</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">Cryptographic proofs without data disclosure.</p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-1">Problem Solved:</p>
              <p className="text-gray-300 text-xs leading-relaxed">Enables verification of proximity, eligibility, and transactions without revealing any underlying sensitive information.</p>
            </div>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-gradient-to-br from-teal-500/20 to-violet-500/20 flex items-center justify-center border border-teal-500/30">
              <i className="fas fa-coins text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Shielded Payments</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">Private payment settlement on Aleo blockchain.</p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-1">Problem Solved:</p>
              <p className="text-gray-300 text-xs leading-relaxed">Ensures financial privacy by hiding payment amounts, sender, and receiver information from public blockchain records.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Architecture
