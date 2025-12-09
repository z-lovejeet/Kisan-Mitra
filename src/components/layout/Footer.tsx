import React from 'react';
import { Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <Leaf size={16} />
            </div>
            <span className="text-xl font-bold">KisanMitra</span>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} KisanMitra. Empowering Indian Agriculture.
          </div>
        </div>
      </div>
    </footer>
  );
};