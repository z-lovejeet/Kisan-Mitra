
import React from 'react';
import { Marketplace } from '../components/features/Marketplace';
import { Search, Filter, ShoppingBag, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const MarketplacePage: React.FC = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <div className="bg-slate-50 min-h-screen py-6 md:py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Marketplace</h1>
                        <p className="text-sm md:text-base text-gray-600">Buy fresh produce directly from farmers across India.</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-grow md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search crops, vegetables..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <button className="bg-white p-3 rounded-xl shadow-sm hover:bg-gray-50 text-gray-700">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                {!isAuthenticated && (
                    <div className="bg-gradient-to-r from-emerald-900 to-green-800 rounded-3xl p-8 mb-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                        <div className="relative z-10">
                            <span className="bg-green-500/20 text-green-300 border border-green-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Join Community</span>
                            <h2 className="text-3xl font-bold mb-2">Buy or Sell Fresh Harvest?</h2>
                            <p className="text-emerald-100 max-w-lg">Create a free account to contact sellers directly, list your crops, and get the best market rates.</p>
                        </div>

                        <div className="flex gap-4 relative z-10 flex-shrink-0">
                            <Link to="/signup?role=farmer" className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2">
                                <Sprout size={20} /> Sell Crops (Farmer)
                            </Link>
                            <Link to="/signup?role=buyer" className="bg-white text-emerald-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
                                <ShoppingBag size={20} /> Buy Produce (Buyer)
                            </Link>
                        </div>
                    </div>
                )}

                {isAuthenticated && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-8 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-emerald-900">
                            Welcome back, {user?.name}! <span className="text-sm font-normal text-emerald-700 block">You are browsing as a <span className="uppercase font-bold">{user?.role}</span>.</span>
                        </h2>
                        {user?.role === 'farmer' && (
                            <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700">
                                + List New Crop
                            </button>
                        )}
                    </div>
                )}

                <Marketplace />
            </div>
        </div>
    );
};
