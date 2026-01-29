# Transaction Troubleshooting Guide

## Problem: No Transactions Showing in Wallet

If you're connected to a wallet but don't see any transactions, here are the common causes and solutions:

### 1. **Programs Not Deployed** ⚠️ (Most Common)

**Issue**: Leo programs must be deployed to Aleo network before transactions can execute.

**Solution**:
```bash
# Deploy proximity_matching program
cd programs/proximity_matching
leo deploy

# Deploy ride_identity program  
cd ../ride_identity
leo deploy
```

**How to Check**: Open browser console (F12) - you'll see warnings if programs aren't deployed.

---

### 2. **Wallet API Format**

Different wallets use different API formats. The service tries multiple formats:

- `wallet.requestTransaction()` - Leo Wallet standard
- `wallet.execute()` - Alternative format
- `wallet.request({ method: 'execute' })` - Fallback

**Check Console**: Look for which method is being used.

---

### 3. **Wallet Not Properly Connected**

**Symptoms**:
- Wallet shows as connected but transactions fail
- No transaction popup appears

**Solution**:
1. Disconnect and reconnect wallet
2. Check wallet extension is enabled
3. Verify wallet is on correct network (testnet/mainnet)

---

### 4. **Transaction Requires Approval**

**Symptoms**:
- Transaction submitted but no ID returned
- Wallet popup appears but transaction pending

**Solution**:
- Check wallet extension for pending transactions
- Approve/reject transaction in wallet UI
- Transaction ID appears after approval

---

### 5. **Program ID Mismatch**

**Issue**: Program IDs in code don't match deployed programs.

**Check**: `src/services/aleoService.ts`
```typescript
const PROXIMITY_MATCHING_PROGRAM = 'proximity_matching.aleo' // Update with deployed ID
const RIDE_IDENTITY_PROGRAM = 'ride_identity.aleo' // Update with deployed ID
```

**Solution**: Update program IDs after deployment.

---

### 6. **Network/RPC Issues**

**Symptoms**:
- Transactions timeout
- Network errors in console

**Solution**:
- Check internet connection
- Verify Aleo RPC endpoint is accessible
- Try switching networks (testnet/mainnet)

---

## Debugging Steps

### Step 1: Check Browser Console
Open Developer Tools (F12) → Console tab
- Look for transaction logs (🚀, ✅, ❌ emojis)
- Check for error messages
- Verify wallet connection status

### Step 2: Check Wallet Extension
- Open wallet extension
- Check transaction history
- Look for pending transactions
- Verify network connection

### Step 3: Verify Program Deployment
```bash
# Check if programs are deployed
leo program list

# Or check on Aleo explorer
# https://explorer.aleo.org
```

### Step 4: Test Wallet Connection
```javascript
// In browser console
console.log('Leo Wallet:', window.leoWallet)
console.log('Puzzle:', window.puzzle)
console.log('Fox Wallet:', window.foxwallet)
```

---

## Expected Console Output

When transaction works correctly, you should see:

```
🚀 Creating ride request transaction...
Program: proximity_matching.aleo
Function: create_ride_request
Inputs: { rideId: "...", riderAddress: "...", ... }
Wallet provider: [object Object]
Using requestTransaction method...
📦 Transaction response: { transactionId: "..." }
✅ Transaction created successfully!
📝 Transaction ID: at1...
🔗 Check your wallet for transaction details
```

---

## Common Error Messages

### "No wallet connected"
- **Cause**: Wallet not detected
- **Fix**: Install and connect wallet

### "Transaction failed: Program not found"
- **Cause**: Program not deployed
- **Fix**: Deploy program first

### "Transaction failed: Insufficient credits"
- **Cause**: Wallet has no Aleo credits
- **Fix**: Get testnet credits from faucet

### "No response from wallet"
- **Cause**: Wallet API issue or program not deployed
- **Fix**: Check wallet connection and program deployment

---

## Testing Without Deployment

For development/testing, the service falls back to mock mode:
- Mock ride IDs are generated
- Console shows warnings
- No actual blockchain transactions

To enable real transactions:
1. Deploy programs
2. Update program IDs
3. Connect real wallet
4. Have Aleo credits in wallet

---

## Getting Help

If issues persist:
1. Check browser console for detailed error logs
2. Verify wallet extension is latest version
3. Check Aleo network status
4. Review program deployment logs
5. Test with different wallet (Leo/Puzzle/Fox)
