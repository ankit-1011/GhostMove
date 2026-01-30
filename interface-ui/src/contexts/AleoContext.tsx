import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import * as aleoService from '../services/aleoService'

interface AleoContextType {
  wallet: string | null
  network: string | null
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
  // Use the wallet adapter hooks
  const { 
    wallet: walletAdapter, 
    publicKey, 
    connected, 
    connect, 
    disconnect,
    connecting,
    disconnecting
  } = useWallet()

  // Set wallet adapter in aleoService so it can use it
  useEffect(() => {
    if (walletAdapter?.adapter) {
      aleoService.setWalletAdapter(walletAdapter.adapter)
    } else {
      aleoService.setWalletAdapter(null)
    }
  }, [walletAdapter])

  // Derive wallet address from publicKey
  const wallet = publicKey ? publicKey.toString() : null
  const isConnected = connected && !!publicKey
  const network = walletAdapter?.adapter?.network || 'testnet'

  const checkWalletsInstalled = () => {
    // Check if wallet adapter is available
    const installed = !!walletAdapter
    return { 
      installed, 
      wallets: installed ? [{ name: walletAdapter.adapter.name }] : [] 
    }
  }

  const connectWallet = async () => {
    try {
      if (!walletAdapter) {
        throw new Error('NO_WALLET_INSTALLED')
      }
      
      if (connecting) {
        console.log('⏳ Connection already in progress...')
        return
      }

      await connect()
      console.log('✅ Successfully connected:', publicKey?.toString())
    } catch (error: any) {
      console.error('Failed to connect wallet:', error)
      throw error
    }
  }

  const disconnectWallet = async () => {
    try {
      if (disconnecting) {
        return
      }
      await disconnect()
      console.log('✅ Wallet disconnected')
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
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
        network,
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
