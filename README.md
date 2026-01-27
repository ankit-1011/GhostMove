# 🚕 GhostMove

**Privacy-First Ride Sharing & Delivery on Aleo**

A privacy-preserving ride-sharing and delivery protocol built on Aleo, where every ride uses temporary identities, private matching, and encrypted state. No permanent identity, no public transaction graph, no location trail, and no ad targeting.

---

## 🔒 Problem

Current ride-sharing apps leak sensitive data that becomes permanent once exposed:

- **Phone numbers** - Directly exposed to drivers and stored in databases
- **Real-time location history** - Tracked throughout the entire journey
- **Permanent identities** - Linked to all rides and transactions
- **Ride patterns & behavior** - Used for profiling and targeting
- **Post-order ad targeting** - Data sold to advertisers
- **Centralized data honeypots** - Single point of failure for massive breaches

Once leaked → data is permanent.

---

## 💡 Solution

GhostMove is an Aleo-powered ride-sharing platform where:

- Every ride uses a **temporary identity**
- **Private matching** without exposing exact locations
- **Encrypted state** for all ride data
- **No permanent identity** tracking
- **No public transaction graph**
- **No location trail**
- **No ad targeting**

---

## 🧠 Why Aleo (Key Differentiator)

This project is **impossible to build on normal chains**.

| Feature | Normal Blockchain | Aleo |
|---------|------------------|------|
| Identity | Public & permanent | Ephemeral ZK identity |
| Ride data | Fully visible | Encrypted state |
| Location | Trackable | ZK-proven proximity |
| Payments | Traceable | Private transfers |
| Compliance | Hard | Selective disclosure |

---

## 🏗️ Aleo Architecture

### 1️⃣ Temporary Identity Tokens (Core Innovation)

Each ride creates a ZK identity NFT (non-transferable):

```leo
struct RideIdentity {
    rider_pk: field,
    driver_pk: field,
    expires_at: u64,
}
```

**Features:**
- Exists only for the ride duration
- Auto-burns after completion
- Used for chat, payments, verification
- No phone numbers ever revealed

### 2️⃣ Private Ride Matching (ZK Logic)

Instead of exposing locations:

- Driver proves: *"I am within 2km of pickup"* without revealing exact coordinates
- Uses ZK range proofs for proximity verification
- Location data remains encrypted

### 3️⃣ Encrypted State (Aleo Native)

All stored data is encrypted by default:
- Pickup point
- Drop zone
- Fare
- Ratings
- Messages

Only rider & driver can decrypt their ride data.

### 4️⃣ Private Payments

- Shielded payments via Aleo credits
- Optional escrow smart contract
- Tip + fare hidden from public view
- No financial graph leak

### 5️⃣ Selective Disclosure (Compliance)

If required for compliance:
- Driver can prove number of rides
- Platform can prove payments processed
- User can reveal ride history only if needed

---

## 🧩 Leo Smart Contracts (Wave-wise Plan)

### Wave 1 (MVP) 🎯 ✅ IMPLEMENTED
- [x] Create ride
- [x] Mint temporary identity (`ride_identity.aleo`)
- [x] Accept ride
- [ ] Private payment escrow
- [x] Complete ride → identity burns

### Wave 2 ✅ IMPLEMENTED
- [x] ZK proximity proofs (`proximity_matching.aleo`)
- [ ] Encrypted chat
- [ ] Rating system (private)

### Wave 3
- [ ] Delivery mode
- [ ] Multi-stop rides
- [ ] Tips & bonuses

### Wave 4+
- [ ] DAO governance
- [ ] Private reputation
- [ ] Fleet accounts
- [ ] Business delivery

---

## 🧪 Demo Flow (for judges)

1. **Rider creates ride** - Request submitted with encrypted location
2. **Driver accepts** - Proves proximity without revealing exact location
3. **Temporary ID created** - ZK identity NFT minted for this ride only
4. **Payment escrowed privately** - Funds locked in encrypted escrow
5. **Ride completes** - Payment released, ride data encrypted
6. **Identity auto-deletes** - Temporary identity burns automatically
7. **No trace remains on chain** - Only encrypted state remains

---

## 📁 Project Structure

```
GhostMove/
├── README.md                 # This file
├── programs/                # Leo smart contracts
│   ├── ride_identity/      # Temporary ZK Identity Tokens
│   │   ├── src/main.leo
│   │   └── program.json
│   ├── proximity_matching/ # ZK Proximity Proofs
│   │   ├── src/main.leo
│   │   └── program.json
│   └── README.md           # Programs documentation
└── interface-ui/            # Frontend React application
    ├── src/
    ├── package.json
    └── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Aleo SDK](https://developer.aleo.org/getting_started/)
- [Leo](https://developer.aleo.org/leo/installation/) - Aleo's programming language
- Node.js 18+ (for frontend)
- pnpm or npm

### Frontend Setup

```bash
cd interface-ui
pnpm install
pnpm dev
```

### Smart Contracts

The core privacy primitives are implemented! See `programs/README.md` for detailed documentation.

```bash
# Install Leo
curl -L https://get.aleo.org/leo | bash

# Build ride identity program
cd programs/ride_identity
leo build

# Build proximity matching program
cd ../proximity_matching
leo build
```

#### Implemented Programs

1. **`ride_identity.aleo`** - Temporary ZK Identity Tokens
   - Mint non-transferable identities for each ride
   - Auto-expire after ride completion
   - Stored in encrypted state (no public visibility)

2. **`proximity_matching.aleo`** - ZK Proximity Proofs
   - Drivers prove proximity without revealing coordinates
   - Uses Haversine formula in zero-knowledge
   - Only boolean result (within range) is public

---

## 🔐 Privacy Guarantees

- ✅ **Zero-knowledge proofs** for all proximity checks
- ✅ **Encrypted state** for all ride data
- ✅ **Temporary identities** that auto-expire
- ✅ **Private payments** with no public trace
- ✅ **Selective disclosure** for compliance when needed

---

## 🤝 Contributing

This project is in active development. Contributions welcome!

---

## 📄 License

[To be determined]

---

## 🔗 Resources

- [Aleo Documentation](https://developer.aleo.org/)
- [Leo Language Guide](https://developer.aleo.org/leo/language/)
- [Aleo Privacy Model](https://developer.aleo.org/aleo/introduction/privacy/)

---

**Built with ❤️ on Aleo**
