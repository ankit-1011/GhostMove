# Frontend-Backend Integration Guide

## Leo Programs Integration

GhostMove frontend integrates with two Leo smart contract programs:

1. **`proximity_matching.aleo`** - Zero-knowledge proximity proofs
2. **`ride_identity.aleo`** - Temporary identity tokens

## Integration Status

✅ **Service Layer Created**: `src/services/aleoService.ts`
✅ **Context Integration**: `src/contexts/AleoContext.tsx` updated
⚠️ **Wallet API**: Currently uses wallet provider APIs (Leo/Puzzle/Fox)
⚠️ **Program Deployment**: Programs need to be deployed to Aleo network

## How It Works

### 1. Wallet Connection
- User connects wallet (Leo/Puzzle/Fox)
- Wallet address is stored in context
- All transactions use connected wallet

### 2. Creating Ride Request
```typescript
// Frontend calls:
createRideRequest({
  pickupLat: 37.7749,
  pickupLon: -122.4194,
  maxDistanceKm: 5
})

// Service calls Leo program:
proximity_matching.aleo/create_ride_request(
  ride_id: field,
  rider_address: address,
  pickup_latitude: field,
  pickup_longitude: field,
  max_distance_km: u32,
  timestamp: u64
)
```

### 3. Proving Proximity
```typescript
// Frontend calls:
proveProximity(rideId, {
  lat: 37.7750,
  lon: -122.4195
})

// Service calls Leo program:
proximity_matching.aleo/prove_proximity(
  ride_id: field,
  driver_address: address,
  driver_latitude: field,
  driver_longitude: field,
  timestamp: u64
)
```

### 4. Minting Identity
```typescript
// Frontend calls:
mintIdentity(rideId, driverAddress)

// Service calls Leo program:
ride_identity.aleo/mint_identity(
  rider_address: address,
  driver_address: address,
  ride_id: field,
  duration_seconds: u64,
  timestamp: u64
)
```

### 5. Completing Ride
```typescript
// Frontend calls:
completeRide(rideId)

// Service calls Leo program:
ride_identity.aleo/complete_ride(
  ride_id: field,
  caller_address: address,
  current_timestamp: u64
)
```

## Data Conversion

### GPS Coordinates to Field Elements
```typescript
// Latitude/Longitude (float) → Field (integer)
const PRECISION = 1000000 // 6 decimal places
const latField = Math.round(lat * PRECISION).toString()
const lonField = Math.round(lon * PRECISION).toString()
```

### Ride ID Generation
```typescript
// Generates unique ride ID as field
const rideId = `${timestamp}_${random}`
```

## Wallet Provider APIs

The service supports multiple wallet providers:

- **Leo Wallet**: `window.leoWallet`
- **Puzzle Wallet**: `window.puzzle`
- **Fox Wallet**: `window.foxwallet`

All wallets use similar API:
```typescript
await wallet.request({
  method: 'execute',
  program: 'program_name.aleo',
  function: 'function_name',
  inputs: [...]
})
```

## Development Mode

If wallet is not connected or programs are not deployed, the service falls back to mock responses for development/testing:

- Mock ride IDs
- Mock proximity proofs (always returns true)
- Mock identity minting
- Console warnings indicate mock mode

## Production Deployment

To enable full integration:

1. **Deploy Leo Programs**:
   ```bash
   cd programs/ride_identity
   leo deploy
   
   cd ../proximity_matching
   leo deploy
   ```

2. **Update Program IDs** in `aleoService.ts`:
   ```typescript
   const PROXIMITY_MATCHING_PROGRAM = 'your_deployed_program_id.aleo'
   const RIDE_IDENTITY_PROGRAM = 'your_deployed_program_id.aleo'
   ```

3. **Test with Real Wallet**:
   - Install Leo Wallet extension
   - Connect to Aleo testnet/mainnet
   - Test all functions

## Error Handling

- **No Wallet**: Throws `'No wallet connected'`
- **Program Error**: Catches and logs, falls back to mock
- **Assertion Failure**: Returns `false` for proximity proofs
- **Network Error**: Logs error, user sees alert

## Next Steps

- [ ] Deploy programs to Aleo testnet
- [ ] Test with real wallet transactions
- [ ] Add transaction status tracking
- [ ] Implement retry logic for failed transactions
- [ ] Add transaction history UI
- [ ] Optimize field conversions for accuracy
