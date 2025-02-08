import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
  address: string | null;
  isConnecting: boolean;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  fetchWalletAddress: () => Promise<void>;
}

export const useWallet = create<WalletState>()(
  persist(
    (set, get) => ({
      address: null,
      isConnecting: false,
      error: null,

      connectWallet: async () => {
        try {
          set({ isConnecting: true, error: null });
          
          const tg = window.Telegram?.WebApp;
          if (!tg) {
            throw new Error('Telegram WebApp is not available');
          }

          // Open Telegram Wallet using the correct deep link
          window.location.href = 'https://t.me/twallet?start=connect';

          // Wait for wallet connection response
          // Note: In a real implementation, you would handle the callback from Telegram
          const walletAddress = await new Promise<string>((resolve) => {
            // Simulated wallet connection response
            setTimeout(() => {
              resolve('0x' + Math.random().toString(16).slice(2, 42));
            }, 1000);
          });

          // Send wallet address to server
          const response = await fetch('/connect-wallet', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wallet_address: walletAddress }),
          });

          if (!response.ok) {
            throw new Error('Failed to connect wallet');
          }

          set({ address: walletAddress });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to connect wallet' });
          throw error;
        } finally {
          set({ isConnecting: false });
        }
      },

      disconnectWallet: () => {
        set({ address: null, error: null });
      },

      fetchWalletAddress: async () => {
        try {
          const response = await fetch('/wallet');
          if (!response.ok) {
            throw new Error('Failed to fetch wallet address');
          }

          const data = await response.json();
          set({ address: data.wallet_address });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch wallet address' });
        }
      },
    }),
    {
      name: 'wallet-storage',
      version: 1,
    }
  )
);