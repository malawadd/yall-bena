import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import AuthProvider from '../components/auth-provider';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { Chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const CSCTChain: Chain = {
  id: 53,
  name: 'CoinEx Smart Chain Testnet',
  network: 'CoinEx Smart Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'CETT',
    symbol: 'CETT',
  },
  rpcUrls: {
    default: 'https://testnet-rpc.coinex.net/',
  },
  blockExplorers: {
    default: { name: 'coinex', url: 'https://testnet.coinex.net/' },
  }
}



const { chains, provider } = configureChains(
  [CSCTChain],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'yall bena',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ToastContainer />
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor:
            'linear-gradient(90deg, #4700FF 0%, #9166FF 100%, #9166FF 100%)',
          borderRadius: 'small',
        })}
      >
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
