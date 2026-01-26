import React from 'react'

const TrustSignals = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card p-5 sm:p-6 text-center">
            <div className="text-cyan-400 text-2xl mb-3">🔒</div>
            <p className="text-xs sm:text-sm text-gray-300">Built on Aleo</p>
          </div>
          <div className="glass-card p-5 sm:p-6 text-center">
            <div className="text-teal-400 text-2xl mb-3">✨</div>
            <p className="text-xs sm:text-sm text-gray-300">Zero-Knowledge by Design</p>
          </div>
          <div className="glass-card p-5 sm:p-6 text-center">
            <div className="text-violet-400 text-2xl mb-3">🔐</div>
            <p className="text-xs sm:text-sm text-gray-300">Encrypted State</p>
          </div>
          <div className="glass-card p-5 sm:p-6 text-center">
            <div className="text-cyan-400 text-2xl mb-3">👻</div>
            <p className="text-xs sm:text-sm text-gray-300">Temporary Identities</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSignals
