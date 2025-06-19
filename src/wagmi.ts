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

const appName = 'pr0d';
const projectId = '8ce47691a97bb4e85997c6bbbff1e6a7';

const chains = [mainnet, base, bsc] as const;

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

console.log(connectors)

export const config = createConfig({
  connectors,
  chains,
  transports: chains.reduce((acc, chain) => {
    acc[chain.id] = http();
    return acc;
  }, {} as Record<number, any>),
  multiInjectedProviderDiscovery: true,
}); 