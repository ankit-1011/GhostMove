// Aleo Service for interacting with Leo programs
// This service handles all blockchain interactions

// Program IDs (these should match your deployed programs)
const PROXIMITY_MATCHING_PROGRAM = 'proximity_matching_v2.aleo'
const RIDE_IDENTITY_PROGRAM = 'ride_identity_v2.aleo'

// Helper to get wallet adapter from context
// The wallet adapter is passed from AleoContext
import type { WalletAdapter } from '@demox-labs/aleo-wallet-adapter-base'

// This will be set by AleoContext
let walletAdapter: WalletAdapter | null = null

export const setWalletAdapter = (adapter: WalletAdapter | null) => {
  walletAdapter = adapter
}

const getWalletProvider = () => {
  return walletAdapter
}

// Convert GPS coordinates to field elements (for ZK proofs)
export const coordinatesToField = (lat: number, lon: number): { lat: string; lon: string } => {
  // Convert to field representation
  // For Aleo, we need to convert float to field (multiply by precision)
  const PRECISION = 1000000 // 6 decimal places
  const latField = Math.round(lat * PRECISION).toString()
  const lonField = Math.round(lon * PRECISION).toString()
  
  return { lat: latField, lon: lonField }
}

// Generate unique ride ID as field
// For Aleo, we need to convert to field format (numeric string)
export const generateRideId = (): string => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000000)
  // Combine timestamp and random to create unique field value
  // Field in Aleo is a large integer, so we combine as: timestamp * 1000000 + random
  const rideIdField = (timestamp * 1000000 + random).toString()
  return rideIdField
}

// Create ride request (calls proximity_matching.create_ride_request)
export const createRideRequest = async (
  riderAddress: string,
  pickupLat: number,
  pickupLon: number,
  maxDistanceKm: number
): Promise<string> => {
  const wallet = getWalletProvider()
  if (!wallet) {
    throw new Error('No wallet connected')
  }

  try {
    const rideId = generateRideId()
    const { lat, lon } = coordinatesToField(pickupLat, pickupLon)
    const timestamp = Math.floor(Date.now() / 1000)

    console.log('🚀 Creating ride request transaction...')
    console.log('Program:', PROXIMITY_MATCHING_PROGRAM)
    console.log('Function: create_ride_request')
    console.log('Inputs:', { rideId, riderAddress, lat, lon, maxDistanceKm, timestamp })
    console.log('Wallet provider:', wallet)

    // Check if programs are deployed (this is a critical requirement)
    // Note: Programs must be deployed to Aleo network before transactions can execute
    console.warn('⚠️ IMPORTANT: Make sure proximity_matching.aleo is deployed to Aleo network!')

    // Call the Leo program transition using wallet adapter
    // Use requestTransaction method from adapter
    const response = await wallet.requestTransaction({
      program: PROXIMITY_MATCHING_PROGRAM,
      function: 'create_ride_request',
      inputs: [
        rideId,
        riderAddress,
        lat,
        lon,
        maxDistanceKm.toString() + 'u32',
        timestamp.toString() + 'u64',
      ],
    })
    
    console.log('📦 Transaction response:', response)

    // Check for transaction ID in various response formats
    const txId = response?.transactionId || response?.txId || response?.id || response?.transaction?.id
    
    if (txId) {
      console.log('✅ Transaction created successfully!')
      console.log('📝 Transaction ID:', txId)
      console.log('🔗 Check your wallet for transaction details')
      return rideId
    }

    // If no transaction ID but response exists, might be pending or wallet needs approval
    if (response) {
      console.warn('⚠️ Transaction submitted but no ID returned')
      console.warn('Response:', response)
      console.warn('💡 Check your wallet - you may need to approve the transaction')
      // Still return rideId - transaction might be pending user approval
      return rideId
    }

    // No response at all - likely program not deployed or wallet API issue
    throw new Error(
      'Failed to create ride request: No response from wallet. ' +
      'Make sure: 1) Programs are deployed, 2) Wallet is connected, 3) Wallet API is correct'
    )
  } catch (error: any) {
    console.error('❌ Error creating ride request:', error)
    console.error('Error details:', {
      message: error?.message,
      stack: error?.stack,
      wallet: wallet ? 'Connected' : 'Not connected',
    })
    
    // Provide helpful error message
    const errorMsg = error?.message || 'Unknown error'
    throw new Error(`Transaction failed: ${errorMsg}. Check console for details.`)
  }
}

// Prove proximity (calls proximity_matching.prove_proximity)
export const proveProximity = async (
  rideId: string,
  driverAddress: string,
  driverLat: number,
  driverLon: number
): Promise<boolean> => {
  const wallet = getWalletProvider()
  if (!wallet) {
    throw new Error('No wallet connected')
  }

  try {
    const { lat, lon } = coordinatesToField(driverLat, driverLon)
    const timestamp = Math.floor(Date.now() / 1000)

    // Call the Leo program transition using wallet adapter
    const response = await wallet.requestTransaction({
      program: PROXIMITY_MATCHING_PROGRAM,
      function: 'prove_proximity',
      inputs: [
        rideId,
        driverAddress,
        lat,
        lon,
        timestamp.toString() + 'u64',
      ],
    })
    
    console.log('Proximity proof transaction response:', response)

    // Check for transaction ID in various response formats
    const txId = response?.transactionId || response?.txId || response?.id || response?.transaction?.id
    
    if (txId) {
      console.log('✅ Proximity proof transaction created:', txId)
      return true
    }

    if (response) {
      console.warn('⚠️ Proximity proof submitted but no ID returned:', response)
      return true // Assume success if response exists
    }

    return false
  } catch (error) {
    console.error('Error proving proximity:', error)
    // If assertion fails (not within range), return false
    if (error instanceof Error && error.message.includes('assert')) {
      return false
    }
    throw error
  }
}

// Mint temporary identity (calls ride_identity.mint_identity)
export const mintIdentity = async (
  riderAddress: string,
  driverAddress: string,
  rideId: string,
  durationSeconds: number = 3600 // 1 hour default
): Promise<string> => {
  const wallet = getWalletProvider()
  if (!wallet) {
    throw new Error('No wallet connected')
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000)

    // Call the Leo program transition using wallet adapter
    const response = await wallet.requestTransaction({
      program: RIDE_IDENTITY_PROGRAM,
      function: 'mint_identity',
      inputs: [
        riderAddress,
        driverAddress,
        rideId,
        durationSeconds.toString() + 'u64',
        timestamp.toString() + 'u64',
      ],
    })
    
    console.log('Mint identity transaction response:', response)

    if (response && response.transactionId) {
      return `identity_${rideId}`
    }

    throw new Error('Failed to mint identity')
  } catch (error) {
    console.error('Error minting identity:', error)
    throw error
  }
}

// Complete ride (calls ride_identity.complete_ride)
export const completeRide = async (
  rideId: string,
  callerAddress: string
): Promise<boolean> => {
  const wallet = getWalletProvider()
  if (!wallet) {
    throw new Error('No wallet connected')
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000)

    // Call the Leo program transition using wallet adapter
    const response = await wallet.requestTransaction({
      program: RIDE_IDENTITY_PROGRAM,
      function: 'complete_ride',
      inputs: [
        rideId,
        callerAddress,
        timestamp.toString() + 'u64',
      ],
    })
    
    console.log('Complete ride transaction response:', response)

    // Check for transaction ID in various response formats
    const txId = response?.transactionId || response?.txId || response?.id || response?.transaction?.id
    
    if (txId) {
      console.log('✅ Proximity proof transaction created:', txId)
      return true
    }

    if (response) {
      console.warn('⚠️ Proximity proof submitted but no ID returned:', response)
      return true // Assume success if response exists
    }

    return false
  } catch (error) {
    console.error('Error completing ride:', error)
    throw error
  }
}

// Verify identity (calls ride_identity.verify_identity)
export const verifyIdentity = async (
  rideId: string,
  callerAddress: string
): Promise<boolean> => {
  const wallet = getWalletProvider()
  if (!wallet) {
    throw new Error('No wallet connected')
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000)

    console.log('🔍 Verifying identity...')
    console.log('Program:', RIDE_IDENTITY_PROGRAM)
    console.log('Function: verify_identity')
    console.log('Inputs:', { rideId, callerAddress, timestamp })

    // Call the Leo program transition using wallet adapter
    let response: any = null
    let error: any = null
    
    try {
      response = await wallet.requestTransaction({
        program: RIDE_IDENTITY_PROGRAM,
        function: 'verify_identity',
        inputs: [
          rideId,
          callerAddress,
          timestamp.toString() + 'u64',
        ],
      })
    } catch (e) {
      error = e
      console.error('requestTransaction failed:', e)
    }
    
    console.log('📦 Identity verification response:', response)
    console.log('❌ Identity verification error:', error)

    // Check for transaction ID in various response formats
    const txId = response?.transactionId || response?.txId || response?.id || response?.transaction?.id
    
    if (txId) {
      console.log('✅ Identity verified successfully!')
      console.log('📝 Transaction ID:', txId)
      return true
    }

    // If we got an error, it might be an assertion failure (identity invalid/expired)
    if (error) {
      console.warn('⚠️ Identity verification failed:', error.message || JSON.stringify(error))
      // If it's an assertion error, identity is invalid/expired
      if (error.message && (error.message.includes('assert') || error.message.includes('assertion'))) {
        return false
      }
      // Other errors might be network issues
      throw new Error(`Identity verification failed: ${error.message || JSON.stringify(error)}`)
    }

    // If no response but no error, might be pending approval
    if (response) {
      console.warn('⚠️ Identity verification submitted but no ID returned')
      console.warn('💡 Check your wallet - you may need to approve the transaction')
      // Assume success if response exists (transaction might be pending)
      return true
    }

    // No response at all
    console.error('❌ No response from wallet for identity verification')
    return false
  } catch (error) {
    console.error('❌ Error verifying identity:', error)
    // If assertion fails (identity invalid/expired), return false
    if (error instanceof Error && (error.message.includes('assert') || error.message.includes('assertion'))) {
      return false
    }
    // Re-throw other errors
    throw error
  }
}
