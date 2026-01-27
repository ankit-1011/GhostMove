
import WalletConnection from './WalletConnection'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex justify-center items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br  from-black via-purple-950/20 to-black"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10  pt-24 text-center flex flex-col items-center justify-center  ">
        <h1 className=" text-8xl font-bold  bg-gradient-to-r from-cyan-400 via-teal-400 to-violet-400 bg-clip-text text-transparent">
          Ride. Deliver. Disappear.
        </h1>
        <p className="text-2xl text-center text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 py-2">
          Privacy-first ride sharing and delivery on Aleo. No tracking. No phone numbers. No data trails.
        </p><br/>
        <div className="flex flex-col gap-6 justify-center items-center px-6 m-12">
          <div className="flex gap-6">
            <a href="#request-ride" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold rounded-lg hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 hover:shadow-cyan-500/100 flex items-center justify-center gap-2">
              <i className="fas fa-car"></i>
              Request Ride
            </a>
            <a href="#driver-mode" className="px-8 py-4 bg-gradient-to-r from-teal-500 to-violet-500 text-white font-semibold rounded-lg hover:from-teal-400 hover:to-violet-400 transition-all duration-300 hover:shadow-teal-500/100 flex items-center justify-center gap-2">
              <i className="fas fa-user-tie"></i>
              Driver Mode
            </a>
            <a href="#my-rides" className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 hover:shadow-white/100 flex items-center justify-center gap-2">
              <i className="fas fa-list"></i>
              My Rides
            </a>
          </div>
          <div className="mt-4">
            <WalletConnection />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
