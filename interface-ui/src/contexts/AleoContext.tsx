import { createContext, useContext, useState, ReactNode } from 'react'

interface AleoContextType {
  wallet: string | null
  isConnected: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  createRideRequest: (data: RideRequestData) => Promise<string>
  proveProximity: (rideId: string, location: LocationData) => Promise<boolean>
  mintIdentity: (rideId: string, driverAddress: string) => Promise<string>
  completeRide: (rideId: string) => Promise<boolean>
}

interface RideRequestData {
  pickupLat: number
  pickupLon: number
  maxDistanceKm: number
}

interface LocationData {
  lat: number
  lon: number
}

const AleoContext = createContext<AleoContextType | undefined>(undefined)

export const AleoProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const connectWallet = async () => {
    // TODO: Integrate with Aleo wallet (Leo Wallet, etc.)
    // For now, using mock connection
    const mockAddress = 'aleo1' + Math.random().toString(36).substring(2, 15)
    setWallet(mockAddress)
    setIsConnected(true)
  }

  const disconnectWallet = () => {
    setWallet(null)
    setIsConnected(false)
  }

  const createRideRequest = async (data: RideRequestData): Promise<string> => {
    // TODO: Call proximity_matching.create_ride_request
    // For now, return mock ride ID
    const rideId = 'ride_' + Date.now().toString()
    console.log('Creating ride request:', data)
    return rideId
  }

  const proveProximity = async (rideId: string, location: LocationData): Promise<boolean> => {
    // TODO: Call proximity_matching.prove_proximity
    console.log('Proving proximity for ride:', rideId, location)
    return true
  }

  const mintIdentity = async (rideId: string, driverAddress: string): Promise<string> => {
    // TODO: Call ride_identity.mint_identity
    console.log('Minting identity for ride:', rideId)
    return 'identity_' + Date.now().toString()
  }

  const completeRide = async (rideId: string): Promise<boolean> => {
    // TODO: Call ride_identity.complete_ride
    console.log('Completing ride:', rideId)
    return true
  }

  return (
    <AleoContext.Provider
      value={{
        wallet,
        isConnected,
        connectWallet,
        disconnectWallet,
        createRideRequest,
        proveProximity,
        mintIdentity,
        completeRide,
      }}
    >
      {children}
    </AleoContext.Provider>
  )
}

export const useAleo = () => {
  const context = useContext(AleoContext)
  if (context === undefined) {
    throw new Error('useAleo must be used within an AleoProvider')
  }
  return context
}
