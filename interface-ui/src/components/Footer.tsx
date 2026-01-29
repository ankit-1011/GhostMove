

const Footer = () => {
  return (
    <footer className=" flex items-center justify-center p-6 border-t border-white/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm text-bold">
            Built with ❤️ on <span className="text-orange-400">Aleo</span>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Demo-Vedio</a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
