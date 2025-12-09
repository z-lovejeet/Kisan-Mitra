import React from 'react';
import { Schemes } from '../components/features/Schemes';

export const SchemesPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Government Schemes</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore the latest financial support and subsidy schemes available for farmers across India.</p>
                </div>
                <Schemes />
            </div>
        </div>
    );
};
