# KisanMitra - Digital Agriculture Platform

![KisanMitra Banner](/public/hero-dashboard.png)

> **Empowering Indian Farmers with Technology**

**KisanMitra** is a comprehensive, mobile-first digital platform designed to bridge the gap between Indian farmers and modern agricultural technology. It serves as a one-stop solution for marketplace connections, government schemes, real-time weather analytics, and AI-driven market trends.

![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-cyan)

## Key Features

- **🛒 Digital Marketplace**: Direct line between farmers and buyers, eliminating middlemen.
- **📈 Market Trends & Analytics**: AI-powered insights on crop prices, demand-supply gaps, and price forecasting using interactive charts.
- **🌤️ Precision Weather**: Hyper-local weather forecasts, rain alerts, and farming advisory based on real-time data.
- **🏛️ Government Schemes**: Simplified access to the latest agricultural subsidies and policies.
- **🗣️ Voice Assistant**: "Just Ask" feature supporting multiple Indian languages (Hindi, Punjabi, Tamil, Telugu) for accessible interaction.
- **📱 Mobile Responsive**: Fully optimized for mobile devices with a fluid, app-like experience.
- **🆘 SOS Emergency**: One-touch assistance for immediate help.

## Technology Stack

### Core
- **Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)

### Styling & UI
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **3D Elements**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

### Data & State
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React Context API

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/z-lovejeet/Kisan-Mitra.git
    cd kisan-mitra
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

## Project Structure

```
src/
├── components/   # Reusable UI components (Hero, Features, Layout)
├── context/      # Global state (Auth, Language, Voice)
├── data/         # Mock data and constants
├── layouts/      # Main application layouts
├── pages/        # Route components (Home, Trends, Weather, etc.)
└── types/        # TypeScript interfaces and types
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ for Indian Agriculture
</p>
