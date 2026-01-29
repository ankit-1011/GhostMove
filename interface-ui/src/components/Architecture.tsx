// const Architecture = () => {
//   return (
//     <section className="py-20 px-6 bg-gradient-to-b from-purple-950/10 to-black mt-44">
//       <div className="max-w-6xl mx-auto">
//       <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
//   Privacy-First Architecture
// </h2>
// <p className="text-center text-gray-300 text-base sm:text-lg font-semibold mb-16 max-w-3xl mx-auto leading-relaxed">
//   Every layer of GhostMove is designed to eliminate data leakage, tracking, and permanent identity exposure — from frontend to settlement.
// </p>

        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          
//           <div className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
//             <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-teal-500/20 to-violet-500/20 flex items-center justify-center border-2 border-teal-500/30">
//               <i className="fas fa-bolt-lightning text-3xl text-teal-400"></i>
//             </div>
//             <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Aleo ZK Program</h3>
//             <p className="text-gray-300 text-base font-semibold leading-relaxed mb-4">Private computation with zero-knowledge proofs.</p>
//             <div className="mt-4 pt-4 border-t-2 border-white/20">
//               <p className="text-sm text-teal-400 font-bold mb-2">Problem Solved:</p>
//               <p className="text-gray-200 text-sm font-medium leading-relaxed">Enables private matching and verification without revealing sensitive user data or location coordinates.</p>
//             </div>
//           </div>
          
//           <div className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
//             <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center border-2 border-violet-500/30">
//               <i className="fas fa-lock text-3xl text-violet-400"></i>
//             </div>
//             <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Encrypted State</h3>
//             <p className="text-gray-300 text-base font-semibold leading-relaxed mb-4">All data encrypted by default on-chain.</p>
//             <div className="mt-4 pt-4 border-t-2 border-white/20">
//               <p className="text-sm text-violet-400 font-bold mb-2">Problem Solved:</p>
//               <p className="text-gray-200 text-sm font-medium leading-relaxed">Prevents on-chain data leakage and ensures all transaction data remains encrypted and private.</p>
//             </div>
//           </div>

//           <div className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
//             <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center border-2 border-cyan-500/30">
//               <i className="fas fa-wallet text-3xl text-cyan-400"></i>
//             </div>
//             <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Wallet Integration</h3>
//             <p className="text-gray-300 text-base font-semibold leading-relaxed mb-4">Seamless wallet connection for private transactions.</p>
//             <div className="mt-4 pt-4 border-t-2 border-white/20">
//               <p className="text-sm text-cyan-400 font-bold mb-2">Problem Solved:</p>
//               <p className="text-gray-200 text-sm font-medium leading-relaxed">Enables secure, private payments without exposing wallet addresses or transaction history to third parties.</p>
//             </div>
//           </div>

//           <div className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
//             <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-teal-500/20 to-violet-500/20 flex items-center justify-center border-2 border-teal-500/30">
//               <i className="fas fa-user-shield text-3xl text-teal-400"></i>
//             </div>
//             <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Identity Management</h3>
//             <p className="text-gray-300 text-base font-semibold leading-relaxed mb-4">Temporary ZK identities that auto-expire after deliveries.</p>
//             <div className="mt-4 pt-4 border-t-2 border-white/20">
//               <p className="text-sm text-teal-400 font-bold mb-2">Problem Solved:</p>
//               <p className="text-gray-200 text-sm font-medium leading-relaxed">Eliminates permanent identity tracking by using disposable identities that burn after each transaction.</p>
//             </div>
//           </div>

//           <div className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
//             <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center border-2 border-violet-500/30">
//               <i className="fas fa-project-diagram text-3xl text-violet-400"></i>
//             </div>
//             <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Private Matching Algorithm</h3>
//             <p className="text-gray-300 text-base font-semibold leading-relaxed mb-4">ZK-based proximity matching without revealing locations.</p>
//             <div className="mt-4 pt-4 border-t-2 border-white/20">
//               <p className="text-sm text-violet-400 font-bold mb-2">Problem Solved:</p>
//               <p className="text-gray-200 text-sm font-medium leading-relaxed">Matches customers and delivery persons based on proximity without exposing exact coordinates or user identities.</p>
//             </div>
//           </div>

//           <div className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
//             <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center border-2 border-cyan-500/30">
//               <i className="fas fa-shield-alt text-3xl text-cyan-400"></i>
//             </div>
//             <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Zero-Knowledge Proofs</h3>
//             <p className="text-gray-300 text-base font-semibold leading-relaxed mb-4">Cryptographic proofs without data disclosure.</p>
//             <div className="mt-4 pt-4 border-t-2 border-white/20">
//               <p className="text-sm text-cyan-400 font-bold mb-2">Problem Solved:</p>
//               <p className="text-gray-200 text-sm font-medium leading-relaxed">Enables verification of proximity, eligibility, and transactions without revealing any underlying sensitive information.</p>
//             </div>
//           </div>

         
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Architecture
