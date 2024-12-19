import axios from "axios"

interface Wallet {
    id: number;
    type: 'Ethereum' | 'Solana';
    publicKey: string;
    privateKey: string;
    balance?: string;
  }

const solanaUrl = 'https://solana-mainnet.g.alchemy.com/v2/jj-nP5131CJpHvj_piXoKPWVHjkOAu99'
const alchemyUrl = 'https://eth-mainnet.g.alchemy.com/v2/jj-nP5131CJpHvj_piXoKPWVHjkOAu99'

const fetchEthereumBalance = async (publicKey: string): Promise<string> => {
    try {
      const response = await axios.post(`${alchemyUrl}`, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [publicKey, "latest"],
      });
      const balanceInWei = response.data.result;
      return (parseFloat(balanceInWei) / 10 ** 18).toFixed(4) + ' ETH';
    } catch (error) {
      console.error(`Failed to fetch Ethereum balance:`, error);
      return 'Error fetching balance';
    }
  };
  

  const fetchSolanaBalance = async (publicKey: string): Promise<string> => {
    try {
      const response = await axios.post(
        `${solanaUrl}`,
        {
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [publicKey],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      const balanceInLamports = response.data.result.value; 
      return (balanceInLamports / 10 ** 9).toFixed(4) + ' SOL'; 
    } catch (error) {
      console.error(`Failed to fetch Solana balance for ${publicKey}:`, error);
      return 'Error fetching balance';
    }
  };
  
  



  export {fetchEthereumBalance,fetchSolanaBalance}

