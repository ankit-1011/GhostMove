# GhostMove UI Integration Guide

## ✅ Completed Integration

The UI has been successfully integrated with Aleo program structure. All necessary components are created and ready for Aleo SDK connection.

## 📁 Components Created

### 1. **AleoContext** (`src/contexts/AleoContext.tsx`)
- Provides wallet connection state
- Functions for interacting with Aleo programs:
  - `createRideRequest` - Calls `proximity_matching.create_ride_request`
  - `proveProximity` - Calls `proximity_matching.prove_proximity`
  - `mintIdentity` - Calls `ride_identity.mint_identity`
  - `completeRide` - Calls `ride_identity.complete_ride`

### 2. **WalletConnection** (`src/components/WalletConnection.tsx`)
- Connect/disconnect Aleo wallet
- Display connected wallet address
- Ready for Leo Wallet integration

### 3. **RideRequest** (`src/components/RideRequest.tsx`)
- Create encrypted ride requests
- Enter pickup location (manual or GPS)
- Set maximum distance for drivers
- Calls `proximity_matching.create_ride_request`

### 4. **DriverDashboard** (`src/components/DriverDashboard.tsx`)
- Prove proximity without revealing location
- Enter ride ID and driver location
- Generate ZK proximity proof
- Mint temporary identity after proof
- Calls `proximity_matching.prove_proximity` and `ride_identity.mint_identity`

### 5. **RideManagement** (`src/components/RideManagement.tsx`)
- View active rides
- See ride status and details
- Complete rides and burn identities
- Calls `ride_identity.complete_ride`

### 6. **Dashboard** (`src/components/Dashboard.tsx`)
- Main dashboard with tabs for Rider/Driver/Rides
- Integrates all components
- Wallet connection header

## 🔌 Next Steps: Connect to Aleo SDK

### Option 1: Using Provable SDK (Recommended)

```bash
npm install @aleo/provable-sdk
```

Then update `AleoContext.tsx`:

```typescript
import { AleoProvider as ProvableAleoProvider } from '@aleo/provable-sdk'

// In createRideRequest:
const program = 'proximity_matching.aleo'
const functionName = 'create_ride_request'
const inputs = [rideId, riderAddress, pickupLat, pickupLon, maxDistance, timestamp]

const result = await ProvableAleoProvider.execute(program, functionName, inputs)
```

### Option 2: Using Leo SDK

```bash
npm install @aleo/leo-sdk
```

### Option 3: Direct Aleo RPC Calls

```typescript
// For testnet
const ALEO_RPC = 'https://api.explorer.aleo.org/v1/testnet3'

// Execute program
const response = await fetch(`${ALEO_RPC}/program/execute`, {
  method: 'POST',
  body: JSON.stringify({
    program_id: 'proximity_matching.aleo',
    function: 'create_ride_request',
    inputs: [...]
  })
})
```

## 🔑 Wallet Integration

### Leo Wallet Integration

```typescript
// Check if Leo Wallet is installed
if (window.leoWallet) {
  // Request connection
  const account = await window.leoWallet.requestAccount()
  setWallet(account.address)
}

// Sign and send transaction
const transaction = await window.leoWallet.requestTransaction({
  program: 'proximity_matching.aleo',
  function: 'create_ride_request',
  inputs: [...]
})
```

## 📝 Program Function Mappings

### proximity_matching.aleo

| UI Function | Leo Function | Parameters |
|------------|--------------|------------|
| `createRideRequest` | `create_ride_request` | ride_id, rider_address, pickup_lat, pickup_lon, max_distance_km, timestamp |
| `proveProximity` | `prove_proximity` | ride_id, driver_address, driver_lat, driver_lon, timestamp |
| `verifyProximityProof` | `verify_proximity_proof` | ride_id |

### ride_identity.aleo

| UI Function | Leo Function | Parameters |
|------------|--------------|------------|
| `mintIdentity` | `mint_identity` | rider_address, driver_address, ride_id, duration_seconds, timestamp |
| `verifyIdentity` | `verify_identity` | ride_id, caller_address, current_timestamp |
| `completeRide` | `complete_ride` | ride_id, caller_address, current_timestamp |

## 🎨 UI Features

✅ **Wallet Connection** - Connect/disconnect Aleo wallet  
✅ **Ride Request Form** - Create encrypted ride requests  
✅ **Driver Proximity Proof** - Prove proximity without revealing location  
✅ **Identity Management** - View and manage temporary identities  
✅ **Ride Completion** - Complete rides and burn identities  
✅ **Responsive Design** - Works on mobile and desktop  
✅ **Glass Morphism UI** - Modern, privacy-focused design  

## 🚀 Testing

1. **Start Dev Server**
   ```bash
   cd interface-ui
   npm run dev
   ```

2. **Test Components**
   - Navigate to dashboard
   - Connect wallet (mock for now)
   - Create ride request
   - Switch to driver mode
   - Prove proximity
   - Complete ride

## 📚 Resources

- [Aleo Developer Docs](https://developer.aleo.org/)
- [Provable SDK](https://developer.aleo.org/provable/getting_started/)
- [Leo Wallet](https://www.leowallet.app/)

---

**The UI is ready! Just connect the Aleo SDK functions to complete the integration.**
