import React, { useState } from 'react';
import { Star, MessageCircle, Phone, Video } from 'lucide-react';
import { motion } from 'framer-motion';

const experts = [
    { id: 1, name: "Dr. Ramesh Gupta", role: "Crop Pathologist", exp: "15 Years", rating: 4.9, active: true },
    { id: 2, name: "Dr. Anita Singh", role: "Soil Scientist", exp: "12 Years", rating: 4.8, active: true },
    { id: 3, name: "Mr. Suresh Kumar", role: "Agri-Business Consultant", exp: "20 Years", rating: 4.7, active: false },
    { id: 4, name: "Dr. Priya Sharma", role: "Entomologist", exp: "8 Years", rating: 4.9, active: true },
];

export const ExpertHelpPage: React.FC = () => {
    const [selectedExpert, setSelectedExpert] = useState<number | null>(null);

    return (
        <div className="bg-slate-50 min-h-screen py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Talk to an Expert</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get real-time advice from certified agricultural scientists via chat, voice, or video call.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {experts.map((expert) => (
                        <motion.div
                            key={expert.id}
                            whileHover={{ y: -5 }}
                            className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border-2 ${selectedExpert === expert.id ? 'border-emerald-500 ring-4 ring-emerald-50' : 'border-transparent'}`}
                            onClick={() => setSelectedExpert(expert.id)}
                        >
                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto overflow-hidden">
                                    <img src={`https://i.pravatar.cc/150?u=${expert.id}`} alt={expert.name} className="w-full h-full object-cover" />
                                </div>
                                {expert.active && (
                                    <span className="absolute bottom-1 right-[calc(50%-2.5rem)] w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                                )}
                            </div>

                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">{expert.name}</h3>
                                <p className="text-emerald-600 font-medium text-sm">{expert.role}</p>
                                <div className="flex items-center justify-center gap-1 mt-2 text-yellow-500 text-sm font-bold">
                                    <Star size={16} fill="currentColor" /> {expert.rating} <span className="text-gray-400 font-normal">({expert.exp} Exp)</span>
                                </div>
                            </div>

                            <div className="flex justify-center gap-3">
                                <button className="p-3 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors" title="Chat">
                                    <MessageCircle size={20} />
                                </button>
                                <button className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="Audio Call">
                                    <Phone size={20} />
                                </button>
                                <button className="p-3 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors" title="Video Call">
                                    <Video size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
