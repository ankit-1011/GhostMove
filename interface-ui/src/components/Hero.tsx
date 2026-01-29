
import WalletConnection from './WalletConnection'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex justify-center items-center overflow-hidden pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br  from-black via-purple-950/20 to-black"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10  pt-24 text-center flex flex-col items-center justify-center  ">
        <div className="relative inline-block">
          {/* Curved Arrow SVG - from "O" in Order to "r" in Disappear */}
          <svg
            className="absolute -top-24 left-0 pointer-events-none"
            width="100%"
            height="120"
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            style={{ width: 'calc(100% + 2rem)' }}
          >
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(251, 146, 60, 0.4)" />
                <stop offset="50%" stopColor="rgba(251, 146, 60, 0.7)" />
                <stop offset="100%" stopColor="rgba(251, 146, 60, 0.4)" />
              </linearGradient>
              <filter id="curveGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Curved path from start (O) to end (r) */}
            <path
              d="M 20 100 Q 500 20, 980 100"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="3"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className="animate-arrow-flow"
              filter="url(#curveGlow)"
              strokeLinecap="round"
            />
            {/* Arrow head at start (touching "O") */}
            <path
              d="M 20 100 L 10 95 L 15 100 L 10 105 Z"
              fill="rgba(251, 146, 60, 0.7)"
              filter="url(#curveGlow)"
            />
            {/* Arrow head at end (touching "r") */}
            <path
              d="M 980 100 L 990 95 L 985 100 L 990 105 Z"
              fill="rgba(251, 146, 60, 0.7)"
              filter="url(#curveGlow)"
            />
          </svg>

          {/* Animated Scooter Icon - moves along curved path */}
          <div className="absolute -top-20 left-0 animate-scooter-curve pointer-events-none">
            <div className="relative">
              <i 
                className="fas fa-motorcycle text-3xl text-orange-400" 
                style={{ 
                  filter: 'drop-shadow(0 0 10px rgba(251, 146, 60, 0.8))',
                  textShadow: '0 0 20px rgba(251, 146, 60, 0.5)'
                }}
              ></i>
            </div>
          </div>

          <h1 className="text-8xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-violet-400 bg-clip-text text-transparent relative z-10 px-4">
            Order. Deliver. Disappear.
          </h1>
        </div>
        <p className="text-2xl text-center text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 py-2">
          Privacy-first pizza delivery on Aleo. No tracking. No phone numbers. No data trails.
        </p><br/>
          <div className="mt-4">
            <WalletConnection />
          </div>
       
      </div>
    </section>
  )
}

export default Hero
