// Type definitions for Aleo wallet extensions

interface TransactionRequest {
  program: string
  function: string
  inputs: string[]
}

interface TransactionResponse {
  transactionId?: string
  txId?: string
  id?: string
  transaction?: {
    id?: string
  }
  error?: string
}

interface LeoWallet {
  request: (options: { method: string; params?: any }) => Promise<{ address: string }>
  requestTransaction?: (options: TransactionRequest) => Promise<TransactionResponse>
  execute?: (options: TransactionRequest) => Promise<TransactionResponse>
  isConnected: () => Promise<boolean>
}

interface PuzzleWallet {
  request: (options: { method: string; params?: any }) => Promise<{ address: string }>
  requestTransaction?: (options: TransactionRequest) => Promise<TransactionResponse>
  execute?: (options: TransactionRequest) => Promise<TransactionResponse>
  isConnected: () => Promise<boolean>
}

interface FoxWallet {
  request: (options: { method: string; params?: any }) => Promise<{ address: string }>
  requestTransaction?: (options: TransactionRequest) => Promise<TransactionResponse>
  execute?: (options: TransactionRequest) => Promise<TransactionResponse>
  isConnected: () => Promise<boolean>
}

declare global {
  interface Window {
    leoWallet?: LeoWallet
    puzzle?: PuzzleWallet
    foxwallet?: FoxWallet
  }
}

export {}
