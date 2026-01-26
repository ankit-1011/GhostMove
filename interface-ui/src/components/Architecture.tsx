import React from 'react'

const Architecture = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-purple-950/10 to-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 lg:mb-20 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Architecture
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          <div className="glass-card p-6 sm:p-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 sm:mb-6 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center border border-cyan-500/30">
              <span className="text-xl sm:text-2xl">🌐</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Frontend</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Client-side location only. No server tracking.</p>
          </div>
          
          <div className="glass-card p-6 sm:p-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 sm:mb-6 rounded-lg bg-gradient-to-br from-teal-500/20 to-violet-500/20 flex items-center justify-center border border-teal-500/30">
              <span className="text-xl sm:text-2xl">⚡</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Aleo ZK Program</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Private computation with zero-knowledge proofs.</p>
          </div>
          
          <div className="glass-card p-6 sm:p-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 sm:mb-6 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center border border-violet-500/30">
              <span className="text-xl sm:text-2xl">🔒</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Encrypted State</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">All data encrypted by default on-chain.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Architecture
