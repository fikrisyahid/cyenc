# 🔐 CyEnc - Advanced String Encryption Tool

CyEnc is a modern, web-based string encryption and decryption tool built with **React**, **TypeScript**, and **Tailwind CSS**. 

Unlike standard encryption tools that wrap existing libraries (like AES), CyEnc implements a **custom, multi-layered cryptographic algorithm** designed to maximize diffusion and confusion through non-linear processing.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

* **Custom Polyalphabetic Cipher**: Uses a unique combination of substitution and permutation.
* **256-Round Encryption**: Every string goes through 256 iterations of processing for maximum security.
* **Key-Dependent Reordering**: The ordering of characters is scrambled based on the input key (Permutation).
* **Dynamic Shifting**: Character values are shifted based on their index, the key, and the current round (Substitution).
* **Clean UI**: A responsive and modern interface built with Tailwind CSS.
* **One-Click Copy**: Easily copy encrypted/decrypted results to the clipboard.

## 🧠 How It Works (The Algorithm)

The core logic resides in `encrypt.ts` and `decrypt.ts`. The algorithm rejects linear processing to prevent standard frequency analysis and "meet-in-the-middle" attacks.

### The Flow (Repeated 256 Times)

1.  **Key Calculation**: A `wordshiftOffset` is generated from the optional secret key.
2.  **Stage 1: Permutation (Zig-Zag Reordering)**
    * The string is not processed linearly. Based on the key, the algorithm determines a `frontIndex` and `backIndex`.
    * Characters are picked from the source string in a zig-zag pattern and placed into a new order. 
    * *Result*: The physical position of characters is scrambled purely based on the key.
3.  **Stage 2: Substitution (Dynamic Shift)**
    * Each character's ASCII value is shifted.
    * The shift amount is dynamic: `(Base + KeyOffset + Index + 1)`.
    * Because the index changes in Stage 1, the shift value for a specific character changes in every single round.

This process is repeated **256 times**, meaning a single character changes its position and value 256 times before the final output is produced.

## 🛠️ Tech Stack

* **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Icons/UI**: Standard HTML5/CSS3

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/cyenc-encryption.git](https://github.com/your-username/cyenc-encryption.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd cyenc-encryption
    ```
3.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## 📖 Usage

1.  **Input Text**: Type the message you want to hide in the top box.
2.  **Secret Key (Optional but Recommended)**: Enter a password.
    * *Note: Without a key, the algorithm uses a default offset, but the permutation logic is less aggressive.*
3.  **Encrypt**: Click the button to scramble your text.
4.  **Decrypt**: Paste the scrambled text back into the input box, ensure the **same Key** is entered, and click Decrypt.

## ⚠️ Disclaimer

This tool is created for educational purposes and personal use. While the algorithm is designed to be complex and resistant to basic cryptanalysis, it has not been audited by professional cryptographers. **Do not use this for securing high-value sensitive data (e.g., banking passwords, classified documents).** For such cases, please use industry-standard algorithms like AES-256.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.