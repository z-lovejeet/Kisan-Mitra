import React, { useState, useEffect } from 'react';
import { CloudRain, Wind, Sun, Droplets, MapPin, Loader2, CloudSun, CloudFog, CloudSnow, CloudLightning, Calendar } from 'lucide-react';

interface WeatherData {
    current: {
        temperature_2m: number;
        relative_humidity_2m: number;
        wind_speed_10m: number;
        weather_code: number;
        is_day: number;
        precipitation: number;
    };
    daily: {
        time: string[];
        weather_code: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    };
    current_units: {
        temperature_2m: string;
        wind_speed_10m: string;
    }
}

// WMO Weather Code Mapping
const getWeatherInfo = (code: number) => {
    if (code === 0) return { label: 'Clear Sky', icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-50' };
    if (code >= 1 && code <= 3) return { label: 'Partly Cloudy', icon: CloudSun, color: 'text-orange-400', bg: 'bg-orange-50' };
    if (code >= 45 && code <= 48) return { label: 'Foggy', icon: CloudFog, color: 'text-gray-400', bg: 'bg-gray-50' };
    if (code >= 51 && code <= 67) return { label: 'Rainy', icon: CloudRain, color: 'text-blue-500', bg: 'bg-blue-50' };
    if (code >= 71 && code <= 77) return { label: 'Snow', icon: CloudSnow, color: 'text-cyan-500', bg: 'bg-cyan-50' };
    if (code >= 80 && code <= 82) return { label: 'Heavy Rain', icon: CloudRain, color: 'text-blue-700', bg: 'bg-blue-100' };
    if (code >= 95) return { label: 'Thunderstorm', icon: CloudLightning, color: 'text-indigo-600', bg: 'bg-indigo-50' };
    return { label: 'Clear', icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-50' };
};

export const WeatherPage: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [locationName, setLocationName] = useState('Detecting Location...');

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(latitude, longitude);

                // Optional: Reverse Geocoding for City Name (Free API)
                try {
                    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                    const data = await res.json();
                    setLocationName(`${data.city || data.locality || 'Unknown Location'}, ${data.principalSubdivision}`);
                } catch (e) {
                    setLocationName('Your Location');
                }
            },
            () => {
                setError('Unable to retrieve your location. Showing default (New Delhi).');
                // Default to New Delhi
                fetchWeatherData(28.6139, 77.2090);
                setLocationName('New Delhi, India');
            }
        );
    }, []);

    const fetchWeatherData = async (lat: number, lon: number) => {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
            );
            const data = await response.json();
            setWeather(data);
            setLoading(false);
        } catch {
            setError('Failed to fetch weather data');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading Forecast...</p>
                </div>
            </div>
        );
    }

    if (error && !weather) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
                    <CloudRain className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
                    <p className="text-gray-500 mb-6">{error}</p>
                    <button onClick={() => window.location.reload()} className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const currentInfo = getWeatherInfo(weather?.current.weather_code || 0);
    const CurrentIcon = currentInfo.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden p-4 md:p-8 border border-white/50">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-emerald-600 font-bold mb-1">
                                <MapPin size={20} />
                                <span className="uppercase tracking-wide text-sm">Live Location</span>
                            </div>
                            <h1 className="text-4xl font-bold text-slate-800">{locationName}</h1>
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>
                        <div className="bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            Live Updates
                        </div>
                    </div>

                    {/* Main Current Weather */}
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
                        <div className="text-center md:text-left relative">
                            <div className={`absolute top-0 left-0 w-32 h-32 ${currentInfo.bg} rounded-full blur-3xl -z-10`}></div>
                            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8">
                                <CurrentIcon className={`${currentInfo.color} w-32 h-32 drop-shadow-lg`} />
                                <div>
                                    <div className="text-7xl font-bold text-slate-800 tracking-tighter">
                                        {Math.round(weather?.current.temperature_2m || 0)}°
                                    </div>
                                    <div className={`text-2xl font-medium ${currentInfo.color} mt-2`}>
                                        {currentInfo.label}
                                    </div>
                                    <p className="text-gray-400 mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center border border-blue-100 hover:scale-105 transition-transform duration-300">
                                <CloudRain className="text-blue-500 mb-2" size={32} />
                                <div className="text-slate-500 text-sm font-medium">Precipitation</div>
                                <div className="text-xl font-bold text-slate-800">{weather?.current.precipitation || 0} mm</div>
                            </div>
                            <div className="bg-slate-50/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center border border-slate-100 hover:scale-105 transition-transform duration-300">
                                <Wind className="text-slate-500 mb-2" size={32} />
                                <div className="text-slate-500 text-sm font-medium">Wind Speed</div>
                                <div className="text-xl font-bold text-slate-800">{weather?.current.wind_speed_10m}{weather?.current_units.wind_speed_10m}</div>
                            </div>
                            <div className="bg-teal-50/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center border border-teal-100 hover:scale-105 transition-transform duration-300">
                                <Droplets className="text-teal-500 mb-2" size={32} />
                                <div className="text-slate-500 text-sm font-medium">Humidity</div>
                                <div className="text-xl font-bold text-slate-800">{weather?.current.relative_humidity_2m}%</div>
                            </div>
                            <div className="bg-orange-50/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center border border-orange-100 hover:scale-105 transition-transform duration-300">
                                <Sun className="text-orange-500 mb-2" size={32} />
                                <div className="text-slate-500 text-sm font-medium">UV Index</div>
                                <div className="text-xl font-bold text-slate-800">High</div>
                            </div>
                        </div>
                    </div>

                    {/* Weekly Forecast */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <Calendar className="text-emerald-600" size={24} />
                            <h3 className="text-xl font-bold text-slate-800">7-Day Forecast</h3>
                        </div>
                        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                            {weather?.daily.time.map((dateStr, i) => {
                                const date = new Date(dateStr);
                                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                                const isToday = i === 0;
                                const code = weather.daily.weather_code[i];
                                const info = getWeatherInfo(code);
                                const DayIcon = info.icon;

                                return (
                                    <div
                                        key={dateStr}
                                        className={`min-w-[140px] p-6 rounded-2xl flex flex-col items-center border transition-all duration-300
                                            ${isToday ? 'bg-gradient-to-b from-emerald-500 to-teal-600 text-white shadow-lg scale-105 border-transparent' : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-600'}
                                        `}
                                    >
                                        <span className={`text-sm font-bold mb-3 ${isToday ? 'text-emerald-50' : 'text-slate-400'}`}>
                                            {isToday ? 'Today' : dayName}
                                        </span>
                                        <DayIcon size={32} className={`mb-4 ${isToday ? 'text-white' : info.color}`} />
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold">{Math.round(weather.daily.temperature_2m_max[i])}°</span>
                                            <span className={`text-sm ${isToday ? 'text-emerald-200' : 'text-slate-400'}`}>{Math.round(weather.daily.temperature_2m_min[i])}°</span>
                                        </div>
                                        <span className={`text-xs mt-2 font-medium truncate w-full text-center ${isToday ? 'text-emerald-100' : 'text-slate-400'}`}>
                                            {info.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
