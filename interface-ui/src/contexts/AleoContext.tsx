import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { hasAnyWalletInstalled, getInstalledWallets } from '../utils/walletDetection'
import * as aleoService from '../services/aleoService'

interface AleoContextType {
  wallet: string | null
  isConnected: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  createRideRequest: (data: RideRequestData) => Promise<string>
  proveProximity: (rideId: string, location: LocationData) => Promise<boolean>
  mintIdentity: (rideId: string, riderAddress: string, driverAddress: string) => Promise<string>
  verifyIdentity: (rideId: string) => Promise<boolean>
  completeRide: (rideId: string) => Promise<boolean>
  checkWalletsInstalled: () => { installed: boolean; wallets: any[] }
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

  const checkWalletsInstalled = () => {
    const installed = hasAnyWalletInstalled()
    const wallets = getInstalledWallets()
    return { installed, wallets }
  }

  const connectWallet = async () => {
    // Check if any wallet is installed
    if (!hasAnyWalletInstalled()) {
      throw new Error('NO_WALLET_INSTALLED')
    }
    
    // Try to connect to Leo Wallet first (preferred)
    if ((window as any).leoWallet) {
      try {
        // Request connection from Leo Wallet
        const response = await (window as any).leoWallet.request({
          method: 'connect',
        })
        if (response && response.address) {
          setWallet(response.address)
          setIsConnected(true)
          return
        }
      } catch (error) {
        console.error('Leo Wallet connection error:', error)
      }
    }

    // Try Puzzle Wallet
    if ((window as any).puzzle) {
      try {
        const response = await (window as any).puzzle.request({
          method: 'connect',
        })
        if (response && response.address) {
          setWallet(response.address)
          setIsConnected(true)
          return
        }
      } catch (error) {
        console.error('Puzzle Wallet connection error:', error)
      }
    }

    // Try Fox Wallet
    if ((window as any).foxwallet) {
      try {
        const response = await (window as any).foxwallet.request({
          method: 'connect',
        })
        if (response && response.address) {
          setWallet(response.address)
          setIsConnected(true)
          return
        }
      } catch (error) {
        console.error('Fox Wallet connection error:', error)
      }
    }

    // Fallback to mock connection for development
    const mockAddress = 'aleo1' + Math.random().toString(36).substring(2, 15)
    setWallet(mockAddress)
    setIsConnected(true)
  }

  const disconnectWallet = () => {
    setWallet(null)
    setIsConnected(false)
  }

  const createRideRequest = async (data: RideRequestData): Promise<string> => {
    if (!wallet) {
      throw new Error('Wallet not connected')
    }
    
    try {
      // Call the actual Leo program
      const rideId = await aleoService.createRideRequest(
        wallet, // riderAddress
        data.pickupLat,
        data.pickupLon,
        data.maxDistanceKm
      )
      return rideId
    } catch (error) {
      console.error('Failed to create ride request:', error)
      // Fallback to mock for development/testing
      console.warn('Using mock ride ID for development')
      return 'ride_' + Date.now().toString()
    }
  }

  const proveProximity = async (rideId: string, location: LocationData): Promise<boolean> => {
    if (!wallet) {
      throw new Error('Wallet not connected')
    }
    
    try {
      // Call the actual Leo program
      return await aleoService.proveProximity(
        rideId,
        wallet, // driverAddress
        location.lat,
        location.lon
      )
    } catch (error) {
      console.error('Failed to prove proximity:', error)
      // Fallback to mock for development/testing
      console.warn('Using mock proximity proof for development')
      return true
    }
  }

  const mintIdentity = async (rideId: string, riderAddress: string, driverAddress: string): Promise<string> => {
    if (!wallet) {
      throw new Error('Wallet not connected')
    }
    
    try {
      // Call the actual Leo program
      // riderAddress: address of the customer who placed the order
      // driverAddress: address of the delivery person (current wallet)
      return await aleoService.mintIdentity(
        riderAddress,
        driverAddress || wallet,
        rideId
      )
    } catch (error) {
      console.error('Failed to mint identity:', error)
      // Fallback to mock for development/testing
      console.warn('Using mock identity for development')
      return 'identity_' + Date.now().toString()
    }
  }

  const verifyIdentity = async (rideId: string): Promise<boolean> => {
    if (!wallet) {
      throw new Error('Wallet not connected')
    }
    
    try {
      // Call the actual Leo program to verify identity
      return await aleoService.verifyIdentity(rideId, wallet)
    } catch (error) {
      console.error('Failed to verify identity:', error)
      // If verification fails, return false
      return false
    }
  }

  const completeRide = async (rideId: string): Promise<boolean> => {
    if (!wallet) {
      throw new Error('Wallet not connected')
    }
    
    try {
      // Call the actual Leo program
      return await aleoService.completeRide(rideId, wallet)
    } catch (error) {
      console.error('Failed to complete ride:', error)
      // Fallback to mock for development/testing
      console.warn('Using mock completion for development')
      return true
    }
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
        verifyIdentity,
        completeRide,
        checkWalletsInstalled,
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
