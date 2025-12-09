import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShoppingBag } from 'lucide-react';
import { products } from '../../data/mockData';

export const Marketplace: React.FC = () => {
  return (
    <section id="marketplace" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Direct from Farm</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">Crop Marketplace</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Verified
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.quantity}</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 p-2 rounded-lg">
                    <ShoppingBag size={20} />
                  </span>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-6">
                  <MapPin size={16} className="mr-1" />
                  {product.location}
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <span className="text-2xl font-bold text-emerald-600">₹{product.price}</span>
                    <span className="text-xs text-gray-400"> /quintal</span>
                  </div>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};