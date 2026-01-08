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
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            🔐 CyEnc String Encryption Tool
          </h1>
          <p className="text-slate-400 text-center text-sm mt-1">
            Simple String Encoder & Decoder
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
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

              {/* 3. Button UI Logic */}
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
      </div>
    </div>
  );
}

export default App;
