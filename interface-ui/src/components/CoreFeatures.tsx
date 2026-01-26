

const CoreFeatures = () => {
  return (
    <section className="py-20 px-6 h-[700px]  m-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 sm:mb-16 text-center">
          Core <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Features</span>
        </h2>

        <div className="flex flex-wrap justify-center items-center   gap-12">
          <div className="glass-card p-5 bg-gradient-to-br from-transparent to-transparent border border-white/20 text-center border rounded-lg">
            <div className="flex items-start  flex-col gap-3">
              <div className="text-white-400 text-lg mt-1"><i className="fas fa-id-card fa-2x"></i></div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Temporary Identity Tokens</h3>
                <p className="text-gray-400 text-lg leading-relaxed">Auto-expiring ZK identities that burn after each ride.</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 bg-gradient-to-br from-transparent to-transparent border border-white/20 text-center border rounded-lg">
            <div className="flex items-start  flex-col gap-3">
              <div className="text-teal-400 text-lg mt-1"><i className="fas fa-lock fa-2x"></i></div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Encrypted Ride Data</h3>
                <p className="text-gray-400 text-lg leading-relaxed">All location, fare, and chat data encrypted by default.</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 bg-gradient-to-br from-transparent to-transparent border border-white/20 text-center border rounded-lg">
            <div className="flex items-start  flex-col gap-3">
              <div className="text-violet-400 text-lg mt-1"><i className="fas fa-wallet fa-2x"></i></div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Private Payments</h3>
                <p className="text-gray-400 text-lg leading-relaxed">Shielded transactions with no public financial graph.</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 bg-gradient-to-br from-transparent to-transparent border border-white/20 text-center border rounded-lg">
            <div className="flex items-start  flex-col gap-3">
              <div className="text-cyan-400 text-lg mt-1"><i className="fas fa-ban fa-2x"></i></div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">No Ads, No Profiling</h3>
                <p className="text-gray-400 text-lg leading-relaxed">Zero tracking. Zero targeting. Zero data collection.</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 bg-gradient-to-br from-transparent to-transparent border border-white/20 text-center border rounded-lg">
            <div className="flex items-start  flex-col gap-3">
              <div className="text-teal-400 text-lg mt-1"><i className="fas fa-eye-slash fa-2x"></i></div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Selective Disclosure</h3>
                <p className="text-gray-400 text-lg leading-relaxed">Compliance-ready with optional proof generation.</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 bg-gradient-to-br from-transparent to-transparent border border-white/20 text-center border rounded-lg ">
            <div className="flex items-start  flex-col  gap-3">
              <div className="text-violet-400 text-lg mt-1"><i className="fas fa-map-marker-alt fa-2x"></i></div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">ZK Proximity Proofs</h3>
                <p className="text-gray-400 text-lg leading-relaxed">Prove location proximity without revealing coordinates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoreFeatures
