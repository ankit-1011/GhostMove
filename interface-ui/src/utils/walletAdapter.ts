// Aleo Wallet Adapter - Single source of truth for wallet connections
// Supports: Leo Wallet, Puzzle Wallet, Fox Wallet
// IMPORTANT: Must run in real browser tab (not iframe/embed)

export const getAleoWallet = () => {
  const w = window as any

  // Priority: Leo > Puzzle > Fox
  if (w.leoWallet) return w.leoWallet
  if (w.puzzle) return w.puzzle
  if (w.foxwallet) return w.foxwallet

  return null
}

/**
 * Check if Leo Wallet is injected (even if not initialized)
 */
export const checkWalletInjected = () => {
  const w = window as any
  const wallet = w.leoWallet
  
  if (!wallet) {
    return {
      injected: false,
      message: 'Leo Wallet extension not detected. Make sure extension is installed and enabled.',
      diagnostics: {
        leoWallet: false,
        puzzle: !!w.puzzle,
        foxwallet: !!w.foxwallet,
        solana: !!w.solana,
        isIframe: w.self !== w.top,
        origin: w.location?.origin,
      }
    }
  }
  
  return {
    injected: true,
    wallet: wallet,
    initialized: wallet.publicKey !== undefined || wallet.permission !== undefined,
    diagnostics: {
      publicKey: wallet.publicKey,
      permission: wallet.permission,
      network: wallet.network,
      appName: wallet.appName,
      hasRequest: typeof wallet.request === 'function',
      hasConnect: typeof wallet.connect === 'function',
      hasPermission: typeof wallet.permission === 'function',
    }
  }
}

/**
 * Wait for Leo Wallet to be properly injected and initialized
 * Polls until wallet properties are available
 */
export const waitForLeo = async (timeout = 5000) => {
  const start = Date.now()
  console.log('⏳ Waiting for Leo Wallet injection...')
  
  // First check if wallet object exists at all
  while (Date.now() - start < timeout) {
    const w = (window as any).leoWallet
    if (w) {
      console.log('✅ Leo Wallet object found')
      
      // Check if initialized (has publicKey or permission)
      if (w.publicKey !== undefined || w.permission !== undefined) {
        console.log('✅ Leo Wallet injected and initialized')
        console.log('- publicKey:', w.publicKey)
        console.log('- permission:', w.permission)
        return w
      }
    }
    await new Promise((r) => setTimeout(r, 100))
  }
  
  // Diagnostic check
  const check = checkWalletInjected()
  if (!check.injected) {
    console.error('❌ Leo Wallet not injected')
    console.error('Diagnostics:', check.diagnostics)
    throw new Error(
      'Leo Wallet extension not detected.\n\n' +
      'Please verify:\n' +
      '1. Leo Wallet is installed (chrome://extensions/)\n' +
      '2. Extension is ENABLED (toggle should be ON)\n' +
      '3. Using Chrome Stable (not Edge/Brave/Arc)\n' +
      '4. Using clean profile (chrome://settings → Profiles → Add)\n' +
      '5. Only Leo Wallet installed (disable other wallets)\n' +
      '6. Open: http://localhost:5173 (not 127.0.0.1)\n' +
      '7. Hard refresh: Ctrl+Shift+R\n\n' +
      'Test in console: window.leoWallet'
    )
  }
  
  if (check.injected && !check.initialized) {
    console.warn('⚠️ Leo Wallet injected but not initialized')
    console.warn('Diagnostics:', check.diagnostics)
    throw new Error(
      'Leo Wallet is installed but not initialized.\n\n' +
      'Please:\n' +
      '1. Click Leo Wallet extension icon\n' +
      '2. Unlock the wallet (enter password)\n' +
      '3. Select an account\n' +
      '4. Set network (Testnet/Mainnet)\n' +
      '5. Keep extension window open\n' +
      '6. Refresh this page and try again'
    )
  }
  
  return null
}

export const connectAleoWallet = async () => {
  const w = window as any

  // Check if running in iframe (Leo Wallet doesn't work in iframes)
  if (w.self !== w.top) {
    throw new Error(
      'Leo Wallet does not work in iframes.\n\n' +
      'Please open this site in a real browser tab:\n' +
      'http://localhost:5173'
    )
  }

  // Get wallet object
  const wallet = w.leoWallet
  if (!wallet) {
    throw new Error(
      'Leo Wallet not installed.\n\n' +
      'Please:\n' +
      '1. Install Leo Wallet extension\n' +
      '2. Refresh this page\n' +
      '3. Make sure extension is enabled (chrome://extensions/)'
    )
  }

  console.log('✅ Leo Wallet object found')
  console.log('Initial state:')
  console.log('- publicKey:', wallet.publicKey)
  console.log('- permission:', wallet.permission)
  console.log('- network:', wallet.network)
  console.log('- hasConnect:', typeof wallet.connect === 'function')
  console.log('- hasRequest:', typeof wallet.request === 'function')

  // If wallet already has publicKey, use it immediately
  if (wallet.publicKey !== undefined && wallet.publicKey !== null) {
    console.log('✅ Wallet already connected!')
    let address: string
    if (typeof wallet.publicKey === 'string') {
      address = wallet.publicKey
    } else if (wallet.publicKey && typeof wallet.publicKey.toString === 'function') {
      address = wallet.publicKey.toString()
    } else {
      address = String(wallet.publicKey)
    }
    
    if (address && address.startsWith('aleo')) {
      console.log('✅ Connected! Address:', address)
      return address
    }
  }

  // Try to trigger wallet initialization with connect() call
  // Wait for it to complete, then poll
  if (typeof wallet.connect === 'function' && !wallet.publicKey) {
    console.log('📞 Calling connect() to initialize wallet...')
    try {
      // Actually wait for connect() to complete
      await wallet.connect()
      console.log('✅ Connect() completed')
      // Wait a moment for properties to populate
      await new Promise((r) => setTimeout(r, 1000))
    } catch (e: any) {
      // If user rejects, that's OK - we'll poll anyway
      if (e?.message?.includes('reject') || e?.message?.includes('denied')) {
        console.log('⚠️ Connection rejected by user')
      } else {
        console.log('⚠️ Connect() error (will continue polling):', e?.message || 'No error message')
      }
    }
  }

  // 🔁 POLLING APPROACH (Production Safe)
  // Poll for publicKey - wallet should populate after connect() or user approval
  console.log('⏳ Waiting for wallet connection...')
  console.log('💡 Make sure:')
  console.log('   1. Leo Wallet extension is unlocked')
  console.log('   2. Account is selected')
  console.log('   3. Network is set')
  console.log('   4. This site is approved (Settings → Connected Sites)')
  
  // Wait for wallet to be ready (poll for publicKey)
  // Check more frequently and for longer
  for (let i = 0; i < 60; i++) { // 60 attempts = 18 seconds total
    // Check if wallet is connected (publicKey available)
    if (wallet.publicKey !== undefined && wallet.publicKey !== null) {
      console.log(`✅ Wallet connected after ${i + 1} attempts`)
      console.log('publicKey:', wallet.publicKey)
      
      // Extract address from publicKey
      let address: string
      
      try {
        if (typeof wallet.publicKey === 'string') {
          address = wallet.publicKey
        } else if (wallet.publicKey && typeof wallet.publicKey.toString === 'function') {
          address = wallet.publicKey.toString()
        } else {
          address = String(wallet.publicKey)
        }
        
        if (address && address.startsWith('aleo')) {
          console.log('✅ Connected! Address:', address)
          return address
        } else {
          throw new Error(`Invalid address format: ${address}`)
        }
      } catch (e) {
        console.error('❌ Error extracting address:', e)
        throw new Error('Failed to extract address from wallet')
      }
    }
    
    // Also check permission - sometimes it populates before publicKey
    if (wallet.permission === true && i > 10) {
      console.log('⚠️ Permission granted but publicKey not available yet')
      console.log('Waiting a bit more for publicKey...')
    }
    
    // Log progress every 10 attempts
    if (i > 0 && i % 10 === 0) {
      console.log(`⏳ Still waiting... (${i}/60 attempts)`)
      console.log('Current state:', {
        publicKey: wallet.publicKey,
        permission: wallet.permission,
        network: wallet.network,
      })
    }
    
    // Wait 300ms between checks
    await new Promise((r) => setTimeout(r, 300))
  }

  // If we get here, wallet is not connected
  console.error('❌ Wallet not connected after polling')
  console.error('Final state:', {
    publicKey: wallet.publicKey,
    permission: wallet.permission,
    network: wallet.network,
    hasRequest: typeof wallet.request === 'function',
    hasConnect: typeof wallet.connect === 'function',
  })
  
  // Provide detailed troubleshooting
  console.error('🔍 Troubleshooting steps:')
  console.error('1. Open browser console (F12)')
  console.error('2. Type: window.leoWallet.publicKey')
  console.error('3. If undefined, wallet is not initialized')
  console.error('4. Try: window.leoWallet.connect() manually')
  console.error('5. Then check: window.leoWallet.publicKey again')
  
  // Check if wallet has permission but no publicKey (edge case)
  if (wallet.permission === true && !wallet.publicKey) {
    throw new Error(
      'Wallet has permission but publicKey not available.\n\n' +
      'This is a known Leo Wallet bug.\n\n' +
      'Try this:\n' +
      '1. Open browser console (F12)\n' +
      '2. Type: window.leoWallet.connect()\n' +
      '3. Wait a moment\n' +
      '4. Type: window.leoWallet.publicKey\n' +
      '5. If address appears, refresh page and connect again\n\n' +
      'Or:\n' +
      '- Close and reopen Leo Wallet extension\n' +
      '- Restart browser completely\n' +
      '- Use different Chrome profile'
    )
  }
  
  // Final error with manual workaround
  const manualWorkaround = confirm(
    'Wallet not connecting automatically.\n\n' +
    'Try MANUAL connection:\n\n' +
    '1. Open browser console (F12)\n' +
    '2. Type: window.leoWallet.connect()\n' +
    '3. Approve if popup appears\n' +
    '4. Wait 2 seconds\n' +
    '5. Type: window.leoWallet.publicKey\n' +
    '6. If address shows, click OK here\n' +
    '7. Then refresh page and connect again\n\n' +
    'Click OK if you want to try manual connection,\n' +
    'or Cancel to see more troubleshooting steps.'
  )
  
  if (manualWorkaround) {
    // Give user time to do manual steps
    throw new Error(
      'Manual connection attempt.\n\n' +
      'Please:\n' +
      '1. Open console (F12)\n' +
      '2. Run: window.leoWallet.connect()\n' +
      '3. Check: window.leoWallet.publicKey\n' +
      '4. If address appears, refresh page\n' +
      '5. Try connecting again'
    )
  }
  
  throw new Error(
    'Wallet not connected.\n\n' +
    'This is a known Leo Wallet extension bug where properties don\'t populate.\n\n' +
    'SOLUTIONS:\n\n' +
    'Option 1 - Manual Connection:\n' +
    '1. Open console (F12)\n' +
    '2. Type: window.leoWallet.connect()\n' +
    '3. Approve connection\n' +
    '4. Check: window.leoWallet.publicKey\n' +
    '5. Refresh page if address appears\n\n' +
    'Option 2 - Extension Reset:\n' +
    '1. Go to chrome://extensions/\n' +
    '2. Find Leo Wallet\n' +
    '3. Click "Reload" (circular arrow)\n' +
    '4. Unlock wallet again\n' +
    '5. Refresh this page\n\n' +
    'Option 3 - Browser Restart:\n' +
    '1. Close all Chrome windows\n' +
    '2. Reopen Chrome\n' +
    '3. Unlock Leo Wallet\n' +
    '4. Try connecting again\n\n' +
    'Option 4 - Clean Profile:\n' +
    '1. chrome://settings → Profiles → Add\n' +
    '2. Install ONLY Leo Wallet\n' +
    '3. Try connecting'
  )
}
