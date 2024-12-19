import React, { useState } from 'react';
import { generateEthereumWallet, generateSolanaWallet, WalletAddress } from '../utils/walletGenerator';

interface WalletGenerationPanelProps {
  mnemonic: string;
  onWalletGenerated: (wallet: WalletAddress & { type: 'Ethereum' | 'Solana' }) => void;
}

export const WalletGenerationPanel: React.FC<WalletGenerationPanelProps> = ({ 
  mnemonic, 
  onWalletGenerated 
}) => {
  const [ethereumIndex, setEthereumIndex] = useState(0);
  const [solanaIndex, setSolanaIndex] = useState(0);

  const generateEthereumWalletHandler = () => {
    const wallet = generateEthereumWallet(mnemonic, ethereumIndex);
    onWalletGenerated({
      ...wallet,
      type: 'Ethereum'
    });
    setEthereumIndex(prev => prev + 1);
  };

  const generateSolanaWalletHandler = () => {
    const wallet = generateSolanaWallet(mnemonic, solanaIndex);
    onWalletGenerated({
      ...wallet,
      type: 'Solana'
    });
    setSolanaIndex(prev => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={generateEthereumWalletHandler}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Generate Ethereum Wallet (Index: {ethereumIndex})
        </button>
        <button
          onClick={generateSolanaWalletHandler}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Generate Solana Wallet (Index: {solanaIndex})
        </button>
      </div>
    </div>
  );
};