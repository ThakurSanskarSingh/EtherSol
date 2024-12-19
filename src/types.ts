interface Wallet {
    id: number;
    type: 'Ethereum' | 'Solana';
    publicKey: string;
    privateKey: string;
  }
  
  interface MnemonicDisplayProps {
    phrases: string[];
  }
  
  interface WalletCardProps {
    type: Wallet['type'];
    publicKey: string;
    privateKey: string;
    onDelete: () => void;
  }
  