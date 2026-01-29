const steps = [
  {
    number: "01",
    title: "Place Order",
    description: "Submit an encrypted pizza order without revealing your identity. Your delivery address stays completely private until matched with a delivery person through zero-knowledge verification.",
    icon: "fa-pizza-slice",
    stats: [
      { value: "100%", label: "Encrypted" },
      { value: "0", label: "Identity Leaks" },
    ],
    alignment: "left",
  },
  {
    number: "02",
    title: "Match Privately",
    description: "Delivery persons prove proximity using zero-knowledge proofs without revealing exact coordinates. Secure matching algorithm ensures complete privacy throughout the process.",
    icon: "fa-link",
    stats: [
      { value: "ZK", label: "Proximity Proof" },
      { value: "100%", label: "Private Match" },
    ],
    alignment: "right",
  },
  {
    number: "03",
    title: "Deliver & Vanish",
    description: "Identity auto-deletes after delivery completion. Payment settles privately through shielded Aleo transactions. No trace remains on-chain, complete privacy preservation.",
    icon: "fa-user-secret",
    stats: [
      { value: "Auto", label: "Identity Burn" },
      { value: "0", label: "Data Trail" },
    ],
    alignment: "left",
  },
]

const HowItWorks = () => {
  return (
    <section className=" bg-gradient-to-b from-black to-purple-950/10 py-20 ">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center" style={{ paddingBottom: '3rem' }}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" style={{ marginBottom: '1.5rem' }}>
            How It <span className="bg-gradient-to-r from-orange-400 to-violet-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed text-center" >
            Three simple steps to private, secure pizza delivery with zero data trails
          </p>
        </div>

        {/* Steps */}
        <div className="flex justify-center items-center flex-col gap-20 sm:gap-24 lg:gap-28 w-full" style={{ paddingTop: '3rem' }}>
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 w-full max-w-5xl mx-auto ${
                step.alignment === "right" ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Left/Right Side - Content */}
              <div className="lg:w-1/2 relative">
                <span className="text-[140px] sm:text-[180px] md:text-[220px] font-bold font-display text-orange-500/20 leading-none select-none absolute -top-12 sm:-top-16 -left-4 sm:-left-8">
                  {step.number}
                </span>
                <div className={`relative z-10 ${step.alignment === "right" ? "lg:pr-4 lg:text-right -right-20 top-4" : "lg:text-left text-center lg:text-left pl-4 left-21 top-3"}`}>
                  <div className="flex items-center gap-4 mb-4 sm:mb-6 ">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center text-3xl sm:text-4xl ">
                      <i className={`fas ${step.icon}`}></i>
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
                step.alignment === "right" ? "lg:justify-start" : "lg:justify-end "
              }`}>
                <div className="text-center ">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold font-display bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-2 ">
                    {step.stats[0].value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">
                    {step.stats[0].label}
                  </div>
                </div>
                <div className="w-px h-20 sm:h-24 bg-gradient-to-b from-orange-500/50 to-transparent self-center"></div>
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
