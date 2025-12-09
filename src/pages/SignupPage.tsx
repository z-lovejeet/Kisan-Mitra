import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Leaf, User, Mail, Lock, Store, Sprout } from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';

export const SignupPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [role, setRole] = useState<UserRole>(searchParams.get('role') as UserRole || 'farmer');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signup } = useAuth();

    useEffect(() => {
        if (searchParams.get('role')) {
            setRole(searchParams.get('role') as UserRole);
        }
    }, [searchParams]);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && password) {
            signup(name, email, role);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-100/40 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-5xl z-10 grid md:grid-cols-2 gap-8 items-center">

                {/* Left Side - Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden md:block"
                >
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Join India's Largest <span className="text-emerald-600">Agri-Community</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Connect directly with buyers, access expert advice, and get the best prices for your produce.
                    </p>

                    <div className="grid gap-4">
                        <div className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${role === 'farmer' ? 'border-emerald-500 bg-emerald-50' : 'border-white bg-white/50'}`} onClick={() => setRole('farmer')}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                    <Sprout size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">I am a Farmer</h3>
                                    <p className="text-sm text-gray-500">I want to sell my crop and get advice.</p>
                                </div>
                            </div>
                        </div>

                        <div className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${role === 'buyer' ? 'border-blue-500 bg-blue-50' : 'border-white bg-white/50'}`} onClick={() => setRole('buyer')}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Store size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">I am a Buyer</h3>
                                    <p className="text-sm text-gray-500">I want to buy fresh produce directly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side - Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
                >
                    <div className="text-center mb-8 md:hidden">
                        <Link to="/" className="inline-flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                                <Leaf size={20} />
                            </div>
                        </Link>
                        <h2 className="text-2xl font-bold">Create Account</h2>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white/50"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white/50"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white/50"
                                    placeholder="Create a strong password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4 ${role === 'farmer' ? 'bg-gradient-to-r from-emerald-600 to-green-500 hover:shadow-emerald-200' : 'bg-gradient-to-r from-blue-600 to-indigo-500 hover:shadow-blue-200'}`}
                        >
                            Create {role === 'farmer' ? 'Farmer' : 'Buyer'} Account
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-emerald-600 font-bold hover:underline">
                            Log in
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
