# FasalNet — AI Kisan Market 🌾🚜
> **Connecting Indian Farmers Directly with Buyers, Real-Time APMC Mandi Bhav, AI Crop Health Diagnostics & Agronomy Advisory.**

---

## 📌 Overview

**FasalNet** is a modern agritech web platform engineered to eliminate middleman margins and bring real-time intelligence to the hands of Indian Kisans (farmers), agricultural traders, and millers.

### Core Modules & Features
- 📊 **Live APMC Mandi Bhav**: Real-time modal prices, daily arrivals (metric tons), and 24h price changes across major Indian states (MP, Punjab, Rajasthan, Maharashtra, Gujarat, UP) with AI price forecasts and net freight margin calculators.
- 🛒 **Direct Farm Gate Marketplace**: Direct crop lot listings with certified moisture ratings, quality grades (Grade A+, Standard), and zero buyer brokerage fees. Includes an interactive direct trade negotiation modal.
- 🩺 **AI Crop Doctor & Disease Diagnostic**: Computer-vision-style leaf scanner detecting foliar pathogens (such as Early Blight, Stripe Rust, Pink Bollworm, Bacterial Leaf Blight) with both organic and chemical treatment prescriptions.
- 🗣️ **AI Kisan Sathi (Voice & Multilingual Advisory)**: Dual-language (English / हिन्दी) interactive farm assistant with speech synthesis playback for hands-free audio advice.
- ❄️ **Cold Storage & Mandi Logistics**: Nearby verified temperature-controlled warehouses and farm-to-mandi freight calculator for mini-trucks (Tata Ace, Bolero Maxi Truck, Eicher).

---

## 💻 Prerequisites for Laptops / Desktops

Before running the project on your machine (macOS, Windows, or Linux), make sure you have:

1. **Git**: Installed and configured ([Download Git](https://git-scm.com/)).
2. **Node.js**: **v18.18.0** or higher (LTS recommended, e.g., v20.x or v22.x) ([Download Node.js](https://nodejs.org/)).
3. **npm**: v9+ (comes bundled with Node.js).
4. **Modern Web Browser**: Google Chrome, Microsoft Edge, Brave, Mozilla Firefox, or Safari with JavaScript and Web Speech API enabled.

---

## 🚀 Setup Directly from GitHub

Follow these simple steps in your laptop's terminal or command prompt:

### Step 1: Clone the Repository
Open your terminal (Terminal on macOS/Linux, Git Bash / PowerShell / Command Prompt on Windows) and clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd fasalnet
```
*(Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your repository's clone URL, e.g., `https://github.com/username/fasalnet.git`)*

---

### Step 2: Install Dependencies
Install all required project packages:

```bash
npm install
```

---

### Step 3: Configure Environment Variables (Optional)
The project comes with a `.env.example` template. Copy it to create your local `.env` if you want to integrate customized Gemini API keys:

```bash
# On macOS / Linux:
cp .env.example .env

# On Windows (Command Prompt):
copy .env.example .env

# On Windows (PowerShell):
cp .env.example .env
```

*(Note: The app runs out-of-the-box in local mode even without external keys).*

---

### Step 4: Start the Development Server
Launch the local development server:

```bash
npm run dev
```

Once running, you will see output similar to:
```
  VITE v8.x.x  ready in 250 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://<your-ip>:3000/
```

Open **`http://localhost:3000`** in your laptop browser to view the application!

---

## 🔍 How to Check for Working Conditions & Verification

To ensure the application is functioning in healthy working conditions on your laptop, run through the following health checklist:

### 1. Static Type & Lint Check
Validate that there are zero TypeScript compiler errors or broken imports:
```bash
npm run lint
```
✅ **Expected Output**: Exit code 0 with no errors reported (`tsc --noEmit` completes cleanly).

---

### 2. Production Build Verification
Verify that Vite packages and bundles all assets for production without errors:
```bash
npm run build
```
✅ **Expected Output**: Vite outputs chunks in `dist/` with a green build success message and asset sizes.

---

### 3. Local Production Preview
Test the production-compiled bundle locally on port 4173:
```bash
npm run preview
```
Visit the preview link in your browser to confirm production assets and fonts render flawlessly.

---

### 4. Interactive Feature Checklist on Your Laptop

| Feature | How to Test | Expected Behavior |
| :--- | :--- | :--- |
| **Language Toggle** | Click the **हिन्दी / English** button in the top right navbar. | The entire navigation, hero headlines, and advisory switch between Hindi and English seamlessly. |
| **Live Mandi Bhav** | Navigate to the Mandi Bhav tab, click column headers (Price, 24h Change, Arrivals), or click state filters. | Table rows sort smoothly. Clicking an **AI Forecast** button opens the predictive intelligence modal. |
| **Price Trends Chart (Recharts)** | Select any commodity chip (e.g. Wheat, Basmati, Mustard, Cotton) or toggle "Price vs Arrivals". | Smooth Recharts curve displays daily prices, MSP floor reference line, daily arrival volumes, and AI Sell/Hold advice. |
| **Net Margin Tool** | Click **Net Margin Tool** inside Mandi Bhav, change quantity and distance sliders. | Freight charges and estimated margins update dynamically in real time. |
| **Direct Marketplace** | Filter by crop categories or toggle **Organic Certified Only**. | Filtered listings update instantly. Clicking **Make Offer** opens the deal calculation modal. |
| **Sell Crop Listing** | Click the green **+ Sell Crop / फसल बेचें** button in the header, fill details, and submit. | The newly listed crop is instantly prepended to the marketplace inventory. |
| **AI Crop Doctor** | Navigate to **Crop Doctor**, click any sample leaf (Tomato, Wheat, Cotton, Paddy) or click **Upload Leaf Photo**. | Scanning laser animation activates and delivers clinical symptoms, organic treatments, and chemical dosages. |
| **AI Kisan Sathi Audio** | Navigate to **AI Advisory**, click **"Listen / सुनें"** on any message. | Your laptop's speaker reads out the agricultural advisory using the browser's speech synthesis engine. |
| **Logistics Estimator** | Navigate to **Cold Storage**, toggle vehicle class (Tata Ace, Bolero, Eicher) and slide distance. | Breakdown rates and total freight compute automatically. |

---

## 🛠️ Project Structure

```
.
├── index.html                  # HTML entry point with meta tags & typography
├── package.json                # Project dependencies and script runner
├── tsconfig.json               # TypeScript compiler rules
├── vite.config.ts              # Vite 8 configuration with Tailwind CSS v4
├── metadata.json               # App metadata for AI Studio / deployment
└── src/
    ├── main.tsx                # React DOM root entry
    ├── App.tsx                 # Root layout & state coordinator
    ├── index.css               # Tailwind CSS imports & custom styles
    ├── types.ts                # TypeScript data interfaces & types
    ├── assets/images/          # High-resolution agricultural imagery
    ├── data/
    │   ├── mockData.ts         # APMC mandi rates, disease cases, and crop listings
    │   └── priceTrendsData.ts  # 7-day price fluctuations, MSP floors & sell signals
    └── components/
        ├── FasalNetLogo.tsx    # Official FasalNet brand identity badge
        ├── Navbar.tsx          # 3-Zone navigation header & mobile drawer
        ├── HeroSection.tsx     # National mandi ticker & search discovery
        ├── MandiBhavView.tsx   # Real-time APMC price grid & arbitrage tool
        ├── PriceTrendsChart.tsx# Recharts weekly fluctuations & Sell/Hold visualizer
        ├── MarketplaceView.tsx # Direct farm-gate crop lot showcase
        ├── CropDoctorView.tsx  # Foliar diagnosis scanner & prescriptions
        ├── KisanSathiChat.tsx  # Voice-enabled AI agronomy chat assistant
        ├── ColdStorageLogisticsView.tsx # Warehouses & mini-truck estimator
        ├── SellCropModal.tsx   # Farmer crop listing submission form
        ├── MakeOfferModal.tsx  # Buyer bid negotiation flow
        └── Footer.tsx          # Contact, toll-free Kisan helpline & legal
```

---

## ❓ Troubleshooting Common Laptop Issues

### Issue 1: "Port 3000 is already in use"
**Solution**: Either kill the process running on port 3000 or specify an alternate port:
```bash
# Run on another port
npx vite --port 3001
```

### Issue 2: Audio Read-Out Not Working in Kisan Sathi
**Solution**: Web browsers require a user interaction (like clicking a button) before playing audio. Make sure:
- You click the **"Listen / सुनें"** button explicitly.
- Your laptop sound output is unmuted.
- Browser permissions allow sound playback for `localhost`.

### Issue 3: Node Version Mismatch
**Solution**: If you see errors related to modern ECMAScript or bundler features, check your Node version:
```bash
node -v
```
If it is below v18, please update Node.js via [nodejs.org](https://nodejs.org/) or use `nvm` (`nvm install 20 && nvm use 20`).

---

## 📜 License & Compliance
Built for Indian agriculture, adhering to e-NAM digital transparency principles and PM-Kisan advisory guidelines.
