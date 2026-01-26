

const Footer = () => {
  return (
    <footer className="py-10 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 border-t border-white/5 mt-12 sm:mt-16 lg:mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="text-gray-400 text-sm">
            Built with ❤️ on <span className="text-cyan-400">Aleo</span>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Docs</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Buildathon</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
