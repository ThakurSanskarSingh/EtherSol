import { useState,useEffect } from 'react';
import { Eye, EyeOff, Trash2 } from 'lucide-react';
import { fetchSolanaBalance,fetchEthereumBalance } from '../utils/FetchBalance';
export interface Wallet {
    id: number;
    type: 'Ethereum' | 'Solana';
    publicKey: string;
    privateKey: string;
    balance? : string
  }

interface WalletCardProps {
  type: Wallet['type'];
  publicKey: string;
  privateKey: string;
  onDelete: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  type,
  publicKey,
  privateKey,
  onDelete,
}) => {

    
  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>('Fetching...');

  useEffect(() => {
    const fetchBalance = async () => {
      if (type === 'Ethereum') {
        const ethBalance = await fetchEthereumBalance(publicKey);
        setBalance(ethBalance);
      } else if (type === 'Solana') {
        const solBalance = await fetchSolanaBalance(publicKey);
        setBalance(solBalance);
      }
    };
    fetchBalance();
  }, [type, publicKey]);

  return (
    <div className="bg-gray-900 p-6 rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-200">{type} Wallet</h3>
        <button
          onClick={onDelete}
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-gray-400 text-sm">Public Key</label>
          <div className="bg-gray-800 p-3 rounded text-gray-300 font-mono text-sm break-all">
            {publicKey}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <label className="text-gray-400 text-sm">Private Key</label>
            <button
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPrivateKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="bg-gray-800 p-3 rounded text-gray-300 font-mono text-sm break-all">
            {showPrivateKey ? privateKey : '••••••••••••••••••••••••••••••••'}
          </div>
        </div>
        <div>
          <label className="text-gray-400 text-sm">Balance</label>
          <div className="bg-gray-800 p-3 rounded text-gray-300 font-mono text-sm">
            {balance}
          </div>
        </div>
      </div>
    </div>
  );
};
