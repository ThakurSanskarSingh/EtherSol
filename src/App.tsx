import React from 'react';
import { WalletContainer } from './components/WalletContainer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
         EtherSol
        </h1>
        <WalletContainer />
      </div>
    </div>
  );
};

export default App;