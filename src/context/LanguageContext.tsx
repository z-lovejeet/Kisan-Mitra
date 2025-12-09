import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'pa' | 'ta' | 'te';

interface Translations {
    [key: string]: {
        [key: string]: string;
    };
}

const translations: Translations = {
    en: {
        'nav.home': 'Home',
        'nav.marketplace': 'Marketplace',
        'nav.schemes': 'Schemes',
        'nav.weather': 'Weather',
        'nav.expert': 'Expert Help',
        'nav.login': 'Login',
        'hero.title': 'Empowering Indian Farmers',
        'hero.subtitle': 'Your complete digital platform for crop marketplace, government schemes, expert advice, and smart farming tools.',
        'hero.trusted': 'Trusted by 50,000+ Farmers',
        'hero.getStarted': 'Get Started',
        'hero.watchDemo': 'Watch Demo',
        'weather.title': 'Weather Forecast',
        'weather.live': 'Live Updates',
    },
    hi: {
        'nav.home': 'होम',
        'nav.marketplace': 'बाजार',
        'nav.schemes': 'योजनाएं',
        'nav.weather': 'मौसम',
        'nav.expert': 'विशेषज्ञ सहायता',
        'nav.login': 'लॉग इन',
        'hero.title': 'भारतीय किसानों को सशक्त बनाना',
        'hero.subtitle': 'फसल बाजार, सरकारी योजनाओं, विशेषज्ञ सलाह और स्मार्ट खेती के उपकरणों के लिए आपका पूरा डिजिटल मंच।',
        'hero.trusted': '50,000+ किसानों द्वारा भरोसा किया गया',
        'hero.getStarted': 'शुरू करें',
        'hero.watchDemo': 'डेमो देखें',
        'weather.title': 'मौसम पूर्वानुमान',
        'weather.live': 'लाईव अपडेट',
    },
    pa: {
        'nav.home': 'ਘਰ',
        'nav.marketplace': 'ਮੰਡੀ',
        'nav.schemes': 'ਸਕੀਮਾਂ',
        'nav.weather': 'ਮੌਸਮ',
        'nav.expert': 'ਮਾਹਿਰ ਮਦਦ',
        'nav.login': 'ਲੌਗ ਇਨ',
        'hero.title': 'ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਨੂੰ ਸ਼ਕਤੀਸ਼ਾਲੀ ਬਣਾਉਣਾ',
        'hero.subtitle': 'ਫ਼ਸਲ ਮੰਡੀ, ਸਰਕਾਰੀ ਸਕੀਮਾਂ, ਮਾਹਿਰ ਦੀ ਸਲਾਹ ਅਤੇ ਸਮਾਰਟ ਖੇਤੀ ਸੰਦਾਂ ਲਈ ਤੁਹਾਡਾ ਪੂਰਾ ਡਿਜੀਟਲ ਪਲੇਟਫਾਰਮ।',
        'hero.trusted': '50,000+ ਕਿਸਾਨਾਂ ਦਾ ਭਰੋਸਾ',
        'hero.getStarted': 'ਸ਼ੁਰੂ ਕਰੋ',
        'hero.watchDemo': 'ਡੈਮੋ ਦੇਖੋ',
        'weather.title': 'ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ',
        'weather.live': 'ਲਾਈਵ ਅੱਪਡੇਟ',
    },
    ta: {
        'nav.home': 'முகப்பு',
        'nav.marketplace': 'சந்தை',
        'nav.schemes': 'திட்டங்கள்',
        'nav.weather': 'வானிலை',
        'nav.expert': 'நிபுணர் உதவி',
        'nav.login': 'உள்நுழைய',
        'hero.title': 'இந்திய விவசாயிகளை மேம்படுத்துதல்',
        'hero.subtitle': 'பயிர் சந்தை, அரசு திட்டங்கள், நிபுணர் ஆலோசனை மற்றும் நவீன விவசாய கருவிகளுக்கான உங்கள் முழுமையான டிஜிட்டல் தளம்.',
        'hero.trusted': '50,000+ விவசாயிகளால் நம்பப்படுகிறது',
        'hero.getStarted': 'தொடங்கவும்',
        'hero.watchDemo': 'டெமோ பார்க்க',
        'weather.title': 'வானிலை முன்னறிவிப்பு',
        'weather.live': 'நேரடி அறிவிப்புகள்',
    },
    te: {
        'nav.home': 'హోమ్',
        'nav.marketplace': 'మార్కెట్',
        'nav.schemes': 'పథకాలు',
        'nav.weather': 'వాతావరణం',
        'nav.expert': 'నిపుణుల సహాయం',
        'nav.login': 'లాగిన్',
        'hero.title': 'భారతీయ రైతులను శక్తివంతం చేయడం',
        'hero.subtitle': 'పంట మార్కెట్, ప్రభుత్వ పథకాలు, నిపుణుల సలహాలు మరియు స్మార్ట్ వ్యవసాయ పరికరాల కోసం మీ పూర్తి డిజిటల్ ప్లాట్‌ఫారమ్.',
        'hero.trusted': '50,000+ రైతుల నమ్మకం',
        'hero.getStarted': 'ప్రారంభించండి',
        'hero.watchDemo': 'డెమో చూడండి',
        'weather.title': 'వాతావరణ సూచన',
        'weather.live': 'లైవ్ అప్‌డేట్స్',
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
