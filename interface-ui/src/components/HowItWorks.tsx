const steps = [
  {
    number: "01",
    title: "Create Ride",
    description: "Submit an encrypted ride request without revealing your identity. Your location stays completely private until matched with a driver through zero-knowledge verification.",
    icon: "🚗",
    stats: [
      { value: "100%", label: "Encrypted" },
      { value: "0", label: "Identity Leaks" },
    ],
    alignment: "left",
  },
  {
    number: "02",
    title: "Match Privately",
    description: "Drivers prove proximity using zero-knowledge proofs without revealing exact coordinates. Secure matching algorithm ensures complete privacy throughout the process.",
    icon: "🔗",
    stats: [
      { value: "ZK", label: "Proximity Proof" },
      { value: "100%", label: "Private Match" },
    ],
    alignment: "right",
  },
  {
    number: "03",
    title: "Complete & Vanish",
    description: "Identity auto-deletes after ride completion. Payment settles privately through shielded Aleo transactions. No trace remains on-chain, complete privacy preservation.",
    icon: "👻",
    stats: [
      { value: "Auto", label: "Identity Burn" },
      { value: "0", label: "Data Trail" },
    ],
    alignment: "left",
  },
]

const HowItWorks = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden bg-gradient-to-b from-black to-purple-950/10">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-violet-500/20 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            How It <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Three simple steps to private, secure ride-sharing with zero data trails
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-20 sm:space-y-24 lg:space-y-28">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 ${
                step.alignment === "right" ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Left/Right Side - Content */}
              <div className="lg:w-1/2 relative">
                <span className="text-[140px] sm:text-[180px] md:text-[220px] font-bold font-display text-cyan-500/10 leading-none select-none absolute -top-12 sm:-top-16 -left-4 sm:-left-8">
                  {step.number}
                </span>
                <div className={`relative z-10 ${step.alignment === "right" ? "lg:pr-4 lg:text-right" : "pl-4"}`}>
                  <div className="flex items-center gap-4 mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center text-3xl sm:text-4xl">
                      {step.icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Right/Left Side - Stats */}
              <div className={`lg:w-1/2 flex justify-center gap-6 sm:gap-8 ${
                step.alignment === "right" ? "lg:justify-start" : "lg:justify-end"
              }`}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold font-display bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
                    {step.stats[0].value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">
                    {step.stats[0].label}
                  </div>
                </div>
                <div className="w-px h-20 sm:h-24 bg-gradient-to-b from-cyan-500/50 to-transparent self-center"></div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold font-display bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent mb-2">
                    {step.stats[1].value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">
                    {step.stats[1].label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
