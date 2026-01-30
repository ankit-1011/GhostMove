# GhostMove Demo Video Script

## 🎬 Introduction (0:00 - 0:30)

"Hi everyone! I'm [Your Name], and today I'm excited to show you **GhostMove** - a privacy-first pizza delivery platform built on **Aleo blockchain**.

Unlike traditional delivery apps that track your location, store your phone numbers, and create data trails, GhostMove uses **zero-knowledge proofs** to enable proximity matching and identity verification **without revealing any personal information**."

---

## 🎯 Problem Statement (0:30 - 1:00)

"Current delivery platforms have major privacy concerns:
- They track your exact location
- Store your phone numbers permanently
- Create data trails that can be sold or hacked
- Require you to share personal information just to order food

**GhostMove solves this** by using **Aleo's zero-knowledge cryptography** to prove proximity and verify identities **without revealing any sensitive data**."

---

## 💡 Solution Overview (1:00 - 1:30)

"GhostMove is built on **Aleo blockchain** with two smart contracts:

1. **Proximity Matching Contract** - Matches riders with nearby drivers using ZK proofs
2. **Ride Identity Contract** - Creates temporary identities that expire after delivery

Everything is **private by default** - no location tracking, no phone numbers, no permanent data storage."

---

## 🚀 Key Features (1:30 - 2:30)

### Feature 1: Privacy-First Ordering
"Let me show you how ordering works. [Click on 'Order Pizza']
- I can place an order **without sharing my phone number**
- The system uses my wallet address as a temporary identifier
- My exact location is never stored - only proximity proofs"

### Feature 2: Zero-Knowledge Proximity Matching
"When a driver wants to accept the order:
- They prove they're within the delivery range using **ZK proofs**
- The system verifies proximity **without knowing exact coordinates**
- This is all done on-chain, transparently and securely"

### Feature 3: Temporary Identity System
"Once proximity is proven:
- A **temporary identity** is minted for this specific delivery
- This identity **expires automatically** after delivery completes
- No permanent data trails are created"

### Feature 4: Driver Mode
"Drivers can switch to **Delivery Mode**:
- See available orders in their area
- Prove proximity without revealing exact location
- Accept and complete deliveries privately"

---

## 🔧 Technical Highlights (2:30 - 3:30)

### Smart Contracts
"GhostMove uses two **Leo smart contracts** deployed on Aleo testnet:

1. **proximity_matching_v2.aleo** - Handles ride requests and proximity proofs
2. **ride_identity_v2.aleo** - Manages temporary identity minting and verification

Both contracts are **deployed and live** on the Aleo testnet."

### Frontend
"The frontend is built with:
- **React + TypeScript** for the UI
- **@demox-labs/aleo-wallet-adapter** for wallet integration
- **Leo Wallet** for signing transactions
- Modern, responsive design with smooth animations"

### Zero-Knowledge Proofs
"All proximity checks use **zero-knowledge proofs**:
- Driver proves they're within range **without revealing exact coordinates**
- System verifies the proof **without learning the location**
- This is the power of **Aleo's zkSNARKs**"

---

## 🎥 Live Demo (3:30 - 5:00)

### Step 1: Connect Wallet
"First, let me connect my Leo Wallet. [Click WalletMultiButton]
- I'll select Leo Wallet from the modal
- Approve the connection
- Now I'm connected and ready to use the platform"

### Step 2: Place an Order
"Let's place a pizza order:
- I'll enter my pickup location coordinates
- Set the maximum distance for delivery
- Click 'Create Ride Request'
- The transaction is submitted to Aleo blockchain
- I get a unique ride ID - notice, no phone number required!"

### Step 3: Driver Accepts Order
"Now, as a driver:
- I switch to Delivery Mode
- I can see available orders
- I prove my proximity using my current location
- The system verifies I'm within range using ZK proofs
- I accept the order"

### Step 4: Identity Minting
"When proximity is confirmed:
- A temporary identity is automatically minted
- This identity links rider and driver for this specific delivery
- It expires after delivery completion"

### Step 5: Complete Delivery
"After delivery:
- The ride is marked as complete
- The temporary identity is automatically invalidated
- No permanent data is stored
- Complete privacy maintained"

---

## 🎯 Key Benefits (5:00 - 5:30)

"GhostMove provides:
✅ **Complete Privacy** - No location tracking, no phone numbers
✅ **Zero-Knowledge Proofs** - Verify without revealing
✅ **Temporary Identities** - Auto-expiring, no data trails
✅ **Blockchain Security** - Transparent, immutable, decentralized
✅ **User Control** - You own your data, you control your privacy"

---

## 🔮 Future Enhancements (5:30 - 6:00)

"Future improvements could include:
- Payment integration with Aleo credits
- Rating system using ZK proofs
- Multi-chain support
- Mobile app development
- Integration with more delivery services"

---

## 🎬 Conclusion (6:00 - 6:30)

"GhostMove demonstrates how **blockchain and zero-knowledge proofs** can revolutionize privacy in everyday applications.

We've shown that you can have:
- **Functional delivery matching** without location tracking
- **Identity verification** without permanent data storage
- **Complete transparency** with complete privacy

Thank you for watching! If you want to try GhostMove yourself, check out our GitHub repository.

**Privacy is not a feature - it's a fundamental right.**"

---

## 📝 Quick Tips for Recording

### Before Recording:
1. ✅ Make sure Leo Wallet is installed and unlocked
2. ✅ Have testnet Aleo credits ready
3. ✅ Test all features beforehand
4. ✅ Close unnecessary browser tabs
5. ✅ Use good lighting and clear audio

### During Recording:
1. 🎤 Speak clearly and at moderate pace
2. 🖱️ Click buttons slowly so viewers can follow
3. 📺 Show wallet popups and transaction confirmations
4. 💡 Highlight key features with cursor movements
5. ⏸️ Pause briefly after each major action

### Screen Recording Settings:
- **Resolution**: 1920x1080 (Full HD)
- **Frame Rate**: 30 FPS minimum
- **Audio**: Clear microphone, no background noise
- **Browser**: Chrome with Leo Wallet extension
- **Zoom**: 100% (don't zoom in/out)

---

## 🎨 Visual Cues to Highlight

1. **Wallet Connection** - Show the modal and connection process
2. **Transaction Submissions** - Show wallet approval popups
3. **Blockchain Confirmations** - Point out transaction IDs
4. **Zero-Knowledge Proofs** - Explain what's happening behind the scenes
5. **Temporary Identity** - Show how it expires automatically

---

## 📊 Key Metrics to Mention

- ✅ **2 Smart Contracts** deployed on Aleo testnet
- ✅ **Zero-Knowledge Proofs** for all proximity checks
- ✅ **Temporary Identities** that auto-expire
- ✅ **No Phone Numbers** required
- ✅ **No Location Tracking** - only proximity proofs
- ✅ **100% Private** by default

---

## 🎯 Call to Action

"Want to try GhostMove?
- Check out our GitHub: [Your GitHub Link]
- Deploy your own contracts on Aleo
- Contribute to privacy-first delivery solutions

**Remember: Privacy is not optional - it's essential.**"

---

## 📝 Notes

- **Total Duration**: ~6-7 minutes
- **Pace**: Moderate, clear explanations
- **Tone**: Professional but enthusiastic
- **Focus**: Privacy benefits and technical innovation
- **Audience**: Developers, blockchain enthusiasts, privacy advocates

---

**Good luck with your demo! 🚀**
