import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Sprout, ShoppingBag, BrainCircuit } from 'lucide-react';


// Mock Data Generators
const generateTrendData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
        name: month,
        wheat: Math.floor(Math.random() * 100) + 150,
        rice: Math.floor(Math.random() * 80) + 120,
        corn: Math.floor(Math.random() * 60) + 90,
    }));
};

const generateDemandData = () => [
    { name: 'Wheat', demand: 85, supply: 60 },
    { name: 'Rice', demand: 70, supply: 75 },
    { name: 'Onion', demand: 95, supply: 40 }, // High demand gap
    { name: 'Tomato', demand: 60, supply: 55 },
    { name: 'Potato', demand: 75, supply: 80 },
];

export const TrendsPage: React.FC = () => {
    const [trendData, setTrendData] = useState(generateTrendData());
    const [demandData] = useState(generateDemandData()); // Remove setDemandData
    const [liveTicker, setLiveTicker] = useState([
        { item: 'Wheat', price: 2450, change: 2.5, isUp: true },
        { item: 'Rice', price: 3100, change: -1.2, isUp: false },
        { item: 'Mustard', price: 5600, change: 0.8, isUp: true },
        { item: 'Cotton', price: 6200, change: 4.1, isUp: true },
        { item: 'Soybean', price: 4800, change: -0.5, isUp: false },
    ]);

    // Simulate Live Updates
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveTicker(prev => prev.map(item => ({
                ...item,
                price: Math.max(1, Math.round(item.price + (Math.random() > 0.5 ? 10 : -10))),
                change: Number((item.change + (Math.random() * 0.2 - 0.1)).toFixed(2))
            })));

            // Subtle chart movement
            setTrendData(prev => {
                if (prev.length === 0) return prev;
                const newData = [...prev];
                const lastIndex = newData.length - 1;
                // Create a new object for the last item to avoid mutation
                newData[lastIndex] = {
                    ...newData[lastIndex],
                    wheat: Math.max(100, Math.round(newData[lastIndex].wheat + (Math.random() * 10 - 5)))
                };
                return newData;
            });

        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 pt-8 pb-12 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="mb-8 p-4 md:p-6 bg-gradient-to-r from-emerald-900 to-green-800 rounded-3xl text-white shadow-xl relative overflow-hidden">
                    {/* Brain Circuit Decorative Background */}
                    <BrainCircuit className="absolute -right-10 -bottom-10 text-white/5 w-64 h-64" />

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-1.5 text-sm font-medium text-emerald-100 mb-3">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Live Market Insights
                            </div>
                            <h1 className="text-4xl font-bold mb-2">Market Analytics</h1>
                            <p className="text-emerald-100 max-w-xl">
                                AI-powered insights to help you decide what to grow and when to sell.
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 min-w-[200px]">
                            <div className="text-sm text-emerald-200 mb-1">Market Sentiment</div>
                            <div className="text-2xl font-bold flex items-center gap-2">
                                Bullish <TrendingUp className="text-green-400" />
                            </div>
                            <div className="text-xs text-emerald-300 mt-1">High demand for cereals</div>
                        </div>
                    </div>
                </div>

                {/* Live Ticker */}
                <div className="mb-8 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm py-3">
                    <motion.div
                        className="flex gap-12 whitespace-nowrap"
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                    >
                        {[...liveTicker, ...liveTicker, ...liveTicker].map((item, i) => ( // Repeat for infinite scroll effect
                            <div key={i} className="flex items-center gap-2">
                                <span className="font-bold text-gray-700">{item.item}</span>
                                <span className="font-mono">₹{item.price}</span>
                                <span className={`text-sm flex items-center ${item.isUp ? 'text-green-600' : 'text-red-500'}`}>
                                    {item.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                    {Math.abs(item.change)}%
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Main Charts Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">

                    {/* Price Trends Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-4 md:p-6 rounded-3xl shadow-lg border border-gray-100"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Sprout className="text-emerald-600" /> Crop Price Trends
                                </h3>
                                <p className="text-sm text-gray-500">6-Month history & projection</p>
                            </div>
                            <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                                <option>Last 12 Months</option>
                                <option>Last 6 Months</option>
                            </select>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData}>
                                    <defs>
                                        <linearGradient id="colorWheat" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="wheat" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorWheat)" />
                                    <Area type="monotone" dataKey="corn" stroke="#f59e0b" strokeWidth={3} fillOpacity={0} fill="url(#colorWheat)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Demand vs Supply Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-4 md:p-6 rounded-3xl shadow-lg border border-gray-100"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <ShoppingBag className="text-blue-600" /> Demand vs Supply
                                </h3>
                                <p className="text-sm text-gray-500">Real-time market gap analysis</p>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={demandData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip
                                        cursor={{ fill: '#F3F4F6' }}
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="demand" name="Demand" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="supply" name="Supply" fill="#D1D5DB" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>

                {/* AI Insights Cards */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <BrainCircuit className="text-purple-600" /> AI Recommendations
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-white p-3 rounded-full shadow-sm text-purple-600 font-bold">W</div>
                            <div>
                                <h4 className="font-bold text-gray-800">Wheat</h4>
                                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">High Potential</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Global shortages expected to raise prices by 15% in Q4. Recommended for sowing now.</p>
                        <button className="w-full bg-white text-purple-700 py-2 rounded-lg font-bold text-sm hover:bg-purple-100 transition-colors">View Report</button>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-white p-3 rounded-full shadow-sm text-orange-600 font-bold">O</div>
                            <div>
                                <h4 className="font-bold text-gray-800">Onion</h4>
                                <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">Price Drop Alert</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Excess supply from neighboring states filling mandis. Prices likely to drop by 10% next week.</p>
                        <button className="w-full bg-white text-orange-700 py-2 rounded-lg font-bold text-sm hover:bg-orange-100 transition-colors">Analyst Details</button>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-white p-3 rounded-full shadow-sm text-blue-600 font-bold">C</div>
                            <div>
                                <h4 className="font-bold text-gray-800">Cotton</h4>
                                <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">Stable</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">International demand remains steady. Good long-term hold for storage facilities.</p>
                        <button className="w-full bg-white text-blue-700 py-2 rounded-lg font-bold text-sm hover:bg-blue-100 transition-colors">Export Data</button>
                    </div>
                </div>

            </div>
        </div>
    );
};
