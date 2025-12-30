import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="home" className="min-h-screen pt-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 flex items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      {/* Glow Effect */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium">{t('hero.trusted')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6">
              {t('hero.title')}
            </h1>

            <p className="text-base md:text-xl text-emerald-100 mb-8 max-w-lg">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/marketplace" className="bg-white text-emerald-800 px-8 py-4 rounded-full font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2 group">
                {t('hero.getStarted')} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                <PlayCircle /> {t('hero.watchDemo')}
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                { label: 'Farmers', val: '50K+' },
                { label: 'Crops', val: '120+' },
                { label: 'States', val: '15+' }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl font-bold text-white">{stat.val}</div>
                  <div className="text-emerald-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative block mt-12 lg:mt-0"
          >
            {/* Dashboard Mockup Image */}
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative z-10"
            >
              <img
                src="/hero-dashboard.png"
                alt="KisanMitra Dashboard Preview"
                className="w-full rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md"
              />

              {/* Floating Badge 1 */}
              <motion.div
                animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute -top-6 -right-2 md:-right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <span className="text-xl">🌾</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Wheat Price</p>
                  <p className="text-lg font-bold text-gray-800">₹2,450</p>
                </div>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div
                animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -left-2 md:-left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <span className="text-xl">🌦️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Weather</p>
                  <p className="text-lg font-bold text-gray-800">24°C</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section >
  );
};