import React from 'react'

const CoreFeatures = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 lg:mb-20 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Core Features
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          <div className="glass-card p-5 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-cyan-400 text-lg sm:text-xl mt-1">→</div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Temporary Identity Tokens</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Auto-expiring ZK identities that burn after each ride.</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-5 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-teal-400 text-lg sm:text-xl mt-1">→</div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Encrypted Ride Data</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">All location, fare, and chat data encrypted by default.</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-5 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-violet-400 text-lg sm:text-xl mt-1">→</div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Private Payments</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Shielded transactions with no public financial graph.</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-5 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-cyan-400 text-lg sm:text-xl mt-1">→</div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">No Ads, No Profiling</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Zero tracking. Zero targeting. Zero data collection.</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-5 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-teal-400 text-lg sm:text-xl mt-1">→</div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Selective Disclosure</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Compliance-ready with optional proof generation.</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-5 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-violet-400 text-lg sm:text-xl mt-1">→</div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">ZK Proximity Proofs</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Prove location proximity without revealing coordinates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoreFeatures
