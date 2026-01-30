# GhostMove Aleo Programs

This directory contains the Leo smart contracts that implement GhostMove's core privacy primitives on the Aleo blockchain.

## 📁 Program Structure

```
programs/
├── ride_identity/          # Temporary ZK Identity Tokens
│   ├── src/
│   │   └── main.leo       # Main program file
│   └── program.json       # Program configuration
└── proximity_matching/     # ZK Proximity Proofs
    ├── src/
    │   └── main.leo       # Main program file
    └── program.json       # Program configuration
```

## 🔐 Program 1: Ride Identity (`ride_identity.aleo`)

### Overview
Implements temporary, non-transferable zero-knowledge identities for each ride. These identities:
- Exist only for the duration of a single ride
- Are bound to both rider and driver without revealing real identities
- Are used for authentication, payments, and communication
- Automatically expire or burn after ride completion
- Are stored in Aleo's encrypted state (no public visibility)

### Key Functions

#### `mint_identity`
Creates a new temporary identity token for a ride.
- **Inputs**: Rider address, driver address, ride ID, duration, timestamp
- **Output**: `RideIdentity` struct
- **Privacy**: All data stored in encrypted state

#### `verify_identity`
Verifies that an identity is valid and not expired.
- **Inputs**: Ride ID, caller address, current timestamp
- **Output**: Boolean (true if valid)
- **Use Case**: Authentication during ride

#### `complete_ride`
Burns the temporary identity after ride completion.
- **Inputs**: Ride ID, caller address, current timestamp
- **Output**: Boolean (true if successful)
- **Privacy**: Removes identity from active mappings

#### `expire_identity`
Auto-expires identities that have passed their expiration time.
- **Inputs**: Ride ID, current timestamp
- **Output**: Boolean (true if expired)
- **Use Case**: Cleanup of expired identities

### Data Structures

```leo
struct RideIdentity {
    rider_address: address,
    driver_address: address,
    ride_id: field,
    created_at: u64,
    expires_at: u64,
    is_active: bool,
}
```

## 🗺️ Program 2: Proximity Matching (`proximity_matching.aleo`)

### Overview
Implements zero-knowledge proximity proofs that allow drivers to prove they are within a certain distance of a pickup location without revealing:
- Exact GPS coordinates
- Real-time location history
- Identity linkage

### Key Functions

#### `create_ride_request`
Creates a ride request with encrypted pickup location.
- **Inputs**: Ride ID, rider address, pickup coordinates, max distance, timestamp
- **Output**: `RideRequest` struct
- **Privacy**: Location stored in encrypted state

#### `prove_proximity`
Driver generates a ZK proof stating "I am within X km of pickup" without revealing exact location.
- **Inputs**: Ride ID, driver address, driver coordinates, timestamp
- **Output**: `ProximityProof` struct
- **Privacy**: Only reveals boolean result (within range or not), not actual distance or coordinates

#### `verify_proximity_proof`
Public verification of a proximity proof.
- **Inputs**: Ride ID
- **Output**: Boolean (true if valid)
- **Use Case**: Platform can verify driver eligibility

#### `calculate_distance`
Haversine formula implementation for distance calculation in zero-knowledge.
- **Privacy**: Computes distance without revealing coordinates
- **Algorithm**: Standard Haversine formula for great-circle distance

### Data Structures

```leo
struct Location {
    latitude: field,   // Encrypted
    longitude: field, // Encrypted
}

struct ProximityProof {
    ride_id: field,
    driver_address: address,
    is_within_range: bool,      // Only this is public
    max_distance_km: u32,
    proof_timestamp: u64,
}

struct RideRequest {
    ride_id: field,
    rider_address: address,
    pickup_location: Location,  // Encrypted
    max_distance_km: u32,
    created_at: u64,
    is_active: bool,
}
```

## 🚀 Getting Started

### Prerequisites

1. **Install Leo CLI**
   ```bash
   curl -L https://get.aleo.org/leo | bash
   ```

2. **Install Aleo SDK**
   Follow instructions at [Aleo Developer Docs](https://developer.aleo.org/getting_started/)

### Building Programs

Navigate to each program directory and build:

```bash
# Build ride identity program
cd programs/ride_identity
leo build

# Build proximity matching program
cd ../proximity_matching
leo build
```

### Testing Programs

```bash
# Run tests for ride identity
cd programs/ride_identity
leo test

# Run tests for proximity matching
cd ../proximity_matching
leo test
```

### Deploying to Aleo Testnet

#### Prerequisites for Deployment

1. **Install Aleo CLI** (for network interaction)
   ```bash
   curl -L https://get.aleo.org/aleo | bash
   ```

2. **Create Aleo Account** (if you don't have one)
   ```bash
   aleo account new
   ```
   This will generate:
   - Private Key (⚠️ Save securely!)
   - View Key
   - Address

3. **Get Testnet Credits**
   - Visit: https://faucet.aleo.org
   - Enter your Aleo address
   - Request testnet credits (free)

#### Step-by-Step Deployment

**Step 1: Build the Programs**

Before deploying, ensure both programs build successfully:

```bash
# Build ride identity program
cd programs/ride_identity
leo build

# Build proximity matching program
cd ../proximity_matching
leo build
```

**Step 2: Deploy to Testnet**

**Option A: Using Leo CLI (Recommended)**

```bash
# Deploy ride_identity
cd programs/ride_identity
leo deploy --private-key YOUR_PRIVATE_KEY

# Deploy proximity_matching
cd ../proximity_matching
leo deploy --private-key YOUR_PRIVATE_KEY
```

**Option B: Using Aleo CLI**

```bash
# Deploy ride_identity
cd programs/ride_identity
aleo program deploy ride_identity.aleo --private-key YOUR_PRIVATE_KEY --endpoint https://api.explorer.aleo.org/v1

# Deploy proximity_matching
cd ../proximity_matching
aleo program deploy proximity_matching.aleo --private-key YOUR_PRIVATE_KEY --endpoint https://api.explorer.aleo.org/v1
```

**Step 3: Verify Deployment**

After deployment, you'll receive:
- **Transaction ID**: Unique identifier for the deployment
- **Program ID**: Usually `program_name.aleo` or a unique identifier

Verify on:
- **Aleo Explorer**: https://explorer.aleo.org (search for your transaction ID)
- **Check program status**: `aleo program list`

**Step 4: Update Frontend**

After deployment, update the frontend service:

**File**: `interface-ui/src/services/aleoService.ts`

```typescript
// Update these with your deployed program IDs
const PROXIMITY_MATCHING_PROGRAM = 'proximity_matching.aleo' // or your actual program ID
const RIDE_IDENTITY_PROGRAM = 'ride_identity.aleo' // or your actual program ID
```

#### Common Deployment Issues

| Issue | Solution |
|-------|----------|
| "Insufficient credits" | Get more testnet credits from [faucet](https://faucet.aleo.org) |
| "Program already exists" | Programs are immutable. Deploy with a new name or use a different account |
| "Build failed" | Check for syntax errors, verify dependencies, check Leo version |
| "Network connection error" | Check internet, verify RPC endpoint, try different endpoint |

#### Quick Reference Commands

```bash
# Build program
leo build

# Deploy program to testnet
leo deploy --private-key YOUR_PRIVATE_KEY

# Check testnet account balance
aleo account balance

# List deployed programs
aleo program list

# Execute program function
aleo program execute PROGRAM_NAME FUNCTION_NAME \
  --private-key YOUR_PRIVATE_KEY \
  --inputs "input1 input2 ..."

# View transaction
aleo transaction view TRANSACTION_ID
```

#### Deployment Checklist

- [ ] Leo CLI installed
- [ ] Aleo CLI installed
- [ ] Aleo account created
- [ ] Testnet credits obtained from faucet
- [ ] Programs build successfully
- [ ] Programs deployed to testnet
- [ ] Deployment verified on explorer
- [ ] Frontend program IDs updated
- [ ] Test transaction executed successfully

> **Note**: All commands above work on testnet by default. No need to specify `--network testnet` explicitly.

For detailed deployment guide, see [`DEPLOYMENT.md`](./DEPLOYMENT.md)

### Deploying Frontend to Vercel

After deploying smart contracts, deploy the frontend:

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to [Vercel](https://vercel.com) and sign in with GitHub
2. Click "Add New Project" → Select your repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `interface-ui`
   - **Build Command**: `npm run build` (or `pnpm build`)
   - **Output Directory**: `dist`
4. Click "Deploy"

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Navigate to frontend
cd interface-ui

# Deploy (development)
vercel

# Deploy (production)
vercel --prod
```

**Important**: Make sure to update program IDs in `interface-ui/src/services/aleoService.ts` after smart contract deployment!

For detailed frontend deployment guide, see [`../interface-ui/VERCEL_DEPLOYMENT.md`](../interface-ui/VERCEL_DEPLOYMENT.md)

## 🔒 Privacy Guarantees

### Ride Identity Program
- ✅ **Temporary identities** - Auto-expire after ride completion
- ✅ **Encrypted state** - No public visibility of identity data
- ✅ **Non-transferable** - Identities are bound to specific rides
- ✅ **No permanent records** - Identities are burned after completion

### Proximity Matching Program
- ✅ **Zero-knowledge proofs** - Proves proximity without revealing coordinates
- ✅ **Encrypted locations** - Pickup and driver locations stored in encrypted state
- ✅ **No location trails** - Only boolean result (within range) is public
- ✅ **Privacy-preserving matching** - Enables matching without location exposure

## 📚 References

- [Aleo Developer Documentation](https://developer.aleo.org/)
- [Leo Language Documentation](https://docs.leo-lang.org/leo)
- [Aleo Privacy Model](https://developer.aleo.org/aleo/introduction/privacy/)
- [Zero-Knowledge Proofs Guide](https://developer.aleo.org/aleo/introduction/zkp/)

## 🧪 Example Usage

### Creating a Ride Identity

```leo
// Rider creates a ride request
let ride_id = 12345field;
let rider = aleo1...;
let driver = aleo1...;
let duration = 3600u64; // 1 hour
let timestamp = 1234567890u64;

// Mint temporary identity
let identity = mint_identity(
    rider,
    driver,
    ride_id,
    duration,
    timestamp
);
```

### Proving Proximity

```leo
// Driver proves they are within 2km of pickup
let driver_lat = 37.7749field;  // Private
let driver_lon = -122.4194field; // Private

let proof = prove_proximity(
    ride_id,
    driver_address,
    driver_lat,
    driver_lon,
    timestamp
);

// Proof only reveals: is_within_range = true
// Does NOT reveal: actual distance, coordinates, or location history
```

## 🔄 Integration Flow

1. **Rider creates ride request** → `proximity_matching.create_ride_request()`
2. **Driver proves proximity** → `proximity_matching.prove_proximity()`
3. **System verifies proof** → `proximity_matching.verify_proximity_proof()`
4. **Mint temporary identity** → `ride_identity.mint_identity()`
5. **Ride proceeds** → Identity used for auth, payments, communication
6. **Ride completes** → `ride_identity.complete_ride()` (burns identity)
7. **No trace remains** → Only encrypted state, no permanent records

---

**Built with ❤️ on Aleo**
