import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from "@solana/wallet-adapter-wallets";
import '@solana/wallet-adapter-react-ui/styles.css';
import Home from "./components/Home";

function App() {
    const wallets = [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter()
    ];
    return <ConnectionProvider endpoint='https://api.devnet.solana.com'>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <Home />
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
}

export default App
