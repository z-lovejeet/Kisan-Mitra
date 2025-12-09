import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { SchemesPage } from './pages/SchemesPage';
import { WeatherPage } from './pages/WeatherPage';
import { TrendsPage } from './pages/TrendsPage';

import { ExpertHelpPage } from './pages/ExpertHelpPage';

import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

import { LanguageProvider } from './context/LanguageContext';
import { VoiceProvider } from './context/VoiceContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <VoiceProvider>
          <AuthProvider>
            <Routes>
              {/* Public Routes with Layout */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="marketplace" element={<MarketplacePage />} />
                <Route path="schemes" element={<SchemesPage />} />
                <Route path="weather" element={<WeatherPage />} />
                <Route path="trends" element={<TrendsPage />} />
                <Route path="expert-help" element={<ExpertHelpPage />} />
              </Route>

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </AuthProvider>
        </VoiceProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;