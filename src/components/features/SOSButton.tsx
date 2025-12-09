import React, { useState } from 'react';
import { Phone, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SOSButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-red-600 text-white p-4 rounded-full shadow-lg border-4 border-red-200 animate-pulse flex items-center justify-center"
                title="Emergency SOS"
            >
                <AlertTriangle size={24} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative shadow-2xl"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>

                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertTriangle size={40} className="text-red-600" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Assistance</h2>
                            <p className="text-gray-600 mb-8">
                                Pressing the button below will instantly alert the nearest Kisan Call Center and emergency services.
                            </p>

                            <button className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg mb-4 hover:bg-red-700 transition-colors flex items-center justify-center gap-3 shadow-red-200 shadow-xl">
                                <Phone size={24} /> CALL 1551 (NOW)
                            </button>

                            <p className="text-xs text-gray-400">
                                Your location will be shared with the emergency response team.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
