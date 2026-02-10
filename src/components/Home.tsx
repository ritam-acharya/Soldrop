import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useRef, useState } from "react";

const Home = () => {
    const [error, setError] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const wallet = useWallet();
    const { connection } = useConnection();

    async function airdrop() {
        if (wallet && wallet.publicKey && inputRef && inputRef.current){
            try{
                const val = parseFloat(inputRef.current.value);
                await connection.requestAirdrop(wallet.publicKey, val * LAMPORTS_PER_SOL);
                alert(`Airdrop ${val} SOL to your wallet`);
            }catch(error) {
                console.log(error);
                alert("You've either reached your airdrop limit today or the airdrop faucet has run dry.");
            }
        }
    }

    function enterAmount() {
        if(inputRef && inputRef.current ){
            const decimals = inputRef.current.value.split('.');
            const amount = parseFloat(inputRef.current.value);
            if(amount > 5){
                setError(true);
            }else{
                setError(false);
            }
            if(decimals.length === 2 && decimals[1].length > 9) {
                inputRef.current.readOnly = true;
                setTimeout(() => {
                    if (inputRef && inputRef.current) inputRef.current.readOnly = false;
                }, 2000);
            }
        } 
    }

    function selectMaxAmount() {
        if(inputRef && inputRef.current ){
            inputRef.current.value = '5';
        }
    }

    if (!wallet.connected) {
        return <div className="bg-[#0F1626] w-screen h-screen flex items-center justify-center">
            <WalletMultiButton />
        </div>
    }

    return (
        <div className="bg-[#0F1626] w-screen h-screen flex items-center justify-center flex-col gap-4 text-white">
            <div className="header bg-[#13192A]  w-full h-auto py-4 md:py-7 px-4 md:px-8 lg:px-12 flex items-center justify-between">
                <h1 className="text-white text-[16px] md:text-[20px] lg:text-[24px] leading-[16px] md:leading-[20px] lg:leading-[24px] tracking-tight font-semibold ">SOLDrop</h1>
                <span className="block md:hidden">
                    <div className="flex items-center justify-center gap-1 ">
                        <div className="w-2 h-2 bg-green-500 rounded-[100%] "></div>
                        <p className="text-white font-medium text-sm md:text-[16px] lg:text-lg leading-[14px] md:leading-[16px] lg:leading-[18px] tracking-tight">Connected</p>
                    </div>
                </span>
                <div className="flex items-center justify-center gap-4 h-auto w-auto ">
                    <span className="hidden md:block">
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-[100%] "></div>
                            <p className="text-white font-medium text-sm md:text-[16px] lg:text-lg leading-[14px] md:leading-[16px] lg:leading-[18px] tracking-tight">Connected</p>
                        </div>
                    </span>
                    <p className="text-white bg-blue-500 px-2 py-2 rounded-lg text-sm md:text-[16px] lg:text-lg leading-[14px] md:leading-[16px] lg:leading-[18px] tracking-tight  ">{wallet.publicKey?.toBase58().slice(0, 4)}...{wallet.publicKey?.toBase58().slice(-4)}</p>
                </div>
            </div>

            <div className="body w-full h-auto flex-1 items-center justify-center flex flex-col gap-4">
                <h2 className="text-[23px] md:text-[26px] lg:text-[30px] xl:text-[33px] font-semibold leading-[23px] md:leading-[26px] lg:leading-[30px] xl:leading-[33px] flex items-center justify-center flex-wrap px-2  ">Airdrop SOL to your wallet</h2>
                <p className="text-[#5C647C] text-[16px] md:text-[18px] lg:text-[20px] leading-[16px] md:leading-[18px] lg:leading-[20px] tracking-tight flex items-center justify-center flex-wrap px-2">Enter the amount to receive SOL tokens</p>
                <div className="flex items-start justify-start flex-col gap-4 mt-4 bg-[#131B2C] h-[75%] md:h-[70%] w-[90%] md:w-[50%] lg:w-[35%] rounded-lg px-6 md:px-8 lg:px-10 py-10 ">
                    <p>Airdrop Amount</p>
                    <span className={`w-full h-auto relative flex items-start border border-[#5C647C] rounded-lg overflow-hidden ${error ? 'ring-1 ring-red-500' : ''} `}>
                        <span className="w-[80%] h-auto relative  ">
                            <input ref={inputRef} onChange={enterAmount} type="text" name="amount" id="amount" placeholder="1" className="bg-[#1D263C]  px-4 py-2 text-white placeholder:text-gray-500 outline-none w-full " />
                            <p className="absolute right-4 bottom-2 h-auto text-white">SOL</p>
                        </span>
                        <p onClick={selectMaxAmount} className="bg-[#0F1627] flex items-center justify-center w-[20%] h-full text-sm md:text-[16px] lg:text-lg cursor-pointer text-gray-400 ">MAX</p>
                    </span>
                    {
                        error && <span className="text-red-500 text-sm md:text-[16px] leading-[14px] md:leading-[16px] tracking-tight uppercase ">* Max 5 SOL</span>
                    }
                    <div 
                    onClick={airdrop}
                    className="text-[16px] mt-4 md:text-[18px] lg:text-[20px] leading-[16px] md:leading-[18px] lg:leading-[20px] tracking-tight w-full h-auto my-4 flex items-center justify-center text-white py-3 px-3 rounded-lg cursor-pointer bg-gradient-to-r from-[#11C36A] to-[#722CDB] ">
                        Send Airdrop
                    </div>
                    <div className="self-end mt-auto bg-[#141B2B] pt-4 w-full h-auto px-4 md:px-8 lg:px-10 text-[14px] md:text-[16px]  leading-[14px] md:leading-[16px] tracking-tight flex items-center justify-center text-center text-gray-500 border-t border-[#5C647C]  ">
                        <p>You can Airdrop 5 SOL at a time in your wallet</p>
                    </div>
                </div>
            </div>

            <div className="footer bg-[#13192A] w-full h-auto py-4 md:py-7 px-4 md:px-8 lg:px-12 flex items-center justify-between ">
                <p className="text-gray-500 text-[12px] md:text-sm leading-[12px] md:leading-[14px] ">Powered by <span className="text-white">WalletConnect</span></p>
                <p className="text-[12px] md:text-sm leading-[12px] md:leading-[14px] ">© 2026 SOLDrop</p>
            </div>
        </div>
    )
}

export default Home