import '../styles/globals.css';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const rpcUrl = process.env.NEXT_PUBLIC_MONAD_RPC_URL || '';
const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1', 10);

const { chains, publicClient } = configureChains(
  [{ id: chainId, name: 'Monad', network: 'monad', rpcUrls: { default: rpcUrl ? { http: [rpcUrl] } : undefined } }],
  [jsonRpcProvider({ rpc: () => ({ http: rpcUrl }) }), publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
