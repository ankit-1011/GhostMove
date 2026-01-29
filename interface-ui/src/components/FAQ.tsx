import { useState } from 'react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does GhostMove ensure my location privacy?",
      answer: "GhostMove uses zero-knowledge proofs to match delivery persons with your order without revealing your exact coordinates. Your delivery address is encrypted and stored in Aleo's encrypted state, ensuring only authorized parties can decrypt it. The system proves proximity without exposing location data.",
    },
    {
      question: "What happens to my identity after delivery?",
      answer: "Each delivery uses a temporary zero-knowledge identity token that automatically burns after completion. No permanent identity record is created on-chain or off-chain. This ensures you can't be tracked across multiple orders.",
    },
    {
      question: "How do delivery persons find me without seeing my address?",
      answer: "Delivery persons use zero-knowledge proximity proofs to verify they are within the required distance of your delivery address without seeing your exact coordinates. They prove 'I am within X km' without revealing where you actually are.",
    },
    {
      question: "Is my payment information private?",
      answer: "Yes! All payments are processed through Aleo's shielded transaction system. Payment amounts, sender, and receiver addresses are encrypted and hidden from public view. Only the parties involved can decrypt their transaction details.",
    },
    {
      question: "Can I track my order?",
      answer: "You can view your active orders in the 'My Orders' section. However, location tracking is privacy-preserving - you'll see order status and delivery person proximity verification, but exact locations remain encrypted.",
    },
    {
      question: "What makes GhostMove different from other delivery apps?",
      answer: "GhostMove is built on Aleo blockchain with zero-knowledge cryptography. Unlike traditional apps that collect and monetize your data, GhostMove ensures zero data trails, zero identity tracking, and zero ad targeting. Your privacy is not a product.",
    },
    {
      question: "Do I need to install any special wallet?",
      answer: "Yes, you'll need an Aleo-compatible wallet like Leo Wallet to connect and make payments. The wallet enables private transactions and identity management on the Aleo blockchain.",
    },
    {
      question: "What if I need to prove I received my order?",
      answer: "GhostMove supports selective disclosure. If needed for compliance or disputes, you can generate zero-knowledge proofs that verify order completion without revealing other sensitive information like your address or payment details.",
    },
  ]

  return (
    <section className="py-20 px-6 mt-50 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-orange-400 text-sm font-semibold mb-2">FAQ's</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-violet-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            Everything you need to know about privacy-first pizza delivery on Aleo.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card border border-white/10 rounded-lg overflow-hidden transition-all hover:border-orange-500/30"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white pr-8">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-all duration-300 ease-in-out ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="m5 7.5 5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-orange-400"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    openIndex === index
                      ? 'opacity-100 max-h-[500px] translate-y-0 mt-4'
                      : 'opacity-0 max-h-0 -translate-y-2'
                  }`}
                >
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
