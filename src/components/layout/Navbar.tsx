import React, { useState } from 'react';
import { Menu, X, Leaf, User, Mic, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useVoice } from '../../context/VoiceContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { isListening, startListening, stopListening, supported } = useVoice();

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.marketplace'), path: '/marketplace' },
    { name: t('nav.schemes'), path: '/schemes' },
    { name: t('nav.weather'), path: '/weather' },
    { name: 'Trends', path: '/trends' },
    { name: t('nav.expert'), path: '/expert-help' }
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-40 shadow-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <Leaf size={20} />
            </div>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">Kisan<span className="text-emerald-600">Mitra</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-all hover:text-emerald-600 ${location.pathname === item.path ? 'text-emerald-600 font-bold' : 'text-gray-600'}`}
              >
                {item.name}
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-600 hover:text-emerald-600">
                <Globe size={18} /> <span className="uppercase font-bold text-sm">{language}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden hidden group-hover:block">
                {['en', 'hi', 'pa', 'ta', 'te'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang as any)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 ${language === lang ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-gray-600'}`}
                  >
                    {lang === 'en' ? 'English' :
                      lang === 'hi' ? 'हिंदी' :
                        lang === 'pa' ? 'ਪੰਜਾਬੀ' :
                          lang === 'ta' ? 'தமிழ்' : 'తెలుగు'}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Assistant */}
            {supported && (
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-2 rounded-full transition-all ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-600'}`}
                title="Voice Assistant"
              >
                <Mic size={20} />
              </button>
            )}

            <AuthButton />
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Voice */}
            {supported && (
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-2 rounded-full transition-all ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600'}`}
              >
                <Mic size={20} />
              </button>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b"
          >
            <div className="px-4 pt-2 pb-8 space-y-2 flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${location.pathname === item.path ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="grid grid-cols-5 gap-2 px-4 py-4 border-t border-gray-100">
                {['en', 'hi', 'pa', 'ta', 'te'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang as any)}
                    className={`text-sm py-2 rounded border ${language === lang ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-200 text-gray-600'}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <MobileAuthButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Sub-components for cleaner code
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';

const AuthButton = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  if (isAuthenticated && user) {
    return (
      <div className="relative group">
        <button className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all">
          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-emerald-200" />
          <div className="text-left">
            <p className="text-xs text-gray-500 font-medium leading-none uppercase">{user.role}</p>
            <p className="text-sm font-bold text-gray-800 leading-none">{user.name}</p>
          </div>
        </button>
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden hidden group-hover:block px-2 py-2">
          <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <Link to="/login" className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2">
      <User size={18} /> {t('nav.login')}
    </Link>
  );
}

const MobileAuthButton = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-bold text-gray-900">{user.name}</p>
            <p className="text-xs text-emerald-600 font-bold uppercase">{user.role}</p>
          </div>
        </div>
        <button onClick={logout} className="p-2 text-red-600 bg-red-50 rounded-lg">
          <LogOut size={20} />
        </button>
      </div>
    )
  }

  return (
    <Link to="/login" className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
      <User size={20} /> Login / Register
    </Link>
  )
}