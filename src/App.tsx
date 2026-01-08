import { useState } from "react";
import encryptString from "./utils/encrypt";
import decryptString from "./utils/decrypt";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [key, setKey] = useState("");

  const [isCopied, setIsCopied] = useState(false);

  const handleEncrypt = () => {
    if (!inputText) return;
    const encryptedString = encryptString({
      input: inputText,
      key: key ? key : undefined,
    });
    setOutputText(encryptedString);
    setIsCopied(false);
  };

  const handleDecrypt = () => {
    if (!inputText) return;
    const decryptedString = decryptString({
      input: inputText,
      key: key ? key : undefined,
    });
    setOutputText(decryptedString);
    setIsCopied(false);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setKey("");
    setIsCopied(false);
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 p-6 relative">
          <h1 className="text-2xl font-bold text-white text-center">
            🔐 CyEnc String Encryption Tool
          </h1>
          <p className="text-slate-400 text-center text-sm mt-1">
            Simple String Encoder & Decoder
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 grow">
          {/* Input Section */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Input String
            </label>
            <textarea
              className="w-full h-32 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none font-mono bg-slate-50"
              placeholder="Input your string here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          {/* Key Section */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Secret Key{" "}
              <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="password"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition font-mono bg-slate-50"
              placeholder="Enter encryption password/key..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleEncrypt}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition shadow-md active:transform active:scale-95 cursor-pointer"
            >
              Encrypt String
            </button>
            <button
              onClick={handleDecrypt}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition shadow-md active:transform active:scale-95 cursor-pointer"
            >
              Decrypt String
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition active:transform active:scale-95 cursor-pointer"
            >
              Clear
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-slate-700">
                Result
              </label>

              {outputText && (
                <button
                  onClick={handleCopy}
                  disabled={isCopied}
                  className={`text-xs font-medium transition-all duration-200 ${
                    isCopied
                      ? "text-emerald-600 font-bold"
                      : "text-indigo-600 hover:underline hover:text-indigo-800"
                  }`}
                >
                  {isCopied ? (
                    <span className="flex items-center gap-1">
                      ✓ Copied to clipboard!
                    </span>
                  ) : (
                    "Copy Result"
                  )}
                </button>
              )}
            </div>
            <textarea
              readOnly
              className="w-full h-32 p-4 border border-slate-300 rounded-lg bg-slate-100 text-slate-600 focus:outline-none resize-none font-mono"
              placeholder="Result will appear here..."
              value={outputText}
            />
          </div>
        </div>

        {/* Footer / GitHub Link */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-center">
          <a
            href="https://github.com/fikrisyahid/cyenc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors duration-200"
          >
            {/* GitHub SVG Icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="font-medium">View Source on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
