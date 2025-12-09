import React, { Suspense } from 'react';
import { Hero } from '../components/hero/Hero';
import { Marketplace } from '../components/features/Marketplace';
import { Schemes } from '../components/features/Schemes';

// Loading fallback for the 3D scene
const Loader = () => (
    <div className="flex items-center justify-center h-screen bg-emerald-900 text-white">
        <div className="animate-pulse">Loading KisanMitra...</div>
    </div>
);

export const HomePage: React.FC = () => {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Hero />
            </Suspense>

            {/* Features Preview Section - Extracted from original App.tsx */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Choose Us?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'AI Chatbot', desc: '24/7 farming advice in local languages.' },
                            { title: 'Voice Assistant', desc: 'Speak to the app in Hindi, Tamil, or Telugu.' },
                            { title: 'Weather Updates', desc: 'Real-time rain alerts and mandate prices.' }
                        ].map((f, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-gray-50 hover:bg-emerald-50 transition-colors cursor-pointer border border-transparent hover:border-emerald-200 shadow-sm hover:shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                                <p className="text-gray-600">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Marketplace />
            <Schemes />

            {/* Contact CTA */}
            <section id="contact" className="py-20 bg-emerald-900 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Need Expert Advice?</h2>
                    <p className="mb-8 opacity-90 text-lg">Our agricultural scientists are available to help you improve your crop yield.</p>
                    <button className="bg-white text-emerald-900 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        Contact Support
                    </button>
                </div>
            </section>
        </>
    );
};
