# Rider Address vs Buyer Wallet Address - Explanation

## ✅ Haan, Ye Alag-Alag Hote Hain!

GhostMove mein **do types ke addresses** hote hain jo **completely different** hain:

## 📍 1. Rider's Delivery Address (GPS Location)

**Kya hai**: Physical location jahan pizza deliver karna hai

**Type**: GPS Coordinates (latitude, longitude)

**Example**:
```
Latitude: 37.7749
Longitude: -122.4194
Location: San Francisco, CA
```

**Kahan store hota hai**:
- `proximity_matching.aleo` program mein
- `pickup_location: Location` struct mein
- Encrypted state mein stored

**Use case**:
- Delivery person ko pata chalta hai kahan deliver karna hai
- Proximity proof ke liye use hota hai
- Physical location hai, payment se related nahi

## 💰 2. Buyer's Wallet Address (Blockchain Address)

**Kya hai**: Aleo blockchain wallet address jo payment aur identity ke liye use hoti hai

**Type**: Aleo Address (blockchain address)

**Example**:
```
aleo1abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

**Kahan store hota hai**:
- `ride_identity.aleo` program mein
- `rider_address: address` field mein
- Encrypted state mein stored

**Use case**:
- Payment ke liye (pizza ka paisa is address se pay hoga)
- Identity minting ke liye (temporary identity is address se linked)
- Authentication ke liye (verify karne ke liye ki ye order is address ka hai)

## 🔍 Comparison

| Feature | Delivery Address (GPS) | Wallet Address (Blockchain) |
|---------|------------------------|----------------------------|
| **Type** | GPS Coordinates | Aleo Blockchain Address |
| **Format** | `37.7749, -122.4194` | `aleo1abc123...` |
| **Purpose** | Physical location | Payment & Identity |
| **Storage** | `proximity_matching.aleo` | `ride_identity.aleo` |
| **Used For** | Delivery location | Payment, Identity, Auth |
| **Privacy** | Encrypted | Encrypted |

## 📊 Technical Implementation

### Delivery Address (GPS)
```leo
// proximity_matching.aleo
struct Location {
    latitude: field,   // 37.7749 → 37774900 (field)
    longitude: field,  // -122.4194 → -122419400 (field)
}

struct RideRequest {
    rider_address: address,        // Wallet address
    pickup_location: Location,      // GPS coordinates
    // ...
}
```

### Wallet Address (Blockchain)
```leo
// ride_identity.aleo
struct RideIdentity {
    rider_address: address,  // aleo1abc123... (wallet address)
    driver_address: address, // aleo1xyz789... (wallet address)
    ride_id: field,
    // ...
}
```

## 🎯 Real-World Example

### Scenario:
**Customer**: Ankit
- **Delivery Address** (GPS): `28.6139, 77.2090` (Delhi, India)
  - Yahan pizza deliver hoga
  - Physical location hai
  
- **Wallet Address** (Blockchain): `aleo1ankit123...`
  - Is address se payment hoga
  - Is address se identity mint hogi
  - Is address se authentication hoga

### Flow:
1. **Order Place**:
   - Customer enters delivery address: `28.6139, 77.2090` (Delhi)
   - Customer's wallet address: `aleo1ankit123...` (automatically from connected wallet)
   - Both stored separately in different programs

2. **Identity Minting**:
   - Uses wallet address: `aleo1ankit123...` (rider_address)
   - Delivery address NOT used for identity

3. **Payment**:
   - Payment from wallet address: `aleo1ankit123...`
   - Delivery address NOT used for payment

4. **Delivery**:
   - Pizza delivered to GPS location: `28.6139, 77.2090`
   - Wallet address NOT needed for delivery

## 🔐 Privacy Implications

### Delivery Address:
- ✅ Encrypted state mein stored
- ✅ Only rider aur matched driver access kar sakte hain
- ✅ Public blockchain par visible nahi
- ✅ Physical location hai, payment se link nahi

### Wallet Address:
- ✅ Encrypted state mein stored
- ✅ Only rider aur matched driver access kar sakte hain
- ✅ Public blockchain par visible nahi
- ✅ Payment aur identity ke liye use hota hai

## 💡 Key Points

1. **Different Types**: GPS coordinates vs Blockchain address
2. **Different Programs**: Stored in different Leo programs
3. **Different Uses**: Physical delivery vs Payment/Identity
4. **Both Encrypted**: Dono encrypted state mein stored
5. **Both Private**: Dono public blockchain par visible nahi

## 📝 Summary

**Haan, ye alag-alag hote hain!**

- **Delivery Address** = Physical location (jahan deliver karna hai)
- **Wallet Address** = Blockchain address (payment aur identity ke liye)

**Example**:
- Delivery: `28.6139, 77.2090` (Delhi)
- Wallet: `aleo1ankit123...` (blockchain address)

**Dono alag-alag purposes ke liye use hote hain aur dono encrypted state mein stored hote hain!**
