import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';
import {
  coinbaseWallet,
  trustWallet,
  binanceWallet,
  uniswapWallet,
} from '@rainbow-me/rainbowkit/wallets';

import {
  mainnet,
  base,
  bsc
} from 'wagmi/chains';

const chains = [mainnet, base, bsc] as const;

export const createWagmiConfig = (appName: string, projectId: string) => {
  const connectors = connectorsForWallets(
    [
      {
        groupName: 'Popular',
        wallets: [
          binanceWallet,
          trustWallet,
          uniswapWallet,
          coinbaseWallet,
        ],
      },
    ],
    {
      appName,
      projectId,
    },
  );

  return createConfig({
    connectors,
    chains,
    transports: chains.reduce((acc, chain) => {
      acc[chain.id] = http();
      return acc;
    }, {} as Record<number, any>),
    multiInjectedProviderDiscovery: true,
  });
}; 