# Leo Program Testnet Deployment Guide

This guide explains how to deploy GhostMove's Leo programs to the Aleo **Testnet** only.

## Prerequisites

1. **Install Leo CLI**
   ```bash
   curl -L https://get.aleo.org/leo | bash
   ```

2. **Install Aleo CLI** (for network interaction)
   ```bash
   curl -L https://get.aleo.org/aleo | bash
   ```

3. **Create Aleo Account** (if you don't have one)
   ```bash
   aleo account new
   ```
   This will generate:
   - Private Key
   - View Key
   - Address
   
   **⚠️ IMPORTANT**: Save your private key securely!

4. **Get Testnet Credits**
   - Visit: https://faucet.aleo.org
   - Enter your Aleo address
   - Request testnet credits (free)

## Deployment Steps

### Step 1: Build the Programs

Before deploying, build each program to ensure there are no compilation errors:

```bash
# Build ride_identity program
cd programs/ride_identity
leo build

# Build proximity_matching program
cd ../proximity_matching
leo build
```

If build succeeds, you'll see:
```
✅ Built 'ride_identity.aleo' (in "/path/to/build")
```

### Step 2: Deploy to Testnet

#### Option A: Deploy using Leo CLI (Recommended)

```bash
# Deploy ride_identity
cd programs/ride_identity
leo deploy --private-key YOUR_PRIVATE_KEY

# Deploy proximity_matching
cd ../proximity_matching
leo deploy --private-key YOUR_PRIVATE_KEY
```

**Note**: By default, `leo deploy` deploys to testnet. No additional flags needed.

#### Option B: Deploy using Aleo CLI

```bash
# Deploy ride_identity
cd programs/ride_identity
aleo program deploy ride_identity.aleo --private-key YOUR_PRIVATE_KEY --endpoint https://api.explorer.aleo.org/v1

# Deploy proximity_matching
cd ../proximity_matching
aleo program deploy proximity_matching.aleo --private-key YOUR_PRIVATE_KEY --endpoint https://api.explorer.aleo.org/v1
```

### Step 3: Get Deployment Transaction IDs

After deployment, you'll receive:
- **Transaction ID**: Unique identifier for the deployment
- **Program ID**: Usually `program_name.aleo` or a unique identifier

Example output:
```
✅ Successfully deployed 'ride_identity.aleo'
📝 Transaction ID: at1abc123...
🔗 Program ID: ride_identity.aleo
```

### Step 4: Verify Deployment

1. **Check on Aleo Explorer**:
   - Visit: https://explorer.aleo.org
   - Search for your transaction ID
   - Verify program is listed

2. **Check Program Status**:
   ```bash
   aleo program list
   ```

3. **Test Program Functions**:
   ```bash
   # Test create_ride_request
   aleo program execute proximity_matching.aleo create_ride_request \
     --private-key YOUR_PRIVATE_KEY \
     --inputs "123field 0u32 0u32 0u32 0u64"
   ```

## Update Frontend with Deployed Program IDs

After deployment, update the frontend service:

**File**: `interface-ui/src/services/aleoService.ts`

```typescript
// Update these with your deployed program IDs
const PROXIMITY_MATCHING_PROGRAM = 'proximity_matching.aleo' // or your actual program ID
const RIDE_IDENTITY_PROGRAM = 'ride_identity.aleo' // or your actual program ID
```

If you got a unique program ID (not just `program_name.aleo`), use that instead.

## Deployment Costs

- **Testnet**: Free (uses testnet credits from faucet)

## Common Issues & Solutions

### Issue 1: "Insufficient credits"
**Solution**: Get more testnet credits from faucet or add credits to your account

### Issue 2: "Program already exists"
**Solution**: Programs are immutable. If you need to update, deploy with a new name or use a different account

### Issue 3: "Build failed"
**Solution**: 
- Check for syntax errors: `leo build`
- Verify all dependencies are correct
- Check Leo version: `leo --version`

### Issue 4: "Network connection error"
**Solution**:
- Check internet connection
- Verify RPC endpoint is correct
- Try different endpoint: `--endpoint https://api.explorer.aleo.org/v1`

## Deployment Checklist

- [ ] Leo CLI installed
- [ ] Aleo CLI installed
- [ ] Aleo account created
- [ ] Testnet credits obtained from faucet
- [ ] Programs build successfully
- [ ] Programs deployed to testnet
- [ ] Deployment verified on explorer
- [ ] Frontend program IDs updated
- [ ] Test transaction executed successfully

## Program Structure

After deployment, your programs will be available at:
- `proximity_matching.aleo` (or your unique ID)
- `ride_identity.aleo` (or your unique ID)

These can be called from:
- Frontend applications
- Other Leo programs
- Aleo CLI
- Wallet extensions

## Next Steps After Deployment

1. **Update Frontend**: Update program IDs in `aleoService.ts`
2. **Test Transactions**: Try creating a ride request from the UI
3. **Monitor**: Check transactions on Aleo Explorer
4. **Document**: Save your deployment transaction IDs

## Resources

- **Aleo Documentation**: https://developer.aleo.org/
- **Leo Language Guide**: https://docs.leo-lang.org/
- **Aleo Explorer**: https://explorer.aleo.org
- **Testnet Faucet**: https://faucet.aleo.org
- **Aleo Discord**: https://discord.aleo.org

## Quick Reference Commands (Testnet)

```bash
# Build program
leo build

# Deploy program to testnet (default)
leo deploy --private-key YOUR_PRIVATE_KEY

# Check testnet account balance
aleo account balance

# List deployed programs on testnet
aleo program list

# Execute program function on testnet
aleo program execute PROGRAM_NAME FUNCTION_NAME \
  --private-key YOUR_PRIVATE_KEY \
  --inputs "input1 input2 ..."

# View transaction on testnet
aleo transaction view TRANSACTION_ID
```

**Note**: All commands above work on testnet by default. No need to specify `--network testnet` explicitly.

---

**Need Help?** Check the troubleshooting section or visit Aleo Discord for community support.
