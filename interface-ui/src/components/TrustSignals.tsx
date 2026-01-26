

const TrustSignals = () => {
  return (
    <section className=" h-[200px]">
        <div className="flex justify-evenly gap-4">
          <div className="bg-gradient-to-br from-transparent to-transparent border border-white/20 text-center border rounded-lg py-12 px-16">
            <div className="text-white-400 text-2xl mb-3"><i className="fas fa-shield fa-xl" style={{ display: 'inline-block', width: '1em' }}></i></div>
            <p className="text-lg font-bold text-gray-300">Built on Aleo</p>
          </div>
          <div className="bg-gradient-to-br from-transparent to-transparent border border-white/20 text-center border rounded-lg py-12 px-12">
            <div className="text-white-400 text-2xl mb-3"><i className="fas fa-star fa-xl" style={{ display: 'inline-block', width: '1em' }}></i></div>
            <p className="text-lg font-bold text-gray-300">Zero-Knowledge by Design</p>
          </div>
          <div className="bg-gradient-to-br from-transparent to-transparent border border-white/20 text-center border rounded-lg py-12 px-16">
            <div className="text-white-400 text-2xl mb-3"><i className="fas fa-lock fa-xl" style={{ display: 'inline-block', width: '1em' }}></i></div>
            <p className="text-lg font-bold text-gray-300">Encrypted State</p>
          </div>
          <div className="bg-gradient-to-br from-transparent to-transparent border border-white/20 text-center border rounded-lg py-12 px-16">
            <div className="text-white-400 text-2xl mb-3"><i className="fas fa-user-secret fa-xl" style={{ display: 'inline-block', width: '1em' }}></i></div>
            <p className="text-lg font-bold text-gray-300">Temporary Identities</p>
          </div>
        </div>
    </section>
  )
}

export default TrustSignals
