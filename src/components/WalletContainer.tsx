import React, { useState } from 'react';
import { generateMnemonic } from 'bip39';
import { MnemonicDisplay } from './MnemonicDisplay';
import { WalletGenerationPanel } from './WalletGenerationPanel';
import { WalletCard } from './WalletCard';
import { WalletAddress } from '../utils/walletGenerator';

interface Wallet extends WalletAddress {
  id: number;
  type: 'Ethereum' | 'Solana';
}

export const WalletContainer: React.FC = () => {
  const [mnemonic, setMnemonic] = useState<string>('');
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const handleMnemonicGenerated = (generatedMnemonic: string) => {
    setMnemonic(generatedMnemonic);
  };

  const handleWalletGenerated = (wallet: WalletAddress & { type: 'Ethereum' | 'Solana' }) => {
    setWallets(prev => [
      ...prev, 
      { 
        ...wallet, 
        id: Date.now() 
      }
    ]);
  };

  const deleteWallet = (id: number) => {
    setWallets(prev => prev.filter(wallet => wallet.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <MnemonicDisplay onMnemonicGenerated={handleMnemonicGenerated} />
        
        {mnemonic && (
          <WalletGenerationPanel 
            mnemonic={mnemonic}
            onWalletGenerated={handleWalletGenerated}
          />
        )}
        
        <div className="grid gap-6">
          {wallets.map(wallet => (
            <WalletCard
              key={wallet.id}
              type={wallet.type}
              publicKey={wallet.publicKey}
              privateKey={wallet.privateKey}
              onDelete={() => deleteWallet(wallet.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};