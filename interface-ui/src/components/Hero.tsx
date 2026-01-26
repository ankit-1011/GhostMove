

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br  from-black via-purple-950/20 to-black"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10  max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32 flex justify-center items-center flex-col">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-cyan-400 via-teal-400 to-violet-400 bg-clip-text text-transparent">
          Ride. Deliver. Disappear.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
          Privacy-first ride sharing and delivery on Aleo. No tracking. No phone numbers. No data trails.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
          <button className="px-10 sm:px-12 md:px-16 lg:px-20 py-5 sm:py-6 md:py-7 lg:py-8 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold rounded-lg hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 shadow-lg shadow-cyan-500/50">
            Launch App
          </button>
          <button className="px-10 sm:px-12 md:px-16 lg:px-20 py-5 sm:py-6 md:py-7 lg:py-8 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
            Connect wallet
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
