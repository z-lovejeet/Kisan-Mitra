import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface VoiceContextType {
    isListening: boolean;
    transcript: string;
    startListening: () => void;
    stopListening: () => void;
    speak: (text: string) => void;
    supported: boolean;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [supported, setSupported] = useState(false);
    const navigate = useNavigate();

    // Initialize Speech Recognition
    let recognition: any = null;

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            setSupported(true);
        }
    }, []);

    const startListening = () => {
        if (!supported) return;

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US'; // Default to English, can be dynamic based on LanguageContext later

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            const current = event.resultIndex;
            const transcriptText = event.results[current][0].transcript.toLowerCase();
            setTranscript(transcriptText);
            console.log('Voice Command:', transcriptText);
            handleCommand(transcriptText);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const stopListening = () => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);
        }
    };

    const handleCommand = (command: string) => {
        if (command.includes('home')) {
            navigate('/');
            speak('Navigating to home.');
        } else if (command.includes('market') || command.includes('buy')) {
            navigate('/marketplace');
            speak('Opening marketplace.');
        } else if (command.includes('scheme') || command.includes('government')) {
            navigate('/schemes');
            speak('Showing government schemes.');
        } else if (command.includes('weather') || command.includes('rain')) {
            navigate('/weather');
            speak('Checking weather forecast.');
        } else if (command.includes('expert') || command.includes('help')) {
            navigate('/expert-help');
            speak('Connecting to expert help.');
        } else if (command.includes('hello') || command.includes('hi')) {
            speak('Namaste! I am Kisan Mitra. How can I help you?');
        }
    };

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <VoiceContext.Provider value={{ isListening, transcript, startListening, stopListening, speak, supported }}>
            {children}
        </VoiceContext.Provider>
    );
};

export const useVoice = () => {
    const context = useContext(VoiceContext);
    if (context === undefined) {
        throw new Error('useVoice must be used within a VoiceProvider');
    }
    return context;
};
