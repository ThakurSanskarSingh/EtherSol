import { ethers } from 'ethers';
import { Keypair } from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';

export interface WalletAddress {
  publicKey: string;
  privateKey: string;
}

export const generateEthereumWallet = (mnemonic: string, index: number): WalletAddress => {
  const seed = mnemonicToSeedSync(mnemonic);
  const path = `m/44'/60'/${index}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const privateKey = ethers.hexlify(derivedSeed);
  const wallet = new ethers.Wallet(privateKey);

  return {
    publicKey: wallet.address,
    privateKey: privateKey
  };
};

export const generateSolanaWallet = (mnemonic: string, index: number): WalletAddress => {
  const seed = mnemonicToSeedSync(mnemonic);
  const path = `m/44'/501'/${index}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const keyPair = Keypair.fromSecretKey(secret);

  return {
    publicKey: keyPair.publicKey.toBase58(),
    privateKey: Buffer.from(keyPair.secretKey).toString('hex')
  };
};