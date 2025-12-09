import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { schemes } from '../../data/mockData';

export const Schemes: React.FC = () => {
  return (
    <section id="schemes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Government Support</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">Beneficial Schemes for Every Farmer</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Access central and state government schemes designed to provide financial support, insurance, and subsidies for modern farming equipment.
            </p>
            <button className="text-emerald-600 font-bold flex items-center hover:gap-3 transition-all">
              View All 50+ Schemes <ArrowRight className="ml-2" />
            </button>
          </div>

          <div className="space-y-6">
            {schemes.map((scheme, index) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-emerald-200 transition-all flex gap-4"
              >
                <div className={`w-12 h-12 ${scheme.color} rounded-xl flex items-center justify-center text-2xl shrink-0`}>
                  {scheme.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-1">{scheme.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{scheme.description}</p>
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">
                    {scheme.subsidy}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};