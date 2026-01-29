// Wallet detection utility for Aleo wallets

export interface WalletInfo {
  name: string
  id: string
  icon: string
  installed: boolean
  downloadUrl: string
}

export const detectWallets = (): WalletInfo[] => {
  if (typeof window === 'undefined') {
    return []
  }

  const wallets: WalletInfo[] = [
    {
      name: 'Leo Wallet',
      id: 'leo',
      icon: 'fa-wallet',
      installed: !!(window as any).leoWallet,
      downloadUrl: 'https://www.leo.app/',
    },
    {
      name: 'Puzzle Wallet',
      id: 'puzzle',
      icon: 'fa-puzzle-piece',
      installed: !!(window as any).puzzle,
      downloadUrl: 'https://puzzle.online/',
    },
    {
      name: 'Fox Wallet',
      id: 'fox',
      icon: 'fa-firefox',
      installed: !!(window as any).foxwallet,
      downloadUrl: 'https://foxwallet.com/',
    },
  ]

  return wallets
}

export const getInstalledWallets = (): WalletInfo[] => {
  return detectWallets().filter((wallet) => wallet.installed)
}

export const hasAnyWalletInstalled = (): boolean => {
  return getInstalledWallets().length > 0
}

export const getWalletDownloadLinks = (): WalletInfo[] => {
  return detectWallets().filter((wallet) => !wallet.installed)
}
