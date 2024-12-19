import React, { useState } from 'react';
import { generateMnemonic } from 'bip39';
import { Copy } from 'lucide-react';

interface MnemonicDisplayProps {
  onMnemonicGenerated: (mnemonic: string) => void;
}

export const MnemonicDisplay: React.FC<MnemonicDisplayProps> = ({ onMnemonicGenerated }) => {
  const [phrases, setPhrases] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const generatePhrases = () => {
    const mnemonic = generateMnemonic();
    const phraseArray = mnemonic.split(' ');
    setPhrases(phraseArray);
    onMnemonicGenerated(mnemonic);
  };

  const handleCopy = (): void => {
    navigator.clipboard.writeText(phrases.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 ">
      <button
        onClick={generatePhrases}
        className="bg-blue-600 hover:bg-blue-700 px-6 flex justify-center items-center py-3 rounded-lg font-medium transition-colors mx-auto"
      >
        Generate Recovery Phrase
      </button>

      {phrases.length > 0 && (
        <div
          onClick={handleCopy}
          className="bg-gray-900 p-6 rounded-lg cursor-pointer relative"
        >
          <div className="grid grid-cols-3 gap-4">
            {phrases.map((phrase, index) => (
              <div
                key={index}
                className="bg-gray-800 p-3 rounded text-gray-300 text-center"
              >
                <span className="text-gray-500 mr-2">{index + 1}.</span>
                {phrase}
              </div>
            ))}
          </div>
          <div className={`absolute top-4 right-4 flex items-center gap-2 ${copied ? 'text-green-500' : 'text-gray-500'}`}>
            <Copy size={16} />
            <span className="text-sm">{copied ? 'Copied!' : 'Click to copy'}</span>
          </div>
        </div>
      )}
    </div>
  );
};